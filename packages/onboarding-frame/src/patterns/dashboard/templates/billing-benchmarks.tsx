"use client";

import type { ReactNode } from "react";
import { cn } from "../../../lib/cn";
import { LogoSlot, Placeholder } from "../../../ui/placeholder";
import { Surface, benchmarkTokens } from "./tokens";
import { Main, NavItem, NavSection, Shell, Sidebar } from "./chrome";
import type { TemplateProps } from "./api-console";

export type BenchmarkPage = "benchmarking" | "overview" | "revenue" | "churn";

export interface BillingBenchmarksProps extends TemplateProps {
  page?: BenchmarkPage;
}

const NAV = [
  { id: "home", label: "Home", glyph: "⌂" },
  { id: "balances", label: "Balances", glyph: "▤" },
  { id: "transactions", label: "Transactions", glyph: "⇄" },
  { id: "customers", label: "Customers", glyph: "👤" },
  { id: "catalogue", label: "Product catalogue", glyph: "📦" },
];

const BILLING = [
  { id: "overview", label: "Overview" },
  { id: "subscriptions", label: "Subscriptions" },
  { id: "invoices", label: "Invoices" },
  { id: "meters", label: "Meters" },
  { id: "recovery", label: "Revenue recovery" },
];

/**
 * Peer bands, not series.
 *
 * Each panel plots a shaded range for comparable companies with the median
 * inside it, and your own value as a flat line pinned wherever it falls. A
 * customer with no revenue sits on the floor of every chart — which is why the
 * percentile chips disagree so violently: 1st on lifetime value, 99th on churn,
 * because churning nobody is trivially perfect when you have nobody.
 */
const PANELS = [
  {
    id: "mrr-growth",
    title: "MRR growth rate",
    percentile: "48th percentile",
    good: false,
    value: "0%",
    median: "0% median",
    top: "8.0%",
    bottom: "-4.0%",
    // Your line sits mid-band here, which is why the chip is neutral-amber.
    yours: 0.5,
    yoursColor: "#3fa66a",
    band: [0.74, 0.7, 0.66, 0.63, 0.62, 0.6, 0.58, 0.6, 0.57, 0.59, 0.62, 0.6],
    medianLine: [0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5],
  },
  {
    id: "ltv",
    title: "Subscriber LTV",
    percentile: "1st percentile",
    good: false,
    value: "US$0",
    median: "US$299.04 median",
    top: "US$694",
    bottom: "US$0",
    yours: 0,
    yoursColor: "#e5772d",
    band: [0.78, 0.82, 0.84, 0.83, 0.85, 0.86, 0.84, 0.86, 0.85, 0.87, 0.86, 0.86],
    medianLine: [0.5, 0.54, 0.56, 0.55, 0.57, 0.58, 0.56, 0.58, 0.57, 0.59, 0.58, 0.58],
  },
  {
    id: "net-churn",
    title: "Net MRR churn rate",
    percentile: "92nd percentile",
    good: true,
    value: "0%",
    median: "3.8% median",
    top: "12.0%",
    bottom: "0.0%",
    yours: 0,
    yoursColor: "#3fa66a",
    band: [0.68, 0.64, 0.62, 0.63, 0.61, 0.6, 0.58, 0.6, 0.59, 0.6, 0.61, 0.6],
    medianLine: [0.34, 0.32, 0.31, 0.32, 0.3, 0.29, 0.28, 0.3, 0.29, 0.3, 0.31, 0.3],
  },
  {
    id: "sub-churn",
    title: "Subscriber churn rate",
    percentile: "99th percentile",
    good: true,
    value: "0%",
    median: "4.8% median",
    top: "12.0%",
    bottom: "0.0%",
    yours: 0,
    yoursColor: "#3fa66a",
    band: [0.72, 0.66, 0.64, 0.65, 0.63, 0.62, 0.6, 0.62, 0.61, 0.62, 0.63, 0.62],
    medianLine: [0.4, 0.36, 0.34, 0.35, 0.33, 0.32, 0.3, 0.32, 0.31, 0.32, 0.33, 0.32],
  },
];

const FILTERS = [
  { id: "arr", label: "ARR", you: "You: US$0", value: "Less than $100K" },
  { id: "arpu", label: "ARPU", you: "You: US$0", value: "Less than $50" },
  { id: "model", label: "Business model", value: "B2C" },
];

