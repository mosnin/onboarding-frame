"use client";

import { LineChart } from "../../../ui/charts";
import { cn } from "../../../lib/cn";
import { Placeholder } from "../../../ui/placeholder";
import { Surface, financeTokens } from "./tokens";
import { Card, Main, Segmented, Shell, Sidebar } from "./chrome";
import type { TemplateProps } from "./api-console";

const NAV = [
  { id: "dashboard", label: "Dashboard", glyph: "➤", active: true },
  { id: "transactions", label: "Transactions", glyph: "≣" },
  { id: "accounts", label: "Accounts", glyph: "▤" },
  { id: "investments", label: "Investments", glyph: "📈" },
  { id: "categories", label: "Categories", glyph: "◌" },
  { id: "recurring", label: "Recurring", glyph: "◎" },
];

const ACCOUNT_GROUPS = [
  {
    heading: "Depository",
    rows: [{ label: "Savings", value: "$4,179", dot: "#f0883e" }],
  },
  {
    heading: "Investment",
    rows: [
      { label: "Crypto wallet", value: "$6,666,147", dot: "#3b82f6" },
      { label: "Main investment", value: "$1,267,713", dot: "#6366f1" },
    ],
  },
  { heading: "Loan", rows: [{ label: "Personal loan", value: "$100", dot: "#eab308" }] },
  {
    heading: "Other",
    rows: [
      { label: "Cash", value: "$288", dot: "#14b8a6" },
      { label: "Manual account", value: "$0", dot: "#22c55e" },
    ],
  },
];

const CATEGORIES = [
  { id: "housing", glyph: "🏠", label: "Housing", spent: "$2,880", limit: "$6,000", pct: 48, over: false },
  { id: "investing", glyph: "💰", label: "Investing", spent: "$1,193", limit: "$300", pct: 100, over: true },
  { id: "dining", glyph: "❤️", label: "Dining", spent: "$310", limit: "$900", pct: 34, over: false },
  { id: "education", glyph: "📖", label: "Education", spent: "$100", limit: "$900", pct: 11, over: false },
  { id: "utilities", glyph: "📱", label: "Utilities", spent: "$97", limit: "$300", pct: 32, over: false },
];

const UPCOMING = [
  { when: "Today", glyph: "💰", label: "Buy index fund", tag: "Investing", tone: "#efe7ff", amount: "$200.00" },
  { when: "Today", glyph: "🏠", label: "Rent payment", tag: "Housing", tone: "#efe7ff", amount: "$1,350.00" },
  { when: "Jun 26", glyph: "🏠", label: "Electricity bill", tag: "Housing", tone: "#efe7ff", amount: "$40.00" },
  { when: "Jul 7", glyph: "🛒", label: "Grocery shopping", tag: "Groceries", tone: "#fdf3d7", amount: "$92.40" },
  { when: "Jul 7", glyph: "🛒", label: "Grocery shopping", tag: "Groceries", tone: "#fdf3d7", amount: "$92.40" },
];

const RANGES = ["1W", "1M", "3M", "YTD", "1Y", "All"];
const RANGE_ITEMS = RANGES.map((id) => ({ id, label: id }));

/**
 * Personal finance overview.
 *
 * Money apps live or die on how a projection reads, so the spending chart
 * shows the budget line as a dashed guide with actual spend beneath it, and
 * labels the gap directly rather than leaving the reader to infer it.
 */
export type FinancePage = "dashboard" | "accounts";

export interface FinanceOverviewProps extends TemplateProps {
  page?: FinancePage;
}

