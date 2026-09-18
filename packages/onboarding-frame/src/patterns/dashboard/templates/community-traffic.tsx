"use client";

import type { ReactNode } from "react";
import { cn } from "../../../lib/cn";
import { AvatarSlot, LogoSlot, WordmarkSlot } from "../../../ui/placeholder";
import { Surface, communityTokens } from "./tokens";
import { Main, Shell, Sidebar } from "./chrome";
import type { TemplateProps } from "./props";

export type CommunityPage = "traffic" | "modlog" | "scheduled";

export interface CommunityTrafficProps extends TemplateProps {
  page?: CommunityPage;
}

const GROUPS = [
  {
    label: "Content",
    glyph: "≣",
    items: [{ id: "scheduled", label: "Scheduled posts" }],
  },
  {
    label: "Other",
    glyph: "⚙",
    items: [
      { id: "awards", label: "Awards" },
      { id: "wiki", label: "Wiki pages" },
      { id: "settings", label: "Community settings", badge: "NEW", chevron: true },
      { id: "appearance", label: "Community appearance", chevron: true },
    ],
  },
  {
    label: "Modmail",
    glyph: "✉",
    items: [{ id: "modmail", label: "Modmail", external: true }],
  },
  {
    label: "Community activity",
    glyph: "▥",
    items: [
      { id: "traffic", label: "Traffic stats" },
      { id: "modlog", label: "Mod log" },
    ],
  },
  {
    label: "Mod help center",
    glyph: "?",
    items: [
      { id: "help", label: "Mod help center", external: true },
      { id: "education", label: "Mod education site", external: true },
      { id: "conduct", label: "Moderator code of conduct", external: true },
      { id: "support", label: "r/ModSupport", external: true },
      { id: "modhelp", label: "r/ModHelp", external: true },
      { id: "contact", label: "Contact Reddit", external: true },
    ],
  },
];

const PLATFORMS = [
  { id: "new", label: "New Reddit", color: "#0079d3" },
  { id: "old", label: "Old Reddit", color: "#f2b544" },
  { id: "mobile", label: "Mobile Web", color: "#ff4500" },
  { id: "apps", label: "Reddit Apps", color: "#39a0a0" },
];

/**
 * A brand-new community: one day of traffic and nothing either side. The chart
 * keeps every zero day plotted rather than cropping to the single spike, which
 * is what makes "21 pageviews in a week" read correctly.
 */
const PAGEVIEWS = [0, 0, 0, 0, 0, 21, 0];
const OLD_REDDIT = [0, 0, 0, 0, 0, 0, 0];
const DAYS = ["January 8", "Jan 9", "Jan 10", "Jan 11", "Jan 12", "Jan 13", "Jan 14"];

const TABLE = [
  { day: "1/14/23", views: 0, uniques: 0, joined: 0 },
  { day: "1/13/23", views: 21, uniques: 2, joined: 0 },
  { day: "1/12/23", views: 0, uniques: 0, joined: 0 },
  { day: "1/11/23", views: 0, uniques: 0, joined: 0 },
];

/**
 * Community traffic stats.
 *
 * Two accents on purpose: the orange brand sits in the chrome and badges while
 * links, active tabs and the primary series are blue. The chart is drawn with
 * a full ruled plot box (both axes, vertical gridlines, a rotated axis title)
 * rather than the borderless sparkline style used elsewhere in this
 * catalogue — an older admin surface, and it should read as one.
 */
