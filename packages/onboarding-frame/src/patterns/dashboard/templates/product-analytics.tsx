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
        <Sidebar width={330} bg="var(--ob-surface)">
          <div className="flex items-center gap-3 px-5 pb-4 pt-4">
            <WordmarkSlot width={30} height={30} label="" />
            <span className="flex-1 leading-tight">
              <span className="block text-[1.1rem] font-semibold">Acme Analytics</span>
              <span className="block text-[0.95rem] text-[color:var(--ob-muted)]">
                All Project Data
              </span>
            </span>
            <span aria-hidden className="text-[0.7rem] opacity-50">
              ⌄
            </span>
          </div>

          <div className="px-4 pb-3">
            <span className="flex items-center justify-center gap-2 rounded-[var(--ob-radius)] bg-[color:var(--ob-brand)] py-3 text-[1.1rem] font-semibold text-white">
              <span aria-hidden>+</span> Create New
              <span aria-hidden className="ml-auto pr-1 text-[0.7rem] opacity-70">
                ⌄
              </span>
            </span>
          </div>

          <nav className="grid gap-0.5 px-3">
            <NavItem
              label="Search"
              glyph="⌕"
              badge="⌘ + K"
              className="text-[1.08rem]"
            />
            <NavItem
              label="Home"
              glyph="⌂"
              active={page === "home"}
              className="text-[1.08rem]"
            />
            <NavItem
              label="Data"
              glyph="⛁"
              trailing={
                <span aria-hidden className="text-[0.7rem] opacity-50">
                  ⌄
                </span>
              }
              className="text-[1.08rem]"
            />
            {["Events", "Users", "Lexicon"].map((label) => (
              <NavItem key={label} label={label} indent className="text-[1.05rem]" />
            ))}
            <NavItem label="Session Replay" glyph="▶" className="text-[1.08rem]" />
          </nav>

          <p className="px-5 pb-2 pt-6 text-[0.92rem] font-medium uppercase tracking-wide text-[color:var(--ob-muted)]">
            ⌄ Pinned
          </p>
          <nav className="grid gap-0.5 px-3">
            <NavItem label="🌱 Starter Board" className="text-[1.08rem]" />
          </nav>

          <p className="px-5 pb-2 pt-5 text-[0.92rem] font-medium uppercase tracking-wide text-[color:var(--ob-muted)]">
            ⌄ Your boards
          </p>
          <nav className="grid gap-0.5 px-3">
            {["Core User Metrics", "Main Dashboard"].map((label) => (
              <NavItem key={label} label={label} className="text-[1.08rem]" />
            ))}
          </nav>

          <div className="mt-auto p-4">
            <span className="flex items-center justify-center gap-2.5 rounded-[var(--ob-radius)] bg-[color:var(--ob-cta-bg)] py-3 text-[1.08rem] font-semibold text-[color:var(--ob-cta-fg)]">
              <span aria-hidden>◆</span> Upgrade Plan
            </span>
            <div className="flex items-center gap-5 px-2 pt-4 text-[color:var(--ob-fg-soft)]">
              <span aria-hidden>▦</span>
              <span className="relative" aria-hidden>
                ?
                <span className="absolute -right-1 -top-1 size-2 rounded-full bg-[#e0562d]" />
              </span>
              <span aria-hidden>⚙</span>
              <span aria-hidden className="ml-auto">
                ⇤
              </span>
            </div>
          </div>
        </Sidebar>

        <Main className="overflow-auto px-9 py-8">
          <h1 className="text-[2.1rem] font-bold tracking-[-0.02em]">Good Morning</h1>

          <h2 className="pb-3 pt-7 text-[1.15rem] font-semibold">Your Recents</h2>
          <div className="grid gap-4 sm:grid-cols-3 xl:grid-cols-6">
            {RECENTS.map((title) => (
              <article
                key={title}
                className="overflow-hidden rounded-[var(--ob-radius)] border border-[color:var(--ob-border)]"
              >
                {/* Schematic, not a screenshot: no invented numbers. */}
                <Placeholder height={96} radius={0} label="Board preview" />
                <p className="truncate px-4 py-3 text-[1.02rem]">{title}</p>
              </article>
            ))}
            <article className="grid place-items-center rounded-[var(--ob-radius)] border border-[color:var(--ob-border)] px-4 py-6 text-center">
              <span aria-hidden className="text-[1.2rem]">
                →
              </span>
              <span className="pt-2 text-[1.02rem]">See All</span>
            </article>
          </div>

          <h2 className="pb-3 pt-8 text-[1.15rem] font-semibold">Your Product</h2>
          <section className="grid gap-8 rounded-[var(--ob-radius-lg)] border border-[color:var(--ob-border)] p-7 lg:grid-cols-3">
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

          <div className="grid gap-5 pt-8 lg:grid-cols-2">
            <div>
              <h2 className="pb-3 text-[1.15rem] font-semibold">Top Boards</h2>
              <section className="rounded-[var(--ob-radius-lg)] border border-[color:var(--ob-border)] p-5">
                <ul className="grid gap-4">
                  {BOARDS.map((board) => (
                    <li key={board} className="flex items-center gap-3.5">
                      <span aria-hidden className="text-[1.1rem]">
                        ▦
                      </span>
                      <span className="flex-1 text-[1.08rem]">{board}</span>
                      <AvatarSlot size={30} />
                    </li>
                  ))}
                </ul>
              </section>
            </div>

            <div>
              <h2 className="pb-3 text-[1.15rem] font-semibold">Suggested Creators</h2>
              <section className="rounded-[var(--ob-radius-lg)] border border-[color:var(--ob-border)] p-5">
                <div className="flex items-center gap-3.5">
                  <AvatarSlot size={44} />
                  <span className="leading-tight">
                    <span className="block text-[1.08rem] font-semibold">Sam Lee</span>
                    <span className="block text-[1rem] text-[color:var(--ob-muted)]">
                      2 boards · 5 reports
                    </span>
                  </span>
                </div>

                <div className="mt-6 grid justify-items-center rounded-[var(--ob-radius)] bg-[color:var(--ob-surface-2)] px-6 py-7 text-center">
                  <p className="text-[1.08rem] font-semibold">Invite more teammates</p>
                  <p className="pt-2 text-[1.02rem] text-[color:var(--ob-fg-soft)]">
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
      <p className="text-[2.2rem] font-bold leading-none tabular-nums">{value}</p>
      <p className="pt-2 text-[1.08rem]">{label}</p>
      <div className="flex gap-3 pt-6">
        <div className="min-w-0 flex-1">{children}</div>
        {axis && (
          <div className="grid shrink-0 text-right text-[0.9rem] tabular-nums text-[color:var(--ob-muted)]">
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
      <p className="flex pt-2 text-[0.95rem] text-[color:var(--ob-muted)]">
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
      className="h-[120px] w-full"
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
      className="h-[120px] w-full"
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
