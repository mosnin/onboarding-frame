"use client";

import type { ReactNode } from "react";
import { LineChart } from "../../../ui/charts";
import { cn } from "../../../lib/cn";
import { AvatarSlot, LogoSlot } from "../../../ui/placeholder";
import { Surface, deployTokens } from "./tokens";
import { Main, Shell, Sidebar } from "./chrome";
import type { TemplateProps } from "./props";

export type DeployPage = "analytics" | "deployments" | "logs";

export interface DeployAnalyticsProps extends TemplateProps {
  page?: DeployPage;
}

const NAV_TOP = [
  { id: "overview", label: "Overview", glyph: "◬" },
  { id: "deployments", label: "Deployments", glyph: "⬢" },
  { id: "logs", label: "Logs", glyph: "≣" },
  { id: "analytics", label: "Analytics", glyph: "📈" },
  { id: "speed", label: "Speed Insights", glyph: "◔" },
  { id: "observability", label: "Observability", glyph: "◉", chevron: true },
  { id: "firewall", label: "Firewall", glyph: "⛉", chevron: true },
  { id: "cdn", label: "CDN", glyph: "🌐", chevron: true },
];

const NAV_MID = [
  { id: "domains", label: "Domains", glyph: "▭" },
  { id: "integrations", label: "Integrations", glyph: "🏪" },
  { id: "storage", label: "Storage", glyph: "⛁" },
  { id: "flags", label: "Flags", glyph: "◎", chevron: true },
  { id: "agent", label: "Agent", glyph: "⁂", chevron: true },
  { id: "gateway", label: "AI Gateway", glyph: "⑄", chevron: true },
  { id: "sandboxes", label: "Sandboxes", glyph: "▨" },
  { id: "workflows", label: "Workflows", glyph: "⚯" },
];

const NAV_BOTTOM = [
  { id: "usage", label: "Usage", glyph: "◔" },
  { id: "support", label: "Support", glyph: "⛑" },
  { id: "settings", label: "Settings", glyph: "⚙", chevron: true },
];

const REFERRERS = [
  { id: "google", label: "google.com", visitors: 2, fill: 100 },
  { id: "vercel", label: "vercel.com", visitors: 2, fill: 100 },
  { id: "slack", label: "com.slack", visitors: 1, fill: 52 },
];

/**
 * Deployment analytics.
 *
 * Two details carry the meaning here. The selected metric in the stat strip is
 * marked by a heavy bottom border on its cell rather than by a fill, so the
 * strip still reads as one continuous row. And the descending leg of the
 * traffic curve is dashed: the last day is still in progress, and drawing it
 * solid would claim traffic has collapsed when it has only not finished.
 */
