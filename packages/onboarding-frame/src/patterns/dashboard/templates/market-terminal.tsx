"use client";

import type { ReactNode } from "react";

import { LineChart } from "../../../ui/charts";
import {
  ArticleIcon,
  BrowsersIcon,
  GlobeIcon,
  GridFourIcon,
  SearchIcon,
  ChartLineIcon,
} from "../../../ui/icons-solid";
import { BrandMark } from "../../../ui/brand";
import { Avatar } from "../../../ui/avatar";
import { cn } from "../../../lib/cn";
import { Surface, terminalTokens } from "./tokens";
import { Main, Shell, Sidebar } from "./chrome";
import type { TemplateProps } from "./props";

export type TerminalPage = "insider" | "markets" | "screener";

export interface MarketTerminalProps extends TemplateProps {
  page?: TerminalPage;
}

const RAIL = ["⌂", "◎", "▤", "🔖", "◉"];

const LARGE = [
  { id: "hlxb", ticker: "HLXB", who: "Chen Bihua", pct: "-160%", value: "+$24,000,000", side: "P" },
  { id: "pltr", ticker: "PLTR", who: "Glazer David A.", pct: "-99%", value: "-$8,904,888", side: "S" },
  { id: "nflx", ticker: "NFLX", who: "SARANDOS THEOD…", pct: "-98%", value: "-$38,707,426", side: "S" },
  { id: "rytm", ticker: "RYTM", who: "Shulman Joseph", pct: "-96%", value: "-$3,680,197", side: "S" },
  { id: "csl", ticker: "CSL", who: "Snyder Lori A", pct: "-93%", value: "-$3,019,567", side: "S" },
];

const PURCHASES = [
  {
    id: "orgs-1",
    ticker: "ORGS",
    name: "Orgenesis Inc",
    insider: "10% Owner",
    date: "2024-02-15",
    price: "$0.32",
    owned: "5,110,100",
    change: "+10,100 (+0.20%)",
    total: "3,331.99",
    lead: true,
  },
  {
    id: "orgs-2",
    ticker: "ORGS",
    name: "Orgenesis Inc",
    insider: "10% Owner",
    date: "2024-02-15",
    price: "$0.58",
    owned: "5,100,000",
    change: "+365,140 (+8%)",
    total: "213,280.11",
  },
  {
    id: "mlys",
    ticker: "MLYS",
    name: "Mineralys Thera…",
    insider: "10% Owner",
    date: "2024-02-15",
    price: "$13.50",
    owned: "5,074,916",
    change: "+555,555 (+12%)",
    total: "7,499,992.50",
  },
  {
    id: "plce",
    ticker: "PLCE",
    name: "Childrens Place I…",
    insider: "10% Owner",
    date: "2024-02-15",
    price: "$15.79",
    owned: "4,663,743",
    change: "+1,566,475 (+51%)",
    total: "24,749,525.35",
  },
  {
    id: "kytx",
    ticker: "KYTX",
    name: "Kyverna Therap…",
    insider: "10% Owner",
    date: "2024-02-15",
    price: "$22.00",
    owned: "583",
    change: "+253,136 (-100%)",
    total: "5,568,992.00",
  },
];

/**
 * Filings arrive in bursts around earnings and lock-up expiries, so the two
 * series are deliberately spiky and uncorrelated rather than smooth trends.
 */
const SALES = [
  12, 18, 14, 42, 16, 20, 55, 19, 22, 17, 45, 21, 16, 19, 24, 20, 62, 23, 27,
  35, 68, 26, 30, 58, 24, 84, 31, 22, 28, 26, 74, 30, 78, 34, 40, 26, 8,
];
const BUYS = [
  30, 24, 22, 26, 20, 21, 25, 19, 18, 16, 20, 17, 19, 22, 24, 21, 26, 34, 24,
  22, 20, 19, 21, 18, 17, 19, 16, 18, 20, 17, 19, 16, 18, 15, 17, 14, 12,
];

/**
 * Dark market terminal.
 *
 * The header keeps the date as a secondary line under the page title, and the
 * filings chart sits on a dotted grid — both details the reference uses to
 * make a very dense page still feel navigable. Trade direction is carried by a
 * one-letter badge rather than a word, which is what lets the row stay on one
 * line at this density.
 */
