import type {
  ChecklistConfig,
  DashboardConfig,
  EmptyStateConfig,
  OnboardingTheme,
  TourConfig,
} from "../types";

/** Checklist, tour, empty-state and dashboard presets. */

export const defaultTheme: OnboardingTheme = {
  scheme: "light",
  brand: "#2f6bff",
  radius: "0.75rem",
};

/* --------------------------- Checklists --------------------------- */

const gettingStartedTasks: ChecklistConfig["tasks"] = [
  {
    id: "connect",
    title: "Connect your first channel",
    description: "Link an account so Driftwood can publish on your behalf.",
    ctaLabel: "Connect",
    estMinutes: 2,
  },
  {
    id: "draft",
    title: "Draft your first post",
    description: "Start from a template or write from scratch.",
    ctaLabel: "Open composer",
    estMinutes: 5,
  },
  {
    id: "schedule",
    title: "Build a posting schedule",
    description: "Pick the days and times your audience is most active.",
    ctaLabel: "Set schedule",
    estMinutes: 3,
    dependsOn: ["connect"],
  },
  {
    id: "invite",
    title: "Invite a teammate",
    description: "Collaborate on drafts and approvals.",
    ctaLabel: "Send invite",
    estMinutes: 1,
  },
  {
    id: "analytics",
    title: "Review your first report",
    description: "See which posts performed best in the last 30 days.",
    ctaLabel: "View analytics",
    estMinutes: 4,
    dependsOn: ["draft"],
  },
];

export const checklistCard: ChecklistConfig = {
  id: "driftwood-checklist",
  variant: "dashboard-card",
  title: "Get started",
  subtitle: "Finish setting up to get the most out of Driftwood.",
  tasks: gettingStartedTasks,
  dismissible: true,
  showCount: true,
  celebrateOnComplete: true,
  completedTitle: "You're all set 🎉",
  completedBody: "Every setup step is done. Nice work.",
};

export const checklistPresets = {
  "dashboard-card": checklistCard,
  "launcher-popover": { ...checklistCard, variant: "launcher-popover" } as ChecklistConfig,
  "sidebar-panel": { ...checklistCard, variant: "sidebar-panel" } as ChecklistConfig,
  "top-banner": { ...checklistCard, variant: "top-banner" } as ChecklistConfig,
} as const;

/* ----------------------------- Tours ----------------------------- */

export const spotlightTour: TourConfig = {
  id: "driftwood-tour",
  variant: "spotlight",
  backdrop: true,
  dismissible: true,
  showStepCount: true,
  skipLabel: "Skip tour",
  finishLabel: "Finish",
  steps: [
    { id: "compose", title: "Start here", body: "Compose a post for every connected channel at once.", target: "[data-tour='compose']", placement: "bottom" },
    { id: "calendar", title: "Your week at a glance", body: "Drag posts to reschedule them without reopening the editor.", target: "[data-tour='calendar']", placement: "right" },
    { id: "analytics", title: "See what worked", body: "Performance updates within minutes of publishing.", target: "[data-tour='analytics']", placement: "right" },
  ],
};

export const modalSequenceTour: TourConfig = {
  id: "driftwood-whats-new",
  variant: "modal-sequence",
  backdrop: true,
  showDots: true,
  showStepCount: false,
  skipLabel: "Skip",
  finishLabel: "Get started",
  steps: [
    { id: "ideas", title: "Collect every idea in one place", body: "Capture thoughts as they arrive and turn the good ones into posts.", media: "linear-gradient(150deg,#cfe4ff,#eef5ff)", mediaKind: "gradient" },
    { id: "templates", title: "Start from a template", body: "Proven post structures you can adapt in a couple of minutes.", media: "linear-gradient(150deg,#ffe8cc,#fff7ec)", mediaKind: "gradient" },
    { id: "schedule", title: "Publish on your schedule", body: "Queue a week of content and let it go out automatically.", media: "linear-gradient(150deg,#d8f5e3,#f0fdf4)", mediaKind: "gradient" },
    { id: "replies", title: "Reply without switching tabs", body: "Comments from every channel land in a single inbox.", media: "linear-gradient(150deg,#ede0ff,#f8f4ff)", mediaKind: "gradient" },
  ],
};

