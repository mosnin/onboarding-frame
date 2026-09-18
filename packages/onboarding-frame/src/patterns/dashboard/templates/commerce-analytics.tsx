"use client";

import { BarList, Donut, LineChart, Sparkline } from "../../../ui/charts";
import {
  CaretRightIcon,
} from "../../../ui/icons-solid";
import { Avatar } from "../../../ui/avatar";
import { cn } from "../../../lib/cn";
import { Surface, commerceTokens } from "./tokens";
import { Btn, Card, Main, Select, Shell, Sidebar, TopBar } from "./chrome";
import type { TemplateProps } from "./props";
import {
  BarChartIcon,
  BellIcon,
  CalendarIcon,
  ChevronRight,
  FileIcon,
  Icon,
  MoreIcon,
  SearchIcon,
  SettingsIcon,
  Sparkle,
  SwapIcon,
  type IconName,
} from "../../../ui/icons";

const NAV: {
  id: string;
  label: string;
  icon: IconName;
  badge?: string;
  active?: boolean;
}[] = [
  { id: "home", label: "Home", icon: "home" },
  { id: "orders", label: "Orders", icon: "receipt", badge: "4" },
  { id: "products", label: "Products", icon: "tag" },
  { id: "customers", label: "Customers", icon: "user" },
  { id: "growth", label: "Growth", icon: "trendUp" },
  { id: "discounts", label: "Discounts", icon: "coins" },
  { id: "content", label: "Content", icon: "file" },
  { id: "markets", label: "Markets", icon: "globe" },
  { id: "finance", label: "Finance", icon: "bank" },
  { id: "analytics", label: "Analytics", icon: "barChart", active: true },
];

const SUB = ["Reports", "Live view"];

const CHANNELS: { id: string; label: string; icon: IconName }[] = [
  { id: "store", label: "Online store", icon: "store" },
  { id: "agent", label: "Agentic", icon: "sparkle" },
  { id: "pos", label: "Point of sale", icon: "creditCard" },
];

const KPIS = [
  { id: "gross", label: "Gross sales", value: "$1,009.40", spark: [0.1, 0.1, 0.1, 0.1, 0.9, 0.2, 0.1] },
  { id: "returning", label: "Returning customer rate", value: "66.66%", spark: [0.1, 0.1, 0.1, 0.2, 0.9, 0.3, 0.1] },
  { id: "fulfilled", label: "Orders fulfilled", value: "4", spark: [0.1, 0.1, 0.1, 0.1, 0.8, 0.2, 0.1] },
  { id: "orders", label: "Orders", value: "5", spark: [0.1, 0.1, 0.1, 0.2, 0.9, 0.2, 0.1] },
];

const BREAKDOWN = [
  { label: "Gross sales", value: "$1,009.40" },
  { label: "Discounts", value: "$0.00" },
  { label: "Returns", value: "-$182.20" },
  { label: "Net sales", value: "$827.20" },
  { label: "Shipping charges", value: "$0.00" },
  { label: "Return fees", value: "$0.00" },
  { label: "Taxes", value: "$0.00" },
  { label: "Total sales", value: "$827.20" },
];

const SPIKE = [0, 0, 0, 0, 0, 0, 0, 0, 0.05, 0.9, 0.2, 0, 0, 0];

/**
 * Commerce analytics.
 *
 * A near-black command bar over a light reporting body. Sales data here is
 * genuinely spiky — one busy day against a flat month — so the charts are
 * drawn from that shape rather than a smooth invented trend.
 */
