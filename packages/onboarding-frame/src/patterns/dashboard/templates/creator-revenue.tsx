"use client";

import type { ReactNode } from "react";
import { cn } from "../../../lib/cn";
import { AvatarSlot } from "../../../ui/placeholder";
import { Surface, creatorTokens } from "./tokens";
import { Main, NavItem, Shell, Sidebar } from "./chrome";
import type { TemplateProps } from "./props";

export type CreatorPage = "home" | "users" | "milestones";

export interface CreatorRevenueProps extends TemplateProps {
  page?: CreatorPage;
}

const NAV = [
  { id: "home", label: "Home", glyph: "⌂" },
  { id: "users", label: "Users", glyph: "👤" },
  { id: "links", label: "Links", glyph: "🔗" },
  { id: "milestones", label: "Milestones", glyph: "🏆" },
  { id: "growth", label: "Growth Hacks", glyph: "🚀", dot: true },
  { id: "marketing", label: "Marketing", glyph: "📣", caret: true },
  { id: "finances", label: "Finances", glyph: "▭", caret: true },
  { id: "operations", label: "Operations", glyph: "📋", caret: true },
  { id: "settings", label: "Settings", glyph: "⚙", caret: true },
];

const COUNTDOWN = [
  { id: "days", value: ["0", "5"], label: "Days" },
  { id: "hrs", value: ["1", "8"], label: "Hrs" },
  { id: "mins", value: ["5", "9"], label: "Mins" },
  { id: "secs", value: ["1", "9"], label: "Secs" },
];

/**
 * One two-hour window with a sale in it. Drawing a dot on every hour is what
 * makes the plateau read as two consecutive $1 hours rather than as a single
 * smoothed bump.
 */
const HOURS = [
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0,
];

/**
 * Creator revenue dashboard.
 *
 * Two banners stack above the content and say different things: a yellow one
 * withholding data until two-factor is enabled, and a lavender one promoting a
 * feature. Keeping both — in that order, with the blocking one first — is the
 * behaviour worth copying; collapsing them into one notification area would
 * lose which is which.
 */
