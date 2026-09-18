"use client";

import type { ReactNode } from "react";
import { LineChart } from "../../../ui/charts";
import { cn } from "../../../lib/cn";
import {
  ArrowDownRightIcon,
  ArrowUpRightIcon,
  AsteriskIcon,
  ChevronDown,
  ChevronRight,
  Cross,
  EqualIcon,
  EyeIcon,
  MoreIcon,
  Plus,
  SlidersIcon,
} from "../../../ui/icons";
import {
  ArrowClockwiseIcon,
  BankSolid,
  BookBookmarkIcon,
  ChartBarSolid,
  ChatSquareIcon,
  CircleDashedSolid,
  CreditCardSolid,
  GearIcon,
  NavigationSolid,
  RecurringSolid,
  SidebarBold,
  StackSolid,
} from "../../../ui/icons-solid";
import { Surface, financeTokens } from "./tokens";
import { Card, Main, Shell, Sidebar } from "./chrome";
import type { TemplateProps } from "./props";

/**
 * Personal finance overview, recreated from the Copilot Money reference.
 *
 * Two captures drive this file: the Dashboard and the Accounts page. They are
 * the same application at two moments, so the rail differs between them — the
 * account list and the footer's first row are not the same in both — and each
 * page reproduces its own capture rather than averaging the two.
 *
 * Measured at a 1512px render: rail 256, a 56px title bar with no rule under
 * it, 24px page padding, and two independent card columns 592 wide with a
 * 24px gutter. Cards are flat white with a single #eef1f0 hairline.
 *
 * Copilot lets people pick an emoji per category, and the reference prints
 * those emoji in the category list, the recurring rows and the category chips.
 * They are the product's own content, not decoration standing in for an icon —
 * every affordance here (rail, chevrons, deltas, gear) is Lucide.
 */

// Copilot draws its rail solid, so these are Phosphor at fill weight rather
// than Lucide outlines; "Categories" is the one bold outline in the set.
const NAV = [
  { id: "dashboard", label: "Dashboard", Icon: NavigationSolid },
  { id: "transactions", label: "Transactions", Icon: StackSolid },
  { id: "accounts", label: "Accounts", Icon: CreditCardSolid },
  { id: "investments", label: "Investments", Icon: ChartBarSolid },
  { id: "categories", label: "Categories", Icon: CircleDashedSolid },
  { id: "recurrings", label: "Recurrings", Icon: RecurringSolid },
];

/** The rail's account list, as each capture shows it. */
const RAIL_ACCOUNTS: Record<
  FinancePage,
  { heading: string; rows: RailRow[] }[]
> = {
  dashboard: [
    {
      heading: "Depository",
      rows: [{ label: "Savings", value: "$4,179", dot: "#f0883e" }],
    },
    {
      heading: "Investment",
      rows: [
        { label: "Bitcoin 1A1zP1…", value: "$6,666,147", dot: "#2f80ed" },
        { label: "Main Investm…", value: "$1,267,713", dot: "#2f80ed" },
      ],
    },
    {
      heading: "Loan",
      rows: [{ label: "SoFi Personal Loan", value: "$100", dot: "#eab308" }],
    },
    {
      heading: "Other",
      rows: [
        { label: "Cash", value: "$288", dot: "#14b8a6" },
        { label: "Manual account", value: "$0", dot: "#22c55e" },
      ],
    },
  ],
  accounts: [
    {
      heading: "Depository",
      rows: [{ label: "Savings", value: "$4,179", dot: "#f0883e" }],
    },
    {
      heading: "Investment",
      rows: [
        { label: "Main Investm…", value: "$1,305,500", dot: "#2f80ed" },
        { label: "Robinhood Inves…", value: "$13,828", dot: "#6b4fe8" },
      ],
    },
    {
      heading: "Loan",
      rows: [{ label: "SoFi Personal Loan", value: "$100", dot: "#eab308" }],
    },
    {
      heading: "Other",
      rows: [
        { label: "Cash", value: "$288", dot: "#14b8a6" },
        { label: "Manual account", value: "$0", dot: "#22c55e" },
      ],
    },
  ],
};