/**
 * Billing benchmarks.
 *
 * The panels are separated by hairlines rather than made into cards, which is
 * what lets four charts sit together without the page turning into a grid of
 * boxes.
 */
export function BillingBenchmarksTemplate({
  className,
  page = "benchmarking",
}: BillingBenchmarksProps) {
  return (
    <Surface tokens={benchmarkTokens} className={className}>
      <Shell>
        <Sidebar width={320} bg="var(--ob-surface)">
          <div className="flex items-center gap-2.5 px-5 pb-4 pt-4">
            <LogoSlot size={30} label="" radius={7} />
            <span className="text-[1.1rem] font-bold">Content-acme</span>
          </div>

          <nav className="grid gap-0.5 px-3">
            {NAV.map((item) => (
              <NavItem key={item.id} label={item.label} glyph={item.glyph} />
            ))}
          </nav>

          <NavSection label="Shortcuts" />
          <nav className="grid gap-0.5 px-3">
            <NavItem label="Billing overview" glyph="🕐" />
          </nav>

          <NavSection label="Products" />
          <nav className="grid gap-0.5 px-3">
            <NavItem
              label="Payments"
              glyph="▭"
              trailing={
                <span aria-hidden className="text-[0.7rem] opacity-50">
                  ⌄
                </span>
              }
            />
            <NavItem
              label="Billing"
              glyph="▥"
              className="text-[color:var(--ob-brand)]"
              trailing={
                <span aria-hidden className="text-[0.7rem] opacity-50">
                  ⌃
                </span>
              }
            />
            {BILLING.map((item) => (
              <NavItem
                key={item.id}
                label={item.label}
                indent
                active={item.id === "overview"}
                className={cn(
                  item.id === "overview" &&
                    "bg-transparent font-semibold text-[color:var(--ob-brand)]",
                )}
              />
            ))}
            <NavItem
              label="Reporting"
              glyph="▦"
              trailing={
                <span aria-hidden className="text-[0.7rem] opacity-50">
                  ⌄
                </span>
              }
            />
            <NavItem
              label="More"
              glyph="···"
              trailing={
                <span aria-hidden className="text-[0.7rem] opacity-50">
                  ⌄
                </span>
              }
            />
          </nav>

          <nav className="mt-auto grid gap-0.5 px-3 pb-5">
            <NavItem label="Developers" glyph="❯_" />
          </nav>
        </Sidebar>

        <Main className="overflow-auto">
          {page === "overview" ? (
            <MerchantOverview />
          ) : (
          <>
          <header className="flex h-16 shrink-0 items-center gap-4 px-6">
            <div className="flex w-full max-w-[760px] items-center gap-2.5 rounded-[var(--ob-radius)] bg-[color:var(--ob-surface-2)] px-4 py-2.5 text-[0.98rem] text-[color:var(--ob-muted)]">
              <span aria-hidden>⌕</span> Search
            </div>
            <span className="ml-auto flex items-center gap-3">
              <span className="text-[0.98rem] font-medium">Test mode</span>
              {/* Off: the account is looking at live numbers. */}
              <span className="grid h-6 w-11 items-center rounded-full bg-[color:var(--ob-surface-3)] px-1">
                <span className="size-4 rounded-full bg-[color:var(--ob-surface)] shadow-[0_1px_2px_rgba(0,0,0,0.2)]" />
              </span>
              {["▦", "?", "⌾", "⚙"].map((glyph) => (
                <span key={glyph} aria-hidden className="text-[color:var(--ob-fg-soft)]">
                  {glyph}
                </span>
              ))}
              <span
                aria-hidden
                className="grid size-8 place-items-center rounded-full bg-[color:var(--ob-brand)] text-white"
              >
                +
              </span>
            </span>
          </header>

          <div className="px-8 pb-8">
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="flex-1 text-[2rem] font-bold tracking-[-0.01em]">
                Billing overview
              </h1>
              <span className="rounded-[var(--ob-radius)] bg-[color:var(--ob-brand)] px-4 py-2 text-[0.98rem] font-semibold text-white">
                + Create
              </span>
              <span className="flex items-center gap-2 rounded-[var(--ob-radius)] border border-[color:var(--ob-border-strong)] px-4 py-2 text-[0.98rem] font-medium">
                <span aria-hidden>💬</span> Give feedback
              </span>
              <span aria-hidden className="text-[color:var(--ob-muted)]">
                ···
              </span>
            </div>

            <nav className="flex gap-7 border-b border-[color:var(--ob-border)] pt-5">
              {[
                { id: "revenue", label: "Revenue" },
                { id: "subscribers", label: "Subscribers" },
                { id: "trials", label: "Trials" },
                { id: "churn", label: "Churn" },
                { id: "collections", label: "Collections" },
                { id: "benchmarking", label: "Benchmarking", preview: true },
              ].map((tab) => (
                <span
                  key={tab.id}
                  className={cn(
                    "-mb-px flex items-center gap-2.5 pb-3 text-[1.02rem]",
                    tab.id === page
                      ? "border-b-2 border-[color:var(--ob-brand)] font-semibold text-[color:var(--ob-brand)]"
                      : "text-[color:var(--ob-fg-soft)]",
                  )}
                >
                  {tab.label}
                  {tab.preview && (
                    <span className="rounded-[4px] border border-[color:var(--ob-border-strong)] px-1.5 py-0.5 text-[0.82rem] font-normal text-[color:var(--ob-fg-soft)]">
                      Preview
                    </span>
                  )}
                </span>
              ))}
            </nav>

            <p className="pt-5 text-[1.05rem] text-[color:var(--ob-fg-soft)]">
              Compare your key performance metrics against similar companies using the
              platform to power their subscription business.
            </p>

            <div className="grid gap-5 pt-4 sm:grid-cols-3">
              {FILTERS.map((filter) => (
                <div key={filter.id}>
                  <p className="flex items-center gap-1.5 pb-1.5 text-[0.98rem]">
                    <span className="flex items-center gap-1.5 font-semibold">
                      {filter.label}
                      <InfoDot />
                    </span>
                    {filter.you && (
                      <span className="ml-auto text-[color:var(--ob-muted)]">
                        {filter.you}
                      </span>
                    )}
                  </p>
                  <span className="flex items-center gap-3 rounded-[var(--ob-radius)] border border-[color:var(--ob-border-strong)] px-3.5 py-2.5 text-[1rem]">
                    <span className="flex-1">{filter.value}</span>
                    <span aria-hidden className="text-[0.7rem] opacity-60">
                      ⌃⌄
                    </span>
                  </span>
                </div>
              ))}
            </div>

            {/* Hairlines instead of card borders keep four charts readable. */}
            <div className="mt-6 grid border-t border-[color:var(--ob-border)] lg:grid-cols-2">
              {PANELS.map((panel, index) => (
                <section
                  key={panel.id}
                  className={cn(
                    "border-b border-[color:var(--ob-border)] py-6",
                    index % 2 === 0 ? "lg:pr-8" : "lg:border-l lg:pl-8",
                  )}
                >
                  <div className="flex flex-wrap items-center gap-3">
                    <h2 className="flex items-center gap-2 text-[1.25rem] font-bold">
                      {panel.title}
                      <InfoDot />
                    </h2>
                    <span
                      className={cn(
                        "rounded-[4px] px-2 py-1 text-[0.92rem] font-semibold",
                        panel.good
                          ? "bg-[color-mix(in_oklab,#3fa66a_18%,transparent)] text-[#2b7a4b]"
                          : "bg-[color-mix(in_oklab,#e5a92d_24%,transparent)] text-[#8a6212]",
                      )}
                    >
                      {panel.percentile}
                    </span>
                  </div>

                  <p className="pt-2 text-[1.35rem] font-bold">
                    {panel.value}{" "}
                    <span className="text-[1.02rem] font-normal text-[color:var(--ob-muted)]">
                      {panel.median}
                    </span>
                  </p>

                  <BandChart panel={panel} />
                </section>
              ))}
            </div>
          </div>
          </>
          )}
        </Main>
      </Shell>
    </Surface>
  );
}

