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

/** Warm mauve creative tool: dark plum CTA, soft pink banners, roomy cards. */
export const creativeStudioTokens: TemplateTokens = {
  bg: "#ffffff",
  surface: "#ffffff",
  surface2: "#f7f4f5",
  surface3: "#ece5e8",
  border: "#e9e3e5",
  borderStrong: "#d2c8cc",
  fg: "#1b1418",
  fgSoft: "#4a4046",
  muted: "#7c7078",
  brand: "#7b1e3c",
  brandFg: "#ffffff",
  ctaBg: "#5e1930",
  ctaFg: "#ffffff",
  radius: "0.6rem",
  radiusSm: "0.45rem",
  radiusLg: "0.9rem",
  font: GEOMETRIC,
};

/** Editorial white gallery: near-zero chrome, image-forward. */
export const discoveryFeedTokens: TemplateTokens = {
  bg: "#ffffff",
  surface: "#ffffff",
  surface2: "#f4f4f4",
  surface3: "#e9e9e9",
  border: "#ebebeb",
  borderStrong: "#d4d4d4",
  fg: "#111111",
  fgSoft: "#3d3d3d",
  muted: "#767676",
  brand: "#111111",
  brandFg: "#ffffff",
  ctaBg: "#111111",
  ctaFg: "#ffffff",
  radius: "0.75rem",
  radiusSm: "0.5rem",
  radiusLg: "1rem",
  font: GEOMETRIC,
};

/** Marketing suite: cool greys, indigo accents, dense guide cards. */
export const guidesTokens: TemplateTokens = {
  bg: "#f7f8fa",
  surface: "#ffffff",
  surface2: "#f3f4f7",
  surface3: "#e7e9ef",
  border: "#e3e5ec",
  borderStrong: "#c9ccd8",
  fg: "#13161f",
  fgSoft: "#3f4453",
  muted: "#6e7385",
  brand: "#4b34d4",
  brandFg: "#ffffff",
  ctaBg: "#14161d",
  ctaFg: "#ffffff",
  success: "#12a150",
  radius: "0.6rem",
  radiusSm: "0.45rem",
  radiusLg: "0.85rem",
  font: GEOMETRIC,
};

/** Serif-display brand tool: near-white canvas, violet accent, editorial headings. */
export const brandStudioTokens: TemplateTokens = {
  bg: "#fcfcfd",
  surface: "#ffffff",
  surface2: "#f4f4f7",
  surface3: "#e8e8ee",
  border: "#e7e7ed",
  borderStrong: "#cdcdd8",
  fg: "#15131c",
  fgSoft: "#403d4c",
  muted: "#74707f",
  brand: "#7c3aed",
  brandFg: "#ffffff",
  ctaBg: "#15131c",
  ctaFg: "#ffffff",
  radius: "0.75rem",
  radiusSm: "0.5rem",
  radiusLg: "1rem",
  font: GEOMETRIC,
  fontDisplay: 'ui-serif, Georgia, "Times New Roman", serif',
};

/** Commerce admin: near-black top bar over a light body, cyan data series. */
export const commerceTokens: TemplateTokens = {
  bg: "#f1f1f1",
  surface: "#ffffff",
  surface2: "#f6f6f7",
  surface3: "#ebebeb",
  border: "#e1e1e1",
  borderStrong: "#c9c9c9",
  fg: "#1a1a1a",
  fgSoft: "#4a4a4a",
  muted: "#6b6b6b",
  brand: "#00a0d2",
  brandFg: "#ffffff",
  ctaBg: "#1a1a1a",
  ctaFg: "#ffffff",
  success: "#007f5f",
  danger: "#c4320a",
  radius: "0.6rem",
  radiusSm: "0.4rem",
  radiusLg: "0.75rem",
  font: GEOMETRIC,
};

