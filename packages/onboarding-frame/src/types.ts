import type { ReactNode } from "react";

/* ------------------------------------------------------------------ *
 * Theming
 * ------------------------------------------------------------------ */

export type ColorScheme = "light" | "dark";

export interface OnboardingTheme {
  /** Base surface palette. */
  scheme?: ColorScheme;
  /** Primary brand colour; any CSS colour string. */
  brand?: string;
  /** Foreground used on top of `brand`. */
  brandForeground?: string;
  /** Background of the primary call-to-action pill. */
  ctaBackground?: string;
  /** Foreground of the primary call-to-action pill. */
  ctaForeground?: string;
  /** Corner radius for cards and controls, e.g. `"0.75rem"`. */
  radius?: string;
  /** Spacing multiplier. 0.85 = compact, 1 = default, 1.2 = roomy. */
  density?: number;
  /** Font stack for body copy. */
  fontFamily?: string;
  /** Font stack for display headings; falls back to `fontFamily`. */
  displayFontFamily?: string;
  /** Optional decorative canvas behind full-screen flows. */
  canvas?: CanvasConfig;
}

export interface CanvasConfig {
  kind: "solid" | "mesh" | "spotlight-glow";
  /** Colour stops used by `mesh` and `spotlight-glow`. */
  stops?: string[];
}

/* ------------------------------------------------------------------ *
 * Analytics
 * ------------------------------------------------------------------ */

export type OnboardingEventName =
  | "flow_started"
  | "flow_completed"
  | "flow_dismissed"
  | "step_viewed"
  | "step_completed"
  | "step_skipped"
  | "field_changed"
  | "task_completed"
  | "task_expanded"
  | "cta_clicked"
  | "plan_selected"
  | "checkout_submitted"
  | "sample_data_loaded";

export interface OnboardingEvent {
  name: OnboardingEventName;
  /** Identifier of the flow that emitted the event. */
  flowId: string;
  /** Step / task / plan id where applicable. */
  targetId?: string;
  at: number;
  data?: Record<string, unknown>;
}

/* ------------------------------------------------------------------ *
 * Wizard
 * ------------------------------------------------------------------ */

export type WizardVariant =
  | "fullscreen-quiz"
  /** Black canvas, top-edge accent progress, corner-check cards. */
  | "neon-quiz"
  | "warm-survey"
  | "split-rail"
  /** Soft canvas, assistant orb, first-person copy, circular CTA. */
  | "conversational"
  | "centered-card";

export type FieldValue = string | string[] | boolean | number | null;

export interface ChoiceOption {
  id: string;
  label: string;
  /** Secondary line under the label. */
  description?: string;
  /** Emoji or short glyph rendered above the label. */
  glyph?: string;
  /** Monospace snippet rendered as the card's media, as in a "pick your level" step. */
  code?: string;
  /** CSS gradient applied when the card is selected (poster cards). */
  gradient?: string;
  /** Pastel background behind `glyph`, e.g. "#e7f6ec". */
  glyphTone?: string;
  /** Small trailing badge, e.g. "Popular". */
  badge?: string;
  /** Text wordmark rendered in place of a glyph (`logo-grid`). */
  wordmark?: string;
  /** Body shown under a `segmented` tab when this option is active. */
  panel?: SegmentPanel;
  /** Steps to skip when this option is chosen. */
  skipSteps?: string[];
}

/** Body rendered beneath an active `segmented` tab. */
export interface SegmentPanel {
  title?: string;
  body?: string;
  /** Example rows, e.g. a transaction with a category chip and an amount. */
  rows?: {
    label: string;
    chip?: string;
    chipTone?: string;
    value?: string;
    /** Marks the row as produced by an automated/intelligent system. */
    smart?: boolean;
  }[];
  /** Callout sentence under the rows. */
  note?: string;
}

