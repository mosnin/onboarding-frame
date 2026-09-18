"use client";

import { useMemo } from "react";
import type { ChoiceOption, FieldValue, WizardField } from "../types";
import { cn } from "../lib/cn";
import { CheckBox, IconTile, Radio, Toggle } from "./primitives";
import { Check, ChevronRight, Plus, Shuffle } from "./icons";

export interface FieldProps {
  field: WizardField;
  value: FieldValue | undefined;
  onChange: (value: FieldValue) => void;
  /** Layout hint from the wizard variant. */
  tone?: "light" | "dark" | "neon";
}

/** True when this field stores an array of option ids. */
export function isMultiple(field: WizardField): boolean {
  return field.multiple ?? field.kind === "multi-select";
}

function useSelection(field: WizardField, value: FieldValue | undefined) {
  return useMemo(() => {
    const selected = Array.isArray(value)
      ? value
      : value === undefined || value === null || value === ""
        ? []
        : [String(value)];
    return new Set(selected);
  }, [value]);
}

function toggleSelection(
  field: WizardField,
  selected: Set<string>,
  id: string,
): FieldValue {
  if (!isMultiple(field)) return selected.has(id) ? null : id;
  const next = new Set(selected);
  if (next.has(id)) next.delete(id);
  else {
    if (field.maxSelections && next.size >= field.maxSelections) return [...next];
    next.add(id);
  }
  return [...next];
}

function gridCols(field: WizardField, options: ChoiceOption[]): string {
  const n = field.columns ?? Math.min(options.length, 4);
  return (
    {
      1: "grid-cols-1",
      2: "grid-cols-1 sm:grid-cols-2",
      3: "grid-cols-2 sm:grid-cols-3",
      4: "grid-cols-2 sm:grid-cols-4",
      5: "grid-cols-3 sm:grid-cols-5",
      6: "grid-cols-3 sm:grid-cols-6",
    }[Math.min(Math.max(n, 1), 6)] ?? "grid-cols-2"
  );
}

/* Shared card chrome: unselected vs selected borders and fills. */
const cardBase =
  "group relative flex flex-col rounded-[var(--ob-radius-lg)] border text-left transition-all " +
  "focus-visible:outline-none focus-visible:[box-shadow:var(--ob-ring)]";
const cardIdle =
  "border-[color:var(--ob-border)] bg-[color:var(--ob-surface)] hover:border-[color:var(--ob-border-strong)]";
const cardOn =
  "border-[color:var(--ob-brand)] bg-[color:var(--ob-brand-soft)] " +
  "[box-shadow:0_0_0_1px_var(--ob-brand)]";

function CornerCheck({ on, multiple }: { on: boolean; multiple: boolean }) {
  return (
    <span
      aria-hidden
      className={cn(
        "absolute right-3 top-3 grid size-6 place-items-center transition-colors",
        multiple ? "rounded-[7px]" : "rounded-full",
        on
          ? "bg-[color:var(--ob-brand)] text-[color:var(--ob-brand-fg)]"
          : "border border-[color:var(--ob-border-strong)] opacity-60",
      )}
    >
      {on && <Check className="size-3.5" strokeWidth={3} />}
    </span>
  );
}