export function CommunityTrafficTemplate({
  className,
  page = "traffic",
}: CommunityTrafficProps) {
  return (
    <Surface tokens={communityTokens} className={className}>
      <Shell className="flex-col">
        <header className="flex h-14 shrink-0 items-center gap-3 border-b border-[color:var(--ob-border)] bg-[color:var(--ob-surface)] px-4">
          <span aria-hidden className="text-[1.15rem]">
            ☰
          </span>
          <span className="flex items-center gap-2">
            <LogoSlot size={26} label="" radius={13} />
            <WordmarkSlot width={64} height={15} label="" />
          </span>
          <span className="flex items-center gap-2 pl-3 text-[0.95rem] font-medium">
            <LogoSlot size={22} label="" radius={11} />
            r/Acme_Mods
            <span aria-hidden className="text-[0.7rem] opacity-50">
              ⌄
            </span>
          </span>

          <div className="mx-auto flex w-full max-w-[640px] items-center gap-2 rounded-full bg-[color:var(--ob-surface-2)] px-3 py-2">
            <span aria-hidden className="text-[color:var(--ob-muted)]">
              ⌕
            </span>
            {/* The scoped-search pill lives inside the field in the reference. */}
            <span className="flex items-center gap-1.5 rounded-full bg-[color-mix(in_oklab,#0079d3_16%,transparent)] px-2 py-0.5 text-[0.85rem] font-medium text-[color:var(--ob-brand)]">
              <LogoSlot size={16} label="" radius={8} />
              r/Acme_Mods
              <span aria-hidden>⊗</span>
            </span>
            <span className="text-[0.92rem] text-[color:var(--ob-muted)]">
              Search Reddit
            </span>
          </div>

          <span className="flex items-center gap-3 text-[color:var(--ob-fg-soft)]">
            {["↗", "©", "◫", "⛉", "💬", "⌾", "+"].map((glyph, index) => (
              <span key={index} aria-hidden>
                {glyph}
              </span>
            ))}
          </span>
          <span className="flex items-center gap-1.5 rounded-full bg-[color:var(--ob-surface-2)] px-3 py-1.5 text-[0.88rem] font-semibold">
            <span aria-hidden>◔</span> Advertise
          </span>
          <span className="flex items-center gap-2 pl-1">
            <AvatarSlot size={30} />
            <span className="leading-tight">
              <span className="block text-[0.85rem] font-medium">Mod_Account</span>
              <span className="block text-[0.76rem] text-[color:var(--ob-muted)]">
                ⚙ 1 karma
              </span>
            </span>
            <span aria-hidden className="text-[0.7rem] opacity-50">
              ⌄
            </span>
          </span>
        </header>

        <div className="flex items-center gap-2 border-b border-[color:var(--ob-border)] bg-[color:var(--ob-surface)] px-4 py-2.5 text-[0.78rem] font-bold uppercase tracking-wide">
          <LogoSlot size={20} label="" radius={10} />
          <span className="text-[color:var(--ob-cta-bg)]">r/Acme_Mods</span>
          <span className="text-[color:var(--ob-muted)]">/</span>
          <span>Traffic stats</span>
        </div>

        <div className="flex min-h-0 flex-1">
          <Sidebar width={390} bg="var(--ob-surface)">
            <div className="grid gap-1 py-3">
              {GROUPS.map((group) => (
                <div key={group.label}>
                  <p className="flex items-center gap-2.5 px-6 pb-1 pt-4 text-[0.78rem] font-bold uppercase tracking-wide text-[color:var(--ob-muted)]">
                    <span aria-hidden className="text-[0.95rem] opacity-80">
                      {group.glyph}
                    </span>
                    {group.label}
                  </p>
                  {group.items.map((item) => {
                    const active = item.id === page;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        aria-current={active ? "page" : undefined}
                        className={cn(
                          "flex w-full items-center gap-2 py-2.5 pl-6 pr-5 text-left text-[1rem]",
                          active
                            ? "border-l-[3px] border-[color:var(--ob-cta-bg)] bg-[color:var(--ob-surface-2)] pl-[calc(1.5rem-3px)] font-medium"
                            : "text-[color:var(--ob-fg-soft)] hover:bg-[color:var(--ob-surface-2)]",
                        )}
                      >
                        <span className="flex-1">{item.label}</span>
                        {"badge" in item && item.badge && (
                          <span className="rounded-[2px] bg-[color:var(--ob-cta-bg)] px-1.5 py-0.5 text-[0.7rem] font-bold text-white">
                            {item.badge}
                          </span>
                        )}
                        {"external" in item && item.external && (
                          <span aria-hidden className="text-[0.85rem] opacity-50">
                            ↗
                          </span>
                        )}
                        {"chevron" in item && item.chevron && (
                          <span aria-hidden className="opacity-40">
                            ›
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>
          </Sidebar>

          <Main className="overflow-auto p-6">
            <h1 className="pb-4 text-[1.35rem] font-bold">
              Traffic Stats{" "}
              <span className="text-[1rem] font-normal text-[color:var(--ob-muted)]">
                updating every hour
              </span>
            </h1>

            <section className="rounded-[var(--ob-radius-lg)] bg-[color:var(--ob-surface)] p-6">
              <nav className="flex gap-6 pb-6">
                {["Pageviews", "Uniques", "Members"].map((tab, index) => (
                  <span
                    key={tab}
                    className={cn(
                      "pb-1 text-[1.05rem] font-semibold",
                      index === 0
                        ? "border-b-2 border-[color:var(--ob-brand)] text-[color:var(--ob-brand)]"
                        : "",
                    )}
                  >
                    {tab}
                  </span>
                ))}
              </nav>

              <div className="grid gap-4 pb-8 sm:grid-cols-3">
                {[
                  { value: "21", label: "Total - last 24 hours" },
                  { value: "21", label: "Total - last 7 days" },
                  { value: "0", label: "Total - last month" },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-[var(--ob-radius)] border border-[color:var(--ob-border)] px-5 py-4"
                  >
                    <p className="text-[2rem] font-normal tabular-nums leading-none">
                      {stat.value}
                    </p>
                    <p className="pt-2 text-[0.78rem] font-bold uppercase tracking-wide text-[color:var(--ob-muted)]">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>

              <div className="flex gap-8">
                <RuledChart />
                <ul className="grid content-start gap-3 pt-6">
                  {PLATFORMS.map((platform) => (
                    <li key={platform.id} className="flex items-center gap-3">
                      <span
                        aria-hidden
                        className="size-4 rounded-[2px]"
                        style={{ background: platform.color }}
                      />
                      <span className="text-[1rem] text-[color:var(--ob-fg-soft)]">
                        {platform.label}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex items-center gap-4 pt-4">
                <span aria-hidden className="text-[1.3rem]">
                  ←
                </span>
                <span className="mx-auto flex items-center gap-4 text-[1rem] font-semibold">
                  <span>Hour</span>
                  <span className="rounded bg-[color-mix(in_oklab,#0079d3_12%,transparent)] px-2 py-0.5 text-[color:var(--ob-brand)]">
                    Day
                  </span>
                  <span>Month</span>
                </span>
                <span aria-hidden className="text-[1.3rem] opacity-30">
                  →
                </span>
              </div>
            </section>

            <section className="mt-5 rounded-[var(--ob-radius-lg)] bg-[color:var(--ob-surface)] p-6">
              <nav className="flex gap-6 pb-5">
                {["Day", "Day of week", "Month"].map((tab, index) => (
                  <span
                    key={tab}
                    className={cn(
                      "pb-1 text-[1.05rem] font-semibold",
                      index === 0
                        ? "border-b-2 border-[color:var(--ob-brand)] text-[color:var(--ob-brand)]"
                        : "",
                    )}
                  >
                    {tab}
                  </span>
                ))}
              </nav>

              <table className="w-full border-collapse text-[1rem]">
                <thead>
                  <tr className="bg-[color:var(--ob-surface-2)] text-[0.78rem] font-bold uppercase tracking-wide text-[color:var(--ob-fg-soft)]">
                    <Th>
                      Day{" "}
                      <span aria-hidden className="pl-1 text-[0.7rem]">
                        ▾
                      </span>
                    </Th>
                    <Th>Pageviews</Th>
                    <Th>Uniques</Th>
                    <Th>Members joined</Th>
                  </tr>
                </thead>
                <tbody>
                  {TABLE.map((row) => (
                    <tr key={row.day}>
                      <Td>{row.day}</Td>
                      <Td>{row.views}</Td>
                      <Td>{row.uniques}</Td>
                      <Td>{row.joined}</Td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>
          </Main>
        </div>
      </Shell>
    </Surface>
  );
}

function Th({ children }: { children: ReactNode }) {
  return (
    <th className="border border-[color:var(--ob-border)] px-5 py-3 text-left font-bold">
      {children}
    </th>
  );
}

function Td({ children }: { children: ReactNode }) {
  return (
    <td className="border border-[color:var(--ob-border)] px-5 py-3.5 tabular-nums">
      {children}
    </td>
  );
}

/**
 * Hand-drawn plot box.
 *
 * The shared chart kit deliberately omits axis frames and vertical gridlines,
 * so this one is laid out here instead of bending the kit — the ruled box and
 * the rotated axis title are exactly what date this surface.
 */
function RuledChart() {
  const width = 1240;
  const height = 350;
  const max = 25;
  const step = width / (DAYS.length - 1);
  const y = (value: number) => height - (value / max) * height;
  const path = (points: number[]) =>
    points.map((value, i) => `${i === 0 ? "M" : "L"}${i * step},${y(value)}`).join(" ");

  return (
    <div className="flex min-w-0 flex-1 gap-3">
      <span className="flex items-center">
        <span
          className="whitespace-nowrap text-[0.85rem] font-bold text-[color:var(--ob-fg-soft)]"
          style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
        >
          Pageviews
        </span>
      </span>

      <div className="min-w-0 flex-1">
        <div className="flex">
          <div className="grid shrink-0 pr-2 text-right text-[0.82rem] tabular-nums text-[color:var(--ob-fg-soft)]">
            {[25, 20, 15, 10, 5, 0].map((tick, index) => (
              <span
                key={tick}
                className={cn("leading-none", index > 0 && "mt-[calc((350px/5)-0.8em)]")}
              >
                {tick}
              </span>
            ))}
          </div>

          <svg
            viewBox={`0 0 ${width} ${height}`}
            className="h-[350px] min-w-0 flex-1"
            preserveAspectRatio="none"
            role="img"
            aria-label="Pageviews per day"
          >
            {/* Horizontal gridlines and, unusually, vertical ones too. */}
            {[0, 1, 2, 3, 4, 5].map((index) => (
              <line
                key={`h${index}`}
                x1={0}
                x2={width}
                y1={(height / 5) * index}
                y2={(height / 5) * index}
                stroke="var(--ob-border)"
                strokeWidth={1}
                vectorEffect="non-scaling-stroke"
              />
            ))}
            {DAYS.map((_, index) => (
              <line
                key={`v${index}`}
                x1={index * step}
                x2={index * step}
                y1={0}
                y2={height}
                stroke="var(--ob-border)"
                strokeWidth={1}
                vectorEffect="non-scaling-stroke"
              />
            ))}
            <path
              d={path(OLD_REDDIT)}
              fill="none"
              stroke="#f2b544"
              strokeWidth={2}
              vectorEffect="non-scaling-stroke"
            />
            <path
              d={path(PAGEVIEWS)}
              fill="none"
              stroke="#0079d3"
              strokeWidth={2}
              vectorEffect="non-scaling-stroke"
            />
          </svg>
        </div>

        <div className="flex pl-[1.9rem] pt-2">
          {DAYS.map((day, index) => (
            <span
              key={day}
              className={cn(
                "flex-1 text-[0.82rem] text-[color:var(--ob-fg-soft)]",
                index === 0
                  ? "text-left"
                  : index === DAYS.length - 1
                    ? "text-right"
                    : "text-center",
              )}
            >
              {day}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
