"use client";

import type { ReactNode } from "react";
import {
  ArrowClockwiseIcon,
  ChartBarIcon,
  CircleNotchIcon,
  BellIcon,
  CalendarIcon,
  CaretDownIcon,
  CaretRightIcon,
  ChatDotsIcon,
  ClockIcon,
  DatabaseIcon,
  ExternalSquareIcon,
  FileTextIcon,
  FolderIcon,
  GearIcon,
  HouseIcon,
  LightningIcon,
  ListBulletsIcon,
  LockKeyIcon,
  PlusIcon,
  QuestionIcon,
  SearchIcon,
  TableGridIcon,
  TerminalWindowIcon,
  UserIcon,
} from "../../../ui/icons-solid";
import { cn } from "../../../lib/cn";
import { Surface, platformTokens } from "./tokens";
import { Main, Shell, Sidebar } from "./chrome";
import type { TemplateProps } from "./props";

export type ReportsPage = "api" | "database" | "query";

export interface PlatformReportsProps extends TemplateProps {
  page?: ReportsPage;
}

/*
 * Measured off the reference rail: 58px wide, icons on a 51px pitch with an
 * extra 8px where a group ends — after Home, after the SQL editor and after
 * Edge Functions. The active item sits in a 42px tile. Each shape was read
 * off a 5x crop: a table grid, a terminal window, stacked database discs, a
 * padlock, a folder, an orbiting dot, bars, a bulleted list, a document and
 * a gear.
 */
const RAIL = [
  { id: "home", Icon: HouseIcon, end: true },
  { id: "table", Icon: TableGridIcon },
  { id: "sql", Icon: TerminalWindowIcon, end: true },
  { id: "database", Icon: DatabaseIcon },
  { id: "auth", Icon: LockKeyIcon },
  { id: "storage", Icon: FolderIcon },
  { id: "functions", Icon: CircleNotchIcon, end: true },
  { id: "reports", Icon: ChartBarIcon, active: true },
  { id: "logs", Icon: ListBulletsIcon },
  { id: "docs", Icon: FileTextIcon },
  { id: "settings", Icon: GearIcon },
];