const NAV_TABS = [
  "Home",
  "Payments",
  "Balances",
  "Customers",
  "Products",
  "Billing",
  "Reports",
  "Connect",
];

/**
 * Merchant overview.
 *
 * The chrome flips from a sidebar to a horizontal nav on this surface, which
 * is a real difference between the two products' shells rather than a styling
 * choice — so the page rebuilds its own header instead of reusing the one
 * above.
 *
 * Two details are kept because they carry meaning: the payments widget is a
 * grey panel reading "only available for live data" (the account is in test
 * mode), and the growth chips read "+∞" because the previous period was
 * exactly zero. A percentage would be a lie there.
 */
function MerchantOverview() {
  return (
    <div className="relative">
      <div className="flex h-14 shrink-0 items-center gap-4 border-b border-[color:var(--ob-border)] px-6">
        <span className="flex items-center gap-2.5 text-[1rem] font-medium">
          <span aria-hidden>▤</span> Jane
          <span aria-hidden className="text-[0.7rem] opacity-60">
            ⌄
          </span>
        </span>
        <span className="flex items-center gap-2 rounded-full bg-[color-mix(in_oklab,#e5484d_12%,transparent)] px-3.5 py-1.5 text-[0.95rem] font-medium text-[#b3363a]">
          Action required <span aria-hidden>⚠</span>
        </span>
        <span className="mx-auto flex w-full max-w-[560px] items-center gap-2.5 rounded-[var(--ob-radius)] bg-[color:var(--ob-surface-2)] px-4 py-2 text-[0.98rem] text-[color:var(--ob-muted)]">
          <span aria-hidden>⌕</span> Search…
        </span>
        <span className="flex items-center gap-4 text-[0.98rem]">
          <span className="flex items-center gap-5 rounded-[var(--ob-radius)] border border-[color:var(--ob-border-strong)] px-3.5 py-1.5 font-medium">
            Create
            <span aria-hidden className="text-[0.7rem] opacity-60">
              ⌄
            </span>
          </span>
          <span className="flex items-center gap-1.5">
            <span aria-hidden>?</span> Help
          </span>
          {["⌾", "⚙", "👤"].map((glyph) => (
            <span key={glyph} aria-hidden className="text-[color:var(--ob-fg-soft)]">
              {glyph}
            </span>
          ))}
        </span>
      </div>

      <div className="flex h-14 shrink-0 items-center gap-6 border-b-2 border-[#f6821f] px-6">
        {NAV_TABS.map((tab, index) => (
          <span
            key={tab}
            className={cn(
              "text-[1rem]",
              index === 0
                ? "rounded-full bg-[color:var(--ob-brand)] px-4 py-1.5 font-semibold text-white"
                : "font-medium text-[color:var(--ob-fg-soft)]",
            )}
          >
            {tab}
          </span>
        ))}
        <span className="flex items-center gap-1.5 text-[1rem] font-medium text-[color:var(--ob-fg-soft)]">
          More <span aria-hidden className="text-[0.7rem] opacity-60">⌄</span>
        </span>
        <span className="ml-auto flex items-center gap-4 text-[1rem] font-medium">
          <span>Developers</span>
          <span className="text-[#c2410c]">Test mode</span>
          {/* On: the orange knob sits right. */}
          <span className="grid h-6 w-11 justify-items-end rounded-full bg-[#f6821f] p-1">
            <span className="size-4 rounded-full bg-white" />
          </span>
        </span>
      </div>

      <span className="absolute left-1/2 top-[7rem] -translate-x-1/2 rounded-b-[var(--ob-radius-sm)] bg-[#f6821f] px-3 py-1 text-[0.82rem] font-bold uppercase tracking-wide text-white">
        Test data
      </span>

      <div className="px-8 py-7">
        <div className="flex items-center gap-4">
          <h1 className="flex-1 text-[2rem] font-bold tracking-[-0.01em]">
            Your overview
          </h1>
          <span className="flex items-center gap-2 rounded-[var(--ob-radius)] border border-[color:var(--ob-border-strong)] px-4 py-2 text-[0.98rem] font-medium">
            <span aria-hidden>⚙</span> Edit overview
          </span>
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-3 border-t border-[color:var(--ob-border)] pt-5">
          <OverviewSelect>Last 7 days</OverviewSelect>
          <OverviewSelect glyph="🗓">Mar 15–Mar 21</OverviewSelect>
          <span className="text-[0.98rem] text-[color:var(--ob-muted)]">compared to</span>
          <OverviewSelect>Previous period</OverviewSelect>
          <OverviewSelect caret="⇅">Daily</OverviewSelect>
        </div>

        <div className="grid gap-8 pt-7 lg:grid-cols-3">
          <Widget title="Payments" info>
            {/* Test mode: this panel genuinely has nothing to show. */}
            <div className="mt-4 grid h-[300px] place-items-center rounded-[var(--ob-radius)] bg-[color:var(--ob-surface-2)] px-6 text-center">
              <span>
                <span aria-hidden className="block text-[1.6rem] text-[color:var(--ob-muted)]">
                  ⚠
                </span>
                <span className="block pt-3 text-[1.02rem] text-[color:var(--ob-muted)]">
                  This content is only available for live data.
                </span>
              </span>
            </div>
          </Widget>

          <Widget title="Gross volume" info chip="+∞">
            <div className="flex gap-8 pt-4">
              <Legend label="Last 7 days" value="$41.54" color="var(--ob-brand)" />
              <Legend label="Previous period" value="$0.00" color="var(--ob-border-strong)" />
            </div>
            <p className="pt-4 text-[0.95rem] text-[color:var(--ob-muted)]">$41.54</p>
            <svg
              viewBox="0 0 600 260"
              className="h-[260px] w-full"
              preserveAspectRatio="none"
              role="img"
              aria-label="Gross volume over the last seven days"
            >
              <path
                d="M0,258 L470,258 L600,4"
                fill="none"
                stroke="var(--ob-brand)"
                strokeWidth={2}
                vectorEffect="non-scaling-stroke"
              />
              <line
                x1={0}
                x2={600}
                y1={258}
                y2={258}
                stroke="var(--ob-border-strong)"
                strokeWidth={1.5}
                vectorEffect="non-scaling-stroke"
              />
            </svg>
            <p className="flex text-[0.95rem] text-[color:var(--ob-muted)]">
              <span className="flex-1">$0.00</span>
            </p>
            <p className="flex pt-1 text-[0.95rem] text-[color:var(--ob-muted)]">
              <span className="flex-1">Mar 15</span>
              <span>Today</span>
            </p>
            <p className="flex items-center gap-3 pt-4 text-[0.98rem]">
              <span className="flex-1 font-medium text-[color:var(--ob-brand)]">
                View all payments
              </span>
              <span className="text-[color:var(--ob-muted)]">
                Updated at 4:57 AM 🕐
              </span>
            </p>
          </Widget>

          <section className="relative rounded-[var(--ob-radius)] bg-[color:var(--ob-surface-2)] p-7 text-center">
            <span aria-hidden className="absolute right-5 top-5 text-[color:var(--ob-muted)]">
              ✕
            </span>
            <h2 className="text-[1.3rem] font-bold leading-snug">
              Get quick access
              <br />
              to key business insights
            </h2>
            <p className="pt-3 text-[1.02rem] text-[color:var(--ob-fg-soft)]">
              Missing anything? You can always add it again by editing your overview.
            </p>
            <p className="pt-4 text-[1.05rem] font-semibold text-[color:var(--ob-brand)]">
              Add to your overview ⊕
            </p>
            <div className="pt-6">
              <Placeholder height={210} radius={10} label="Widget preview" />
            </div>
          </section>

          <Widget title="Net volume from sales" info chip="+∞">
            <div className="flex gap-8 pt-4">
              <Legend label="Last 7 days" value="$29.62" color="var(--ob-brand)" />
              <Legend label="Previous period" value="$0.00" color="var(--ob-border-strong)" />
            </div>
            <p className="pt-4 text-[0.95rem] text-[color:var(--ob-muted)]">$29.62</p>
          </Widget>

          <Widget title="Failed payments" info>
            <p className="pt-4 text-[1.35rem] font-bold tabular-nums">$4.00</p>
            <p className="flex items-center gap-3 pt-2 text-[0.98rem] text-[color:var(--ob-muted)]">
              <span className="flex-1">Mar 21, 3:35 AM · jane2@example.test</span>
              <span className="rounded bg-[color-mix(in_oklab,#e5484d_12%,transparent)] px-2 py-0.5 font-medium text-[#b3363a]">
                Failed
              </span>
            </p>
            <p className="flex items-center gap-3 pt-4 text-[0.98rem]">
              <span className="flex-1 font-medium text-[color:var(--ob-brand)]">
                1 of 1 result
              </span>
              <span className="text-[color:var(--ob-muted)]">Updated at 4:57 AM 🕐</span>
            </p>
          </Widget>

          <Widget title="New customers" info chip="+∞">
            <div className="flex gap-8 pt-4">
              <Legend label="Last 7 days" value="3" color="var(--ob-brand)" />
              <Legend label="Previous period" value="0" color="var(--ob-border-strong)" />
            </div>
            <p className="pt-4 text-[0.95rem] text-[color:var(--ob-muted)]">3</p>
          </Widget>
        </div>
      </div>
    </div>
  );
}