export type FieldKind =
  /** Tall cards with a title + description, optionally a code/glyph header. */
  | "choice-cards"
  /** Poster tiles that fill with a gradient when selected. */
  | "poster-cards"
  /** Full-width rows: icon tile, title, sub-line, trailing check control. */
  | "list-rows"
  /** Dense grid of square tiles with a corner check badge. */
  | "icon-grid"
  /** Compact chips, for many short options. */
  | "multi-select"
  /** Inline chip sentence with a leading prefix, e.g. "I'm a ... [Teacher]". */
  | "chips"
  /** Bordered rows with an icon, label and chevron; flip to a check when done. */
  | "action-rows"
  /** Segmented tab group that swaps the panel body below it. */
  | "segmented"
  /** Grid of wordmark/logo tiles, as in an institution picker. */
  | "logo-grid"
  | "text"
  /** Row of circular options, plus upload and shuffle affordances. */
  | "avatar-picker"
  /** Checkbox paired with legal or explanatory copy. */
  | "consent"
  | "email-list"
  | "toggle"
  | "slider";

export interface WizardField {
  id: string;
  kind: FieldKind;
  label?: string;
  placeholder?: string;
  required?: boolean;
  options?: ChoiceOption[];
  /** Accept more than one selection. Defaults to true for `multi-select`. */
  multiple?: boolean;
  /** Cap on selections when `multiple`. */
  maxSelections?: number;
  /** `slider` only. */
  min?: number;
  max?: number;
  step?: number;
  /** Columns for card grids; defaults to the option count, capped at 4. */
  columns?: number;
  /** `list-rows`: bordered card rows, or centred full-width pills. */
  rowStyle?: "card" | "pill";
  /** Where the selection control sits on a card. */
  checkPosition?: "corner" | "inline" | "none";
  /** Small uppercase label above the field, e.g. "PAYMENT METHOD". */
  sectionLabel?: string;
  /** `chips`: sentence prefix rendered before the first chip. */
  prefix?: string;
  /** `text`: floating label above the value. */
  floatingLabel?: string;
  /** `consent`: the copy beside the checkbox. Supports [text](href) links. */
  consentText?: string;
  /** `avatar-picker`: show the dashed upload affordance. */
  allowUpload?: boolean;
  /** `avatar-picker`: show the shuffle affordance. */
  allowShuffle?: boolean;
  defaultValue?: FieldValue;
}

export type WizardStepKind =
  /** Default: a question with fields and a CTA. */
  | "question"
  /** Opening greeting with a single CTA and optional ambient background. */
  | "welcome"
  /** Non-interactive pause: headline, sub-line and a spinner. */
  | "interstitial"
  /** Grid of summary cards confirming what was set up. */
  | "review"
  /** Single card restating the collected answers, with an edit affordance. */
  | "confirm";

export interface WizardStep {
  id: string;
  /** Defaults to `"question"`. */
  kind?: WizardStepKind;
  title: string;
  description?: string;
  /** Overrides the flow-level CTA label for this step. */
  ctaLabel?: string;
  /** Renders a "Skip" affordance under the CTA. */
  skippable?: boolean;
  /** `interstitial` only: auto-advance after this many milliseconds. */
  autoAdvanceMs?: number;
  /** Short label for this step in the breadcrumb header. */
  breadcrumbLabel?: string;
  /** Inline link rendered at the end of the description. */
  learnMore?: { label: string; href?: string };
  /** Small underlined link under the CTA, e.g. "change my name". */
  inlineLink?: { id: string; label: string };
  /** Secondary button under the primary CTA, e.g. "Skip for now". */
  secondaryCta?: { id: string; label: string };
  /** Right-hand panel for `split-rail`, reflecting state as it is collected. */
  sidePanel?: WizardSidePanel;
  /** `review` only: the summary cards. */
  reviewCards?: ReviewCard[];
  /**
   * `confirm` only: sentence assembled from collected answers. `{fieldId}`
   * interpolates a value; `{fieldId:option}` interpolates the chosen label.
   */
  summaryTemplate?: string;
  /** `confirm` only: field id whose value supplies the card's title. */
  summaryTitleField?: string;
  /** `confirm` only: field id whose chosen option supplies the avatar. */
  summaryAvatarField?: string;
  /** `confirm` only: label for the edit affordance. */
  editLabel?: string;
  /** Constrain the body to a narrow centred column instead of the left rail. */
  centered?: boolean;
  /** Pin the CTA to the bottom, floating over a scrolling body. */
  stickyCta?: boolean;
  fields?: WizardField[];
  /** Escape hatch: arbitrary content rendered in place of `fields`. */
  render?: (ctx: WizardRenderContext) => ReactNode;
}

