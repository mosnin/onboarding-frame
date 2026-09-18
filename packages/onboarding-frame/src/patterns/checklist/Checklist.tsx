"use client";

import { useCallback, useMemo, useState } from "react";
import type { ChecklistConfig, ChecklistTask } from "../../types";
import { cn } from "../../lib/cn";
import { percent } from "../../lib/utils";
import { useOnboarding } from "../../provider/OnboardingProvider";
import { usePersistentState } from "../../hooks/usePersistentState";
import { Button, Confetti, ProgressBar } from "../../ui/primitives";
import { Check, ChevronDown, ChevronRight, Cross, Lock } from "../../ui/icons";

export interface ChecklistProps {
  config: ChecklistConfig;
  /** Fires when a task's CTA is pressed. */
  onTaskAction?: (task: ChecklistTask) => void;
  onComplete?: () => void;
  onDismiss?: () => void;
  persistKey?: string;
  className?: string;
  /** Render in place rather than pinned to the viewport corner. */
  inline?: boolean;
}

interface ChecklistState {
  done: string[];
  expanded: string | null;
  open: boolean;
  dismissed: boolean;
}

function useChecklist(config: ChecklistConfig, persistKey?: string) {
  const { emit } = useOnboarding();
  const [state, setState] = usePersistentState<ChecklistState>(
    persistKey ? `${persistKey}:checklist` : null,
    {
      done: config.tasks.filter((t) => t.done).map((t) => t.id),
      expanded: config.tasks.find((t) => !t.done)?.id ?? null,
      open: config.variant !== "launcher-popover",
      dismissed: false,
    },
  );

  const doneSet = useMemo(() => new Set(state.done), [state.done]);

  const toggleDone = useCallback(
    (task: ChecklistTask) => {
      setState((prev) => {
        const next = new Set(prev.done);
        if (next.has(task.id)) next.delete(task.id);
        else {
          next.add(task.id);
          emit("task_completed", config.id, task.id);
        }
        // Open the next unfinished task so there is always one clear next step.
        const upcoming = config.tasks.find(
          (t) => !next.has(t.id) && t.id !== task.id,
        );
        return { ...prev, done: [...next], expanded: upcoming?.id ?? null };
      });
    },
    [setState, emit, config.id, config.tasks],
  );

  const expand = useCallback(
    (task: ChecklistTask) => {
      emit("task_expanded", config.id, task.id);
      setState((prev) => ({
        ...prev,
        expanded: prev.expanded === task.id ? null : task.id,
      }));
    },
    [setState, emit, config.id],
  );

  /** A task is locked until everything it depends on is done. */
  const isLocked = useCallback(
    (task: ChecklistTask) => (task.dependsOn ?? []).some((id) => !doneSet.has(id)),
    [doneSet],
  );

  return { state, setState, doneSet, toggleDone, expand, isLocked };
}