/** Renders any `WizardField` from its config. */
export function Field({ field, value, onChange, tone = "light" }: FieldProps) {
  const options = field.options ?? [];
  const selected = useSelection(field, value);
  const multiple = isMultiple(field);
  const pick = (id: string) => onChange(toggleSelection(field, selected, id));

  switch (field.kind) {
    /* ---------------- Cards with a title and description ---------------- */
    case "choice-cards":
      return (
        <div className={cn("grid gap-3", gridCols(field, options))} role="group">
          {options.map((option) => {
            const on = selected.has(option.id);
            return (
              <button
                key={option.id}
                type="button"
                aria-pressed={on}
                onClick={() => pick(option.id)}
                className={cn(
                  cardBase,
                  on ? cardOn : cardIdle,
                  "items-center gap-2 p-6 pt-8 text-center",
                )}
              >
                {field.checkPosition !== "none" && (
                  <CornerCheck on={on} multiple={multiple} />
                )}
                {option.code ? (
                  <pre className="mb-3 whitespace-pre-wrap font-[family-name:var(--ob-font-mono)] text-[0.8rem] leading-relaxed text-[color:var(--ob-fg-soft)]">
                    {option.code}
                  </pre>
                ) : option.glyph ? (
                  <span className="mb-2 text-2xl" aria-hidden>
                    {option.glyph}
                  </span>
                ) : null}
                <span className="text-[1.05rem] font-bold">{option.label}</span>
                {option.description && (
                  <span className="text-sm leading-relaxed text-[color:var(--ob-muted)]">
                    {option.description}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      );

    /* -------------------- Tall poster tiles -------------------- */
    case "poster-cards":
      return (
        <div className={cn("grid gap-2", gridCols(field, options))} role="group">
          {options.map((option) => {
            const on = selected.has(option.id);
            return (
              <button
                key={option.id}
                type="button"
                aria-pressed={on}
                onClick={() => pick(option.id)}
                className={cn(
                  "relative flex aspect-[3/4] items-end justify-center overflow-hidden rounded-[var(--ob-radius-lg)]",
                  "p-5 text-center transition-all focus-visible:outline-none focus-visible:[box-shadow:var(--ob-ring)]",
                  on ? "scale-[1.01]" : "opacity-80 hover:opacity-100",
                )}
                style={{
                  background: on
                    ? (option.gradient ??
                      "linear-gradient(160deg,#13322b,#6fd8c0)")
                    : "var(--ob-surface-2)",
                }}
              >
                <span
                  className={cn(
                    "text-[1.05rem] font-semibold",
                    on ? "text-white" : "text-[color:var(--ob-muted)]",
                  )}
                >
                  {option.label}
                </span>
              </button>
            );
          })}
        </div>
      );

    /* ------------- Full-width rows: icon, title, sub, check ------------- */
    case "list-rows": {
      const pillStyle = field.rowStyle === "pill";
      return (
        <div
          role="group"
          className={cn(
            "grid gap-3",
            pillStyle ? "grid-cols-1" : gridCols(field, options),
          )}
        >
          {options.map((option) => {
            const on = selected.has(option.id);
            return (
              <button
                key={option.id}
                type="button"
                aria-pressed={on}
                onClick={() => pick(option.id)}
                className={cn(
                  "flex items-center gap-3 border text-left transition-all",
                  "focus-visible:outline-none focus-visible:[box-shadow:var(--ob-ring)]",
                  pillStyle
                    ? "justify-center rounded-full px-6 py-4 font-medium"
                    : "rounded-[var(--ob-radius)] px-4 py-3.5",
                  on
                    ? "border-[color:var(--ob-brand)] bg-[color:var(--ob-surface)] [box-shadow:0_0_0_1px_var(--ob-brand)]"
                    : cardIdle,
                )}
              >
                {option.glyph && !pillStyle && (
                  <IconTile glyph={option.glyph} tone={option.glyphTone} size="sm" />
                )}
                <span className="flex-1">
                  <span className="block text-[0.95rem] font-semibold">
                    {option.label}
                  </span>
                  {option.description && (
                    <span className="block text-[0.82rem] text-[color:var(--ob-muted)]">
                      {option.description}
                    </span>
                  )}
                </span>
                {!pillStyle &&
                  field.checkPosition !== "none" &&
                  (multiple ? <CheckBox checked={on} /> : <Radio checked={on} />)}
              </button>
            );
          })}
        </div>
      );
    }

    /* ------------------- Dense grid of icon tiles ------------------- */
    case "icon-grid":
      return (
        <div
          role="group"
          className={cn("grid gap-3", gridCols({ ...field, columns: field.columns ?? 6 }, options))}
        >
          {options.map((option) => {
            const on = selected.has(option.id);
            return (
              <button
                key={option.id}
                type="button"
                aria-pressed={on}
                onClick={() => pick(option.id)}
                className={cn(
                  cardBase,
                  on ? cardOn : cardIdle,
                  "items-center justify-center gap-3 p-5",
                )}
              >
                {field.checkPosition !== "none" && (
                  <CornerCheck on={on} multiple={multiple} />
                )}
                <IconTile glyph={option.glyph} tone={option.glyphTone} size="lg" />
                <span className="text-center text-sm font-semibold">
                  {option.label}
                </span>
              </button>
            );
          })}
        </div>
      );

    /* --------------- Inline chip sentence / compact chips --------------- */
    case "chips":
    case "multi-select":
      return (
        <div className="flex flex-wrap items-center justify-center gap-2" role="group">
          {field.prefix && (
            <span className="mr-1 text-[color:var(--ob-muted)]">{field.prefix}</span>
          )}
          {options.map((option) => {
            const on = selected.has(option.id);
            return (
              <button
                key={option.id}
                type="button"
                aria-pressed={on}
                onClick={() => pick(option.id)}
                className={cn(
                  "rounded-full px-5 py-2.5 text-[0.95rem] transition-all",
                  "focus-visible:outline-none focus-visible:[box-shadow:var(--ob-ring)]",
                  on
                    ? "bg-[color:var(--ob-fg)] font-semibold text-[color:var(--ob-bg)]"
                    : "bg-[color:var(--ob-surface-2)] text-[color:var(--ob-fg)] hover:bg-[color:var(--ob-surface-3)]",
                )}
              >
                {option.label}
              </button>
            );
          })}
        </div>
      );

    /* --------------------- Circular avatar picker --------------------- */
    case "avatar-picker": {
      const current = typeof value === "string" ? value : null;
      return (
        <div className="flex flex-wrap items-center justify-center gap-3" role="group">
          {field.allowUpload !== false && (
            <button
              type="button"
              aria-label="Upload a picture"
              className="grid size-[68px] place-items-center rounded-full border-2 border-dashed border-[color:var(--ob-border-strong)] bg-[color:var(--ob-surface)] transition-colors hover:border-[color:var(--ob-fg-soft)]"
            >
              <Plus className="size-5" />
            </button>
          )}
          {options.map((option) => {
            const on = current === option.id;
            return (
              <button
                key={option.id}
                type="button"
                aria-pressed={on}
                aria-label={option.label}
                onClick={() => onChange(option.id)}
                className={cn(
                  "grid size-[68px] place-items-center overflow-hidden rounded-full text-2xl transition-all",
                  "focus-visible:outline-none focus-visible:[box-shadow:var(--ob-ring)]",
                  on
                    ? "[box-shadow:0_0_0_2px_var(--ob-fg)]"
                    : "hover:[box-shadow:0_0_0_2px_var(--ob-border-strong)]",
                )}
                style={{ background: option.glyphTone ?? "var(--ob-surface-2)" }}
              >
                {option.glyph}
              </button>
            );
          })}
          {field.allowShuffle && (
            <button
              type="button"
              aria-label="Shuffle"
              onClick={() => {
                const pool = options.filter((o) => o.id !== current);
                const next = pool[Math.floor(Math.random() * pool.length)];
                if (next) onChange(next.id);
              }}
              className="grid size-11 place-items-center rounded-full border border-[color:var(--ob-border)] bg-[color:var(--ob-surface)] hover:bg-[color:var(--ob-surface-2)]"
            >
              <Shuffle className="size-4" />
            </button>
          )}
        </div>
      );
    }

    /* ------------------- Action rows with a chevron ------------------- */
    case "action-rows":
      return (
        <div className="grid gap-3">
          {options.map((option) => {
            const on = selected.has(option.id);
            return (
              <button
                key={option.id}
                type="button"
                onClick={() => pick(option.id)}
                className={cn(
                  "flex items-center gap-3 rounded-[var(--ob-radius)] border px-4 py-4 text-left transition-colors",
                  "focus-visible:outline-none focus-visible:[box-shadow:var(--ob-ring)]",
                  cardIdle,
                )}
              >
                {option.glyph && <span className="text-lg">{option.glyph}</span>}
                <span className="flex-1 font-semibold">{option.label}</span>
                {on ? (
                  <span className="grid size-6 place-items-center rounded-full bg-[color:var(--ob-success)] text-white">
                    <Check className="size-3.5" strokeWidth={3} />
                  </span>
                ) : (
                  <ChevronRight className="size-5 text-[color:var(--ob-muted)]" />
                )}
              </button>
            );
          })}
        </div>
      );

    /* ------------------------ Segmented tabs ------------------------ */
    case "segmented": {
      const active =
        (typeof value === "string" && value) || options[0]?.id || "";
      const panel = options.find((o) => o.id === active)?.panel;
      return (
        <div className="grid gap-4">
          <div
            role="tablist"
            className="grid grid-flow-col rounded-[var(--ob-radius)] bg-[color:var(--ob-surface-2)] p-1"
          >
            {options.map((option) => (
              <button
                key={option.id}
                type="button"
                role="tab"
                aria-selected={active === option.id}
                onClick={() => onChange(option.id)}
                className={cn(
                  "rounded-[calc(var(--ob-radius)-0.25rem)] px-4 py-2.5 text-sm font-semibold transition-all",
                  active === option.id
                    ? "bg-[color:var(--ob-surface)] [box-shadow:var(--ob-shadow)]"
                    : "text-[color:var(--ob-muted)] hover:text-[color:var(--ob-fg)]",
                )}
              >
                {option.label}
              </button>
            ))}
          </div>
          {panel && (
            <div className="ob-animate-in rounded-[var(--ob-radius-lg)] border border-[color:var(--ob-border)] bg-[color:var(--ob-surface)] p-5">
              {panel.title && (
                <h4 className="mb-1.5 font-bold">{panel.title}</h4>
              )}
              {panel.body && (
                <p className="mb-4 text-[0.92rem] leading-relaxed text-[color:var(--ob-fg-soft)]">
                  {panel.body}
                </p>
              )}
              <div className="grid gap-2">
                {panel.rows?.map((row, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 rounded-[var(--ob-radius-sm)] bg-[color:var(--ob-surface-2)] px-3 py-2.5"
                  >
                    <span className="flex-1 text-sm font-semibold">{row.label}</span>
                    {row.chip && (
                      <span
                        className="rounded-full px-2.5 py-1 text-[0.7rem] font-bold uppercase"
                        style={{
                          background: row.chipTone ?? "var(--ob-surface-3)",
                        }}
                      >
                        {row.chip}
                      </span>
                    )}
                    {row.value && (
                      <span className="text-sm font-bold tabular-nums">{row.value}</span>
                    )}
                  </div>
                ))}
              </div>
              {panel.note && (
                <p className="mt-4 text-[0.88rem] text-[color:var(--ob-fg-soft)]">
                  {panel.note}
                </p>
              )}
            </div>
          )}
        </div>
      );
    }

    /* -------------------- Wordmark / logo tiles -------------------- */
    case "logo-grid":
      return (
        <div className={cn("grid gap-3", gridCols({ ...field, columns: field.columns ?? 4 }, options))}>
          {options.map((option) => {
            const on = selected.has(option.id);
            return (
              <button
                key={option.id}
                type="button"
                aria-pressed={on}
                onClick={() => pick(option.id)}
                className={cn(
                  "grid h-20 place-items-center rounded-[var(--ob-radius)] border px-3 text-center text-sm font-bold transition-all",
                  on ? cardOn : cardIdle,
                )}
              >
                {option.wordmark ?? option.label}
              </button>
            );
          })}
        </div>
      );

    /* --------------------------- Text input --------------------------- */
    case "text":
      return (
        <label className="block rounded-[var(--ob-radius)] border border-[color:var(--ob-border-strong)] bg-[color:var(--ob-surface-2)] px-4 py-2.5 transition-colors focus-within:border-[color:var(--ob-brand)] focus-within:[box-shadow:var(--ob-ring)]">
          {field.floatingLabel && (
            <span className="block text-[0.78rem] text-[color:var(--ob-muted)]">
              {field.floatingLabel}
            </span>
          )}
          <input
            type="text"
            value={typeof value === "string" ? value : ""}
            placeholder={field.placeholder}
            onChange={(e) => onChange(e.target.value)}
            className="w-full bg-transparent text-[1.05rem] outline-none placeholder:text-[color:var(--ob-muted)]"
          />
        </label>
      );

    /* ------------------------ Consent checkbox ------------------------ */
    case "consent":
      return (
        <button
          type="button"
          role="checkbox"
          aria-checked={value === true}
          onClick={() => onChange(value !== true)}
          className="flex items-start gap-3 text-left"
        >
          <span className="pt-0.5">
            <CheckBox checked={value === true} />
          </span>
          <span className="text-[0.88rem] leading-relaxed text-[color:var(--ob-fg-soft)]">
            {field.consentText ?? field.label}
          </span>
        </button>
      );

    /* ---------------------------- Toggle ---------------------------- */
    case "toggle":
      return (
        <div className="flex justify-center">
          <Toggle
            checked={value === true}
            onChange={onChange}
            label={field.label}
          />
        </div>
      );

    /* ---------------------------- Slider ---------------------------- */
    case "slider": {
      const min = field.min ?? 1;
      const max = field.max ?? 100;
      const current = typeof value === "number" ? value : min;
      return (
        <div className="grid gap-3">
          <div className="flex items-baseline justify-between">
            <span className="text-sm text-[color:var(--ob-muted)]">{field.label}</span>
            <span className="text-xl font-bold tabular-nums">{current}</span>
          </div>
          <input
            type="range"
            min={min}
            max={max}
            step={field.step ?? 1}
            value={current}
            aria-label={field.label}
            onChange={(e) => onChange(Number(e.target.value))}
            className="w-full accent-[color:var(--ob-brand)]"
          />
        </div>
      );
    }

    /* -------------------------- Email list -------------------------- */
    case "email-list": {
      const emails = Array.isArray(value) ? value : [];
      return (
        <div className="grid gap-2">
          {[0, 1, 2].map((i) => (
            <input
              key={i}
              type="email"
              value={emails[i] ?? ""}
              placeholder={field.placeholder ?? "name@company.com"}
              onChange={(e) => {
                const next = [...emails];
                next[i] = e.target.value;
                onChange(next.filter((v, idx) => v !== "" || idx < next.length - 1));
              }}
              className="w-full rounded-[var(--ob-radius)] border border-[color:var(--ob-border)] bg-[color:var(--ob-surface)] px-4 py-3 outline-none focus:border-[color:var(--ob-brand)] focus:[box-shadow:var(--ob-ring)]"
            />
          ))}
        </div>
      );
    }

    default:
      return null;
  }
}