export function CreatorRevenueTemplate({
  className,
  page = "home",
}: CreatorRevenueProps) {
  return (
    <Surface tokens={creatorTokens} className={className}>
      <Shell>
        <Sidebar width={348} bg="var(--ob-surface)">
          <div className="flex items-center gap-3 px-5 pb-5 pt-5">
            <span className="flex items-center gap-2 text-[1.08rem] font-medium">
              <span aria-hidden>⌾</span> Go to hub
            </span>
            <span
              aria-hidden
              className="ml-auto grid size-9 place-items-center rounded-[var(--ob-radius-sm)] border border-[color:var(--ob-border-strong)] text-[0.85rem]"
            >
              ⇤
            </span>
          </div>

          <div className="mx-4 rounded-[var(--ob-radius)] border border-[color:var(--ob-border-strong)] p-4">
            <p className="flex items-center gap-3 pb-4 text-[0.92rem] font-bold uppercase tracking-wide">
              <span className="flex-1">$500 in 7 days</span>
              <span aria-hidden className="text-[0.7rem] opacity-50">
                ⌃
              </span>
            </p>

            {/* A flip-clock countdown: each digit is its own tile. */}
            <div className="flex items-start gap-2">
              {COUNTDOWN.map((unit, index) => (
                <span key={unit.id} className="flex items-start gap-2">
                  <span className="grid justify-items-center">
                    <span className="flex gap-1">
                      {unit.value.map((digit, digitIndex) => (
                        <span
                          key={digitIndex}
                          className="grid size-9 place-items-center rounded-[var(--ob-radius-sm)] bg-[color:var(--ob-surface-2)] text-[1.2rem] font-semibold tabular-nums"
                        >
                          {digit}
                        </span>
                      ))}
                    </span>
                    <span className="pt-1.5 text-[0.82rem] font-semibold uppercase tracking-wide text-[color:var(--ob-muted)]">
                      {unit.label}
                    </span>
                  </span>
                  {index < COUNTDOWN.length - 1 && (
                    <span aria-hidden className="pt-1.5 text-[1.1rem] font-bold">
                      :
                    </span>
                  )}
                </span>
              ))}
            </div>

            <span className="mt-4 block rounded-[var(--ob-radius-sm)] bg-[color:var(--ob-brand)] py-2.5 text-center text-[1.05rem] font-semibold text-white">
              View milestone
            </span>
          </div>

          <div className="flex items-center gap-3 px-5 py-5">
            <AvatarSlot size={38} />
            <span className="flex-1 text-[1.2rem] font-semibold">ASAcme</span>
            <span aria-hidden className="text-[0.7rem] opacity-50">
              ⌄
            </span>
          </div>

          <nav className="grid gap-0.5 px-3">
            {NAV.map((item) => (
              <NavItem
                key={item.id}
                label={
                  item.dot ? (
                    <span className="flex items-center gap-2.5">
                      {item.label}
                      <span
                        aria-hidden
                        className="size-2 rounded-full bg-[color:var(--ob-brand)]"
                      />
                    </span>
                  ) : (
                    item.label
                  )
                }
                glyph={item.glyph}
                active={item.id === page}
                trailing={
                  item.caret ? (
                    <span aria-hidden className="text-[0.7rem] opacity-50">
                      ⌄
                    </span>
                  ) : undefined
                }
                className="px-4 py-3 text-[1.15rem]"
              />
            ))}
          </nav>

          <div className="mt-auto p-4">
            <div className="rounded-[var(--ob-radius)] bg-[color-mix(in_oklab,#5b5bd6_10%,transparent)] p-5">
              <p className="text-[1.05rem] font-medium text-[color:var(--ob-brand)]">
                Partner Program
              </p>
              <p className="pt-3 text-[1.05rem] font-medium text-[color:var(--ob-brand)]">
                Earn 30% of recurring revenue for life!
              </p>
            </div>
            <div className="flex items-center gap-3 pt-4">
              <span className="rounded-[var(--ob-radius-sm)] border border-[color:var(--ob-border-strong)] px-3.5 py-2 text-[1rem] font-medium">
                EN
              </span>
              <span
                aria-hidden
                className="ml-auto grid size-9 place-items-center rounded-full border border-[color:var(--ob-border-strong)]"
              >
                ?
              </span>
            </div>
          </div>
        </Sidebar>

        <Main className="overflow-auto">
          <header className="flex h-[88px] shrink-0 items-center gap-4 px-7">
            <span className="flex items-center gap-2.5 rounded-[var(--ob-radius)] border border-[color:var(--ob-border-strong)] px-4 py-2.5 text-[1.08rem] font-medium">
              <span aria-hidden>🏆</span> Milestones
            </span>
            <span className="ml-auto flex w-[300px] items-center gap-2.5 rounded-[var(--ob-radius)] border border-[color:var(--ob-border-strong)] px-4 py-2.5 text-[1.05rem] text-[color:var(--ob-muted)]">
              <span aria-hidden>⌕</span>
              <span className="flex-1">Search</span>
              <kbd className="rounded border border-[color:var(--ob-border)] px-1.5 py-0.5 text-[0.72rem] font-semibold">
                ⌘K
              </kbd>
            </span>
            <span className="flex items-center gap-4 text-[color:var(--ob-fg-soft)]">
              {["▤", "$", "⌾"].map((glyph) => (
                <span key={glyph} aria-hidden>
                  {glyph}
                </span>
              ))}
              <AvatarSlot size={36} />
            </span>
          </header>

          <div className="grid gap-4 px-7 pb-8">
            {/* Blocking notice first, promotion second. */}
            <div className="flex flex-wrap items-center gap-4 rounded-[var(--ob-radius)] bg-[color-mix(in_oklab,#e8c33d_25%,white)] px-6 py-4">
              <p className="min-w-0 flex-1 text-[1.08rem]">
                In order to view some of the data for this company, you must enable two
                factor authentication on your account.
              </p>
              <span className="flex items-center gap-1.5 text-[1.05rem] font-medium">
                Set up two factor authentication <span aria-hidden>›</span>
              </span>
            </div>

            <div className="rounded-[var(--ob-radius)] bg-[color-mix(in_oklab,#5b5bd6_9%,white)] px-6 py-4">
              <p className="text-[1.08rem] leading-relaxed">
                You can now share your stats on social media 🥳. Creators who add the
                marketplace and category ranking widgets to their dash and share on
                socials are 10% more likely to get users. Click on{" "}
                <span aria-hidden className="text-[color:var(--ob-brand)]">
                  ↗
                </span>{" "}
                on a widget below to flex your stats 💪
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-3">
              <h1 className="flex-1 text-[2rem] font-bold tracking-[-0.01em]">Today</h1>
              <span className="flex items-center gap-2.5 rounded-full bg-[color:var(--ob-brand)] px-5 py-2.5 text-[1.05rem] font-semibold text-white">
                <span aria-hidden>🎓</span> Need help? Join Acme University
              </span>
            </div>

            <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.62fr)]">
              <section className="rounded-[var(--ob-radius-lg)] border border-[color:var(--ob-border)] p-6">
                <h2 className="flex items-center gap-2 text-[1.12rem] font-medium">
                  Gross revenue <InfoDot />
                </h2>
                <p className="flex items-center gap-3 pt-3">
                  <span className="text-[2.6rem] font-bold leading-none tabular-nums">
                    $2
                  </span>
                  <span className="rounded-[var(--ob-radius-sm)] bg-[color-mix(in_oklab,#2f9e5f_16%,transparent)] px-2.5 py-1 text-[1rem] font-semibold text-[#1f7a48]">
                    $2 ↑
                  </span>
                </p>

                <HourlyChart />

                <p className="flex pt-2 text-[1rem] text-[color:var(--ob-muted)]">
                  <span className="flex-1">12:00 AM</span>
                  <span>11:00 PM</span>
                </p>
              </section>

              <section className="rounded-[var(--ob-radius-lg)] border border-[color:var(--ob-border)] p-6">
                <h2 className="text-[1.12rem] font-medium">To-do list</h2>
                <div className="mt-5 flex items-center gap-3 rounded-[var(--ob-radius)] bg-[color-mix(in_oklab,#5b5bd6_9%,white)] px-5 py-4">
                  <span aria-hidden>👋</span>
                  <span className="flex-1 text-[1.12rem] font-medium">
                    Welcome 12 new users
                  </span>
                  <span aria-hidden className="text-[color:var(--ob-muted)]">
                    ›
                  </span>
                </div>
              </section>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-5">
              <h2 className="text-[2rem] font-bold tracking-[-0.01em]">Stats</h2>
              <Select>Last 7 days</Select>
              <Select glyph="🗓">Jul 24 - 30, 2024</Select>
              <span className="text-[1.05rem] text-[color:var(--ob-muted)]">
                compared to
              </span>
              <Select>Previous period</Select>
              <Select>Daily</Select>
              <span className="ml-auto flex items-center gap-3">
                <span className="flex items-center gap-2 rounded-[var(--ob-radius)] border border-[color:var(--ob-border-strong)] px-4 py-2.5 text-[1.05rem] font-medium">
                  <span aria-hidden>+</span> Add
                </span>
                <span className="flex items-center gap-2 rounded-[var(--ob-radius)] border border-[color:var(--ob-border-strong)] px-4 py-2.5 text-[1.05rem] font-medium">
                  <span aria-hidden>⚙</span> Edit
                </span>
              </span>
            </div>

            <div className="grid gap-4 lg:grid-cols-3">
              {[
                { id: "mrr", label: "MRR", value: "$0" },
                { id: "arr", label: "ARR", value: "$0" },
              ].map((stat) => (
                <section
                  key={stat.id}
                  className="rounded-[var(--ob-radius-lg)] border border-[color:var(--ob-border)] p-6"
                >
                  <p className="flex items-center gap-2 text-[1.12rem] font-medium">
                    <span className="flex flex-1 items-center gap-2">
                      {stat.label} <InfoDot />
                    </span>
                    <span
                      aria-hidden
                      className="grid size-7 place-items-center rounded-[var(--ob-radius-sm)] border border-[color:var(--ob-border-strong)] text-[0.8rem]"
                    >
                      ↗
                    </span>
                  </p>
                  <p className="pt-4 text-[2.4rem] font-bold leading-none tabular-nums">
                    {stat.value}
                  </p>
                </section>
              ))}

              <section className="rounded-[var(--ob-radius-lg)] border border-[color:var(--ob-border)] p-6">
                <p className="flex items-center gap-2 text-[1.12rem] font-medium">
                  Payments breakdown <InfoDot />
                </p>
                <span className="mt-5 flex h-2.5 overflow-hidden rounded-full">
                  {[
                    { id: "paid", width: "52%", color: "#2f9e5f" },
                    { id: "pending", width: "38%", color: "#e8c33d" },
                    { id: "failed", width: "3%", color: "#e0433d" },
                    { id: "other", width: "7%", color: "var(--ob-surface-3)" },
                  ].map((band) => (
                    <span
                      key={band.id}
                      style={{ width: band.width, background: band.color }}
                    />
                  ))}
                </span>
              </section>
            </div>
          </div>
        </Main>
      </Shell>
    </Surface>
  );
}