export interface ReviewCard {
  id: string;
  title: string;
  /** Headline figure, e.g. "$0" or "1". */
  value: string;
  /** Unit line under the figure, e.g. "earned last month". */
  unit?: string;
  /** Trailing link label, e.g. "Review". */
  linkLabel?: string;
  /** Italic note shown when the card has nothing to report. */
  emptyNote?: string;
  /** Chip pinned to the bottom of the card. */
  chip?: { label: string; glyph?: string; value?: string };
  /** Secondary inline action next to the title. */
  action?: { id: string; label: string };
}

export type WizardSidePanelKind =
  /** Totals plus labelled meters, e.g. a net-worth breakdown. */
  | "summary"
  /** Radial concept diagram with labelled nodes. */
  | "diagram"
  /** Centred icon medallion on a hairline horizon. */
  | "medallion"
  /** Vertical "what happens next" timeline on an accent rail. */
  | "timeline"
  /** Large media still with a caption card and meta chips. */
  | "media"
  /** Awards, a review count and testimonial cards. */
  | "social-proof"
  /** Arbitrary content supplied by the consumer. */
  | "custom";

export interface WizardSidePanel {
  kind: WizardSidePanelKind;
  title?: string;
  /** `summary`: the headline figures. */
  stats?: { label: string; value: string; tone?: string }[];
  /** `summary`: grouped meters, each 0-100. */
  groups?: {
    heading: string;
    rows: { label: string; value: string; pct?: number; hint?: string }[];
  }[];
  /** `diagram`: labelled nodes around the hub. */
  nodes?: { label: string; glyph?: string; tone?: string }[];
  /** `diagram`: nodes hanging below the hub. */
  leaves?: string[];
  /** `medallion`: the glyph inside the circle. */
  glyph?: string;
  /** `timeline`: ordered milestones. */
  milestones?: { glyph?: string; title: string; body?: string }[];
  /** `social-proof`: award ribbons across the top. */
  awards?: string[];
  /** `social-proof`: headline above the testimonials, e.g. "21,000 5-star reviews". */
  proofHeadline?: string;
  /** `social-proof`: testimonial cards. */
  testimonials?: { title: string; body: string; stars?: number }[];
  /** `media`: image URL or CSS gradient standing in for a still. */
  media?: string;
  /** `media`: caption card under the still. */
  caption?: string;
  /** `media`: meta chips under the caption, e.g. model, ratio, quality. */
  metaChips?: { label: string; glyph?: string }[];
  /** `custom`: rendered as-is. */
  render?: (ctx: WizardRenderContext) => ReactNode;
}

export interface WizardRenderContext {
  values: Record<string, FieldValue>;
  setValue: (fieldId: string, value: FieldValue) => void;
  next: () => void;
  back: () => void;
}

export interface WizardConfig {
  id: string;
  variant: WizardVariant;
  steps: WizardStep[];
  /** Default CTA label; per-step `ctaLabel` wins. */
  ctaLabel?: string;
  /**
   * Header progress treatment.
   * `bar` = thin rail, `dots` = pagination dots, `breadcrumb` = named steps
   * with chevrons, `none` = nothing.
   */
  progressStyle?: "bar" | "dots" | "breadcrumb" | "none";
  /** @deprecated Use `progressStyle`. Kept so older configs keep working. */
  showProgress?: boolean;
  /** Show a back chevron once past the first step. */
  showBack?: boolean;
  /** Optional icon button at the top-right of the fullscreen variant. */
  topBarAction?: { id: string; label: string; glyph?: string };
  /** Headline shown in the left rail of `split-rail`. */
  railTitle?: string;
  railSubtitle?: string;
  /** Product name used in greetings and the header lockup. */
  brandName?: string;
  /** Emoji or glyph rendered as the header logo mark. */
  logoGlyph?: string;
  /** Dot pagination instead of a progress bar (`warm-survey`). */
  showDots?: boolean;
  /** Render the light/dark toggle in the header. */
  showSchemeToggle?: boolean;
  /** Label for the skip affordance. */
  skipLabel?: string;
  /** Shape of the primary CTA. */
  ctaStyle?: "pill" | "block" | "circle";
  /** Assistant orb shown above each step, as in a conversational flow. */
  avatar?: { kind: "orb"; stops?: string[]; label?: string };
  /**
   * Ambient tiles drifting behind a `welcome` step. Each entry is an emoji or
   * short glyph; positions are generated deterministically from the index.
   */
  ambientTiles?: string[];
  /** Small links under the step body, e.g. Privacy, Skip for now. */
  footerLinks?: { id: string; label: string; href?: string }[];
  /** Right-hand header actions for `split-rail`. */
  headerActions?: { id: string; label: string; glyph?: string }[];
}

