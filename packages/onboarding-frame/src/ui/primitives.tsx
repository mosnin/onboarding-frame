"use client";

import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "../lib/cn";
import { percent } from "../lib/utils";
import { Check, ChevronRight, Moon, Star, Sun } from "./icons";

/* ------------------------------ Button ------------------------------ */

export type ButtonTone =
  /** High-contrast pill: light on dark surfaces, dark on light ones. */
  | "cta"
  /** Solid brand colour. */
  | "brand"
  /** Tinted brand pill with dark text. */
  | "brand-soft"
  /** Brand gradient wash. */
  | "gradient"
  | "outline"
  | "ghost"
  | "link";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  tone?: ButtonTone;
  size?: "sm" | "md" | "lg";
  shape?: "pill" | "rounded";
  block?: boolean;
  children?: ReactNode;
}

const TONES: Record<ButtonTone, string> = {
  cta: "bg-[color:var(--ob-cta-bg)] text-[color:var(--ob-cta-fg)] hover:opacity-90 disabled:bg-[color:var(--ob-surface-3)] disabled:text-[color:var(--ob-muted)]",
  brand:
    "bg-[color:var(--ob-brand)] text-[color:var(--ob-brand-fg)] hover:opacity-90 disabled:bg-[color:var(--ob-surface-3)] disabled:text-[color:var(--ob-muted)]",
  "brand-soft":
    "bg-[color-mix(in_oklab,var(--ob-brand)_38%,white)] text-[color:#10281a] hover:bg-[color-mix(in_oklab,var(--ob-brand)_50%,white)] disabled:bg-[color:var(--ob-surface-3)] disabled:text-[color:var(--ob-muted)]",
  gradient:
    "text-white bg-[linear-gradient(90deg,color-mix(in_oklab,var(--ob-brand)_88%,black)_0%,var(--ob-brand)_100%)] hover:opacity-95 disabled:opacity-50",
  outline:
    "border border-[color:var(--ob-border-strong)] bg-[color:var(--ob-surface)] text-[color:var(--ob-fg)] hover:bg-[color:var(--ob-surface-2)]",
  ghost: "text-[color:var(--ob-fg)] hover:bg-[color:var(--ob-surface-2)]",
  link: "text-[color:var(--ob-brand)] underline underline-offset-4 hover:opacity-80",
};

const SIZES = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-5 text-[0.95rem]",
  lg: "h-14 px-8 text-base",
} as const;