function Select({ children, glyph }: { children: ReactNode; glyph?: string }) {
  return (
    <span className="inline-flex items-center gap-4 rounded-[var(--ob-radius)] border border-[color:var(--ob-border-strong)] px-4 py-2.5 text-[1.05rem]">
      <span className="flex items-center gap-2">
        {glyph && (
          <span aria-hidden className="text-[color:var(--ob-muted)]">
            {glyph}
          </span>
        )}
        {children}
      </span>
      <span aria-hidden className="text-[0.7rem] opacity-60">
        ⌄
      </span>
    </span>
  );
}

function InfoDot(): ReactNode {
  return (
    <span
      aria-hidden
      className="grid size-[17px] shrink-0 place-items-center rounded-[4px] border border-[color:var(--ob-border-strong)] text-[0.62rem] font-normal text-[color:var(--ob-muted)]"
    >
      i
    </span>
  );
}

function HourlyChart() {
  const width = 900;
  const height = 300;
  const max = 1.4;
  const step = width / (HOURS.length - 1);
  const y = (value: number) => height - (value / max) * (height - 20) - 10;
  const line = HOURS.map(
    (value, i) => `${i === 0 ? "M" : "L"}${i * step},${y(value)}`,
  ).join(" ");

  return (
    <div className="pt-4">
      <p className="pb-1 text-[1rem] text-[color:var(--ob-muted)]">$1</p>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="h-[300px] w-full"
        preserveAspectRatio="none"
        role="img"
        aria-label="Gross revenue by hour"
      >
        {/* Faint hour bands behind the line. */}
        {HOURS.map((_, index) =>
          index % 2 === 0 ? (
            <rect
              key={index}
              x={index * step - step / 2}
              y={0}
              width={step * 0.55}
              height={height}
              fill="var(--ob-surface-2)"
            />
          ) : null,
        )}
        <path
          d={line}
          fill="none"
          stroke="#5b5bd6"
          strokeWidth={2}
          vectorEffect="non-scaling-stroke"
        />
        {HOURS.map((value, index) => (
          <circle
            key={index}
            cx={index * step}
            cy={y(value)}
            r={4}
            fill="#5b5bd6"
            vectorEffect="non-scaling-stroke"
          />
        ))}
      </svg>
    </div>
  );
}
