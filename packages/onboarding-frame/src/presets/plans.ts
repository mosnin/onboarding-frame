import type { OnboardingTheme, PlansConfig } from "../types";

/**
 * Paywall and plan-selection presets.
 *
 * Prices are in minor units. Wallet buttons carry generic labels — swap them
 * for your processor's own buttons when wiring a real checkout.
 */

/* ------------------- Dark promotional sequence ------------------- */

export const spotlightTheme: OnboardingTheme = {
  scheme: "dark",
  brand: "#f5c98a",
  brandForeground: "#241606",
  ctaBackground: "#e9e9e9",
  ctaForeground: "#141414",
  radius: "1rem",
  canvas: { kind: "mesh", stops: ["#2b2350", "#3a2d1c", "#121212"] },
};

export const spotlightSequence: PlansConfig = {
  id: "lumen-premium",
  variant: "spotlight-sequence",
  title: "Unlock the full Lumen experience",
  subtitle: "Premium gives you unlimited learning, personalised coaching, and more.",
  promoLabel: "Limited time · 30% off annual plans",
  currency: "USD",
  defaultPeriod: "annual",
  sequence: ["value", "plans", "checkout"],
  plans: [
    { id: "monthly", name: "Monthly", priceMonthly: 3000, features: [], ctaLabel: "Subscribe now" },
    {
      id: "annual",
      name: "Annual",
      priceMonthly: 3000,
      priceAnnual: 1400,
      anchorAnnual: 2000,
      badge: "Most popular",
      highlighted: true,
      features: [],
      ctaLabel: "Subscribe now",
    },
    {
      id: "family",
      name: "Family",
      priceMonthly: 4000,
      priceAnnual: 2800,
      anchorAnnual: 4000,
      note: "6 seats",
      features: [],
      ctaLabel: "Subscribe now",
    },
  ],
  compareColumns: ["free", "premium"],
  featureRows: [
    { label: "Daily lesson", included: { free: true, premium: true } },
    { label: "Unlimited learning", included: { free: false, premium: true } },
    { label: "Personalised coaching", included: { free: false, premium: true }, locked: true },
    { label: "No ads", included: { free: false, premium: true } },
    { label: "Jump ahead and practise", included: { free: false, premium: true } },
  ],
  footnote:
    "*Billed as one payment. Renews annually, cancel anytime. You can turn off auto-renew from your settings.",
  checkout: {
    benefits: [
      { label: "Unlimited access to all courses", glyph: "📊" },
      { label: "Personalised coaching", glyph: "🧭" },
      { label: "No in-app purchases or ads", glyph: "🚫" },
      { label: "New content added regularly", glyph: "✨" },
    ],
    wallets: [
      { id: "wallet", label: "Pay with wallet", tone: "primary" },
      { id: "express", label: "Express checkout" },
    ],
    methods: [
      { id: "card", label: "Card", glyph: "💳" },
      { id: "installments", label: "Pay later", glyph: "🅺" },
    ],
    lineItems: [
      { label: "Annual plan", amount: 24000 },
      { label: "Launch discount (30%)", amount: -7200 },
    ],
    consents: [
      'By checking this box and clicking "Subscribe now", I agree to the Terms of Service and Privacy Policy.',
      'By checking this box and clicking "Subscribe now", I understand that my subscription begins immediately and renews automatically until I cancel.',
    ],
    submitLabel: "Subscribe now",
    trustLabel: "Payments are handled by your processor. This demo stores nothing.",
  },
};

/* --------------------- Quiet light tier cards --------------------- */

export const quietTiersTheme: OnboardingTheme = {
  scheme: "light",
  brand: "#2f6bff",
  radius: "0.7rem",
};