/** Support analytics: white cards on a faint tint, indigo series, airy. */
export const supportInsightsTokens: TemplateTokens = {
  bg: "#f7f7fa",
  surface: "#ffffff",
  surface2: "#f5f5f9",
  surface3: "#ececf3",
  border: "#eaeaf1",
  borderStrong: "#d0d0de",
  fg: "#16161d",
  fgSoft: "#414150",
  muted: "#73738a",
  brand: "#5b5bd6",
  brandFg: "#ffffff",
  ctaBg: "#16161d",
  ctaFg: "#ffffff",
  radius: "0.5rem",
  radiusSm: "0.375rem",
  radiusLg: "0.75rem",
  font: GEOMETRIC,
};

/** Personal finance: airy white, green gains, generous radii, soft shadows. */
export const financeTokens: TemplateTokens = {
  bg: "#fbfcfc",
  surface: "#ffffff",
  surface2: "#f5f7f7",
  surface3: "#eaefee",
  border: "#eaeeed",
  borderStrong: "#cdd6d4",
  fg: "#11221c",
  fgSoft: "#3d4b45",
  muted: "#74837c",
  brand: "#16c164",
  brandFg: "#05230f",
  ctaBg: "#11221c",
  ctaFg: "#ffffff",
  success: "#16c164",
  danger: "#ef4444",
  radius: "1rem",
  radiusSm: "0.625rem",
  radiusLg: "1.25rem",
  font: GEOMETRIC,
  shadow: "0 1px 2px rgb(16 40 32 / 0.04), 0 10px 30px -18px rgb(16 40 32 / 0.25)",
};

/** CRM workspace: dense, hairline borders, small type, minimal colour. */
export const crmTokens: TemplateTokens = {
  bg: "#fbfbfb",
  surface: "#ffffff",
  surface2: "#f6f6f6",
  surface3: "#ededed",
  border: "#ebebeb",
  borderStrong: "#d6d6d6",
  fg: "#1b1b1b",
  fgSoft: "#474747",
  muted: "#818181",
  brand: "#3b5bdb",
  brandFg: "#ffffff",
  ctaBg: "#1b1b1b",
  ctaFg: "#ffffff",
  radius: "0.375rem",
  radiusSm: "0.25rem",
  radiusLg: "0.5rem",
  font: GEOMETRIC,
};

/**
 * Causal: a spreadsheet-modelling tool, so the chrome is deliberately plain —
 * near-white rail, hairline borders, blue only on the active row — and the
 * screenshot peeks inside the wizard cards carry all the colour.
 */
export const modelingTokens: TemplateTokens = {
  bg: "#ffffff",
  surface: "#ffffff",
  surface2: "#f4f5f7",
  surface3: "#eaecef",
  border: "#e6e8eb",
  borderStrong: "#d6d9de",
  fg: "#16181d",
  fgSoft: "#3c4149",
  muted: "#8a9199",
  brand: "#2f6fed",
  brandFg: "#ffffff",
  ctaBg: "#16181d",
  ctaFg: "#ffffff",
  radius: "0.625rem",
  radiusSm: "0.375rem",
  radiusLg: "0.875rem",
  shadow: "0 1px 2px rgba(16,24,40,0.05)",
};

/**
 * Buffer: consumer-soft. Mint primary, grey-50 card fills with no borders at
 * all, and generous 16px radii — the opposite of the CRM's hairlines.
 */
export const schedulerTokens: TemplateTokens = {
  bg: "#ffffff",
  surface: "#ffffff",
  surface2: "#f6f6f6",
  surface3: "#ededed",
  border: "#e8e8e8",
  borderStrong: "#dcdcdc",
  fg: "#191919",
  fgSoft: "#3d3d3d",
  muted: "#8a8a8a",
  brand: "#2c4bff",
  brandFg: "#ffffff",
  ctaBg: "#b9e6a2",
  ctaFg: "#14370a",
  success: "#2f9e44",
  radius: "1rem",
  radiusSm: "0.625rem",
  radiusLg: "1.25rem",
};

/**
 * Fey: a dark investing terminal. Near-black rather than true black, one blue
 * accent reserved for the active tab, and red/white as data colours only — so
 * the chart carries the meaning and the chrome stays out of the way.
 */
