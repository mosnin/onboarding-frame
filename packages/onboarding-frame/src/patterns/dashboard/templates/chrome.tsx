"use client";

import type { ReactNode } from "react";
import { cn } from "../../../lib/cn";
import { Placeholder } from "../../../ui/placeholder";
import { ChatIcon, ChevronDown, Cross, SearchIcon } from "../../../ui/icons";

/**
 * Shared application chrome.
 *
 * The dashboard templates are 1:1 recreations of real product surfaces, so
 * they share a vocabulary: a sidebar, a top bar, cards, tabs, tables. Keeping
 * those here means each template file is composition and content, not
 * boilerplate, and a design change lands everywhere at once.
 */

/* ------------------------------ Shell ------------------------------ */

export function Shell({
  children,
  className,
  bg = "var(--ob-bg)",
}: {
  children: ReactNode;
  className?: string;
  bg?: string;
}) {
  return (
    <div
      className={cn(
        "flex min-h-[560px] w-full overflow-hidden text-[color:var(--ob-fg)] sm:min-h-[860px]",
        className,
      )}
      style={{ background: bg }}
    >
      {children}
    </div>
  );
}

export function Sidebar({
  children,
  width = 248,
  className,
  bg,
}: {
  children: ReactNode;
  width?: number;
  className?: string;
  bg?: string;
}) {
  return (
    <aside
      className={cn(
        "hidden shrink-0 flex-col border-r border-[color:var(--ob-border)] lg:flex",
        className,
      )}
      style={{ width, background: bg }}
    >
      {children}
    </aside>
  );
}

export function Main({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <main className={cn("flex min-w-0 flex-1 flex-col overflow-x-hidden", className)}>
      {children}
    </main>
  );
}

/* ------------------------------ Nav ------------------------------ */

export function NavSection({ label }: { label: string }) {
  return (
    <p className="px-3 pb-1.5 pt-5 text-[0.7rem] font-semibold uppercase tracking-wide text-[color:var(--ob-muted)]">
      {label}
    </p>
  );
}

export function NavItem({
  label,
  glyph,
  active,
  badge,
  trailing,
  indent,
  muted,
  className,
}: {
  label: ReactNode;
  glyph?: ReactNode;
  active?: boolean;
  badge?: ReactNode;
  trailing?: ReactNode;
  indent?: boolean;
  muted?: boolean;
  className?: string;
}) {
  return (
    <button
      type="button"
      aria-current={active ? "page" : undefined}
      className={cn(
        "flex w-full items-center gap-2.5 rounded-[8px] px-3 py-2 text-left text-[0.9rem] transition-colors",
        indent && "pl-9",
        active
          ? "bg-[color:var(--ob-surface-2)] font-semibold"
          : muted
            ? "text-[color:var(--ob-muted)] hover:bg-[color:var(--ob-surface-2)]"
            : "text-[color:var(--ob-fg-soft)] hover:bg-[color:var(--ob-surface-2)]",
        className,
      )}
    >
      {glyph && <span className="w-4 shrink-0 text-center opacity-80">{glyph}</span>}
      <span className="flex-1 truncate">{label}</span>
      {badge !== undefined && (
        <span className="shrink-0 text-[0.75rem] tabular-nums text-[color:var(--ob-muted)]">
          {badge}
        </span>
      )}
      {trailing}
    </button>
  );
}

/* ------------------------------ Top bar ------------------------------ */

export function TopBar({
  children,
  className,
  bg,
  border = true,
}: {
  children: ReactNode;
  className?: string;
  bg?: string;
  border?: boolean;
}) {
  return (
    <header
      className={cn(
        "flex h-14 shrink-0 items-center gap-3 px-4 sm:px-6",
        border && "border-b border-[color:var(--ob-border)]",
        className,
      )}
      style={{ background: bg }}
    >
      {children}
    </header>
  );
}

export function SearchField({
  placeholder = "Search",
  shortcut,
  className,
  rounded = "full",
}: {
  placeholder?: string;
  shortcut?: string;
  className?: string;
  rounded?: "full" | "md";
}) {
  return (
    <div
      className={cn(
        "flex items-center gap-2 border border-[color:var(--ob-border)] bg-[color:var(--ob-surface-2)] px-3 py-2 text-[0.88rem] text-[color:var(--ob-muted)]",
        rounded === "full" ? "rounded-full" : "rounded-[8px]",
        className,
      )}
    >
      <SearchIcon className="shrink-0 opacity-70" />
      <span className="flex-1 truncate">{placeholder}</span>
      {shortcut && (
        <kbd className="rounded border border-[color:var(--ob-border)] px-1.5 py-0.5 text-[0.68rem] font-semibold">
          {shortcut}
        </kbd>
      )}
    </div>
  );
}

