"use client";

import type { ReactNode } from "react";
import { cn } from "../../../lib/cn";
import { AvatarSlot, Placeholder, WordmarkSlot } from "../../../ui/placeholder";
import { Surface, productTokens } from "./tokens";
import { Main, NavItem, Shell, Sidebar } from "./chrome";
import type { TemplateProps } from "./props";

export type ProductPage = "home" | "events" | "users";

export interface ProductAnalyticsProps extends TemplateProps {
  page?: ProductPage;
}

const RECENTS = [
  "Main Dashboard",
  "Registered users conver…",
  "🌱 Starter Board",
  "Core User Metrics",
  "User Growth & Engage…",
];

const BOARDS = ["🌱 Starter Board", "Core User Metrics", "Main Dashboard"];

/**
 * Three people used the product today, so the daily series is two small bumps
 * rather than a trend. The forecast tails are dotted, which is what separates
 * "measured" from "projected" on this surface.
 */
const DAILY = [0, 0, 0, 3, 0, 2, 0, 0, 0, 0];
const WEEKLY = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3.4, 0.2];

const GROWTH = [
  { id: "a", color: "#e8a33d", points: [0, 40, 12, 3, 0] },
  { id: "b", color: "#4b3fe4", points: [0, 6, 14, 24, 40] },
  { id: "c", color: "#e0562d", points: [0, 5, 12, 20, 33] },
  { id: "d", color: "#2f9e5f", points: [0, 2, 3, 5, 8] },
  { id: "e", color: "#3ba4c4", points: [0, 1, 2, 2, 3] },
];

/**
 * Product analytics home.
 *
 * The recents row uses schematic board thumbnails rather than screenshots —
 * blocks that suggest a layout without pretending to show real numbers. That
 * is the honest version of a "recently viewed" strip, and it is why every
 * thumbnail here is a labelled placeholder.
 */
