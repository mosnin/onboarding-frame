"use client";

import type { ReactNode } from "react";
import { cn } from "../../../lib/cn";
import { LogoSlot } from "../../../ui/placeholder";
import { Surface, platformTokens } from "./tokens";
import { Main, Shell, Sidebar } from "./chrome";
import type { TemplateProps } from "./props";

export type ReportsPage = "api" | "database" | "query";

export interface PlatformReportsProps extends TemplateProps {
  page?: ReportsPage;
}

const RAIL = ["⌂", "▦", "❯_", "⛁", "🔒", "🗂", "◍", "▥", "≣", "🗎", "⚙"];

const REPORTS = [
  { id: "api", label: "API", badge: "NEW" },
  { id: "database", label: "Database" },
  { id: "query", label: "Query Performance", badge: "NEW" },
];

const REQUESTS = [
  { id: "r1", method: "GET", status: "200", path: "/rest/v1/", count: 104 },
  { id: "r2", method: "GET", status: "200", path: "/auth/v1/health", count: 68 },
  { id: "r3", method: "POST", status: "200", path: "/storage/v1/object/list/Storage", count: 25 },
];

const ERRORS = [
  {
    id: "e1",
    method: "POST",
    status: "400",
    path: "/storage/v1/object/Storage/Cool%20folder/gradienta-LeG68PrXA6Y-unspla…",
    count: 1,
  },
  { id: "e2", method: "POST", status: "400", path: "/storage/v1/bucket", count: 1 },
  {
    id: "e3",
    method: "POST",
    status: "400",
    path: "/storage/v1/object/Storage/Cool%20folder/outsn…",
    count: 1,
  },
];

/**
 * Traffic arrived in the last two hours of a two-day window, so almost the
 * whole plot is empty. The bars stay pinned to the right and the window's
 * start and end timestamps are printed beneath — which is how the reference
 * makes an almost-blank chart legible instead of looking broken.
 */
const TRAFFIC = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 62, 100];
const ERROR_TRAFFIC = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 28, 100];

/**
 * Platform reports.
 *
 * Two sidebars: a narrow icon rail for the project, then a report list. Paths
 * and HTTP methods are monospace while everything else is sans — on a page
 * that is mostly URLs, that type switch does more for scanning than any
 * colour would.
 */