function Widget({
  title,
  info,
  chip,
  children,
}: {
  title: string;
  info?: boolean;
  chip?: string;
  children: ReactNode;
}) {
  return (
    <section>
      <h2 className="flex flex-wrap items-center gap-2.5 text-[1.3rem] font-bold">
        {title}
        {info && <InfoDot />}
        {chip && (
          <span className="rounded bg-[color-mix(in_oklab,#3fa66a_18%,transparent)] px-2 py-0.5 text-[0.92rem] font-semibold text-[#2b7a4b]">
            {chip}
          </span>
        )}
      </h2>
      <p className="border-b border-[color:var(--ob-border)] pb-3 pt-1 text-[1.02rem] text-[color:var(--ob-muted)]">
        Last 7 days
      </p>
      {children}
    </section>
  );
}

function Legend({
  label,
  value,
  color,
}: {
  label: string;
  value: string;
  color: string;
}) {
  return (
    <span>
      <span className="flex items-center gap-2.5 text-[1rem] text-[color:var(--ob-fg-soft)]">
        <span aria-hidden className="h-0.5 w-5 rounded-full" style={{ background: color }} />
        {label}
      </span>
      <span className="block pt-1 text-[1.35rem] font-bold tabular-nums">{value}</span>
    </span>
  );
}