/* ------------------------------ Atoms ------------------------------ */

export function Card({
  children,
  className,
  padded = true,
}: {
  children: ReactNode;
  className?: string;
  padded?: boolean;
}) {
  return (
    <section
      className={cn(
        "rounded-[var(--ob-radius)] border border-[color:var(--ob-border)] bg-[color:var(--ob-surface)]",
        padded && "p-5",
        className,
      )}
    >
      {children}
    </section>
  );
}

export function CardTitle({
  children,
  action,
  className,
}: {
  children: ReactNode;
  action?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <h3 className="flex-1 font-bold">{children}</h3>
      {action}
    </div>
  );
}

export type ChipTone = "neutral" | "brand" | "success" | "warn" | "danger" | "info";

const CHIP_TONES: Record<ChipTone, string> = {
  neutral: "bg-[color:var(--ob-surface-2)] text-[color:var(--ob-fg-soft)]",
  brand: "bg-[color:var(--ob-brand-soft)] text-[color:var(--ob-brand)]",
  success: "bg-[color-mix(in_oklab,var(--ob-success)_16%,transparent)] text-[color:var(--ob-success)]",
  warn: "bg-[color-mix(in_oklab,#f5a623_18%,transparent)] text-[#b97309]",
  danger: "bg-[color-mix(in_oklab,var(--ob-danger)_14%,transparent)] text-[color:var(--ob-danger)]",
  info: "bg-[color-mix(in_oklab,#4f7cf7_16%,transparent)] text-[#3f6ae0]",
};