export function PlatformReportsTemplate({
  className,
  page = "api",
}: PlatformReportsProps) {
  return (
    <Surface tokens={platformTokens} className={className}>
      <Shell>
        <Sidebar width={78} bg="#171717" className="items-center">
          <div className="pb-6 pt-4">
            <LogoSlot size={24} label="" radius={6} />
          </div>
          <nav className="grid gap-4">
            {RAIL.map((glyph, index) => (
              <span
                key={index}
                aria-hidden
                className={cn(
                  "grid size-9 place-items-center rounded-[var(--ob-radius-sm)] text-[0.95rem]",
                  index === 7
                    ? "bg-[color:var(--ob-surface-3)] text-[color:var(--ob-fg)]"
                    : "text-[color:var(--ob-muted)]",
                )}
              >
                {glyph}
              </span>
            ))}
          </nav>
        </Sidebar>

        <Sidebar width={355} bg="var(--ob-bg)">
          <h2 className="border-b border-[color:var(--ob-border)] px-6 py-5 text-[1.3rem] font-semibold">
            Reports
          </h2>
          <p className="border-b border-[color:var(--ob-border)] px-6 py-4 text-[0.98rem] text-[color:var(--ob-fg-soft)]">
            Custom reports
          </p>
          <nav className="grid gap-1 p-3">
            {REPORTS.map((report) => (
              <button
                key={report.id}
                type="button"
                aria-current={report.id === page ? "page" : undefined}
                className={cn(
                  "flex items-center gap-2.5 rounded-[var(--ob-radius-sm)] px-3 py-2 text-left text-[0.98rem]",
                  report.id === page
                    ? "bg-[color:var(--ob-surface-2)] font-medium"
                    : "text-[color:var(--ob-fg-soft)]",
                )}
              >
                {report.label}
                {report.badge && (
                  <span className="text-[0.78rem] font-semibold uppercase text-[color:var(--ob-danger)]">
                    {report.badge}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </Sidebar>

        <Main className="overflow-auto">
          <header className="flex h-14 shrink-0 items-center gap-2.5 border-b border-[color:var(--ob-border)] px-6">
            <span className="text-[0.95rem] text-[color:var(--ob-muted)]">
              acme-team&rsquo;s Org
            </span>
            <span aria-hidden className="text-[color:var(--ob-muted)]">
              /
            </span>
            <span className="text-[0.95rem] font-medium">New Website</span>
            <span className="ml-auto flex items-center gap-2.5">
              <OutlineBtn glyph="?">Help</OutlineBtn>
              <OutlineBtn glyph="💬">Feedback</OutlineBtn>
              <span
                aria-hidden
                className="grid size-9 place-items-center rounded-[var(--ob-radius-sm)] border border-[color:var(--ob-border-strong)] text-[color:var(--ob-fg-soft)]"
              >
                ⌾
              </span>
            </span>
          </header>

          <div className="px-8 py-7">
            <div className="flex items-center gap-3">
              <h1 className="flex-1 text-[2rem] font-semibold">API</h1>
              <OutlineBtn glyph="↻">Refresh</OutlineBtn>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-5">
              <span className="inline-flex overflow-hidden rounded-[var(--ob-radius-sm)] border border-[color:var(--ob-border-strong)]">
                <span className="flex items-center gap-2 bg-[color:var(--ob-surface-2)] px-3.5 py-2 text-[0.92rem] font-medium">
                  <span aria-hidden>🕐</span> Last 24 hours
                </span>
                <span className="flex items-center gap-2 border-l border-[color:var(--ob-border-strong)] px-3.5 py-2 text-[0.92rem] text-[color:var(--ob-fg-soft)]">
                  <span aria-hidden>🗓</span> Custom
                </span>
              </span>
              <span className="inline-flex items-center gap-10 rounded-[var(--ob-radius-sm)] border border-[color:var(--ob-border-strong)] px-3.5 py-2 text-[0.92rem]">
                All Requests
                <span aria-hidden className="text-[0.7rem] opacity-60">
                  ⌄
                </span>
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-[var(--ob-radius-sm)] border border-dashed border-[color:var(--ob-border-strong)] px-3.5 py-2 text-[0.92rem] text-[color:var(--ob-fg-soft)]">
                + Add filter
              </span>
            </div>

            <ReportCard
              title="Total Requests"
              total="328"
              bars={TRAFFIC}
              rows={REQUESTS}
              statusTone="ok"
            />
            <ReportCard
              title="Response Errors"
              hint
              total="7"
              bars={ERROR_TRAFFIC}
              rows={ERRORS}
              statusTone="warn"
            />
          </div>
        </Main>
      </Shell>
    </Surface>
  );
}

function ReportCard({
  title,
  total,
  bars,
  rows,
  statusTone,
  hint,
}: {
  title: string;
  total: string;
  bars: number[];
  rows: { id: string; method: string; status: string; path: string; count: number }[];
  statusTone: "ok" | "warn";
  hint?: boolean;
}) {
  return (
    <section className="mt-6 rounded-[var(--ob-radius)] border border-[color:var(--ob-border)] bg-[color:var(--ob-surface)] p-6">
      <div className="flex items-start gap-3">
        <h2 className="flex flex-1 items-center gap-2 text-[1.35rem] font-semibold">
          {title}
          {hint && (
            <span
              aria-hidden
              className="grid size-4 place-items-center rounded-full border border-[color:var(--ob-border-strong)] text-[0.62rem] text-[color:var(--ob-muted)]"
            >
              ?
            </span>
          )}
        </h2>
        <span
          aria-hidden
          className="grid size-7 place-items-center rounded-[var(--ob-radius-sm)] border border-[color:var(--ob-border-strong)] text-[0.8rem] text-[color:var(--ob-fg-soft)]"
        >
          ↗
        </span>
      </div>

      <p className="pt-3 text-[1.6rem] font-medium tabular-nums">{total}</p>

      <div className="flex h-[110px] items-end gap-[3px] pt-4">
        {bars.map((value, index) => (
          <span
            key={index}
            className="flex-1 rounded-t-[1px] bg-[color:var(--ob-brand)]"
            style={{ height: `${value}%`, opacity: value === 0 ? 0 : 0.85 }}
          />
        ))}
      </div>

      <div className="flex items-center justify-between border-b border-[color:var(--ob-border)] pb-4 pt-3 text-[0.9rem] text-[color:var(--ob-muted)]">
        <span>Aug 9, 2023, 04:00pm</span>
        <span>Aug 11, 2023, 10:00am</span>
      </div>

      <div className="pt-4">
        <div className="flex items-center gap-3 rounded-t-[var(--ob-radius-sm)] bg-[color:var(--ob-surface-2)] px-4 py-2.5 text-[0.92rem] text-[color:var(--ob-fg-soft)]">
          <span className="flex-1">Request</span>
          <span>Count</span>
        </div>
        {rows.map((row) => (
          <div
            key={row.id}
            className="flex items-center gap-3 border-b border-[color:var(--ob-border)] px-4 py-3 last:border-b-0"
          >
            <span aria-hidden className="text-[0.85rem] text-[color:var(--ob-muted)]">
              ›
            </span>
            <span className="rounded-[3px] bg-[color:var(--ob-surface-3)] px-2 py-0.5 font-mono text-[0.8rem] text-[color:var(--ob-fg-soft)]">
              {row.method}
            </span>
            <span
              className={cn(
                "rounded-[3px] px-2 py-0.5 font-mono text-[0.8rem]",
                statusTone === "ok"
                  ? "bg-[color-mix(in_oklab,#3ecf8e_20%,transparent)] text-[#5fdca5]"
                  : "bg-[color-mix(in_oklab,#f0883e_22%,transparent)] text-[#f5a86b]",
              )}
            >
              {row.status}
            </span>
            <span className="min-w-0 flex-1 truncate font-mono text-[0.9rem]">
              {row.path}
            </span>
            <span className="shrink-0 tabular-nums">{row.count}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function OutlineBtn({ children, glyph }: { children: ReactNode; glyph?: string }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-[var(--ob-radius-sm)] border border-[color:var(--ob-border-strong)] px-3.5 py-2 text-[0.92rem] font-medium">
      {glyph && (
        <span aria-hidden className="text-[color:var(--ob-muted)]">
          {glyph}
        </span>
      )}
      {children}
    </span>
  );
}
