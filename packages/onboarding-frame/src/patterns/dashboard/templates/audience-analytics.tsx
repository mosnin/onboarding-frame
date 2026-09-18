"use client";

import { cn } from "../../../lib/cn";
import { AvatarSlot, LogoSlot } from "../../../ui/placeholder";
import { Surface, audienceTokens } from "./tokens";
import { Main, NavItem, Shell, Sidebar } from "./chrome";
import type { TemplateProps } from "./api-console";

export type AudiencePage = "audience" | "dashboard" | "reports";

export interface AudienceAnalyticsProps extends TemplateProps {
  page?: AudiencePage;
}

const NAV = [
  { id: "campaigns", label: "Campaigns", glyph: "📣", caret: true },
  { id: "automations", label: "Automations", glyph: "⑄", caret: true },
  { id: "sms", label: "SMS", glyph: "💬", badge: "New", caret: true },
  { id: "audiences", label: "Audience", glyph: "👥", caret: true },
];

const ANALYTICS_CHILDREN = [
  { id: "dashboard", label: "Marketing dashboard" },
  { id: "audience", label: "Audience" },
  { id: "reports", label: "Reports" },
  { id: "custom", label: "Custom reports" },
];

const TAIL = [
  { id: "website", label: "Website", glyph: "▤", caret: true },
  { id: "content", label: "Content", glyph: "▨", caret: true },
  { id: "integrations", label: "Integrations", glyph: "▦", caret: true },
];

const DAYS = [
  "Jul 07", "Jul 08", "Jul 09", "Jul 10", "Jul 11", "Jul 12", "Jul 13", "Jul 14",
  "Jul 15", "Jul 16", "Jul 17", "Jul 18", "Jul 19", "Jul 20", "Jul 21", "Jul 22",
  "Jul 23", "Jul 24", "Jul 25", "Jul 26", "Jul 27", "Jul 28", "Jul 29", "Jul 30",
  "Jul 31", "Aug 01", "Aug 02", "Aug 03", "Aug 04", "Aug 05",
];

/** Two sign-ups all month. Every other day is a real zero, so every day is dotted. */
const GROWTH = [
  0, 0, 0, 0, 0, 1, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0,
];

/**
 * Audience analytics.
 *
 * Two details define this surface: a dot on *every* day of the series, which
 * marks each zero as a real reading rather than a gap, and a solid baseline
 * drawn at zero underneath. Together they let a month with two sign-ups be
 * shown at full scale without looking like a broken chart.
 */
