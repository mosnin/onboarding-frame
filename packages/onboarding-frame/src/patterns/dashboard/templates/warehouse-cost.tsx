"use client";

import type { ReactNode } from "react";
import {
  BrowsersIcon,
  CaretDownIcon,
  CaretRightIcon,
  CaretUpIcon,
  CheckIcon,
  HardDrivesIcon,
  HouseIcon,
  SearchIcon,
  SparkleIcon,
  TerminalIcon,
  CloudIcon,
  PulseIcon,
} from "../../../ui/icons-solid";
import { Avatar } from "../../../ui/avatar";
import { Wordmark } from "../../../ui/wordmark";
import { cn } from "../../../lib/cn";
import { Surface, warehouseTokens } from "./tokens";
import { Main, NavItem, Shell, Sidebar } from "./chrome";
import type { TemplateProps } from "./props";

export type WarehousePage = "account" | "organization" | "consumption";

export interface WarehouseCostProps extends TemplateProps {
  page?: WarehousePage;
}

const NAV = [
  { id: "home", label: "Home", Icon: HouseIcon },
  { id: "search", label: "Search", Icon: SearchIcon },
  { id: "projects", label: "Projects", Icon: TerminalIcon },
  { id: "data", label: "Data", Icon: HardDrivesIcon },
  { id: "products", label: "Data Products", Icon: CloudIcon },
  { id: "ai", label: "AI & ML", Icon: SparkleIcon },
  { id: "monitoring", label: "Monitoring", Icon: PulseIcon },
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
  brandName = "Acme",
  className,
  page = "account",
}: WarehouseCostProps) {
  const max = Math.max(...WAREHOUSES.map((w) => w.value));

  return (
    <Surface tokens={warehouseTokens} className={className}>
      <Shell>
        <Sidebar width={242} bg="var(--ob-surface)">
          <div className="px-[15px] pb-[12px] pt-[15px]">
            <Wordmark name={brandName} size={15} mark={20} radius={5} />
          </div>

          <nav className="grid gap-[2px] px-[9px]">
            <NavItem label="Create" glyph="+" className="text-[0.771rem]" />
          </nav>
          <div className="mx-[15px] my-[9px] border-t border-[color:var(--ob-border)]" />

          <nav className="grid gap-[2px] px-[9px]">
            {NAV.map((item) => (
              <NavItem
                key={item.id}
                label={item.label}
                glyph={<item.Icon size={14} />}
                className="text-[0.771rem]"
              />
            ))}
            <NavItem label="Admin" glyph={<BrowsersIcon size={14} />} className="text-[0.771rem]" />
          </nav>

          <nav className="grid gap-[2px] px-[9px]">
            {ADMIN.map((item) => (
              <NavItem
                key={item.id}
                label={item.label}
                indent
                active={item.id === "cost" && page === "account"}
                className={cn(
                  "text-[0.771rem]",
                  item.id === "cost" &&
                    page === "account" &&
                    "bg-[color-mix(in_oklab,#1a73e8_10%,transparent)] text-[color:var(--ob-brand)]",
                )}
              />
            ))}
          </nav>

          <div className="mt-auto p-[12px]">
            <div className="rounded-[var(--ob-radius)] border border-[color:var(--ob-border)] bg-[color:var(--ob-surface-2)] p-[12px]">
              <p className="flex items-center gap-[6px]">
                <span className="flex-1 text-[0.771rem]">
                  <span className="font-bold">$301</span> credits left
                </span>
                <InfoDot />
                <span aria-hidden className="text-[color:var(--ob-muted)]">
                  ···
                </span>
              </p>
              <span className="mt-[9px] block h-[5px] overflow-hidden rounded-full bg-[color:var(--ob-surface-3)]">
                <span
                  className="block h-full rounded-full bg-[color:var(--ob-brand)]"
                  style={{ width: "65%" }}
                />
              </span>
              <p className="pt-[8px] text-[0.718rem] text-[color:var(--ob-fg-soft)]">
                Trial ends in 23 days
              </p>
              <span className="mt-[9px] block rounded-[var(--ob-radius-sm)] bg-[color:var(--ob-brand)] py-[8px] text-center text-[0.756rem] font-semibold text-white">
                Upgrade
              </span>
            </div>

            <div className="flex items-center gap-[9px] pt-[12px]">
              <Avatar name="Alex Smith" size={26} />
              <span className="flex-1 leading-tight">
                <span className="block text-[0.756rem] font-semibold">Alex Smith</span>
                <span className="block text-[0.68rem] text-[color:var(--ob-muted)]">
                  ACCOUNTADMIN
                </span>
              </span>
              <CaretUpIcon size={14} />
            </div>
          </div>
        </Sidebar>

        <Main className="overflow-auto px-[27px] py-[21px]">
          <div className="flex items-center gap-[12px]">
            <h1 className="flex-1 text-[1.399rem] font-semibold">Cost Management</h1>
            <span className="flex items-center gap-[8px] rounded-[var(--ob-radius)] border border-[color:var(--ob-border-strong)] px-[12px] py-[6px] text-[0.756rem] font-medium">
              <span aria-hidden className="text-[color:var(--ob-success)]">
                ●
              </span>
              COMPUTE_WH
            </span>
          </div>

          <nav className="flex gap-[21px] border-b border-[color:var(--ob-border)] pt-[15px]">
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
                  "-mb-px pb-[9px] text-[0.771rem]",
                  tab.id === page
                    ? "border-b-2 border-[color:var(--ob-brand)] font-semibold text-[color:var(--ob-brand)]"
                    : "text-[color:var(--ob-fg-soft)]",
                )}
              >
                {tab.label}
              </span>
            ))}
          </nav>

          <p className="flex flex-wrap items-center gap-[6px] pt-[21px] text-[1.096rem]">
            Account spend for
            <span className="flex items-center gap-[3px] font-bold">
              AR48742
              <InfoDot />
            </span>
            from
            <span className="flex items-center gap-[6px] pl-[6px] font-bold">
              Apr 9 - Apr 16
              <CaretDownIcon size={14} />
            </span>
          </p>

          <div className="grid gap-[18px] border-b border-[color:var(--ob-border)] pb-[21px] pt-[18px] sm:grid-cols-3 xl:grid-cols-5">
            {FIGURES.map((figure) => (
              <div key={figure.id}>
                <p className="text-[1.512rem] font-bold leading-none tabular-nums">
                  {figure.value}
                </p>
                <p className="flex items-center gap-[5px] pt-[6px] text-[0.771rem] text-[color:var(--ob-fg-soft)]">
                  {figure.label}
                  {figure.info && <InfoDot />}
                </p>
              </div>
            ))}
          </div>

          <div className="grid gap-[15px] pt-[18px] lg:grid-cols-2">
            <section className="rounded-[var(--ob-radius-lg)] border border-[color:var(--ob-border)] p-[18px]">
              <div className="flex items-center gap-[9px] pb-[15px]">
                <h2 className="flex-1 text-[0.907rem] font-semibold">
                  Top warehouses by cost
                </h2>
                <span className="flex items-center gap-[5px] text-[0.756rem] font-medium">
                  View All <CaretRightIcon size={14} />
                </span>
              </div>

              <ul className="grid gap-[11px]">
                {WAREHOUSES.map((warehouse) => (
                  <li key={warehouse.id} className="flex items-center gap-[12px]">
                    <span aria-hidden className="text-[color:var(--ob-muted)]">
                      ⛃
                    </span>
                    <span className="w-[166px] shrink-0 truncate text-[0.756rem]">
                      {warehouse.name}
                    </span>
                    <span className="h-[6px] flex-1 rounded-full bg-[color:var(--ob-surface-3)]">
                      {/* A true zero draws nothing, not a minimum-width stub. */}
                      {warehouse.value > 0 && (
                        <span
                          className="block h-full rounded-full bg-[color:var(--ob-brand)]"
                          style={{ width: `${(warehouse.value / max) * 100}%` }}
                        />
                      )}
                    </span>
                    <span className="w-[48px] shrink-0 text-right text-[0.756rem] tabular-nums">
                      {warehouse.value.toFixed(2)}
                    </span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="rounded-[var(--ob-radius-lg)] border border-[color:var(--ob-border)] p-[18px]">
              <h2 className="flex items-center gap-[6px] border-b border-[color:var(--ob-border)] pb-[12px] text-[0.907rem] font-semibold">
                Cost insights <InfoDot />
              </h2>
              <p className="pt-[12px] text-[0.771rem] text-[color:var(--ob-fg-soft)]">
                We checked for the following insight types but did not find savings
                opportunities:
              </p>
              <ul className="grid gap-[11px] pt-[12px]">
                {INSIGHTS.map((insight) => (
                  <li key={insight} className="flex items-center gap-[9px]">
                    <CheckIcon size={14} />
                    <span className="text-[0.794rem] font-semibold">{insight}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          <section className="mt-[15px] rounded-[var(--ob-radius-lg)] border border-[color:var(--ob-border)] p-[18px]">
            <div className="flex items-center gap-[9px] pb-[12px]">
              <h2 className="flex-1 text-[0.907rem] font-semibold">
                Most expensive queries
              </h2>
              <span className="flex items-center gap-[5px] text-[0.756rem] font-medium">
                View All <CaretRightIcon size={14} />
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[756px] border-collapse text-[0.741rem]">
                <thead>
                  <tr className="text-[0.643rem] font-semibold uppercase tracking-wide text-[color:var(--ob-muted)]">
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
                        className="border-b border-[color:var(--ob-border)] px-[9px] py-[9px] text-left font-semibold"
                      >
                        {head}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {QUERIES.map((row) => (
                    <tr key={row.id} className="border-b border-[color:var(--ob-border)]">
                      <td className="px-[9px] py-[12px] font-mono text-[0.696rem]">{row.query}</td>
                      <td className="px-[9px] py-[12px] font-mono text-[0.696rem]">{row.hash}</td>
                      <td className="px-[9px] py-[12px] tabular-nums">{row.total}</td>
                      <td className="px-[9px] py-[12px] tabular-nums">{row.count}</td>
                      <td className="px-[9px] py-[12px] tabular-nums">{row.average}</td>
                      <td className="px-[9px] py-[12px]">{row.warehouse}</td>
                      <td className="px-[9px] py-[12px]">{row.user}</td>
                      <td className="px-[9px] py-[12px]">{row.role}</td>
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
      className="grid size-[11px] shrink-0 place-items-center rounded-full border border-[color:var(--ob-border-strong)] text-[0.454rem] font-normal normal-case text-[color:var(--ob-muted)]"
    >
      i
    </span>
  );
}
