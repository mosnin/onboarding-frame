"use client";

import { Placeholder } from "../../../ui/placeholder";
import { BarChart, Heatmap, LineChart } from "../../../ui/charts";
import { cn } from "../../../lib/cn";
import { Surface, supportInsightsTokens } from "./tokens";
import { Chip, Main, Select, Shell } from "./chrome";
import type { TemplateProps } from "./props";

const RAIL = ["✉", "⚯", "✦", "📊", "◎", "⚙"];

const SECTION_NAV = [
  { id: "reporting", label: "Reporting", glyph: "📊", active: true, chevron: true },
  { id: "issues", label: "Top issues", glyph: "◬" },
  { id: "themes", label: "Themes", glyph: "✦", badge: "Beta" },
];

/** A metric block: label, big value with a unit, then its own chart. */
function Metric({
  label,
  value,
  unit,
  children,
  aside,
}: {
  label: string;
  value: string;
  unit?: string;
  children?: React.ReactNode;
  aside?: React.ReactNode;
}) {
  return (
    <div className="grid content-start gap-3">
      <div className="flex items-center gap-2">
        <span className="text-[0.92rem] text-[color:var(--ob-fg-soft)]">{label}</span>
        <span
          aria-hidden
          className="grid size-4 place-items-center rounded-full border border-[color:var(--ob-border-strong)] text-[0.6rem] text-[color:var(--ob-muted)]"
        >
          i
        </span>
        {aside}
      </div>
      <p className="text-[1.9rem] font-extrabold leading-none tracking-tight">
        {value}
        {unit && (
          <span className="ml-2 text-[0.95rem] font-normal text-[color:var(--ob-muted)]">
            {unit}
          </span>
        )}
      </p>
      {children}
    </div>
  );
}

/**
 * Support insights.
 *
 * A reporting view where every metric owns its chart, and empty periods say
 * "no data" rather than drawing a flat line that reads as a real zero.
 */