export const featureWalkthrough: TourConfig = {
  id: "driftwood-walkthrough",
  variant: "feature-walkthrough",
  title: "Here's what you can do with Driftwood",
  finishLabel: "Get started",
  autoAdvanceMs: 0,
  steps: [
    { id: "organise", title: "Organise your ideas", body: "Collect and organise content ideas in one place with the idea board.", panelTone: "#d8e8fb", accent: "#3b82f6", media: "🗂", mediaKind: "emoji" },
    { id: "templates", title: "Get started with templates", body: "Jump-start your content with ready-made post templates.", panelTone: "#fbe8cc", accent: "#f0a33c", media: "🚀", mediaKind: "emoji" },
    { id: "compose", title: "Compose and post", body: "Write once and tailor the result for every channel.", panelTone: "#d9f2e3", accent: "#2eb872", media: "✍️", mediaKind: "emoji" },
    { id: "reply", title: "Reply to comments", body: "Keep conversations going from a single inbox.", panelTone: "#e8dffb", accent: "#8b5cf6", media: "💬", mediaKind: "emoji" },
  ],
};

export const beaconTour: TourConfig = { ...spotlightTour, id: "driftwood-beacons", variant: "beacon", backdrop: false };

export const tourPresets = {
  spotlight: spotlightTour,
  beacon: beaconTour,
  "modal-sequence": modalSequenceTour,
  "feature-walkthrough": featureWalkthrough,
} as const;

/* -------------------------- Empty states -------------------------- */

export const emptyStatePresets = {
  illustration: {
    id: "empty-illustration",
    variant: "illustration",
    glyph: "🗂",
    title: "No posts yet",
    body: "Everything you draft or schedule will show up here.",
    primaryCta: { id: "compose", label: "Write your first post" },
    secondaryCta: { id: "learn", label: "See an example" },
  } as EmptyStateConfig,
  "ghost-preview": {
    id: "empty-ghost",
    variant: "ghost-preview",
    title: "Your calendar is empty",
    body: "Scheduled posts appear here in the order they'll publish.",
    ghostRows: 5,
    primaryCta: { id: "schedule", label: "Schedule a post" },
  } as EmptyStateConfig,
  "sample-data": {
    id: "empty-sample",
    variant: "sample-data",
    glyph: "📊",
    title: "Nothing to report yet",
    body: "Publish a few posts and your performance will appear here.",
    hints: [
      "See which posts drove the most engagement",
      "Compare channels side by side",
      "Export a summary for your team",
    ],
    primaryCta: { id: "compose", label: "Write a post" },
    sampleDataLabel: "Explore with demo data",
  } as EmptyStateConfig,
} as const;

/* --------------------------- Dashboards --------------------------- */

