"use client";

import { useCallback, useMemo, useState } from "react";
import type {
  FieldValue,
  WizardConfig,
  WizardField,
  WizardStep,
} from "../types";
import { useOnboarding } from "../provider/OnboardingProvider";
import { usePersistentState } from "./usePersistentState";

export interface UseWizardOptions {
  onComplete?: (values: Record<string, FieldValue>) => void;
  onDismiss?: () => void;
  /** localStorage key; omit to keep progress in memory only. */
  persistKey?: string;
  initialValues?: Record<string, FieldValue>;
}

export interface WizardState {
  step: WizardStep;
  steps: WizardStep[];
  index: number;
  total: number;
  values: Record<string, FieldValue>;
  setValue: (fieldId: string, value: FieldValue) => void;
  next: () => void;
  back: () => void;
  goTo: (index: number) => void;
  skip: () => void;
  /** False while a required field on the current step is unanswered. */
  canAdvance: boolean;
  isFirst: boolean;
  isLast: boolean;
  done: boolean;
  reset: () => void;
}

function defaultsFor(steps: WizardStep[]): Record<string, FieldValue> {
  const out: Record<string, FieldValue> = {};
  for (const step of steps) {
    for (const field of step.fields ?? []) {
      if (field.defaultValue !== undefined) out[field.id] = field.defaultValue;
    }
  }
  return out;
}

function isAnswered(
  field: WizardField,
  value: FieldValue | undefined,
): boolean {
  if (value === undefined || value === null) return false;
  if (Array.isArray(value)) return value.length > 0;
  if (typeof value === "string") return value.trim().length > 0;
  if (typeof value === "boolean") return value;
  return true;
}

/**
 * Drives a wizard config: step order, collected values, branching and gating.
 *
 * Steps named in a selected option's `skipSteps` drop out of the sequence, so
 * the progress indicator always reflects the path this person is actually on.
 */
export function useWizard(
  config: WizardConfig,
  options: UseWizardOptions = {},
): WizardState {
  const { onComplete, onDismiss, persistKey, initialValues } = options;
  const { emit } = useOnboarding();

  const [values, setValues] = usePersistentState<Record<string, FieldValue>>(
    persistKey ? `${persistKey}:values` : null,
    { ...defaultsFor(config.steps), ...initialValues },
  );
  const [index, setIndex] = useState(0);
  const [done, setDone] = useState(false);

  // Steps removed by a branching choice on an earlier answer.
  const skipped = useMemo(() => {
    const out = new Set<string>();
    for (const step of config.steps) {
      for (const field of step.fields ?? []) {
        const value = values[field.id];
        const chosen = Array.isArray(value) ? value : [value];
        for (const option of field.options ?? []) {
          if (option.skipSteps?.length && chosen.includes(option.id)) {
            option.skipSteps.forEach((id) => out.add(id));
          }
        }
      }
    }
    return out;
  }, [config.steps, values]);

  const steps = useMemo(
    () => config.steps.filter((step) => !skipped.has(step.id)),
    [config.steps, skipped],
  );

  const clampedIndex = Math.min(index, Math.max(steps.length - 1, 0));
  const step = steps[clampedIndex] ?? config.steps[0]!;

  const setValue = useCallback(
    (fieldId: string, value: FieldValue) => {
      setValues((prev) => ({ ...prev, [fieldId]: value }));
      emit("field_changed", config.id, fieldId, { value });
    },
    [setValues, emit, config.id],
  );

  const canAdvance = useMemo(() => {
    const required = (step.fields ?? []).filter((f) => f.required);
    return required.every((f) => isAnswered(f, values[f.id]));
  }, [step, values]);

  const finish = useCallback(() => {
    setDone(true);
    emit("flow_completed", config.id);
    onComplete?.(values);
  }, [emit, config.id, onComplete, values]);

  const next = useCallback(() => {
    emit("step_completed", config.id, step.id);
    if (clampedIndex >= steps.length - 1) {
      finish();
      return;
    }
    setIndex(clampedIndex + 1);
    const upcoming = steps[clampedIndex + 1];
    if (upcoming) emit("step_viewed", config.id, upcoming.id);
  }, [clampedIndex, steps, finish, emit, config.id, step.id]);

  const back = useCallback(() => {
    if (clampedIndex === 0) {
      onDismiss?.();
      return;
    }
    setIndex(clampedIndex - 1);
  }, [clampedIndex, onDismiss]);

  const skip = useCallback(() => {
    emit("step_skipped", config.id, step.id);
    if (clampedIndex >= steps.length - 1) finish();
    else setIndex(clampedIndex + 1);
  }, [emit, config.id, step.id, clampedIndex, steps.length, finish]);

  const goTo = useCallback(
    (target: number) =>
      setIndex(Math.max(0, Math.min(target, steps.length - 1))),
    [steps.length],
  );

  const reset = useCallback(() => {
    setValues({ ...defaultsFor(config.steps), ...initialValues });
    setIndex(0);
    setDone(false);
  }, [setValues, config.steps, initialValues]);

  return {
    step,
    steps,
    index: clampedIndex,
    total: steps.length,
    values,
    setValue,
    next,
    back,
    goTo,
    skip,
    canAdvance,
    isFirst: clampedIndex === 0,
    isLast: clampedIndex === steps.length - 1,
    done,
    reset,
  };
}
