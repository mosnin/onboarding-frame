"use client";

import type { ReactNode } from "react";
import { Donut } from "../../../ui/charts";
import {
  BellIcon,
  BrowsersIcon,
  CardIcon,
  CaretDownIcon,
  CubeIcon,
  FileTextIcon,
  GearIcon,
  GlobeIcon,
  GridFourIcon,
  HouseIcon,
  ListChecksIcon,
  ReceiptIcon,
  RocketIcon,
  SearchIcon,
  ShieldIcon,
  UsersIcon,
  UserPlusIcon,
} from "../../../ui/icons-solid";
import { Avatar } from "../../../ui/avatar";
import { Wordmark } from "../../../ui/wordmark";
import { cn } from "../../../lib/cn";
import { Placeholder } from "../../../ui/placeholder";
import { Surface, peopleTokens } from "./tokens";
import { Main, NavItem, NavSection, Shell, Sidebar } from "./chrome";
import type { TemplateProps } from "./props";

export type PeoplePage = "analytics" | "people" | "tracker";

export interface PeopleAnalyticsProps extends TemplateProps {
  page?: PeoplePage;
}

const GROUP = [
  { id: "home", label: "Home", Icon: HouseIcon },
  { id: "people", label: "People", Icon: UsersIcon },
  { id: "add", label: "Add people", Icon: UserPlusIcon },
  { id: "tracker", label: "Tracker", Icon: ListChecksIcon },
  { id: "analytics", label: "Analytics", Icon: BrowsersIcon },
  { id: "documents", label: "Documents", Icon: FileTextIcon },
  { id: "compliance", label: "Compliance", Icon: ShieldIcon, badge: "NEW" },
  { id: "payments", label: "Payments", Icon: CardIcon },
  { id: "settings", label: "Group Settings", Icon: GearIcon },
];

const ORGANIZATION = [
  { id: "store", label: "App Store", Icon: CubeIcon },
  { id: "services", label: "Services", Icon: GridFourIcon },
  { id: "expenses", label: "Expenses", Icon: ReceiptIcon },
  { id: "payroll", label: "Global Payroll", Icon: GlobeIcon, badge: "NEW" },
  { id: "orgsettings", label: "Organization Settings", Icon: GearIcon },
];

/**
 * Nobody has filled in their demographics, so every row reads "Not specified"
 * at 100%. Reproducing that faithfully matters more than inventing a
 * distribution: a DE&I dashboard that shows invented diversity is worse than
 * one that shows none.
 */
const HEADCOUNT = [
  { id: "age", label: "Age", lines: ["Not available · 66.67%", "<29 · 33.33%"] },
  { id: "gender", label: "Gender", lines: ["Not specified · 100%"] },
  { id: "ethnicity", label: "Ethnicity", lines: ["Not specified · 100%"] },
];

const MONTHS = ["May", "Jul", "Sep", "Nov", "Jan", "Apr"];

/**
 * People analytics.
 *
 * Two of the three panels have nothing to show, and each says so differently:
 * the compensation card carries an illustration and a sentence, the ethnicity
 * donut renders as one nearly-closed ring because all three people fall in a
 * single bucket. Neither is an error state — they are what this data looks
 * like at three employees.
 */
