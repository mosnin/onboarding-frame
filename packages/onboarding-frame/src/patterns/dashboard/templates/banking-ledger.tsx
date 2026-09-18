"use client";

import type { ReactNode } from "react";
import { cn } from "../../../lib/cn";
import { AvatarSlot, LogoSlot } from "../../../ui/placeholder";
import { Surface, bankingTokens } from "./tokens";
import { Main, NavItem, NavSection, Shell, Sidebar } from "./chrome";
import type { TemplateProps } from "./props";

export type BankingPage = "transactions" | "home" | "cards";

export interface BankingLedgerProps extends TemplateProps {
  page?: BankingPage;
}

const NAV = [
  { id: "home", label: "Home", glyph: "⌂" },
  { id: "tasks", label: "Tasks", glyph: "▭" },
  { id: "transactions", label: "Transactions", glyph: "≣" },
  { id: "payments", label: "Payments", glyph: "⇄", caret: true },
  { id: "cards", label: "Cards", glyph: "▬" },
  { id: "capital", label: "Capital", glyph: "📈" },
];

const ACCOUNTS = [
  { id: "credit", label: "Credit Card" },
  { id: "checking", label: "Checking ••2502", balance: "$972.04" },
  { id: "savings", label: "Savings ••5679", balance: "$1,020.00" },
];

const WORKFLOWS = [
  { id: "bills", label: "Bill Pay", glyph: "🧾" },
  { id: "invoicing", label: "Invoicing", glyph: "🗎", caret: true },
  { id: "reimbursements", label: "Reimbursements", glyph: "◉" },
  { id: "accounting", label: "Accounting", glyph: "▤" },
];

/**
 * Direction is carried entirely by hue: green in, magenta out. The failed
 * charge keeps a struck-through $0.00 rather than being filtered away — a
 * ledger that hides its failures is not a ledger.
 */
const ROWS = [
  { id: "t1", date: "Nov 2", name: "Workspace", amount: "-$6", cents: "41", out: true, account: "Checking ••2502", method: "Card ••9932", card: true },
  { id: "t2", date: "Oct 30", name: "Wise US Inc", amount: "$10", cents: "60", account: "Checking ••2502", method: "Request" },
  { id: "t3", date: "Oct 29", name: "Workspace", amount: "-$2", cents: "55", out: true, account: "Checking ••2502", method: "Card ••9932", card: true, attachment: true },
  { id: "t4", date: "Oct 28", name: "Acme", amount: "-$1", cents: "00", out: true, account: "Savings ••5679", method: "Wire Payment" },
  { id: "t5", date: "Oct 28", name: "Acme", amount: "-$10", cents: "60", out: true, account: "Checking ••2502", method: "ACH Payment" },
  { id: "t6", date: "Oct 28", name: "From Checking ••2502", amount: "$10", cents: "00", account: "Savings ••5679", method: "Transfer In" },
  { id: "t7", date: "Oct 28", name: "To Savings ••5679", amount: "-$10", cents: "00", out: true, account: "Checking ••2502", method: "Transfer Out" },
  { id: "t8", date: "Oct 28", name: "From Checking ••2502", amount: "$10", cents: "00", account: "Savings ••5679", method: "Transfer In" },
  { id: "t9", date: "Oct 28", name: "To Savings ••5679", amount: "-$10", cents: "00", out: true, account: "Checking ••2502", method: "Transfer Out" },
  { id: "t10", date: "Oct 28", name: "TEMPORARY HOLD", amount: "$0", cents: "00", account: "Checking ••2502", method: "Card ••9932", card: true, failed: true },
];

/**
 * Banking ledger.
 *
 * The summary strip splits into three cells that answer different questions —
 * the month's net change, its shape over time, and which counterparty drove
 * it — rather than three variations on one number. The hovered tooltip is kept
 * because it carries the per-counterparty split that the chart alone does not.
 */
