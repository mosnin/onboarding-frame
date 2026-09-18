"use client";

import type { ReactNode } from "react";
import {
  ArrowLeftIcon,
  ArrowsUpDownIcon,
  ArticleIcon,
  BrowsersIcon,
  CardIcon,
  CaretDoubleLeftIcon,
  CaretDownIcon,
  ChartPieIcon,
  CheckIcon,
  ClipboardIcon,
  CrossIcon,
  EnvelopeIcon,
  ExternalSquareIcon,
  FlowArrowIcon,
  GlobeIcon,
  GridFourIcon,
  HardDrivesIcon,
  LightningIcon,
  LinkChainIcon,
  LockIcon,
  PathIcon,
  RobotIcon,
  SearchIcon,
  ShieldIcon,
  SignpostIcon,
  StarIcon,
  TagIcon,
  TreeIcon,
} from "../../../ui/icons-solid";
import { Wordmark } from "../../../ui/wordmark";
import { cn } from "../../../lib/cn";
import { Surface, zoneTokens } from "./tokens";
import { Main, NavItem, Shell, Sidebar } from "./chrome";
import type { TemplateProps } from "./props";

export type ZonePage = "overview" | "analytics" | "dns";

export interface ZoneOverviewProps extends TemplateProps {
  page?: ZonePage;
}

const NAV = [
  { id: "overview", label: "Overview", Icon: ClipboardIcon },
  { id: "audit", label: "AI Audit", Icon: RobotIcon, badge: "Beta" },
  { id: "analytics", label: "Analytics & Logs", Icon: ChartPieIcon, caret: true },
  { id: "dns", label: "DNS", Icon: PathIcon, caret: true },
  { id: "email", label: "Email", Icon: EnvelopeIcon, caret: true },
  { id: "ssl", label: "SSL/TLS", Icon: LockIcon, caret: true },
  { id: "security", label: "Security", Icon: ShieldIcon, caret: true },
  { id: "access", label: "Access", Icon: LinkChainIcon },
  { id: "speed", label: "Speed", Icon: LightningIcon, caret: true },
  { id: "caching", label: "Caching", Icon: HardDrivesIcon, caret: true },
  { id: "workers", label: "Workers Routes", Icon: FlowArrowIcon },
  { id: "rules", label: "Rules", Icon: SignpostIcon, caret: true },
  { id: "network", label: "Network", Icon: GlobeIcon },
  { id: "traffic", label: "Traffic", Icon: TreeIcon, caret: true },
  { id: "pages", label: "Custom Pages", Icon: ArticleIcon },
  { id: "apps", label: "Apps", Icon: GridFourIcon },
  { id: "scrape", label: "Scrape Shield", Icon: BrowsersIcon },
  { id: "tags", label: "Tag Manager", Icon: TagIcon, caret: true },
];

/**
 * A quiet zone: one traffic burst, nothing cached at all. Two of the five
 * series are genuinely flat at zero, and they keep their per-point dots so a
 * reader can tell "measured zero" from "no series drawn".
 */
