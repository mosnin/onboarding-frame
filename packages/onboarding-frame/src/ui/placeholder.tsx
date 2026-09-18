"use client";

import type { ReactNode } from "react";
import { Icon } from "./icons";
import { cn } from "../lib/cn";

/**
 * Placeholder slots.
 *
 * Templates ship with every image, logo, avatar and thumbnail rendered as a
 * labelled dotted slot. Nothing is a stock photo standing in for real content —
 * it is immediately obvious which assets the adopter still has to supply, and
 * the layout already reserves the correct space for them.
 */

export interface PlaceholderProps {
  /** What belongs here, e.g. "Hero image 16:9". Shown when there is room. */
  label?: string;
  /** Aspect ratio as width/height, e.g. 16 / 9. Ignored when `height` is set. */
  ratio?: number;
  height?: number | string;
  width?: number | string;
  /** `box` for media, `circle` for avatars, `pill` for wordmarks. */
  shape?: "box" | "circle" | "pill";
  radius?: number | string;
  glyph?: ReactNode;
  className?: string;
}

export function Placeholder({
  label,
  ratio,
  height,
  width,
  shape = "box",
  radius,
  glyph,
  className,
}: PlaceholderProps) {
  const rounded =
    shape === "circle"
      ? "9999px"
      : shape === "pill"
        ? "9999px"
        : (radius ?? "var(--ob-radius-sm)");

  return (
    <div
      aria-hidden
      data-placeholder=""
      title={label}
      className={cn(
        "relative grid place-items-center overflow-hidden border border-dashed",
        "border-[color:var(--ob-border-strong)] bg-[color:var(--ob-surface-2)]",
        "text-[color:var(--ob-muted)]",
        className,
      )}
      style={{
        width,
        height,
        aspectRatio: height ? undefined : ratio,
        borderRadius: typeof rounded === "number" ? `${rounded}px` : rounded,
      }}
    >
      {/* Faint diagonal hatch reads as "nothing here yet" at any size. */}
      <span
        className="absolute inset-0 opacity-[0.55]"
        style={{
          background:
            "repeating-linear-gradient(135deg, transparent 0 7px, color-mix(in oklab, var(--ob-border-strong) 45%, transparent) 7px 8px)",
        }}
      />
      {glyph && <span className="relative text-lg opacity-70">{glyph}</span>}
      {label && (
        <span className="relative max-w-full truncate px-2 text-center text-[0.62rem] font-semibold uppercase tracking-wide">
          {label}
        </span>
      )}
    </div>
  );
}

/** Square-ish app or brand mark slot. */
export function LogoSlot({
  size = 32,
  label = "Logo",
  radius = 8,
  className,
}: {
  size?: number;
  label?: string;
  radius?: number;
  className?: string;
}) {
  return (
    <Placeholder
      width={size}
      height={size}
      radius={radius}
      label={size >= 44 ? label : undefined}
      glyph={
        size < 44 ? (
          <Icon name="image" size={Math.round(size * 0.5)} />
        ) : undefined
      }
      className={className}
    />
  );
}

/** Round avatar slot. */
export function AvatarSlot({
  size = 32,
  className,
}: {
  size?: number;
  className?: string;
}) {
  return (
    <Placeholder
      shape="circle"
      width={size}
      height={size}
      glyph={<Icon name="user" size={Math.round(size * 0.5)} />}
      className={className}
    />
  );
}

/** Wordmark slot for a text logo lockup. */
export function WordmarkSlot({
  width = 96,
  height = 20,
  label = "Wordmark",
  className,
}: {
  width?: number;
  height?: number;
  label?: string;
  className?: string;
}) {
  return (
    <Placeholder
      width={width}
      height={height}
      radius={5}
      label={label}
      className={className}
    />
  );
}