export function DeployAnalyticsTemplate({
  className,
  page = "analytics",
}: DeployAnalyticsProps) {
  return (
    <Surface tokens={deployTokens} className={className}>
      <Shell>
        <Sidebar width={284} bg="var(--ob-surface)">
          <div className="flex items-center gap-[8px] px-[13px] pb-[10px] pt-[13px]">
            <AvatarSlot size={22} />
            <span className="min-w-[0px] flex-1 truncate text-[0.793rem] font-medium">
              acme-team
            </span>
            <span className="rounded-full bg-[color-mix(in_oklab,#0062ff_12%,transparent)] px-[7px] py-[2px] text-[0.634rem] font-semibold text-[color:var(--ob-brand)]">
              Pro Trial
            </span>
            <span aria-hidden className="text-[0.584rem] text-[color:var(--ob-muted)]">
              ⌃⌄
            </span>
          </div>

          <div className="px-[13px] pb-[10px]">
            <div className="flex items-center gap-[7px] rounded-[var(--ob-radius-sm)] border border-[color:var(--ob-border-strong)] px-[10px] py-[7px] text-[0.768rem] text-[color:var(--ob-muted)]">
              <span aria-hidden>⌕</span>
              <span className="flex-1">Find…</span>
              <kbd className="rounded border border-[color:var(--ob-border)] px-[5px] py-[2px] text-[0.568rem] font-semibold">
                F
              </kbd>
            </div>
          </div>

          <NavList items={NAV_TOP} active={page} />
          <div className="mx-[13px] my-[10px] border-t border-[color:var(--ob-border)]" />
          <NavList items={NAV_MID} active={page} />
          <div className="mx-[13px] my-[10px] border-t border-[color:var(--ob-border)]" />
          <NavList items={NAV_BOTTOM} active={page} />

          <div className="mt-auto flex items-center gap-[8px] px-[13px] py-[13px]">
            <AvatarSlot size={23} />
            <span className="flex-1 text-[0.793rem] font-medium">Sam Lee</span>
            <span aria-hidden className="text-[color:var(--ob-muted)]">
              ···
            </span>
            <span className="relative" aria-hidden>
              ⌾
              <span className="absolute -right-[2px] -top-[2px] size-[7px] rounded-full bg-[color:var(--ob-brand)]" />
            </span>
          </div>
        </Sidebar>

        <Main className="overflow-auto">
          <header className="flex h-[47px] shrink-0 items-center gap-[10px] border-b border-[color:var(--ob-border)] px-[20px]">
            <span className="flex items-center gap-[7px] text-[0.793rem] font-medium">
              <LogoSlot size={17} label="" radius={3} />
              newlandingpage
              <span aria-hidden className="text-[0.584rem] text-[color:var(--ob-muted)]">
                ⌃⌄
              </span>
            </span>
            <span className="mx-auto text-[0.793rem] font-medium">Analytics</span>
            <span aria-hidden className="text-[color:var(--ob-muted)]">
              ···
            </span>
          </header>

          <div className="flex flex-wrap items-center gap-[10px] px-[20px] py-[13px]">
            <span className="flex items-center gap-[7px] text-[0.793rem]">
              <span aria-hidden className="text-[color:var(--ob-muted)]">
                🌐
              </span>
              newlandingpage-gold.example.app
              <span aria-hidden className="text-[0.668rem] text-[color:var(--ob-muted)]">
                ↗
              </span>
            </span>
            <span className="flex items-center gap-[7px] pl-[10px] text-[0.793rem] text-[color:var(--ob-muted)]">
              <span
                aria-hidden
                className="size-[7px] rounded-full border border-[color:var(--ob-border-strong)]"
              />
              0 online
            </span>
            <span className="ml-auto flex items-center gap-[10px]">
              <Select>Production</Select>
              <Select glyph="🗓">Last 7 Days</Select>
            </span>
          </div>

          <div className="px-[20px] pb-[27px]">
            <section className="overflow-hidden rounded-[var(--ob-radius)] border border-[color:var(--ob-border)]">
              <div className="grid grid-cols-2 lg:grid-cols-4">
                <Stat label="Visitors" value="13" selected />
                <Stat label="Page Views" value="24" />
                <Stat
                  label="Bounce Rate"
                  value="69%"
                  badge={
                    <span className="rounded bg-[color-mix(in_oklab,#e5484d_12%,transparent)] px-[5px] py-[2px] text-[0.651rem] font-semibold text-[color:var(--ob-danger)]">
                      +69%
                    </span>
                  }
                />
                <span className="border-l border-[color:var(--ob-border)]" />
              </div>

              <div className="relative px-[17px] pb-[17px] pt-[7px]">
                {/*
                  The reference is captured mid-hover, and that state carries
                  information the resting chart does not: which day the peak
                  belongs to, and that it was yesterday. Both are kept.
                */}
                <span className="pointer-events-none absolute inset-y-[7px] left-[calc(5%+80.5%*6/7)] z-10 hidden border-l border-[color:var(--ob-fg)] lg:block">
                  <span className="absolute -left-[4px] top-[6%] size-[8px] rounded-full border-2 border-[color:var(--ob-surface)] bg-[color:var(--ob-brand)]" />
                  <span className="absolute left-[10px] top-[8%] grid gap-[3px] rounded-[var(--ob-radius-sm)] border border-[color:var(--ob-border)] bg-[color:var(--ob-surface)] px-[12px] py-[8px] shadow-[0_4px_14px_rgba(0,0,0,0.1)]">
                    <span className="flex items-center gap-[8px] whitespace-nowrap text-[0.768rem]">
                      <span aria-hidden className="size-[7px] rounded-full bg-[color:var(--ob-brand)]" />
                      Visitors
                      <span className="pl-[3px] font-semibold tabular-nums">13</span>
                    </span>
                    <span className="whitespace-nowrap pl-[15px] text-[0.768rem] text-[color:var(--ob-fg-soft)]">
                      Apr 22
                    </span>
                  </span>
                </span>
                <LineChart
                  height={351}
                  gridLines={2}
                  yLabels={["0", "5", "10"]}
                  xLabels={[
                    "Apr 16",
                    "Apr 17",
                    "Apr 18",
                    "Apr 19",
                    "Apr 20",
                    "Apr 21",
                    "Yesterday",
                    "Apr 23",
                  ]}
                  series={[
                    {
                      id: "visitors",
                      points: [0, 0, 0, 0, 0, 0, 13, 0],
                      color: "var(--ob-brand)",
                      area: true,
                      // The last day is still running, so its leg is a guess.
                      dashedFrom: 6,
                    },
                  ]}
                />
              </div>
            </section>

            <div className="grid gap-[17px] pt-[17px] lg:grid-cols-2">
              <PanelCard
                tabs={["Pages", "Routes", "Hostnames"]}
                metric="Visitors"
                rows={[{ id: "root", label: "/", visitors: 13, fill: 100 }]}
              />
              <PanelCard
                tabs={["Referrers", "UTM Parameters"]}
                metric="Visitors"
                rows={REFERRERS}
                icons
              />
            </div>
          </div>
        </Main>
      </Shell>
    </Surface>
  );
}

