"use client";

import type { ReactNode } from "react";
import { BarChart, LineChart } from "../../../ui/charts";
import {
  CalendarIcon,
  GridFourIcon,
  RocketIcon,
  RobotIcon,
} from "../../../ui/icons-solid";
import { Avatar } from "../../../ui/avatar";
import { cn } from "../../../lib/cn";
import { Surface, usageTokens } from "./tokens";
import { Main, Shell, Sidebar } from "./chrome";
import type { TemplateProps } from "./props";

export type UsagePage = "models" | "overview";

export interface TokenUsageProps extends TemplateProps {
  page?: UsagePage;
}

const RAIL = ["⌕", "⌂", "⛁", "⑄", "✎", "🌐", "⚯", "▥", "🤖"];

const MODELS = [
  { id: "gpt-53", name: "gpt-5.3-chat-latest", provider: "OpenAI", tokens: "2,970" },
  { id: "gpt-4o-mini", name: "gpt-4o-mini", provider: "OpenAI", tokens: "1,764" },
];

const DAYS = ["Apr 15", "Apr 16", "Apr 17", "Apr 18", "Apr 19", "Apr 20", "Apr 21"];

/**
 * Three days of the week had no calls at all. Those days are plotted as zero
 * bars rather than dropped, so the gaps in usage are visible instead of the
 * chart silently compressing a sparse week into a dense one.
 */
const INPUT = [470, 165, 148, 0, 0, 455, 0];
const OUTPUT = [180, 62, 28, 0, 0, 240, 0];
const TOTAL = [690, 400, 230, 215, 60, 0, 40, 260, 690, 700, 640, 300, 0];

/**
 * Token usage analytics.
 *
 * Slate is the only data colour on the page — no brand hue — which keeps a
 * screen made almost entirely of charts reading as instrumentation. The model
 * list on the left is the selector: picking a row swaps the whole right
 * column, so the two panes are one control rather than two reports.
 */
