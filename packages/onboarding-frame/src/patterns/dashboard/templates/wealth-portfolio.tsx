"use client";

import type { ReactNode } from "react";
import { Sparkline } from "../../../ui/charts";
import {
  ArticleIcon,
  BrowsersIcon,
  CardIcon,
  ChartPieIcon,
  GlobeIcon,
  GridFourIcon,
  HouseIcon,
  SparkleIcon,
  TrendUpIcon,
} from "../../../ui/icons-solid";
import { cn } from "../../../lib/cn";
import { AvatarSlot, LogoSlot, Placeholder, WordmarkSlot } from "../../../ui/placeholder";
import { Surface, wealthTokens } from "./tokens";
import { Main, NavItem, Shell, Sidebar } from "./chrome";
import type { TemplateProps } from "./props";

export type WealthPage = "overview" | "holdings";

export interface WealthPortfolioProps extends TemplateProps {
  page?: WealthPage;
}

const NAV = [
  { id: "home", label: "Home", Icon: HouseIcon },
  { id: "spending", label: "Spending", Icon: CardIcon },
  { id: "portfolio", label: "Portfolio", Icon: ChartPieIcon },
  { id: "invest", label: "Invest", Icon: TrendUpIcon },
  { id: "advice", label: "Advice", Icon: GlobeIcon },
  { id: "estate", label: "Estate Planning", Icon: ArticleIcon },
  { id: "equity", label: "Equity", Icon: BrowsersIcon },
  { id: "tax", label: "Tax", Icon: GridFourIcon },
];

const ACCOUNTS = [
  { id: "exchange", name: "Exchange", when: "56 seconds ago", value: "$3.42", change: "+5.99%" },
  { id: "manual", name: "me", when: "23 hours ago", value: "$0.00" },
];

const HOLDINGS = [
  { id: "near", ticker: "NEAR", name: "NEAR Protocol", value: "$1.98", change: "6.5%" },
  { id: "btc", ticker: "BTC", name: "Bitcoin", value: "$1.44", change: "5.27%" },
];

const RANGES = ["1W", "1M", "3M", "6M", "YTD", "1Y"];

/**
 * A three-dollar portfolio funded yesterday: flat at zero for the whole window
 * and then near-vertical. The axis is kept on the right, as in the reference,
 * so the eye lands on the current value rather than on the empty stretch.
 */
const BALANCE = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.2, 3.1, 3.4, 3.42];

/**
 * Wealth portfolio overview.
 *
 * Monospace small-caps card headers are the whole identity of this surface, so
 * they are bound as the display face and applied to section labels rather than
 * to headings. The promotional card is a full-bleed colour block inside a
 * neutral column — it is the only saturated thing on the page, which is what
 * makes it read as an offer rather than as data.
 */