export const activationHome: DashboardConfig = {
  id: "driftwood-home",
  variant: "activation-home",
  title: "Welcome back, {name}",
  subtitle: "Here's where things stand this week.",
  userName: "Alex",
  quickActions: [
    { id: "compose", label: "Write a post", description: "Draft for every channel at once", glyph: "✍️", glyphTone: "#e4f6e8" },
    { id: "schedule", label: "Plan your week", description: "Fill the queue in a few minutes", glyph: "🗓", glyphTone: "#e4efff" },
    { id: "invite", label: "Invite your team", description: "Share drafts and approvals", glyph: "👥", glyphTone: "#fdeaf4" },
  ],
  stats: [
    { id: "posts", label: "Posts published", value: "34", delta: "+12%", trend: "up", spark: [0.2, 0.4, 0.3, 0.6, 0.5, 0.8, 0.9] },
    { id: "engagement", label: "Engagement rate", value: "4.8%", delta: "+0.6pt", trend: "up", spark: [0.3, 0.35, 0.5, 0.45, 0.62, 0.7, 0.74] },
    { id: "followers", label: "New followers", value: "1,208", delta: "-3%", trend: "down", spark: [0.8, 0.7, 0.72, 0.6, 0.5, 0.48, 0.45] },
  ],
  activity: [
    { id: "a1", actor: "Priya", action: "scheduled", target: "Spring launch teaser", at: "2m ago", glyph: "🗓" },
    { id: "a2", actor: "Marcus", action: "commented on", target: "Q2 content plan", at: "1h ago", glyph: "💬" },
    { id: "a3", actor: "Alex", action: "published", target: "Behind the scenes", at: "3h ago", glyph: "🚀" },
    { id: "a4", actor: "Jae", action: "connected", target: "a new channel", at: "Yesterday", glyph: "🔌" },
  ],
  checklist: checklistCard,
};

export const metricsOverview: DashboardConfig = {
  id: "driftwood-metrics",
  variant: "metrics-overview",
  title: "Performance",
  subtitle: "Last 30 days compared with the previous period.",
  stats: [
    { id: "reach", label: "Reach", value: "184.2k", delta: "+18%", trend: "up", spark: [0.2, 0.3, 0.45, 0.4, 0.62, 0.78, 0.9] },
    { id: "engagement", label: "Engagements", value: "9,412", delta: "+7%", trend: "up", spark: [0.3, 0.42, 0.38, 0.55, 0.6, 0.66, 0.72] },
    { id: "clicks", label: "Link clicks", value: "2,318", delta: "+24%", trend: "up", spark: [0.1, 0.2, 0.34, 0.4, 0.55, 0.7, 0.85] },
    { id: "unfollows", label: "Unfollows", value: "142", delta: "-11%", trend: "down", spark: [0.7, 0.6, 0.55, 0.5, 0.42, 0.38, 0.3] },
  ],
  activity: activationHome.activity,
};

export const workspaceHub: DashboardConfig = {
  id: "driftwood-workspace",
  variant: "workspace-hub",
  title: "Analytics",
  subtitle: "Track how your content performs across every channel.",
  nav: [
    { id: "home", label: "Home", glyph: "🏠" },
    { id: "compose", label: "Compose", glyph: "✍️" },
    { id: "calendar", label: "Calendar", glyph: "🗓", badge: "3" },
    { id: "inbox", label: "Inbox", glyph: "💬" },
    { id: "analytics", label: "Analytics", glyph: "📈" },
  ],
  stats: metricsOverview.stats,
  emptyState: emptyStatePresets["sample-data"],
  activity: activationHome.activity,
};

export const usageBilling: DashboardConfig = {
  id: "driftwood-usage",
  variant: "usage-billing",
  title: "Usage and billing",
  subtitle: "Your plan renews on the 1st of next month.",
  meters: [
    { id: "posts", label: "Scheduled posts", used: 860, limit: 1000, warnAt: 0.8 },
    { id: "channels", label: "Connected channels", used: 8, limit: 10, warnAt: 0.8 },
    { id: "seats", label: "Team seats", used: 3, limit: 10, warnAt: 0.9 },
  ],
  stats: [
    { id: "spend", label: "Current bill", value: "$48.00", hint: "Billed monthly" },
    { id: "overage", label: "Projected overage", value: "$0.00", hint: "Based on current pace" },
    { id: "renews", label: "Renews in", value: "12 days" },
  ],
  upgradeNudge: {
    title: "You're close to your posting limit",
    body: "Upgrade to Growth for unlimited scheduled posts and 25 channels.",
    ctaLabel: "See plans",
    planId: "growth",
  },
};

export const dashboardPresets = {
  "activation-home": activationHome,
  "metrics-overview": metricsOverview,
  "workspace-hub": workspaceHub,
  "usage-billing": usageBilling,
} as const;
