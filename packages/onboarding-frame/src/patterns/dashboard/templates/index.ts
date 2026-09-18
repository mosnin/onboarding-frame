export { Surface } from "./tokens";
export type { TemplateTokens } from "./tokens";
export type { TemplateProps } from "./api-console";

export { ApiConsoleTemplate } from "./api-console";
export type { ApiConsolePage, ApiConsoleProps } from "./api-console";
export { SetupChecklistTemplate } from "./setup-checklist";
export type { ChecklistPage, SetupChecklistProps } from "./setup-checklist";
export { GuidedSetupTemplate } from "./guided-setup";
export { AssistantHomeTemplate } from "./assistant-home";
export { FileLibraryTemplate } from "./file-library";
export { CreativeStudioTemplate } from "./creative-studio";
export { DiscoveryFeedTemplate } from "./discovery-feed";
export { GuidesAssistantTemplate } from "./guides-assistant";
export type { GuidesPage, GuidesAssistantProps } from "./guides-assistant";
export { BrandStudioTemplate } from "./brand-studio";
export { CommerceAnalyticsTemplate } from "./commerce-analytics";
export { SupportInsightsTemplate } from "./support-insights";
export { FinanceOverviewTemplate } from "./finance-overview";
export type { FinancePage, FinanceOverviewProps } from "./finance-overview";
export { ModelingHomeTemplate } from "./modeling-home";
export type { ModelingPage, ModelingHomeProps } from "./modeling-home";
export { SocialSchedulerTemplate } from "./social-scheduler";
export type { SchedulerPage, SocialSchedulerProps } from "./social-scheduler";
export { MarketTerminalTemplate } from "./market-terminal";
export type { TerminalPage, MarketTerminalProps } from "./market-terminal";
export { EventAnalyticsTemplate } from "./event-analytics";
export type { EventPage, EventAnalyticsProps } from "./event-analytics";
export { CommunityTrafficTemplate } from "./community-traffic";
export type { CommunityPage, CommunityTrafficProps } from "./community-traffic";
export { GoalTrackerTemplate } from "./goal-tracker";
export type { GoalPage, GoalTrackerProps } from "./goal-tracker";
export { PlatformReportsTemplate } from "./platform-reports";
export type { ReportsPage, PlatformReportsProps } from "./platform-reports";
export { DeployAnalyticsTemplate } from "./deploy-analytics";
export type { DeployPage, DeployAnalyticsProps } from "./deploy-analytics";
export { TokenUsageTemplate } from "./token-usage";
export type { UsagePage, TokenUsageProps } from "./token-usage";
export { CrmWorkspaceTemplate } from "./crm-workspace";
export type { CrmPage, CrmWorkspaceProps } from "./crm-workspace";

export interface TemplateMeta {
  slug: string;
  name: string;
  blurb: string;
  /** Pages this template implements, beyond the reference page. */
  pages: { id: string; label: string }[];
}

/**
 * Template catalogue.
 *
 * Each entry is a distinct product surface with its own palette, radius and
 * type scale — not variants of one house style.
 */