const METRICS = [
  {
    id: "visitors",
    label: "Unique Visitors",
    value: "112",
    points: [7, 5, 5, 6, 2, 3, 4, 3, 6, 4, 9, 3, 4, 3, 5, 4, 6, 3, 5, 5, 4],
  },
  {
    id: "requests",
    label: "Total Requests",
    value: "1.55k",
    points: [0, 0, 1, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  },
  { id: "cached", label: "Percent Cached", value: "0%", points: new Array(21).fill(0) },
  {
    id: "data",
    label: "Total Data Served",
    value: "4 MB",
    points: [1, 0, 1, 9, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
  },
  { id: "datacached", label: "Data Cached", value: "0 B", points: new Array(21).fill(0) },
];

/**
 * Zone overview.
 *
 * Orange is the mark and blue is every link and datum — the two accents never
 * take each other's job, which is easy to lose when a palette is normalised
 * into one brand colour. The Quick Actions toggles are both off and show an
 * explicit cross in the knob, so "off" is stated rather than implied by
 * position.
 */
export function ZoneOverviewTemplate({
  brandName = "Acme",
  className,
  page = "overview",
}: ZoneOverviewProps) {
  return (
    <Surface tokens={zoneTokens} className={className}>
      <Shell className="flex-col">
        {/*
          A header is one row of controls, and at 390px the search field, the
          Add button and the two menus stop fitting. Scrolling keeps all four
          reachable; narrowing the row would clip the last two off the edge.
        */}
        <header className="flex h-[63px] shrink-0 items-center gap-[17px] overflow-x-auto border-b border-[color:var(--ob-border)] px-[20px]">
          <Wordmark name={brandName} size={21} mark={26} radius={8} />
          <span className="ml-auto flex shrink-0 items-center gap-[9px] rounded-[var(--ob-radius)] border border-[color:var(--ob-border-strong)] px-[13px] py-[9px] text-[0.833rem] text-[color:var(--ob-muted)]">
            <SearchIcon size={15} />
            <span className="w-[108px]">Go to…</span>
            <kbd className="rounded border border-[color:var(--ob-border)] px-[6px] py-[2px] text-[0.6rem] font-semibold">
              ⌘K
            </kbd>
          </span>
          <span className="flex shrink-0 items-center gap-[7px] whitespace-nowrap rounded-[var(--ob-radius)] bg-[color:var(--ob-brand)] px-[17px] py-[9px] text-[0.833rem] font-semibold text-white">
            Add <CaretDownIcon size={12} weight="fill" />
          </span>
          <span className="flex shrink-0 items-center gap-[7px] text-[0.85rem] font-medium">
            Support <CaretDownIcon size={12} weight="fill" />
          </span>
          <span className="flex shrink-0 items-center gap-[7px] text-[0.85rem] font-medium">
            Profile <CaretDownIcon size={12} weight="fill" />
          </span>
        </header>

        <div className="flex min-h-[0px] flex-1">
          <Sidebar width={260} bg="var(--ob-surface)">
            <p className="flex items-center gap-[10px] px-[22px] py-[18px] text-[0.958rem] font-medium">
              <ArrowLeftIcon size={17} className="text-[color:var(--ob-brand)]" /> Alex Smith
            </p>
            <div className="mx-[0px] border-t border-[color:var(--ob-border)]" />

            <nav className="grid py-[7px]">
              {NAV.map((item) => {
                const active = item.id === page;
                return (
                  <div
                    key={item.id}
                    className={cn(
                      active &&
                        "border-l-[2px] border-[color:var(--ob-brand)] bg-[color-mix(in_oklab,#0051c3_6%,transparent)]",
                    )}
                  >
                    <NavItem
                      label={
                        item.badge ? (
                          <span className="flex items-center gap-[9px]">
                            {item.label}
                            <span className="rounded-full bg-[color-mix(in_oklab,#f6821f_22%,transparent)] px-[7px] py-[2px] text-[0.649rem] font-semibold text-[#9a5209]">
                              {item.badge}
                            </span>
                          </span>
                        ) : (
                          item.label
                        )
                      }
                      glyph={<item.Icon size={17} className="text-[color:var(--ob-brand)]" />}
                      trailing={
                        item.caret ? (
                          <CaretDownIcon size={11} weight="fill" className="opacity-55" />
                        ) : undefined
                      }
                      className={cn(
                        "rounded-none gap-[19px] px-[25px] py-[10px] text-[0.899rem] text-[color:var(--ob-fg)]",
                        active &&
                          "bg-transparent font-medium text-[color:var(--ob-brand)]",
                      )}
                    />
                  </div>
                );
              })}
            </nav>

            <p className="mt-auto border-t border-[color:var(--ob-border)] px-[17px] py-[13px] text-[0.85rem] text-[color:var(--ob-fg-soft)]">
              <CaretDoubleLeftIcon size={13} /> Collapse sidebar
            </p>
          </Sidebar>

          <Main className="overflow-auto">
            <div className="flex flex-wrap items-center gap-[10px] border-b border-[color:var(--ob-border)] px-[20px] py-[18px]">
              <CardIcon size={15} />
              <span className="text-[1.041rem] font-medium">content-acme.org</span>
              <ArrowsUpDownIcon size={15} />
              <span className="ml-[7px] flex items-center gap-[6px] whitespace-nowrap rounded-full bg-[color-mix(in_oklab,#1d8102_16%,transparent)] px-[10px] py-[3px] text-[0.791rem] font-medium text-[color:var(--ob-success)]">
                <CheckIcon size={12} weight="bold" /> Active
              </span>
              <span className="flex items-center gap-[6px] whitespace-nowrap rounded-full border border-[color:var(--ob-border-strong)] px-[10px] py-[3px] text-[0.791rem]">
                <StarIcon size={12} /> Star
              </span>
              <span className="rounded-full border border-[color:var(--ob-border-strong)] px-[10px] py-[3px] text-[0.791rem]">
                Free plan
              </span>
            </div>

            <div className="flex items-center gap-[10px] border-b border-[color:var(--ob-border)] bg-[color-mix(in_oklab,#0051c3_5%,transparent)] px-[20px] py-[18px]">
              <p className="flex-1 text-[0.899rem]">
                Why did you choose a Free plan?{" "}
                <span className="font-medium underline">Share your feedback</span>{" "}
                <ExternalSquareIcon size={12} className="inline align-[-1px]" />
              </p>
              <span className="text-[color:var(--ob-muted)]">
                <CrossIcon size={15} />
              </span>
            </div>

            <div className="grid gap-[33px] px-[27px] py-[23px] xl:grid-cols-[minmax(0,1fr)_440px]">
              <div>
                <p className="text-[0.875rem] text-[color:var(--ob-fg-soft)]">Overview</p>
                <h1 className="pt-[7px] text-[1.749rem] font-normal">content-acme.org</h1>
                <p className="max-w-[62ch] pt-[10px] text-[0.899rem] leading-relaxed text-[color:var(--ob-fg-soft)]">
                  Monitor security and performance for content-acme.org. Configure
                  products and services from the menu.
                </p>
                <span className="mt-[17px] inline-flex items-center gap-[9px] rounded-full border border-[color:var(--ob-brand)] px-[17px] py-[9px] text-[0.85rem] font-medium text-[color:var(--ob-brand)]">
                  <ArticleIcon size={15} /> Review fundamentals
                </span>

                <div className="flex flex-wrap items-baseline gap-[20px] pt-[23px]">
                  {["24 Hours", "7 Days", "30 Days"].map((range, index) => (
                    <span
                      key={range}
                      className={cn(
                        "text-[0.875rem]",
                        index === 0
                          ? "border-b-2 border-[color:var(--ob-brand)] pb-[3px] font-medium text-[color:var(--ob-brand)]"
                          : "text-[color:var(--ob-fg-soft)]",
                      )}
                    >
                      {range}
                    </span>
                  ))}
                  <span className="ml-auto text-[0.767rem] font-medium uppercase tracking-wide text-[color:var(--ob-muted)]">
                    15 February — 16 February
                  </span>
                </div>

                <div className="pt-[13px]">
                  {METRICS.map((metric) => (
                    <div
                      key={metric.id}
                      className="grid items-center gap-[20px] border-t border-[color:var(--ob-border)] py-[17px] sm:grid-cols-[210px_minmax(0,1fr)]"
                    >
                      <div>
                        <p className="text-[0.899rem]">{metric.label}</p>
                        <p className="pt-[3px] text-[1.583rem] font-bold leading-none tabular-nums">
                          {metric.value}
                        </p>
                      </div>
                      <DottedArea points={metric.points} />
                    </div>
                  ))}
                </div>
              </div>

              <aside className="grid content-start gap-[23px]">
                <section>
                  <h2 className="pb-[10px] text-[1.25rem] font-normal">DNS</h2>
                  <p className="flex items-center gap-[7px] pb-[10px] text-[0.899rem]">
                    DNS Setup: Full <InfoDot />
                  </p>
                  <p className="border-t border-[color:var(--ob-border)] pt-[10px] text-[0.899rem] font-medium text-[color:var(--ob-brand)] underline">
                    DNS Records
                  </p>
                </section>

                <section>
                  <h2 className="pb-[13px] text-[1.25rem] font-normal">Quick Actions</h2>
                  {[
                    {
                      id: "attack",
                      title: "Under Attack Mode",
                      body: "Show visitors a JavaScript challenge when they visit your site.",
                      link: "About Under Attack Mode",
                    },
                    {
                      id: "dev",
                      title: "Development Mode",
                      body: "Temporarily bypass our cache. See changes to your origin server in realtime.",
                      link: "About Development Mode",
                    },
                  ].map((row) => (
                    <div
                      key={row.id}
                      className="flex items-start gap-[17px] border-b border-[color:var(--ob-border)] py-[13px]"
                    >
                      <div className="flex-1">
                        <h3 className="text-[0.933rem] font-medium">{row.title}</h3>
                        <p className="pt-[6px] text-[0.85rem] leading-relaxed text-[color:var(--ob-fg-soft)]">
                          {row.body}
                        </p>
                        <p className="pt-[7px] text-[0.85rem] font-medium text-[color:var(--ob-brand)] underline">
                          {row.link}{" "}
                          <ExternalSquareIcon size={12} className="inline align-[-1px]" />
                        </p>
                      </div>
                      {/* Off states the word: the knob carries an explicit cross. */}
                      <span className="mt-[3px] grid h-[23px] w-[46px] shrink-0 grid-cols-2 items-center rounded-full bg-[color:var(--ob-surface-3)] px-[3px]">
                        <span className="size-[17px] rounded-full bg-white shadow-[0_1px_2px_rgba(0,0,0,0.2)]" />
                        <span className="grid place-items-center text-[color:var(--ob-fg-soft)]">
                          <CrossIcon size={10} weight="bold" />
                        </span>
                      </span>
                    </div>
                  ))}
                  <p className="pt-[13px] text-[0.899rem] font-medium text-[color:var(--ob-brand)] underline">
                    Run speed test
                  </p>
                  <p className="pt-[10px] text-[0.899rem] font-medium text-[color:var(--ob-brand)] underline">
                    Configure caching
                  </p>
                </section>

                <section>
                  <h2 className="pb-[10px] text-[1.25rem] font-normal">Domain Registration</h2>
                  <p className="text-[0.899rem]">Registrar: Unknown</p>
                  <p className="pt-[10px] text-[0.899rem] font-medium text-[color:var(--ob-brand)] underline">
                    Transfer to us
                  </p>
                </section>

                <section>
                  <h2 className="pb-[10px] text-[1.25rem] font-normal">Active Subscriptions</h2>
                  <p className="flex items-center gap-[10px] text-[0.899rem]">
                    <span className="flex-1 font-medium text-[color:var(--ob-brand)] underline">
                      Billing
                    </span>
                    <span className="text-[0.833rem] text-[color:var(--ob-muted)]">
                      Next bill: March 14, 2025
                    </span>
                  </p>
                </section>
              </aside>
            </div>
          </Main>
        </div>
      </Shell>
    </Surface>
  );
}

function InfoDot(): ReactNode {
  return (
    <span
      aria-hidden
      className="grid size-[12px] shrink-0 place-items-center rounded-full border border-[color:var(--ob-border-strong)] text-[0.5rem] text-[color:var(--ob-muted)]"
    >
      i
    </span>
  );
}

/**
 * Per-point dots and vertical gridlines, both specific to this surface — and
 * both are what let a flat-zero series still read as measured data.
 */
function DottedArea({ points }: { points: number[] }) {
  const width = 900;
  const height = 110;
  const max = Math.max(...points, 1);
  const step = width / (points.length - 1);
  const y = (value: number) => height - (value / max) * (height - 8) - 4;
  const line = points
    .map((value, i) => `${i === 0 ? "M" : "L"}${i * step},${y(value)}`)
    .join(" ");

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className="h-[92px] w-full"
      preserveAspectRatio="none"
      role="img"
      aria-label="Metric over the selected window"
    >
      {points.map((_, index) => (
        <line
          key={index}
          x1={index * step}
          x2={index * step}
          y1={0}
          y2={height}
          stroke="var(--ob-surface-3)"
          strokeWidth={1}
          vectorEffect="non-scaling-stroke"
        />
      ))}
      <path
        d={`${line} L${width},${height} L0,${height} Z`}
        fill="color-mix(in oklab, #0051c3 18%, transparent)"
      />
      <path
        d={line}
        fill="none"
        stroke="#3b82f6"
        strokeWidth={1.5}
        vectorEffect="non-scaling-stroke"
      />
      {points.map((value, index) => (
        <circle
          key={index}
          cx={index * step}
          cy={y(value)}
          r={3}
          fill="#3b82f6"
          vectorEffect="non-scaling-stroke"
        />
      ))}
    </svg>
  );
}
