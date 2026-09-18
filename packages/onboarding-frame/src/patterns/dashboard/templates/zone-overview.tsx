"use client";

import type { ReactNode } from "react";
import { cn } from "../../../lib/cn";
import { LogoSlot, WordmarkSlot } from "../../../ui/placeholder";
import { Surface, zoneTokens } from "./tokens";
import { Main, NavItem, Shell, Sidebar } from "./chrome";
import type { TemplateProps } from "./props";

export type ZonePage = "overview" | "analytics" | "dns";

export interface ZoneOverviewProps extends TemplateProps {
  page?: ZonePage;
}

const NAV = [
  { id: "overview", label: "Overview", glyph: "📋" },
  { id: "audit", label: "AI Audit", glyph: "🤖", badge: "Beta" },
  { id: "analytics", label: "Analytics & Logs", glyph: "◔", caret: true },
  { id: "dns", label: "DNS", glyph: "⑄", caret: true },
  { id: "email", label: "Email", glyph: "✉", caret: true },
  { id: "ssl", label: "SSL/TLS", glyph: "🔒", caret: true },
  { id: "security", label: "Security", glyph: "⛉", caret: true },
  { id: "access", label: "Access", glyph: "⊕" },
  { id: "speed", label: "Speed", glyph: "⚡", caret: true },
  { id: "caching", label: "Caching", glyph: "⛁", caret: true },
  { id: "workers", label: "Workers Routes", glyph: "◈" },
  { id: "rules", label: "Rules", glyph: "⚟", caret: true },
  { id: "network", label: "Network", glyph: "◎" },
  { id: "traffic", label: "Traffic", glyph: "⤳", caret: true },
  { id: "pages", label: "Custom Pages", glyph: "▤" },
  { id: "apps", label: "Apps", glyph: "▦" },
  { id: "scrape", label: "Scrape Shield", glyph: "▥" },
  { id: "tags", label: "Tag Manager", glyph: "≣", caret: true },
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
 * explicit ✕ in the knob, so "off" is stated rather than implied by position.
 */
export function ZoneOverviewTemplate({ className, page = "overview" }: ZoneOverviewProps) {
  return (
    <Surface tokens={zoneTokens} className={className}>
      <Shell className="flex-col">
        <header className="flex h-[76px] shrink-0 items-center gap-5 border-b border-[color:var(--ob-border)] px-6">
          <WordmarkSlot width={150} height={34} label="" />
          <span className="ml-auto flex items-center gap-2.5 rounded-[var(--ob-radius)] border border-[color:var(--ob-border-strong)] px-4 py-2.5 text-[1rem] text-[color:var(--ob-muted)]">
            <span aria-hidden>⌕</span>
            <span className="w-[130px]">Go to…</span>
            <kbd className="rounded border border-[color:var(--ob-border)] px-1.5 py-0.5 text-[0.72rem] font-semibold">
              ⌘K
            </kbd>
          </span>
          <span className="rounded-[var(--ob-radius)] bg-[color:var(--ob-brand)] px-5 py-2.5 text-[1rem] font-semibold text-white">
            Add ▾
          </span>
          <span className="text-[1.02rem] font-medium">Support ▾</span>
          <span className="text-[1.02rem] font-medium">Profile ▾</span>
        </header>

        <div className="flex min-h-0 flex-1">
          <Sidebar width={345} bg="var(--ob-surface)">
            <p className="flex items-center gap-3 px-5 py-4 text-[1.15rem] font-medium">
              <span aria-hidden>←</span> Alex Smith
            </p>
            <div className="mx-0 border-t border-[color:var(--ob-border)]" />

            <nav className="grid gap-0.5 py-2">
              {NAV.map((item) => {
                const active = item.id === page;
                return (
                  <div
                    key={item.id}
                    className={cn(
                      active &&
                        "border-l-[3px] border-[color:var(--ob-brand)] bg-[color-mix(in_oklab,#0051c3_6%,transparent)]",
                    )}
                  >
                    <NavItem
                      label={
                        item.badge ? (
                          <span className="flex items-center gap-2.5">
                            {item.label}
                            <span className="rounded-full bg-[color-mix(in_oklab,#f6821f_22%,transparent)] px-2 py-0.5 text-[0.78rem] font-semibold text-[#9a5209]">
                              {item.badge}
                            </span>
                          </span>
                        ) : (
                          item.label
                        )
                      }
                      glyph={item.glyph}
                      trailing={
                        item.caret ? (
                          <span aria-hidden className="text-[0.7rem] opacity-50">
                            ▾
                          </span>
                        ) : undefined
                      }
                      className={cn(
                        "rounded-none text-[1.08rem]",
                        active &&
                          "bg-transparent font-medium text-[color:var(--ob-brand)]",
                      )}
                    />
                  </div>
                );
              })}
            </nav>

            <p className="mt-auto border-t border-[color:var(--ob-border)] px-5 py-4 text-[1.02rem] text-[color:var(--ob-fg-soft)]">
              <span aria-hidden>«</span> Collapse sidebar
            </p>
          </Sidebar>

          <Main className="overflow-auto">
            <div className="flex flex-wrap items-center gap-3 border-b border-[color:var(--ob-border)] px-6 py-4">
              <span aria-hidden className="text-[1.15rem] text-[color:var(--ob-muted)]">
                ▭
              </span>
              <span className="text-[1.25rem] font-medium">content-acme.org</span>
              <span aria-hidden className="text-[0.75rem] text-[color:var(--ob-muted)]">
                ⇅
              </span>
              <span className="ml-2 flex items-center gap-1.5 rounded-full bg-[color-mix(in_oklab,#1d8102_16%,transparent)] px-3 py-1 text-[0.95rem] font-medium text-[color:var(--ob-success)]">
                ✓ Active
              </span>
              <span className="rounded-full border border-[color:var(--ob-border-strong)] px-3 py-1 text-[0.95rem]">
                ☆ Star
              </span>
              <span className="rounded-full border border-[color:var(--ob-border-strong)] px-3 py-1 text-[0.95rem]">
                Free plan
              </span>
            </div>

            <div className="flex items-center gap-3 border-b border-[color:var(--ob-border)] bg-[color-mix(in_oklab,#0051c3_5%,transparent)] px-6 py-4">
              <p className="flex-1 text-[1.08rem]">
                Why did you choose a Free plan?{" "}
                <span className="font-medium underline">Share your feedback</span>{" "}
                <span aria-hidden className="text-[0.85rem]">
                  ↗
                </span>
              </p>
              <span aria-hidden className="text-[1.15rem] text-[color:var(--ob-muted)]">
                ✕
              </span>
            </div>

            <div className="grid gap-10 px-8 py-7 xl:grid-cols-[minmax(0,1fr)_440px]">
              <div>
                <p className="text-[1.05rem] text-[color:var(--ob-fg-soft)]">Overview</p>
                <h1 className="pt-2 text-[2.1rem] font-normal">content-acme.org</h1>
                <p className="max-w-[62ch] pt-3 text-[1.08rem] leading-relaxed text-[color:var(--ob-fg-soft)]">
                  Monitor security and performance for content-acme.org. Configure
                  products and services from the menu.
                </p>
                <span className="mt-5 inline-flex items-center gap-2.5 rounded-full border border-[color:var(--ob-brand)] px-5 py-2.5 text-[1.02rem] font-medium text-[color:var(--ob-brand)]">
                  <span aria-hidden>▤</span> Review fundamentals
                </span>

                <div className="flex flex-wrap items-baseline gap-6 pt-7">
                  {["24 Hours", "7 Days", "30 Days"].map((range, index) => (
                    <span
                      key={range}
                      className={cn(
                        "text-[1.05rem]",
                        index === 0
                          ? "border-b-2 border-[color:var(--ob-brand)] pb-1 font-medium text-[color:var(--ob-brand)]"
                          : "text-[color:var(--ob-fg-soft)]",
                      )}
                    >
                      {range}
                    </span>
                  ))}
                  <span className="ml-auto text-[0.92rem] font-medium uppercase tracking-wide text-[color:var(--ob-muted)]">
                    15 February — 16 February
                  </span>
                </div>

                <div className="pt-4">
                  {METRICS.map((metric) => (
                    <div
                      key={metric.id}
                      className="grid items-center gap-6 border-t border-[color:var(--ob-border)] py-5 sm:grid-cols-[210px_minmax(0,1fr)]"
                    >
                      <div>
                        <p className="text-[1.08rem]">{metric.label}</p>
                        <p className="pt-1 text-[1.9rem] font-bold leading-none tabular-nums">
                          {metric.value}
                        </p>
                      </div>
                      <DottedArea points={metric.points} />
                    </div>
                  ))}
                </div>
              </div>

              <aside className="grid content-start gap-7">
                <section>
                  <h2 className="pb-3 text-[1.5rem] font-normal">DNS</h2>
                  <p className="flex items-center gap-2 pb-3 text-[1.08rem]">
                    DNS Setup: Full <InfoDot />
                  </p>
                  <p className="border-t border-[color:var(--ob-border)] pt-3 text-[1.08rem] font-medium text-[color:var(--ob-brand)] underline">
                    DNS Records
                  </p>
                </section>

                <section>
                  <h2 className="pb-4 text-[1.5rem] font-normal">Quick Actions</h2>
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
                      className="flex items-start gap-5 border-b border-[color:var(--ob-border)] py-4"
                    >
                      <div className="flex-1">
                        <h3 className="text-[1.12rem] font-medium">{row.title}</h3>
                        <p className="pt-1.5 text-[1.02rem] leading-relaxed text-[color:var(--ob-fg-soft)]">
                          {row.body}
                        </p>
                        <p className="pt-2 text-[1.02rem] font-medium text-[color:var(--ob-brand)] underline">
                          {row.link}{" "}
                          <span aria-hidden className="text-[0.85rem]">
                            ↗
                          </span>
                        </p>
                      </div>
                      {/* Off states the word: the knob carries an explicit ✕. */}
                      <span className="mt-1 grid h-7 w-14 shrink-0 grid-cols-2 items-center rounded-full bg-[color:var(--ob-surface-3)] px-1">
                        <span className="size-5 rounded-full bg-white shadow-[0_1px_2px_rgba(0,0,0,0.2)]" />
                        <span
                          aria-hidden
                          className="text-center text-[0.72rem] text-[color:var(--ob-fg-soft)]"
                        >
                          ✕
                        </span>
                      </span>
                    </div>
                  ))}
                  <p className="pt-4 text-[1.08rem] font-medium text-[color:var(--ob-brand)] underline">
                    Run speed test
                  </p>
                  <p className="pt-3 text-[1.08rem] font-medium text-[color:var(--ob-brand)] underline">
                    Configure caching
                  </p>
                </section>

                <section>
                  <h2 className="pb-3 text-[1.5rem] font-normal">Domain Registration</h2>
                  <p className="text-[1.08rem]">Registrar: Unknown</p>
                  <p className="pt-3 text-[1.08rem] font-medium text-[color:var(--ob-brand)] underline">
                    Transfer to us
                  </p>
                </section>

                <section>
                  <h2 className="pb-3 text-[1.5rem] font-normal">Active Subscriptions</h2>
                  <p className="flex items-center gap-3 text-[1.08rem]">
                    <span className="flex-1 font-medium text-[color:var(--ob-brand)] underline">
                      Billing
                    </span>
                    <span className="text-[1rem] text-[color:var(--ob-muted)]">
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
      className="grid size-[15px] shrink-0 place-items-center rounded-full border border-[color:var(--ob-border-strong)] text-[0.6rem] text-[color:var(--ob-muted)]"
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
      className="h-[110px] w-full"
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