/* ------------------------------------------------------------------ *
 * Checklist
 * ------------------------------------------------------------------ */

export type ChecklistVariant =
  | "launcher-popover"
  | "dashboard-card"
  | "sidebar-panel"
  | "top-banner";

export interface ChecklistTask {
  id: string;
  title: string;
  description?: string;
  ctaLabel?: string;
  /** Rough time-to-complete, rendered as a hint chip. */
  estMinutes?: number;
  done?: boolean;
  /** Task cannot be started until these task ids are done. */
  dependsOn?: string[];
}

export interface ChecklistConfig {
  id: string;
  variant: ChecklistVariant;
  title: string;
  subtitle?: string;
  tasks: ChecklistTask[];
  /** Render a dismiss control. */
  dismissible?: boolean;
  /** Show "3 of 7" alongside the progress bar. */
  showCount?: boolean;
  /** Fire a confetti burst when the last task completes. */
  celebrateOnComplete?: boolean;
  /** Copy shown once every task is done. */
  completedTitle?: string;
  completedBody?: string;
}

/* ------------------------------------------------------------------ *
 * Tour
 * ------------------------------------------------------------------ */

export type TourVariant =
  | "spotlight"
  | "beacon"
  | "modal-sequence"
  | "feature-walkthrough";

export type TourPlacement = "top" | "bottom" | "left" | "right" | "auto";

export interface TourStep {
  id: string;
  title: string;
  body?: string;
  /** CSS selector for the element to anchor to. Ignored by `modal-sequence`. */
  target?: string;
  placement?: TourPlacement;
  /** Hero media for `modal-sequence`: a CSS gradient, image URL, or emoji. */
  media?: string;
  mediaKind?: "gradient" | "image" | "emoji";
  ctaLabel?: string;
  /** `feature-walkthrough`: pastel colour block behind the media panel. */
  panelTone?: string;
  /** `feature-walkthrough`: accent bar colour on the active stepper row. */
  accent?: string;
}

export interface TourConfig {
  id: string;
  variant: TourVariant;
  steps: TourStep[];
  /** Dimmed backdrop behind the spotlight / modal. */
  backdrop?: boolean;
  /** Allow dismissing the whole tour. */
  dismissible?: boolean;
  /** Show "2 / 5" progress text. */
  showStepCount?: boolean;
  /** Show dot pagination (modal-sequence). */
  showDots?: boolean;
  skipLabel?: string;
  finishLabel?: string;
  /** `feature-walkthrough`: headline above the vertical stepper. */
  title?: string;
  /** `feature-walkthrough`: advance the active row every N ms. 0 disables. */
  autoAdvanceMs?: number;
}

/* ------------------------------------------------------------------ *
 * Empty state
 * ------------------------------------------------------------------ */

export type EmptyStateVariant = "illustration" | "ghost-preview" | "sample-data";

export interface EmptyStateConfig {
  id: string;
  variant: EmptyStateVariant;
  title: string;
  body?: string;
  /** Emoji or glyph for the `illustration` variant. */
  glyph?: string;
  primaryCta?: { id: string; label: string };
  secondaryCta?: { id: string; label: string };
  /** Label for the "load demo data" affordance on `sample-data`. */
  sampleDataLabel?: string;
  /** Number of ghost rows rendered by `ghost-preview`. */
  ghostRows?: number;
  /** Short teaching bullets rendered under the body. */
  hints?: string[];
}

