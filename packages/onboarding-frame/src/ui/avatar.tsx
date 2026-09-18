"use client";

import type { ReactNode } from "react";
import { cn } from "../lib/cn";

/**
 * Avatars and image thumbnails.
 *
 * The references are full of people's faces and users' photographs, which are
 * not ours to ship. The previous answer was a dotted grey box in each slot,
 * and a screen with six of them reads as broken — the eye sees failed images,
 * not a placeholder convention, and it is the loudest difference between these
 * recreations and their references.
 *
 * So these fill the slot with something image-like instead, generated from the
 * name so it is stable across renders and screenshots:
 *
 *   Avatar  initials on a colour, which is exactly what these products
 *           themselves render for an account with no picture set
 *   Thumb   a soft two-tone field standing in for a photograph
 *
 * Neither claims to be a photo, and no copyrighted asset is involved. Use
 * `Placeholder` instead when the point of the slot is that something is
 * missing.
 */

/** Small deterministic hash; the same name always gets the same colour. */
function hash(seed: string): number {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return Math.abs(h);
}

function initials(name: string): string {
  const words = name.replace(/[^\p{L}\p{N} ]/gu, " ").trim().split(/\s+/);
  if (words.length === 0 || !words[0]) return "?";
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return (words[0][0]! + words[words.length - 1]![0]!).toUpperCase();
}

export interface AvatarProps {
  name: string;
  size?: number;
  /** Square with a radius instead of a circle; some products use that. */
  rounded?: "full" | number;
  /** A platform badge pinned to the bottom-right, as channel lists show. */
  badge?: ReactNode;
  className?: string;
}

export function Avatar({
  name,
  size = 32,
  rounded = "full",
  badge,
  className,
}: AvatarProps) {
  const hue = hash(name) % 360;
  const text = initials(name);
  return (
    <span className={cn("relative inline-block shrink-0", className)} style={{ width: size, height: size }}>
      <span
        role="img"
        aria-label={name}
        className="grid h-full w-full place-items-center font-semibold leading-none text-white"
        style={{
          borderRadius: rounded === "full" ? 9999 : rounded,
          // Two stops of one hue reads as a portrait crop at small sizes far
          // better than a flat fill does.
          background: `linear-gradient(140deg, hsl(${hue} 62% 62%), hsl(${(hue + 38) % 360} 58% 46%))`,
          fontSize: Math.round(size * 0.38),
          letterSpacing: "0.01em",
        }}
      >
        {text}
      </span>
      {badge !== undefined && (
        <span className="absolute -bottom-0.5 -right-0.5 grid place-items-center rounded-full bg-[color:var(--ob-surface)] p-[1.5px]">
          {badge}
        </span>
      )}
    </span>
  );
}

export interface ThumbProps {
  /** Any stable string; the same seed always renders the same field. */
  seed: string;
  className?: string;
  /** Corner radius in px. */
  radius?: number;
  /** Described to assistive tech, since this stands in for a picture. */
  alt?: string;
}

/**
 * A photograph's slot, filled with a generated field rather than left empty.
 * Sized entirely by its container, so the caller controls the aspect.
 */
export function Thumb({ seed, className, radius = 8, alt = "Image" }: ThumbProps) {
  const h = hash(seed);
  const hue = h % 360;
  const alt2 = (hue + 42 + (h % 40)) % 360;
  const angle = 100 + (h % 80);
  return (
    <span
      role="img"
      aria-label={alt}
      className={cn("block h-full w-full overflow-hidden", className)}
      style={{
        borderRadius: radius,
        background:
          `radial-gradient(120% 90% at ${20 + (h % 40)}% ${15 + (h % 30)}%, ` +
          `hsl(${hue} 46% 78%) 0%, transparent 60%), ` +
          `linear-gradient(${angle}deg, hsl(${hue} 38% 62%), hsl(${alt2} 34% 44%))`,
      }}
    />
  );
}