export function SupportInsightsTemplate({
  brandName = "Relay",
  className,
}: TemplateProps) {
  return (
    <Surface tokens={supportInsightsTokens}>
      <Shell className={cn(className)} bg="var(--ob-bg)">
        {/* Product rail */}
        <aside className="hidden w-[68px] shrink-0 flex-col items-center gap-6 py-4 sm:flex">
          <Placeholder width={34} height={34} radius={9} glyph="▦" />
          <nav className="grid gap-4 text-[color:var(--ob-fg-soft)]">
            {RAIL.map((glyph, i) => (
              <button
                key={i}
                type="button"
                className={cn(
                  "grid size-9 place-items-center rounded-[9px] text-lg transition-colors",
                  i === 3
                    ? "bg-[color:var(--ob-surface-3)] text-[color:var(--ob-fg)]"
                    : "opacity-60 hover:opacity-100",
                )}
              >
                {glyph}
              </button>
            ))}
          </nav>
          <div className="mt-auto grid gap-4 text-[color:var(--ob-fg-soft)]">
            <button type="button" aria-label="Notifications" className="opacity-60">⌾</button>
            <button type="button" aria-label="Help" className="opacity-60">?</button>
            <Placeholder shape="circle" width={30} height={30} glyph="◍" />
          </div>
        </aside>

        {/* Section nav */}
        <aside className="hidden w-[250px] shrink-0 flex-col gap-1 py-4 pr-2 lg:flex">
          <div className="px-4 pb-3">
            <div className="flex items-start gap-2">
              <div className="flex-1">
                <h2 className="text-lg font-extrabold tracking-tight">Insights</h2>
                <p className="text-[0.86rem] text-[color:var(--ob-muted)]">
                  {brandName} support
                </p>
              </div>
              <button type="button" aria-label="Filters" className="opacity-50">▣</button>
            </div>
          </div>
          <nav className="grid gap-0.5 px-2">
            {SECTION_NAV.map((item) => (
              <button
                key={item.id}
                type="button"
                aria-current={item.active ? "page" : undefined}
                className={cn(
                  "flex items-center gap-2.5 rounded-[8px] px-3 py-2 text-left text-[0.92rem]",
                  item.active
                    ? "bg-[color:var(--ob-brand-soft)] font-semibold text-[color:var(--ob-brand)]"
                    : "text-[color:var(--ob-fg-soft)] hover:bg-[color:var(--ob-surface-2)]",
                )}
              >
                <span aria-hidden className="w-4 text-center opacity-80">{item.glyph}</span>
                <span className="flex-1">{item.label}</span>
                {item.badge && <Chip tone="brand">⚗ {item.badge}</Chip>}
                {item.chevron && <span aria-hidden className="opacity-40">›</span>}
              </button>
            ))}
          </nav>
        </aside>

        <Main className="p-3 pl-0">
          <div className="flex-1 overflow-hidden rounded-[14px] border border-[color:var(--ob-border)] bg-[color:var(--ob-surface)] p-8">
            <div className="flex flex-wrap items-start gap-6">
              <h1 className="flex-1 text-[1.9rem] font-extrabold tracking-tight">Reporting</h1>
              <div className="flex gap-6">
                {[
                  { label: "Timeframe", value: "Past week" },
                  { label: "Granularity", value: "Daily" },
                ].map((control) => (
                  <div key={control.label}>
                    <p className="mb-1.5 text-[0.82rem] text-[color:var(--ob-muted)]">
                      {control.label}
                    </p>
                    <Select label={control.value} />
                  </div>
                ))}
              </div>
            </div>

            <button
              type="button"
              className="mt-8 flex items-center gap-1.5 text-lg font-bold tracking-tight"
            >
              Overview <span aria-hidden className="text-sm opacity-50">⌄</span>
            </button>

            <div className="mt-5 grid gap-10 lg:grid-cols-3">
              <Metric label="Queue size" value="6" unit="in todo right now">
                <LineChart
                  height={150}
                  smooth
                  series={[
                    {
                      id: "queue",
                      points: [0, 0, 0, 0, 3, 4, 6],
                      color: "var(--ob-brand)",
                      area: true,
                    },
                  ]}
                  yLabels={["6", "3", "0"]}
                  xLabels={["Jun 3", "Today"]}
                  gridLines={2}
                />
              </Metric>

              <Metric
                label="Median first response time"
                value="1d 12h"
                unit="last 7 days"
                aside={
                  <span className="ml-auto flex items-center gap-1.5 text-[0.82rem] font-semibold">
                    <span className="size-3 rounded-full border-2 border-[color:var(--ob-brand)]" />
                    Median
                  </span>
                }
              >
                {/* One data point: a dot, not a line pretending to be a trend. */}
                <div className="relative" style={{ height: 150 }}>
                  <div className="absolute inset-0 grid grid-rows-2">
                    <span className="border-b border-[color:var(--ob-border)]" />
                    <span className="border-b border-[color:var(--ob-border)]" />
                  </div>
                  <span className="absolute left-[62%] top-[18%] size-2.5 rounded-full border-2 border-[color:var(--ob-brand)] bg-[color:var(--ob-surface)]" />
                  <div className="absolute -right-1 top-0 flex h-full flex-col justify-between text-right text-[0.7rem] text-[color:var(--ob-muted)]">
                    <span>2d</span>
                    <span>21h</span>
                    <span>0</span>
                  </div>
                </div>
                <div className="flex justify-between text-[0.7rem] text-[color:var(--ob-muted)]">
                  <span>Jun 3</span>
                  <span>Today</span>
                </div>
              </Metric>

              <Metric label="Median resolution time" value="N/A" unit="last 7 days">
                <div
                  className="grid place-items-center rounded-[8px] border border-[color:var(--ob-border)]"
                  style={{ height: 150 }}
                >
                  <span className="flex items-center gap-2 text-[0.88rem] text-[color:var(--ob-muted)]">
                    <span aria-hidden>👻</span> No data
                  </span>
                </div>
                <div className="flex justify-between text-[0.7rem] text-[color:var(--ob-muted)]">
                  <span>Jun 3</span>
                  <span>Today</span>
                </div>
              </Metric>
            </div>

            <button
              type="button"
              className="mt-12 flex items-center gap-1.5 text-lg font-bold tracking-tight"
            >
              Support volume <span aria-hidden className="text-sm opacity-50">⌄</span>
            </button>

            <div className="mt-5 grid gap-10 lg:grid-cols-2">
              <Metric label="New threads created per day" value="4" unit="total">
                <BarChart
                  values={[0, 0, 0, 4, 0, 0, 0]}
                  max={5}
                  yLabels={["5", "4", "3", "2", "1", "0"]}
                  xLabels={["Jun 1", "Jun 3", "Jun 5", "Today"]}
                  average={{ value: 1, label: "Average" }}
                  height={190}
                  color="var(--ob-brand)"
                />
              </Metric>

              <Metric label="Threads re-opened per day" value="4" unit="total">
                <BarChart
                  values={[0, 0, 0, 0, 4, 0, 0]}
                  max={5}
                  yLabels={["5", "4", "3", "2", "1", "0"]}
                  xLabels={["Jun 1", "Jun 3", "Jun 5", "Today"]}
                  average={{ value: 1, label: "Average" }}
                  height={190}
                  color="var(--ob-brand)"
                />
              </Metric>

              <Metric label="Threads moved to done per day" value="4" unit="total">
                <BarChart
                  values={[0, 0, 3, 0, 0, 0, 0]}
                  max={3}
                  yLabels={["3", "0"]}
                  xLabels={["Jun 1", "Jun 5", "Today"]}
                  height={150}
                  color="var(--ob-brand)"
                />
              </Metric>

              <Metric
                label="New thread volume by time and day"
                value=""
                aside={
                  <span className="ml-auto flex items-center gap-1.5 text-[0.78rem] text-[color:var(--ob-muted)]">
                    Lower
                    {[0.1, 0.3, 0.55, 0.8, 1].map((step) => (
                      <span
                        key={step}
                        className="size-3 rounded-[2px] border border-[color:var(--ob-border)]"
                        style={{
                          background: `color-mix(in oklab, var(--ob-brand) ${step * 100}%, transparent)`,
                        }}
                      />
                    ))}
                    Higher
                  </span>
                }
              >
                <Heatmap
                  columns={24}
                  rows={[
                    { label: "Mon", values: Array.from({ length: 24 }, (_, i) => (i === 14 ? 0.9 : 0)) },
                    { label: "Tue", values: Array.from({ length: 24 }, () => 0) },
                    { label: "Wed", values: Array.from({ length: 24 }, (_, i) => (i === 9 ? 0.4 : 0)) },
                    { label: "Thu", values: Array.from({ length: 24 }, () => 0) },
                  ]}
                />
              </Metric>
            </div>
          </div>
        </Main>
      </Shell>
    </Surface>
  );
}
