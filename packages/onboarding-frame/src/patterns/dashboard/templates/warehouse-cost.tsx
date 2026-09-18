"use client";

import type { ReactNode } from "react";
import { cn } from "../../../lib/cn";
import { AvatarSlot, WordmarkSlot } from "../../../ui/placeholder";
import { Surface, warehouseTokens } from "./tokens";
import { Main, NavItem, Shell, Sidebar } from "./chrome";
import type { TemplateProps } from "./props";

export type WarehousePage = "account" | "organization" | "consumption";

export interface WarehouseCostProps extends TemplateProps {
  page?: WarehousePage;
}

const NAV = [
  { id: "home", label: "Home", glyph: "⌂" },
  { id: "search", label: "Search", glyph: "⌕" },
  { id: "projects", label: "Projects", glyph: "❯_" },
  { id: "data", label: "Data", glyph: "⛁" },
  { id: "products", label: "Data Products", glyph: "☁" },
  { id: "ai", label: "AI & ML", glyph: "✦" },
  { id: "monitoring", label: "Monitoring", glyph: "◍" },
];

const ADMIN = [
  { id: "cost", label: "Cost Management" },
  { id: "warehouses", label: "Warehouses" },
  { id: "pools", label: "Compute Pools" },
  { id: "users", label: "Users & Roles" },
  { id: "security", label: "Security" },
  { id: "contacts", label: "Contacts" },
  { id: "billing", label: "Billing & Terms" },
];

const FIGURES = [
  { id: "currency", value: "$98.65", label: "Spend in currency" },
  { id: "credits", value: "28.15", label: "Spend in credits" },
  { id: "price", value: "$3.70", label: "Compute price/credit", info: true },
  { id: "daily", value: "$12.33", label: "Average daily cost" },
  { id: "dailyc", value: "3.52", label: "Average daily credits" },
];

/** One warehouse dominates; the rest round to nothing. Bars keep that shape. */
const WAREHOUSES = [
  { id: "compute", name: "COMPUTE_WH", value: 24.6 },
  { id: "streamlit", name: "SYSTEM$STREAMLIT_NOTEBO…", value: 3.49 },
  { id: "learning", name: "SNOWFLAKE_LEARNING_WH", value: 0.41 },
  { id: "cloud", name: "CLOUD_SERVICES_ONLY", value: 0 },
];

const INSIGHTS = [
  "Large tables that are never queried",
  "Tables where data written but not read",
  "Rarely used materialized views",
  "Short-lived permanent tables",
  "Rarely used search optimization paths",
  "Rarely used tables with automatic clustering",
  "Inefficient usage of multi-cluster warehouse autoscale",
];

const QUERIES = [
  {
    id: "q1",
    query: 'EXECUTE NOTEBOOK "CU…',
    hash: "dde2b9ee61ad397…",
    total: "1h 35m 4s",
    count: "270",
    average: "21s",
    warehouse: "SYSTEM$STREA…",
    user: "2 users",
    role: "ACCOUNTADMIN",
  },
  {
    id: "q2",
    query: "BEGIN BEGIN select S…",
    hash: "d4fa46053b32c68…",
    total: "3.2s",
    count: "1",
    average: "3.2s",
    warehouse: "COMPUTE_SERV…",
    user: "SYSTEM",
    role: "SNOWFLAKE",
  },
  {
    id: "q3",
    query: 'execute streamlit "A…',
    hash: "d6cb98a2880210c1…",
    total: "33s",
    count: "2",
    average: "16s",
    warehouse: "COMPUTE_WH (…",
    user: "ALEXSMITH",
    role: "ACCOUNTADMIN",
  },
  {
    id: "q4",
    query: "with PYTHON_WORKSHEE…",
    hash: "44758d3070aaa97…",
    total: "9.1s",
    count: "2",
    average: "4.6s",
    warehouse: "COMPUTE_WH (…",
    user: "ALEXSMITH",
    role: "ACCOUNTADMIN",
  },
];

/**
 * Warehouse cost management.
 *
 * The insights card is the interesting one: every row is a green check, and
 * the sentence above says the checks found *nothing*. Green normally means
 * "good result", so the copy has to carry the meaning — and reproducing that
 * pairing matters more than tidying it into an empty state.
 */