export const templateCatalog: TemplateMeta[] = [
  {
    slug: "api-console",
    name: "API console",
    blurb:
      "Developer platform home: a dismissible getting-started band above credit, request and error strips.",
    pages: [
      { id: "home", label: "Home" },
      { id: "explore", label: "Explore" },
      { id: "assets", label: "Assets" },
      { id: "serverless", label: "Serverless" },
      { id: "usage", label: "Usage" },
    ],
  },
  {
    slug: "setup-checklist",
    name: "Setup checklist",
    blurb:
      "Near-black nav rail carrying persistent setup progress, with a step-by-step task list as the whole page.",
    pages: [
      { id: "setup", label: "Setup" },
      { id: "finance", label: "Finance" },
    ],
  },
  {
    slug: "guided-setup",
    name: "Guided setup",
    blurb:
      "Numbered activation sequence where only the current step is interactive and later steps stay visible but disabled.",
    pages: [{ id: "home", label: "Getting started" }],
  },
  {
    slug: "assistant-home",
    name: "Assistant home",
    blurb:
      "A single centred prompt as the entire primary surface, with topic nav and suggestions arranged around it.",
    pages: [{ id: "home", label: "Home" }],
  },
  {
    slug: "file-library",
    name: "File library",
    blurb:
      "Project grid where the create affordance leads the grid, so an empty workspace still has an obvious next action.",
    pages: [{ id: "files", label: "My files" }],
  },
  {
    slug: "creative-studio",
    name: "Creative studio",
    blurb:
      "Oversized prompt hero on a textured band, with capability chips that teach what the tool can do.",
    pages: [{ id: "home", label: "Home" }],
  },
  {
    slug: "guides-assistant",
    name: "Guides with assistant",
    blurb:
      "Personalised setup guide down the middle with a docked assistant that suggests the next action.",
    pages: [
      { id: "started", label: "Get started" },
      { id: "dashboards", label: "Overview dashboard" },
    ],
  },
  {
    slug: "brand-studio",
    name: "Brand studio",
    blurb:
      "Editorial serif headings on a near-white canvas, with an ad-library showcase and a brand asset row.",
    pages: [{ id: "overview", label: "Overview" }],
  },
  {
    slug: "commerce-analytics",
    name: "Commerce analytics",
    blurb:
      "Near-black command bar over a light reporting body, with spiky real-world sales data rather than a smooth invented trend.",
    pages: [{ id: "analytics", label: "Analytics" }],
  },
  {
    slug: "support-insights",
    name: "Support insights",
    blurb:
      "Reporting view where each metric owns its chart, and empty periods say so instead of drawing a flat line that reads as zero.",
    pages: [{ id: "reporting", label: "Reporting" }],
  },
  {
    slug: "finance-overview",
    name: "Finance overview",
    blurb:
      "Spend dashboard where the actual-spend line stops at today and the budget continues as a dashed guide, so the gap is the story.",
    pages: [
      { id: "dashboard", label: "Dashboard" },
      { id: "accounts", label: "Accounts" },
    ],
  },
  {
    slug: "modeling-home",
    name: "Modelling home",
    blurb:
      "Plain spreadsheet-tool chrome where each wizard card shows a clipped screenshot of the tool it opens, bleeding past the card edge.",
    pages: [
      { id: "overview", label: "Overview" },
      { id: "data", label: "Data" },
      { id: "categories", label: "Categories" },
    ],
  },
  {
    slug: "social-scheduler",
    name: "Social scheduler",
    blurb:
      "Borderless consumer surface: mint CTA, grey card fills and progress rings, with a brand-new account’s honestly small counts.",
    pages: [
      { id: "home", label: "Home" },
      { id: "publish", label: "Publish" },
      { id: "community", label: "Community" },
    ],
  },
  {
    slug: "market-terminal",
    name: "Market terminal",
    blurb:
      "Charcoal investing terminal: dense filing tables, a dotted plot grid, and trade direction carried by a one-letter badge so rows stay on one line.",
    pages: [{ id: "insider", label: "Insider" }],
  },
  {
    slug: "event-analytics",
    name: "Event analytics",
    blurb:
      "True-black event report where the capacity and check-in meters stay honestly near-empty, because the event has not happened yet.",
    pages: [
      { id: "analytics", label: "Analytics" },
      { id: "rsvps", label: "RSVPs" },
      { id: "tracking", label: "Tracking links" },
    ],
  },
  {
    slug: "community-traffic",
    name: "Community traffic",
    blurb:
      "Older admin surface with a fully ruled plot box and a rotated axis title, and an orange brand that never touches the blue links.",
    pages: [{ id: "traffic", label: "Traffic stats" }],
  },
  {
    slug: "goal-tracker",
    name: "Goal tracker",
    blurb:
      "Goal detail where the filled wedge is the target ramp and the single dot is the only real reading, so an untouched goal reads as untouched.",
    pages: [{ id: "goal", label: "Goal" }],
  },
  {
    slug: "platform-reports",
    name: "Platform reports",
    blurb:
      "Charcoal backend report with two sidebars, monospace paths and method chips, and charts honest about a nearly empty window.",
    pages: [{ id: "api", label: "API" }],
  },
  {
    slug: "deploy-analytics",
    name: "Deploy analytics",
    blurb:
      "Hairline deployment analytics where the selected metric is marked by a rule under its cell and today\u2019s incomplete leg is dashed.",
    pages: [{ id: "analytics", label: "Analytics" }],
  },
  {
    slug: "token-usage",
    name: "Token usage",
    blurb:
      "Slate-only instrumentation for model spend, where days with no calls stay plotted as zero rather than being compressed away.",
    pages: [{ id: "models", label: "Models" }],
  },
  {
    slug: "crm-workspace",
    name: "CRM workspace",
    blurb:
      "Dense hairline-ruled record system: the same companies read as a table, a pipeline board, a detail page and a rollup.",
    pages: [
      { id: "companies", label: "Companies" },
      { id: "board", label: "Board" },
      { id: "record", label: "Record" },
      { id: "dashboard", label: "Dashboard" },
    ],
  },
  {
    slug: "discovery-feed",
    name: "Discovery feed",
    blurb:
      "Masonry gallery with almost no chrome, where the image carries the weight and metadata sits beneath.",
    pages: [{ id: "for-you", label: "For you" }],
  },
];
