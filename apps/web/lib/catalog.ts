import { presets } from "onboarding-frame";
import type { PatternKind } from "onboarding-frame";

export interface VariantEntry {
  id: string;
  name: string;
  blurb: string;
}

export interface PatternEntry {
  slug: string;
  kind: PatternKind;
  name: string;
  tagline: string;
  description: string;
  glyph: string;
  variants: VariantEntry[];
}

/**
 * The catalogue that drives the docs navigation, the pattern pages and the
 * playground's variant list. Keyed to the preset ids in the package.
 */
export const catalog: PatternEntry[] = [
  {
    slug: "wizard",
    kind: "wizard",
    name: "Setup wizard",
    tagline: "The first-run flow that decides whether someone ever reaches value.",
    description:
      "Multi-step setup with branching, validation and progress. Five layouts covering the range from a playful full-screen quiz to a dense guided split with a live preview panel.",
    glyph: "🧭",
    variants: [
      { id: "fullscreen-quiz", name: "Fullscreen quiz", blurb: "Dark canvas, accent progress rail, poster and spec cards, gated pill CTA." },
      { id: "neon-quiz", name: "Neon quiz", blurb: "Black canvas, top-edge accent bar, step counter, corner checks and an optional media panel." },
      { id: "warm-survey", name: "Warm survey", blurb: "Soft canvas, dot pagination, icon list rows, welcome and interstitial screens." },
      { id: "split-rail", name: "Guided split rail", blurb: "Breadcrumb header with a side panel that reflects state as it is collected." },
      { id: "conversational", name: "Conversational", blurb: "Assistant orb, first-person copy, chip sentences and a circular CTA." },
    ],
  },
  {
    slug: "checklist",
    kind: "checklist",
    name: "Checklist",
    tagline: "The quiet nudge that pulls people back until setup is finished.",
    description:
      "A persistent getting-started list with progress, dependencies, time estimates and a completion celebration. One state model across four placements.",
    glyph: "✅",
    variants: [
      { id: "dashboard-card", name: "Dashboard card", blurb: "Sits inside the product home alongside the first real data." },
      { id: "launcher-popover", name: "Launcher popover", blurb: "Corner launcher with a progress ring that opens the full list." },
      { id: "sidebar-panel", name: "Sidebar panel", blurb: "Docked panel for products where setup is a sustained task." },
      { id: "top-banner", name: "Top banner", blurb: "Slim persistent bar with a single resume action." },
    ],
  },
  {
    slug: "tour",
    kind: "tour",
    name: "Product tour",
    tagline: "Teaching the interface without a video nobody watches.",
    description:
      "Spotlight coachmarks anchored to real elements, ambient beacons, a modal feature sequence, and a narrated walkthrough with a media panel.",
    glyph: "🔦",
    variants: [
      { id: "spotlight", name: "Spotlight", blurb: "Dims the page and cuts out the target, with keyboard navigation." },
      { id: "beacon", name: "Beacon", blurb: "Pulsing hotspots that invite discovery without blocking the UI." },
      { id: "modal-sequence", name: "Modal sequence", blurb: "Multi-step popups with hero media and dot pagination." },
      { id: "feature-walkthrough", name: "Feature walkthrough", blurb: "Vertical stepper where only the active item expands, beside a recolouring media panel." },
    ],
  },
  {
    slug: "empty-state",
    kind: "empty-state",
    name: "Empty state",
    tagline: "The screen people see before the product has anything to show.",
    description:
      "First-run screens that teach instead of apologise, including a sample-data affordance that transitions the screen from empty to populated in place.",
    glyph: "🪴",
    variants: [
      { id: "illustration", name: "Illustration", blurb: "Glyph, copy and a clear primary action." },
      { id: "ghost-preview", name: "Ghost preview", blurb: "Skeleton rows hint at the shape of the data that will arrive." },
      { id: "sample-data", name: "Sample data", blurb: "Loads demo content in place so the screen teaches itself." },
    ],
  },
  {
    slug: "plans",
    kind: "plans",
    name: "Plans and paywall",
    tagline: "The pricing moment people hit at the end of onboarding.",
    description:
      "Seven monetisation surfaces, from a restrained tier grid to a three-screen promotional sequence with checkout. Payment fields are inert and clearly marked as a demo.",
    glyph: "💳",
    variants: [
      { id: "spotlight-sequence", name: "Spotlight sequence", blurb: "Value comparison, plan picker and split checkout on a mesh canvas." },
      { id: "quiet-tiers", name: "Quiet tiers", blurb: "Neutral equal-height cards, inheritance lead-ins and a free escape hatch." },
      { id: "trial-timeline", name: "Trial timeline", blurb: "Plan and payment picker beside social proof and a what-happens-when rail." },
      { id: "quota-matrix", name: "Quota matrix", blurb: "Capabilities by tier with the recommended column highlighted." },
      { id: "offer-modal", name: "Offer modal", blurb: "Time-boxed discount with an applied promo code and a live countdown." },
      { id: "comparison-table", name: "Comparison table", blurb: "Feature matrix with one emphasised column." },
      { id: "usage-slider", name: "Usage slider", blurb: "Seat slider that recalculates the price as you drag." },
    ],
  },
  {
    slug: "dashboard",
    kind: "dashboard",
    name: "Activation dashboard",
    tagline: "Where every flow lands — and where activation is actually won.",
    description:
      "The product home that onboarding delivers into: quick actions, an embedded checklist, KPI tiles, an empty-to-populated workspace, and quota meters that bridge into an upgrade.",
    glyph: "📊",
    variants: [
      { id: "activation-home", name: "Activation home", blurb: "Greeting, quick actions and an embedded getting-started checklist." },
      { id: "metrics-overview", name: "Metrics overview", blurb: "KPI tiles with sparklines and a recent-activity feed." },
      { id: "workspace-hub", name: "Workspace hub", blurb: "Sidebar workspace that swaps empty state for real data." },
      { id: "usage-billing", name: "Usage and billing", blurb: "Quota meters with an upgrade nudge once limits approach." },
    ],
  },
];

export function getPattern(slug: string): PatternEntry | undefined {
  return catalog.find((entry) => entry.slug === slug);
}

/** Resolve a preset config for a pattern + variant pair. */
export function getPreset(kind: PatternKind, variant: string): unknown {
  const group = presets[kind] as Record<string, unknown>;
  return group?.[variant];
}