export function ProductAnalyticsTemplate({
  className,
  page = "home",
}: ProductAnalyticsProps) {
  return (
    <Surface tokens={productTokens} className={className}>
      <Shell>
        <Sidebar width={251} bg="var(--ob-surface)">
          <div className="flex items-center gap-[9px] px-[15px] pb-[12px] pt-[12px]">
            <WordmarkSlot width={23} height={23} label="" />
            <span className="flex-1 leading-tight">
              <span className="block text-[0.836rem] font-semibold">Acme Analytics</span>
              <span className="block text-[0.722rem] text-[color:var(--ob-muted)]">
                All Project Data
              </span>
            </span>
            <span aria-hidden className="text-[0.532rem] opacity-50">
              ⌄
            </span>
          </div>

          <div className="px-[12px] pb-[9px]">
            <span className="flex items-center justify-center gap-[6px] rounded-[var(--ob-radius)] bg-[color:var(--ob-brand)] py-[9px] text-[0.836rem] font-semibold text-white">
              <span aria-hidden>+</span> Create New
              <span aria-hidden className="ml-auto pr-[3px] text-[0.532rem] opacity-70">
                ⌄
              </span>
            </span>
          </div>

          <nav className="grid gap-[2px] px-[9px]">
            <NavItem
              label="Search"
              glyph="⌕"
              badge="⌘ + K"
              className="text-[0.821rem]"
            />
            <NavItem
              label="Home"
              glyph="⌂"
              active={page === "home"}
              className="text-[0.821rem]"
            />
            <NavItem
              label="Data"
              glyph="⛁"
              trailing={
                <span aria-hidden className="text-[0.532rem] opacity-50">
                  ⌄
                </span>
              }
              className="text-[0.821rem]"
            />
            {["Events", "Users", "Lexicon"].map((label) => (
              <NavItem key={label} label={label} indent className="text-[0.798rem]" />
            ))}
            <NavItem label="Session Replay" glyph="▶" className="text-[0.821rem]" />
          </nav>

          <p className="px-[15px] pb-[6px] pt-[18px] text-[0.699rem] font-medium uppercase tracking-wide text-[color:var(--ob-muted)]">
            ⌄ Pinned
          </p>
          <nav className="grid gap-[2px] px-[9px]">
            <NavItem label="🌱 Starter Board" className="text-[0.821rem]" />
          </nav>

          <p className="px-[15px] pb-[6px] pt-[15px] text-[0.699rem] font-medium uppercase tracking-wide text-[color:var(--ob-muted)]">
            ⌄ Your boards
          </p>
          <nav className="grid gap-[2px] px-[9px]">
            {["Core User Metrics", "Main Dashboard"].map((label) => (
              <NavItem key={label} label={label} className="text-[0.821rem]" />
            ))}
          </nav>

          <div className="mt-auto p-[12px]">
            <span className="flex items-center justify-center gap-[8px] rounded-[var(--ob-radius)] bg-[color:var(--ob-cta-bg)] py-[9px] text-[0.821rem] font-semibold text-[color:var(--ob-cta-fg)]">
              <span aria-hidden>◆</span> Upgrade Plan
            </span>
            <div className="flex items-center gap-[15px] px-[6px] pt-[12px] text-[color:var(--ob-fg-soft)]">
              <span aria-hidden>▦</span>
              <span className="relative" aria-hidden>
                ?
                <span className="absolute -right-[3px] -top-[3px] size-[6px] rounded-full bg-[#e0562d]" />
              </span>
              <span aria-hidden>⚙</span>
              <span aria-hidden className="ml-auto">
                ⇤
              </span>
            </div>
          </div>
        </Sidebar>

        <Main className="overflow-auto px-[27px] py-[24px]">
          <h1 className="text-[1.596rem] font-bold tracking-[-0.02em]">Good Morning</h1>

          <h2 className="pb-[9px] pt-[21px] text-[0.874rem] font-semibold">Your Recents</h2>
          <div className="grid gap-[12px] sm:grid-cols-3 xl:grid-cols-6">
            {RECENTS.map((title) => (
              <article
                key={title}
                className="overflow-hidden rounded-[var(--ob-radius)] border border-[color:var(--ob-border)]"
              >
                {/* Schematic, not a screenshot: no invented numbers. */}
                <Placeholder height={73} radius={0} label="Board preview" />
                <p className="truncate px-[12px] py-[9px] text-[0.775rem]">{title}</p>
              </article>
            ))}
            <article className="grid place-items-center rounded-[var(--ob-radius)] border border-[color:var(--ob-border)] px-[12px] py-[18px] text-center">
              <span aria-hidden className="text-[0.912rem]">
                →
              </span>
              <span className="pt-[6px] text-[0.775rem]">See All</span>
            </article>
          </div>

          <h2 className="pb-[9px] pt-[24px] text-[0.874rem] font-semibold">Your Product</h2>
          <section className="grid gap-[24px] rounded-[var(--ob-radius-lg)] border border-[color:var(--ob-border)] p-[21px] lg:grid-cols-3">
            <Metric
              value="3"
              label="Active Users – Today"
              from="Jan 21, 12am"
              to="Jan 21, 3pm"
            >
              <Spiky points={DAILY} />
            </Metric>
            <Metric value="334" label="Weekly Active Users" from="Dec 22" to="Jan 21">
              <Spiky points={WEEKLY} dotted />
            </Metric>
            <Metric
              value="43"
              label="User Growth & Engagement"
              from="Jan 16"
              to="Jan 21"
              axis={["48", "24", "0"]}
            >
              <GrowthLines />
            </Metric>
          </section>

          <div className="grid gap-[15px] pt-[24px] lg:grid-cols-2">
            <div>
              <h2 className="pb-[9px] text-[0.874rem] font-semibold">Top Boards</h2>
              <section className="rounded-[var(--ob-radius-lg)] border border-[color:var(--ob-border)] p-[15px]">
                <ul className="grid gap-[12px]">
                  {BOARDS.map((board) => (
                    <li key={board} className="flex items-center gap-[11px]">
                      <span aria-hidden className="text-[0.836rem]">
                        ▦
                      </span>
                      <span className="flex-1 text-[0.821rem]">{board}</span>
                      <AvatarSlot size={23} />
                    </li>
                  ))}
                </ul>
              </section>
            </div>

            <div>
              <h2 className="pb-[9px] text-[0.874rem] font-semibold">Suggested Creators</h2>
              <section className="rounded-[var(--ob-radius-lg)] border border-[color:var(--ob-border)] p-[15px]">
                <div className="flex items-center gap-[11px]">
                  <AvatarSlot size={33} />
                  <span className="leading-tight">
                    <span className="block text-[0.821rem] font-semibold">Sam Lee</span>
                    <span className="block text-[0.76rem] text-[color:var(--ob-muted)]">
                      2 boards · 5 reports
                    </span>
                  </span>
                </div>

                <div className="mt-[18px] grid justify-items-center rounded-[var(--ob-radius)] bg-[color:var(--ob-surface-2)] px-[18px] py-[21px] text-center">
                  <p className="text-[0.821rem] font-semibold">Invite more teammates</p>
                  <p className="pt-[6px] text-[0.775rem] text-[color:var(--ob-fg-soft)]">
                    Analytics works better together.
                  </p>
                </div>
              </section>
            </div>
          </div>
        </Main>
      </Shell>
    </Surface>
  );
}

