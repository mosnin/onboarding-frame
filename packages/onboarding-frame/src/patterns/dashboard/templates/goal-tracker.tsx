"use client";

import type { ReactNode } from "react";
import { cn } from "../../../lib/cn";
import { AvatarSlot, Placeholder } from "../../../ui/placeholder";
import { Surface, goalTokens } from "./tokens";
import { Main, SearchField, Shell, Sidebar } from "./chrome";
import type { TemplateProps } from "./props";

export type GoalPage = "goal" | "goals" | "reporting";

export interface GoalTrackerProps extends TemplateProps {
  page?: GoalPage;
}

const TOP = [
  { id: "home", label: "Home", glyph: "⌂" },
  { id: "tasks", label: "My tasks", glyph: "✓" },
  { id: "inbox", label: "Inbox", glyph: "⌾", dot: true },
];

const SECTIONS = [
  {
    label: "Insights",
    add: true,
    items: [
      { id: "reporting", label: "Reporting", glyph: "📈" },
      { id: "portfolios", label: "Portfolios", glyph: "🗂" },
      { id: "goals", label: "Goals", glyph: "◎" },
    ],
  },
  {
    label: "Projects",
    add: true,
    items: [
      { id: "design", label: "Design Project", dot: "#4ecdc4" },
      { id: "portfolio", label: "My first portfolio", glyph: "🗂", chevron: true },
    ],
  },
  {
    label: "Team",
    items: [{ id: "workspace", label: "My workspace", glyph: "👥", chevron: true }],
  },
];

const STATUSES = [
  { id: "on", label: "On track", color: "#5da283" },
  { id: "risk", label: "At risk", color: "#e8c33d" },
  { id: "off", label: "Off track", color: "#e8384f" },
];

/**
 * Goal detail page.
 *
 * The distinguishing detail is the progress chart: the filled wedge is the
 * *target* ramp to 100% by quarter end, and the only real datum is a single
 * dot at 0% under a "Today" rule at the far left. Drawing the target as the
 * area and actual progress as one point is what makes an untouched goal read
 * as untouched rather than as a plunging line.
 */