export const terminalTokens: TemplateTokens = {
  scheme: "dark",
  bg: "#0a0a0b",
  surface: "#121214",
  surface2: "#1a1a1d",
  surface3: "#232327",
  border: "#232327",
  borderStrong: "#33333a",
  fg: "#f4f4f5",
  fgSoft: "#c9c9ce",
  muted: "#77777f",
  brand: "#3b82f6",
  brandFg: "#ffffff",
  ctaBg: "#f4f4f5",
  ctaFg: "#0a0a0b",
  success: "#4ade80",
  danger: "#f2555a",
  radius: "0.875rem",
  radiusSm: "0.5rem",
  radiusLg: "1.125rem",
};

/**
 * Sweatpals: true black with barely-there card borders and saturated ring
 * colours. Distinct from the terminal above, which sits on charcoal — the
 * difference between the two is the point of scoping tokens per template.
 */
export const eventTokens: TemplateTokens = {
  scheme: "dark",
  bg: "#000000",
  surface: "#0c0c0c",
  surface2: "#151515",
  surface3: "#1f1f1f",
  border: "#1e1e1e",
  borderStrong: "#2e2e2e",
  fg: "#fafafa",
  fgSoft: "#d4d4d4",
  muted: "#8b8b8b",
  brand: "#b96bff",
  brandFg: "#ffffff",
  ctaBg: "#1a1a1a",
  ctaFg: "#fafafa",
  success: "#5ddb9a",
  danger: "#ff5f8a",
  radius: "1rem",
  radiusSm: "0.625rem",
  radiusLg: "1.25rem",
};

/**
 * Reddit mod tools: orange brand but blue links and active tabs, on a grey
 * page behind white cards. The split accent is the giveaway — most products
 * use one colour for both.
 */
export const communityTokens: TemplateTokens = {
  bg: "#f6f7f8",
  surface: "#ffffff",
  surface2: "#f2f3f5",
  surface3: "#e4e6eb",
  border: "#e2e4e8",
  borderStrong: "#c9ccd1",
  fg: "#1c1c1c",
  fgSoft: "#3a3a3c",
  muted: "#7c7f83",
  brand: "#0079d3",
  brandFg: "#ffffff",
  ctaBg: "#ff4500",
  ctaFg: "#ffffff",
  radius: "0.25rem",
  radiusSm: "0.25rem",
  radiusLg: "0.5rem",
};

/** Asana: dark rail against a white document body, indigo primary. */
export const goalTokens: TemplateTokens = {
  bg: "#ffffff",
  surface: "#ffffff",
  surface2: "#f6f6f7",
  surface3: "#ebebed",
  border: "#e5e5e7",
  borderStrong: "#cfcfd3",
  fg: "#1e1f21",
  fgSoft: "#44464a",
  muted: "#8b8d92",
  brand: "#4573d2",
  brandFg: "#ffffff",
  ctaBg: "#e8384f",
  ctaFg: "#ffffff",
  success: "#5da283",
  radius: "0.5rem",
  radiusSm: "0.375rem",
  radiusLg: "0.75rem",
};

/**
 * Supabase: charcoal rather than black, green accent, and monospace for every
 * path and method — the type change is doing as much work as the palette.
 */
export const platformTokens: TemplateTokens = {
  scheme: "dark",
  bg: "#1c1c1c",
  surface: "#1f1f1f",
  surface2: "#262626",
  surface3: "#2f2f2f",
  border: "#2b2b2b",
  borderStrong: "#3d3d3d",
  fg: "#ededed",
  fgSoft: "#c2c2c2",
  muted: "#8f8f8f",
  brand: "#3ecf8e",
  brandFg: "#0b1f16",
  ctaBg: "#3ecf8e",
  ctaFg: "#0b1f16",
  success: "#3ecf8e",
  danger: "#f0883e",
  radius: "0.5rem",
  radiusSm: "0.25rem",
  radiusLg: "0.625rem",
};

/** Vercel: black brand, blue data, near-square corners and tight hairlines. */
export const deployTokens: TemplateTokens = {
  bg: "#ffffff",
  surface: "#ffffff",
  surface2: "#f7f7f8",
  surface3: "#ededee",
  border: "#e6e6e7",
  borderStrong: "#d2d2d4",
  fg: "#0a0a0a",
  fgSoft: "#3c3c3c",
  muted: "#888889",
  brand: "#0062ff",
  brandFg: "#ffffff",
  ctaBg: "#0a0a0a",
  ctaFg: "#ffffff",
  danger: "#e5484d",
  radius: "0.5rem",
  radiusSm: "0.375rem",
  radiusLg: "0.625rem",
};

