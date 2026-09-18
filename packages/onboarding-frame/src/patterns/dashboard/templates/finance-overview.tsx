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

/**
 * Personal finance overview.
 *
 * Money apps live or die on how a projection reads, so the spending chart
 * shows the budget line as a dashed guide with actual spend beneath it, and
 * labels the gap directly rather than leaving the reader to infer it.
 */
export function FinanceOverviewTemplate({ className }: TemplateProps) {
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
                  item.active
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
          <header className="border-b border-[color:var(--ob-border)] px-8 py-4">
            <h1 className="text-[1.05rem] font-semibold">Dashboard</h1>
          </header>

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
        </Main>
      </Shell>
    </Surface>
  );
}
