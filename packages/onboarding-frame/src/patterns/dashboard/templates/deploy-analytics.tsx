"use client";

import type { ReactNode } from "react";
import { LineChart } from "../../../ui/charts";
import { cn } from "../../../lib/cn";
import { AvatarSlot, LogoSlot } from "../../../ui/placeholder";
import { Surface, deployTokens } from "./tokens";
import { Main, Shell, Sidebar } from "./chrome";
import type { TemplateProps } from "./api-console";

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
        <Sidebar width={340} bg="var(--ob-surface)">
          <div className="flex items-center gap-2.5 px-4 pb-3 pt-4">
            <AvatarSlot size={26} />
            <span className="min-w-0 flex-1 truncate text-[0.95rem] font-medium">
              acme-team
            </span>
            <span className="rounded-full bg-[color-mix(in_oklab,#0062ff_12%,transparent)] px-2 py-0.5 text-[0.76rem] font-semibold text-[color:var(--ob-brand)]">
              Pro Trial
            </span>
            <span aria-hidden className="text-[0.7rem] text-[color:var(--ob-muted)]">
              ⌃⌄
            </span>
          </div>

          <div className="px-4 pb-3">
            <div className="flex items-center gap-2 rounded-[var(--ob-radius-sm)] border border-[color:var(--ob-border-strong)] px-3 py-2 text-[0.92rem] text-[color:var(--ob-muted)]">
              <span aria-hidden>⌕</span>
              <span className="flex-1">Find…</span>
              <kbd className="rounded border border-[color:var(--ob-border)] px-1.5 py-0.5 text-[0.68rem] font-semibold">
                F
              </kbd>
            </div>
          </div>

          <NavList items={NAV_TOP} active={page} />
          <div className="mx-4 my-3 border-t border-[color:var(--ob-border)]" />
          <NavList items={NAV_MID} active={page} />
          <div className="mx-4 my-3 border-t border-[color:var(--ob-border)]" />
          <NavList items={NAV_BOTTOM} active={page} />

          <div className="mt-auto flex items-center gap-2.5 px-4 py-4">
            <AvatarSlot size={28} />
            <span className="flex-1 text-[0.95rem] font-medium">Sam Lee</span>
            <span aria-hidden className="text-[color:var(--ob-muted)]">
              ···
            </span>
            <span className="relative" aria-hidden>
              ⌾
              <span className="absolute -right-0.5 -top-0.5 size-2 rounded-full bg-[color:var(--ob-brand)]" />
            </span>
          </div>
        </Sidebar>

        <Main className="overflow-auto">
          <header className="flex h-14 shrink-0 items-center gap-3 border-b border-[color:var(--ob-border)] px-6">
            <span className="flex items-center gap-2 text-[0.95rem] font-medium">
              <LogoSlot size={20} label="" radius={4} />
              newlandingpage
              <span aria-hidden className="text-[0.7rem] text-[color:var(--ob-muted)]">
                ⌃⌄
              </span>
            </span>
            <span className="mx-auto text-[0.95rem] font-medium">Analytics</span>
            <span aria-hidden className="text-[color:var(--ob-muted)]">
              ···
            </span>
          </header>

          <div className="flex flex-wrap items-center gap-3 px-6 py-4">
            <span className="flex items-center gap-2 text-[0.95rem]">
              <span aria-hidden className="text-[color:var(--ob-muted)]">
                🌐
              </span>
              newlandingpage-gold.example.app
              <span aria-hidden className="text-[0.8rem] text-[color:var(--ob-muted)]">
                ↗
              </span>
            </span>
            <span className="flex items-center gap-2 pl-3 text-[0.95rem] text-[color:var(--ob-muted)]">
              <span
                aria-hidden
                className="size-2 rounded-full border border-[color:var(--ob-border-strong)]"
              />
              0 online
            </span>
            <span className="ml-auto flex items-center gap-3">
              <Select>Production</Select>
              <Select glyph="🗓">Last 7 Days</Select>
            </span>
          </div>

          <div className="px-6 pb-8">
            <section className="overflow-hidden rounded-[var(--ob-radius)] border border-[color:var(--ob-border)]">
              <div className="grid grid-cols-2 lg:grid-cols-4">
                <Stat label="Visitors" value="13" selected />
                <Stat label="Page Views" value="24" />
                <Stat
                  label="Bounce Rate"
                  value="69%"
                  badge={
                    <span className="rounded bg-[color-mix(in_oklab,#e5484d_12%,transparent)] px-1.5 py-0.5 text-[0.78rem] font-semibold text-[color:var(--ob-danger)]">
                      +69%
                    </span>
                  }
                />
                <span className="border-l border-[color:var(--ob-border)]" />
              </div>

              <div className="px-5 pb-5 pt-2">
                <LineChart
                  height={420}
                  gridLines={2}
                  yLabels={["0", "5", "10"]}
                  xLabels={[
                    "Apr 16",
                    "Apr 17",
                    "Apr 18",
                    "Apr 19",
                    "Apr 20",
                    "Apr 21",
                    "Apr 22",
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

            <div className="grid gap-5 pt-5 lg:grid-cols-2">
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
    <nav className="grid gap-0.5 px-3">
      {items.map((item) => (
        <button
          key={item.id}
          type="button"
          aria-current={item.id === active ? "page" : undefined}
          className={cn(
            "flex items-center gap-3 rounded-[var(--ob-radius-sm)] px-3 py-2 text-left text-[0.98rem]",
            item.id === active
              ? "bg-[color:var(--ob-surface-3)] font-medium"
              : "text-[color:var(--ob-fg-soft)] hover:bg-[color:var(--ob-surface-2)]",
          )}
        >
          <span aria-hidden className="w-4 shrink-0 text-center opacity-70">
            {item.glyph}
          </span>
          <span className="flex-1">{item.label}</span>
          {item.chevron && (
            <span aria-hidden className="text-[0.8rem] opacity-40">
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
        "border-l border-[color:var(--ob-border)] px-5 py-4 first:border-l-0",
        // Selection is a rule under the cell, keeping the strip continuous.
        selected && "border-b-2 border-b-[color:var(--ob-fg)]",
      )}
    >
      <p className="text-[0.98rem] font-medium text-[color:var(--ob-fg-soft)]">{label}</p>
      <p className="flex items-center gap-2.5 pt-1">
        <span className="text-[2rem] font-semibold tabular-nums leading-none">{value}</span>
        {badge}
      </p>
    </div>
  );
}

function Select({ children, glyph }: { children: ReactNode; glyph?: string }) {
  return (
    <span className="inline-flex items-center gap-10 rounded-[var(--ob-radius-sm)] border border-[color:var(--ob-border-strong)] px-3.5 py-2 text-[0.92rem]">
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
    <section className="rounded-[var(--ob-radius)] border border-[color:var(--ob-border)] p-4">
      <div className="flex items-center gap-5 border-b border-[color:var(--ob-border)] px-1 pb-3">
        {tabs.map((tab, index) => (
          <span
            key={tab}
            className={cn(
              "pb-2 text-[0.98rem]",
              index === 0
                ? "-mb-3 border-b-2 border-[color:var(--ob-fg)] font-medium"
                : "text-[color:var(--ob-muted)]",
            )}
          >
            {tab}
          </span>
        ))}
        <span className="ml-auto text-[0.78rem] font-semibold uppercase tracking-wide text-[color:var(--ob-muted)]">
          {metric}
        </span>
      </div>

      <ul className="pt-3">
        {rows.map((row) => (
          <li key={row.id} className="flex items-center gap-3 py-1">
            <span className="relative min-w-0 flex-1 overflow-hidden rounded-[var(--ob-radius-sm)]">
              <span
                aria-hidden
                className="absolute inset-y-0 left-0 bg-[color:var(--ob-surface-2)]"
                style={{ width: `${row.fill}%` }}
              />
              <span className="relative flex items-center gap-2 px-3 py-2 text-[0.95rem]">
                {icons && <LogoSlot size={18} label="" radius={4} />}
                {row.label}
              </span>
            </span>
            <span className="w-10 shrink-0 text-right text-[0.95rem] tabular-nums">
              {row.visitors}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
