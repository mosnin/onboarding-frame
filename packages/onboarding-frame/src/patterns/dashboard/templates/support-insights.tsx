"use client";

import { BarChart, Heatmap, LineChart } from "../../../ui/charts";
import { CaretRightIcon } from "../../../ui/icons-solid";
import { Avatar } from "../../../ui/avatar";
import { cn } from "../../../lib/cn";
import { Surface, supportInsightsTokens } from "./tokens";
import { Chip, Main, Select, Shell } from "./chrome";
import type { TemplateProps } from "./props";
import {
  BellIcon,
  ChevronDown,
  FlaskIcon,
  GhostIcon,
  Icon,
  SlidersIcon,
  type IconName,
} from "../../../ui/icons";

const RAIL: IconName[] = [
  "mail",
  "share",
  "sparkle",
  "barChart",
  "lifebuoy",
  "settings",
];

const SECTION_NAV = [
  {
    id: "reporting",
    label: "Reporting",
    icon: "barChart" as IconName,
    active: true,
    chevron: true,
  },
  { id: "issues", label: "Top issues", icon: "alert" as IconName },
  { id: "themes", label: "Themes", icon: "sparkle" as IconName, badge: "Beta" },
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
    <div className="grid content-start gap-[9px]">
      <div className="flex items-center gap-[6px]">
        <span className="text-[0.71rem] text-[color:var(--ob-fg-soft)]">
          {label}
        </span>
        <span
          aria-hidden
          className="grid size-[13px] place-items-center rounded-full border border-[color:var(--ob-border-strong)] text-[0.464rem] text-[color:var(--ob-muted)]"
        >
          i
        </span>
        {aside}
      </div>
      <p className="text-[1.467rem] font-extrabold leading-none tracking-tight">
        {value}
        {unit && (
          <span className="ml-[6px] text-[0.734rem] font-normal text-[color:var(--ob-muted)]">
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
  userName = "Alex Rivera",
  brandName = "Relay",
  className,
}: TemplateProps) {
  return (
    <Surface tokens={supportInsightsTokens}>
      <Shell className={cn(className)} bg="var(--ob-bg)">
        {/* Product rail */}
        <aside className="hidden w-[72px] shrink-0 flex-col items-center gap-[19px] py-[13px] sm:flex">
          <Avatar name={brandName} size={26} rounded={9} />
          <nav className="grid gap-[13px] text-[color:var(--ob-fg-soft)]">
            {RAIL.map((name, i) => (
              <button
                key={i}
                type="button"
                className={cn(
                  "grid size-[28px] place-items-center rounded-[7px] text-lg transition-colors",
                  i === 3
                    ? "bg-[color:var(--ob-surface-3)] text-[color:var(--ob-fg)]"
                    : "opacity-60 hover:opacity-100",
                )}
              >
                <Icon name={name} width={15} height={15} />
              </button>
            ))}
          </nav>
          <div className="mt-auto grid gap-[13px] text-[color:var(--ob-fg-soft)]">
            <button
              type="button"
              aria-label="Notifications"
              className="opacity-60"
            >
              <BellIcon width={15} height={15} />
            </button>
            <button type="button" aria-label="Help" className="opacity-60">
              ?
            </button>
            <Avatar name={userName} size={23} />
          </div>
        </aside>

        {/* Section nav */}
        <aside className="hidden w-[289px] shrink-0 flex-col gap-[3px] py-[13px] pr-[6px] lg:flex">
          <div className="px-[13px] pb-[9px]">
            <div className="flex items-start gap-[6px]">
              <div className="flex-1">
                <h2 className="text-lg font-extrabold tracking-tight">
                  Insights
                </h2>
                <p className="text-[0.664rem] text-[color:var(--ob-muted)]">
                  {brandName} support
                </p>
              </div>
              <button type="button" aria-label="Filters" className="opacity-50">
                <SlidersIcon width={13} height={13} />
              </button>
            </div>
          </div>
          <nav className="grid gap-[1px] px-[6px]">
            {SECTION_NAV.map((item) => (
              <button
                key={item.id}
                type="button"
                aria-current={item.active ? "page" : undefined}
                className={cn(
                  "flex items-center gap-[8px] rounded-[6px] px-[9px] py-[6px] text-left text-[0.71rem]",
                  item.active
                    ? "bg-[color:var(--ob-brand-soft)] font-semibold text-[color:var(--ob-brand)]"
                    : "text-[color:var(--ob-fg-soft)] hover:bg-[color:var(--ob-surface-2)]",
                )}
              >
                <Icon
                  name={item.icon}
                  width={13}
                  height={13}
                  className="shrink-0 opacity-80"
                />
                <span className="flex-1">{item.label}</span>
                {item.badge && (
                  <Chip tone="brand">
                    <FlaskIcon width={8} height={8} /> {item.badge}
                  </Chip>
                )}
                {item.chevron && <CaretRightIcon size={11} />}
              </button>
            ))}
          </nav>
        </aside>

        <Main className="p-[9px] pl-[0px]">
          <div className="flex-1 overflow-hidden rounded-[11px] border border-[color:var(--ob-border)] bg-[color:var(--ob-surface)] p-[25px]">
            <div className="flex flex-wrap items-start gap-[19px]">
              <h1 className="flex-1 text-[1.467rem] font-extrabold tracking-tight">
                Reporting
              </h1>
              <div className="flex gap-[19px]">
                {[
                  { label: "Timeframe", value: "Past week" },
                  { label: "Granularity", value: "Daily" },
                ].map((control) => (
                  <div key={control.label}>
                    <p className="mb-[5px] text-[0.633rem] text-[color:var(--ob-muted)]">
                      {control.label}
                    </p>
                    <Select label={control.value} />
                  </div>
                ))}
              </div>
            </div>

            <button
              type="button"
              className="mt-[25px] flex items-center gap-[5px] text-lg font-bold tracking-tight"
            >
              Overview{" "}
              <ChevronDown width={13} height={13} className="opacity-50" />
            </button>

            <div className="mt-[15px] grid gap-[31px] lg:grid-cols-3">
              <Metric label="Queue size" value="6" unit="in todo right now">
                <LineChart
                  height={116}
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
                  yLabelSide="right"
                  xLabels={["Jun 3", "Today"]}
                  gridLines={2}
                />
              </Metric>

              <Metric
                label="Median first response time"
                value="1d 12h"
                unit="last 7 days"
                aside={
                  <span className="ml-auto flex items-center gap-[5px] text-[0.633rem] font-semibold">
                    <span className="size-[9px] rounded-full border-2 border-[color:var(--ob-brand)]" />
                    Median
                  </span>
                }
              >
                {/* One data point: a dot, not a line pretending to be a trend. */}
                <div className="relative" style={{ height: 150 }}>
                  <div className="absolute inset-[0px] grid grid-rows-2">
                    <span className="border-b border-[color:var(--ob-border)]" />
                    <span className="border-b border-[color:var(--ob-border)]" />
                  </div>
                  <span className="absolute left-[62%] top-[18%] size-[8px] rounded-full border-2 border-[color:var(--ob-brand)] bg-[color:var(--ob-surface)]" />
                  <div className="absolute -right-[3px] top-[0px] flex h-full flex-col justify-between text-right text-[0.541rem] text-[color:var(--ob-muted)]">
                    <span>2d</span>
                    <span>21h</span>
                    <span>0</span>
                  </div>
                </div>
                <div className="flex justify-between text-[0.541rem] text-[color:var(--ob-muted)]">
                  <span>Jun 3</span>
                  <span>Today</span>
                </div>
              </Metric>

              <Metric
                label="Median resolution time"
                value="N/A"
                unit="last 7 days"
              >
                {/* The reference draws no frame here — just the mark and the
                    words, so the empty panel stays visibly empty. */}
                <div
                  className="grid place-items-center"
                  style={{ height: 150 }}
                >
                  <span className="flex items-center gap-[6px] text-[0.68rem] text-[color:var(--ob-muted)]">
                    <GhostIcon width={13} height={13} /> No data
                  </span>
                </div>
                <div className="flex justify-between text-[0.541rem] text-[color:var(--ob-muted)]">
                  <span>Jun 3</span>
                  <span>Today</span>
                </div>
              </Metric>
            </div>

            <button
              type="button"
              className="mt-[37px] flex items-center gap-[5px] text-lg font-bold tracking-tight"
            >
              Support volume{" "}
              <ChevronDown width={13} height={13} className="opacity-50" />
            </button>

            <div className="mt-[15px] grid gap-[31px] lg:grid-cols-2">
              <Metric
                label="New threads created per day"
                value="4"
                unit="total"
              >
                <BarChart
                  values={[0, 0, 0, 4, 0, 0, 0]}
                  max={5}
                  yLabels={["5", "4", "3", "2", "1", "0"]}
                  yLabelSide="right"
                  xLabels={["Jun 1", "Jun 3", "Jun 5", "Today"]}
                  average={{ value: 1, label: "Average" }}
                  height={147}
                  color="var(--ob-brand)"
                />
              </Metric>

              <Metric label="Threads re-opened per day" value="4" unit="total">
                <BarChart
                  values={[0, 0, 0, 0, 4, 0, 0]}
                  max={5}
                  yLabels={["5", "4", "3", "2", "1", "0"]}
                  yLabelSide="right"
                  xLabels={["Jun 1", "Jun 3", "Jun 5", "Today"]}
                  average={{ value: 1, label: "Average" }}
                  height={147}
                  color="var(--ob-brand)"
                />
              </Metric>

              <Metric
                label="Threads moved to done per day"
                value="4"
                unit="total"
              >
                <BarChart
                  values={[0, 0, 3, 0, 0, 0, 0]}
                  max={3}
                  yLabels={["3", "0"]}
                  yLabelSide="right"
                  xLabels={["Jun 1", "Jun 5", "Today"]}
                  height={116}
                  color="var(--ob-brand)"
                />
              </Metric>

              <Metric
                label="New thread volume by time and day"
                value=""
                aside={
                  <span className="ml-auto flex items-center gap-[5px] text-[0.603rem] text-[color:var(--ob-muted)]">
                    Lower
                    {[0.1, 0.3, 0.55, 0.8, 1].map((step) => (
                      <span
                        key={step}
                        className="size-[9px] rounded-[1px] border border-[color:var(--ob-border)]"
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
                    {
                      label: "Mon",
                      values: Array.from({ length: 24 }, (_, i) =>
                        i === 14 ? 0.9 : 0,
                      ),
                    },
                    {
                      label: "Tue",
                      values: Array.from({ length: 24 }, () => 0),
                    },
                    {
                      label: "Wed",
                      values: Array.from({ length: 24 }, (_, i) =>
                        i === 9 ? 0.4 : 0,
                      ),
                    },
                    {
                      label: "Thu",
                      values: Array.from({ length: 24 }, () => 0),
                    },
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