export function WealthPortfolioTemplate({
  className,
  page = "overview",
}: WealthPortfolioProps) {
  return (
    <Surface tokens={wealthTokens} className={className}>
      <Shell>
        <Sidebar width={358} bg="var(--ob-bg)" className="border-r-0">
          <div className="px-7 pb-7 pt-6">
            <WordmarkSlot width={150} height={30} label="" />
          </div>
          <nav className="grid gap-1 px-4">
            {NAV.map((item) => (
              <NavItem
                key={item.id}
                label={item.label}
                glyph={<item.Icon size={14} />}
                active={item.id === "portfolio"}
                className="rounded-[var(--ob-radius-sm)] px-4 py-3 text-[1.12rem]"
              />
            ))}
          </nav>
        </Sidebar>

        <Main className="overflow-auto px-8 py-6">
          <header className="flex flex-wrap items-center gap-3">
            <h1 className="flex-1 text-[2rem] font-bold tracking-[-0.01em]">Portfolio</h1>
            <span className="flex items-center gap-2 rounded-full bg-[color:var(--ob-cta-bg)] px-5 py-2.5 text-[1rem] font-semibold text-[color:var(--ob-cta-fg)]">
              <span aria-hidden>🎁</span> Get $25
            </span>
            <span
              className="flex items-center gap-2 rounded-full border border-[color:var(--ob-border-strong)] px-5 py-2.5 text-[0.95rem] font-medium uppercase tracking-wide"
              style={{ fontFamily: "var(--ob-font-display)" }}
            >
              <span aria-hidden>+</span> Account
            </span>
            <span aria-hidden className="px-1 text-[1.15rem]">
              ?
            </span>
            <span className="relative" aria-hidden>
              ⌾
              <span className="absolute -right-0.5 -top-0.5 size-2 rounded-full bg-[#e5484d]" />
            </span>
            <AvatarSlot size={38} />
          </header>

          <nav className="flex gap-2 pt-5">
            {[
              { id: "overview", label: "Overview" },
              { id: "holdings", label: "Holdings" },
            ].map((tab) => (
              <span
                key={tab.id}
                className={cn(
                  "rounded-full px-5 py-2.5 text-[1.05rem]",
                  tab.id === page
                    ? "bg-[color:var(--ob-surface-3)] font-semibold"
                    : "text-[color:var(--ob-fg-soft)]",
                )}
              >
                {tab.label}
              </span>
            ))}
          </nav>

          <div className="grid gap-5 pt-5 lg:grid-cols-[minmax(0,0.45fr)_minmax(0,1fr)]">
            <div className="grid content-start gap-5">
              <Card>
                <div className="flex items-center gap-3 pb-4">
                  <MonoLabel className="flex-1">Accounts</MonoLabel>
                  <span
                    className="rounded-full border border-[color:var(--ob-border-strong)] px-5 py-2 text-[0.9rem] font-medium uppercase tracking-wide"
                    style={{ fontFamily: "var(--ob-font-display)" }}
                  >
                    Add
                  </span>
                </div>

                <div className="border-t border-[color:var(--ob-border)] pt-4">
                  <p className="pb-3 text-[1.1rem]">Investments</p>
                  <ul className="grid gap-4">
                    {ACCOUNTS.map((account) => (
                      <li key={account.id} className="flex items-center gap-3.5">
                        <LogoSlot size={44} label="" radius={22} />
                        <span className="min-w-0 flex-1">
                          <span className="block text-[1.1rem] font-semibold">
                            {account.name}
                          </span>
                          <span className="block text-[0.95rem] text-[color:var(--ob-muted)]">
                            • {account.when}
                          </span>
                        </span>
                        <span className="text-right">
                          <span className="block text-[1.1rem] font-semibold tabular-nums">
                            {account.value}
                          </span>
                          {account.change && (
                            <span className="block text-[0.95rem] tabular-nums text-[color:var(--ob-success)]">
                              {account.change} ↗
                            </span>
                          )}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>

              <section className="rounded-[var(--ob-radius-lg)] bg-[#dfe9c2] p-7">
                <h2 className="text-[1.5rem] font-bold tracking-[-0.01em]">
                  High interest is in your interest
                </h2>
                <p className="max-w-[36ch] pt-3 text-[1.08rem] leading-relaxed">
                  Earn 4.08% APY on your cash savings, with no fees or minimums.
                </p>
                <div className="flex items-center gap-6 pt-6">
                  <span
                    className="rounded-full bg-[color:var(--ob-cta-bg)] px-6 py-3.5 text-[0.95rem] font-semibold uppercase tracking-wide text-[color:var(--ob-cta-fg)]"
                    style={{ fontFamily: "var(--ob-font-display)" }}
                  >
                    Start saving
                  </span>
                  <span
                    className="text-[0.95rem] font-semibold uppercase tracking-wide underline"
                    style={{ fontFamily: "var(--ob-font-display)" }}
                  >
                    Hide
                  </span>
                  <span className="ml-auto">
                    <Placeholder width={72} height={56} radius={10} label="" />
                  </span>
                </div>
              </section>

              <Card>
                <MonoLabel>Question of the day</MonoLabel>
                <div className="border-t border-[color:var(--ob-border)] pt-5">
                  <h2 className="text-[1.5rem] font-bold leading-snug tracking-[-0.01em]">
                    How did my investments perform over the last 3 months?
                  </h2>
                  <span className="mt-5 flex items-center justify-center gap-2.5 rounded-full border border-[color:var(--ob-border-strong)] py-3.5 text-[0.95rem] font-semibold uppercase tracking-wide"
                    style={{ fontFamily: "var(--ob-font-display)" }}
                  >
                    <SparkleIcon size={14} /> Ask sidekick
                  </span>
                </div>
              </Card>

              <Card>
                <MonoLabel>Recent activity</MonoLabel>
              </Card>
            </div>

            <div className="grid content-start gap-5">
              <Card>
                <div className="flex items-center gap-3">
                  <MonoLabel className="flex-1">Portfolio</MonoLabel>
                  <span className="inline-flex overflow-hidden rounded-[var(--ob-radius-sm)] border border-[color:var(--ob-border-strong)]">
                    <span className="bg-[color:var(--ob-surface-2)] px-3 py-2 text-[0.9rem]">
                      📈
                    </span>
                    <span className="border-l border-[color:var(--ob-border)] px-3 py-2 text-[0.9rem] text-[color:var(--ob-muted)]">
                      ◠
                    </span>
                  </span>
                </div>

                <p className="flex items-center gap-1.5 pt-5 text-[1.05rem] text-[color:var(--ob-fg-soft)]">
                  Total balance <InfoDot />
                </p>
                <p className="pt-1 text-[2.2rem] font-bold leading-none tabular-nums">$3</p>
                <p className="pt-1.5 text-[1rem] tabular-nums text-[color:var(--ob-success)]">
                  $0 (5.74%)
                </p>

                <BalanceChart />

                <div className="flex items-center justify-center gap-8 pt-5">
                  {RANGES.map((range) => (
                    <span
                      key={range}
                      className={cn(
                        "text-[1.02rem]",
                        range === "1M"
                          ? "rounded-full border border-[color:var(--ob-border-strong)] px-5 py-2.5 font-medium"
                          : "text-[color:var(--ob-fg-soft)]",
                      )}
                    >
                      {range}
                    </span>
                  ))}
                </div>
              </Card>

              <Card>
                <div className="flex items-center gap-3 pb-5">
                  <MonoLabel className="flex-1">Holdings</MonoLabel>
                  <span
                    className="rounded-full border border-[color:var(--ob-border-strong)] px-5 py-2 text-[0.9rem] font-medium uppercase tracking-wide"
                    style={{ fontFamily: "var(--ob-font-display)" }}
                  >
                    See all holdings
                  </span>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="rounded-[var(--ob-radius)] border border-[color:var(--ob-border)] p-5">
                    <h3 className="pb-4 text-[1.1rem] font-semibold">Total Value</h3>
                    <ul className="grid gap-4">
                      {HOLDINGS.map((holding) => (
                        <li key={holding.id} className="flex items-center gap-3">
                          <LogoSlot size={38} label="" radius={19} />
                          <span className="min-w-0 flex-1">
                            <span className="block text-[1.05rem] font-semibold">
                              {holding.ticker}
                            </span>
                            <span className="block text-[0.92rem] text-[color:var(--ob-muted)]">
                              {holding.name}
                            </span>
                          </span>
                          <span className="text-[1.05rem] tabular-nums">
                            {holding.value}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="rounded-[var(--ob-radius)] border border-[color:var(--ob-border)] p-5">
                    <h3 className="pb-4 text-[1.1rem] font-semibold">Top Movers</h3>
                    <ul className="grid gap-4">
                      {HOLDINGS.map((holding) => (
                        <li key={holding.id} className="flex items-center gap-3">
                          <LogoSlot size={38} label="" radius={19} />
                          <span className="min-w-0 flex-1">
                            <span className="block text-[1.05rem] font-semibold">
                              {holding.ticker}
                            </span>
                            <span className="block text-[0.92rem] text-[color:var(--ob-muted)]">
                              {holding.name}
                            </span>
                          </span>
                          <span className="w-20 shrink-0">
                            <Sparkline
                              points={[0, 0, 0, 0, 0, 1, 3]}
                              color="var(--ob-success)"
                              height={26}
                            />
                          </span>
                          <span className="rounded-full bg-[color-mix(in_oklab,#1f9d55_14%,transparent)] px-2.5 py-1 text-[0.9rem] tabular-nums text-[color:var(--ob-success)]">
                            {holding.change}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </Main>
      </Shell>
    </Surface>
  );
}

function Card({ children }: { children: ReactNode }) {
  return (
    <section className="rounded-[var(--ob-radius-lg)] bg-[color:var(--ob-surface)] p-6">
      {children}
    </section>
  );
}

function MonoLabel({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <h2
      className={cn(
        "text-[0.95rem] font-medium uppercase tracking-[0.08em] text-[color:var(--ob-fg-soft)]",
        className,
      )}
      style={{ fontFamily: "var(--ob-font-display)" }}
    >
      {children}
    </h2>
  );
}

function InfoDot(): ReactNode {
  return (
    <span
      aria-hidden
      className="grid size-[15px] shrink-0 place-items-center rounded-full border border-[color:var(--ob-border-strong)] text-[0.6rem] text-[color:var(--ob-muted)]"
    >
      i
    </span>
  );
}

/** Right-hand axis and dotted gridlines, both specific to this surface. */
function BalanceChart() {
  const width = 900;
  const height = 300;
  const max = 3.6;
  const step = width / (BALANCE.length - 1);
  const y = (value: number) => height - (value / max) * height;
  const line = BALANCE.map(
    (value, i) => `${i === 0 ? "M" : "L"}${i * step},${y(value)}`,
  ).join(" ");
  const area = `${line} L${width},${height} L0,${height} Z`;

  return (
    <div className="flex gap-4 pt-6">
      <div className="min-w-0 flex-1">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="h-[300px] w-full"
          preserveAspectRatio="none"
          role="img"
          aria-label="Total balance over the last month"
        >
          <defs>
            <linearGradient id="ob-wealth-fill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--ob-success)" stopOpacity="0.28" />
              <stop offset="100%" stopColor="var(--ob-success)" stopOpacity="0" />
            </linearGradient>
          </defs>
          {[0, 1, 2, 3, 4].map((index) => (
            <line
              key={index}
              x1={0}
              x2={width}
              y1={(height / 4) * index}
              y2={(height / 4) * index}
              stroke="var(--ob-border)"
              strokeWidth={1}
              strokeDasharray="2 6"
              vectorEffect="non-scaling-stroke"
            />
          ))}
          <path d={area} fill="url(#ob-wealth-fill)" />
          <path
            d={line}
            fill="none"
            stroke="var(--ob-success)"
            strokeWidth={2.5}
            vectorEffect="non-scaling-stroke"
          />
          <circle
            cx={width}
            cy={y(BALANCE[BALANCE.length - 1]!)}
            r={6}
            fill="var(--ob-success)"
          />
        </svg>
      </div>

      <div
        className="grid shrink-0 text-[0.9rem] tabular-nums text-[color:var(--ob-muted)]"
        style={{ fontFamily: "var(--ob-font-display)" }}
      >
        {["$3.6", "$2.7", "$1.8", "$0.9", "$0"].map((tick, index) => (
          <span
            key={tick}
            className={cn("leading-none", index > 0 && "mt-[calc((300px/4)-0.8em)]")}
          >
            {tick}
          </span>
        ))}
      </div>
    </div>
  );
}