export function MarketTerminalTemplate({
  brandName = "Acme",
  className,
  page = "insider",
}: MarketTerminalProps) {
  return (
    <Surface tokens={terminalTokens} className={className}>
      <Shell>
        <Sidebar width={72} bg="var(--ob-bg)" className="items-center border-r-0">
          <div className="pb-8 pt-5">
            <Avatar name={brandName} size={26} rounded={7} />
          </div>
          <nav className="grid gap-5">
            {RAIL.map((glyph, index) => (
              <span key={index} className="relative grid place-items-center">
                {index === 1 && (
                  <span className="absolute -left-4 h-6 w-[2px] rounded-full bg-[color:var(--ob-brand)]" />
                )}
                <span
                  aria-hidden
                  className={cn(
                    "text-[1.05rem]",
                    index === 1
                      ? "text-[color:var(--ob-brand)]"
                      : "text-[color:var(--ob-muted)]",
                  )}
                >
                  {glyph}
                </span>
              </span>
            ))}
          </nav>
        </Sidebar>

        <Main className="overflow-auto px-9 py-7">
          <header className="flex items-start gap-4">
            <div className="flex-1">
              <h1 className="text-[2rem] font-bold tracking-[-0.02em]">Analysis</h1>
              <p className="pt-0.5 text-[1.05rem] text-[color:var(--ob-muted)]">
                Thursday, February 15
              </p>
            </div>
            <div className="flex items-center gap-2.5 pt-2">
              <Pill glyph={<GlobeIcon size={14} />}>For you</Pill>
              <Pill glyph={<ArticleIcon size={14} />}>Screener</Pill>
              <SearchIcon size={14} />
            </div>
          </header>

          <div className="mt-8 border-t border-[color:var(--ob-border)]" />

          <nav className="flex gap-9 pt-4">
            {[
              { id: "markets", label: "Markets", Icon: ChartLineIcon },
              { id: "insider", label: "Insider", Icon: BrowsersIcon },
              { id: "events", label: "Events", Icon: GridFourIcon, soon: true },
            ].map((tab) => (
              <span
                key={tab.id}
                className={cn(
                  "flex items-center gap-2 pb-2 text-[0.98rem]",
                  tab.id === page
                    ? "border-t-2 border-[color:var(--ob-brand)] -mt-4 pt-4 font-medium text-[color:var(--ob-fg)]"
                    : "text-[color:var(--ob-muted)]",
                )}
              >
                <tab.Icon size={14} />
                {tab.label}
                {tab.soon && (
                  <span className="rounded-full bg-[color:var(--ob-surface-2)] px-2 py-0.5 text-[0.7rem] text-[color:var(--ob-muted)]">
                    Coming soon
                  </span>
                )}
              </span>
            ))}
          </nav>

          <div className="grid gap-5 pt-6 lg:grid-cols-2">
            <section className="rounded-[var(--ob-radius)] border border-[color:var(--ob-border)] bg-[color:var(--ob-surface)] p-6">
              <div className="flex items-center gap-6">
                <h2 className="flex-1 text-[1.15rem] font-semibold">
                  Large transactions
                </h2>
                <span className="text-[0.92rem] font-semibold">Officer</span>
                <span className="text-[0.92rem] text-[color:var(--ob-muted)]">
                  Director
                </span>
              </div>

              <ul className="pt-5">
                {LARGE.map((row) => (
                  <li
                    key={row.id}
                    className="flex items-center gap-3 border-b border-[color:var(--ob-border)] py-2.5 last:border-b-0"
                  >
                    <BrandMark brand={row.ticker} size={22} />
                    <span className="w-14 shrink-0 font-semibold">{row.ticker}</span>
                    <span className="min-w-0 flex-1 truncate text-[0.95rem] text-[color:var(--ob-fg-soft)]">
                      {row.who}
                    </span>
                    <span className="shrink-0 text-[0.92rem] tabular-nums text-[color:var(--ob-danger)]">
                      {row.pct}
                    </span>
                    <span className="w-[8.5rem] shrink-0 text-right text-[0.95rem] tabular-nums">
                      {row.value}
                    </span>
                    <SideBadge side={row.side} />
                  </li>
                ))}
              </ul>
            </section>

            <section className="rounded-[var(--ob-radius)] border border-[color:var(--ob-border)] bg-[color:var(--ob-surface)] p-6">
              <div className="flex items-center gap-5">
                <h2 className="flex-1 text-[1.15rem] font-semibold">Daily filings</h2>
                <Legend color="#f4f4f5">Purchases</Legend>
                <Legend color="#f2555a">Sales</Legend>
              </div>

              {/* Dotted plot grid, as in the reference — it reads as a terminal. */}
              <div
                className="mt-5 rounded-[var(--ob-radius-sm)]"
                style={{
                  backgroundImage:
                    "radial-gradient(circle at center, rgba(255,255,255,0.07) 1px, transparent 1px)",
                  backgroundSize: "14px 14px",
                }}
              >
                <LineChart
                  height={195}
                  gridLines={0}
                  series={[
                    { id: "sales", points: SALES, color: "#f2555a" },
                    { id: "buys", points: BUYS, color: "#f4f4f5" },
                  ]}
                />
              </div>

              <div className="flex items-center gap-6 pt-4 text-[0.92rem]">
                {["1M", "3M", "6M", "YTD", "All"].map((range) => (
                  <span
                    key={range}
                    className={cn(
                      range === "6M"
                        ? "border-t-2 border-[color:var(--ob-brand)] pt-1 font-medium"
                        : "pt-1 text-[color:var(--ob-muted)]",
                    )}
                  >
                    {range}
                  </span>
                ))}
                <span className="ml-auto text-[0.88rem] text-[color:var(--ob-muted)]">
                  Chart updated daily
                </span>
              </div>
            </section>
          </div>

          <h2 className="pb-4 pt-9 text-[1.35rem] font-semibold text-[color:var(--ob-fg-soft)]">
            Latest insider purchases
          </h2>

          <div className="min-w-0 overflow-x-auto">
            <table className="w-full min-w-[1080px] border-collapse text-[0.92rem]">
              <thead>
                <tr className="text-[0.85rem] text-[color:var(--ob-muted)]">
                  <th className="border-b border-[color:var(--ob-border)] px-4 py-3 text-left font-normal">
                    Company name
                  </th>
                  <th className="border-b border-[color:var(--ob-border)] px-4 py-3 text-left font-normal">
                    Trade type
                  </th>
                  <th className="border-b border-[color:var(--ob-border)] px-4 py-3 text-left font-normal">
                    Insider
                  </th>
                  <th className="border-b border-[color:var(--ob-border)] px-4 py-3 text-right font-normal">
                    Date
                  </th>
                  <th className="border-b border-[color:var(--ob-border)] px-4 py-3 text-right font-normal">
                    Price
                  </th>
                  <th className="border-b border-[color:var(--ob-border)] px-4 py-3 text-right font-normal">
                    Owned
                  </th>
                  <th className="border-b border-[color:var(--ob-border)] px-4 py-3 text-right font-normal">
                    Change
                  </th>
                  <th className="border-b border-[color:var(--ob-border)] px-4 py-3 text-right font-normal">
                    Total value
                  </th>
                  <th className="border-b border-[color:var(--ob-border)] px-4 py-3 text-right font-normal">
                    &lt;/&gt;
                  </th>
                </tr>
              </thead>
              <tbody>
                {PURCHASES.map((row) => (
                  <tr
                    key={row.id}
                    className={cn(
                      row.lead
                        ? "bg-[color:var(--ob-surface-2)] [&>td:first-child]:rounded-l-[var(--ob-radius-sm)] [&>td:last-child]:rounded-r-[var(--ob-radius-sm)]"
                        : "",
                    )}
                  >
                    <td className="border-b border-[color:var(--ob-border)] px-4 py-3.5">
                      <span className="flex items-center gap-2.5">
                        <BrandMark brand={row.ticker} size={22} />
                        <span className="font-semibold">{row.ticker}</span>
                        <span className="truncate text-[color:var(--ob-muted)]">
                          {row.name}
                        </span>
                      </span>
                    </td>
                    <td className="border-b border-[color:var(--ob-border)] px-4 py-3.5">
                      <span className="rounded-[6px] bg-[color-mix(in_oklab,#4ade80_16%,transparent)] px-2.5 py-1 text-[0.82rem] text-[#7ae0a5]">
                        Purchase
                      </span>
                    </td>
                    <td className="border-b border-[color:var(--ob-border)] px-4 py-3.5 font-medium">
                      {row.insider}
                    </td>
                    <td className="border-b border-[color:var(--ob-border)] px-4 py-3.5 text-right tabular-nums text-[color:var(--ob-fg-soft)]">
                      {row.date}
                    </td>
                    <td className="border-b border-[color:var(--ob-border)] px-4 py-3.5 text-right tabular-nums">
                      {row.price}
                    </td>
                    <td className="border-b border-[color:var(--ob-border)] px-4 py-3.5 text-right tabular-nums">
                      {row.owned}
                    </td>
                    <td className="border-b border-[color:var(--ob-border)] px-4 py-3.5 text-right tabular-nums text-[color:var(--ob-fg-soft)]">
                      {row.change}
                    </td>
                    <td className="border-b border-[color:var(--ob-border)] px-4 py-3.5 text-right font-semibold tabular-nums">
                      {row.total}
                    </td>
                    <td className="border-b border-[color:var(--ob-border)] px-4 py-3.5 text-right">
                      <SideBadge side="P" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Main>
      </Shell>
    </Surface>
  );
}

function Pill({ children, glyph }: { children: string; glyph?: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-[color:var(--ob-border-strong)] bg-[color:var(--ob-surface)] px-4 py-2 text-[0.92rem] font-medium">
      <span aria-hidden className="text-[color:var(--ob-muted)]">
        {glyph}
      </span>
      {children}
    </span>
  );
}

function Legend({ children, color }: { children: string; color: string }) {
  return (
    <span className="flex items-center gap-2 text-[0.92rem] text-[color:var(--ob-fg-soft)]">
      <span aria-hidden className="size-2 rounded-full" style={{ background: color }} />
      {children}
    </span>
  );
}

function SideBadge({ side }: { side: string }) {
  const buy = side === "P";
  return (
    <span
      className={cn(
        "grid size-[18px] shrink-0 place-items-center rounded-full text-[0.65rem] font-bold",
        buy
          ? "bg-[color-mix(in_oklab,#4ade80_22%,transparent)] text-[#7ae0a5]"
          : "bg-[color-mix(in_oklab,#f2555a_20%,transparent)] text-[#ff8b8f]",
      )}
    >
      {side}
    </span>
  );
}
