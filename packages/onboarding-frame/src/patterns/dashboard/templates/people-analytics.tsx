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
  UserPlusIcon,
  UsersIcon,
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
        <Sidebar width={273} bg="var(--ob-surface)">
          <div className="flex items-center gap-[14px] px-[21px] pb-[17px] pt-[17px]">
            <Wordmark name={brandName} size={16} mark={24} radius={5} />
            <span className="ml-auto flex items-center gap-[10px] text-[color:var(--ob-fg-soft)]">
              <Avatar name={userName} size={24} />
              <BellIcon size={12} />
              <SearchIcon size={12} />
            </span>
          </div>

          <div className="mx-[14px] flex items-center gap-[10px] rounded-[var(--ob-radius)] border border-[color:var(--ob-border)] px-[14px] py-[10px]">
            <UsersIcon size={12} />
            <span className="flex-1 leading-tight">
              <span className="block text-[0.824rem] text-[color:var(--ob-muted)]">
                JD Mob
              </span>
              <span className="block text-[0.971rem] font-semibold">Jane&rsquo;s Group</span>
            </span>
            <span aria-hidden className="text-[color:var(--ob-muted)]">
              ⋮
            </span>
          </div>

          <div className="mx-[21px] my-[17px] flex items-center gap-[7px]">
            <span className="size-[5px] rounded-full bg-[color:var(--ob-border-strong)]" />
            <span className="h-px flex-1 bg-[color:var(--ob-border)]" />
            <span className="size-[5px] rounded-full bg-[color:var(--ob-border-strong)]" />
          </div>

          <NavSection label="Group" />
          <nav className="grid gap-[2px] px-[10px]">
            {GROUP.map((item) => (
              <NavItem
                key={item.id}
                label={
                  item.badge ? (
                    <span className="flex items-center gap-[9px]">
                      {item.label}
                      <span className="rounded bg-[color:var(--ob-brand)] px-[5px] py-[2px] text-[0.624rem] font-bold text-white">
                        {item.badge}
                      </span>
                    </span>
                  ) : (
                    item.label
                  )
                }
                glyph={<item.Icon size={12} />}
                active={item.id === page}
                className={cn(
                  "px-[14px] py-[10px] text-[0.971rem]",
                  item.id === page &&
                    "border border-[color:var(--ob-border)] bg-[color:var(--ob-surface)]",
                )}
              />
            ))}
          </nav>

          <NavSection label="Organization" />
          <nav className="grid gap-[2px] px-[10px]">
            {ORGANIZATION.map((item) => (
              <NavItem
                key={item.id}
                label={
                  item.badge ? (
                    <span className="flex items-center gap-[9px]">
                      {item.label}
                      <span className="rounded bg-[color:var(--ob-brand)] px-[5px] py-[2px] text-[0.624rem] font-bold text-white">
                        {item.badge}
                      </span>
                    </span>
                  ) : (
                    item.label
                  )
                }
                glyph={<item.Icon size={12} />}
                className="px-[14px] py-[10px] text-[0.971rem]"
              />
            ))}
          </nav>

          <div className="mx-[21px] my-[17px] h-px bg-[color:var(--ob-border)]" />
          <nav className="grid gap-[2px] px-[10px] pb-[21px]">
            <NavItem
              label={
                <span className="flex items-center gap-[9px]">
                  Get started with HR
                  <span className="rounded bg-[color:var(--ob-brand)] px-[5px] py-[2px] text-[0.624rem] font-bold text-white">
                    NEW
                  </span>
                </span>
              }
              glyph={<RocketIcon size={12} />}
              className="px-[14px] py-[10px] text-[0.971rem]"
            />
          </nav>
        </Sidebar>

        <Main className="overflow-auto p-[24px]">
          <section className="rounded-[var(--ob-radius-lg)] bg-[color:var(--ob-surface)] p-[21px]">
            <div className="grid gap-[17px] sm:grid-cols-2">
              {[
                { id: "headcount", color: "#5b8def" },
                { id: "cost", color: "#b6407a" },
              ].map((track) => (
                <div
                  key={track.id}
                  className="rounded-[var(--ob-radius)] border border-[color:var(--ob-border)] px-[21px] py-[24px]"
                >
                  {/* A slider-shaped axis: the dot marks the current month. */}
                  <span className="relative block h-[3px] rounded-full" style={{ background: track.color }}>
                    <span
                      className="absolute right-[0px] top-1/2 size-[10px] -translate-y-1/2 rounded-full"
                      style={{ background: track.color }}
                    />
                  </span>
                  <span className="flex pt-[10px]">
                    {MONTHS.map((month) => (
                      <span
                        key={month}
                        className="flex-1 text-center text-[0.867rem] text-[color:var(--ob-muted)]"
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

          <div className="flex flex-wrap items-center gap-[17px] pb-[17px] pt-[31px]">
            <UsersIcon size={12} />
            <div className="min-w-[0px] flex-1">
              <h1 className="text-[1.561rem] font-bold tracking-[-0.01em]">
                Diversity, equity and inclusion
              </h1>
              <p className="pt-[3px] text-[0.971rem] text-[color:var(--ob-fg-soft)]">
                Collected insights into DE&amp;I across your organization
              </p>
            </div>
            <span className="flex items-center gap-[21px] text-[0.971rem]">
              Last 12 months
              <CaretDownIcon size={12} />
            </span>
          </div>

          <section className="rounded-[var(--ob-radius-lg)] bg-[color:var(--ob-surface)] p-[21px]">
            <div className="grid gap-[21px] rounded-[var(--ob-radius)] bg-[color:var(--ob-surface-2)] p-[21px] lg:grid-cols-[minmax(0,0.6fr)_minmax(0,1fr)]">
              <div>
                <h2 className="flex items-center gap-[7px] text-[1.041rem] font-semibold">
                  Diversity by headcount <InfoDot />
                </h2>
                <p className="max-w-[28ch] pt-[10px] text-[1.127rem] font-bold leading-snug">
                  April 1st 2023 - March 31st 2024 · All countries
                </p>

                <ul className="grid gap-[10px] pt-[17px]">
                  {HEADCOUNT.map((row) => (
                    <li
                      key={row.id}
                      className="flex items-start gap-[14px] rounded-[var(--ob-radius)] bg-[color:var(--ob-surface-3)] px-[17px] py-[14px]"
                    >
                      <span className="flex-1 text-[0.971rem]">{row.label}</span>
                      <span className="text-right">
                        {row.lines.map((line) => (
                          <span key={line} className="block text-[0.971rem]">
                            {line.split(" · ")[0]} ·{" "}
                            <span className="font-bold">{line.split(" · ")[1]}</span>
                          </span>
                        ))}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="grid gap-[17px] sm:grid-cols-2">
                <section className="grid content-start justify-items-center rounded-[var(--ob-radius)] bg-[color:var(--ob-surface)] p-[21px]">
                  <h3 className="flex w-full items-center gap-[7px] text-[0.971rem] font-semibold">
                    Average compensation by gender <InfoDot />
                  </h3>
                  <Placeholder width={165} height={121} radius={10} label="" />
                  <p className="max-w-[28ch] pt-[14px] text-center text-[0.937rem] text-[color:var(--ob-fg-soft)]">
                    No average compensation by gender available to show
                  </p>
                </section>

                <section className="rounded-[var(--ob-radius)] bg-[color:var(--ob-surface)] p-[21px]">
                  <h3 className="flex items-center gap-[7px] text-[0.971rem] font-semibold">
                    Headcount by ethnicity <InfoDot />
                  </h3>
                  <p className="pt-[10px] text-[1.735rem] font-bold leading-none tabular-nums">3</p>
                  <div className="grid justify-items-center pt-[17px]">
                    {/* All three in one bucket: a single, nearly closed ring. */}
                    <Donut
                      size={165}
                      thickness={36}
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
    <span className="mt-[17px] flex items-center justify-center gap-[10px] rounded-[var(--ob-radius)] bg-[color:var(--ob-surface-2)] py-[14px] text-[0.997rem] font-medium">
      <GridFourIcon size={12} /> View Dashboard
    </span>
  );
}

function InfoDot(): ReactNode {
  return (
    <span
      aria-hidden
      className="grid size-[14px] shrink-0 place-items-center rounded-full border border-[color:var(--ob-border-strong)] text-[0.538rem] font-normal text-[color:var(--ob-muted)]"
    >
      i
    </span>
  );
}