export function FinanceOverviewTemplate({
  className,
  page = "dashboard",
}: FinanceOverviewProps) {
  return (
    <Surface tokens={financeTokens}>
      <Shell className={cn(className)}>
        <Sidebar width={272} bg="var(--ob-surface)">
          <div className="flex items-center gap-2 p-4">
            <button type="button" aria-label="Collapse" className="opacity-50">▥</button>
            <button type="button" aria-label="Refresh" className="ml-auto opacity-50">↻</button>
          </div>

          <nav className="grid gap-0.5 px-3">
            {NAV.map((item) => (
              <button
                key={item.id}
                type="button"
                aria-current={item.active ? "page" : undefined}
                className={cn(
                  "flex items-center gap-3 rounded-[10px] px-3 py-2.5 text-left text-[0.95rem]",
                  (item.active ? page === "dashboard" : item.id === page)
                    ? "bg-[color-mix(in_oklab,#3b82f6_10%,transparent)] font-semibold text-[#2563eb]"
                    : "text-[color:var(--ob-fg-soft)] hover:bg-[color:var(--ob-surface-2)]",
                )}
              >
                <span aria-hidden className="w-4 text-center opacity-80">{item.glyph}</span>
                {item.label}
              </button>
            ))}
          </nav>

          <div className="mt-6 grid gap-5 px-3">
            {ACCOUNT_GROUPS.map((group) => (
              <div key={group.heading}>
                <button
                  type="button"
                  className="flex w-full items-center gap-1.5 px-3 pb-1.5 text-left text-[0.88rem] font-semibold text-[color:var(--ob-fg-soft)]"
                >
                  <span aria-hidden className="text-[0.7rem] opacity-50">▾</span>
                  {group.heading}
                </button>
                {group.rows.map((row) => (
                  <div
                    key={row.label}
                    className="flex items-center gap-2.5 rounded-[10px] px-3 py-2 text-[0.92rem]"
                  >
                    <span
                      aria-hidden
                      className="size-2 shrink-0 rounded-full"
                      style={{ background: row.dot }}
                    />
                    <span className="flex-1 truncate">{row.label}</span>
                    <span className="shrink-0 tabular-nums text-[color:var(--ob-muted)]">
                      {row.value}
                    </span>
                  </div>
                ))}
              </div>
            ))}
          </div>

          <div className="mt-auto grid gap-0.5 p-3">
            <button
              type="button"
              className="flex items-center gap-3 rounded-[10px] px-3 py-2.5 text-left text-[0.95rem] font-semibold text-[#d97706]"
            >
              <span aria-hidden>🔖</span> Start here
            </button>
            {[
              { id: "help", label: "Get help", glyph: "💬" },
              { id: "settings", label: "Settings", glyph: "⚙", alert: true },
            ].map((item) => (
              <button
                key={item.id}
                type="button"
                className="flex items-center gap-3 rounded-[10px] px-3 py-2.5 text-left text-[0.95rem] text-[color:var(--ob-fg-soft)]"
              >
                <span aria-hidden className="w-4 text-center opacity-70">{item.glyph}</span>
                <span className="flex-1">{item.label}</span>
                {item.alert && (
                  <span className="grid size-4 place-items-center rounded-full bg-[#2563eb] text-[0.62rem] font-bold text-white">
                    !
                  </span>
                )}
              </button>
            ))}
          </div>
        </Sidebar>

        <Main>
          <header className="flex items-center border-b border-[color:var(--ob-border)] px-8 py-4">
            <h1 className="flex-1 text-[1.05rem] font-semibold">
              {page === "accounts" ? "Accounts" : "Dashboard"}
            </h1>
            {page === "accounts" && (
              <button type="button" aria-label="Add account" className="opacity-50">
                +
              </button>
            )}
          </header>

          {page === "accounts" ? (
            <AccountsPage />
          ) : (
          <div className="grid gap-5 p-6 sm:p-8 lg:grid-cols-2">
            {/* Monthly spending */}
            <Card className="[box-shadow:var(--ob-shadow)]">
              <div className="flex items-center gap-3">
                <h2 className="flex-1 font-bold">Monthly spending</h2>
                <button type="button" className="flex items-center gap-1 text-[0.88rem] text-[color:var(--ob-muted)]">
                  Transactions <span aria-hidden>›</span>
                </button>
              </div>

              <div className="mt-6 text-center">
                <p className="text-[2rem] font-extrabold tracking-tight">$4,465 left</p>
                <p className="mt-1 text-[0.92rem] text-[color:var(--ob-muted)]">
                  $9,300 budgeted
                </p>
              </div>

              <div className="relative mt-6">
                {/* Budget pace as a dashed guide; actual spend as the solid line. */}
                <LineChart
                  height={150}
                  smooth
                  gridLines={1}
                  series={[
                    {
                      id: "budget",
                      points: [10, 25, 40, 55, 70, 85, 100],
                      color: "color-mix(in oklab, var(--ob-muted) 35%, transparent)",
                      dashedFrom: 0,
                    },
                    {
                      id: "actual",
                      points: [8, 12, 14, 16, 20, 24, 30],
                      color: "var(--ob-brand)",
                      endDot: true,
                    },
                  ]}
                />
                <span className="absolute right-[6%] top-[52%] rounded-full bg-[color:var(--ob-brand)] px-2.5 py-1 text-[0.78rem] font-bold text-white">
                  $6,674 under
                </span>
              </div>
            </Card>

            {/* Net worth */}
            <Card className="[box-shadow:var(--ob-shadow)]">
              <div className="flex items-center gap-3">
                <h2 className="flex-1 font-bold">Net worth</h2>
                <button type="button" className="flex items-center gap-1 text-[0.88rem] text-[color:var(--ob-muted)]">
                  Accounts <span aria-hidden>›</span>
                </button>
              </div>

              <div className="mt-6 flex justify-center gap-16 text-center">
                {[
                  { label: "Assets", value: "$7,938,327", delta: "999%", up: true },
                  { label: "Debts", value: "$100", delta: "999%", up: false },
                ].map((stat) => (
                  <div key={stat.label}>
                    <p className="text-[0.88rem] text-[color:var(--ob-muted)]">{stat.label}</p>
                    <p className="mt-1 text-[1.75rem] font-extrabold tracking-tight tabular-nums">
                      {stat.value}
                    </p>
                    <span
                      className={cn(
                        "mt-1.5 inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[0.76rem] font-bold",
                        stat.up
                          ? "bg-[color-mix(in_oklab,var(--ob-brand)_16%,transparent)] text-[#0f8a48]"
                          : "bg-[color-mix(in_oklab,var(--ob-danger)_14%,transparent)] text-[color:var(--ob-danger)]",
                      )}
                    >
                      ↗ {stat.delta}
                    </span>
                  </div>
                ))}
              </div>

              <LineChart
                className="mt-5"
                height={130}
                smooth
                gridLines={1}
                series={[
                  {
                    id: "net",
                    points: [20, 21, 22, 22, 23, 24, 70, 92, 92],
                    color: "var(--ob-brand)",
                    area: true,
                    dashedFrom: 7,
                    endDot: true,
                  },
                ]}
              />

              <div className="mt-4 flex justify-center">
                <Segmented
                  items={RANGES.map((range) => ({ id: range, label: range }))}
                  active="1W"
                />
              </div>
            </Card>

            {/* Transactions to review — a genuine zero state, not a fake list. */}
            <Card className="grid place-items-center [box-shadow:var(--ob-shadow)]">
              <div className="flex w-full items-center gap-3">
                <h2 className="flex-1 font-bold">Transactions to review</h2>
                <button type="button" className="flex items-center gap-1 text-[0.88rem] text-[color:var(--ob-muted)]">
                  View all <span aria-hidden>›</span>
                </button>
              </div>
              <div className="grid justify-items-center gap-4 py-10">
                <span
                  aria-hidden
                  className="grid size-14 place-items-center rounded-full text-2xl text-[#3b82f6]"
                  style={{
                    background:
                      "radial-gradient(circle, color-mix(in oklab,#3b82f6 14%,transparent) 0%, transparent 70%)",
                  }}
                >
                  ✳
                </span>
                <p className="text-[0.95rem] text-[color:var(--ob-muted)]">
                  You&apos;ve reviewed 30 transactions
                </p>
              </div>
            </Card>

            {/* Top categories */}
            <Card className="[box-shadow:var(--ob-shadow)]">
              <div className="flex items-center gap-3">
                <h2 className="flex-1 font-bold">Top categories</h2>
                <button type="button" className="flex items-center gap-1 text-[0.88rem] text-[color:var(--ob-muted)]">
                  View all <span aria-hidden>›</span>
                </button>
              </div>
              <ul className="mt-5 grid gap-4">
                {CATEGORIES.map((category) => (
                  <li key={category.id} className="flex items-center gap-3">
                    <span aria-hidden className="size-1.5 rounded-full bg-[#a855f7]" />
                    <span aria-hidden>{category.glyph}</span>
                    <span className="flex-1 text-[0.95rem]">{category.label}</span>
                    <span className="w-16 text-right text-[0.92rem] font-semibold tabular-nums">
                      {category.spent}
                    </span>
                    <span className="h-1.5 w-32 overflow-hidden rounded-full bg-[color:var(--ob-surface-3)]">
                      <span
                        className="block h-full rounded-full"
                        style={{
                          width: `${category.pct}%`,
                          background: category.over
                            ? "var(--ob-danger)"
                            : "var(--ob-brand)",
                        }}
                      />
                    </span>
                    <span className="w-16 text-right text-[0.92rem] tabular-nums text-[color:var(--ob-muted)]">
                      {category.limit}
                    </span>
                  </li>
                ))}
              </ul>
            </Card>

            {/* Upcoming */}
            <Card className="lg:col-span-2 [box-shadow:var(--ob-shadow)]">
              <div className="flex items-center gap-3">
                <h2 className="flex-1 font-bold">Next two weeks</h2>
                <button type="button" className="flex items-center gap-1 text-[0.88rem] text-[color:var(--ob-muted)]">
                  Recurring <span aria-hidden>›</span>
                </button>
              </div>
              <ul className="mt-4">
                {UPCOMING.map((row, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-4 border-b border-[color:var(--ob-border)] py-3 last:border-b-0"
                  >
                    <span className="w-20 shrink-0 text-[0.92rem] text-[color:var(--ob-muted)]">
                      {row.when}
                    </span>
                    <span aria-hidden>{row.glyph}</span>
                    <span className="flex-1 text-[0.95rem]">{row.label}</span>
                    <span
                      className="rounded-full px-2.5 py-1 text-[0.72rem] font-bold uppercase"
                      style={{ background: row.tone }}
                    >
                      {row.tag}
                    </span>
                    <span className="w-24 text-right font-semibold tabular-nums">
                      {row.amount}
                    </span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>
          )}
        </Main>
      </Shell>
    </Surface>
  );
}

/** Accounts, with the per-account detail panel docked on the right. */
const ACCOUNT_ROWS = [
  {
    heading: "Depository",
    total: { change: "999%", tone: "up", value: "$4,179.15" },
    rows: [
      { name: "Savings", mask: "3567", change: "999%", tone: "up", value: "$4,179.15" },
    ],
  },
  {
    heading: "Investments",
    total: { change: "1.69%", tone: "up", value: "$1,319,328.02" },
    rows: [
      {
        name: "Main Investment",
        mask: "9786",
        change: "1.71%",
        tone: "up",
        value: "$1,305,499.92",
        selected: true,
      },
      {
        name: "Robinhood Investment",
        mask: "2345",
        change: "0.00%",
        tone: "flat",
        value: "$13,828.10",
      },
    ],
  },
  {
    heading: "Loans",
    total: { change: "0.00%", tone: "flat", value: "$100.00" },
    rows: [
      { name: "SoFi Personal Loan", mask: "2390", change: "0.00%", tone: "flat", value: "$100.00" },
    ],
  },
];

const ALLOCATIONS = [
  { label: "Crypto", pct: 98, display: "98%" },
  { label: "Equity", pct: 1, display: "1%" },
  { label: "ETF", pct: 0.4, display: "< 1%" },
];

const HOLDINGS = [
  { ticker: "BTC", name: "Bitcoin", change: "2.87%", down: true, price: "$64,020.45" },
  { ticker: "SPY", name: "State Street SPDR …", change: "0.81%", down: true, price: "$746.74" },
  { ticker: "META", name: "Meta Platforms, In…", change: "1.80%", down: true, price: "$577.22" },
  { ticker: "GOOGL", name: "Alphabet Inc. Clas…", change: "0.44%", down: true, price: "$368.03" },
  { ticker: "NVDA", name: "Nvidia Corp", change: "0.25%", down: false, price: "$210.69" },
];

function Delta({ value, tone }: { value: string; tone: string }) {
  const up = tone === "up";
  const flat = tone === "flat";
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[0.78rem] font-semibold tabular-nums",
        flat
          ? "bg-[color:var(--ob-surface-3)] text-[color:var(--ob-muted)]"
          : up
            ? "bg-[color-mix(in_oklab,#22c55e_16%,transparent)] text-[#15803d]"
            : "bg-[color-mix(in_oklab,#ef4444_14%,transparent)] text-[color:var(--ob-danger)]",
      )}
    >
      <span aria-hidden>{flat ? "=" : up ? "↗" : "↘"}</span>
      {value}
    </span>
  );
}

