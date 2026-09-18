"use client";

import type { ReactNode } from "react";
import { LineChart } from "../../../ui/charts";
import {
  CaretRightIcon,
} from "../../../ui/icons-solid";
import { cn } from "../../../lib/cn";
import { AvatarSlot, LogoSlot, Placeholder, WordmarkSlot } from "../../../ui/placeholder";
import { Surface, modelingTokens } from "./tokens";
import { Main, NavItem, NavSection, SearchField, Shell, Sidebar } from "./chrome";
import type { TemplateProps } from "./props";
import {
  BookIcon,
  BoxIcon,
  ChatIcon,
  ChevronRight,
  Icon,
  SearchIcon,
  type IconName,
} from "../../../ui/icons";

export type ModelingPage = "overview" | "data" | "categories";

export interface ModelingHomeProps extends TemplateProps {
  page?: ModelingPage;
}

const NAV = [
  { id: "overview", label: "Overview", icon: "monitor" as IconName },
  { id: "data", label: "Data", icon: "database" as IconName },
  { id: "categories", label: "Categories", icon: "copy" as IconName },
];

const TEMPLATES = [
  {
    id: "saas-revenue",
    name: "SaaS Revenue Model",
    body: "This is a revenue model for a B2B SaaS company, driven by a mixture of inbound and outbound leads. Use it to forecast your revenue, and understand what kind of sales funnel you need to hit your revenue targets.",
  },
  {
    id: "headcount",
    name: "Detailed Headcount Model",
    body: "This is a bottom-up headcount model, with a roster of your current employees and your planned hires. Use it to understand the breakdown of your headcount and payroll costs by Department (Sales, Engineering, etc.) and plan your future hires.",
  },
  {
    id: "runway",
    name: "Cash Runway Model",
    body: "Start from your current bank balance and model burn against planned hiring and spend. Use it to see the month you run out of cash, and how much a raise or a hiring freeze moves that date.",
  },
];

/** Data sources and metrics vary per wizard, so each card names its own. */
const WIZARDS = [
  {
    id: "pnl",
    title: "P&L wizard",
    body: "See your P&L and cash balance, and forecast burn, runway, and revenue.",
    sources: ["Xero", "Quickbooks"],
    metric: { label: "Burn rate", value: "$33k" },
    row: { label: "Cashflow", value: "$70k" },
    points: [30, 31, 31.5, 32, 32.5, 33, 34, 35.5, 37],
  },
  {
    id: "headcount",
    title: "Headcount wizard",
    body: "See your payroll expenses per employee/team, and build your hiring plan.",
    sources: ["Bamboo HR", "Gusto"],
    metric: { label: "Headcount", value: "34" },
    row: { label: "Total staff", value: "23" },
    // Hiring is lumpy, so headcount steps rather than sloping.
    points: [23, 23, 23, 23, 28, 28, 28, 34, 34],
  },
];

/**
 * Spreadsheet modelling home.
 *
 * The distinguishing detail is the wizard cards: each one shows a *clipped*
 * screenshot of the tool it opens, bleeding past the card's bottom edge rather
 * than sitting neatly inside it. That crop is what makes the card read as a
 * window into real work, so it is reproduced with overflow rather than being
 * tidied into a contained thumbnail.
 */
export function ModelingHomeTemplate({
  className,
  page = "overview",
}: ModelingHomeProps) {
  return (
    <Surface tokens={modelingTokens} className={className}>
      <Shell>
        {/* Measured off the reference: 253px. */}
        <Sidebar width={253} bg="var(--ob-surface)">
          <div className="flex items-center gap-2 px-4 pb-3 pt-4">
            <LogoSlot size={22} label="" radius={11} />
            <WordmarkSlot width={78} height={13} label="" />
            <span className="ml-auto">
              <AvatarSlot size={24} />
            </span>
          </div>

          <div className="flex items-center gap-2 px-4 pb-4">
            <SearchField placeholder="Search" shortcut="⌘K" rounded="md" className="flex-1" />
            <button
              type="button"
              className="grid h-[34px] w-[34px] shrink-0 place-items-center rounded-[var(--ob-radius-sm)] border border-[color:var(--ob-border-strong)] text-[1.05rem] leading-none"
            >
              +
            </button>
          </div>

          <nav className="grid gap-0.5 px-2.5">
            {NAV.map((item) => (
              <NavItem
                key={item.id}
                label={item.label}
                glyph={<Icon name={item.icon} width={16} height={16} />}
                active={item.id === page}
              />
            ))}
          </nav>

          <NavSection label="Models" />
          <nav className="grid gap-0.5 px-2.5">
            <NavItem
              label="Getting started (Cloned)"
              glyph={<BoxIcon width={16} height={16} />}
            />
          </nav>

          <div className="mt-auto flex items-center gap-3 px-4 py-4 text-[0.85rem]">
            <span className="flex items-center gap-2 text-[color:var(--ob-fg-soft)]">
              <BookIcon width={16} height={16} /> Documentation
            </span>
            <span className="ml-auto flex items-center gap-1.5 rounded-full border border-[color:var(--ob-border-strong)] px-2.5 py-1 text-[0.82rem] font-medium">
              <ChatIcon width={15} height={15} className="text-[color:var(--ob-brand)]" /> Chat
            </span>
          </div>
        </Sidebar>

        <Main className="overflow-auto px-10 py-8">
          <div className="mx-auto w-full max-w-[1250px]">
            <p className="text-[0.95rem] text-[color:var(--ob-muted)]">18 August, 2023</p>
            <h1 className="pt-1 text-[2.1rem] font-bold tracking-[-0.02em]">
              Welcome to Acme, Jane!
            </h1>
            <div className="mt-7 border-t border-[color:var(--ob-border)]" />

            {page === "overview" && <Overview />}
            {page === "data" && <DataSources />}
            {page === "categories" && <Categories />}
          </div>
        </Main>
      </Shell>
    </Surface>
  );
}