/**
 * StackAI: slate as the data colour rather than a brand hue, which keeps a
 * page full of charts looking like tooling instead of marketing.
 */
export const usageTokens: TemplateTokens = {
  bg: "#ffffff",
  surface: "#ffffff",
  surface2: "#f7f8fa",
  surface3: "#eceef1",
  border: "#e7e9ed",
  borderStrong: "#d3d7de",
  fg: "#15181d",
  fgSoft: "#3d4450",
  muted: "#7c848f",
  brand: "#5b6472",
  brandFg: "#ffffff",
  ctaBg: "#15181d",
  ctaFg: "#ffffff",
  radius: "0.75rem",
  radiusSm: "0.5rem",
  radiusLg: "1rem",
};

/** Vanta: purple brand, tight 6-8px radii, grey chips carrying framework codes. */
export const complianceTokens: TemplateTokens = {
  bg: "#ffffff",
  surface: "#ffffff",
  surface2: "#f5f5f7",
  surface3: "#e9e9ed",
  border: "#e4e4e9",
  borderStrong: "#cfcfd7",
  fg: "#1a1a24",
  fgSoft: "#3f3f4d",
  muted: "#7d7d8c",
  brand: "#6b46e5",
  brandFg: "#ffffff",
  ctaBg: "#6b46e5",
  ctaFg: "#ffffff",
  success: "#2f9e44",
  danger: "#e0562d",
  radius: "0.5rem",
  radiusSm: "0.375rem",
  radiusLg: "0.625rem",
};

/**
 * Etsy: black text with an orange accent, pill-shaped controls, and small-caps
 * labels that are underlined rather than coloured — an unusual combination
 * that would be flattened by any shared house style.
 */
export const listingTokens: TemplateTokens = {
  bg: "#ffffff",
  surface: "#ffffff",
  surface2: "#f4f4f4",
  surface3: "#e8e8e8",
  border: "#e1e1e1",
  borderStrong: "#c9c9c9",
  fg: "#111111",
  fgSoft: "#3a3a3a",
  muted: "#757575",
  brand: "#f1641e",
  brandFg: "#ffffff",
  ctaBg: "#111111",
  ctaFg: "#ffffff",
  radius: "0.75rem",
  radiusSm: "0.5rem",
  radiusLg: "1rem",
};

/** Mailchimp: a yellow band over black text, with olive as the data colour. */
export const audienceTokens: TemplateTokens = {
  bg: "#ffffff",
  surface: "#ffffff",
  surface2: "#f6f6f4",
  surface3: "#e9e9e5",
  border: "#e2e2dd",
  borderStrong: "#c8c8c1",
  fg: "#241c15",
  fgSoft: "#403830",
  muted: "#6f675f",
  brand: "#007c89",
  brandFg: "#ffffff",
  ctaBg: "#ffe01b",
  ctaFg: "#241c15",
  success: "#7a9a3e",
  radius: "0.75rem",
  radiusSm: "0.5rem",
  radiusLg: "1rem",
  fontDisplay:
    '"Inter Variable", "InterVariable", Inter, ui-serif, Georgia, serif',
};

/** Cake: indigo primary with a pale-blue secondary, on navy ink. */
export const capTableTokens: TemplateTokens = {
  bg: "#ffffff",
  surface: "#ffffff",
  surface2: "#f6f6fb",
  surface3: "#ececf6",
  border: "#e6e6f0",
  borderStrong: "#d0d0e0",
  fg: "#1c1b3a",
  fgSoft: "#3b3a5c",
  muted: "#7b7a96",
  brand: "#5b2ff5",
  brandFg: "#ffffff",
  ctaBg: "#5b2ff5",
  ctaFg: "#ffffff",
  radius: "0.625rem",
  radiusSm: "0.5rem",
  radiusLg: "0.875rem",
};
