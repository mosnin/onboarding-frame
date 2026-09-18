"use client";

import { cn } from "../lib/cn";

/**
 * The product's own logo lockup: a mark beside the name.
 *
 * Nearly every reference screenshot opens with one — top-left of the rail or
 * the header — and thirteen templates drew it as a dotted grey box, which is
 * what made a screen read as broken rather than as a recreation (CLAUDE.md,
 * rule 3). The logo belongs to whoever ejects the template, so there is no
 * asset to place; what there *is* is a shape and a weight, and those are the
 * things the reference actually measures.
 *
 * The mark is a rounded tile in the template's own brand colour with the
 * name's first letter knocked out of it, which is what the majority of the
 * references draw. `mark="none"` is for the lockups that are type only.
 */
export interface WordmarkProps {
  /** The product name. Its first letter becomes the mark. */
  name: string;
  /** Cap height of the name, in px — measure it off the reference. */
  size?: number;
  /** Tile edge in px, or "none" for a type-only lockup. */
  mark?: number | "none";
  /** Tile corner radius in px. */
  radius?: number;
  /** Tile fill. Defaults to the template's foreground, as most references do. */
  tone?: string;
  className?: string;
}

export function Wordmark({
  name,
  size = 15,
  mark = 22,
  radius = 6,
  tone = "var(--ob-fg)",
  className,
}: WordmarkProps) {
  return (
    <span
      className={cn("inline-flex shrink-0 items-center", className)}
      style={{ gap: Math.round(size * 0.5) }}
    >
      {mark !== "none" && (
        <span
          aria-hidden
          className="grid shrink-0 place-items-center font-bold leading-none text-[color:var(--ob-bg)]"
          style={{
            width: mark,
            height: mark,
            borderRadius: radius,
            background: tone,
            fontSize: Math.round(mark * 0.52),
          }}
        >
          {name.slice(0, 1).toUpperCase()}
        </span>
      )}
      <span
        className="font-semibold leading-none tracking-[-0.02em]"
        style={{ fontSize: size }}
      >
        {name}
      </span>
    </span>
  );
}