export function BankingLedgerTemplate({
  className,
  page = "transactions",
}: BankingLedgerProps) {
  return (
    <Surface tokens={bankingTokens} className={className}>
      <Shell>
        <Sidebar width={288} bg="var(--ob-surface)">
          <div className="flex items-center gap-3 px-5 pb-5 pt-5">
            <LogoSlot size={30} label="" radius={7} />
            <span className="flex-1 text-[1.12rem] font-semibold">Acme</span>
            <span aria-hidden className="text-[0.7rem] opacity-50">
              ⇅
            </span>
          </div>

          <nav className="grid gap-0.5 px-3">
            {NAV.map((item) => (
              <NavItem
                key={item.id}
                label={item.label}
                glyph={item.glyph}
                active={item.id === page}
                trailing={
                  item.caret ? (
                    <span aria-hidden className="text-[0.7rem] opacity-50">
                      ⌄
                    </span>
                  ) : undefined
                }
                className="text-[1.08rem]"
              />
            ))}
            <NavItem
              label="Accounts"
              glyph="🏦"
              trailing={
                <span aria-hidden className="text-[0.7rem] opacity-50">
                  ⌃
                </span>
              }
              className="text-[1.08rem]"
            />
            {ACCOUNTS.map((account) => (
              <button
                key={account.id}
                type="button"
                className="rounded-[var(--ob-radius-sm)] px-3 py-2 pl-9 text-left"
              >
                <span className="block text-[1.05rem]">{account.label}</span>
                {account.balance && (
                  <span className="block text-[1rem] tabular-nums text-[color:var(--ob-muted)]">
                    {account.balance}
                  </span>
                )}
              </button>
            ))}
          </nav>

          <NavSection label="Workflows" />
          <nav className="grid gap-0.5 px-3">
            {WORKFLOWS.map((item) => (
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
                className="text-[1.08rem]"
              />
            ))}
          </nav>
        </Sidebar>

        <Main className="relative overflow-auto">
          <header className="flex h-[76px] shrink-0 items-center gap-4 px-7">
            <span className="flex w-full max-w-[860px] items-center gap-2.5 rounded-[var(--ob-radius)] bg-[color:var(--ob-surface-2)] px-4 py-3 text-[1.05rem] text-[color:var(--ob-muted)]">
              <span aria-hidden>⌕</span>
              <span className="flex-1">Search for anything</span>
              <kbd className="rounded border border-[color:var(--ob-border)] px-1.5 py-0.5 text-[0.72rem] font-semibold">
                ⌘K
              </kbd>
            </span>
            <span className="ml-auto flex items-center gap-4">
              <span className="flex items-center gap-5 rounded-[var(--ob-radius)] border border-[color:var(--ob-border-strong)] px-5 py-2.5 text-[1.08rem] font-medium">
                Move Money
                <span aria-hidden className="text-[0.7rem] opacity-60">
                  ⌄
                </span>
              </span>
              <span aria-hidden className="text-[color:var(--ob-fg-soft)]">
                ⊘
              </span>
              <span className="relative" aria-hidden>
                ⌾
                <span className="absolute -right-0.5 -top-0.5 size-2 rounded-full bg-[color:var(--ob-brand)]" />
              </span>
              <AvatarSlot size={36} />
            </span>
          </header>

          <div className="px-7 pb-8">
            <div className="flex items-center gap-4">
              <h1 className="flex-1 text-[2rem] font-bold tracking-[-0.01em]">
                Transactions
              </h1>
              <span className="flex items-center gap-2 rounded-[var(--ob-radius)] border border-[color:var(--ob-border-strong)] px-4 py-2.5 text-[1.05rem] font-medium">
                <span aria-hidden>▤</span> Match Receipts
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-5">
              {[
                { id: "views", label: "Data Views", glyph: "🔖", caret: true },
                { id: "filters", label: "Filters", glyph: "⇶" },
                { id: "date", label: "Date", caret: true },
                { id: "keywords", label: "Keywords", caret: true },
                { id: "amount", label: "Amount", caret: true },
              ].map((pill) => (
                <span
                  key={pill.id}
                  className="flex items-center gap-2.5 rounded-[var(--ob-radius)] border border-[color:var(--ob-border-strong)] px-4 py-2 text-[1.05rem]"
                >
                  {pill.glyph && <span aria-hidden>{pill.glyph}</span>}
                  {pill.label}
                  {pill.caret && (
                    <span aria-hidden className="text-[0.7rem] opacity-60">
                      ⌄
                    </span>
                  )}
                </span>
              ))}
              <span className="ml-auto flex items-center gap-4 text-[color:var(--ob-fg-soft)]">
                {["▦", "⇵", "⚙"].map((glyph) => (
                  <span key={glyph} aria-hidden>
                    {glyph}
                  </span>
                ))}
                <span className="flex items-center gap-2 text-[1.05rem] font-medium">
                  <span aria-hidden>⤓</span> Export All
                </span>
              </span>
            </div>

            <section className="mt-5 grid border-y border-[color:var(--ob-border)] lg:grid-cols-[minmax(0,0.45fr)_minmax(0,1fr)_minmax(0,0.65fr)]">
              <div className="py-6 pr-6">
                <p className="text-[1.08rem] text-[color:var(--ob-fg-soft)]">
                  Net change this month
                </p>
                <p className="pt-1 text-[2rem] font-bold leading-none tabular-nums">
                  −$6<span className="text-[1.25rem]">.41</span>
                </p>
                <p className="pt-2 text-[1.05rem] text-[color:var(--ob-muted)]">
                  vs. −$3.55 last month
                </p>

                <ul className="grid gap-3 pt-7">
                  <Flow label="Money in" value="$0.00" color="var(--ob-success)" />
                  <Flow label="Money out" value="−$6.41" color="var(--ob-brand)" />
                </ul>
              </div>

              <div className="border-l border-[color:var(--ob-border)] px-6 py-6">
                <div className="flex gap-3">
                  <div className="grid shrink-0 text-right text-[1rem] tabular-nums text-[color:var(--ob-muted)]">
                    <span className="leading-none">$7</span>
                    <span className="mt-[calc((200px/2)-0.8em)] leading-none">$3</span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <MonthChart />
                    <p className="flex pt-2 text-[1rem] text-[color:var(--ob-muted)]">
                      {["Nov 1", "Nov 3", "Nov 5", "Nov 7"].map((tick) => (
                        <span key={tick} className="flex-1">
                          {tick}
                        </span>
                      ))}
                    </p>
                  </div>
                </div>
              </div>

              <div className="border-l border-[color:var(--ob-border)] px-6 py-6">
                <p className="flex items-center gap-4 text-[1.05rem]">
                  <span className="flex items-center gap-2">
                    To/From
                    <span aria-hidden className="text-[0.7rem] opacity-60">
                      ⌄
                    </span>
                  </span>
                  <span className="ml-auto flex items-center gap-2">
                    <span aria-hidden>▤</span> Group Table
                  </span>
                  <span aria-hidden className="text-[0.7rem] opacity-60">
                    ⌃
                  </span>
                </p>

                <div className="flex items-end gap-4 pt-6">
                  <div className="grid shrink-0 text-right text-[1rem] tabular-nums text-[color:var(--ob-muted)]">
                    <span className="leading-none">$7</span>
                    <span className="mt-[calc((140px/2)-0.8em)] leading-none">$3</span>
                  </div>
                  <span className="flex h-[170px] flex-1 items-end gap-4">
                    <span className="h-[62%] flex-1 bg-[color:var(--ob-surface-2)]" />
                    <span className="h-full flex-1 border-t-2 border-[color:var(--ob-brand)] bg-[color-mix(in_oklab,#e5457f_14%,transparent)]" />
                  </span>
                </div>
                <p className="pt-3 text-center text-[1rem] text-[color:var(--ob-muted)]">
                  Workspace
                </p>
              </div>
            </section>

            <div className="relative overflow-x-auto">
              <table className="w-full min-w-[1080px] border-collapse text-[1.05rem]">
                <thead>
                  <tr className="text-[color:var(--ob-fg-soft)]">
                    <th className="px-4 py-4">
                      <span
                        aria-hidden
                        className="block size-[18px] rounded border border-[color:var(--ob-border-strong)]"
                      />
                    </th>
                    {[
                      "Date ↓",
                      "To/From",
                      "Amount",
                      "Account",
                      "Method",
                      "",
                      "Attachment",
                    ].map((head, index) => (
                      <th
                        key={head || index}
                        className={cn(
                          "px-4 py-4 font-normal",
                          index === 2 ? "text-right" : "text-left",
                        )}
                      >
                        {head}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {ROWS.map((row) => (
                    <tr key={row.id} className="border-t border-[color:var(--ob-border)]">
                      <td className="px-4 py-4">
                        <span
                          aria-hidden
                          className="block size-[18px] rounded border border-[color:var(--ob-border-strong)]"
                        />
                      </td>
                      <td className="px-4 py-4 text-[color:var(--ob-fg-soft)]">
                        {row.date}
                      </td>
                      <td className="px-4 py-4">
                        <span className="flex items-center gap-3">
                          <LogoSlot size={30} label="" radius={15} />
                          <span>{row.name}</span>
                          {row.failed && (
                            <span className="rounded bg-[color-mix(in_oklab,#e5457f_14%,transparent)] px-2 py-0.5 text-[0.9rem] font-medium text-[color:var(--ob-brand)]">
                              Failed
                            </span>
                          )}
                        </span>
                      </td>
                      <td
                        className={cn(
                          "px-4 py-4 text-right tabular-nums",
                          row.out
                            ? ""
                            : row.failed
                              ? "text-[color:var(--ob-muted)] line-through"
                              : "text-[color:var(--ob-success)]",
                        )}
                      >
                        {row.amount}
                        <span className="text-[0.85rem]">.{row.cents}</span>
                      </td>
                      <td className="px-4 py-4">{row.account}</td>
                      <td className="px-4 py-4">
                        <span className="flex items-center gap-2.5">
                          <span aria-hidden className="text-[color:var(--ob-muted)]">
                            {row.card ? "▬" : row.method.startsWith("Transfer In") ? "→" : row.method.startsWith("Transfer Out") ? "←" : "➤"}
                          </span>
                          {row.method}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <span className="flex h-9 w-full items-center justify-end rounded-[var(--ob-radius)] border border-[color:var(--ob-border)] px-3 text-[0.75rem] text-[color:var(--ob-muted)]">
                          ⌄
                        </span>
                      </td>
                      <td className="px-4 py-4 text-right">
                        {row.attachment ? (
                          <span aria-hidden className="text-[color:var(--ob-fg-soft)]">
                            ▤
                          </span>
                        ) : (
                          <span
                            aria-hidden
                            className="inline-grid size-7 place-items-center rounded-full border border-[color:var(--ob-border-strong)] text-[0.85rem]"
                          >
                            +
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* The hover readout carries the split the chart cannot show. */}
              <span className="pointer-events-none absolute right-[13%] top-4 hidden w-[260px] rounded-[var(--ob-radius)] bg-[#1c1c1f] p-5 text-white shadow-[0_8px_24px_rgba(0,0,0,0.25)] xl:block">
                <span className="block text-[1.08rem] font-semibold">Workspace</span>
                <span className="flex items-baseline gap-3 pt-3 text-[1.05rem]">
                  <span className="flex-1 text-white/70">Net change</span>
                  <span className="tabular-nums">−$6.41</span>
                </span>
                <span className="mt-3 grid gap-2 border-t border-white/15 pt-3 text-[1.05rem]">
                  <span className="flex items-baseline gap-3">
                    <span className="h-3.5 w-0.5 bg-[color:var(--ob-success)]" />
                    <span className="flex-1 text-white/70">Money in</span>
                    <span className="tabular-nums">$0.00</span>
                  </span>
                  <span className="flex items-baseline gap-3">
                    <span className="h-3.5 w-0.5 bg-[color:var(--ob-brand)]" />
                    <span className="flex-1 text-white/70">Money out</span>
                    <span className="tabular-nums">−$6.41</span>
                  </span>
                </span>
              </span>
            </div>
          </div>
        </Main>
      </Shell>
    </Surface>
  );
}

function Flow({
  label,
  value,
  color,
}: {
  label: string;
  value: string;
  color: string;
}): ReactNode {
  return (
    <li className="flex items-center gap-3 text-[1.08rem]">
      <span aria-hidden className="h-4 w-0.5" style={{ background: color }} />
      <span className="flex-1">{label}</span>
      <span className="tabular-nums">{value}</span>
    </li>
  );
}

function MonthChart() {
  const width = 800;
  const height = 200;
  const spend = [0, 0.1, 2.6, 6.4, 6.6, 6.7, 6.7, 6.7, 6.7];
  const max = 7;
  const step = width / (spend.length - 1);
  const y = (value: number) => height - (value / max) * height;
  const line = spend
    .map((value, i) => `${i === 0 ? "M" : "L"}${i * step},${y(value)}`)
    .join(" ");

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className="h-[200px] w-full"
      preserveAspectRatio="none"
      role="img"
      aria-label="Money in and out this month"
    >
      <defs>
        <linearGradient id="ob-bank-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#e5457f" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#e5457f" stopOpacity="0.02" />
        </linearGradient>
      </defs>
      <path d={`${line} L${width},${height} L0,${height} Z`} fill="url(#ob-bank-fill)" />
      <path
        d={line}
        fill="none"
        stroke="#e5457f"
        strokeWidth={2.5}
        vectorEffect="non-scaling-stroke"
      />
      {/* Money in never moves, so its line sits flat on the floor. */}
      <line
        x1={0}
        x2={width}
        y1={height - 2}
        y2={height - 2}
        stroke="var(--ob-success)"
        strokeWidth={2}
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}
