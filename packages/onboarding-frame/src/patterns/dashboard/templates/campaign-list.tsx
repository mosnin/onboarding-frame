"use client";

import type { ReactNode } from "react";
import { Sparkline } from "../../../ui/charts";
import {
  BellIcon,
  BroadcastIcon,
  CalendarIcon,
  CaretDownIcon,
  ChatDotsIcon,
  CircleFillIcon,
  ClockIcon,
  EnvelopeIcon,
  GearIcon,
  ListChecksIcon,
  SearchIcon,
  SlidersIcon,
  SparkleIcon,
  ArrowsUpDownIcon,
  TableIcon,
  CaretFirstIcon,
  CaretLastIcon,
  CaretLeftIcon,
  CaretRightIcon,
  ChartBarIcon,
  CirclesThreeIcon,
  CubeIcon,
  DatabaseIcon,
  GridFourIcon,
  InfoIcon,
  MegaphoneIcon,
  PulseIcon,
  TargetIcon,
  TerminalIcon,
  UserIcon,
} from "../../../ui/icons-solid";
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
  { id: "dashboard", label: "Dashboard", Icon: GridFourIcon },
  { id: "analysis", label: "Analysis", Icon: ChartBarIcon },
  { id: "campaigns", label: "Campaigns", Icon: TargetIcon },
  { id: "broadcasts", label: "Broadcasts", Icon: BroadcastIcon },
  { id: "transactional", label: "Transactional", Icon: TerminalIcon },
  { id: "deliveries", label: "Deliveries & Drafts", Icon: MegaphoneIcon },
];