export function Chip({
  children,
  tone = "neutral",
  className,
}: {
  children: ReactNode;
  tone?: ChipTone;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[0.72rem] font-semibold",
        CHIP_TONES[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

export function Btn({
  children,
  tone = "neutral",
  size = "md",
  className,
}: {
  children: ReactNode;
  tone?: "primary" | "neutral" | "ghost" | "dark";
  size?: "sm" | "md";
  className?: string;
}) {
  return (
    <button
      type="button"
      className={cn(
        "inline-flex shrink-0 items-center justify-center gap-1.5 rounded-[8px] font-semibold transition-opacity hover:opacity-90",
        size === "sm" ? "px-2.5 py-1.5 text-[0.8rem]" : "px-3.5 py-2 text-[0.86rem]",
        tone === "primary" && "bg-[color:var(--ob-brand)] text-[color:var(--ob-brand-fg)]",
        tone === "dark" && "bg-[color:var(--ob-cta-bg)] text-[color:var(--ob-cta-fg)]",
        tone === "neutral" &&
          "border border-[color:var(--ob-border-strong)] bg-[color:var(--ob-surface)]",
        tone === "ghost" && "text-[color:var(--ob-fg-soft)] hover:bg-[color:var(--ob-surface-2)]",
        className,
      )}
    >
      {children}
    </button>
  );
}

/** Underlined tab strip. */
export function Tabs({
  items,
  active,
  className,
}: {
  items: { id: string; label: ReactNode; badge?: ReactNode; disabled?: boolean }[];
  active: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex items-center gap-6 border-b border-[color:var(--ob-border)]",
        className,
      )}
    >
      {items.map((item) => (
        <button
          key={item.id}
          type="button"
          aria-selected={item.id === active}
          className={cn(
            "-mb-px flex items-center gap-2 whitespace-nowrap border-b-2 pb-3 pt-1 text-[0.92rem] font-semibold transition-colors",
            item.id === active
              ? "border-[color:var(--ob-brand)] text-[color:var(--ob-fg)]"
              : "border-transparent text-[color:var(--ob-muted)] hover:text-[color:var(--ob-fg)]",
            item.disabled && "opacity-45",
          )}
        >
          {item.label}
          {item.badge}
        </button>
      ))}
    </div>
  );
}

/** Pill-style segmented control. */
export function Segmented({
  items,
  active,
  className,
}: {
  items: { id: string; label: ReactNode }[];
  active: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-1 rounded-full bg-[color:var(--ob-surface-2)] p-1",
        className,
      )}
    >
      {items.map((item) => (
        <button
          key={item.id}
          type="button"
          aria-pressed={item.id === active}
          className={cn(
            "rounded-full px-3 py-1.5 text-[0.82rem] font-semibold transition-colors",
            item.id === active
              ? "bg-[color:var(--ob-surface)] [box-shadow:var(--ob-shadow)]"
              : "text-[color:var(--ob-muted)]",
          )}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}

export function Select({
  label,
  glyph,
  className,
}: {
  label: ReactNode;
  glyph?: ReactNode;
  className?: string;
}) {
  return (
    <button
      type="button"
      className={cn(
        "inline-flex items-center gap-2 rounded-[8px] border border-[color:var(--ob-border-strong)] bg-[color:var(--ob-surface)] px-3 py-2 text-[0.86rem] font-medium",
        className,
      )}
    >
      {glyph}
      <span>{label}</span>
      <ChevronDown width={14} height={14} className="opacity-50" />
    </button>
  );
}

/* ------------------------------ Table ------------------------------ */

export function Table({
  columns,
  rows,
  align,
  className,
}: {
  columns: ReactNode[];
  rows: ReactNode[][];
  /** Per-column alignment; defaults to left for the first, right for the rest. */
  align?: ("left" | "right" | "center")[];
  className?: string;
}) {
  const alignFor = (i: number) => align?.[i] ?? (i === 0 ? "left" : "right");
  return (
    <div className={cn("w-full overflow-x-auto", className)}>
      <table className="w-full border-collapse text-[0.88rem]">
        <thead>
          <tr>
            {columns.map((column, i) => (
              <th
                key={i}
                className="whitespace-nowrap border-b border-[color:var(--ob-border)] px-3 py-2.5 text-[0.75rem] font-semibold uppercase tracking-wide text-[color:var(--ob-muted)]"
                style={{ textAlign: alignFor(i) }}
              >
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-b border-[color:var(--ob-border)] last:border-b-0">
              {row.map((cell, j) => (
                <td
                  key={j}
                  className="px-3 py-3 align-middle"
                  style={{ textAlign: alignFor(j) }}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ------------------------------ Misc ------------------------------ */

export function Banner({
  children,
  tone = "neutral",
  onCloseLabel = "Dismiss",
  className,
}: {
  children: ReactNode;
  tone?: "neutral" | "dark" | "accent";
  onCloseLabel?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex items-center gap-3 px-5 py-2.5 text-[0.88rem]",
        tone === "dark" && "bg-[#141c34] text-white",
        tone === "accent" && "bg-[color:var(--ob-brand-soft)]",
        tone === "neutral" && "border-b border-[color:var(--ob-border)] bg-[color:var(--ob-surface-2)]",
        className,
      )}
    >
      <div className="flex flex-1 items-center justify-center gap-2 text-center">
        {children}
      </div>
      <button
        type="button"
        aria-label={onCloseLabel}
        className="shrink-0 opacity-60 hover:opacity-100"
      >
        <Cross width={14} height={14} />
      </button>
    </div>
  );
}

/** Round floating action bubble, bottom-right. */
export function Fab({ glyph, tone }: { glyph?: ReactNode; tone?: string }) {
  return (
    <button
      type="button"
      aria-label="Open support chat"
      className="absolute bottom-6 right-6 grid size-12 place-items-center rounded-full text-xl text-white [box-shadow:var(--ob-shadow-lg)]"
      style={{ background: tone ?? "var(--ob-brand)" }}
    >
      {glyph ?? <ChatIcon width={22} height={22} />}
    </button>
  );
}

export function PageTitle({
  children,
  sub,
  action,
  className,
}: {
  children: ReactNode;
  sub?: ReactNode;
  action?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-wrap items-start gap-4", className)}>
      <div className="flex-1">
        <h1 className="text-[1.75rem] font-extrabold tracking-tight">{children}</h1>
        {sub && <p className="mt-1 text-[color:var(--ob-muted)]">{sub}</p>}
      </div>
      {action}
    </div>
  );
}

/** Brand lockup with the logo left as a placeholder slot. */
export function BrandLockup({
  name,
  size = 26,
  className,
}: {
  name: string;
  size?: number;
  className?: string;
}) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <Placeholder width={size} height={size} radius={6} glyph="▦" />
      <span className="text-[0.98rem] font-extrabold tracking-tight">{name}</span>
    </div>
  );
}

/** Small labelled metric used across analytics headers. */
export function Metric({
  label,
  value,
  sub,
  className,
}: {
  label: ReactNode;
  value: ReactNode;
  sub?: ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <p className="text-[0.82rem] text-[color:var(--ob-muted)]">{label}</p>
      <p className="mt-1 text-[1.65rem] font-extrabold tracking-tight tabular-nums">
        {value}
      </p>
      {sub && <p className="text-[0.8rem] text-[color:var(--ob-muted)]">{sub}</p>}
    </div>
  );
}