export function GoalTrackerTemplate({ className, page = "goal" }: GoalTrackerProps) {
  return (
    <Surface tokens={goalTokens} className={className}>
      <Shell>
        <Sidebar width={239} bg="#2e2e30" className="border-r-0 text-white">
          <div className="flex items-center gap-[9px] px-[15px] pb-[12px] pt-[12px]">
            <span aria-hidden className="text-[0.864rem]">
              ☰
            </span>
            <span className="flex items-center gap-[6px] rounded-full bg-white/10 px-[9px] py-[5px] text-[0.714rem] font-semibold">
              <span className="grid size-[15px] place-items-center rounded-full bg-[color:var(--ob-cta-bg)] text-[0.601rem]">
                +
              </span>
              Create
            </span>
          </div>

          <nav className="grid gap-[2px] px-[9px]">
            {TOP.map((item) => (
              <DarkNavItem key={item.id} label={item.label} glyph={item.glyph} dot={item.dot} />
            ))}
          </nav>

          {SECTIONS.map((section) => (
            <div key={section.label} className="pt-[18px]">
              <p className="flex items-center gap-[6px] px-[15px] pb-[5px] text-[0.751rem] font-semibold">
                <span className="flex-1">{section.label}</span>
                {section.add && (
                  <span aria-hidden className="text-[0.789rem] text-white/60">
                    +
                  </span>
                )}
              </p>
              <nav className="grid gap-[2px] px-[9px]">
                {section.items.map((item) => (
                  <DarkNavItem
                    key={item.id}
                    label={item.label}
                    glyph={"glyph" in item ? item.glyph : undefined}
                    swatch={"dot" in item ? (item.dot as string) : undefined}
                    chevron={"chevron" in item ? item.chevron : undefined}
                    active={item.id === page}
                  />
                ))}
              </nav>
            </div>
          ))}

          <div className="mt-auto grid gap-[12px] px-[15px] pb-[18px]">
            <span className="flex items-center justify-center gap-[6px] rounded-[var(--ob-radius)] border border-white/25 py-[8px] text-[0.714rem] font-medium">
              <span aria-hidden>✉</span> Invite teammates
            </span>
            <span className="text-center text-[0.691rem] text-white/50">
              Help with Goals
            </span>
          </div>
        </Sidebar>

        <Main>
          <div className="flex h-[42px] shrink-0 items-center bg-[#2e2e30] px-[18px]">
            <SearchField
              placeholder="Search"
              className="mx-auto w-full max-w-[481px] border-white/20 bg-white/10 text-white/70"
            />
          </div>

          <header className="flex items-center gap-[9px] border-b border-[color:var(--ob-border)] px-[18px] py-[12px]">
            <Placeholder width={33} height={33} radius={6} label="" glyph="◬" />
            <div className="min-w-[0px] flex-1">
              <p className="flex items-center gap-[5px] text-[0.676rem] text-[color:var(--ob-muted)]">
                My workspace goals <span aria-hidden>›</span>
              </p>
              <p className="flex items-center gap-[8px] text-[0.826rem] font-bold">
                Attract 2 new clients
                <span aria-hidden className="text-[0.526rem] opacity-50">
                  ⌄
                </span>
                <span aria-hidden className="text-[color:var(--ob-muted)]">
                  👍
                </span>
                <span aria-hidden className="text-[color:var(--ob-muted)]">
                  ☆
                </span>
              </p>
            </div>
            <AvatarSlot size={23} />
            <span className="flex items-center gap-[5px] rounded-[var(--ob-radius-sm)] bg-[color:var(--ob-brand)] px-[11px] py-[6px] text-[0.676rem] font-semibold text-white">
              <span aria-hidden>🔒</span> Share
            </span>
          </header>

          <div className="flex flex-1 gap-[30px] overflow-auto px-[30px] py-[24px]">
            <div className="min-w-[0px] flex-1">
              <h1 className="text-[1.803rem] font-bold tracking-[-0.02em]">
                Attract 2 new clients
              </h1>

              <h2 className="pb-[12px] pt-[24px] text-[0.864rem] font-bold">
                What&apos;s the status?
              </h2>
              <div className="flex items-center gap-[9px]">
                {STATUSES.map((status) => (
                  <span
                    key={status.id}
                    className="inline-flex items-center gap-[6px] rounded-[var(--ob-radius-sm)] border border-[color:var(--ob-border-strong)] px-[12px] py-[8px] text-[0.736rem] font-medium"
                  >
                    <span
                      aria-hidden
                      className="size-[6px] rounded-full"
                      style={{ background: status.color }}
                    />
                    {status.label}
                  </span>
                ))}
                <span aria-hidden className="pl-[3px] text-[color:var(--ob-muted)]">
                  ···
                </span>
              </div>

              <div className="grid gap-[15px] pt-[18px] sm:grid-cols-2">
                <div className="grid justify-items-center rounded-[var(--ob-radius)] border border-[color:var(--ob-border)] px-[15px] py-[18px] text-center">
                  <p className="text-[0.736rem] text-[color:var(--ob-fg-soft)]">
                    Goal completion
                  </p>
                  <p className="pt-[3px] text-[1.503rem] font-bold tabular-nums leading-none">0%</p>
                  <p className="pt-[6px] text-[0.691rem] text-[color:var(--ob-muted)]">
                    4 months left in Q4 FY24
                  </p>
                </div>
                <div className="grid justify-items-center rounded-[var(--ob-radius)] border border-[color:var(--ob-border)] px-[15px] py-[18px] text-center">
                  <p className="text-[0.736rem] text-[color:var(--ob-fg-soft)]">
                    Latest status
                  </p>
                  <p className="flex items-center gap-[6px] pt-[3px] text-[1.202rem] font-medium leading-none text-[color:var(--ob-muted)]">
                    <span
                      aria-hidden
                      className="size-[11px] rounded-full border-[1px] border-[color:var(--ob-border-strong)]"
                    />
                    No status
                  </p>
                  <p className="pt-[6px] text-[0.714rem] font-medium text-[color:var(--ob-brand)]">
                    Set status
                  </p>
                </div>
              </div>

              <section className="mt-[15px] rounded-[var(--ob-radius)] border border-[color:var(--ob-border)] p-[18px]">
                <div className="flex flex-wrap items-center gap-[9px]">
                  <h2 className="flex items-center gap-[8px] text-[0.977rem] font-bold">
                    Progress
                    <span aria-hidden className="text-[color:#e8c33d]">
                      ⚡
                    </span>
                  </h2>
                  <span className="flex items-center gap-[5px] text-[0.714rem] text-[color:var(--ob-muted)]">
                    <span aria-hidden>⚠</span> No sub-goals connected
                  </span>
                  <span className="ml-auto flex items-center gap-[5px] text-[0.714rem] text-[color:var(--ob-fg-soft)]">
                    <span aria-hidden>⇶</span> Progress settings
                  </span>
                </div>

                <TargetRamp />

                <div className="flex items-center gap-[15px] pt-[12px]">
                  <Placeholder width={83} height={59} radius={6} label="" glyph="⛰" />
                  <div>
                    <p className="text-[0.789rem]">
                      Use sub-goals to automatically update this goal&apos;s progress.
                    </p>
                    <span className="mt-[9px] inline-flex rounded-[var(--ob-radius-sm)] bg-[color:var(--ob-brand)] px-[12px] py-[8px] text-[0.714rem] font-semibold text-white">
                      + Connect sub-goal
                    </span>
                  </div>
                </div>
              </section>
            </div>

            <aside className="hidden w-[248px] shrink-0 xl:block">
              <h2 className="text-[0.977rem] font-bold">About this goal</h2>

              <p className="pb-[6px] pt-[18px] text-[0.736rem] text-[color:var(--ob-fg-soft)]">
                Goal owner
              </p>
              <div className="flex items-center gap-[8px] text-[0.789rem]">
                <AvatarSlot size={21} />
                Sam Lee
              </div>

              <p className="pb-[6px] pt-[18px] text-[0.736rem] text-[color:var(--ob-fg-soft)]">
                Accountable team
              </p>
              <div className="flex items-center gap-[8px] text-[0.789rem]">
                <Placeholder width={20} height={20} radius={5} label="" />
                My workspace
              </div>

              <div className="my-[21px] border-t border-[color:var(--ob-border)]" />

              <p className="pb-[6px] text-[0.736rem] text-[color:var(--ob-fg-soft)]">
                Time period
              </p>
              <p className="text-[0.789rem] font-medium">Q4 FY24</p>
              <p className="pt-[12px] text-[0.736rem] text-[color:var(--ob-muted)]">
                Set a custom due date
              </p>

              <div className="my-[21px] border-t border-[color:var(--ob-border)]" />

              <p className="pb-[6px] text-[0.736rem] text-[color:var(--ob-fg-soft)]">
                Parent goals
              </p>
              <p className="flex items-center gap-[6px] text-[0.751rem]">
                <span aria-hidden>+</span> Connect a parent goal
              </p>

              <p className="pt-[24px] text-[0.736rem] font-medium text-[color:var(--ob-brand)] underline">
                Send feedback
              </p>
            </aside>
          </div>
        </Main>
      </Shell>
    </Surface>
  );
}

