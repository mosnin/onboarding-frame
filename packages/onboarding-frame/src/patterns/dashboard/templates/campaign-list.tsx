"use client";

import type { ReactNode } from "react";
import { Sparkline } from "../../../ui/charts";
import { cn } from "../../../lib/cn";
import { LogoSlot } from "../../../ui/placeholder";
import { Surface, campaignTokens } from "./tokens";
import { Main, NavItem, Shell, Sidebar } from "./chrome";
import type { TemplateProps } from "./props";

export type CampaignPage = "campaigns" | "broadcasts" | "analysis";

export interface CampaignListProps extends TemplateProps {
  page?: CampaignPage;
}

const NAV = [
  { id: "dashboard", label: "Dashboard", glyph: "◎" },
  { id: "analysis", label: "Analysis", glyph: "▥" },
  { id: "campaigns", label: "Campaigns", glyph: "⌾" },
  { id: "broadcasts", label: "Broadcasts", glyph: "📣" },
  { id: "transactional", label: "Transactional", glyph: "❯_" },
  { id: "deliveries", label: "Deliveries & Drafts", glyph: "▤" },
];

const DATA_NAV = [
  { id: "people", label: "People", glyph: "👤" },
  { id: "objects", label: "Custom Objects", glyph: "📦" },
  { id: "segments", label: "Segments", glyph: "◉" },
  { id: "logs", label: "Activity Logs", glyph: "◍" },
  { id: "data", label: "Data & Integrations", glyph: "⛁", caret: true },
];

const FILTERS = [
  { id: "name", label: "Filter by", control: "Filter by name or description…", search: true },
  { id: "trigger", label: "Triggered by", control: "All" },
  { id: "status", label: "Status", control: "Campaign state" },
  { id: "topic", label: "Topic", control: "Filter by topic" },
  { id: "tags", label: "Tags", control: "Filter by tags…" },
];

/**
 * Some rows come back with their metrics hidden — a real permission state in
 * this product, not a loading skeleton. They are drawn as blurred bars so a
 * reader can tell "you may not see this" from "this has not loaded yet".
 */
const CAMPAIGNS = [
  {
    id: "onboarding",
    name: "New Users Onboarding",
    emails: 5,
    timers: 5,
    hidden: true,
    series: [
      [6, 7, 6, 8, 7, 6, 5, 6, 4],
      [7, 6, 6, 5, 5, 4, 4, 3, 3],
      [3, 3, 4, 3, 3, 3, 3, 3, 3],
      [3, 5, 3, 6, 4, 7, 4, 6, 5],
    ],
  },
  {
    id: "referral",
    name: "Viral Referral Hooks",
    emails: 3,
    timers: 7,
    more: "Show 1 more",
    values: ["5.91k", "41.5%", "0.5%", "0.1%"],
    series: [
      [4, 9, 3, 7, 4, 8, 5, 7, 6],
      [8, 4, 9, 3, 7, 4, 6, 3, 5],
      [2, 2, 3, 2, 6, 2, 3, 2, 2],
      [2, 3, 2, 5, 2, 3, 2, 4, 2],
    ],
  },
  {
    id: "checkout",
    name: "Checkout Abandonment",
    emails: 3,
    timers: 4,
    values: ["5.91k", "45.6%", "0.9%", "3.2%"],
    series: [
      [3, 8, 4, 9, 5, 8, 6, 9, 7],
      [7, 4, 8, 5, 7, 4, 6, 5, 7],
      [4, 8, 5, 7, 4, 8, 5, 6, 4],
      [3, 5, 4, 6, 3, 5, 4, 5, 3],
    ],
  },
  {
    id: "upgrade",
    name: "Newly Upgraded - Pro Plan",
    emails: 2,
    timers: 1,
    note: true,
    values: ["2.03k", "50.2%", "0.5%", "0.0%"],
    series: [
      [4, 6, 3, 7, 4, 6, 5, 7, 5],
      [7, 6, 6, 5, 5, 4, 4, 4, 3],
      [3, 6, 4, 7, 4, 6, 5, 4, 3],
      // Zero converted: a flat line, not an absent one.
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
    ],
  },
  {
    id: "term",
    name: "Term Optimisation",
    emails: 15,
    timers: 15,
    hidden: true,
    series: [
      [4, 6, 5, 7, 6, 8, 6, 7, 6],
      [7, 6, 6, 5, 6, 5, 5, 4, 4],
      [1, 1, 8, 1, 1, 9, 1, 1, 1],
      [1, 1, 1, 1, 9, 1, 1, 1, 1],
    ],
  },
];

