import { templateCatalog, type PatternKind } from "onboarding-frame";

/**
 * The shelves people shop from.
 *
 * Each shelf is independent: an onboarding flow knows nothing about which
 * dashboard or pricing page sits beside it in someone's kit. That separation is
 * the product — you pick one of each, and they are composed at export time
 * rather than being pre-bundled by us.
 */

export type ShelfId = "onboarding" | "dashboard" | "pricing" | "addons";

export interface ShelfItem {
  /** Stable id used in the kit and in URLs. */
  id: string;
  name: string;
  blurb: string;
  /** Which library component renders it. */
  kind: PatternKind;
  /** Variant within that component, or the template slug for dashboards. */
  variant: string;
  /** Short descriptors shown as chips on the card. */
  tags?: string[];
}

export interface Shelf {
  id: ShelfId;
  name: string;
  /** Singular noun used in sentences: "Pick an onboarding flow". */
  noun: string;
  tagline: string;
  description: string;
  glyph: string;
  /** Whether a kit can hold more than one of these. */
  multiple?: boolean;
  items: ShelfItem[];
}

export const shelves: Shelf[] = [
  {
    id: "onboarding",
    name: "Onboarding",
    noun: "onboarding flow",
    tagline: "The first run — what someone does before they see the product.",
    description:
      "Multi-step flows with branching, validation and progress. Each one is a distinct layout with its own personality, not a skin over the same screen.",
    glyph: "target",
    items: [
      {
        id: "fullscreen-quiz",
        name: "Fullscreen quiz",
        blurb:
          "Dark canvas, accent progress rail, poster and spec cards, CTA gated until you answer.",
        kind: "wizard",
        variant: "fullscreen-quiz",
        tags: ["Dark", "Playful", "3 steps"],
      },
      {
        id: "neon-quiz",
        name: "Neon quiz",
        blurb:
          "Black canvas, progress bar welded to the top edge, step counter, corner checks, optional media panel.",
        kind: "wizard",
        variant: "neon-quiz",
        tags: ["Dark", "High contrast", "5 steps"],
      },
      {
        id: "warm-survey",
        name: "Warm survey",
        blurb:
          "Soft canvas, dot pagination, pastel icon rows, welcome and interstitial screens.",
        kind: "wizard",
        variant: "warm-survey",
        tags: ["Light", "Friendly", "6 steps"],
      },
      {
        id: "split-rail",
        name: "Guided split rail",
        blurb:
          "Breadcrumb header with a side panel that reflects your answers as you give them.",
        kind: "wizard",
        variant: "split-rail",
        tags: ["Light", "Dense", "5 steps"],
      },
      {
        id: "conversational",
        name: "Conversational",
        blurb:
          "Assistant orb, first-person copy, inline chip sentences, circular CTA.",
        kind: "wizard",
        variant: "conversational",
        tags: ["Light", "Minimal", "9 steps"],
      },
    ],
  },
  {
    id: "dashboard",
    name: "Dashboards",
    noun: "dashboard",
    tagline: "The product itself — where people spend their time.",
    description:
      "Full-page recreations of real product surfaces. Each carries its own palette, radius and type scale, and every image or logo is a labelled placeholder so you know exactly what to supply.",
    glyph: "barChart",
    // Sourced from the library so the shelf and the templates cannot drift.
    items: templateCatalog.map((template) => ({
      id: template.slug,
      name: template.name,
      blurb: template.blurb,
      kind: "dashboard" as PatternKind,
      variant: template.slug,
      tags:
        template.pages.length > 1
          ? [`${template.pages.length} pages`]
          : ["1 page"],
    })),
  },
  {
    id: "pricing",
    name: "Pricing",
    noun: "pricing page",
    tagline: "The moment you ask for money.",
    description:
      "From a restrained tier grid to a three-screen promotional sequence. Payment fields are inert and labelled as a demo — swap in your processor's hosted fields.",
    glyph: "creditCard",
    items: [
      {
        id: "quiet-tiers",
        name: "Quiet tiers",
        blurb:
          "Neutral equal-height cards, inheritance lead-ins, an explicit free escape hatch. No pressure.",
        kind: "plans",
        variant: "quiet-tiers",
        tags: ["Light", "Restrained", "1 screen"],
      },
      {
        id: "spotlight-sequence",
        name: "Spotlight sequence",
        blurb:
          "Value comparison, plan picker, then split checkout — three screens on a mesh canvas.",
        kind: "plans",
        variant: "spotlight-sequence",
        tags: ["Dark", "Promotional", "3 screens"],
      },
      {
        id: "trial-timeline",
        name: "Trial timeline",
        blurb:
          "Plan and payment picker beside social proof and a what-happens-when rail.",
        kind: "plans",
        variant: "trial-timeline",
        tags: ["Light", "Trial-led", "1 screen"],
      },
      {
        id: "quota-matrix",
        name: "Quota matrix",
        blurb: "Capabilities by tier with the recommended column highlighted.",
        kind: "plans",
        variant: "quota-matrix",
        tags: ["Dark", "Usage-based"],
      },
      {
        id: "offer-modal",
        name: "Offer modal",
        blurb:
          "Time-boxed discount with an applied promo code and a live countdown.",
        kind: "plans",
        variant: "offer-modal",
        tags: ["Dark", "Urgency"],
      },
      {
        id: "comparison-table",
        name: "Comparison table",
        blurb: "Feature matrix with one emphasised column.",
        kind: "plans",
        variant: "comparison-table",
        tags: ["Dark", "Two tiers"],
      },
      {
        id: "usage-slider",
        name: "Usage slider",
        blurb: "Seat slider that recalculates the price as you drag.",
        kind: "plans",
        variant: "usage-slider",
        tags: ["Light", "Per-seat"],
      },
    ],
  },
  {
    id: "addons",
    name: "Add-ons",
    noun: "add-on",
    tagline: "Pieces that sit inside whatever you already have.",
    description:
      "Drop-in activation surfaces. They attach to any dashboard — or to none — and hold their own state.",
    glyph: "puzzle",
    multiple: true,
    items: [
      {
        id: "checklist-card",
        name: "Checklist · dashboard card",
        blurb:
          "Getting-started list with progress, dependencies and a completion burst.",
        kind: "checklist",
        variant: "dashboard-card",
        tags: ["Inline"],
      },
      {
        id: "checklist-launcher",
        name: "Checklist · launcher",
        blurb: "Corner launcher with a progress ring that opens the full list.",
        kind: "checklist",
        variant: "launcher-popover",
        tags: ["Floating"],
      },
      {
        id: "checklist-banner",
        name: "Checklist · top banner",
        blurb: "Slim persistent bar with a single resume action.",
        kind: "checklist",
        variant: "top-banner",
        tags: ["Banner"],
      },
      {
        id: "tour-spotlight",
        name: "Tour · spotlight",
        blurb:
          "Dims the page and cuts out the target, with keyboard navigation.",
        kind: "tour",
        variant: "spotlight",
        tags: ["Anchored"],
      },
      {
        id: "tour-modal",
        name: "Tour · modal sequence",
        blurb: "Multi-step popups with hero media and dot pagination.",
        kind: "tour",
        variant: "modal-sequence",
        tags: ["Standalone"],
      },
      {
        id: "tour-walkthrough",
        name: "Tour · feature walkthrough",
        blurb: "Vertical stepper beside a media panel that recolours per step.",
        kind: "tour",
        variant: "feature-walkthrough",
        tags: ["Standalone"],
      },
      {
        id: "empty-sample",
        name: "Empty state · sample data",
        blurb: "Loads demo content in place so the screen teaches itself.",
        kind: "empty-state",
        variant: "sample-data",
        tags: ["Inline"],
      },
      {
        id: "empty-ghost",
        name: "Empty state · ghost preview",
        blurb: "Skeleton rows hint at the shape of the data that will arrive.",
        kind: "empty-state",
        variant: "ghost-preview",
        tags: ["Inline"],
      },
    ],
  },
];

export function getShelf(id: string): Shelf | undefined {
  return shelves.find((shelf) => shelf.id === id);
}

export function getShelfItem(
  shelfId: string,
  itemId: string,
): ShelfItem | undefined {
  return getShelf(shelfId)?.items.find((item) => item.id === itemId);
}