function Metric({
  value,
  label,
  from,
  to,
  axis,
  children,
}: {
  value: string;
  label: string;
  from: string;
  to: string;
  axis?: string[];
  children: ReactNode;
}) {
  return (
    <div>
      <p className="text-[1.672rem] font-bold leading-none tabular-nums">{value}</p>
      <p className="pt-[6px] text-[0.821rem]">{label}</p>
      <div className="flex gap-[9px] pt-[18px]">
        <div className="min-w-[0px] flex-1">{children}</div>
        {axis && (
          <div className="grid shrink-0 text-right text-[0.684rem] tabular-nums text-[color:var(--ob-muted)]">
            {axis.map((tick, index) => (
              <span
                key={tick}
                className={cn("leading-none", index > 0 && "mt-[calc((120px/2)-0.8em)]")}
              >
                {tick}
              </span>
            ))}
          </div>
        )}
      </div>
      <p className="flex pt-[6px] text-[0.722rem] text-[color:var(--ob-muted)]">
        <span className="flex-1">{from}</span>
        <span>{to}</span>
      </p>
    </div>
  );
}

function Spiky({ points, dotted }: { points: number[]; dotted?: boolean }) {
  const width = 460;
  const height = 120;
  const max = Math.max(...points, 1);
  const step = width / (points.length - 1);
  const y = (value: number) => height - (value / max) * (height - 10) - 5;
  const path = points
    .map((value, i) => `${i === 0 ? "M" : "L"}${i * step},${y(value)}`)
    .join(" ");

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className="h-[91px] w-full"
      preserveAspectRatio="none"
      role="img"
      aria-label="Active users"
    >
      <path
        d={path}
        fill="none"
        stroke="#7b6ef0"
        strokeWidth={2}
        vectorEffect="non-scaling-stroke"
      />
      {dotted && (
        <path
          d={`M${width - step},${y(points[points.length - 1]!)} L${width},${y(0)}`}
          fill="none"
          stroke="#7b6ef0"
          strokeWidth={2}
          strokeDasharray="2 4"
          vectorEffect="non-scaling-stroke"
        />
      )}
    </svg>
  );
}

/** Solid where measured, dotted where projected — five cohorts, one chart. */
function GrowthLines() {
  const width = 460;
  const height = 120;
  const max = 48;
  const step = (width * 0.7) / (GROWTH[0]!.points.length - 1);
  const y = (value: number) => height - (value / max) * (height - 10) - 5;

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className="h-[91px] w-full"
      preserveAspectRatio="none"
      role="img"
      aria-label="User growth and engagement by cohort"
    >
      {GROWTH.map((series) => {
        const last = series.points[series.points.length - 1]!;
        const lastX = (series.points.length - 1) * step;
        return (
          <g key={series.id}>
            <path
              d={series.points
                .map((value, i) => `${i === 0 ? "M" : "L"}${i * step},${y(value)}`)
                .join(" ")}
              fill="none"
              stroke={series.color}
              strokeWidth={2}
              vectorEffect="non-scaling-stroke"
            />
            <path
              d={`M${lastX},${y(last)} L${width},${y(last * 1.25)}`}
              fill="none"
              stroke={series.color}
              strokeWidth={2}
              strokeDasharray="2 5"
              vectorEffect="non-scaling-stroke"
            />
          </g>
        );
      })}
    </svg>
  );
}