export function Button({
  tone = "cta",
  size = "md",
  shape = "pill",
  block,
  className,
  children,
  ...rest
}: ButtonProps) {
  return (
    <button
      type="button"
      className={cn(
        "inline-flex items-center justify-center gap-2 font-semibold transition-all",
        "focus-visible:outline-none focus-visible:[box-shadow:var(--ob-ring)]",
        "disabled:cursor-not-allowed",
        shape === "pill" ? "rounded-full" : "rounded-[var(--ob-radius)]",
        tone !== "link" && tone !== "ghost" && SIZES[size],
        (tone === "link" || tone === "ghost") && "px-2 py-1 text-sm",
        TONES[tone],
        block && "w-full",
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  );
}

/* ---------------------------- Progress ---------------------------- */

export function ProgressBar({
  value,
  total,
  className,
}: {
  value: number;
  total: number;
  className?: string;
}) {
  const pct = percent(value, total);
  return (
    <div
      role="progressbar"
      aria-valuenow={pct}
      aria-valuemin={0}
      aria-valuemax={100}
      className={cn(
        "h-1.5 w-full overflow-hidden rounded-full bg-[color:var(--ob-surface-3)]",
        className,
      )}
    >
      <div
        className="h-full rounded-full bg-[color:var(--ob-brand)] transition-[width] duration-500 ease-out"
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}

export function Dots({
  count,
  active,
  onSelect,
  className,
}: {
  count: number;
  active: number;
  onSelect?: (index: number) => void;
  className?: string;
}) {
  return (
    <div className={cn("flex items-center gap-1.5", className)}>
      {Array.from({ length: count }, (_, i) => (
        <button
          key={i}
          type="button"
          aria-label={`Step ${i + 1} of ${count}`}
          aria-current={i === active}
          disabled={!onSelect}
          onClick={() => onSelect?.(i)}
          className={cn(
            "h-1.5 rounded-full transition-all",
            i === active
              ? "w-1.5 bg-[color:var(--ob-fg)]"
              : "w-1.5 bg-[color:var(--ob-border-strong)]",
            onSelect && "cursor-pointer",
          )}
        />
      ))}
    </div>
  );
}

export function Breadcrumbs({
  items,
  activeIndex,
  onSelect,
  className,
}: {
  items: { id: string; label: string }[];
  activeIndex: number;
  onSelect?: (index: number) => void;
  className?: string;
}) {
  return (
    <nav className={cn("flex items-center gap-1 text-sm", className)}>
      {items.map((item, i) => {
        const state = i < activeIndex ? "done" : i === activeIndex ? "active" : "todo";
        return (
          <span key={item.id} className="flex items-center gap-1">
            {i > 0 && (
              <ChevronRight className="size-4 text-[color:var(--ob-border-strong)]" />
            )}
            <button
              type="button"
              disabled={!onSelect || state === "todo"}
              onClick={() => onSelect?.(i)}
              aria-current={state === "active" ? "step" : undefined}
              className={cn(
                "rounded px-1.5 py-0.5 font-semibold transition-colors",
                state === "active" && "text-[color:var(--ob-fg)]",
                state === "done" && "text-[color:var(--ob-fg-soft)] hover:underline",
                state === "todo" && "text-[color:var(--ob-muted)] opacity-60",
              )}
            >
              {item.label}
            </button>
          </span>
        );
      })}
    </nav>
  );
}

/* ---------------------------- Controls ---------------------------- */

export function Toggle({
  checked,
  onChange,
  label,
  className,
}: {
  checked: boolean;
  onChange: (next: boolean) => void;
  label?: string;
  className?: string;
}) {
  return (
    <label className={cn("inline-flex items-center gap-3", className)}>
      {label && <span className="text-[0.95rem]">{label}</span>}
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={label}
        onClick={() => onChange(!checked)}
        className={cn(
          "relative h-7 w-12 rounded-full transition-colors focus-visible:outline-none focus-visible:[box-shadow:var(--ob-ring)]",
          checked
            ? "bg-[linear-gradient(90deg,color-mix(in_oklab,var(--ob-brand)_55%,#1c4b3a),var(--ob-brand))]"
            : "bg-[color:var(--ob-surface-3)]",
        )}
      >
        <span
          className={cn(
            "absolute top-1 size-5 rounded-full bg-white shadow transition-[left] duration-200",
            checked ? "left-6" : "left-1",
          )}
        />
      </button>
    </label>
  );
}

export function CheckBox({
  checked,
  tone = "brand",
  className,
}: {
  checked: boolean;
  tone?: "brand" | "success";
  className?: string;
}) {
  return (
    <span
      aria-hidden
      className={cn(
        "grid size-5 shrink-0 place-items-center rounded-[6px] border transition-colors",
        checked
          ? tone === "success"
            ? "border-transparent bg-[color:var(--ob-success)] text-white"
            : "border-transparent bg-[color:var(--ob-brand)] text-[color:var(--ob-brand-fg)]"
          : "border-[color:var(--ob-border-strong)] bg-[color:var(--ob-surface)]",
        className,
      )}
    >
      {checked && <Check className="size-3.5" strokeWidth={3} />}
    </span>
  );
}

export function Radio({ checked }: { checked: boolean }) {
  return (
    <span
      aria-hidden
      className={cn(
        "grid size-5 shrink-0 place-items-center rounded-full border transition-colors",
        checked
          ? "border-transparent bg-[color:var(--ob-brand)] text-[color:var(--ob-brand-fg)]"
          : "border-[color:var(--ob-border-strong)]",
      )}
    >
      {checked && <Check className="size-3" strokeWidth={3} />}
    </span>
  );
}

/* ----------------------------- Display ----------------------------- */

export function IconTile({
  glyph,
  tone,
  size = "md",
  className,
}: {
  glyph?: string;
  tone?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const dims = { sm: "size-8 text-base", md: "size-10 text-xl", lg: "size-14 text-2xl" };
  return (
    <span
      aria-hidden
      className={cn(
        "grid shrink-0 place-items-center rounded-[10px]",
        dims[size],
        className,
      )}
      style={{ background: tone ?? "var(--ob-surface-2)" }}
    >
      {glyph}
    </span>
  );
}

export function Pill({
  children,
  gradient,
  className,
}: {
  children: ReactNode;
  gradient?: boolean;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold tracking-wide uppercase",
        gradient
          ? "text-[#1a1020] [background:linear-gradient(90deg,#f7c7e6,#f6d38a)]"
          : "bg-[color:var(--ob-brand-soft)] text-[color:var(--ob-brand)]",
        className,
      )}
    >
      {children}
    </span>
  );
}

export function Stars({ count = 5 }: { count?: number }) {
  return (
    <span className="flex gap-0.5 text-[#f5a623]" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: count }, (_, i) => (
        <Star key={i} />
      ))}
    </span>
  );
}

export function SchemeToggle({
  scheme,
  onChange,
  className,
}: {
  scheme: "light" | "dark";
  onChange: (next: "light" | "dark") => void;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border border-[color:var(--ob-border)] bg-[color:var(--ob-surface)] p-0.5",
        className,
      )}
    >
      {(["light", "dark"] as const).map((value) => (
        <button
          key={value}
          type="button"
          aria-label={`${value} mode`}
          aria-pressed={scheme === value}
          onClick={() => onChange(value)}
          className={cn(
            "grid size-7 place-items-center rounded-full transition-colors",
            scheme === value
              ? "bg-[color:var(--ob-brand-soft)] text-[color:var(--ob-fg)]"
              : "text-[color:var(--ob-muted)]",
          )}
        >
          {value === "light" ? <Sun /> : <Moon />}
        </button>
      ))}
    </div>
  );
}

/** Lightweight celebratory burst; respects reduced-motion via the stylesheet. */
export function Confetti({ pieces = 28 }: { pieces?: number }) {
  const colors = ["#f5a623", "#2f6bff", "#1fd760", "#f76db4", "#9b6bff"];
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {Array.from({ length: pieces }, (_, i) => (
        <span
          key={i}
          className="absolute top-0 block size-1.5 rounded-[2px]"
          style={{
            left: `${(i * 97) % 100}%`,
            background: colors[i % colors.length],
            animation: `ob-confetti-fall ${900 + (i % 5) * 220}ms ${
              (i % 7) * 60
            }ms var(--ob-ease) forwards`,
          }}
        />
      ))}
    </div>
  );
}
