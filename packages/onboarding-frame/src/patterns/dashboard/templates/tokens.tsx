"use client";

import type { CSSProperties, ReactNode } from "react";
import { cn } from "../../../lib/cn";

/**
 * Per-template token scope.
 *
 * Each dashboard template recreates a specific product surface, and those
 * surfaces do not share a palette, a radius or a type scale. Wrapping a
 * template in `Surface` rebinds the design tokens the shared chrome reads, so
 * two templates built from the same components still look like two different
 * products — which is the whole point of a reference library.
 */
export interface TemplateTokens {
  scheme?: "light" | "dark";
  /** Page background behind the shell. */
  bg?: string;
  /** Raised surfaces: cards, popovers, sidebars. */
  surface?: string;
  /** Recessed surfaces: inputs, hover states, chart plots. */
  surface2?: string;
  /** Deepest fill: tracks, disabled buttons. */
  surface3?: string;
  border?: string;
  borderStrong?: string;
  fg?: string;
  fgSoft?: string;
  muted?: string;
  /** Accent used for links, active nav, primary actions and series colour. */
  brand?: string;
  brandFg?: string;
  /** High-contrast CTA pill. */
  ctaBg?: string;
  ctaFg?: string;
  success?: string;
  danger?: string;
  /** Corner radius for cards; controls how soft or crisp the product feels. */
  radius?: string;
  radiusSm?: string;
  radiusLg?: string;
  /** Body typeface stack. */
  font?: string;
  /** Display typeface for headings, when the product differentiates them. */
  fontDisplay?: string;
  shadow?: string;
}

function vars(tokens: TemplateTokens): CSSProperties {
  const map: Record<string, string | undefined> = {
    "--ob-bg": tokens.bg,
    "--ob-surface": tokens.surface,
    "--ob-surface-2": tokens.surface2,
    "--ob-surface-3": tokens.surface3,
    "--ob-border": tokens.border,
    "--ob-border-strong": tokens.borderStrong,
    "--ob-fg": tokens.fg,
    "--ob-fg-soft": tokens.fgSoft,
    "--ob-muted": tokens.muted,
    "--ob-brand": tokens.brand,
    "--ob-brand-fg": tokens.brandFg,
    "--ob-cta-bg": tokens.ctaBg,
    "--ob-cta-fg": tokens.ctaFg,
    "--ob-success": tokens.success,
    "--ob-danger": tokens.danger,
    "--ob-radius": tokens.radius,
    "--ob-radius-sm": tokens.radiusSm,
    "--ob-radius-lg": tokens.radiusLg,
    "--ob-font-sans": tokens.font,
    "--ob-font-display": tokens.fontDisplay,
    "--ob-shadow": tokens.shadow,
  };

  const out: Record<string, string> = {};
  for (const [key, value] of Object.entries(map)) {
    if (value !== undefined) out[key] = value;
  }
  // Derived from brand so a template only has to name one accent.
  if (tokens.brand) {
    out["--ob-brand-soft"] = `color-mix(in oklab, ${tokens.brand} 12%, transparent)`;
  }
  return out as CSSProperties;
}

export function Surface({
  tokens,
  children,
  className,
}: {
  tokens: TemplateTokens;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      data-ob-root=""
      data-ob-scheme={tokens.scheme ?? "light"}
      style={vars(tokens)}
      className={cn(
        "font-[family-name:var(--ob-font-sans)] text-[color:var(--ob-fg)]",
        className,
      )}
    >
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * Token sets, one per template
 * ------------------------------------------------------------------ */

const GEOMETRIC =
  '"Inter Variable", Inter, ui-sans-serif, system-ui, -apple-system, sans-serif';

/** Crisp developer console: white, hairline borders, tight radii. */
export const apiConsoleTokens: TemplateTokens = {
  bg: "#ffffff",
  surface: "#ffffff",
  surface2: "#f6f7f8",
  surface3: "#eceef1",
  border: "#e4e6ea",
  borderStrong: "#c9cdd4",
  fg: "#111317",
  fgSoft: "#3f454e",
  muted: "#71777f",
  brand: "#7c4dff",
  brandFg: "#ffffff",
  ctaBg: "#16181c",
  ctaFg: "#ffffff",
  radius: "0.5rem",
  radiusSm: "0.375rem",
  radiusLg: "0.625rem",
  font: GEOMETRIC,
};

/** Warm neutral product with a near-black nav rail and indigo actions. */
export const setupChecklistTokens: TemplateTokens = {
  bg: "#f4f4f5",
  surface: "#ffffff",
  surface2: "#f4f4f5",
  surface3: "#e7e7ea",
  border: "#e6e6e9",
  borderStrong: "#cfcfd5",
  fg: "#17171a",
  fgSoft: "#45454c",
  muted: "#76767f",
  brand: "#4f46e5",
  brandFg: "#ffffff",
  ctaBg: "#17171a",
  ctaFg: "#ffffff",
  success: "#22c55e",
  radius: "0.75rem",
  radiusSm: "0.5rem",
  radiusLg: "0.875rem",
  font: GEOMETRIC,
};

/** Soft lavender rail, generous radii, friendly weight. */
export const guidedSetupTokens: TemplateTokens = {
  bg: "#ffffff",
  surface: "#ffffff",
  surface2: "#f7f7fb",
  surface3: "#ececf5",
  border: "#e6e6ef",
  borderStrong: "#cfcfe0",
  fg: "#16161d",
  fgSoft: "#43434f",
  muted: "#75757f",
  brand: "#5b5bd6",
  brandFg: "#ffffff",
  ctaBg: "#16161d",
  ctaFg: "#ffffff",
  success: "#16a34a",
  radius: "0.7rem",
  radiusSm: "0.5rem",
  radiusLg: "0.9rem",
  font: GEOMETRIC,
};

/** Paper-warm canvas, very large radii, quiet chrome. */
export const assistantHomeTokens: TemplateTokens = {
  bg: "#fbfaf8",
  surface: "#ffffff",
  surface2: "#f1efec",
  surface3: "#e4e1dc",
  border: "#e6e3de",
  borderStrong: "#cbc7c0",
  fg: "#15140f",
  fgSoft: "#403e38",
  muted: "#78756d",
  brand: "#20808d",
  brandFg: "#ffffff",
  ctaBg: "#15140f",
  ctaFg: "#ffffff",
  radius: "0.75rem",
  radiusSm: "0.5rem",
  radiusLg: "1.125rem",
  font: GEOMETRIC,
};

/** Deep-green accent on a grey canvas with card-in-card layering. */
export const fileLibraryTokens: TemplateTokens = {
  bg: "#f1f2f1",
  surface: "#ffffff",
  surface2: "#f1f2f1",
  surface3: "#e4e6e4",
  border: "#e3e5e3",
  borderStrong: "#c8ccc8",
  fg: "#14170f",
  fgSoft: "#414539",
  muted: "#73786d",
  brand: "#1b6b4a",
  brandFg: "#ffffff",
  ctaBg: "#1b6b4a",
  ctaFg: "#ffffff",
  radius: "0.625rem",
  radiusSm: "0.5rem",
  radiusLg: "0.875rem",
  font: GEOMETRIC,
};