/** Search and account sit apart at the foot of the rail. */
const RAIL_FOOT = [
  { id: "search", Icon: SearchIcon },
  { id: "account", Icon: UserIcon },
];

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
        <Sidebar width={58} bg="#171717" className="items-center">
          <div className="pb-[18px] pt-[20px]">
            <span className="grid size-[21px] place-items-center rounded-[5px] bg-[#8b5cf6] text-[#fff]">
              <LightningIcon size={14} weight="fill" />
            </span>
          </div>
          <nav className="grid justify-items-center">
            {RAIL.map((item) => (
              <span
                key={item.id}
                className={cn(
                  "grid size-[42px] place-items-center rounded-[6px]",
                  item.end ? "mb-[17px]" : "mb-[9px]",
                  item.active
                    ? "bg-[color:var(--ob-surface-3)] text-[color:var(--ob-fg)]"
                    : "text-[color:var(--ob-muted)]",
                )}
              >
                <item.Icon size={19} />
              </span>
            ))}
          </nav>

          <nav className="mt-auto grid justify-items-center gap-[9px] pb-[16px]">
            {RAIL_FOOT.map((item) => (
              <span
                key={item.id}
                className="grid size-[42px] place-items-center text-[color:var(--ob-muted)]"
              >
                <item.Icon size={19} />
              </span>
            ))}
            {/* The project's own branch mark, in the branch colour. */}
            <span className="grid size-[30px] place-items-center rounded-[7px] bg-[color:var(--ob-surface-2)] text-[#3ecf8e]">
              <LightningIcon size={17} weight="fill" />
            </span>
          </nav>
        </Sidebar>

        <Sidebar width={269} bg="var(--ob-bg)">
          <h2 className="border-b border-[color:var(--ob-border)] px-[21px] py-[18px] text-[1.14rem] font-semibold">
            Reports
          </h2>
          <p className="border-b border-[color:var(--ob-border)] px-[21px] py-[14px] text-[0.86rem] text-[color:var(--ob-fg-soft)]">
            Custom reports
          </p>
          <nav className="grid gap-[4px] p-[11px]">
            {REPORTS.map((report) => (
              <button
                key={report.id}
                type="button"
                aria-current={report.id === page ? "page" : undefined}
                className={cn(
                  "flex items-center gap-[9px] rounded-[var(--ob-radius-sm)] px-[11px] py-[7px] text-left text-[0.86rem]",
                  report.id === page
                    ? "bg-[color:var(--ob-surface-2)] font-medium"
                    : "text-[color:var(--ob-fg-soft)]",
                )}
              >
                {report.label}
                {report.badge && (
                  <span className="text-[0.684rem] font-semibold uppercase text-[color:var(--ob-danger)]">
                    {report.badge}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </Sidebar>

        <Main className="overflow-auto">
          <header className="flex h-[49px] shrink-0 items-center gap-[9px] border-b border-[color:var(--ob-border)] px-[21px]">
            <span className="text-[0.833rem] text-[color:var(--ob-muted)]">
              acme-team&rsquo;s Org
            </span>
            <span aria-hidden className="text-[color:var(--ob-muted)]">
              /
            </span>
            <span className="text-[0.833rem] font-medium">New Website</span>
            <span className="ml-auto flex items-center gap-[9px]">
              <OutlineBtn glyph={<QuestionIcon size={12} />}>Help</OutlineBtn>
              <OutlineBtn glyph={<ChatDotsIcon size={12} />}>Feedback</OutlineBtn>
              <BellIcon size={12} />
            </span>
          </header>

          <div className="px-[28px] py-[25px]">
            <div className="flex items-center gap-[11px]">
              <h1 className="flex-1 text-[1.754rem] font-semibold">API</h1>
              <OutlineBtn glyph={<ArrowClockwiseIcon size={12} />}>Refresh</OutlineBtn>
            </div>

            <div className="flex flex-wrap items-center gap-[11px] pt-[18px]">
              <span className="inline-flex overflow-hidden rounded-[var(--ob-radius-sm)] border border-[color:var(--ob-border-strong)]">
                <span className="flex items-center gap-[7px] bg-[color:var(--ob-surface-2)] px-[12px] py-[7px] text-[0.807rem] font-medium">
                  <ClockIcon size={12} /> Last 24 hours
                </span>
                <span className="flex items-center gap-[7px] border-l border-[color:var(--ob-border-strong)] px-[12px] py-[7px] text-[0.807rem] text-[color:var(--ob-fg-soft)]">
                  <CalendarIcon size={12} /> Custom
                </span>
              </span>
              <span className="inline-flex items-center gap-[35px] rounded-[var(--ob-radius-sm)] border border-[color:var(--ob-border-strong)] px-[12px] py-[7px] text-[0.807rem]">
                All Requests
                <CaretDownIcon size={12} />
              </span>
              <span className="inline-flex items-center gap-[5px] rounded-[var(--ob-radius-sm)] border border-dashed border-[color:var(--ob-border-strong)] px-[12px] py-[7px] text-[0.807rem] text-[color:var(--ob-fg-soft)]">
                <PlusIcon size={11} /> Add filter
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
    <section className="mt-[21px] rounded-[var(--ob-radius)] border border-[color:var(--ob-border)] bg-[color:var(--ob-surface)] p-[21px]">
      <div className="flex items-start gap-[11px]">
        <h2 className="flex flex-1 items-center gap-[7px] text-[1.184rem] font-semibold">
          {title}
          {hint && (
            <span
              aria-hidden
              className="grid size-[14px] place-items-center rounded-full border border-[color:var(--ob-border-strong)] text-[0.544rem] text-[color:var(--ob-muted)]"
            >
              ?
            </span>
          )}
        </h2>
        <span className="grid size-[25px] place-items-center rounded-[var(--ob-radius-sm)] border border-[color:var(--ob-border-strong)] text-[color:var(--ob-fg-soft)]">
          <ExternalSquareIcon size={11} />
        </span>
      </div>

      <p className="pt-[11px] text-[1.404rem] font-medium tabular-nums">{total}</p>

      <div className="flex h-[96px] items-end gap-[3px] pt-[14px]">
        {bars.map((value, index) => (
          <span
            key={index}
            className="flex-1 rounded-t-[1px] bg-[color:var(--ob-brand)]"
            style={{ height: `${value}%`, opacity: value === 0 ? 0 : 0.85 }}
          />
        ))}
      </div>

      <div className="flex items-center justify-between border-b border-[color:var(--ob-border)] pb-[14px] pt-[11px] text-[0.789rem] text-[color:var(--ob-muted)]">
        <span>Aug 9, 2023, 04:00pm</span>
        <span>Aug 11, 2023, 10:00am</span>
      </div>

      <div className="pt-[14px]">
        <div className="flex items-center gap-[11px] rounded-t-[var(--ob-radius-sm)] bg-[color:var(--ob-surface-2)] px-[14px] py-[9px] text-[0.807rem] text-[color:var(--ob-fg-soft)]">
          <span className="flex-1">Request</span>
          <span>Count</span>
        </div>
        {rows.map((row) => (
          <div
            key={row.id}
            className="flex items-center gap-[11px] border-b border-[color:var(--ob-border)] px-[14px] py-[11px] last:border-b-0"
          >
            <CaretRightIcon size={12} />
            <span className="rounded-[3px] bg-[color:var(--ob-surface-3)] px-[7px] py-[2px] font-mono text-[0.702rem] text-[color:var(--ob-fg-soft)]">
              {row.method}
            </span>
            <span
              className={cn(
                "rounded-[3px] px-[7px] py-[2px] font-mono text-[0.702rem]",
                statusTone === "ok"
                  ? "bg-[color-mix(in_oklab,#3ecf8e_20%,transparent)] text-[#5fdca5]"
                  : "bg-[color-mix(in_oklab,#f0883e_22%,transparent)] text-[#f5a86b]",
              )}
            >
              {row.status}
            </span>
            <span className="min-w-[0px] flex-1 truncate font-mono text-[0.789rem]">
              {row.path}
            </span>
            <span className="shrink-0 tabular-nums">{row.count}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function OutlineBtn({ children, glyph }: { children: ReactNode; glyph?: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-[7px] rounded-[var(--ob-radius-sm)] border border-[color:var(--ob-border-strong)] px-[12px] py-[7px] text-[0.807rem] font-medium">
      {glyph && (
        <span aria-hidden className="text-[color:var(--ob-muted)]">
          {glyph}
        </span>
      )}
      {children}
    </span>
  );
}