function TaskRow({
  task,
  done,
  locked,
  expanded,
  onToggle,
  onExpand,
  onAction,
  ctaLabel,
}: {
  task: ChecklistTask;
  done: boolean;
  locked: boolean;
  expanded: boolean;
  onToggle: () => void;
  onExpand: () => void;
  onAction?: () => void;
  ctaLabel?: string;
}) {
  return (
    <li
      className={cn(
        "rounded-[var(--ob-radius)] border transition-colors",
        expanded && !done
          ? "border-[color:var(--ob-border-strong)] bg-[color:var(--ob-surface)]"
          : "border-transparent",
        locked && "opacity-55",
      )}
    >
      <div className="flex items-center gap-3 px-3 py-2.5">
        <button
          type="button"
          role="checkbox"
          aria-checked={done}
          aria-label={`Mark "${task.title}" ${done ? "not done" : "done"}`}
          disabled={locked}
          onClick={onToggle}
          className={cn(
            "grid size-5 shrink-0 place-items-center rounded-full border transition-colors",
            done
              ? "border-transparent bg-[color:var(--ob-success)] text-white"
              : "border-[color:var(--ob-border-strong)] hover:border-[color:var(--ob-fg-soft)]",
          )}
        >
          {done ? (
            <Check className="size-3" strokeWidth={3} />
          ) : locked ? (
            <Lock className="size-2.5" />
          ) : null}
        </button>

        <button
          type="button"
          onClick={onExpand}
          disabled={locked}
          aria-expanded={expanded}
          className="flex flex-1 items-center gap-2 text-left"
        >
          <span
            className={cn(
              "flex-1 text-[0.92rem] font-semibold",
              done && "text-[color:var(--ob-muted)] line-through",
            )}
          >
            {task.title}
          </span>
          {task.estMinutes && !done && (
            <span className="rounded-full bg-[color:var(--ob-surface-2)] px-2 py-0.5 text-[0.7rem] font-semibold text-[color:var(--ob-muted)]">
              {task.estMinutes} min
            </span>
          )}
          <ChevronDown
            className={cn(
              "size-4 shrink-0 text-[color:var(--ob-muted)] transition-transform",
              expanded && "rotate-180",
            )}
          />
        </button>
      </div>

      {expanded && !done && (task.description || task.ctaLabel) && (
        <div className="ob-animate-in grid gap-3 px-3 pb-3 pl-11">
          {task.description && (
            <p className="text-[0.86rem] leading-relaxed text-[color:var(--ob-muted)]">
              {task.description}
            </p>
          )}
          {(task.ctaLabel || ctaLabel) && (
            <Button tone="brand" size="sm" onClick={onAction} className="justify-self-start">
              {task.ctaLabel ?? ctaLabel}
              <ChevronRight className="size-4" />
            </Button>
          )}
        </div>
      )}
    </li>
  );
}

/**
 * Persistent getting-started checklist.
 *
 * All four variants share one state model, so a product can move the same
 * checklist between a launcher, a dashboard card, a side panel and a banner
 * without losing progress.
 */