export function PeopleAnalyticsTemplate({
  brandName = "Acme",
  userName = "Alex Rivera",
  className,
  page = "analytics",
}: PeopleAnalyticsProps) {
  return (
    <Surface tokens={peopleTokens} className={className}>
      <Shell>
        <Sidebar width={365} bg="var(--ob-surface)">
          <div className="flex items-center gap-4 px-6 pb-5 pt-5">
            <Wordmark name={brandName} size={18} mark={24} radius={6} />
            <span className="ml-auto flex items-center gap-3 text-[color:var(--ob-fg-soft)]">
              <Avatar name={userName} size={28} />
              <BellIcon size={14} />
              <SearchIcon size={14} />
            </span>
          </div>

          <div className="mx-4 flex items-center gap-3 rounded-[var(--ob-radius)] border border-[color:var(--ob-border)] px-4 py-3">
            <UsersIcon size={14} />
            <span className="flex-1 leading-tight">
              <span className="block text-[0.95rem] text-[color:var(--ob-muted)]">
                JD Mob
              </span>
              <span className="block text-[1.12rem] font-semibold">Jane&rsquo;s Group</span>
            </span>
            <span aria-hidden className="text-[color:var(--ob-muted)]">
              ⋮
            </span>
          </div>

          <div className="mx-6 my-5 flex items-center gap-2">
            <span className="size-1.5 rounded-full bg-[color:var(--ob-border-strong)]" />
            <span className="h-px flex-1 bg-[color:var(--ob-border)]" />
            <span className="size-1.5 rounded-full bg-[color:var(--ob-border-strong)]" />
          </div>

          <NavSection label="Group" />
          <nav className="grid gap-0.5 px-3">
            {GROUP.map((item) => (
              <NavItem
                key={item.id}
                label={
                  item.badge ? (
                    <span className="flex items-center gap-2.5">
                      {item.label}
                      <span className="rounded bg-[color:var(--ob-brand)] px-1.5 py-0.5 text-[0.72rem] font-bold text-white">
                        {item.badge}
                      </span>
                    </span>
                  ) : (
                    item.label
                  )
                }
                glyph={<item.Icon size={14} />}
                active={item.id === page}
                className={cn(
                  "px-4 py-3 text-[1.12rem]",
                  item.id === page &&
                    "border border-[color:var(--ob-border)] bg-[color:var(--ob-surface)]",
                )}
              />
            ))}
          </nav>

          <NavSection label="Organization" />
          <nav className="grid gap-0.5 px-3">
            {ORGANIZATION.map((item) => (
              <NavItem
                key={item.id}
                label={
                  item.badge ? (
                    <span className="flex items-center gap-2.5">
                      {item.label}
                      <span className="rounded bg-[color:var(--ob-brand)] px-1.5 py-0.5 text-[0.72rem] font-bold text-white">
                        {item.badge}
                      </span>
                    </span>
                  ) : (
                    item.label
                  )
                }
                glyph={<item.Icon size={14} />}
                className="px-4 py-3 text-[1.12rem]"
              />
            ))}
          </nav>

          <div className="mx-6 my-5 h-px bg-[color:var(--ob-border)]" />
          <nav className="grid gap-0.5 px-3 pb-6">
            <NavItem
              label={
                <span className="flex items-center gap-2.5">
                  Get started with HR
                  <span className="rounded bg-[color:var(--ob-brand)] px-1.5 py-0.5 text-[0.72rem] font-bold text-white">
                    NEW
                  </span>
                </span>
              }
              glyph={<RocketIcon size={14} />}
              className="px-4 py-3 text-[1.12rem]"
            />
          </nav>
        </Sidebar>

        <Main className="overflow-auto p-7">
          <section className="rounded-[var(--ob-radius-lg)] bg-[color:var(--ob-surface)] p-6">
            <div className="grid gap-5 sm:grid-cols-2">
              {[
                { id: "headcount", color: "#5b8def" },
                { id: "cost", color: "#b6407a" },
              ].map((track) => (
                <div
                  key={track.id}
                  className="rounded-[var(--ob-radius)] border border-[color:var(--ob-border)] px-6 py-7"
                >
                  {/* A slider-shaped axis: the dot marks the current month. */}
                  <span className="relative block h-1 rounded-full" style={{ background: track.color }}>
                    <span
                      className="absolute right-0 top-1/2 size-3 -translate-y-1/2 rounded-full"
                      style={{ background: track.color }}
                    />
                  </span>
                  <span className="flex pt-3">
                    {MONTHS.map((month) => (
                      <span
                        key={month}
                        className="flex-1 text-center text-[1rem] text-[color:var(--ob-muted)]"
                      >
                        {month}
                      </span>
                    ))}
                  </span>
                </div>
              ))}
            </div>

            <ViewDashboard />
          </section>

          <div className="flex flex-wrap items-center gap-5 pb-5 pt-9">
            <UsersIcon size={14} />
            <div className="min-w-0 flex-1">
              <h1 className="text-[1.8rem] font-bold tracking-[-0.01em]">
                Diversity, equity and inclusion
              </h1>
              <p className="pt-1 text-[1.12rem] text-[color:var(--ob-fg-soft)]">
                Collected insights into DE&amp;I across your organization
              </p>
            </div>
            <span className="flex items-center gap-6 text-[1.12rem]">
              Last 12 months
              <CaretDownIcon size={14} />
            </span>
          </div>

          <section className="rounded-[var(--ob-radius-lg)] bg-[color:var(--ob-surface)] p-6">
            <div className="grid gap-6 rounded-[var(--ob-radius)] bg-[color:var(--ob-surface-2)] p-6 lg:grid-cols-[minmax(0,0.6fr)_minmax(0,1fr)]">
              <div>
                <h2 className="flex items-center gap-2 text-[1.2rem] font-semibold">
                  Diversity by headcount <InfoDot />
                </h2>
                <p className="max-w-[28ch] pt-3 text-[1.3rem] font-bold leading-snug">
                  April 1st 2023 - March 31st 2024 · All countries
                </p>

                <ul className="grid gap-3 pt-5">
                  {HEADCOUNT.map((row) => (
                    <li
                      key={row.id}
                      className="flex items-start gap-4 rounded-[var(--ob-radius)] bg-[color:var(--ob-surface-3)] px-5 py-4"
                    >
                      <span className="flex-1 text-[1.12rem]">{row.label}</span>
                      <span className="text-right">
                        {row.lines.map((line) => (
                          <span key={line} className="block text-[1.12rem]">
                            {line.split(" · ")[0]} ·{" "}
                            <span className="font-bold">{line.split(" · ")[1]}</span>
                          </span>
                        ))}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <section className="grid content-start justify-items-center rounded-[var(--ob-radius)] bg-[color:var(--ob-surface)] p-6">
                  <h3 className="flex w-full items-center gap-2 text-[1.12rem] font-semibold">
                    Average compensation by gender <InfoDot />
                  </h3>
                  <Placeholder width={190} height={140} radius={12} label="" />
                  <p className="max-w-[28ch] pt-4 text-center text-[1.08rem] text-[color:var(--ob-fg-soft)]">
                    No average compensation by gender available to show
                  </p>
                </section>

                <section className="rounded-[var(--ob-radius)] bg-[color:var(--ob-surface)] p-6">
                  <h3 className="flex items-center gap-2 text-[1.12rem] font-semibold">
                    Headcount by ethnicity <InfoDot />
                  </h3>
                  <p className="pt-3 text-[2rem] font-bold leading-none tabular-nums">3</p>
                  <div className="grid justify-items-center pt-5">
                    {/* All three in one bucket: a single, nearly closed ring. */}
                    <Donut
                      size={190}
                      thickness={42}
                      segments={[{ id: "unspecified", value: 3, color: "#5a5a5a" }]}
                    />
                  </div>
                </section>
              </div>
            </div>

            <ViewDashboard />
          </section>
        </Main>
      </Shell>
    </Surface>
  );
}

function ViewDashboard() {
  return (
    <span className="mt-5 flex items-center justify-center gap-3 rounded-[var(--ob-radius)] bg-[color:var(--ob-surface-2)] py-4 text-[1.15rem] font-medium">
      <GridFourIcon size={14} /> View Dashboard
    </span>
  );
}

function InfoDot(): ReactNode {
  return (
    <span
      aria-hidden
      className="grid size-[16px] shrink-0 place-items-center rounded-full border border-[color:var(--ob-border-strong)] text-[0.62rem] font-normal text-[color:var(--ob-muted)]"
    >
      i
    </span>
  );
}