export function WarehouseCostTemplate({
  className,
  page = "account",
}: WarehouseCostProps) {
  const max = Math.max(...WAREHOUSES.map((w) => w.value));

  return (
    <Surface tokens={warehouseTokens} className={className}>
      <Shell>
        <Sidebar width={320} bg="var(--ob-surface)">
          <div className="px-5 pb-4 pt-5">
            <WordmarkSlot width={150} height={26} label="" />
          </div>

          <nav className="grid gap-0.5 px-3">
            <NavItem label="Create" glyph="+" className="text-[1.02rem]" />
          </nav>
          <div className="mx-5 my-3 border-t border-[color:var(--ob-border)]" />

          <nav className="grid gap-0.5 px-3">
            {NAV.map((item) => (
              <NavItem
                key={item.id}
                label={item.label}
                glyph={item.glyph}
                className="text-[1.02rem]"
              />
            ))}
            <NavItem label="Admin" glyph="◉" className="text-[1.02rem]" />
          </nav>

          <nav className="grid gap-0.5 px-3">
            {ADMIN.map((item) => (
              <NavItem
                key={item.id}
                label={item.label}
                indent
                active={item.id === "cost" && page === "account"}
                className={cn(
                  "text-[1.02rem]",
                  item.id === "cost" &&
                    page === "account" &&
                    "bg-[color-mix(in_oklab,#1a73e8_10%,transparent)] text-[color:var(--ob-brand)]",
                )}
              />
            ))}
          </nav>

          <div className="mt-auto p-4">
            <div className="rounded-[var(--ob-radius)] border border-[color:var(--ob-border)] bg-[color:var(--ob-surface-2)] p-4">
              <p className="flex items-center gap-2">
                <span className="flex-1 text-[1.02rem]">
                  <span className="font-bold">$301</span> credits left
                </span>
                <InfoDot />
                <span aria-hidden className="text-[color:var(--ob-muted)]">
                  ···
                </span>
              </p>
              <span className="mt-3 block h-1.5 overflow-hidden rounded-full bg-[color:var(--ob-surface-3)]">
                <span
                  className="block h-full rounded-full bg-[color:var(--ob-brand)]"
                  style={{ width: "65%" }}
                />
              </span>
              <p className="pt-2.5 text-[0.95rem] text-[color:var(--ob-fg-soft)]">
                Trial ends in 23 days
              </p>
              <span className="mt-3 block rounded-[var(--ob-radius-sm)] bg-[color:var(--ob-brand)] py-2.5 text-center text-[1rem] font-semibold text-white">
                Upgrade
              </span>
            </div>

            <div className="flex items-center gap-3 pt-4">
              <AvatarSlot size={34} />
              <span className="flex-1 leading-tight">
                <span className="block text-[1rem] font-semibold">Alex Smith</span>
                <span className="block text-[0.9rem] text-[color:var(--ob-muted)]">
                  ACCOUNTADMIN
                </span>
              </span>
              <span aria-hidden className="text-[0.7rem] opacity-50">
                ⌃
              </span>
            </div>
          </div>
        </Sidebar>

        <Main className="overflow-auto px-9 py-7">
          <div className="flex items-center gap-4">
            <h1 className="flex-1 text-[1.85rem] font-semibold">Cost Management</h1>
            <span className="flex items-center gap-2.5 rounded-[var(--ob-radius)] border border-[color:var(--ob-border-strong)] px-4 py-2 text-[1rem] font-medium">
              <span aria-hidden className="text-[color:var(--ob-success)]">
                ●
              </span>
              COMPUTE_WH
            </span>
          </div>

          <nav className="flex gap-7 border-b border-[color:var(--ob-border)] pt-5">
            {[
              { id: "organization", label: "Organization Overview" },
              { id: "account", label: "Account Overview" },
              { id: "consumption", label: "Consumption" },
              { id: "budgets", label: "Budgets" },
              { id: "monitors", label: "Resource Monitors" },
            ].map((tab) => (
              <span
                key={tab.id}
                className={cn(
                  "-mb-px pb-3 text-[1.02rem]",
                  tab.id === page
                    ? "border-b-2 border-[color:var(--ob-brand)] font-semibold text-[color:var(--ob-brand)]"
                    : "text-[color:var(--ob-fg-soft)]",
                )}
              >
                {tab.label}
              </span>
            ))}
          </nav>

          <p className="flex flex-wrap items-center gap-2 pt-7 text-[1.45rem]">
            Account spend for
            <span className="flex items-center gap-1 font-bold">
              AR48742
              <InfoDot />
            </span>
            from
            <span className="flex items-center gap-2 pl-2 font-bold">
              Apr 9 - Apr 16
              <span aria-hidden className="text-[0.75rem] font-normal opacity-60">
                ⌄
              </span>
            </span>
          </p>

          <div className="grid gap-6 border-b border-[color:var(--ob-border)] pb-7 pt-6 sm:grid-cols-3 xl:grid-cols-5">
            {FIGURES.map((figure) => (
              <div key={figure.id}>
                <p className="text-[2rem] font-bold leading-none tabular-nums">
                  {figure.value}
                </p>
                <p className="flex items-center gap-1.5 pt-2 text-[1.02rem] text-[color:var(--ob-fg-soft)]">
                  {figure.label}
                  {figure.info && <InfoDot />}
                </p>
              </div>
            ))}
          </div>

          <div className="grid gap-5 pt-6 lg:grid-cols-2">
            <section className="rounded-[var(--ob-radius-lg)] border border-[color:var(--ob-border)] p-6">
              <div className="flex items-center gap-3 pb-5">
                <h2 className="flex-1 text-[1.2rem] font-semibold">
                  Top warehouses by cost
                </h2>
                <span className="flex items-center gap-1.5 text-[1rem] font-medium">
                  View All <span aria-hidden>›</span>
                </span>
              </div>

              <ul className="grid gap-3.5">
                {WAREHOUSES.map((warehouse) => (
                  <li key={warehouse.id} className="flex items-center gap-4">
                    <span aria-hidden className="text-[color:var(--ob-muted)]">
                      ⛃
                    </span>
                    <span className="w-[220px] shrink-0 truncate text-[1rem]">
                      {warehouse.name}
                    </span>
                    <span className="h-2 flex-1 rounded-full bg-[color:var(--ob-surface-3)]">
                      {/* A true zero draws nothing, not a minimum-width stub. */}
                      {warehouse.value > 0 && (
                        <span
                          className="block h-full rounded-full bg-[color:var(--ob-brand)]"
                          style={{ width: `${(warehouse.value / max) * 100}%` }}
                        />
                      )}
                    </span>
                    <span className="w-16 shrink-0 text-right text-[1rem] tabular-nums">
                      {warehouse.value.toFixed(2)}
                    </span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="rounded-[var(--ob-radius-lg)] border border-[color:var(--ob-border)] p-6">
              <h2 className="flex items-center gap-2 border-b border-[color:var(--ob-border)] pb-4 text-[1.2rem] font-semibold">
                Cost insights <InfoDot />
              </h2>
              <p className="pt-4 text-[1.02rem] text-[color:var(--ob-fg-soft)]">
                We checked for the following insight types but did not find savings
                opportunities:
              </p>
              <ul className="grid gap-3.5 pt-4">
                {INSIGHTS.map((insight) => (
                  <li key={insight} className="flex items-center gap-3">
                    <span
                      aria-hidden
                      className="grid size-5 shrink-0 place-items-center rounded-full bg-[color:var(--ob-success)] text-[0.65rem] text-white"
                    >
                      ✓
                    </span>
                    <span className="text-[1.05rem] font-semibold">{insight}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          <section className="mt-5 rounded-[var(--ob-radius-lg)] border border-[color:var(--ob-border)] p-6">
            <div className="flex items-center gap-3 pb-4">
              <h2 className="flex-1 text-[1.2rem] font-semibold">
                Most expensive queries
              </h2>
              <span className="flex items-center gap-1.5 text-[1rem] font-medium">
                View All <span aria-hidden>›</span>
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[1000px] border-collapse text-[0.98rem]">
                <thead>
                  <tr className="text-[0.85rem] font-semibold uppercase tracking-wide text-[color:var(--ob-muted)]">
                    {[
                      "Query",
                      "Parameterized qu…",
                      "Total execut…",
                      "# of qu…",
                      "Average exec…",
                      "Warehouse n…",
                      "User",
                      "Role",
                    ].map((head) => (
                      <th
                        key={head}
                        className="border-b border-[color:var(--ob-border)] px-3 py-3 text-left font-semibold"
                      >
                        {head}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {QUERIES.map((row) => (
                    <tr key={row.id} className="border-b border-[color:var(--ob-border)]">
                      <td className="px-3 py-4 font-mono text-[0.92rem]">{row.query}</td>
                      <td className="px-3 py-4 font-mono text-[0.92rem]">{row.hash}</td>
                      <td className="px-3 py-4 tabular-nums">{row.total}</td>
                      <td className="px-3 py-4 tabular-nums">{row.count}</td>
                      <td className="px-3 py-4 tabular-nums">{row.average}</td>
                      <td className="px-3 py-4">{row.warehouse}</td>
                      <td className="px-3 py-4">{row.user}</td>
                      <td className="px-3 py-4">{row.role}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </Main>
      </Shell>
    </Surface>
  );
}

function InfoDot(): ReactNode {
  return (
    <span
      aria-hidden
      className="grid size-[15px] shrink-0 place-items-center rounded-full border border-[color:var(--ob-border-strong)] text-[0.6rem] font-normal normal-case text-[color:var(--ob-muted)]"
    >
      i
    </span>
  );
}
