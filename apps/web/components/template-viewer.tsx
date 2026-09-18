"use client";

import { useState } from "react";
import {
  ApiConsoleTemplate,
  AssistantHomeTemplate,
  CreativeStudioTemplate,
  DiscoveryFeedTemplate,
  FileLibraryTemplate,
  GuidedSetupTemplate,
  GuidesAssistantTemplate,
  BrandStudioTemplate,
  CommerceAnalyticsTemplate,
  SupportInsightsTemplate,
  SetupChecklistTemplate,
  FinanceOverviewTemplate,
  CrmWorkspaceTemplate,
  ModelingHomeTemplate,
  SocialSchedulerTemplate,
  MarketTerminalTemplate,
  EventAnalyticsTemplate,
  CommunityTrafficTemplate,
  GoalTrackerTemplate,
  PlatformReportsTemplate,
  DeployAnalyticsTemplate,
  TokenUsageTemplate,
  ComplianceControlsTemplate,
  ListingStatsTemplate,
  AudienceAnalyticsTemplate,
  CapTableTemplate,
  WalletHomeTemplate,
  WarehouseCostTemplate,
  WealthPortfolioTemplate,
  BillingBenchmarksTemplate,
  FreelanceAnalyticsTemplate,
  AuthConsoleTemplate,
  UptimeMonitorTemplate,
  ZoneOverviewTemplate,
  AutomationAppsTemplate,
  PeopleAnalyticsTemplate,
  CampaignListTemplate,
  ProductAnalyticsTemplate,
  CreatorRevenueTemplate,
  BankingLedgerTemplate,
  EventConsoleTemplate,
  type ApiConsolePage,
  type CrmPage,
  type FinancePage,
  type ModelingPage,
  type SchedulerPage,
  type TerminalPage,
  type EventPage,
  type GuidesPage,
  type ChecklistPage,
  type CommunityPage,
  type GoalPage,
  type ReportsPage,
  type DeployPage,
  type UsagePage,
  type CompliancePage,
  type ListingPage,
  type AudiencePage,
  type CapTablePage,
  type WalletPage,
  type WarehousePage,
  type WealthPage,
  type BenchmarkPage,
  type FreelancePage,
  type AuthPage,
  type UptimePage,
  type ZonePage,
  type AutomationPage,
  type PeoplePage,
  type CampaignPage,
  type ProductPage,
  type CreatorPage,
  type BankingPage,
  type ConsolePage,
} from "onboarding-frame";

/** Renders a template by slug, shared by the viewer and the shelf preview. */
export function TemplateBody({ slug, page }: { slug: string; page: string }) {
  switch (slug) {
    case "api-console":
      return <ApiConsoleTemplate page={page as ApiConsolePage} />;
    case "setup-checklist":
      return <SetupChecklistTemplate page={page as ChecklistPage} />;
    case "guided-setup":
      return <GuidedSetupTemplate />;
    case "assistant-home":
      return <AssistantHomeTemplate />;
    case "file-library":
      return <FileLibraryTemplate />;
    case "creative-studio":
      return <CreativeStudioTemplate />;
    case "guides-assistant":
      return <GuidesAssistantTemplate page={page as GuidesPage} />;
    case "brand-studio":
      return <BrandStudioTemplate />;
    case "commerce-analytics":
      return <CommerceAnalyticsTemplate />;
    case "support-insights":
      return <SupportInsightsTemplate />;
    case "finance-overview":
      return <FinanceOverviewTemplate page={page as FinancePage} />;
    case "people-analytics":
      return <PeopleAnalyticsTemplate page={page as PeoplePage} />;
    case "campaign-list":
      return <CampaignListTemplate page={page as CampaignPage} />;
    case "product-analytics":
      return <ProductAnalyticsTemplate page={page as ProductPage} />;
    case "creator-revenue":
      return <CreatorRevenueTemplate page={page as CreatorPage} />;
    case "banking-ledger":
      return <BankingLedgerTemplate page={page as BankingPage} />;
    case "event-console":
      return <EventConsoleTemplate page={page as ConsolePage} />;
    case "freelance-analytics":
      return <FreelanceAnalyticsTemplate page={page as FreelancePage} />;
    case "auth-console":
      return <AuthConsoleTemplate page={page as AuthPage} />;
    case "uptime-monitor":
      return <UptimeMonitorTemplate page={page as UptimePage} />;
    case "zone-overview":
      return <ZoneOverviewTemplate page={page as ZonePage} />;
    case "automation-apps":
      return <AutomationAppsTemplate page={page as AutomationPage} />;
    case "wallet-home":
      return <WalletHomeTemplate page={page as WalletPage} />;
    case "warehouse-cost":
      return <WarehouseCostTemplate page={page as WarehousePage} />;
    case "wealth-portfolio":
      return <WealthPortfolioTemplate page={page as WealthPage} />;
    case "billing-benchmarks":
      return <BillingBenchmarksTemplate page={page as BenchmarkPage} />;
    case "compliance-controls":
      return <ComplianceControlsTemplate page={page as CompliancePage} />;
    case "listing-stats":
      return <ListingStatsTemplate page={page as ListingPage} />;
    case "audience-analytics":
      return <AudienceAnalyticsTemplate page={page as AudiencePage} />;
    case "cap-table":
      return <CapTableTemplate page={page as CapTablePage} />;
    case "community-traffic":
      return <CommunityTrafficTemplate page={page as CommunityPage} />;
    case "goal-tracker":
      return <GoalTrackerTemplate page={page as GoalPage} />;
    case "platform-reports":
      return <PlatformReportsTemplate page={page as ReportsPage} />;
    case "deploy-analytics":
      return <DeployAnalyticsTemplate page={page as DeployPage} />;
    case "token-usage":
      return <TokenUsageTemplate page={page as UsagePage} />;
    case "market-terminal":
      return <MarketTerminalTemplate page={page as TerminalPage} />;
    case "event-analytics":
      return <EventAnalyticsTemplate page={page as EventPage} />;
    case "modeling-home":
      return <ModelingHomeTemplate page={page as ModelingPage} />;
    case "social-scheduler":
      return <SocialSchedulerTemplate page={page as SchedulerPage} />;
    case "crm-workspace":
      return <CrmWorkspaceTemplate page={page as CrmPage} />;
    case "discovery-feed":
      return <DiscoveryFeedTemplate />;
    default:
      return null;
  }
}

export function TemplateViewer({
  slug,
  pages,
}: {
  slug: string;
  pages: { id: string; label: string }[];
}) {
  const [page, setPage] = useState(pages[0]?.id ?? "home");

  return (
    <div className="grid gap-4">
      {pages.length > 1 && (
        <div className="flex flex-wrap gap-2">
          {pages.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setPage(item.id)}
              className={`rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors ${
                page === item.id
                  ? "border-transparent bg-[color:var(--site-fg)] text-[color:var(--site-bg)]"
                  : "border-[color:var(--site-border)] text-[color:var(--site-muted)] hover:text-[color:var(--site-fg)]"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}

      {/* The template owns its own palette, so the frame stays neutral. */}
      <div className="overflow-hidden rounded-xl border border-[color:var(--site-border)]">
        <TemplateBody slug={slug} page={page} />
      </div>
    </div>
  );
}
