"use client";

import type { ReactNode } from "react";
import { cn } from "../../../lib/cn";
import { AvatarSlot, LogoSlot, Placeholder } from "../../../ui/placeholder";
import { Surface, listingTokens } from "./tokens";
import { Main, NavItem, Shell, Sidebar } from "./chrome";
import type { TemplateProps } from "./props";

export type ListingPage = "traffic" | "insights";

export interface ListingStatsProps extends TemplateProps {
  page?: ListingPage;
}

const NAV = [
  { id: "search", label: "Search", glyph: "⌕" },
  { id: "dashboard", label: "Dashboard", glyph: "⌂" },
  { id: "listings", label: "Listings", glyph: "🏷" },
  { id: "messages", label: "Messages", glyph: "💬" },
  { id: "orders", label: "Orders", glyph: "🧾" },
  { id: "visibility", label: "Shop search visibility", glyph: "🔭" },
];

const STATS_CHILDREN = [
  { id: "traffic", label: "Shop traffic" },
  { id: "insights", label: "Marketplace insights" },
];

const MARKETING_CHILDREN = [
  { id: "ads", label: "Ads" },
  { id: "discounts", label: "Sales and discounts" },
  { id: "social", label: "Social media" },
  { id: "share", label: "Share & Save" },
];

/**
 * Three metrics over one week, each with a single burst of activity. The curve
 * is drawn as a smooth hump because that is what one busy day looks like when
 * a weekly series is interpolated — and each metric gets its own colour so the
 * three cells do not read as one chart cut into pieces.
 */
const CURVE = [0, 0, 0, 0.1, 0.6, 1, 0.55, 0.08, 0];

const SUGGESTIONS = [
  "Add more photos so buyers can see every detail. Highlight its shape, size, and texture with different angles and close ups.",
  "The more tags you have, the more likely buyers are to find your items. Add more tags.",
];

/**
 * Marketplace listing stats.
 *
 * The metric labels are small caps and *underlined* rather than coloured, and
 * the controls are full pills — a combination specific enough that flattening
 * it into a generic card style would lose the product entirely. The year-over
 * -year figures read "--% YoY" because the listing has no prior year, which is
 * the honest state for a new listing and not a loading placeholder.
 */