function NavList({
  items,
  active,
}: {
  items: { id: string; label: string; glyph: string; chevron?: boolean }[];
  active: string;
}) {
  return (
    <nav className="grid gap-[2px] px-[10px]">
      {items.map((item) => (
        <button
          key={item.id}
          type="button"
          aria-current={item.id === active ? "page" : undefined}
          className={cn(
            "flex items-center gap-[10px] rounded-[var(--ob-radius-sm)] px-[10px] py-[7px] text-left text-[0.818rem]",
            item.id === active
              ? "bg-[color:var(--ob-surface-3)] font-medium"
              : "text-[color:var(--ob-fg-soft)] hover:bg-[color:var(--ob-surface-2)]",
          )}
        >
          <span aria-hidden className="w-[13px] shrink-0 text-center opacity-70">
            {item.glyph}
          </span>
          <span className="flex-1">{item.label}</span>
          {item.chevron && (
            <span aria-hidden className="text-[0.668rem] opacity-40">
              ›
            </span>
          )}
        </button>
      ))}
    </nav>
  );
}

function Stat({
  label,
  value,
  badge,
  selected,
}: {
  label: string;
  value: string;
  badge?: ReactNode;
  selected?: boolean;
}) {
  return (
    <div
      className={cn(
        "border-l border-[color:var(--ob-border)] px-[17px] py-[13px] first:border-l-0",
        // Selection is a rule under the cell, keeping the strip continuous.
        selected && "border-b-2 border-b-[color:var(--ob-fg)]",
      )}
    >
      <p className="text-[0.818rem] font-medium text-[color:var(--ob-fg-soft)]">{label}</p>
      <p className="flex items-center gap-[8px] pt-[3px]">
        <span className="text-[1.669rem] font-semibold tabular-nums leading-none">{value}</span>
        {badge}
      </p>
    </div>
  );
}

function Select({ children, glyph }: { children: ReactNode; glyph?: string }) {
  return (
    <span className="inline-flex items-center gap-[33px] rounded-[var(--ob-radius-sm)] border border-[color:var(--ob-border-strong)] px-[12px] py-[7px] text-[0.768rem]">
      <span className="flex items-center gap-[7px]">
        {glyph && (
          <span aria-hidden className="text-[color:var(--ob-muted)]">
            {glyph}
          </span>
        )}
        {children}
      </span>
      <span aria-hidden className="text-[0.584rem] opacity-60">
        ⌄
      </span>
    </span>
  );
}

/**
 * Row fills encode the value, so a shorter bar means fewer visitors rather
 * than being decoration behind the label.
 */
function PanelCard({
  tabs,
  metric,
  rows,
  icons,
}: {
  tabs: string[];
  metric: string;
  rows: { id: string; label: string; visitors: number; fill: number }[];
  icons?: boolean;
}) {
  return (
    <section className="rounded-[var(--ob-radius)] border border-[color:var(--ob-border)] p-[13px]">
      <div className="flex items-center gap-[17px] border-b border-[color:var(--ob-border)] px-[3px] pb-[10px]">
        {tabs.map((tab, index) => (
          <span
            key={tab}
            className={cn(
              "pb-[7px] text-[0.818rem]",
              index === 0
                ? "-mb-[10px] border-b-2 border-[color:var(--ob-fg)] font-medium"
                : "text-[color:var(--ob-muted)]",
            )}
          >
            {tab}
          </span>
        ))}
        <span className="ml-auto text-[0.651rem] font-semibold uppercase tracking-wide text-[color:var(--ob-muted)]">
          {metric}
        </span>
      </div>

      <ul className="pt-[10px]">
        {rows.map((row) => (
          <li key={row.id} className="flex items-center gap-[10px] py-[3px]">
            <span className="relative min-w-[0px] flex-1 overflow-hidden rounded-[var(--ob-radius-sm)]">
              <span
                aria-hidden
                className="absolute inset-y-[0px] left-[0px] bg-[color:var(--ob-surface-2)]"
                style={{ width: `${row.fill}%` }}
              />
              <span className="relative flex items-center gap-[7px] px-[10px] py-[7px] text-[0.793rem]">
                {icons && <LogoSlot size={15} label="" radius={3} />}
                {row.label}
              </span>
            </span>
            <span className="w-[33px] shrink-0 text-right text-[0.793rem] tabular-nums">
              {row.visitors}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