interface RailRow {
  label: string;
  value: string;
  dot: string;
}

const CATEGORIES = [
  {
    id: "housing",
    emoji: "🏠",
    label: "Housing",
    spent: "$2,880",
    limit: "$6,000",
    // Copilot splits the bar: solid for cleared spend, hollow for what is
    // still pending against the same budget.
    pct: 25,
    pendingPct: 48,
    over: false,
  },
  {
    id: "investments",
    emoji: "💰",
    label: "Investments",
    spent: "$1,193",
    limit: "$300",
    pct: 100,
    over: true,
  },
  {
    id: "date",
    emoji: "❤️",
    label: "Date",
    spent: "$310",
    limit: "$900",
    pct: 34,
    over: false,
  },
  {
    id: "education",
    emoji: "📖",
    label: "Education",
    spent: "$100",
    limit: "$900",
    pct: 11,
    over: false,
  },
  {
    id: "utilities",
    emoji: "📱",
    label: "Utilities",
    spent: "$97",
    limit: "$300",
    pct: 32,
    over: false,
  },
];

const CATEGORY_DOTS = ["#d81bff", "#a855f7", "#14b8a6", "#3b82f6", "#5b4fe9"];

const UPCOMING = [
  {
    when: "Today",
    emoji: "💰",
    label: "Buy Apple Stock (aapl)",
    tag: "Investments",
    chipBg: "#f6e6fe",
    chipFg: "#8a4ab1",
    amount: "$200.00",
  },
  {
    when: "Today",
    emoji: "🏠",
    label: "Rent Payment",
    tag: "Housing",
    chipBg: "#fde6ff",
    chipFg: "#9951a0",
    amount: "$1,350.00",
  },
  {
    when: "Jun 26th",
    emoji: "🏠",
    label: "Electricity Bill",
    tag: "Housing",
    chipBg: "#fde6ff",
    chipFg: "#9951a0",
    amount: "$40.00",
  },
  {
    when: "Jul 7th",
    emoji: "🛍️",
    label: "Grocery Shopping",
    tag: "Groceries",
    chipBg: "#fdf7e7",
    chipFg: "#c2a83c",
    amount: "$92.40",
  },
  {
    when: "Jul 7th",
    emoji: "🛍️",
    label: "Grocery Shopping",
    tag: "Groceries",
    chipBg: "#fdf7e7",
    chipFg: "#c2a83c",
    amount: "$92.40",
  },
];

const RANGES = ["1W", "1M", "3M", "YTD", "1Y", "ALL"];

export type FinancePage = "dashboard" | "accounts";

export interface FinanceOverviewProps extends TemplateProps {
  page?: FinancePage;
}

/** The range row carries no track — only the selected pill is filled. */
function RangeRow({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center justify-center gap-1", className)}>
      {RANGES.map((range) => (
        <button
          key={range}
          type="button"
          aria-pressed={range === "1W"}
          className={cn(
            "rounded-full px-3 py-1 text-[0.8rem] font-semibold tabular-nums",
            range === "1W"
              ? "bg-[#f0f1f2] text-[color:var(--ob-fg)]"
              : "text-[color:var(--ob-muted)]",
          )}
        >
          {range}
        </button>
      ))}
    </div>
  );
}

function CardHead({ title, link }: { title: string; link: string }) {
  return (
    <div className="flex items-center gap-3">
      <h2 className="flex-1 text-[0.94rem] font-medium">{title}</h2>
      <button
        type="button"
        className="flex items-center gap-0.5 text-[0.9rem] text-[color:var(--ob-muted)]"
      >
        {link}
        <ChevronRight size={16} />
      </button>
    </div>
  );
}

/**
 * Delta pill. Green reads as good and red as bad, which is not the same as up
 * and down: the reference's Debts figure rose 999% and is drawn red with an
 * *up* arrow, so the direction is stated separately from the tone.
 */