export function ListingStatsTemplate({ className, page = "traffic" }: ListingStatsProps) {
  return (
    <Surface tokens={listingTokens} className={className}>
      <Shell>
        <Sidebar width={340} bg="var(--ob-surface)">
          <div className="flex items-center gap-3 px-6 pb-4 pt-5">
            <h2 className="flex-1 text-[1.35rem] font-bold">Shop Manager</h2>
            <span aria-hidden className="text-[1.2rem]">
              ☰
            </span>
          </div>

          <nav className="grid gap-0.5 px-3">
            {NAV.map((item) => (
              <NavItem
                key={item.id}
                label={item.label}
                glyph={item.glyph}
                className="rounded-[var(--ob-radius-sm)] text-[1.05rem]"
              />
            ))}
          </nav>

          <div className="px-3 pt-1">
            <NavItem
              label="Stats"
              glyph="▥"
              active
              trailing={
                <span aria-hidden className="text-[0.7rem] opacity-50">
                  ⌃
                </span>
              }
              className="rounded-[var(--ob-radius-sm)] text-[1.05rem]"
            />
          </div>
          <nav className="grid gap-0.5 px-3">
            {STATS_CHILDREN.map((item) => (
              <NavItem
                key={item.id}
                label={item.label}
                indent
                active={item.id === page}
                className="rounded-[var(--ob-radius-sm)] text-[1.05rem]"
              />
            ))}
          </nav>

          <nav className="grid gap-0.5 px-3 pt-1">
            <NavItem
              label="Customer service stats"
              glyph="✷"
              className="rounded-[var(--ob-radius-sm)] text-[1.05rem]"
            />
            <NavItem
              label="Policy violations"
              glyph="⚑"
              className="rounded-[var(--ob-radius-sm)] text-[1.05rem]"
            />
            <NavItem
              label="Marketing"
              glyph="📣"
              trailing={
                <span aria-hidden className="text-[0.7rem] opacity-50">
                  ⌃
                </span>
              }
              className="rounded-[var(--ob-radius-sm)] text-[1.05rem]"
            />
            {MARKETING_CHILDREN.map((item) => (
              <NavItem
                key={item.id}
                label={item.label}
                indent
                className="rounded-[var(--ob-radius-sm)] text-[1.05rem]"
              />
            ))}
            {[
              { id: "finances", label: "Finances", glyph: "🏦", caret: true },
              { id: "apps", label: "Apps", glyph: "▦" },
              { id: "help", label: "Help", glyph: "?", caret: true },
              { id: "settings", label: "Settings", glyph: "⚙", caret: true },
            ].map((item) => (
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
                className="rounded-[var(--ob-radius-sm)] text-[1.05rem]"
              />
            ))}
          </nav>

          <p className="px-6 pb-2 pt-6 text-[0.92rem] text-[color:var(--ob-muted)]">
            Sales channels
          </p>
          <div className="flex items-center gap-3 px-6">
            <LogoSlot size={26} label="" radius={4} />
            <span className="min-w-0 flex-1 text-[1rem] leading-snug">
              HomemadeGoodsByAlex
            </span>
            <span aria-hidden className="text-[color:var(--ob-muted)]">
              ✎
            </span>
          </div>

          <div className="mt-auto flex items-center gap-3 border-t border-[color:var(--ob-border)] px-6 py-4">
            <AvatarSlot size={32} />
            <span className="flex-1 text-[1.05rem]">Alex</span>
            <span aria-hidden className="text-[0.7rem] opacity-50">
              ⌃
            </span>
          </div>
        </Sidebar>

        <Main className="overflow-auto px-10 py-7">
          <p className="flex items-center gap-2 text-[1rem]">
            <span className="underline">Stats</span>
            <span aria-hidden className="text-[color:var(--ob-muted)]">
              ›
            </span>
            <span className="text-[color:var(--ob-fg-soft)]">Listing stats</span>
          </p>

          <h1 className="pt-3 text-[1.9rem] font-bold">Listing stats</h1>

          <span className="mt-5 inline-flex items-center gap-2 rounded-full border border-[color:var(--ob-fg)] px-5 py-3 text-[1.05rem]">
            <span className="font-bold">Date Range</span>
            Last 7 Days: Mar 01 - Mar 07
            <span aria-hidden className="text-[0.7rem]">
              ▾
            </span>
          </span>

          <section className="mt-7 rounded-[var(--ob-radius-lg)] border border-[color:var(--ob-border)] p-6">
            <div className="flex gap-7">
              <Placeholder width={228} height={182} radius={8} label="Listing photo" />
              <div className="min-w-0 flex-1">
                <div className="flex items-start gap-5">
                  <h2 className="flex-1 text-[1.5rem] font-bold leading-snug">
                    Natural Thyme, Red Pepper, Pul Biber Spice Blend | Cooking Seasoning
                  </h2>
                  <span className="shrink-0 rounded-full border border-[color:var(--ob-fg)] px-5 py-2.5 text-[1rem] font-medium">
                    View item
                  </span>
                </div>

                <div className="grid gap-2 pt-6 sm:grid-cols-2">
                  <p className="text-[1.05rem]">
                    <span className="text-[color:var(--ob-fg-soft)]">Price:</span> $7.99 -
                    $10.99
                  </p>
                  <p className="text-[1.05rem]">
                    <span className="text-[color:var(--ob-fg-soft)]">Status:</span> Inactive
                  </p>
                  <p className="text-[1.05rem]">
                    <span className="text-[color:var(--ob-fg-soft)]">Current stock:</span>{" "}
                    100
                  </p>
                </div>

                <div className="mt-6 rounded-[var(--ob-radius)] border border-[color:var(--ob-border)] p-5">
                  <div className="flex items-start gap-4">
                    <h3 className="flex-1 font-bold">Improvement Suggestions</h3>
                    <span className="shrink-0 text-[1rem] underline">Edit listing</span>
                  </div>
                  <ul className="list-disc pl-5 pt-3">
                    {SUGGESTIONS.map((suggestion) => (
                      <li key={suggestion} className="pt-1 text-[1.02rem] leading-relaxed">
                        {suggestion}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <section className="mt-5 grid rounded-[var(--ob-radius-lg)] border border-[color:var(--ob-border)] sm:grid-cols-3">
            <MetricCell
              label="Visits"
              value="5"
              axis="6"
              legend="5 visits"
              color="#e8734a"
            />
            <MetricCell
              label="Items sold"
              value="1"
              axis="2"
              legend="1 item sold"
              color="#4aa8d8"
            />
            <MetricCell
              label="Revenue"
              value="SGD 0.70"
              axis="SGD 2"
              legend="SGD 0.70"
              color="#7fc9b8"
            />
          </section>

          <section className="mt-7 grid gap-8 lg:grid-cols-[minmax(0,0.6fr)_minmax(0,1fr)]">
            <div>
              <h2 className="text-[1.35rem] font-bold">Explore your data</h2>
              <p className="max-w-[40ch] pt-2 text-[1.02rem] leading-relaxed text-[color:var(--ob-fg-soft)]">
                How many visits result in an order? Look for trends and relationships
                between your numbers.
              </p>
            </div>

            <div className="rounded-[var(--ob-radius-lg)] border border-[color:var(--ob-border)] p-5">
              <div className="flex flex-wrap items-center gap-4">
                <Picker label="Total views" value="5" color="#e8734a" />
                <Picker label="Orders" value="1" color="#4aa8d8" />
                <span className="ml-auto flex items-center gap-1.5 text-[0.95rem] text-[color:var(--ob-muted)]">
                  <span aria-hidden>🕐</span> Updated Just now
                </span>
              </div>
            </div>
          </section>
        </Main>
      </Shell>
    </Surface>
  );
}

function MetricCell({
  label,
  value,
  axis,
  legend,
  color,
}: {
  label: string;
  value: string;
  axis: string;
  legend: string;
  color: string;
}) {
  const width = 400;
  const height = 120;
  const step = width / (CURVE.length - 1);
  const area =
    CURVE.map((v, i) => `${i === 0 ? "M" : "L"}${i * step},${height - v * height}`).join(
      " ",
    ) + ` L${width},${height} L0,${height} Z`;

  return (
    <div className="border-l border-[color:var(--ob-border)] px-6 py-5 first:border-l-0">
      <div className="flex items-center gap-2">
        <span className="text-[0.88rem] font-bold uppercase tracking-wide underline">
          {label}
        </span>
        <span className="text-[0.88rem] text-[color:var(--ob-muted)] underline">
          --% YoY
        </span>
        <span className="ml-auto flex items-center gap-1.5 text-[0.92rem] text-[color:var(--ob-muted)]">
          <span aria-hidden>🕐</span> Just now
        </span>
      </div>

      <p className="pt-2 text-[2.2rem] font-bold leading-none tabular-nums">{value}</p>

      <div className="pt-5">
        <p className="text-[0.92rem] text-[color:var(--ob-muted)]">{axis}</p>
        <div className="border-t border-[color:var(--ob-border)]">
          <svg
            viewBox={`0 0 ${width} ${height}`}
            className="h-[120px] w-full"
            preserveAspectRatio="none"
            role="img"
            aria-label={`${label} over the last seven days`}
          >
            <path d={area} fill={color} />
          </svg>
        </div>
        <p className="flex pt-2 text-[0.92rem] text-[color:var(--ob-muted)]">
          <span className="flex-1">01 Mar</span>
          <span>07 Mar</span>
        </p>
      </div>

      <p className="flex items-center gap-2.5 pt-4 text-[1rem]">
        <span aria-hidden className="size-3 rounded-full" style={{ background: color }} />
        <span className="flex-1">Marketplace</span>
        <span>{legend}</span>
      </p>
    </div>
  );
}

function Picker({
  label,
  value,
  color,
}: {
  label: string;
  value: string;
  color: string;
}): ReactNode {
  return (
    <span className="inline-flex min-w-[170px] items-center gap-6 rounded-[var(--ob-radius-lg)] border border-[color:var(--ob-fg)] px-5 py-3">
      <span>
        <span
          className="block text-[0.82rem] font-bold uppercase tracking-wide"
          style={{ color }}
        >
          {label}
        </span>
        <span className="block pt-0.5 text-[1.6rem] font-bold leading-none tabular-nums">
          {value}
        </span>
      </span>
      <span aria-hidden className={cn("ml-auto text-[0.7rem] opacity-60")}>
        ⌄
      </span>
    </span>
  );
}