export function TokenUsageTemplate({
  brandName = "Acme",
  userName = "Alex Rivera",
  className,
  page = "models",
}: TokenUsageProps) {
  return (
    <Surface tokens={usageTokens} className={className}>
      <Shell>
        <Sidebar width={68} bg="var(--ob-surface)" className="items-center">
          <div className="pb-4 pt-4">
            <Avatar name={brandName} size={26} rounded={7} />
          </div>
          <nav className="grid gap-3">
            {RAIL.map((glyph, index) => (
              <span
                key={index}
                aria-hidden
                className={cn(
                  "grid size-9 place-items-center rounded-[var(--ob-radius-sm)] text-[0.98rem]",
                  index === 7
                    ? "bg-[color:var(--ob-surface-3)] text-[color:var(--ob-fg)]"
                    : "text-[color:var(--ob-muted)]",
                )}
              >
                {glyph}
              </span>
            ))}
          </nav>

          <nav className="mt-auto grid gap-3 pb-5">
            <RocketIcon size={14} />
            {["⌾", "?", "◍"].map((glyph) => (
              <span
                key={glyph}
                aria-hidden
                className="grid size-9 place-items-center text-[0.98rem] text-[color:var(--ob-muted)]"
              >
                {glyph}
              </span>
            ))}
            <Avatar name={userName} size={26} rounded={13} />
          </nav>
        </Sidebar>

        <Main className="overflow-auto">
          <header className="flex h-16 shrink-0 items-center gap-3 border-b border-[color:var(--ob-border)] px-6">
            <h1 className="flex-1 text-[1.15rem] font-semibold">Project Analytics</h1>
            <Select>Last 7 days</Select>
            <Select glyph={<CalendarIcon size={14} />}>Apr 15, 2026 - Apr 21, 2026</Select>
          </header>

          <div className="p-6">
            <div className="inline-flex gap-1 rounded-[var(--ob-radius)] bg-[color:var(--ob-surface-2)] p-1">
              {[
                { id: "overview", label: "Overview", Icon: GridFourIcon },
                { id: "models", label: "Models", Icon: RobotIcon },
              ].map((tab) => (
                <span
                  key={tab.id}
                  className={cn(
                    "flex items-center gap-2 rounded-[var(--ob-radius-sm)] px-4 py-2 text-[0.95rem]",
                    tab.id === page
                      ? "bg-[color:var(--ob-surface)] font-semibold shadow-[0_1px_2px_rgba(16,24,40,0.08)]"
                      : "text-[color:var(--ob-fg-soft)]",
                  )}
                >
                  <tab.Icon size={14} />
                  {tab.label}
                </span>
              ))}
            </div>

            <div className="grid gap-5 pt-5 lg:grid-cols-[minmax(0,0.42fr)_minmax(0,1fr)]">
              <section className="rounded-[var(--ob-radius)] border border-[color:var(--ob-border)] p-6">
                <h2 className="text-[1.15rem] font-bold">Top models</h2>
                <p className="pt-2 text-[0.95rem] leading-relaxed text-[color:var(--ob-muted)]">
                  Explore organization-wide token usage grouped by provider, model,
                  and connection.
                </p>

                <ul className="grid gap-3 pt-5">
                  {MODELS.map((model) => (
                    <li
                      key={model.id}
                      aria-current={model.id === "gpt-4o-mini" ? "true" : undefined}
                      className={cn(
                        "rounded-[var(--ob-radius)] border border-[color:var(--ob-border)] p-4",
                        model.id === "gpt-4o-mini" && "bg-[color:var(--ob-surface-2)]",
                      )}
                    >
                      <div className="flex items-start gap-3">
                        <h3 className="flex-1 font-bold">{model.name}</h3>
                        <span className="text-right">
                          <span className="block text-[0.72rem] font-semibold uppercase tracking-wide text-[color:var(--ob-muted)]">
                            Total tokens
                          </span>
                          <span className="block pt-0.5 text-[1.05rem] font-bold tabular-nums">
                            {model.tokens}
                          </span>
                        </span>
                      </div>
                      <span className="mt-2.5 inline-flex rounded-[var(--ob-radius-sm)] border border-[color:var(--ob-border)] bg-[color:var(--ob-surface)] px-2.5 py-1 text-[0.82rem] font-medium">
                        {model.provider}
                      </span>
                    </li>
                  ))}
                </ul>
              </section>

              <div className="grid content-start gap-5">
                <section className="rounded-[var(--ob-radius)] border border-[color:var(--ob-border)] p-6">
                  <div className="flex items-start gap-3">
                    <h2 className="flex flex-1 items-center gap-2 text-[1.15rem] font-bold">
                      <span aria-hidden>🤖</span> gpt-4o-mini
                    </h2>
                    <span className="rounded-[var(--ob-radius-sm)] border border-[color:var(--ob-border)] px-2.5 py-1 text-[0.82rem] font-medium">
                      OpenAI
                    </span>
                  </div>
                  <p className="pt-2 text-[0.95rem] text-[color:var(--ob-muted)]">
                    Inspect the selected model across the current date range.
                  </p>

                  <div className="grid gap-4 pt-5 sm:grid-cols-3">
                    {[
                      { label: "Total tokens", value: "1,764" },
                      { label: "Input tokens", value: "1,255" },
                      { label: "Output tokens", value: "509" },
                    ].map((stat) => (
                      <div
                        key={stat.label}
                        className="rounded-[var(--ob-radius)] border border-[color:var(--ob-border)] bg-[color:var(--ob-surface-2)] px-5 py-4"
                      >
                        <p className="text-[0.72rem] font-semibold uppercase tracking-wide text-[color:var(--ob-muted)]">
                          {stat.label}
                        </p>
                        <p className="pt-1.5 text-[1.6rem] font-bold tabular-nums leading-none">
                          {stat.value}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>

                <section className="rounded-[var(--ob-radius)] border border-[color:var(--ob-border)] p-6">
                  <h2 className="pb-4 font-bold">Total token trend</h2>
                  <LineChart
                    height={215}
                    smooth
                    gridLines={0}
                    yLabels={["0", "200", "400", "700"]}
                    xLabels={DAYS}
                    series={[{ id: "total", points: TOTAL, color: "#5b6472", area: true }]}
                  />
                </section>

                <div className="grid gap-5 xl:grid-cols-2">
                  <TrendCard
                    title="Input token trend"
                    values={INPUT}
                    labels={["0", "150", "300", "470"]}
                    max={470}
                  />
                  <TrendCard
                    title="Output token trend"
                    values={OUTPUT}
                    labels={["0", "60", "120", "180", "240"]}
                    max={240}
                  />
                </div>
              </div>
            </div>
          </div>
        </Main>
      </Shell>
    </Surface>
  );
}

function TrendCard({
  title,
  values,
  labels,
  max,
}: {
  title: string;
  values: number[];
  labels: string[];
  max: number;
}) {
  return (
    <section className="rounded-[var(--ob-radius)] border border-[color:var(--ob-border)] p-6">
      <h2 className="pb-4 font-bold">{title}</h2>
      <BarChart
        height={185}
        values={values}
        max={max}
        color="#5b6472"
        yLabels={labels}
        xLabels={DAYS}
      />
    </section>
  );
}

function Select({ children, glyph }: { children: ReactNode; glyph?: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-6 rounded-[var(--ob-radius-sm)] border border-[color:var(--ob-border-strong)] px-3.5 py-2 text-[0.92rem]">
      <span className="flex items-center gap-2">
        {glyph && (
          <span aria-hidden className="text-[color:var(--ob-muted)]">
            {glyph}
          </span>
        )}
        {children}
      </span>
      <span aria-hidden className="text-[0.7rem] opacity-60">
        ⌃⌄
      </span>
    </span>
  );
}