export const quietTiers: PlansConfig = {
  id: "fathom-plans",
  variant: "quiet-tiers",
  title: "Unlock the full power of Fathom",
  currency: "USD",
  plans: [
    {
      id: "pro",
      name: "Pro",
      priceMonthly: 2000,
      inheritsLabel: "Everything in Free, plus:",
      features: [
        "Higher usage quota",
        "Desktop app quota",
        "Pay-as-you-go past quota",
        "Chat, tracker and MCP integrations",
        "Plan, build, test and ship",
      ],
      ctaLabel: "Purchase",
    },
    {
      id: "max",
      name: "Max",
      priceMonthly: 20000,
      inheritsLabel: "Everything in Pro, plus:",
      features: ["Increased usage quota", "Increased desktop app quota"],
      ctaLabel: "Purchase",
    },
    {
      id: "teams",
      name: "Teams",
      priceMonthly: 8000,
      inheritsLabel: "Everything in Pro, plus:",
      features: [
        "Unlimited team members",
        "Share and collaborate",
        "Centralised billing",
        "Admin dashboard with analytics",
      ],
      ctaLabel: "Purchase",
    },
  ],
  freeEscape: {
    id: "continue-free",
    label: "Continue with free (limited access)",
    hint: "Free includes a limited monthly quota and no collaboration.",
  },
};

/* ----------------------- Trial + timeline ----------------------- */

export const trialTimeline: PlansConfig = {
  id: "ledgerline-trial",
  variant: "trial-timeline",
  title: "Start your free trial",
  subtitle: "See what Ledgerline can do for you, before you subscribe.",
  currency: "USD",
  plans: [
    {
      id: "annual",
      name: "$95/year + 1 month free trial",
      priceMonthly: 792,
      priceAnnual: 792,
      note: "Only $7.92/mo",
      highlighted: true,
      features: [],
    },
  ],
  checkout: {
    wallets: [
      { id: "wallet", label: "Express wallet", tone: "primary" },
      { id: "card", label: "Add credit card" },
    ],
    submitLabel: "Start free trial",
  },
  socialProof: {
    awards: ["Design Awards finalist", "Editor's choice", "App of the day"],
    headline: "21,000 five-star reviews",
    testimonials: [
      { title: "Simply the best", body: "By far the best budgeting app I have used, and I have tried a lot of them.", stars: 5 },
      { title: "Pays for itself", body: "Found three subscriptions I had forgotten about in the first week.", stars: 5 },
    ],
  },
  timeline: [
    { glyph: "▶", title: "Today, your free trial begins.", body: "We analyse your connected accounts, categorise spending and track your net worth." },
    { glyph: "✉", title: "Get notified 7 days before your trial ends.", body: "You'll receive a reminder before anything is charged." },
    { glyph: "★", title: "After a month, your trial ends.", body: "Your subscription begins. Cancel any time before then." },
  ],
  footnote:
    "Sales tax may apply. After the free trial, this subscription renews at $95/year. Cancel anytime, for any reason.",
  footerLinks: [
    { id: "learn", label: "Learn more" },
    { id: "plans", label: "All plans" },
    { id: "referral", label: "Enter referral" },
    { id: "skip", label: "Skip" },
  ],
};

/* ------------------------- Quota matrix ------------------------- */

export const quotaMatrix: PlansConfig = {
  id: "fathom-quota",
  variant: "quota-matrix",
  title: "Your Generations",
  titleAccent: "Maximise",
  subtitle: "Compare plans by total image and video outputs available each month",
  currency: "USD",
  plans: [
    { id: "ultra", name: "Ultra", priceMonthly: 9900, highlighted: true, features: [], ctaLabel: "Continue" },
    { id: "plus", name: "Plus", priceMonthly: 4900, features: [] },
    { id: "starter", name: "Starter", priceMonthly: 1900, features: [] },
  ],
  quotaRows: [
    {
      label: "Aurora Pro 2K",
      hint: "2K resolution",
      icon: "sparkle",
      kind: "image",
      values: { ultra: "1,500", plus: "600", starter: "100" },
      badges: { ultra: "7-day unlim" },
    },
    {
      label: "Cascade 1.5 Pro",
      hint: "With audio, 1080p, 4s",
      icon: "barChart",
      kind: "video",
      values: { ultra: "250", plus: "100", starter: "16" },
      badges: { ultra: "7-day unlim", plus: "7-day unlim" },
    },
    {
      label: "Driftline 3.0",
      hint: "With audio, 720p, 5s",
      icon: "circle",
      kind: "video",
      values: { ultra: "333", plus: "133", starter: "22" },
      badges: { ultra: "+ 100 Free Gens" },
    },
    {
      label: "Driftline Motion Control",
      hint: "1080p",
      icon: "circle",
      kind: "video",
      values: { ultra: "428", plus: "171", starter: "28" },
    },
    {
      label: "Lumen Veo 3",
      hint: "720p",
      icon: "sparkle",
      kind: "video",
      values: { ultra: "51", plus: "20", starter: "3" },
    },
  ],
};