/* ------------------------------------------------------------------ *
 * Plans / paywall
 * ------------------------------------------------------------------ */

export type PlansVariant =
  /** Dark, promotional, multi-screen: value -> plans -> checkout. */
  | "spotlight-sequence"
  /** Light, restrained, equal tiers with a free escape hatch. */
  | "quiet-tiers"
  /** Feature matrix with one emphasised column. */
  | "comparison-table"
  /** Seat or usage slider that recalculates the price. */
  | "usage-slider"
  /** Trial offer with a payment picker and a "what happens when" timeline. */
  | "trial-timeline"
  /** Quota matrix: rows of capabilities, columns of tiers, value chips. */
  | "quota-matrix"
  /** Time-boxed discount modal with an applied promo code and countdown. */
  | "offer-modal";

export type BillingPeriod = "monthly" | "annual";

export interface PlanTier {
  id: string;
  name: string;
  /** Price in minor units (cents) for the monthly period. */
  priceMonthly: number;
  /** Price in minor units per month when billed annually. */
  priceAnnual?: number;
  /** Struck-through anchor price in minor units, for discount framing. */
  anchorMonthly?: number;
  anchorAnnual?: number;
  /** e.g. "Everything in Pro, plus:" */
  inheritsLabel?: string;
  features: string[];
  /** Renders the emphasis treatment (gradient border + badge). */
  highlighted?: boolean;
  badge?: string;
  /** Sub-label under the price, e.g. "6 seats". */
  note?: string;
  ctaLabel?: string;
  /** Per-seat pricing multiplies by the seat count in `usage-slider`. */
  perSeat?: boolean;
}

export interface PlanFeatureRow {
  label: string;
  /** Map of plan id -> included. */
  included: Record<string, boolean>;
  /** Marks the row with a "premium" lock glyph. */
  locked?: boolean;
}

export interface CheckoutConfig {
  /** Benefit bullets in the left rail. */
  benefits?: { label: string; glyph?: string }[];
  /** Generic express-checkout buttons. Labels only — wire your own provider. */
  wallets?: { id: string; label: string; tone?: "primary" | "neutral" }[];
  /** Segmented payment method tabs. */
  methods?: { id: string; label: string; glyph?: string }[];
  /** Consent checkboxes that gate the submit button. */
  consents?: string[];
  submitLabel?: string;
  /** Footer trust line, e.g. "Payments handled by your processor". */
  trustLabel?: string;
  /** Collapsible order-summary line items. */
  lineItems?: { label: string; amount: number }[];
}

export interface PlansConfig {
  id: string;
  variant: PlansVariant;
  title: string;
  subtitle?: string;
  /** Promotional pill above the plan grid. */
  promoLabel?: string;
  plans: PlanTier[];
  currency?: string;
  defaultPeriod?: BillingPeriod;
  /** Render the monthly/annual switch. */
  showPeriodToggle?: boolean;
  /** Comparison rows; also powers the `spotlight-sequence` value screen. */
  featureRows?: PlanFeatureRow[];
  /** Column ids compared in `comparison-table`, e.g. ["free", "premium"]. */
  compareColumns?: string[];
  /** Escape hatch, e.g. "Continue with free (limited access)". */
  freeEscape?: { id: string; label: string; hint?: string };
  /** Fine print under the plan grid. */
  footnote?: string;
  /** Screens for `spotlight-sequence`, in order. */
  sequence?: ("value" | "plans" | "checkout")[];
  checkout?: CheckoutConfig;
  dismissible?: boolean;
  /** Seat range for `usage-slider`. */
  seats?: { min: number; max: number; default: number; label?: string };
  /** `trial-timeline`: milestones explaining what happens and when. */
  timeline?: { glyph?: string; title: string; body?: string }[];
  /** `trial-timeline`: awards, review count and testimonials. */
  socialProof?: {
    awards?: string[];
    headline?: string;
    testimonials?: { title: string; body: string; stars?: number }[];
  };
  /** Small links under the primary CTA. */
  footerLinks?: { id: string; label: string; href?: string }[];
  /** `quota-matrix`: one row per capability, with a value per plan id. */
  quotaRows?: QuotaRow[];
  /** `offer-modal`: the limited-time offer. */
  offer?: OfferConfig;
}

