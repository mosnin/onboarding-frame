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
  type ApiConsolePage,
  type CrmPage,
} from "onboarding-frame";

/** Renders a template by slug, shared by the viewer and the shelf preview. */
export function TemplateBody({ slug, page }: { slug: string; page: string }) {
  switch (slug) {
    case "api-console":
      return <ApiConsoleTemplate page={page as ApiConsolePage} />;
    case "setup-checklist":
      return <SetupChecklistTemplate />;
    case "guided-setup":
      return <GuidedSetupTemplate />;
    case "assistant-home":
      return <AssistantHomeTemplate />;
    case "file-library":
      return <FileLibraryTemplate />;
    case "creative-studio":
      return <CreativeStudioTemplate />;
    case "guides-assistant":
      return <GuidesAssistantTemplate />;
    case "brand-studio":
      return <BrandStudioTemplate />;
    case "commerce-analytics":
      return <CommerceAnalyticsTemplate />;
    case "support-insights":
      return <SupportInsightsTemplate />;
    case "finance-overview":
      return <FinanceOverviewTemplate />;
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