function OverviewSelect({
  children,
  glyph,
  caret = "⌄",
}: {
  children: ReactNode;
  glyph?: string;
  caret?: string;
}) {
  return (
    <span className="inline-flex items-center gap-4 rounded-[var(--ob-radius)] border border-[color:var(--ob-border-strong)] px-3.5 py-2 text-[0.98rem] font-medium">
      <span className="flex items-center gap-2">
        {glyph && (
          <span aria-hidden className="text-[color:var(--ob-muted)]">
            {glyph}
          </span>
        )}
        {children}
      </span>
      <span aria-hidden className="text-[0.7rem] opacity-60">
        {caret}
      </span>
    </span>
  );
}

function BandChart({ panel }: { panel: (typeof PANELS)[number] }) {
  const width = 760;
  const height = 210;
  const step = width / (panel.band.length - 1);
  const y = (fraction: number) => height - fraction * height;

  const bandTop = panel.band
    .map((v, i) => `${i === 0 ? "M" : "L"}${i * step},${y(v)}`)
    .join(" ");
  const bandBottom = panel.band
    .slice()
    .reverse()
    .map((v, i) => `L${width - i * step},${y(Math.max(v - 0.55, 0))}`)
    .join(" ");
  const medianPath = panel.medianLine
    .map((v, i) => `${i === 0 ? "M" : "L"}${i * step},${y(v)}`)
    .join(" ");

  return (
    <>
      <p className="pt-4 text-[0.95rem] text-[color:var(--ob-muted)]">{panel.top}</p>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="h-[210px] w-full"
        preserveAspectRatio="none"
        role="img"
        aria-label={`${panel.title}: your value against the peer range`}
      >
        <path d={`${bandTop} ${bandBottom} Z`} fill="var(--ob-surface-2)" />
        <path
          d={medianPath}
          fill="none"
          stroke="#7b88a8"
          strokeWidth={1.5}
          vectorEffect="non-scaling-stroke"
        />
        <line
          x1={0}
          x2={width}
          y1={y(panel.yours)}
          y2={y(panel.yours)}
          stroke={panel.yoursColor}
          strokeWidth={2.5}
          vectorEffect="non-scaling-stroke"
        />
      </svg>
      <p className="text-[0.95rem] text-[color:var(--ob-muted)]">{panel.bottom}</p>
      <p className="flex pt-1 text-[0.95rem] text-[color:var(--ob-muted)]">
        <span className="flex-1">January 2024</span>
        <span>December 2024</span>
      </p>
    </>
  );
}

function InfoDot(): ReactNode {
  return (
    <span
      aria-hidden
      className="grid size-[15px] shrink-0 place-items-center rounded-full border border-[color:var(--ob-border-strong)] text-[0.6rem] font-normal text-[color:var(--ob-muted)]"
    >
      i
    </span>
  );
}