function Overview() {
  return (
    <>
      <button
        type="button"
        className="mt-7 flex w-full items-center gap-4 rounded-[var(--ob-radius)] border border-[color:var(--ob-border)] bg-[color:var(--ob-surface)] px-5 py-4 text-left shadow-[var(--ob-shadow)]"
      >
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[color:var(--ob-surface2,var(--ob-surface-2))] text-[1.1rem]">
          +
        </span>
        <span className="flex-1">
          <span className="block text-[1.05rem] font-semibold">New model</span>
          <span className="block text-[0.92rem] text-[color:var(--ob-muted)]">
            Create a new model from scratch
          </span>
        </span>
        <CaretRightIcon size={14} />
      </button>

      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        {WIZARDS.map((wizard) => (
          <WizardCard key={wizard.id} wizard={wizard} />
        ))}
      </div>

      <div className="flex items-center gap-3 pb-4 pt-10">
        <h2 className="flex-1 text-[1.15rem] font-semibold">Templates</h2>
        <SearchIcon width={17} height={17} className="text-[color:var(--ob-muted)]" />
      </div>

      <div className="rounded-[var(--ob-radius)] border border-[color:var(--ob-border)] bg-[color:var(--ob-surface)]">
        {TEMPLATES.map((template, index) => (
          <article
            key={template.id}
            className={cn(
              "grid gap-6 p-6 sm:grid-cols-[340px_minmax(0,1fr)]",
              index > 0 && "border-t border-[color:var(--ob-border)]",
            )}
          >
            <Placeholder label="Template preview" height={170} radius={8} />
            <div>
              <h3 className="font-bold">{template.name}</h3>
              <p className="max-w-[62ch] pt-2 text-[0.95rem] leading-relaxed text-[color:var(--ob-fg-soft)]">
                {template.body}
              </p>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}

function WizardCard({ wizard }: { wizard: (typeof WIZARDS)[number] }) {
  return (
    <section className="relative h-[236px] overflow-hidden rounded-[var(--ob-radius)] border border-[color:var(--ob-border)] bg-[color:var(--ob-surface)]">
      <div className="flex items-center gap-3 px-6 pt-5">
        <h3 className="flex-1 text-[1.05rem] font-semibold">{wizard.title}</h3>
        <ChevronRight width={17} height={17} className="text-[color:var(--ob-muted)]" />
      </div>
      <p className="max-w-[46ch] px-6 pt-2 text-[0.92rem] leading-relaxed text-[color:var(--ob-muted)]">
        {wizard.body}
      </p>

      {/* The peek is clipped by the card, not fitted to it. */}
      <div className="absolute inset-x-6 top-[112px] grid grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] items-start">
        <div className="mt-8 rounded-[var(--ob-radius-sm)] border border-[color:var(--ob-border)] bg-[color:var(--ob-surface)] shadow-[0_6px_18px_rgba(16,24,40,0.07)]">
          {wizard.sources.map((source, index) => (
            <div
              key={source}
              className={cn(
                "flex items-center gap-2.5 px-3 py-2.5 text-[0.88rem] font-medium",
                index > 0 && "border-t border-[color:var(--ob-border)]",
              )}
            >
              <LogoSlot size={22} label="" radius={6} />
              {source}
            </div>
          ))}
        </div>

        <div className="rounded-[var(--ob-radius-sm)] border border-[color:var(--ob-border)] bg-[color:var(--ob-surface)] shadow-[0_6px_18px_rgba(16,24,40,0.07)]">
          <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] items-center gap-3 px-3.5 pb-2 pt-3">
            <div>
              <p className="text-[0.82rem] text-[color:var(--ob-muted)]">
                {wizard.metric.label}
              </p>
              <p className="text-[1.5rem] font-bold tracking-[-0.02em]">
                {wizard.metric.value}
              </p>
            </div>
            <MiniTrend points={wizard.points} />
          </div>
          <div className="flex border-t border-[color:var(--ob-border)] text-[0.85rem]">
            <span className="flex-1 px-3.5 py-2 text-[color:var(--ob-fg-soft)]">
              {wizard.row.label}
            </span>
            <span className="border-l border-[color:var(--ob-border)] px-3.5 py-2 font-medium tabular-nums">
              {wizard.row.value}
            </span>
            <span className="w-10 border-l border-[color:var(--ob-border)]" />
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * The peeked metric charts carry a dashed vertical rule at "today" — the
 * forecast boundary is the point of a modelling tool, so it is drawn rather
 * than implied.
 */
function MiniTrend({ points }: { points: number[] }) {
  return (
    <div className="relative">
      <LineChart
        series={[{ id: "trend", points, color: "#4f7cf7" }]}
        height={44}
        gridLines={0}
        className="[&_text]:hidden"
      />
      <span className="pointer-events-none absolute inset-y-0 left-[45%] border-l border-dashed border-[color:var(--ob-border-strong)]" />
    </div>
  );
}

function DataSources() {
  const rows = [
    { name: "Xero", kind: "Accounting", synced: "12 minutes ago", status: "Connected" },
    { name: "Quickbooks", kind: "Accounting", synced: "1 hour ago", status: "Connected" },
    { name: "Bamboo HR", kind: "People", synced: "Yesterday", status: "Connected" },
    { name: "Gusto", kind: "Payroll", synced: "—", status: "Not connected" },
    { name: "Stripe", kind: "Billing", synced: "—", status: "Not connected" },
  ];

  return (
    <>
      <p className="max-w-[60ch] pt-7 text-[0.95rem] text-[color:var(--ob-fg-soft)]">
        Models read from whatever is connected here. A source that has never synced
        shows no timestamp rather than a zero.
      </p>

      <div className="mt-5 overflow-hidden rounded-[var(--ob-radius)] border border-[color:var(--ob-border)]">
        <div className="grid grid-cols-[minmax(0,1.4fr)_120px_160px_140px] bg-[color:var(--ob-surface-2)] px-5 py-2.5 text-[0.78rem] font-semibold uppercase tracking-wide text-[color:var(--ob-muted)]">
          <span>Source</span>
          <span>Type</span>
          <span>Last synced</span>
          <span>Status</span>
        </div>
        {rows.map((row) => (
          <div
            key={row.name}
            className="grid grid-cols-[minmax(0,1.4fr)_120px_160px_140px] items-center border-t border-[color:var(--ob-border)] bg-[color:var(--ob-surface)] px-5 py-3 text-[0.9rem]"
          >
            <span className="flex items-center gap-2.5 font-medium">
              <LogoSlot size={24} label="" radius={6} />
              {row.name}
            </span>
            <span className="text-[color:var(--ob-fg-soft)]">{row.kind}</span>
            <span className="tabular-nums text-[color:var(--ob-muted)]">{row.synced}</span>
            <span
              className={cn(
                "font-medium",
                row.status === "Connected"
                  ? "text-[color:var(--ob-brand)]"
                  : "text-[color:var(--ob-muted)]",
              )}
            >
              {row.status}
            </span>
          </div>
        ))}
      </div>
    </>
  );
}

function Categories() {
  const groups: { heading: string; items: { label: string; mapped: ReactNode }[] }[] = [
    {
      heading: "Revenue",
      items: [
        { label: "Subscription", mapped: "4000 · Recurring revenue" },
        { label: "Services", mapped: "4100 · Professional services" },
        { label: "Other income", mapped: <em className="not-italic text-[color:var(--ob-muted)]">Unmapped</em> },
      ],
    },
    {
      heading: "Cost of revenue",
      items: [
        { label: "Hosting", mapped: "5000 · Infrastructure" },
        { label: "Payment fees", mapped: "5100 · Processing" },
      ],
    },
    {
      heading: "Operating expenses",
      items: [
        { label: "Payroll", mapped: "6000 · Salaries and wages" },
        { label: "Software", mapped: "6200 · Subscriptions" },
        { label: "Travel", mapped: <em className="not-italic text-[color:var(--ob-muted)]">Unmapped</em> },
      ],
    },
  ];

  return (
    <>
      <p className="max-w-[60ch] pt-7 text-[0.95rem] text-[color:var(--ob-fg-soft)]">
        Categories map ledger accounts onto model lines. Anything left unmapped is
        labelled as such, because a silently dropped account is what makes a forecast
        wrong.
      </p>

      <div className="mt-5 grid gap-4">
        {groups.map((group) => (
          <section
            key={group.heading}
            className="overflow-hidden rounded-[var(--ob-radius)] border border-[color:var(--ob-border)] bg-[color:var(--ob-surface)]"
          >
            <h3 className="border-b border-[color:var(--ob-border)] bg-[color:var(--ob-surface-2)] px-5 py-2.5 text-[0.85rem] font-semibold">
              {group.heading}
            </h3>
            {group.items.map((item, index) => (
              <div
                key={item.label}
                className={cn(
                  "grid grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] items-center px-5 py-3 text-[0.9rem]",
                  index > 0 && "border-t border-[color:var(--ob-border)]",
                )}
              >
                <span className="font-medium">{item.label}</span>
                <span className="text-[color:var(--ob-fg-soft)]">{item.mapped}</span>
              </div>
            ))}
          </section>
        ))}
      </div>
    </>
  );
}