export function AudienceAnalyticsTemplate({
  className,
  page = "audience",
}: AudienceAnalyticsProps) {
  return (
    <Surface tokens={audienceTokens} className={className}>
      <Shell className="flex-col">
        {/* The brand appears as a band, not as a button colour. */}
        <span className="h-1.5 shrink-0 bg-[color:var(--ob-cta-bg)]" />

        <header className="flex h-[70px] shrink-0 items-center gap-4 border-b border-[color:var(--ob-border)] px-6">
          <LogoSlot size={38} label="" radius={19} />
          <div className="mx-auto flex w-full max-w-[790px] items-center gap-2.5 rounded-full border border-[color:var(--ob-border-strong)] px-5 py-3 text-[1.05rem] text-[color:var(--ob-fg-soft)]">
            <span aria-hidden>⌕</span> Search
          </div>
          <span className="flex items-center gap-3">
            <span className="flex items-center gap-2 rounded-full bg-[color-mix(in_oklab,#ffe01b_35%,white)] px-4 py-2.5 text-[1rem] font-medium">
              <span aria-hidden className="text-[color:var(--ob-success)]">
                ●
              </span>
              Live expert help
            </span>
            <AvatarSlot size={38} />
          </span>
        </header>

        <div className="flex min-h-0 flex-1">
          <Sidebar width={350} bg="var(--ob-surface)" className="border-r-0">
            <div className="px-5 pb-5 pt-5">
              <span className="flex items-center justify-center gap-2.5 rounded-full border border-[color:var(--ob-fg)] py-3.5 text-[1.1rem] font-medium">
                <span aria-hidden>✎</span> Create
              </span>
            </div>

            <nav className="grid gap-0.5 px-3">
              {NAV.map((item) => (
                <NavItem
                  key={item.id}
                  label={
                    item.badge ? (
                      <span className="flex items-center gap-2">
                        {item.label}
                        <span className="rounded bg-[color-mix(in_oklab,#8b5cf6_16%,transparent)] px-1.5 py-0.5 text-[0.76rem] font-semibold text-[#6d3fd4]">
                          {item.badge}
                        </span>
                      </span>
                    ) : (
                      item.label
                    )
                  }
                  glyph={item.glyph}
                  trailing={
                    <span aria-hidden className="text-[0.7rem] opacity-50">
                      ⌄
                    </span>
                  }
                  className="text-[1.08rem]"
                />
              ))}

              <NavItem
                label="Analytics"
                glyph="▥"
                active
                trailing={
                  <span aria-hidden className="text-[0.7rem] opacity-50">
                    ⌃
                  </span>
                }
                className="text-[1.08rem]"
              />
              {ANALYTICS_CHILDREN.map((item) => (
                <NavItem
                  key={item.id}
                  label={item.label}
                  indent
                  active={item.id === page}
                  className="text-[1.05rem]"
                />
              ))}

              {TAIL.map((item) => (
                <NavItem
                  key={item.id}
                  label={item.label}
                  glyph={item.glyph}
                  trailing={
                    <span aria-hidden className="text-[0.7rem] opacity-50">
                      ⌄
                    </span>
                  }
                  className="text-[1.08rem]"
                />
              ))}
            </nav>

            <span aria-hidden className="mt-auto px-6 pb-6 text-[color:var(--ob-fg-soft)]">
              ◫
            </span>
          </Sidebar>

          <Main className="overflow-auto bg-[color:var(--ob-surface-2)]">
            <header className="flex items-center gap-4 border-b border-[color:var(--ob-border)] bg-[color:var(--ob-surface)] px-10 py-5">
              <h1
                className="flex-1 text-[2rem] font-bold tracking-[-0.01em]"
                style={{ fontFamily: "var(--ob-font-display)" }}
              >
                Audience analytics
              </h1>
              <span className="text-[1.05rem] font-medium text-[color:var(--ob-brand)]">
                Manage contacts
              </span>
            </header>

            <div className="grid gap-6 p-8">
              <section className="rounded-[var(--ob-radius-lg)] border border-[color:var(--ob-border)] bg-[color:var(--ob-surface)] px-8 pb-6 pt-5">
                <div className="flex flex-wrap items-center justify-center gap-7 pb-4">
                  {[
                    { label: "Subscribed", color: "#7a9a3e" },
                    { label: "Unsubscribed", color: "#c9d97a" },
                    { label: "Non-subscribed", color: "#9dc5e8" },
                  ].map((item) => (
                    <span key={item.label} className="flex items-center gap-2.5">
                      <span
                        aria-hidden
                        className="h-2 w-5 rounded-full"
                        style={{ background: item.color }}
                      />
                      <span className="text-[1rem] text-[color:var(--ob-fg-soft)]">
                        {item.label}
                      </span>
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-center gap-6 border-b border-[color:var(--ob-border)] pb-5 text-[1.05rem]">
                  <span className="tabular-nums">0 - 16 of 30</span>
                  <span className="flex items-center gap-1.5 text-[color:var(--ob-fg-soft)]">
                    <span aria-hidden>‹</span> Previous
                  </span>
                  <span className="flex items-center gap-1.5 font-medium text-[color:var(--ob-brand)]">
                    Next <span aria-hidden>›</span>
                  </span>
                </div>

                <p className="pt-5 text-[1.02rem] text-[color:var(--ob-fg-soft)]">
                  Note: This new way of viewing your subscriber data by channel was
                  launched April 1, 2024
                </p>
              </section>

              <section className="rounded-[var(--ob-radius-lg)] border border-[color:var(--ob-border)] bg-[color:var(--ob-surface)] px-8 py-7">
                <h2
                  className="text-[2rem] font-bold tracking-[-0.01em]"
                  style={{ fontFamily: "var(--ob-font-display)" }}
                >
                  What&apos;s changed
                </h2>
                <p className="pt-1 text-[1.05rem] text-[color:var(--ob-fg-soft)]">
                  Jul 7, 2024 - Aug 5, 2024
                </p>

                <div className="mt-6 flex flex-wrap items-center gap-4 border-t border-[color:var(--ob-border)] pt-6">
                  {/* Dotted underline marks a term with a definition on hover. */}
                  <h3 className="flex-1 border-b-2 border-dotted border-[color:var(--ob-brand)] pb-0.5 text-[1.25rem] font-medium">
                    Total net subscriptions growth
                  </h3>
                  <span className="inline-flex rounded-[var(--ob-radius)] border border-[color:var(--ob-border-strong)] p-1">
                    {["Day", "Week", "Month"].map((range, index) => (
                      <span
                        key={range}
                        className={cn(
                          "px-6 py-2 text-[1.05rem]",
                          index === 0
                            ? "rounded-[var(--ob-radius-sm)] bg-[color:var(--ob-surface)] font-medium shadow-[0_1px_3px_rgba(0,0,0,0.12)]"
                            : "border-l border-[color:var(--ob-border)] text-[color:var(--ob-fg-soft)]",
                        )}
                      >
                        {range}
                      </span>
                    ))}
                  </span>
                </div>

                <p className="flex items-center gap-4 pt-5">
                  <span className="text-[1.7rem] font-bold tabular-nums">4</span>
                  <span
                    aria-hidden
                    className="grid size-8 place-items-center rounded-full bg-[color:var(--ob-surface-2)] text-[color:var(--ob-muted)]"
                  >
                    --
                  </span>
                  <span className="text-[1.05rem] text-[color:var(--ob-fg-soft)]">
                    compared to last year
                  </span>
                </p>

                <GrowthChart />
              </section>
            </div>
          </Main>

          {/* A feedback tab pinned to the window edge, rotated in place. */}
          <span className="hidden shrink-0 items-start pt-40 xl:flex">
            <span
              className="rounded-l-[var(--ob-radius-sm)] bg-[color:var(--ob-surface-2)] px-2 py-5 text-[0.92rem] text-[color:var(--ob-fg-soft)]"
              style={{ writingMode: "vertical-rl" }}
            >
              Feedback
            </span>
          </span>
        </div>
      </Shell>
    </Surface>
  );
}

function GrowthChart() {
  const width = 1280;
  const height = 360;
  const max = 4;
  const step = width / (GROWTH.length - 1);
  const y = (value: number) => height - (value / max) * height;
  const line = GROWTH.map(
    (value, i) => `${i === 0 ? "M" : "L"}${i * step},${y(value)}`,
  ).join(" ");

  return (
    <div className="flex gap-3 pt-5">
      <div className="grid shrink-0 pr-1 text-right text-[0.95rem] tabular-nums text-[color:var(--ob-fg-soft)]">
        {[4, 3, 2, 1, 0].map((tick, index) => (
          <span
            key={tick}
            className={cn("leading-none", index > 0 && "mt-[calc((360px/4)-0.8em)]")}
          >
            {tick}
          </span>
        ))}
      </div>

      <div className="min-w-0 flex-1">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="h-[360px] w-full"
          preserveAspectRatio="none"
          role="img"
          aria-label="Net subscriptions per day"
        >
          {[0, 1, 2, 3, 4].map((index) => (
            <line
              key={index}
              x1={0}
              x2={width}
              y1={(height / 4) * index}
              y2={(height / 4) * index}
              stroke="var(--ob-border)"
              strokeWidth={1}
              vectorEffect="non-scaling-stroke"
            />
          ))}
          {/* Solid zero baseline under the series. */}
          <line
            x1={0}
            x2={width}
            y1={height}
            y2={height}
            stroke="var(--ob-fg)"
            strokeWidth={1.5}
            vectorEffect="non-scaling-stroke"
          />
          <path
            d={line}
            fill="none"
            stroke="var(--ob-success)"
            strokeWidth={2}
            vectorEffect="non-scaling-stroke"
          />
          {GROWTH.map((value, index) => (
            <circle
              key={index}
              cx={index * step}
              cy={y(value)}
              r={5}
              fill="var(--ob-success)"
              vectorEffect="non-scaling-stroke"
            />
          ))}
        </svg>

        <div className="flex pt-3">
          {DAYS.map((day) => (
            <span
              key={day}
              className="flex-1 whitespace-nowrap text-[0.8rem] text-[color:var(--ob-fg-soft)]"
              style={{ transform: "rotate(-45deg)", transformOrigin: "left top" }}
            >
              {day}
            </span>
          ))}
        </div>

        <p className="flex items-center justify-end gap-2.5 pt-12 text-[1rem]">
          <span aria-hidden className="h-0.5 w-5 bg-[color:var(--ob-success)]" />
          <span
            aria-hidden
            className="-ml-4 size-2.5 rounded-full bg-[color:var(--ob-success)]"
          />
          <span className="pl-1">Main list</span>
        </p>
      </div>
    </div>
  );
}
