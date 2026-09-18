"use client";

import * as simple from "simple-icons";
import { cn } from "../lib/cn";

/**
 * Brand marks.
 *
 * The reference screenshots are full of platform logos — a channel list, a
 * "connect an account" row, an integrations grid. Standing those off as empty
 * grey squares is what made the recreations read as broken rather than as
 * deliberate placeholders: a row of five blank circles looks like a failed
 * image load, not like a design.
 *
 * Simple Icons carries 3,400-odd marks as raw path data, which is what a real
 * product would use, so that is where these come from. It is path data only —
 * about a kilobyte per mark once tree-shaken — not an icon component library.
 *
 * Trademarks stay their owners'. A few marks are absent because the owner
 * asked to be removed (LinkedIn is the one these templates hit), so `BrandMark`
 * falls back to a labelled tile rather than drawing the logo by hand.
 */

type SimpleIcon = { title: string; slug: string; path: string; hex: string };

const ICONS = simple as unknown as Record<string, SimpleIcon>;

/** `"bluesky"` -> `siBluesky`, which is how simple-icons names its exports. */
function lookup(slug: string): SimpleIcon | undefined {
  // Simple Icons exports one capital and the rest lower — `siGooglesheets`,
  // not `siGoogleSheets`. Capitalising each word missed every multi-word
  // brand in the catalogue, which then fell through to the dashed grey tile
  // that rule 3 exists to get rid of.
  const flat = slug.replace(/[^a-z0-9]+/gi, "").toLowerCase();
  if (!flat) return undefined;
  return ICONS["si" + flat[0]!.toUpperCase() + flat.slice(1)];
}

export interface BrandMarkProps {
  /** Drop the dashed frame on the fallback, for use inside a coloured disc. */
  plain?: boolean;
  /** Simple Icons slug, e.g. "facebook", "bluesky", "instagram". */
  brand: string;
  size?: number;
  /** Draw in the brand's own colour rather than inheriting the text colour. */
  colored?: boolean;
  /** Shown instead of the mark when Simple Icons does not carry it. */
  label?: string;
  className?: string;
}

export function BrandMark({
  brand,
  size = 20,
  colored = true,
  label,
  plain = false,
  className,
}: BrandMarkProps) {
  const icon = lookup(brand);

  if (!icon) {
    // No mark available. A labelled tile in neutral grey is honest; a
    // hand-drawn approximation of someone's logo is not.
    const initials = (label ?? brand).slice(0, 2);
    return (
      <span
        aria-label={label ?? brand}
        role="img"
        className={cn(
          "inline-grid shrink-0 place-items-center rounded-[4px]",
          // Inside a coloured disc the dashed tile reads as a broken image;
          // `plain` drops the frame and lets the disc carry the shape.
          plain
            ? "font-semibold uppercase leading-none"
            : [
                "border border-dashed border-[color:var(--ob-border-strong)]",
                "bg-[color:var(--ob-surface-2)]",
                "font-semibold uppercase leading-none text-[color:var(--ob-muted)]",
              ],
          className,
        )}
        style={{ width: size, height: size, fontSize: Math.round(size * 0.42) }}
      >
        {initials}
      </span>
    );
  }

  return (
    <svg
      role="img"
      aria-label={icon.title}
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={cn("shrink-0", className)}
      fill={colored ? `#${icon.hex}` : "currentColor"}
    >
      <path d={icon.path} />
    </svg>
  );
}

/**
 * A brand mark on its own tile, which is how most "connect an account" rows
 * and channel badges present one.
 */
export function BrandTile({
  brand,
  size = 28,
  radius = 8,
  label,
  className,
}: BrandMarkProps & { radius?: number }) {
  const icon = lookup(brand);
  return (
    <span
      className={cn("inline-grid shrink-0 place-items-center", className)}
      style={{
        width: size,
        height: size,
        borderRadius: radius,
        background: icon ? `#${icon.hex}` : "var(--ob-surface-2)",
      }}
    >
      {icon ? (
        <svg
          role="img"
          aria-label={icon.title}
          viewBox="0 0 24 24"
          width={Math.round(size * 0.62)}
          height={Math.round(size * 0.62)}
          fill="#ffffff"
        >
          <path d={icon.path} />
        </svg>
      ) : (
        <BrandMark brand={brand} label={label} size={Math.round(size * 0.72)} />
      )}
    </span>
  );
}
