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
export { ComplianceControlsTemplate } from "./compliance-controls";
export type { CompliancePage, ComplianceControlsProps } from "./compliance-controls";
export { ListingStatsTemplate } from "./listing-stats";
export type { ListingPage, ListingStatsProps } from "./listing-stats";
export { AudienceAnalyticsTemplate } from "./audience-analytics";
export type { AudiencePage, AudienceAnalyticsProps } from "./audience-analytics";
export { CapTableTemplate } from "./cap-table";
export type { CapTablePage, CapTableProps } from "./cap-table";
export { WalletHomeTemplate } from "./wallet-home";
export type { WalletPage, WalletHomeProps } from "./wallet-home";
export { WarehouseCostTemplate } from "./warehouse-cost";
export type { WarehousePage, WarehouseCostProps } from "./warehouse-cost";
export { WealthPortfolioTemplate } from "./wealth-portfolio";
export type { WealthPage, WealthPortfolioProps } from "./wealth-portfolio";
export { BillingBenchmarksTemplate } from "./billing-benchmarks";
export type { BenchmarkPage, BillingBenchmarksProps } from "./billing-benchmarks";
export { FreelanceAnalyticsTemplate } from "./freelance-analytics";
export type { FreelancePage, FreelanceAnalyticsProps } from "./freelance-analytics";
export { AuthConsoleTemplate } from "./auth-console";
export type { AuthPage, AuthConsoleProps } from "./auth-console";
export { UptimeMonitorTemplate } from "./uptime-monitor";
export type { UptimePage, UptimeMonitorProps } from "./uptime-monitor";
export { ZoneOverviewTemplate } from "./zone-overview";
export type { ZonePage, ZoneOverviewProps } from "./zone-overview";
export { AutomationAppsTemplate } from "./automation-apps";
export type { AutomationPage, AutomationAppsProps } from "./automation-apps";
export { PeopleAnalyticsTemplate } from "./people-analytics";
export type { PeoplePage, PeopleAnalyticsProps } from "./people-analytics";
export { CampaignListTemplate } from "./campaign-list";
export type { CampaignPage, CampaignListProps } from "./campaign-list";
export { ProductAnalyticsTemplate } from "./product-analytics";
export type { ProductPage, ProductAnalyticsProps } from "./product-analytics";
export { CreatorRevenueTemplate } from "./creator-revenue";
export type { CreatorPage, CreatorRevenueProps } from "./creator-revenue";
export { BankingLedgerTemplate } from "./banking-ledger";
export type { BankingPage, BankingLedgerProps } from "./banking-ledger";
export { EventConsoleTemplate } from "./event-console";
export type { ConsolePage, EventConsoleProps } from "./event-console";
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
    slug: "compliance-controls",
    name: "Compliance controls",
    blurb:
      "Two progress stories that disagree on purpose: 99% of controls pass their tests while only 4% have an owner, and the donut shows it.",
    pages: [{ id: "controls", label: "Controls" }],
  },
  {
    slug: "listing-stats",
    name: "Listing stats",
    blurb:
      "Marketplace seller stats with underlined small-caps labels and pill controls, where a new listing honestly reports \u201c--% YoY\u201d.",
    pages: [{ id: "traffic", label: "Shop traffic" }],
  },
  {
    slug: "audience-analytics",
    name: "Audience analytics",
    blurb:
      "Email audience growth where every zero day carries a dot, so a month with two sign-ups reads as data rather than a broken chart.",
    pages: [
      { id: "audience", label: "Audience" },
      { id: "dashboard", label: "Audience dashboard" },
    ],
  },
  {
    slug: "cap-table",
    name: "Cap table",
    blurb:
      "Equity summary that keeps unavailable instruments visible but disabled, with setup progress riding in the top bar as a ring.",
    pages: [{ id: "shareholders", label: "Shareholders" }],
  },
  {
    slug: "wallet-home",
    name: "Wallet home",
    blurb:
      "Consumer crypto home where a gradient border marks the identity strip, and an unranked wallet honestly reports \u201c# ---\u201d.",
    pages: [{ id: "trending", label: "Trending" }],
  },
  {
    slug: "warehouse-cost",
    name: "Warehouse cost",
    blurb:
      "Dense cloud-spend console whose insight list is seven green checks under a sentence saying nothing was found.",
    pages: [{ id: "account", label: "Account Overview" }],
  },
  {
    slug: "wealth-portfolio",
    name: "Wealth portfolio",
    blurb:
      "Warm off-white wealth app with monospace small-caps headers and a right-hand axis, on a portfolio funded yesterday.",
    pages: [{ id: "overview", label: "Overview" }],
  },
  {
    slug: "billing-benchmarks",
    name: "Billing benchmarks",
    blurb:
      "Peer-range bands rather than series, where a customer with no revenue lands 1st percentile on value and 99th on churn.",
    pages: [
      { id: "benchmarking", label: "Benchmarking" },
      { id: "overview", label: "Merchant overview" },
    ],
  },
  {
    slug: "freelance-analytics",
    name: "Freelance analytics",
    blurb:
      "Freelancer earnings where a zero series is drawn at mid-height rather than on the floor, so \u201cnothing yet\u201d does not read as a measured zero.",
    pages: [{ id: "analytics", label: "Analytics" }],
  },
  {
    slug: "auth-console",
    name: "Auth console",
    blurb:
      "Authentication dashboard whose environment badge hangs off the top edge, on the honest day-one counts of two users and one sign-in.",
    pages: [{ id: "home", label: "Home" }],
  },
  {
    slug: "uptime-monitor",
    name: "Uptime monitor",
    blurb:
      "Blue-grey dark monitor where status is a haloed dot and the region chart keeps its cold-start cliff instead of smoothing it away.",
    pages: [{ id: "monitor", label: "Monitor" }],
  },
  {
    slug: "zone-overview",
    name: "Zone overview",
    blurb:
      "Edge-network overview keeping orange as the mark and blue as every link, with flat-zero series that still carry per-point dots.",
    pages: [{ id: "overview", label: "Overview" }],
  },
  {
    slug: "automation-apps",
    name: "Automation apps",
    blurb:
      "Connected-apps page with an honestly empty usage bar and a footer left in the flow, because two rows do not fill a screen.",
    pages: [{ id: "apps", label: "My Apps" }],
  },
  {
    slug: "people-analytics",
    name: "People analytics",
    blurb:
      "HR insights at three employees, where every demographic row honestly reads \u201cNot specified\u201d rather than inventing a distribution.",
    pages: [{ id: "analytics", label: "Analytics" }],
  },
  {
    slug: "campaign-list",
    name: "Campaign list",
    blurb:
      "Two-line campaign rows pairing each metric with its own sparkline, and permission-hidden values blurred rather than faked.",
    pages: [{ id: "campaigns", label: "Campaigns" }],
  },
  {
    slug: "product-analytics",
    name: "Product analytics",
    blurb:
      "Analytics home with schematic board thumbnails instead of screenshots, and dotted tails separating projection from measurement.",
    pages: [{ id: "home", label: "Home" }],
  },
  {
    slug: "creator-revenue",
    name: "Creator revenue",
    blurb:
      "Creator dashboard that stacks a blocking two-factor notice above a promotional one, with a flip-clock milestone countdown.",
    pages: [{ id: "home", label: "Home" }],
  },
  {
    slug: "banking-ledger",
    name: "Banking ledger",
    blurb:
      "Business banking where direction is carried entirely by hue, and a failed charge keeps its struck-through zero instead of vanishing.",
    pages: [{ id: "transactions", label: "Transactions" }],
  },
  {
    slug: "event-console",
    name: "Event console",
    blurb:
      "True-black organiser console with a floating pill nav, an empty revenue track and four honest $0.00 orders for a free event.",
    pages: [{ id: "overview", label: "Overview" }],
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