export function CommerceAnalyticsTemplate({
  userName = "Alex Rivera",
  brandName = "Northshore",
  className,
}: TemplateProps) {
  return (
    <Surface tokens={commerceTokens}>
      <Shell className={cn("flex-col", className)}>
        <TopBar bg="#1a1a1a" border={false} className="text-white">
          <div className="flex items-center gap-2">
            <Avatar name={brandName} size={26} rounded={6} />
            <span className="font-bold">{brandName}</span>
            <span className="rounded border border-white/25 px-1.5 py-0.5 text-[0.7rem]">
              Spring &apos;26
            </span>
          </div>
          <div className="mx-auto hidden w-full max-w-[720px] items-center gap-2 rounded-[8px] bg-white/10 px-3 py-2 text-[0.88rem] text-white/60 md:flex">
            <SearchIcon width={16} height={16} />
            <span className="flex-1">Search</span>
            <kbd className="rounded border border-white/25 px-1.5 text-[0.68rem]">⌘K</kbd>
          </div>
          <div className="flex items-center gap-3 text-white/80">
            <button type="button" aria-label="Assistant">
              <Sparkle width={18} height={18} />
            </button>
            <button type="button" aria-label="Notifications">
              <BellIcon width={18} height={18} />
            </button>
            <span className="flex items-center gap-2 rounded-[8px] bg-white/10 px-2 py-1">
              <Avatar name={userName} size={22} />
              <span className="text-[0.86rem] text-white">Store admin</span>
            </span>
          </div>
        </TopBar>

        <div className="flex flex-1">
          <Sidebar width={244} bg="var(--ob-bg)" className="border-r-0">
            <nav className="grid gap-0.5 p-3">
              {NAV.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  aria-current={item.active ? "page" : undefined}
                  className={cn(
                    "flex items-center gap-[11px] rounded-[7px] px-[11px] py-[3px] text-left text-[0.83rem]",
                    item.active
                      ? "bg-[color:var(--ob-surface)] font-semibold [box-shadow:var(--ob-shadow)]"
                      : "text-[color:var(--ob-fg-soft)] hover:bg-[color:var(--ob-surface-3)]",
                  )}
                >
                  <Icon name={item.icon} width={16} height={16} className="shrink-0 opacity-70" />
                  <span className="flex-1">{item.label}</span>
                  {item.badge && (
                    <span className="rounded bg-[color:var(--ob-surface-3)] px-1.5 text-[0.72rem] font-semibold">
                      {item.badge}
                    </span>
                  )}
                </button>
              ))}
              {SUB.map((label) => (
                <button
                  key={label}
                  type="button"
                  className="rounded-[8px] py-1.5 pl-10 pr-3 text-left text-[0.88rem] text-[color:var(--ob-muted)] hover:bg-[color:var(--ob-surface-3)]"
                >
                  {label}
                </button>
              ))}
            </nav>

            <p className="flex items-center gap-1 px-6 pb-1 pt-4 text-[0.82rem] font-semibold text-[color:var(--ob-muted)]">
              Sales channels <CaretRightIcon size={14} />
            </p>
            <nav className="grid gap-0.5 px-3">
              {CHANNELS.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className="flex items-center gap-3 rounded-[8px] px-3 py-2 text-left text-[0.9rem] text-[color:var(--ob-fg-soft)] hover:bg-[color:var(--ob-surface-3)]"
                >
                  <Icon name={item.icon} width={16} height={16} className="shrink-0 opacity-70" />
                  {item.label}
                </button>
              ))}
            </nav>

            {/* The reference continues past the channels: an apps group, a
                forms row carrying an unread dot, and a list of recent
                assistant conversations. */}
            <button
              type="button"
              className="flex items-center gap-1.5 px-6 pb-1 pt-5 text-left text-[0.85rem] font-semibold text-[color:var(--ob-fg-soft)]"
            >
              Apps <ChevronRight width={13} height={13} className="opacity-60" />
            </button>
            <button
              type="button"
              className="flex items-center gap-3 px-6 py-2 text-left text-[0.9rem] text-[color:var(--ob-fg-soft)]"
            >
              <FileIcon width={17} height={17} className="opacity-70" />
              <span className="flex-1">Forms</span>
              <span className="size-1.5 rounded-full bg-[color:var(--ob-fg-soft)]" />
            </button>

            <button
              type="button"
              className="flex items-center gap-1.5 px-6 pb-1 pt-6 text-left text-[0.85rem] text-[color:var(--ob-fg-soft)]"
            >
              Sidekick conversations
              <ChevronRight width={13} height={13} className="opacity-60" />
            </button>
            <div className="grid gap-1.5 px-6 pt-1">
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className="truncate text-[0.9rem] text-[color:var(--ob-fg-soft)]"
                >
                  Understanding collections in …
                </span>
              ))}
            </div>

            <button
              type="button"
              className="mt-auto flex items-center gap-3 px-6 py-3 text-left text-[0.9rem] text-[color:var(--ob-fg-soft)]"
            >
              <SettingsIcon width={17} height={17} /> Settings
            </button>
          </Sidebar>

          <Main className="p-4 pl-0">
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="flex items-center gap-2 text-[1.4rem] font-extrabold tracking-tight">
                <BarChartIcon width={21} height={21} /> Analytics
              </h1>
              <span className="text-[0.88rem] text-[color:var(--ob-muted)]">
                Last refreshed: 8:55 PM
              </span>
              <div className="ml-auto flex items-center gap-2">
                <Btn tone="neutral" size="sm">
                  <MoreIcon width={16} height={16} />
                </Btn>
                <Select label="Try targets" />
                <Btn tone="dark" size="sm">New exploration</Btn>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              <Select label="Last 30 days" glyph={<CalendarIcon width={15} height={15} />} />
              <Select label="May 12 – Jun 11, 2026" glyph={<CalendarIcon width={15} height={15} />} />
              <Select label="USD $" glyph={<SwapIcon width={15} height={15} />} />
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              {KPIS.map((kpi) => (
                /*
                  The label takes the card's full width and the value sits on
                  the row beneath with the sparkline. Sharing one row with the
                  sparkline left too little for "Returning customer rate",
                  which then wrapped and pushed that card out of step with the
                  three beside it.
                */
                <Card key={kpi.id}>
                  <p className="text-[0.88rem] font-semibold underline decoration-dotted underline-offset-4">
                    {kpi.label}
                  </p>
                  <div className="mt-1.5 flex items-center gap-4">
                    <p className="flex-1 text-[1.3rem] font-extrabold tabular-nums">
                      {kpi.value} <span className="text-[color:var(--ob-muted)]">—</span>
                    </p>
                    <Sparkline points={kpi.spark} color="var(--ob-brand)" className="w-24" />
                  </div>
                </Card>
              ))}
            </div>

            <div className="mt-3 grid gap-3 xl:grid-cols-[1.7fr_1fr]">
              <Card>
                <p className="text-[0.92rem] font-semibold underline decoration-dotted underline-offset-4">
                  Total sales over time
                </p>
                <p className="mt-1.5 text-[1.6rem] font-extrabold tabular-nums">
                  $827.20 <span className="text-[color:var(--ob-muted)]">—</span>
                </p>
                <LineChart
                  className="mt-4"
                  height={210}
                  smooth
                  series={[
                    { id: "now", points: SPIKE.map((v) => v * 800), color: "var(--ob-brand)" },
                    {
                      id: "prev",
                      points: SPIKE.map(() => 2),
                      color: "color-mix(in oklab, var(--ob-brand) 35%, white)",
                    },
                  ]}
                  yLabels={["$800", "$600", "$400", "$200", "$0"]}
                  xLabels={["Jun 12", "Jun 18", "Jun 24", "Jun 30", "Jul 6"]}
                />
                <div className="mt-4 flex justify-center gap-6 text-[0.82rem]">
                  <span className="flex items-center gap-1.5">
                    <span className="size-2 rounded-full bg-[color:var(--ob-brand)]" />
                    Jun 12 – Jul 12, 2026
                  </span>
                  <span className="flex items-center gap-1.5 text-[color:var(--ob-muted)]">
                    <span className="size-2 rounded-full bg-[color-mix(in_oklab,var(--ob-brand)_35%,white)]" />
                    May 12 – Jun 11, 2026
                  </span>
                </div>
              </Card>

              <Card padded={false}>
                <p className="p-5 pb-3 text-[0.92rem] font-semibold underline decoration-dotted underline-offset-4">
                  Total sales breakdown
                </p>
                <ul>
                  {BREAKDOWN.map((row, i) => (
                    <li
                      key={row.label}
                      className={cn(
                        "flex items-center gap-3 px-5 py-2.5",
                        i % 2 === 1 && "bg-[color:var(--ob-surface-2)]",
                      )}
                    >
                      <span className="flex-1 text-[0.9rem] text-[color:var(--ob-brand)]">
                        {row.label}
                      </span>
                      <span className="font-semibold tabular-nums">{row.value}</span>
                      <span className="text-[color:var(--ob-muted)]">—</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </div>

            <div className="mt-3 grid gap-3 xl:grid-cols-3">
              <Card>
                <p className="text-[0.92rem] font-semibold underline decoration-dotted underline-offset-4">
                  Total sales by channel
                </p>
                <div className="mt-5 flex items-center gap-6">
                  <Donut
                    size={150}
                    thickness={26}
                    segments={[{ id: "draft", value: 827, color: "var(--ob-brand)" }]}
                    center={
                      <span className="text-[1.3rem] font-extrabold tabular-nums">$827</span>
                    }
                  />
                  <div className="text-[0.88rem]">
                    <p className="flex items-center gap-2">
                      <span className="size-2.5 rounded-sm bg-[color:var(--ob-brand)]" />
                      Draft orders
                    </p>
                    <p className="mt-1 font-semibold tabular-nums">$827 —</p>
                  </div>
                </div>
              </Card>

              <Card>
                <p className="text-[0.92rem] font-semibold underline decoration-dotted underline-offset-4">
                  Average order value over time
                </p>
                <p className="mt-1.5 text-[1.4rem] font-extrabold tabular-nums">
                  $201.84 <span className="text-[color:var(--ob-muted)]">—</span>
                </p>
                <LineChart
                  className="mt-3"
                  height={130}
                  smooth
                  series={[
                    { id: "aov", points: SPIKE.map((v) => v * 300), color: "var(--ob-brand)" },
                  ]}
                  yLabels={["$400", "$200", "$0"]}
                  xLabels={["Jun 12", "Jun 26", "Jul 10"]}
                />
              </Card>

              <Card>
                <p className="text-[0.92rem] font-semibold underline decoration-dotted underline-offset-4">
                  Total sales by product
                </p>
                <BarList
                  className="mt-4"
                  items={[
                    { id: "p1", label: "Berry preserve gift jar", value: 700, display: "$700" },
                    { id: "p2", label: "Dried thyme leaves — Mediterranean herb", value: 99, display: "$99" },
                    { id: "p3", label: "Crushed red pepper flakes", value: 20, display: "$20" },
                    { id: "p4", label: "Ground chilli powder", value: 8, display: "$8" },
                  ]}
                />
              </Card>
            </div>
          </Main>
        </div>
      </Shell>
    </Surface>
  );
}