const DATA_NAV = [
  { id: "people", label: "People", Icon: UserIcon },
  { id: "objects", label: "Custom Objects", Icon: CubeIcon },
  { id: "segments", label: "Segments", Icon: CirclesThreeIcon },
  { id: "logs", label: "Activity Logs", Icon: PulseIcon },
  { id: "data", label: "Data & Integrations", Icon: DatabaseIcon, caret: true },
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
        <span className="h-[5px] shrink-0 bg-[#f6821f]" />

        <div className="flex min-h-[0px] flex-1">
          <Sidebar width={53} bg="var(--ob-surface)" className="items-center">
            <span
              aria-hidden
              className="mt-[13px] grid size-[31px] place-items-center rounded-[var(--ob-radius)] bg-[color-mix(in_oklab,#3ecf8e_20%,transparent)] text-[0.863rem]"
            >
              ⌘
            </span>
            <span
              aria-hidden
              className="mt-[9px] grid size-[31px] place-items-center text-[0.863rem] text-[color:var(--ob-muted)]"
            >
              <SparkleIcon size={14} />
            </span>
          </Sidebar>

          <Sidebar width={224} bg="var(--ob-surface)">
            <div className="flex items-center gap-[9px] px-[16px] pb-[13px] pt-[16px]">
              <h2 className="flex-1 text-[1.02rem] font-bold">Journeys</h2>
              <span aria-hidden className="text-[color:var(--ob-muted)]">
                «
              </span>
            </div>

            <nav className="grid gap-[2px] px-[9px]">
              {NAV.map((item) => (
                <NavItem
                  key={item.id}
                  label={item.label}
                  glyph={<item.Icon size={15} />}
                  active={item.id === page}
                  className="text-[0.8rem]"
                />
              ))}
            </nav>

            <div className="mx-[16px] my-[13px] border-t border-[color:var(--ob-border)]" />

            <nav className="grid gap-[2px] px-[9px]">
              {DATA_NAV.map((item) => (
                <NavItem
                  key={item.id}
                  label={item.label}
                  glyph={<item.Icon size={15} />}
                  trailing={
                    item.caret ? (
                      <span aria-hidden className="text-[0.549rem] opacity-50">
                        <CaretDownIcon size={10} />
                      </span>
                    ) : undefined
                  }
                  className="text-[0.8rem]"
                />
              ))}
            </nav>

            <div className="mx-[16px] my-[13px] border-t border-[color:var(--ob-border)]" />

            <nav className="grid gap-[2px] px-[9px]">
              <NavItem
                label="Content"
                glyph={<ChartBarIcon size={15} />}
                trailing={
                  <span aria-hidden className="text-[0.549rem] opacity-50">
                    <CaretDownIcon size={10} />
                  </span>
                }
                className="text-[0.8rem]"
              />
            </nav>
          </Sidebar>

          <Main className="overflow-auto">
            <header className="flex h-[55px] shrink-0 items-center gap-[13px] bg-[#16232a] px-[19px] text-white">
              <span className="flex items-center gap-[8px] text-[0.824rem]">
                acme.com production
                <span aria-hidden className="text-[0.549rem] opacity-60">
                  <ArrowsUpDownIcon size={12} />
                </span>
              </span>
              <span className="ml-auto flex items-center gap-[16px] text-[0.8rem]">
                <span className="flex items-center gap-[6px]">
                  <span aria-hidden>?</span> Need help?
                </span>
                <span className="relative" aria-hidden>
                  <BellIcon size={15} />
                  <span className="absolute -right-[2px] -top-[2px] size-[6px] rounded-full bg-[#3ecf8e]" />
                </span>
                <ChatDotsIcon size={15} />
                <GearIcon size={15} />
                <UserIcon size={15} />
              </span>
            </header>

            <div className="px-[25px] py-[19px]">
              <div className="flex items-center gap-[13px]">
                <h1 className="flex-1 text-[1.569rem] font-bold tracking-[-0.01em]">
                  Campaigns
                </h1>
                <span className="rounded-[var(--ob-radius)] bg-[color:var(--ob-cta-bg)] px-[16px] py-[9px] text-[0.824rem] font-semibold text-white">
                  Create Campaign
                </span>
              </div>

              <div className="grid gap-[16px] pt-[16px] sm:grid-cols-2 xl:grid-cols-5">
                {FILTERS.map((filter) => (
                  <div key={filter.id}>
                    <p className="pb-[5px] text-[0.667rem] font-semibold uppercase tracking-wide text-[color:var(--ob-muted)]">
                      {filter.label}
                    </p>
                    <span className="flex items-center gap-[8px] rounded-[var(--ob-radius)] border border-[color:var(--ob-border-strong)] px-[11px] py-[8px] text-[0.784rem] text-[color:var(--ob-muted)]">
                      {filter.search && <SearchIcon size={13} />}
                      <span className="flex-1 truncate">{filter.control}</span>
                      {!filter.search && (
                        <span aria-hidden className="text-[0.549rem] opacity-60">
                          <CaretDownIcon size={10} />
                        </span>
                      )}
                    </span>
                  </div>
                ))}
              </div>

              <nav className="flex gap-[22px] border-b border-[color:var(--ob-border)] pt-[19px]">
                {[
                  { id: "active", label: "Active", count: "24", on: true },
                  { id: "archived", label: "Archived", count: "0" },
                ].map((tab) => (
                  <span
                    key={tab.id}
                    className={cn(
                      "-mb-px flex items-center gap-[8px] pb-[9px] text-[0.847rem]",
                      tab.on
                        ? "border-b-2 border-[color:var(--ob-brand)] font-semibold"
                        : "text-[color:var(--ob-fg-soft)]",
                    )}
                  >
                    {tab.label}
                    <span className="rounded bg-[color:var(--ob-surface-3)] px-[6px] py-[2px] text-[0.706rem] font-medium">
                      {tab.count}
                    </span>
                  </span>
                ))}
              </nav>

              <div className="flex flex-wrap items-center gap-[13px] py-[16px]">
                <h2 className="text-[0.941rem] font-bold">24 Campaigns</h2>
                <span className="flex items-center gap-[5px] text-[0.784rem] text-[color:var(--ob-muted)]">
                  Metric definitions <InfoDot />
                </span>
                <span className="flex items-center gap-[8px] rounded-[var(--ob-radius)] border border-[color:var(--ob-border-strong)] px-[11px] py-[6px] text-[0.784rem]">
                  <CalendarIcon size={13} /> Mar 11, 2024 - Apr 09, 2024
                </span>
                <span className="flex items-center gap-[19px] rounded-[var(--ob-radius)] border border-[color:var(--ob-border-strong)] px-[11px] py-[6px] text-[0.784rem]">
                  Delivered
                  <span aria-hidden className="text-[0.549rem] opacity-60">
                    <CaretDownIcon size={10} />
                  </span>
                </span>
                <span aria-hidden className="text-[color:var(--ob-fg-soft)]">
                  <ArrowsUpDownIcon size={12} />
                </span>
                <span
                  aria-hidden
                  className="grid size-[28px] place-items-center rounded-[var(--ob-radius)] border border-[color:var(--ob-border-strong)]"
                >
                  <TableIcon size={14} />
                </span>
                <span className="ml-auto text-[0.784rem]">
                  1 – 20 <span className="text-[color:var(--ob-muted)]">of 24</span>
                </span>
                <span className="flex items-center gap-[5px]">
                  {[CaretFirstIcon, CaretLeftIcon, CaretRightIcon, CaretLastIcon].map((Mark, i) => (
                    <span
                      key={i}
                      aria-hidden
                      className="grid size-[28px] place-items-center rounded-[var(--ob-radius)] border border-[color:var(--ob-border-strong)] text-[0.706rem]"
                    >
                      <Mark size={11} />
                    </span>
                  ))}
                </span>
              </div>

              <div className="overflow-x-auto rounded-[var(--ob-radius-lg)] border border-[color:var(--ob-border)]">
                <div className="grid min-w-[863px] grid-cols-[minmax(0,1.5fr)_150px_repeat(4,minmax(0,0.75fr))_70px] border-b border-[color:var(--ob-border)] px-[16px] py-[9px] text-[0.69rem] font-semibold uppercase tracking-wide">
                  <span className="inline-flex items-center gap-1">Name <CaretDownIcon size={10} /></span>
                  <span />
                  <span className="text-right text-[color:var(--ob-brand)]">
                    Delivered <CaretDownIcon size={10} />
                  </span>
                  <span className="text-right text-[color:var(--ob-muted)]" ><span className="inline-flex items-center justify-end gap-1">Opened <CaretDownIcon size={10} /></span></span>
                  <span className="text-right text-[color:var(--ob-muted)]" ><span className="inline-flex items-center justify-end gap-1">Clicked <CaretDownIcon size={10} /></span></span>
                  <span className="text-right text-[color:var(--ob-muted)]">
                    Converted <CaretDownIcon size={10} />
                  </span>
                  <span />
                </div>

                {CAMPAIGNS.map((campaign) => (
                  <div
                    key={campaign.id}
                    className="grid min-w-[863px] grid-cols-[minmax(0,1.5fr)_150px_repeat(4,minmax(0,0.75fr))_70px] items-start border-b border-[color:var(--ob-border)] px-[16px] py-[16px] last:border-b-0"
                  >
                    <div>
                      <p className="flex items-center gap-[9px]">
                        <span aria-hidden className="text-[color:var(--ob-muted)]">
                          <BellIcon size={15} />
                        </span>
                        <span className="text-[0.878rem] font-semibold text-[color:var(--ob-brand)]">
                          {campaign.name}
                        </span>
                        {campaign.note && (
                          <span
                            aria-hidden
                            className="grid size-[19px] place-items-center rounded-full bg-[color-mix(in_oklab,#e8c33d_35%,transparent)] text-[0.549rem]"
                          >
                            <SlidersIcon size={13} />
                          </span>
                        )}
                      </p>
                      <p className="flex items-center gap-[16px] pl-[25px] pt-[6px] text-[0.784rem] text-[color:var(--ob-fg-soft)]">
                        <span className="flex items-center gap-[5px] tabular-nums">
                          {campaign.emails} <EnvelopeIcon size={12} />
                        </span>
                        <span className="flex items-center gap-[5px] tabular-nums">
                          {campaign.timers} <ClockIcon size={12} />
                        </span>
                      </p>
                      {campaign.more && (
                        <p className="pl-[25px] pt-[6px] text-[0.784rem] font-medium text-[color:var(--ob-brand)] underline">
                          {campaign.more}
                        </p>
                      )}
                    </div>

                    <div className="pl-[13px] pt-[2px]">
                      <span className="rounded bg-[color-mix(in_oklab,#2f9e5f_16%,transparent)] px-[8px] py-[3px] text-[0.745rem] font-medium text-[#1f7a48]">
                        <CircleFillIcon size={8} /> Running
                      </span>
                    </div>

                    {[0, 1, 2, 3].map((index) => (
                      <div key={index} className="pl-[13px] text-right">
                        {campaign.hidden ? (
                          // Hidden by permission, not by loading.
                          <span
                            aria-label="Hidden"
                            className="ml-auto block h-[13px] w-[50px] rounded bg-[color:var(--ob-surface-3)] blur-[2px]"
                          />
                        ) : (
                          <span className="text-[0.824rem] tabular-nums">
                            {campaign.values?.[index]}
                          </span>
                        )}
                        <span className="mt-[9px] block">
                          <Sparkline
                            points={campaign.series[index]!}
                            color="#4a4ad6"
                            height={24}
                          />
                        </span>
                      </div>
                    ))}

                    <span
                      aria-hidden
                      className="ml-auto grid size-[28px] place-items-center rounded-[var(--ob-radius)] border border-[color:var(--ob-border-strong)]"
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

function InfoDot(): ReactNode {
  return (
    <span
      aria-hidden
      className="grid size-[13px] shrink-0 place-items-center rounded-full border border-[color:var(--ob-border-strong)] text-[0.486rem] font-normal normal-case"
    >
      <InfoIcon size={11} />
    </span>
  );
}