export interface QuotaRow {
  label: string;
  /** Sub-line under the label, e.g. "2K resolution". */
  hint?: string;
  glyph?: string;
  /** Plan id -> displayed value, e.g. { ultra: "1,500", plus: "600" }. */
  values: Record<string, string>;
  /** Plan id -> small promo badge, e.g. { ultra: "7-day unlim" }. */
  badges?: Record<string, string>;
}

export interface OfferConfig {
  /** Marquee line above the card. */
  eyebrow?: string;
  glyph?: string;
  /**
   * Headline with `**bold**` spans rendered in the accent colour, e.g.
   * "You're in 5% who received this personal **54% OFF**".
   */
  headline: string;
  body?: string;
  /** Applied promo code chip. */
  promoCode?: string;
  promoNote?: string;
  /** Large discount figure, e.g. "54% OFF". */
  discountLabel?: string;
  discountNote?: string;
  /** Countdown length in seconds; counts down live and stops at zero. */
  countdownSeconds?: number;
  ctaLabel?: string;
  /** Burst confetti when the modal opens. */
  celebrate?: boolean;
  /** Colour used for the highlighted headline spans and the discount figure. */
  accent?: string;
}

/* ------------------------------------------------------------------ *
 * Playground payload
 * ------------------------------------------------------------------ */

export type PatternKind =
  | "wizard"
  | "checklist"
  | "tour"
  | "empty-state"
  | "plans"
  | "dashboard";

export type AnyFlowConfig =
  | WizardConfig
  | ChecklistConfig
  | TourConfig
  | EmptyStateConfig
  | PlansConfig
  | DashboardConfig;

/* ------------------------------------------------------------------ *
 * Dashboard
 * ------------------------------------------------------------------ */

export type DashboardVariant =
  /** Welcome header, getting-started checklist and quick-action tiles. */
  | "activation-home"
  /** KPI tiles, trend strips and a recent-activity feed. */
  | "metrics-overview"
  /** Sidebar workspace that swaps between empty and populated states. */
  | "workspace-hub"
  /** Quota meters and plan usage that bridge into an upgrade. */
  | "usage-billing";

export interface StatTile {
  id: string;
  label: string;
  value: string;
  /** Change vs. the previous period, e.g. "+12.4%". */
  delta?: string;
  trend?: "up" | "down" | "flat";
  hint?: string;
  /** Normalised 0-1 points rendered as a sparkline. */
  spark?: number[];
}

export interface QuotaMeter {
  id: string;
  label: string;
  used: number;
  limit: number;
  unit?: string;
  /** Shows the meter in a warning tone once usage passes this fraction. */
  warnAt?: number;
}

export interface ActivityItem {
  id: string;
  actor: string;
  action: string;
  target?: string;
  at: string;
  glyph?: string;
}

export interface QuickAction {
  id: string;
  label: string;
  description?: string;
  glyph?: string;
  glyphTone?: string;
}

export interface DashboardConfig {
  id: string;
  variant: DashboardVariant;
  /** Greeting headline; `{name}` interpolates `userName`. */
  title: string;
  subtitle?: string;
  userName?: string;
  /** Nav entries for `workspace-hub`. */
  nav?: { id: string; label: string; glyph?: string; badge?: string }[];
  stats?: StatTile[];
  quickActions?: QuickAction[];
  activity?: ActivityItem[];
  meters?: QuotaMeter[];
  /** Embedded getting-started checklist. */
  checklist?: ChecklistConfig;
  /** Empty state shown by `workspace-hub` before any data exists. */
  emptyState?: EmptyStateConfig;
  /** Upgrade nudge shown when a meter crosses its warning threshold. */
  upgradeNudge?: {
    title: string;
    body?: string;
    ctaLabel: string;
    planId?: string;
  };
}

/** The exact object the playground serialises for copy / AI hand-off. */
export interface FlowBlueprint {
  $schema: "https://onboarding-frame.dev/schema/v1.json";
  pattern: PatternKind;
  theme: OnboardingTheme;
  config: AnyFlowConfig;
}