function DarkNavItem({
  label,
  glyph,
  swatch,
  dot,
  chevron,
  active,
}: {
  label: string;
  glyph?: ReactNode;
  swatch?: string;
  dot?: boolean;
  chevron?: boolean;
  active?: boolean;
}) {
  return (
    <button
      type="button"
      aria-current={active ? "page" : undefined}
      className={cn(
        "flex w-full items-center gap-[9px] rounded-[var(--ob-radius-sm)] px-[8px] py-[6px] text-left text-[0.751rem]",
        active ? "bg-white/12 font-medium" : "text-white/85 hover:bg-white/8",
      )}
    >
      {swatch ? (
        <span
          aria-hidden
          className="size-[11px] shrink-0 rounded-[3px]"
          style={{ background: swatch }}
        />
      ) : (
        <span aria-hidden className="w-[12px] shrink-0 text-center opacity-80">
          {glyph}
        </span>
      )}
      <span className="flex-1 truncate">{label}</span>
      {dot && <span aria-hidden className="size-[5px] rounded-full bg-[#e8c33d]" />}
      {chevron && (
        <span aria-hidden className="text-[0.601rem] opacity-50">
          ›
        </span>
      )}
    </button>
  );
}

/**
 * Target ramp with a single actual datum.
 *
 * Built inline rather than with the chart kit: the wedge is a target, not a
 * series, and plotting it as one would imply progress that has not happened.
 */
function TargetRamp() {
  const months = ["Sep", "Oct", "Nov", "Dec", "Jan\n2025"];

  return (
    <div className="flex gap-[9px] pt-[18px]">
      <div className="grid shrink-0 pr-[3px] text-right text-[0.639rem] tabular-nums text-[color:var(--ob-fg-soft)]">
        {["100%", "75%", "50%", "25%", "0%"].map((tick, index) => (
          <span
            key={tick}
            className={cn("leading-none", index > 0 && "mt-[calc((300px/4)-0.8em)]")}
          >
            {tick}
          </span>
        ))}
      </div>

      <div className="min-w-[0px] flex-1">
        <p className="pb-[3px] text-[0.676rem] text-[color:var(--ob-fg-soft)]">Today</p>
        <svg
          viewBox="0 0 600 300"
          className="h-[225px] w-full"
          preserveAspectRatio="none"
          role="img"
          aria-label="Target ramp to 100% by quarter end, actual progress 0%"
        >
          {[0, 1, 2, 3, 4].map((index) => (
            <line
              key={index}
              x1={0}
              x2={600}
              y1={75 * index}
              y2={75 * index}
              stroke="var(--ob-border)"
              strokeWidth={1}
              vectorEffect="non-scaling-stroke"
            />
          ))}
          {/* "Today" rule at the left edge, where the quarter has just begun. */}
          <line
            x1={2}
            x2={2}
            y1={0}
            y2={300}
            stroke="var(--ob-border-strong)"
            strokeWidth={1}
            vectorEffect="non-scaling-stroke"
          />
          <path d="M150,300 L600,0 L600,300 Z" fill="var(--ob-surface-3)" />
          {/* The one real reading: 0% today. */}
          <circle cx={4} cy={296} r={5} fill="var(--ob-muted)" />
        </svg>

        <div className="flex pt-[6px]">
          {months.map((month, index) => (
            <span
              key={month}
              className={cn(
                "flex-1 whitespace-pre-line text-[0.639rem] text-[color:var(--ob-fg-soft)]",
                index === 0
                  ? "text-left"
                  : index === months.length - 1
                    ? "text-right"
                    : "text-center",
              )}
            >
              {month}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
