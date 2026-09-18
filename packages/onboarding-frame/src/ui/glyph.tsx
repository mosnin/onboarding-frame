"use client";

import { Icon, icons, type IconName } from "./icons";
import { BrandMark } from "./brand";
import { cn } from "../lib/cn";

/**
 * Renders a config's `glyph` field.
 *
 * The presets used to carry emoji here: a gamepad for "Games", an avocado for
 * "Groceries", a speaker for a sound toggle. They render in whatever face the
 * OS supplies, so weight, size and baseline change per machine and none of it
 * matches the reference (CLAUDE.md, rule 1). Configs now carry a name instead,
 * and this resolves it:
 *
 * - a name in the Lucide set  -> that icon
 * - `brand:<slug>`            -> the platform's own mark from Simple Icons
 * - anything else             -> the literal string
 *
 * The literal path is deliberate and narrow. A reference that genuinely prints
 * a character as text — `⌘K` in a shortcut chip, `9:16` in an aspect chip —
 * should keep printing it, and reproducing that is the rule rather than an
 * exception to it.
 */
export function Glyph({
  value,
  size = 18,
  className,
}: {
  value?: string;
  size?: number;
  className?: string;
}) {
  if (!value) return null;

  if (value.startsWith("brand:")) {
    return (
      <BrandMark
        brand={value.slice(6)}
        size={size}
        label={value.slice(6)}
        className={className}
      />
    );
  }

  if (value in icons) {
    return <Icon name={value as IconName} size={size} className={className} />;
  }

  return (
    <span aria-hidden className={cn("leading-none", className)}>
      {value}
    </span>
  );
}

/** True when `value` resolves to a drawn mark rather than a literal string. */
export function isDrawnGlyph(value?: string): boolean {
  return Boolean(value && (value.startsWith("brand:") || value in icons));
}