function Delta({
  value,
  tone,
  dir,
}: {
  value: string;
  tone: "up" | "down" | "flat";
  dir?: "up" | "down";
}) {
  const style =
    tone === "up"
      ? { background: "#e4f2e4", color: "#187b3c" }
      : tone === "down"
        ? { background: "#ffe6e5", color: "#c0392b" }
        : { background: "#f2f3f4", color: "#7c8493" };
  const heading = dir ?? (tone === "flat" ? "flat" : tone);
  const Mark =
    heading === "up"
      ? ArrowUpRightIcon
      : heading === "down"
        ? ArrowDownRightIcon
        : EqualIcon;
  return (
    <span
      className="inline-flex shrink-0 items-center gap-0.5 rounded-full px-2 py-[3px] text-[0.76rem] font-bold tabular-nums"
      style={style}
    >
      <Mark size={12} strokeWidth={2.5} />
      {value}
    </span>
  );
}

export function FinanceOverviewTemplate({
  className,
  page = "dashboard",
}: FinanceOverviewProps) {
  // Previews elsewhere in the catalogue ask for a generic "home" page, so an
  // unknown name falls back to the dashboard rather than indexing to nothing.
  const view: FinancePage = page === "accounts" ? "accounts" : "dashboard";
  return (
    <Surface tokens={financeTokens}>
      <Shell className={cn(className)}>
        <Sidebar width={256} bg="var(--ob-surface)">
          <div className="flex items-center px-3 pb-2 pt-3">
            <button
              type="button"
              aria-label="Collapse sidebar"
              className="grid size-[30px] place-items-center rounded-[10px] bg-[#f6f6f6] text-[color:var(--ob-fg)]"
            >
              <SidebarBold size={19} />
            </button>
            <button
              type="button"
              aria-label="Refresh"
              className="ml-auto mr-2 text-[color:var(--ob-muted)]"
            >
              <ArrowClockwiseIcon size={18} />
            </button>
          </div>

          <nav className="grid gap-1.5 px-3 pt-1.5">
            {NAV.map((item) => {
              const active = item.id === view;
              return (
                <button
                  key={item.id}
                  type="button"
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "flex h-[30px] items-center gap-2 rounded-[9px] px-2.5 text-left text-[1rem]",
                    active
                      ? "bg-[#f0f5ff] font-medium text-[#3f7eed]"
                      : "text-[color:var(--ob-muted)]",
                  )}
                >
                  <item.Icon size={18} className="shrink-0" />
                  {item.label}
                </button>
              );
            })}
          </nav>

          <div className="mt-[18px] border-t border-[color:var(--ob-border)] pt-[18px]">
            <div className="grid gap-[18px] px-3">
              {RAIL_ACCOUNTS[view].map((group) => (
                <div key={group.heading} className="min-w-0">
                  <button
                    type="button"
                    className="flex w-full items-center gap-1 px-2.5 pb-1 text-left text-[0.88rem] font-semibold text-[color:var(--ob-muted)]"
                  >
                    <ChevronDown
                      size={13}
                      strokeWidth={2.4}
                      className="shrink-0"
                    />
                    {group.heading}
                  </button>
                  {group.rows.map((row) => (
                    <div
                      key={row.label}
                      className="flex h-8 items-center gap-4 rounded-[9px] px-2.5 text-[1rem]"
                    >
                      <span
                        aria-hidden
                        className="size-2 shrink-0 rounded-full"
                        style={{ background: row.dot }}
                      />
                      <span className="min-w-0 flex-1 truncate">
                        {row.label}
                      </span>
                      <span className="shrink-0 text-[0.88rem] tabular-nums text-[color:var(--ob-muted)]">
                        {row.value}
                      </span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-auto grid gap-1.5 px-3 pb-2">
            {view === "accounts" ? (
              <FooterItem Icon={BookBookmarkIcon} label="Explore" />
            ) : (
              <FooterItem
                Icon={BookBookmarkIcon}
                label="Start here"
                tone="#d99a26"
              />
            )}
            <FooterItem Icon={ChatSquareIcon} label="Get Help" />
            <FooterItem
              Icon={GearIcon}
              label="Settings"
              trailing={
                <span className="grid size-[18px] place-items-center rounded-full bg-[#2f80ed] text-[0.65rem] font-bold text-white">
                  !
                </span>
              }
            />
          </div>
        </Sidebar>

        <Main>
          <header className="flex h-14 shrink-0 items-center px-6">
            <h1 className="flex-1 text-[0.94rem] font-medium">
              {view === "accounts" ? "Accounts" : "Dashboard"}
            </h1>
            {view === "accounts" && (
              <button
                type="button"
                aria-label="Add account"
                className="text-[color:var(--ob-muted)]"
              >
                <Plus size={20} strokeWidth={1.8} />
              </button>
            )}
          </header>

          {view === "accounts" ? <AccountsPage /> : <DashboardPage />}
        </Main>

        {view === "accounts" && <AccountDetail />}
      </Shell>
    </Surface>
  );
}

function FooterItem({
  Icon,
  label,
  tone,
  trailing,
}: {
  Icon: typeof BookBookmarkIcon;
  label: string;
  tone?: string;
  trailing?: ReactNode;
}) {
  return (
    <button
      type="button"
      className="flex h-[30px] items-center gap-2 rounded-[9px] px-2.5 text-left text-[1rem]"
      style={{ color: tone ?? "var(--ob-muted)" }}
    >
      <Icon size={18} className="shrink-0" />
      <span className="flex-1">{label}</span>
      {trailing}
    </button>
  );
}

/* ------------------------------ Dashboard ------------------------------ */

function DashboardPage() {
  return (
    // Two independent stacks, not a grid: the reference's right column runs a
    // card longer than the left and the rows do not line up below the first.
    <div className="grid gap-4 p-4 sm:gap-6 sm:p-6 lg:grid-cols-2 lg:items-start">
      <div className="grid min-w-0 gap-4 sm:gap-6">
        <Card className="min-w-0 p-6">
          <CardHead title="Monthly spending" link="Transactions" />
          <div className="pt-[44px] text-center">
            <p className="text-[1.5rem] font-[550] leading-none tracking-tight tabular-nums">
              $4,465 left
            </p>
            <p className="pt-1.5 text-[0.94rem] text-[color:var(--ob-muted)]">
              $9,300 budgeted
            </p>
          </div>

          <div className="relative pt-7">
            {/*
              The budget pace is a straight dotted guide across the whole month;
              actual spend is the solid line, which stops at today — three of the
              twelve steps are still ahead, so it ends about 73% across.
            */}
            <LineChart
              height={131}
              gridLines={0}
              min={0}
              max={100}
              series={[
                {
                  id: "budget",
                  points: [32, 38, 44, 50, 56, 62, 68, 75, 81, 87, 93, 100],
                  color: "#e3e5e4",
                  dashedFrom: 0,
                },
                {
                  id: "actual",
                  points: [11, 12, 13, 14, 15, 16, 18, 20, 24],
                  color: "#0ccc4f",
                  endDot: true,
                },
              ]}
            />
            <span className="absolute left-[52%] top-[52%] whitespace-nowrap rounded-[7px] bg-[#0ccc4f] px-2 py-[3px] text-[0.76rem] font-bold text-white sm:left-[76%]">
              $6,674 under
            </span>
          </div>
        </Card>

        <Card className="min-w-0 p-6">
          <CardHead title="Transactions to review" link="View all" />
          <div className="grid justify-items-center pt-4">
            <ReviewedBurst />
            <p className="pt-2.5 text-[0.94rem] text-[color:var(--ob-muted)]">
              You&apos;ve reviewed 30 transactions
            </p>
          </div>
        </Card>
      </div>

      <div className="grid min-w-0 gap-4 sm:gap-6">
        <Card className="min-w-0 overflow-hidden p-6">
          <CardHead title="Net worth" link="Accounts" />
          <div className="flex justify-center pt-[22px] text-center">
            {[
              { label: "Assets", value: "$7,938,327", tone: "up" as const },
              { label: "Debts", value: "$100", tone: "down" as const },
            ].map((stat) => (
              <div key={stat.label} className="w-[188px] max-w-[50%]">
                <p className="text-[0.94rem] text-[color:var(--ob-muted)]">
                  {stat.label}
                </p>
                <p className="pt-1 text-[1.5rem] font-[550] leading-none tracking-tight">
                  {stat.value}
                </p>
                <span className="inline-flex pt-2.5">
                  <Delta value="999%" tone={stat.tone} dir="up" />
                </span>
              </div>
            ))}
          </div>

          {/* The chart runs out to the card's left edge, not to its padding. */}
          <div className="-ml-6 pt-2.5">
            <LineChart
              height={94}
              smooth
              gridLines={0}
              series={[
                {
                  id: "net",
                  points: [16, 17, 22, 22, 22, 22, 22, 22, 23, 24, 70, 92, 92],
                  color: "#0ccc4f",
                  area: true,
                  dashedFrom: 11,
                  endDot: true,
                },
              ]}
            />
          </div>

          <RangeRow className="pt-[18px]" />
        </Card>

        <Card className="min-w-0 p-6">
          <CardHead title="Top categories" link="View all" />
          <div className="-mx-6 overflow-x-auto px-6">
            <ul className="min-w-[480px] pt-[22px]">
              {CATEGORIES.map((category, i) => (
                <li key={category.id} className="flex h-8 items-center gap-3">
                  <span
                    aria-hidden
                    className="size-1.5 shrink-0 rounded-full"
                    style={{ background: CATEGORY_DOTS[i] }}
                  />
                  <span
                    aria-hidden
                    className="w-[18px] shrink-0 text-[1rem] leading-none"
                  >
                    {category.emoji}
                  </span>
                  <span className="min-w-0 flex-1 truncate text-[0.94rem]">
                    {category.label}
                  </span>
                  <span className="shrink-0 text-[0.94rem] font-medium tabular-nums">
                    {category.spent}
                  </span>
                  <span className="relative h-1.5 w-[128px] shrink-0 overflow-hidden rounded-full bg-[#f6f6f6]">
                    {category.pendingPct !== undefined && (
                      <span
                        className="absolute inset-y-0 left-0 rounded-full border border-[#0ccc4f]"
                        style={{ width: `${category.pendingPct}%` }}
                      />
                    )}
                    <span
                      className="absolute inset-y-0 left-0 rounded-full"
                      style={{
                        width: `${category.pct}%`,
                        background: category.over ? "#f4553d" : "#0ccc4f",
                      }}
                    />
                  </span>
                  <span className="w-[66px] shrink-0 text-[0.94rem] font-medium tabular-nums">
                    {category.limit}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </Card>

        <Card className="min-w-0 p-6">
          <CardHead title="Next two weeks" link="Recurrings" />
          <div className="-mx-6 overflow-x-auto px-6">
            <ul className="min-w-[500px] pt-3">
              {UPCOMING.map((row, i) => (
                <li key={i} className="flex h-8 items-center gap-3">
                  <span className="w-[76px] shrink-0 text-[0.94rem] text-[color:var(--ob-muted)]">
                    {row.when}
                  </span>
                  <span
                    aria-hidden
                    className="w-[18px] shrink-0 text-[1rem] leading-none"
                  >
                    {row.emoji}
                  </span>
                  <span className="min-w-0 flex-1 truncate text-[0.94rem]">
                    {row.label}
                  </span>
                  <span
                    className="inline-flex shrink-0 items-center gap-1 rounded-full px-2 py-[3px] text-[0.68rem] font-bold uppercase tracking-wide"
                    style={{ background: row.chipBg, color: row.chipFg }}
                  >
                    <span aria-hidden className="text-[0.72rem] leading-none">
                      {row.emoji}
                    </span>
                    {row.tag}
                  </span>
                  <span className="w-[86px] shrink-0 text-right text-[0.94rem] font-medium tabular-nums">
                    {row.amount}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </Card>
      </div>
    </div>
  );
}

/**
 * The reviewed-everything state: a soft scatter of dots around a ringed mark.
 * No icon set ships this, so it is drawn — the mark inside it is Lucide.
 */
function ReviewedBurst() {
  const COUNT = 260;
  const dots = Array.from({ length: COUNT }, (_, i) => {
    // A deterministic scatter: a golden-angle spiral reads as random but never
    // shifts between renders, so screenshots stay comparable.
    const angle = i * 2.399963;
    const radius = 10 + Math.sqrt(i / COUNT) * 112;
    return {
      x: 120 + Math.cos(angle) * radius * 1.6,
      y: 60 + Math.sin(angle) * radius * 0.64,
      o: Math.max(0.06, 0.6 - (radius / 122) * 0.54),
    };
  });
  return (
    <div className="relative grid h-[92px] w-full max-w-[420px] place-items-center">
      <svg
        viewBox="0 0 240 120"
        className="absolute inset-0 h-full w-full"
        aria-hidden
      >
        <defs>
          <radialGradient id="reviewed-glow">
            <stop offset="0%" stopColor="#5b8def" stopOpacity="0.16" />
            <stop offset="100%" stopColor="#5b8def" stopOpacity="0" />
          </radialGradient>
        </defs>
        <ellipse cx={120} cy={60} rx={70} ry={44} fill="url(#reviewed-glow)" />
        {dots.map((d, i) => (
          <circle
            key={i}
            cx={d.x}
            cy={d.y}
            r={1.05}
            fill="#5b8def"
            opacity={d.o}
          />
        ))}
      </svg>
      <span className="relative grid size-[46px] place-items-center rounded-full border border-[#dbe6fb] bg-white text-[#3f7eed]">
        <AsteriskIcon size={22} strokeWidth={2.2} />
      </span>
    </div>
  );
}

/* ------------------------------ Accounts ------------------------------ */

const ACCOUNT_ROWS = [
  {
    heading: "Depository",
    eye: false,
    total: { change: "999%", tone: "up" as const, value: "$4,179.15" },
    rows: [
      {
        name: "Savings",
        mask: "3567",
        change: "999%",
        tone: "up" as const,
        value: "$4,179.15",
        selected: false,
      },
    ],
  },
  {
    heading: "Investments",
    eye: true,
    total: { change: "1.69%", tone: "up" as const, value: "$1,319,328.02" },
    rows: [
      {
        name: "Main Investment",
        mask: "9786",
        change: "1.71%",
        tone: "up" as const,
        value: "$1,305,499.92",
        selected: true,
      },
      {
        name: "Robinhood Investment",
        mask: "2345",
        change: "0.00%",
        tone: "flat" as const,
        value: "$13,828.10",
        selected: false,
      },
    ],
  },
  {
    heading: "Loans",
    eye: false,
    total: { change: "0.00%", tone: "flat" as const, value: "$100.00" },
    rows: [
      {
        name: "SoFi Personal Loan",
        mask: "2390",
        change: "0.00%",
        tone: "flat" as const,
        value: "$100.00",
        selected: false,
      },
    ],
  },
];

const ALLOCATIONS = [
  { label: "Crypto", pct: 98, display: "98%" },
  { label: "Equity", pct: 1, display: "1%" },
  { label: "ETF", pct: 0.4, display: "< 1%" },
];

const HOLDINGS = [
  {
    ticker: "BTC",
    name: "Bitcoin",
    change: "2.87%",
    tone: "down" as const,
    price: "$64,020.45",
  },
  {
    ticker: "SPY",
    name: "State Street SPDR …",
    change: "0.81%",
    tone: "down" as const,
    price: "$746.74",
  },
  {
    ticker: "META",
    name: "Meta Platforms, In…",
    change: "1.80%",
    tone: "down" as const,
    price: "$577.22",
  },
  {
    ticker: "GOOGL",
    name: "Alphabet Inc. Clas…",
    change: "0.44%",
    tone: "down" as const,
    price: "$368.03",
  },
  {
    ticker: "NVDA",
    name: "Nvidia Corp",
    change: "0.25%",
    tone: "up" as const,
    price: "$210.69",
  },
];

function PanelHeading({ title, meta }: { title: string; meta: string }) {
  return (
    <div className="flex items-center gap-3 pb-[17px]">
      <h3 className="flex-1 text-[0.94rem] font-medium">{title}</h3>
      <span className="text-[0.7rem] font-semibold uppercase tracking-wide text-[color:var(--ob-muted)]">
        {meta}
      </span>
      <SlidersIcon size={15} className="text-[color:var(--ob-muted)]" />
    </div>
  );
}

function AccountsPage() {
  return (
    <div className="min-h-0 flex-1">
      <div className="min-w-0 flex-1 p-4 sm:p-6">
        <Card className="relative px-6 pb-3 pt-8">
          <button
            type="button"
            aria-label="Net worth settings"
            className="absolute right-6 top-6 text-[color:var(--ob-muted)]"
          >
            <GearIcon size={18} />
          </button>
          <div className="text-center">
            <p className="text-[0.94rem] text-[color:var(--ob-muted)]">
              Net worth
            </p>
            <p className="pt-1 text-[1.5rem] font-[550] leading-none tracking-tight tabular-nums">
              $1,323,530
            </p>
            <span className="inline-flex pt-2.5">
              <Delta value="999%" tone="up" />
            </span>
          </div>

          {/* One deposit cleared mid-week, so the balance is a step, not a slope. */}
          <div className="-mx-6 pt-3">
            <LineChart
              height={92}
              gridLines={0}
              series={[
                {
                  id: "net-worth",
                  points: [17, 17, 17, 17, 62, 62, 62, 62, 62, 62, 62, 62],
                  color: "#0ccc4f",
                  area: true,
                  dashedFrom: 9,
                  endDot: true,
                },
              ]}
            />
          </div>

          <RangeRow className="pt-[33px]" />
        </Card>

        <div className="-mx-1 overflow-x-auto px-1 pt-7">
          <div className="min-w-[540px]">
            {ACCOUNT_ROWS.map((group) => (
              <section key={group.heading} className="pb-5">
                <h2 className="flex items-center gap-1.5 pb-3 text-[0.94rem] font-medium">
                  <ChevronDown
                    size={13}
                    strokeWidth={2.4}
                    className="text-[color:var(--ob-muted)]"
                  />
                  {group.heading}
                  {group.eye && (
                    <EyeIcon
                      size={15}
                      className="text-[color:var(--ob-muted)]"
                    />
                  )}
                </h2>
                {group.rows.map((row) => (
                  <div
                    key={row.mask}
                    className={cn(
                      "-mx-3 flex items-center gap-2 rounded-[12px] px-3 py-2.5",
                      row.selected && "bg-[#eaf1fd]",
                    )}
                  >
                    <span className="grid size-9 shrink-0 place-items-center rounded-full bg-[#eef0f4] text-[color:#8b93a1]">
                      <BankSolid size={18} />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="flex items-baseline gap-2">
                        <span className="truncate text-[0.94rem] font-medium">
                          {row.name}
                        </span>
                        <span className="shrink-0 text-[0.94rem] text-[color:var(--ob-muted)] tabular-nums">
                          {row.mask}
                        </span>
                      </span>
                      <span className="block text-[0.82rem] text-[color:var(--ob-muted)]">
                        Manual account
                      </span>
                    </span>
                    <Delta value={row.change} tone={row.tone} />
                    <span className="w-[140px] shrink-0 text-right text-[0.94rem] font-medium tabular-nums">
                      {row.value}
                    </span>
                  </div>
                ))}
                <div className="mt-1.5 flex items-center gap-3 border-t border-[color:var(--ob-border)] pt-3.5">
                  <span className="flex-1" />
                  <Delta value={group.total.change} tone={group.total.tone} />
                  <span className="w-[140px] shrink-0 text-right text-[0.94rem] font-medium tabular-nums">
                    {group.total.value}
                  </span>
                </div>
              </section>
            ))}
            <h2 className="flex items-center gap-1.5 text-[0.94rem] font-medium">
              <ChevronDown
                size={13}
                strokeWidth={2.4}
                className="text-[color:var(--ob-muted)]"
              />
              Other
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}

/** The selected account, docked to the right of the list. */
function AccountDetail() {
  return (
    <aside className="hidden w-[464px] shrink-0 border-l border-[color:var(--ob-border)] bg-[color:var(--ob-surface)] xl:block">
      <div className="flex h-14 items-center gap-3 px-6">
        <h2 className="flex-1 text-[0.94rem] font-medium">Other</h2>
        <button
          type="button"
          aria-label="More"
          className="text-[color:var(--ob-muted)]"
        >
          <MoreIcon size={18} />
        </button>
        <span aria-hidden className="h-5 w-px bg-[color:var(--ob-border)]" />
        <button
          type="button"
          aria-label="Close"
          className="text-[color:var(--ob-muted)]"
        >
          <Cross size={18} />
        </button>
      </div>

      <div className="border-t border-[color:var(--ob-border)] px-6 pb-5 pt-6">
        <div className="flex items-center gap-2">
          <span className="grid size-6 shrink-0 place-items-center rounded-full bg-[#eef0f4] text-[color:#8b93a1]">
            <BankSolid size={13} />
          </span>
          <span className="text-[0.94rem] font-medium tabular-nums">9786</span>
          <span className="text-[0.94rem] text-[color:var(--ob-muted)]">
            Manual account
          </span>
          <span className="ml-auto flex items-center gap-1.5">
            <span
              className="inline-flex items-center gap-0.5 rounded-full px-2 py-[3px] text-[0.76rem] font-bold tabular-nums"
              style={{ background: "#e4f2e4", color: "#187b3c" }}
            >
              <Plus size={11} strokeWidth={3} /> $21,942
            </span>
            <Delta value="1.71%" tone="up" />
          </span>
        </div>

        <div className="flex items-baseline gap-3 pt-2">
          <h3 className="flex-1 text-[1.3rem] font-semibold tracking-tight">
            Main Investment
          </h3>
          <p className="text-[1.3rem] font-semibold tabular-nums">
            $1,305,499.92
          </p>
        </div>

        {/* The dotted lead-in marks the stretch before this account existed. */}
        {/* The end dot sits a little in from the panel's edge, not on it. */}
        <div className="pr-1.5 pt-2">
          <LineChart
            height={100}
            smooth
            gridLines={0}
            series={[
              {
                id: "account",
                points: [4, 4, 4, 4, 4, 12, 46, 70, 78, 78, 74],
                color: "#0ccc4f",
                area: true,
                dashedFrom: 9,
                endDot: true,
              },
            ]}
          />
        </div>

        <RangeRow className="pt-[27px]" />
      </div>

      <div className="border-t border-[color:var(--ob-border)] px-6 py-6">
        <PanelHeading title="Allocations" meta="By percentage" />
        <ul>
          {ALLOCATIONS.map((row) => (
            <li key={row.label} className="flex h-8 items-center gap-2">
              <span className="w-[47px] shrink-0 text-[1rem]">{row.label}</span>
              <span className="relative h-[5px] flex-1 rounded-full bg-[#f0f1f2]">
                <span
                  className="absolute inset-y-0 left-0 rounded-full bg-[#3b6fe0]"
                  style={{ width: `${Math.max(row.pct, 1)}%` }}
                />
              </span>
              <span className="w-[38px] shrink-0 text-right text-[0.94rem] font-medium tabular-nums">
                {row.display}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="border-t border-[color:var(--ob-border)] px-6 py-6">
        <PanelHeading title="Holdings" meta="Last price" />
        <ul>
          {HOLDINGS.map((row) => (
            <li key={row.ticker} className="flex h-11 items-center gap-3">
              <span className="w-16 shrink-0 text-[0.94rem] text-[color:var(--ob-muted)]">
                {row.ticker}
              </span>
              <span className="min-w-0 flex-1 truncate text-[0.94rem]">
                {row.name}
              </span>
              <Delta value={row.change} tone={row.tone} />
              <span className="w-24 shrink-0 text-right text-[0.94rem] font-medium tabular-nums">
                {row.price}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