function AccountsPage() {
  return (
    <div className="flex flex-1 overflow-hidden">
      <div className="flex-1 overflow-auto p-6 sm:p-8">
        <Card className="[box-shadow:var(--ob-shadow)]">
          <div className="text-center">
            <p className="text-[0.95rem] text-[color:var(--ob-fg-soft)]">Net worth</p>
            <p className="pt-1 text-[1.9rem] font-extrabold tracking-tight">$1,323,530</p>
            <span className="mt-2 inline-flex">
              <Delta value="999%" tone="up" />
            </span>
          </div>

          {/* Balance is a step, not a slope: one deposit cleared mid-week. */}
          <div className="mt-5">
            <LineChart
              height={135}
              gridLines={0}
              series={[
                {
                  id: "net-worth",
                  points: [17, 17, 17, 17, 62, 62, 62, 62, 62, 62, 62],
                  color: "#22c55e",
                  area: true,
                  dashedFrom: 8,
                  endDot: true,
                },
              ]}
            />
          </div>

          <div className="flex justify-center pt-3">
            <Segmented items={RANGE_ITEMS} active="1W" />
          </div>
        </Card>

        <div className="pt-6">
          {ACCOUNT_ROWS.map((group) => (
            <section key={group.heading} className="pb-6">
              <h2 className="flex items-center gap-1.5 pb-1 text-[0.95rem] font-semibold">
                <span aria-hidden className="text-[0.7rem] opacity-50">▾</span>
                {group.heading}
              </h2>
              {group.rows.map((row) => (
                <div
                  key={row.mask}
                  className={cn(
                    "flex items-center gap-3 rounded-[12px] px-3 py-3",
                    "selected" in row && row.selected
                      ? "bg-[color-mix(in_oklab,#3b82f6_8%,transparent)]"
                      : "",
                  )}
                >
                  <span className="grid size-9 shrink-0 place-items-center rounded-full bg-[color:var(--ob-surface-2)] text-[0.95rem]">
                    🏦
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="flex items-baseline gap-2">
                      <span className="truncate font-semibold">{row.name}</span>
                      <span className="shrink-0 text-[0.88rem] text-[color:var(--ob-muted)]">
                        {row.mask}
                      </span>
                    </span>
                    <span className="block text-[0.88rem] text-[color:var(--ob-muted)]">
                      Manual account
                    </span>
                  </span>
                  <Delta value={row.change} tone={row.tone} />
                  <span className="w-36 shrink-0 text-right font-semibold tabular-nums">
                    {row.value}
                  </span>
                </div>
              ))}
              <div className="flex items-center gap-3 border-t border-[color:var(--ob-border)] px-3 pt-3">
                <span className="flex-1" />
                <Delta value={group.total.change} tone={group.total.tone} />
                <span className="w-36 shrink-0 text-right font-semibold tabular-nums">
                  {group.total.value}
                </span>
              </div>
            </section>
          ))}
        </div>
      </div>

      <aside className="hidden w-[420px] shrink-0 overflow-auto border-l border-[color:var(--ob-border)] xl:block">
        <div className="flex items-center gap-2 px-5 py-4">
          <h2 className="flex-1 text-[1.05rem] font-semibold">Other</h2>
          <span aria-hidden className="opacity-50">···</span>
          <span aria-hidden className="opacity-50">✕</span>
        </div>

        <div className="border-b border-[color:var(--ob-border)] px-5 pb-5">
          <div className="flex items-center gap-2.5">
            <span className="grid size-7 place-items-center rounded-full bg-[color:var(--ob-surface-2)] text-[0.8rem]">
              🏦
            </span>
            <span className="text-[0.92rem] font-semibold tabular-nums">9786</span>
            <span className="text-[0.92rem] text-[color:var(--ob-muted)]">
              Manual account
            </span>
            <span className="ml-auto flex items-center gap-1.5">
              <span className="rounded-full bg-[color-mix(in_oklab,#22c55e_16%,transparent)] px-2 py-0.5 text-[0.76rem] font-semibold text-[#15803d]">
                + $21,942
              </span>
              <Delta value="1.71%" tone="up" />
            </span>
          </div>

          <div className="flex items-baseline gap-3 pt-2">
            <h3 className="flex-1 text-[1.3rem] font-bold tracking-tight">
              Main Investment
            </h3>
            <p className="text-[1.3rem] font-bold tabular-nums">$1,305,499.92</p>
          </div>

          {/* Leading dotted run marks the stretch before this account existed. */}
          <div className="pt-3">
            <LineChart
              height={120}
              smooth
              gridLines={0}
              series={[
                {
                  id: "account",
                  points: [0, 0, 0, 0, 12, 40, 62, 68, 66, 63],
                  color: "#22c55e",
                  area: true,
                  dashedFrom: 7,
                  endDot: true,
                },
              ]}
            />
          </div>

          <div className="flex justify-center pt-2">
            <Segmented items={RANGE_ITEMS} active="1W" />
          </div>
        </div>

        <div className="border-b border-[color:var(--ob-border)] px-5 py-5">
          <div className="flex items-center gap-3 pb-4">
            <h3 className="flex-1 font-bold">Allocations</h3>
            <span className="text-[0.76rem] font-semibold uppercase tracking-wide text-[color:var(--ob-muted)]">
              By percentage
            </span>
          </div>
          <ul className="grid gap-3">
            {ALLOCATIONS.map((row) => (
              <li key={row.label} className="flex items-center gap-3">
                <span className="w-16 shrink-0 text-[0.92rem]">{row.label}</span>
                <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-[color:var(--ob-surface-3)]">
                  <span
                    className="block h-full rounded-full bg-[#3b82f6]"
                    style={{ width: `${Math.max(row.pct, 0.8)}%` }}
                  />
                </span>
                <span className="w-12 shrink-0 text-right text-[0.9rem] font-semibold tabular-nums">
                  {row.display}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="px-5 py-5">
          <div className="flex items-center gap-3 pb-3">
            <h3 className="flex-1 font-bold">Holdings</h3>
            <span className="text-[0.76rem] font-semibold uppercase tracking-wide text-[color:var(--ob-muted)]">
              Last price
            </span>
          </div>
          <ul>
            {HOLDINGS.map((row) => (
              <li key={row.ticker} className="flex items-center gap-3 py-2.5">
                <span className="w-14 shrink-0 text-[0.88rem] font-semibold text-[color:var(--ob-muted)]">
                  {row.ticker}
                </span>
                <span className="min-w-0 flex-1 truncate text-[0.92rem]">{row.name}</span>
                <Delta value={row.change} tone={row.down ? "down" : "up"} />
                <span className="w-24 shrink-0 text-right text-[0.92rem] font-semibold tabular-nums">
                  {row.price}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </div>
  );
}