export function Checklist({
  config,
  onTaskAction,
  onComplete,
  onDismiss,
  persistKey,
  className,
  inline,
}: ChecklistProps) {
  const { state, setState, doneSet, toggleDone, expand, isLocked } = useChecklist(
    config,
    persistKey,
  );
  const { emit } = useOnboarding();
  const [celebrated, setCelebrated] = useState(false);

  const completed = config.tasks.filter((t) => doneSet.has(t.id)).length;
  const total = config.tasks.length;
  const pct = percent(completed, total);
  const allDone = completed === total && total > 0;

  if (allDone && !celebrated) {
    setCelebrated(true);
    emit("flow_completed", config.id);
    onComplete?.();
  }

  const dismiss = () => {
    setState((prev) => ({ ...prev, dismissed: true }));
    emit("flow_dismissed", config.id);
    onDismiss?.();
  };

  if (state.dismissed) return null;

  const header = (
    <div className="grid gap-3">
      <div className="flex items-start gap-3">
        <div className="flex-1">
          <h3 className="font-bold">{allDone ? (config.completedTitle ?? config.title) : config.title}</h3>
          {(allDone ? config.completedBody : config.subtitle) && (
            <p className="mt-0.5 text-[0.86rem] text-[color:var(--ob-muted)]">
              {allDone ? config.completedBody : config.subtitle}
            </p>
          )}
        </div>
        {config.dismissible && (
          <button
            type="button"
            onClick={dismiss}
            aria-label="Dismiss checklist"
            className="text-[color:var(--ob-muted)] hover:text-[color:var(--ob-fg)]"
          >
            <Cross />
          </button>
        )}
      </div>
      <div className="flex items-center gap-3">
        <ProgressBar value={completed} total={total} className="h-1.5 flex-1" />
        {config.showCount !== false && (
          <span className="shrink-0 text-[0.78rem] font-bold tabular-nums text-[color:var(--ob-muted)]">
            {completed} of {total}
          </span>
        )}
      </div>
    </div>
  );

  const list = (
    <ul className="grid gap-0.5">
      {config.tasks.map((task) => (
        <TaskRow
          key={task.id}
          task={task}
          done={doneSet.has(task.id)}
          locked={isLocked(task)}
          expanded={state.expanded === task.id}
          onToggle={() => toggleDone(task)}
          onExpand={() => expand(task)}
          onAction={() => onTaskAction?.(task)}
        />
      ))}
    </ul>
  );

  const celebration =
    allDone && config.celebrateOnComplete !== false ? <Confetti /> : null;

  switch (config.variant) {
    /* ---------------------- Launcher popover ---------------------- */
    case "launcher-popover":
      return (
        <div
          className={cn(
            inline ? "relative" : "fixed bottom-6 right-6 z-40",
            "flex flex-col items-end gap-3",
            className,
          )}
        >
          {state.open && (
            <div className="ob-animate-in relative w-[356px] max-w-[calc(100vw-3rem)] overflow-hidden rounded-[var(--ob-radius-lg)] border border-[color:var(--ob-border)] bg-[color:var(--ob-surface)] p-4 [box-shadow:var(--ob-shadow-lg)]">
              {celebration}
              {header}
              <div className="mt-4">{list}</div>
            </div>
          )}
          <button
            type="button"
            onClick={() => setState((p) => ({ ...p, open: !p.open }))}
            aria-expanded={state.open}
            className="flex items-center gap-2.5 rounded-full bg-[color:var(--ob-cta-bg)] py-3 pl-4 pr-5 font-semibold text-[color:var(--ob-cta-fg)] [box-shadow:var(--ob-shadow-lg)] transition-transform hover:scale-[1.02]"
          >
            <span className="relative grid size-7 place-items-center">
              <svg viewBox="0 0 36 36" className="size-7 -rotate-90">
                <circle cx="18" cy="18" r="15" fill="none" strokeWidth="4" className="stroke-current opacity-25" />
                <circle
                  cx="18"
                  cy="18"
                  r="15"
                  fill="none"
                  strokeWidth="4"
                  strokeLinecap="round"
                  className="stroke-current transition-[stroke-dasharray] duration-500"
                  strokeDasharray={`${(pct / 100) * 94.2} 94.2`}
                />
              </svg>
            </span>
            {allDone ? "All set" : `${pct}% set up`}
          </button>
        </div>
      );

    /* ----------------------- Sidebar panel ----------------------- */
    case "sidebar-panel":
      return (
        <aside
          className={cn(
            "relative flex w-[330px] shrink-0 flex-col gap-4 border-l border-[color:var(--ob-border)] bg-[color:var(--ob-surface)] p-5",
            className,
          )}
        >
          {celebration}
          {header}
          {list}
        </aside>
      );

    /* ------------------------ Top banner ------------------------ */
    case "top-banner":
      return (
        <div
          className={cn(
            "relative flex flex-wrap items-center gap-4 border-b border-[color:var(--ob-border)] bg-[color:var(--ob-surface)] px-5 py-3",
            className,
          )}
        >
          {celebration}
          <div className="flex-1">
            <p className="text-[0.92rem] font-bold">
              {allDone ? (config.completedTitle ?? config.title) : config.title}
            </p>
            <p className="text-[0.8rem] text-[color:var(--ob-muted)]">
              {completed} of {total} complete
            </p>
          </div>
          <ProgressBar value={completed} total={total} className="h-1.5 w-40" />
          <Button
            tone="brand"
            size="sm"
            onClick={() => {
              const next = config.tasks.find((t) => !doneSet.has(t.id));
              if (next) onTaskAction?.(next);
            }}
            disabled={allDone}
          >
            {allDone ? "Done" : "Resume setup"}
          </Button>
          {config.dismissible && (
            <button
              type="button"
              onClick={dismiss}
              aria-label="Dismiss"
              className="text-[color:var(--ob-muted)] hover:text-[color:var(--ob-fg)]"
            >
              <Cross />
            </button>
          )}
        </div>
      );

    /* ----------------------- Dashboard card ----------------------- */
    default:
      return (
        <div
          className={cn(
            "relative rounded-[var(--ob-radius-lg)] border border-[color:var(--ob-border)] bg-[color:var(--ob-surface)] p-5",
            className,
          )}
        >
          {celebration}
          {header}
          <div className="mt-4">{list}</div>
        </div>
      );
  }
}