/* ------------------------- Offer modal ------------------------- */

export const offerModal: PlansConfig = {
  id: "fathom-offer",
  variant: "offer-modal",
  title: "Limited offer",
  currency: "USD",
  plans: [{ id: "ultra", name: "Ultra", priceMonthly: 4550, anchorMonthly: 9900, features: [] }],
  offer: {
    eyebrow: "Congrats, you're in the 5% who receive this offer",
    glyph: "🎁",
    headline:
      "You're in the 5% who received this personal **54% off** with **unlimited stills** and **unlimited video**",
    body: "This offer is active for a limited time only.",
    promoCode: "_PERSONAL_PROMO",
    promoNote: "promocode is applied",
    discountLabel: "54% OFF",
    discountNote: "With limited-offer promo",
    countdownSeconds: 599,
    ctaLabel: "Claim discount",
    celebrate: true,
    accent: "#ff2d6f",
  },
};

/* ---------------- Comparison table + usage slider ---------------- */

export const comparisonTable: PlansConfig = {
  id: "generic-comparison",
  variant: "comparison-table",
  title: "Level up with Premium",
  promoLabel: "Limited time · 30% off",
  currency: "USD",
  plans: [
    { id: "free", name: "Free", priceMonthly: 0, features: [] },
    { id: "premium", name: "Premium", priceMonthly: 1400, highlighted: true, features: [], ctaLabel: "Subscribe now" },
  ],
  compareColumns: ["free", "premium"],
  featureRows: [
    { label: "Daily lesson", included: { free: true, premium: true } },
    { label: "Unlimited learning", included: { free: false, premium: true } },
    { label: "Personalised coaching", included: { free: false, premium: true }, locked: true },
    { label: "No ads", included: { free: false, premium: true } },
    { label: "Jump ahead and practise", included: { free: false, premium: true } },
  ],
};

export const usageSlider: PlansConfig = {
  id: "generic-seats",
  variant: "usage-slider",
  title: "Pick a plan that fits your team",
  subtitle: "Pricing scales with the number of people who need access.",
  currency: "USD",
  showPeriodToggle: true,
  defaultPeriod: "annual",
  seats: { min: 1, max: 50, default: 8, label: "Team members" },
  plans: [
    { id: "starter", name: "Starter", priceMonthly: 900, priceAnnual: 700, perSeat: true, features: [] },
    { id: "growth", name: "Growth", priceMonthly: 1800, priceAnnual: 1400, perSeat: true, highlighted: true, features: [] },
    { id: "scale", name: "Scale", priceMonthly: 4900, priceAnnual: 3900, features: [] },
  ],
};

export const plansPresets = {
  "spotlight-sequence": { config: spotlightSequence, theme: spotlightTheme },
  "quiet-tiers": { config: quietTiers, theme: quietTiersTheme },
  "trial-timeline": { config: trialTimeline, theme: quietTiersTheme },
  "quota-matrix": {
    config: quotaMatrix,
    // The reference's Continue is pure white on the dark panel, not the
    // off-white the default dark CTA resolves to.
    theme: {
      scheme: "dark",
      brand: "#c9f24e",
      brandForeground: "#101400",
      ctaBackground: "#ffffff",
      ctaForeground: "#101011",
    } as OnboardingTheme,
  },
  "offer-modal": { config: offerModal, theme: { scheme: "dark", brand: "#ccff00", brandForeground: "#101400" } as OnboardingTheme },
  "comparison-table": { config: comparisonTable, theme: spotlightTheme },
  "usage-slider": { config: usageSlider, theme: quietTiersTheme },
} as const;
