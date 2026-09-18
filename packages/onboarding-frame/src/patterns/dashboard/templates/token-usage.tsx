"use client";

import type { ReactNode } from "react";
import { BarChart, LineChart } from "../../../ui/charts";
import {
  BellIcon,
  CalendarIcon,
  CaretUpDownIcon,
  ChartBarIcon,
  DatabaseIcon,
  GitBranchIcon,
  GlobeIcon,
  GridFourIcon,
  HouseIcon,
  NotePencilIcon,
  PlugsIcon,
  PulseIcon,
  QuestionIcon,
  RobotIcon,
  RocketIcon,
  SearchIcon,
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

/*
 * Measured off the reference rail: 47px wide, icons on a 32px pitch with a
 * wider break after search, and the active item sitting in a 30px tile. Each
 * shape is the one the reference draws, read off a magnified crop rather than
 * guessed: plugs for connections, a note and pencil for compose, a branch for
 * versions. All three were previously single characters from whatever font
 * the machine happened to have.
 */
const RAIL = [
  { id: "search", Icon: SearchIcon, gap: true },
  { id: "home", Icon: HouseIcon },
  { id: "data", Icon: DatabaseIcon },
  { id: "connections", Icon: PlugsIcon },
  { id: "compose", Icon: NotePencilIcon },
  { id: "deployments", Icon: GlobeIcon },
  { id: "branches", Icon: GitBranchIcon },
  { id: "analytics", Icon: ChartBarIcon, active: true },
  { id: "agents", Icon: RobotIcon, size: 17 },
];

const RAIL_FOOT = [
  { id: "notifications", Icon: BellIcon },
  { id: "help", Icon: QuestionIcon },
  { id: "status", Icon: PulseIcon, live: true },
];

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
        <Sidebar width={47} bg="var(--ob-surface)" className="items-center">
          <div className="pb-[28px] pt-[10px]">
            <Avatar name={brandName} size={20} rounded={5} variant="neutral" letters={1} />
          </div>
          <Avatar name={userName} size={24} rounded={7} variant="neutral" letters={1} />

          <nav className="grid justify-items-center">
            {RAIL.map((item) => (
              <span
                key={item.id}
                className={cn(
                  "grid size-[30px] place-items-center rounded-[7px]",
                  item.gap ? "mt-[13px] mb-[13px]" : "mb-[2px]",
                  item.active
                    ? "bg-[color:var(--ob-surface-3)] text-[color:var(--ob-fg)]"
                    : "text-[color:var(--ob-fg)]",
                )}
              >
                <item.Icon size={item.size ?? 19} weight="regular" />
              </span>
            ))}
          </nav>

          <nav className="mt-auto grid justify-items-center gap-[2px] pb-[14px]">
            <span className="mb-[9px] grid size-[34px] place-items-center rounded-[9px] bg-[color:var(--ob-fg)] text-[color:var(--ob-bg)]">
              <RocketIcon size={19} weight="regular" />
            </span>
            {RAIL_FOOT.map((item) => (
              <span
                key={item.id}
                className="relative grid size-[30px] place-items-center text-[color:var(--ob-fg)]"
              >
                <item.Icon size={19} weight="regular" />
                {/* All systems operational, which the reference states as a dot. */}
                {item.live && (
                  <span className="absolute right-[5px] top-[6px] size-[5px] rounded-full bg-[#22c55e]" />
                )}
              </span>
            ))}
            <Avatar
              name={userName}
              size={24}
              rounded={7}
              variant="neutral"
              letters={1}
              className="mt-[9px]"
            />
          </nav>
        </Sidebar>

        <Main className="overflow-auto">
          <header className="flex h-[55px] shrink-0 items-center gap-[10px] border-b border-[color:var(--ob-border)] px-[21px]">
            <h1 className="flex-1 text-[0.987rem] font-semibold">Project Analytics</h1>
            <Select>Last 7 days</Select>
            <Select glyph={<CalendarIcon size={12} />}>Apr 15, 2026 - Apr 21, 2026</Select>
          </header>

          <div className="p-[21px]">
            <div className="inline-flex gap-[3px] rounded-[var(--ob-radius)] bg-[color:var(--ob-surface-2)] p-[3px]">
              {[
                { id: "overview", label: "Overview", Icon: GridFourIcon },
                { id: "models", label: "Models", Icon: RobotIcon },
              ].map((tab) => (
                <span
                  key={tab.id}
                  className={cn(
                    "flex items-center gap-[7px] rounded-[var(--ob-radius-sm)] px-[14px] py-[7px] text-[0.815rem]",
                    tab.id === page
                      ? "bg-[color:var(--ob-surface)] font-semibold shadow-[0_1px_2px_rgba(16,24,40,0.08)]"
                      : "text-[color:var(--ob-fg-soft)]",
                  )}
                >
                  <tab.Icon size={12} />
                  {tab.label}
                </span>
              ))}
            </div>

            <div className="grid items-stretch gap-[17px] pt-[17px] lg:grid-cols-[minmax(0,0.42fr)_minmax(0,1fr)]">
              <section className="rounded-[var(--ob-radius)] border border-[color:var(--ob-border)] p-[21px]">
                <h2 className="text-[0.987rem] font-bold">Top models</h2>
                <p className="pt-[7px] text-[0.815rem] leading-relaxed text-[color:var(--ob-muted)]">
                  Explore organization-wide token usage grouped by provider, model,
                  and connection.
                </p>

                <ul className="grid gap-[10px] pt-[17px]">
                  {MODELS.map((model) => (
                    <li
                      key={model.id}
                      aria-current={model.id === "gpt-4o-mini" ? "true" : undefined}
                      className={cn(
                        "rounded-[var(--ob-radius)] border border-[color:var(--ob-border)] p-[14px]",
                        model.id === "gpt-4o-mini" && "bg-[color:var(--ob-surface-2)]",
                      )}
                    >
                      <div className="flex items-start gap-[10px]">
                        <h3 className="flex-1 font-bold">{model.name}</h3>
                        <span className="text-right">
                          <span className="block text-[0.618rem] font-semibold uppercase tracking-wide text-[color:var(--ob-muted)]">
                            Total tokens
                          </span>
                          <span className="block pt-[2px] text-[0.901rem] font-bold tabular-nums">
                            {model.tokens}
                          </span>
                        </span>
                      </div>
                      <span className="mt-[9px] inline-flex rounded-[var(--ob-radius-sm)] border border-[color:var(--ob-border)] bg-[color:var(--ob-surface)] px-[9px] py-[3px] text-[0.704rem] font-medium">
                        {model.provider}
                      </span>
                    </li>
                  ))}
                </ul>
              </section>

              <div className="grid content-start gap-[17px]">
                <section className="rounded-[var(--ob-radius)] border border-[color:var(--ob-border)] p-[21px]">
                  <div className="flex items-start gap-[10px]">
                    <h2 className="flex flex-1 items-center gap-[7px] text-[0.987rem] font-bold">
                      gpt-4o-mini
                    </h2>
                    <span className="rounded-[var(--ob-radius-sm)] border border-[color:var(--ob-border)] px-[9px] py-[3px] text-[0.704rem] font-medium">
                      OpenAI
                    </span>
                  </div>
                  <p className="pt-[7px] text-[0.815rem] text-[color:var(--ob-muted)]">
                    Inspect the selected model across the current date range.
                  </p>

                  <div className="grid gap-[14px] pt-[17px] sm:grid-cols-3">
                    {[
                      { label: "Total tokens", value: "1,764" },
                      { label: "Input tokens", value: "1,255" },
                      { label: "Output tokens", value: "509" },
                    ].map((stat) => (
                      <div
                        key={stat.label}
                        className="rounded-[var(--ob-radius)] border border-[color:var(--ob-border)] bg-[color:var(--ob-surface-2)] px-[17px] py-[14px]"
                      >
                        <p className="text-[0.618rem] font-semibold uppercase tracking-wide text-[color:var(--ob-muted)]">
                          {stat.label}
                        </p>
                        <p className="pt-[5px] text-[1.373rem] font-bold tabular-nums leading-none">
                          {stat.value}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>

                <section className="rounded-[var(--ob-radius)] border border-[color:var(--ob-border)] p-[21px]">
                  <h2 className="pb-[14px] font-bold">Total token trend</h2>
                  <LineChart
                    height={185}
                    smooth
                    gridLines={0}
                    yLabels={["700", "400", "200", "0"]}
                    xLabels={DAYS}
                    series={[{ id: "total", points: TOTAL, color: "#5b6472", area: true }]}
                  />
                </section>

                <div className="grid gap-[17px] xl:grid-cols-2">
                  <TrendCard
                    title="Input token trend"
                    values={INPUT}
                    labels={["470", "300", "150", "0"]}
                    max={470}
                  />
                  <TrendCard
                    title="Output token trend"
                    values={OUTPUT}
                    labels={["240", "180", "120", "60", "0"]}
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
    <section className="rounded-[var(--ob-radius)] border border-[color:var(--ob-border)] p-[21px]">
      <h2 className="pb-[14px] font-bold">{title}</h2>
      <BarChart
        height={159}
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
    <span className="inline-flex items-center gap-[21px] rounded-[var(--ob-radius-sm)] border border-[color:var(--ob-border-strong)] px-[12px] py-[7px] text-[0.79rem]">
      <span className="flex items-center gap-[7px]">
        {glyph && (
          <span aria-hidden className="text-[color:var(--ob-muted)]">
            {glyph}
          </span>
        )}
        {children}
      </span>
      <span className="text-[color:var(--ob-muted)]">
        <CaretUpDownIcon size={11} />
      </span>
    </span>
  );
}