/**
 * Campaign list.
 *
 * Every row is two lines tall: the name and metric values on top, the step
 * counts and a sparkline per metric beneath. That second line is what turns a
 * list into a comparison — four trends across five campaigns without leaving
 * the table.
 */
export function CampaignListTemplate({ className, page = "campaigns" }: CampaignListProps) {
  return (
    <Surface tokens={campaignTokens} className={className}>
      <Shell className="flex-col">
        <span className="h-1.5 shrink-0 bg-[#f6821f]" />

        <div className="flex min-h-0 flex-1">
          <Sidebar width={68} bg="var(--ob-surface)" className="items-center">
            <span
              aria-hidden
              className="mt-4 grid size-10 place-items-center rounded-[var(--ob-radius)] bg-[color-mix(in_oklab,#3ecf8e_20%,transparent)] text-[1.1rem]"
            >
              ⌘
            </span>
            <span
              aria-hidden
              className="mt-3 grid size-10 place-items-center text-[1.1rem] text-[color:var(--ob-muted)]"
            >
              ✳
            </span>
          </Sidebar>

          <Sidebar width={285} bg="var(--ob-surface)">
            <div className="flex items-center gap-3 px-5 pb-4 pt-5">
              <h2 className="flex-1 text-[1.3rem] font-bold">Journeys</h2>
              <span aria-hidden className="text-[color:var(--ob-muted)]">
                «
              </span>
            </div>

            <nav className="grid gap-0.5 px-3">
              {NAV.map((item) => (
                <NavItem
                  key={item.id}
                  label={item.label}
                  glyph={item.glyph}
                  active={item.id === page}
                  className="text-[1.02rem]"
                />
              ))}
            </nav>

            <div className="mx-5 my-4 border-t border-[color:var(--ob-border)]" />

            <nav className="grid gap-0.5 px-3">
              {DATA_NAV.map((item) => (
                <NavItem
                  key={item.id}
                  label={item.label}
                  glyph={item.glyph}
                  trailing={
                    item.caret ? (
                      <span aria-hidden className="text-[0.7rem] opacity-50">
                        ⌄
                      </span>
                    ) : undefined
                  }
                  className="text-[1.02rem]"
                />
              ))}
            </nav>

            <div className="mx-5 my-4 border-t border-[color:var(--ob-border)]" />

            <nav className="grid gap-0.5 px-3">
              <NavItem
                label="Content"
                glyph="▦"
                trailing={
                  <span aria-hidden className="text-[0.7rem] opacity-50">
                    ⌄
                  </span>
                }
                className="text-[1.02rem]"
              />
            </nav>
          </Sidebar>

          <Main className="overflow-auto">
            <header className="flex h-[70px] shrink-0 items-center gap-4 bg-[#16232a] px-6 text-white">
              <span className="flex items-center gap-2.5 text-[1.05rem]">
                acme.com production
                <span aria-hidden className="text-[0.7rem] opacity-60">
                  ⇅
                </span>
              </span>
              <span className="ml-auto flex items-center gap-5 text-[1.02rem]">
                <span className="flex items-center gap-2">
                  <span aria-hidden>?</span> Need help?
                </span>
                <span className="relative" aria-hidden>
                  ⌾
                  <span className="absolute -right-0.5 -top-0.5 size-2 rounded-full bg-[#3ecf8e]" />
                </span>
                <span aria-hidden>💬</span>
                <span aria-hidden>⚙</span>
                <span aria-hidden>👤</span>
              </span>
            </header>

            <div className="px-8 py-6">
              <div className="flex items-center gap-4">
                <h1 className="flex-1 text-[2rem] font-bold tracking-[-0.01em]">
                  Campaigns
                </h1>
                <span className="rounded-[var(--ob-radius)] bg-[color:var(--ob-cta-bg)] px-5 py-3 text-[1.05rem] font-semibold text-white">
                  Create Campaign
                </span>
              </div>

              <div className="grid gap-5 pt-5 sm:grid-cols-2 xl:grid-cols-5">
                {FILTERS.map((filter) => (
                  <div key={filter.id}>
                    <p className="pb-1.5 text-[0.85rem] font-semibold uppercase tracking-wide text-[color:var(--ob-muted)]">
                      {filter.label}
                    </p>
                    <span className="flex items-center gap-2.5 rounded-[var(--ob-radius)] border border-[color:var(--ob-border-strong)] px-3.5 py-2.5 text-[1rem] text-[color:var(--ob-muted)]">
                      {filter.search && <span aria-hidden>⌕</span>}
                      <span className="flex-1 truncate">{filter.control}</span>
                      {!filter.search && (
                        <span aria-hidden className="text-[0.7rem] opacity-60">
                          ⌄
                        </span>
                      )}
                    </span>
                  </div>
                ))}
              </div>

              <nav className="flex gap-7 border-b border-[color:var(--ob-border)] pt-6">
                {[
                  { id: "active", label: "Active", count: "24", on: true },
                  { id: "archived", label: "Archived", count: "0" },
                ].map((tab) => (
                  <span
                    key={tab.id}
                    className={cn(
                      "-mb-px flex items-center gap-2.5 pb-3 text-[1.08rem]",
                      tab.on
                        ? "border-b-2 border-[color:var(--ob-brand)] font-semibold"
                        : "text-[color:var(--ob-fg-soft)]",
                    )}
                  >
                    {tab.label}
                    <span className="rounded bg-[color:var(--ob-surface-3)] px-2 py-0.5 text-[0.9rem] font-medium">
                      {tab.count}
                    </span>
                  </span>
                ))}
              </nav>

              <div className="flex flex-wrap items-center gap-4 py-5">
                <h2 className="text-[1.2rem] font-bold">24 Campaigns</h2>
                <span className="flex items-center gap-1.5 text-[1rem] text-[color:var(--ob-muted)]">
                  Metric definitions <InfoDot glyph="?" />
                </span>
                <span className="flex items-center gap-2.5 rounded-[var(--ob-radius)] border border-[color:var(--ob-border-strong)] px-3.5 py-2 text-[1rem]">
                  <span aria-hidden>🗓</span> Mar 11, 2024 - Apr 09, 2024
                </span>
                <span className="flex items-center gap-6 rounded-[var(--ob-radius)] border border-[color:var(--ob-border-strong)] px-3.5 py-2 text-[1rem]">
                  Delivered
                  <span aria-hidden className="text-[0.7rem] opacity-60">
                    ▾
                  </span>
                </span>
                <span aria-hidden className="text-[color:var(--ob-fg-soft)]">
                  ⇵
                </span>
                <span
                  aria-hidden
                  className="grid size-9 place-items-center rounded-[var(--ob-radius)] border border-[color:var(--ob-border-strong)]"
                >
                  ▥
                </span>
                <span className="ml-auto text-[1rem]">
                  1 – 20 <span className="text-[color:var(--ob-muted)]">of 24</span>
                </span>
                <span className="flex items-center gap-1.5">
                  {["|‹", "‹", "›", "›|"].map((glyph) => (
                    <span
                      key={glyph}
                      aria-hidden
                      className="grid size-9 place-items-center rounded-[var(--ob-radius)] border border-[color:var(--ob-border-strong)] text-[0.9rem]"
                    >
                      {glyph}
                    </span>
                  ))}
                </span>
              </div>

              <div className="overflow-x-auto rounded-[var(--ob-radius-lg)] border border-[color:var(--ob-border)]">
                <div className="grid min-w-[1100px] grid-cols-[minmax(0,1.5fr)_150px_repeat(4,minmax(0,0.75fr))_70px] border-b border-[color:var(--ob-border)] px-5 py-3 text-[0.88rem] font-semibold uppercase tracking-wide">
                  <span>Name ⌄</span>
                  <span />
                  <span className="text-right text-[color:var(--ob-brand)]">
                    Delivered ⌄
                  </span>
                  <span className="text-right text-[color:var(--ob-muted)]">Opened ⌄</span>
                  <span className="text-right text-[color:var(--ob-muted)]">Clicked ⌄</span>
                  <span className="text-right text-[color:var(--ob-muted)]">
                    Converted ⌄
                  </span>
                  <span />
                </div>

                {CAMPAIGNS.map((campaign) => (
                  <div
                    key={campaign.id}
                    className="grid min-w-[1100px] grid-cols-[minmax(0,1.5fr)_150px_repeat(4,minmax(0,0.75fr))_70px] items-start border-b border-[color:var(--ob-border)] px-5 py-5 last:border-b-0"
                  >
                    <div>
                      <p className="flex items-center gap-3">
                        <span aria-hidden className="text-[color:var(--ob-muted)]">
                          ⌾
                        </span>
                        <span className="text-[1.12rem] font-semibold text-[color:var(--ob-brand)]">
                          {campaign.name}
                        </span>
                        {campaign.note && (
                          <span
                            aria-hidden
                            className="grid size-6 place-items-center rounded-full bg-[color-mix(in_oklab,#e8c33d_35%,transparent)] text-[0.7rem]"
                          >
                            ▤
                          </span>
                        )}
                      </p>
                      <p className="flex items-center gap-5 pl-8 pt-2 text-[1rem] text-[color:var(--ob-fg-soft)]">
                        <span className="flex items-center gap-1.5 tabular-nums">
                          {campaign.emails} <span aria-hidden>✉</span>
                        </span>
                        <span className="flex items-center gap-1.5 tabular-nums">
                          {campaign.timers} <span aria-hidden>⏱</span>
                        </span>
                      </p>
                      {campaign.more && (
                        <p className="pl-8 pt-2 text-[1rem] font-medium text-[color:var(--ob-brand)] underline">
                          {campaign.more}
                        </p>
                      )}
                    </div>

                    <div className="pl-4 pt-0.5">
                      <span className="rounded bg-[color-mix(in_oklab,#2f9e5f_16%,transparent)] px-2.5 py-1 text-[0.95rem] font-medium text-[#1f7a48]">
                        ● Running
                      </span>
                    </div>

                    {[0, 1, 2, 3].map((index) => (
                      <div key={index} className="pl-4 text-right">
                        {campaign.hidden ? (
                          // Hidden by permission, not by loading.
                          <span
                            aria-label="Hidden"
                            className="ml-auto block h-4 w-16 rounded bg-[color:var(--ob-surface-3)] blur-[3px]"
                          />
                        ) : (
                          <span className="text-[1.05rem] tabular-nums">
                            {campaign.values?.[index]}
                          </span>
                        )}
                        <span className="mt-3 block">
                          <Sparkline
                            points={campaign.series[index]!}
                            color="#4a4ad6"
                            height={30}
                          />
                        </span>
                      </div>
                    ))}

                    <span
                      aria-hidden
                      className="ml-auto grid size-9 place-items-center rounded-[var(--ob-radius)] border border-[color:var(--ob-border-strong)]"
                    >
                      ···
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </Main>
        </div>
      </Shell>
    </Surface>
  );
}

function InfoDot({ glyph = "i" }: { glyph?: string }): ReactNode {
  return (
    <span
      aria-hidden
      className="grid size-[16px] shrink-0 place-items-center rounded-full border border-[color:var(--ob-border-strong)] text-[0.62rem] font-normal normal-case"
    >
      {glyph}
    </span>
  );
}
