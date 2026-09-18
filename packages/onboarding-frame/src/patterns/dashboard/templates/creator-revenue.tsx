"use client";

import type { ReactNode } from "react";
import {
  ArrowUpIcon,
  BellIcon,
  BookOpenIcon,
  CalendarIcon,
  CardIcon,
  CaretDownIcon,
  CaretLineLeftIcon,
  CaretRightIcon,
  CaretUpIcon,
  ClipboardIcon,
  CurrencyCircleIcon,
  ExternalSquareIcon,
  GearIcon,
  HouseIcon,
  LinkChainIcon,
  MegaphoneIcon,
  RocketIcon,
  SearchIcon,
  TrophyIcon,
  UserIcon,
} from "../../../ui/icons-solid";
import { Avatar } from "../../../ui/avatar";
import { cn } from "../../../lib/cn";
import { Surface, creatorTokens } from "./tokens";
import { Main, NavItem, Shell, Sidebar } from "./chrome";
import type { TemplateProps } from "./props";

export type CreatorPage = "home" | "users" | "milestones";

export interface CreatorRevenueProps extends TemplateProps {
  page?: CreatorPage;
}

const NAV = [
  { id: "home", label: "Home", Icon: HouseIcon },
  { id: "users", label: "Users", Icon: UserIcon },
  { id: "links", label: "Links", Icon: LinkChainIcon },
  { id: "milestones", label: "Milestones", Icon: TrophyIcon },
  { id: "growth", label: "Growth Hacks", Icon: RocketIcon, dot: true },
  { id: "marketing", label: "Marketing", Icon: MegaphoneIcon, caret: true },
  { id: "finances", label: "Finances", Icon: CardIcon, caret: true },
  { id: "operations", label: "Operations", Icon: ClipboardIcon, caret: true },
  { id: "settings", label: "Settings", Icon: GearIcon, caret: true },
];

const COUNTDOWN = [
  { id: "days", value: ["0", "5"], label: "Days" },
  { id: "hrs", value: ["1", "8"], label: "Hrs" },
  { id: "mins", value: ["5", "9"], label: "Mins" },
  { id: "secs", value: ["1", "9"], label: "Secs" },
];

/**
 * One two-hour window with a sale in it. Drawing a dot on every hour is what
 * makes the plateau read as two consecutive $1 hours rather than as a single
 * smoothed bump.
 */
const HOURS = [
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0,
];

/**
 * Creator revenue dashboard.
 *
 * Two banners stack above the content and say different things: a yellow one
 * withholding data until two-factor is enabled, and a lavender one promoting a
 * feature. Keeping both — in that order, with the blocking one first — is the
 * behaviour worth copying; collapsing them into one notification area would
 * lose which is which.
 */
export function CreatorRevenueTemplate({
  brandName = "Acme",
  userName = "Alex Rivera",
  className,
  page = "home",
}: CreatorRevenueProps) {
  return (
    <Surface tokens={creatorTokens} className={className}>
      <Shell>
        <Sidebar width={265} bg="var(--ob-surface)">
          <div className="flex items-center gap-[9px] px-[15px] pb-[15px] pt-[15px]">
            <span className="flex items-center gap-[8px] rounded-full border border-[color:var(--ob-border)] bg-white px-[12px] py-[7px] text-[0.822rem] font-medium shadow-[0_1px_2px_rgba(9,9,11,0.05)]">
              <Avatar
                name={brandName}
                size={15}
                rounded={4}
                variant="neutral"
                letters={1}
              />
              Go to hub
            </span>
            <span className="ml-auto grid size-[27px] place-items-center rounded-[var(--ob-radius-sm)] border border-[color:var(--ob-border-strong)] text-[color:var(--ob-muted)]">
              <CaretLineLeftIcon size={13} />
            </span>
          </div>

          {/*
            Measured off the reference: a grey panel rather than a bordered
            white card, spanning x=16 to x=248. The digit tiles are white on
            that grey, 20 wide by 32 tall — flip-clock cards, not squares. At
            27px square the four pairs did not fit and the seconds ran off the
            edge of the rail.
          */}
          <div className="mx-[16px] rounded-[12px] bg-[color:var(--ob-surface-2)] p-[12px]">
            <p className="flex items-center gap-[9px] pb-[12px] text-[0.7rem] font-bold uppercase tracking-wide">
              <span className="flex-1">$500 in 7 days</span>
              <CaretUpIcon size={14} />
            </p>

            {/* A flip-clock countdown: each digit is its own tile. */}
            <div className="flex items-start gap-[7px]">
              {COUNTDOWN.map((unit, index) => (
                <span key={unit.id} className="flex items-start gap-[6px]">
                  <span className="grid justify-items-center">
                    <span className="flex gap-[2px]">
                      {unit.value.map((digit, digitIndex) => (
                        <span
                          key={digitIndex}
                          className="grid h-[32px] w-[20px] place-items-center rounded-[5px] bg-white text-[0.913rem] font-semibold tabular-nums shadow-[0_1px_1px_rgba(9,9,11,0.06)]"
                        >
                          {digit}
                        </span>
                      ))}
                    </span>
                    <span className="pt-[5px] text-[0.624rem] font-semibold uppercase tracking-wide text-[color:var(--ob-muted)]">
                      {unit.label}
                    </span>
                  </span>
                  {index < COUNTDOWN.length - 1 && (
                    <span aria-hidden className="grid gap-[7px] pt-[11px]">
                      <span className="size-[2px] rounded-full bg-[color:var(--ob-border-strong)]" />
                      <span className="size-[2px] rounded-full bg-[color:var(--ob-border-strong)]" />
                    </span>
                  )}
                </span>
              ))}
            </div>

            <span className="mt-[12px] block rounded-[var(--ob-radius-sm)] bg-[color:var(--ob-brand)] py-[8px] text-center text-[0.799rem] font-semibold text-white">
              View milestone
            </span>
          </div>

          <div className="flex items-center gap-[9px] px-[15px] py-[15px]">
            <Avatar name="ASAcme" size={29} />
            <span className="flex-1 text-[0.913rem] font-semibold">ASAcme</span>
            <CaretDownIcon size={14} />
          </div>

          <nav className="grid gap-[2px] px-[9px]">
            {NAV.map((item) => (
              <NavItem
                key={item.id}
                label={
                  item.dot ? (
                    <span className="flex items-center gap-[8px]">
                      {item.label}
                      <span
                        aria-hidden
                        className="size-[6px] rounded-full bg-[color:var(--ob-brand)]"
                      />
                    </span>
                  ) : (
                    item.label
                  )
                }
                glyph={<item.Icon size={15} />}
                active={item.id === page}
                trailing={item.caret ? <CaretDownIcon size={14} /> : undefined}
                className="px-[12px] py-[9px] text-[0.875rem]"
              />
            ))}
          </nav>

          <div className="mt-auto p-[12px]">
            <div className="rounded-[var(--ob-radius)] bg-[color-mix(in_oklab,#5b5bd6_10%,transparent)] p-[15px]">
              <p className="text-[0.799rem] font-medium text-[color:var(--ob-brand)]">
                Partner Program
              </p>
              <p className="pt-[9px] text-[0.799rem] font-medium text-[color:var(--ob-brand)]">
                Earn 30% of recurring revenue for life!
              </p>
            </div>
            <div className="flex items-center gap-[9px] pt-[12px]">
              <span className="rounded-[var(--ob-radius-sm)] border border-[color:var(--ob-border-strong)] px-[11px] py-[6px] text-[0.761rem] font-medium">
                EN
              </span>
              <span
                aria-hidden
                className="ml-auto grid size-[27px] place-items-center rounded-full border border-[color:var(--ob-border-strong)]"
              >
                ?
              </span>
            </div>
          </div>
        </Sidebar>

        <Main className="overflow-auto">
          <header className="flex h-[67px] shrink-0 items-center gap-[12px] px-[21px]">
            <span className="flex items-center gap-[8px] rounded-[var(--ob-radius)] border border-[color:var(--ob-border-strong)] px-[12px] py-[8px] text-[0.822rem] font-medium">
              <TrophyIcon size={14} /> Milestones
            </span>
            <span className="ml-auto flex w-[228px] items-center gap-[8px] rounded-[var(--ob-radius)] border border-[color:var(--ob-border-strong)] px-[12px] py-[8px] text-[0.799rem] text-[color:var(--ob-muted)]">
              <SearchIcon size={14} />
              <span className="flex-1">Search</span>
              <kbd className="rounded border border-[color:var(--ob-border)] px-[5px] py-[2px] text-[0.548rem] font-semibold">
                ⌘K
              </kbd>
            </span>
            <span className="flex items-center gap-[12px] text-[color:var(--ob-fg-soft)]">
              <BookOpenIcon size={16} />
              <CurrencyCircleIcon size={16} />
              <BellIcon size={16} />
              <span className="h-[18px] w-px bg-[color:var(--ob-border-strong)]" />
              <Avatar name={userName} size={27} />
            </span>
          </header>

          <div className="grid gap-[12px] px-[21px] pb-[24px]">
            {/* Blocking notice first, promotion second. */}
            <div className="flex flex-wrap items-center gap-[12px] rounded-[var(--ob-radius)] bg-[color-mix(in_oklab,#e8c33d_25%,white)] px-[18px] py-[12px]">
              <p className="min-w-[0px] flex-1 text-[0.822rem]">
                In order to view some of the data for this company, you must
                enable two factor authentication on your account.
              </p>
              <span className="flex items-center gap-[5px] text-[0.799rem] font-medium">
                Set up two factor authentication <CaretRightIcon size={14} />
              </span>
            </div>

            <div className="rounded-[var(--ob-radius)] bg-[color-mix(in_oklab,#5b5bd6_9%,white)] px-[18px] py-[12px]">
              <p className="text-[0.822rem] leading-relaxed">
                You can now share your stats on social media 🤑. Creators who
                add the marketplace and category ranking widgets to their dash
                and share on socials are 10% more likely to get users. Click on{" "}
                <ExternalSquareIcon
                  size={13}
                  className="inline align-[-2px] text-[color:var(--ob-brand)]"
                />{" "}
                on a widget below to flex your stats 💪
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-[12px] pt-[9px]">
              <h1 className="flex-1 text-[1.522rem] font-bold tracking-[-0.01em]">
                Today
              </h1>
              <span className="flex items-center gap-[8px] rounded-full bg-[color:var(--ob-brand)] px-[15px] py-[8px] text-[0.799rem] font-semibold text-white">
                <TrophyIcon size={14} /> Need help? Join Acme University
              </span>
            </div>

            <div className="grid gap-[12px] lg:grid-cols-[minmax(0,1fr)_minmax(0,0.62fr)]">
              <section className="rounded-[var(--ob-radius-lg)] border border-[color:var(--ob-border)] p-[18px]">
                <h2 className="flex items-center gap-[6px] text-[0.852rem] font-medium">
                  Gross revenue <InfoDot />
                </h2>
                <p className="flex items-center gap-[9px] pt-[9px]">
                  <span className="text-[1.979rem] font-bold leading-none tabular-nums">
                    $2
                  </span>
                  <span className="rounded-[var(--ob-radius-sm)] bg-[color-mix(in_oklab,#2f9e5f_16%,transparent)] px-[8px] py-[3px] text-[0.761rem] font-semibold text-[#1f7a48]">
                    <span className="flex items-center gap-[2px]">
                      $2 <ArrowUpIcon size={10} weight="bold" />
                    </span>
                  </span>
                </p>

                <HourlyChart />

                <p className="flex pt-[6px] text-[0.761rem] text-[color:var(--ob-muted)]">
                  <span className="flex-1">12:00 AM</span>
                  <span>11:00 PM</span>
                </p>
              </section>

              <section className="rounded-[var(--ob-radius-lg)] border border-[color:var(--ob-border)] p-[18px]">
                <h2 className="text-[0.852rem] font-medium">To-do list</h2>
                <div className="mt-[15px] flex items-center gap-[9px] rounded-[var(--ob-radius)] bg-[color-mix(in_oklab,#5b5bd6_9%,white)] px-[15px] py-[12px]">
                  <span aria-hidden>👋</span>
                  <span className="flex-1 text-[0.852rem] font-medium">
                    Welcome 12 new users
                  </span>
                  <CaretRightIcon size={14} />
                </div>
              </section>
            </div>

            <div className="flex flex-wrap items-center gap-[9px] pt-[15px]">
              <h2 className="text-[1.522rem] font-bold tracking-[-0.01em]">
                Stats
              </h2>
              <Select>Last 7 days</Select>
              <Select glyph={<CalendarIcon size={14} />}>
                Jul 24 - 30, 2024
              </Select>
              <span className="text-[0.799rem] text-[color:var(--ob-muted)]">
                compared to
              </span>
              <Select>Previous period</Select>
              <Select>Daily</Select>
              <span className="ml-auto flex items-center gap-[9px]">
                <span className="flex items-center gap-[6px] rounded-[var(--ob-radius)] border border-[color:var(--ob-border-strong)] px-[12px] py-[8px] text-[0.799rem] font-medium">
                  <span aria-hidden>+</span> Add
                </span>
                <span className="flex items-center gap-[6px] rounded-[var(--ob-radius)] border border-[color:var(--ob-border-strong)] px-[12px] py-[8px] text-[0.799rem] font-medium">
                  <GearIcon size={14} /> Edit
                </span>
              </span>
            </div>

            <div className="grid gap-[12px] lg:grid-cols-3">
              {[
                { id: "mrr", label: "MRR", value: "$0" },
                { id: "arr", label: "ARR", value: "$0" },
              ].map((stat) => (
                <section
                  key={stat.id}
                  className="rounded-[var(--ob-radius-lg)] border border-[color:var(--ob-border)] p-[18px]"
                >
                  <p className="flex items-center gap-[6px] text-[0.852rem] font-medium">
                    <span className="flex flex-1 items-center gap-[6px]">
                      {stat.label} <InfoDot />
                    </span>
                    <span className="grid size-[21px] place-items-center rounded-[var(--ob-radius-sm)] border border-[color:var(--ob-border-strong)] text-[color:var(--ob-muted)]">
                      <ExternalSquareIcon size={11} />
                    </span>
                  </p>
                  <p className="pt-[12px] text-[1.826rem] font-bold leading-none tabular-nums">
                    {stat.value}
                  </p>
                </section>
              ))}

              <section className="rounded-[var(--ob-radius-lg)] border border-[color:var(--ob-border)] p-[18px]">
                <p className="flex items-center gap-[6px] text-[0.852rem] font-medium">
                  Payments breakdown <InfoDot />
                </p>
                <span className="mt-[15px] flex h-[8px] overflow-hidden rounded-full">
                  {[
                    { id: "paid", width: "52%", color: "#2f9e5f" },
                    { id: "pending", width: "38%", color: "#e8c33d" },
                    { id: "failed", width: "3%", color: "#e0433d" },
                    { id: "other", width: "7%", color: "var(--ob-surface-3)" },
                  ].map((band) => (
                    <span
                      key={band.id}
                      style={{ width: band.width, background: band.color }}
                    />
                  ))}
                </span>
              </section>
            </div>
          </div>
        </Main>
      </Shell>
    </Surface>
  );
}

function Select({
  children,
  glyph,
}: {
  children: ReactNode;
  glyph?: ReactNode;
}) {
  return (
    <span className="inline-flex items-center gap-[12px] rounded-[var(--ob-radius)] border border-[color:var(--ob-border-strong)] px-[12px] py-[8px] text-[0.799rem]">
      <span className="flex items-center gap-[6px]">
        {glyph && (
          <span aria-hidden className="text-[color:var(--ob-muted)]">
            {glyph}
          </span>
        )}
        {children}
      </span>
      <CaretDownIcon size={14} />
    </span>
  );
}

function InfoDot(): ReactNode {
  return (
    <span
      aria-hidden
      className="grid size-[13px] shrink-0 place-items-center rounded-[3px] border border-[color:var(--ob-border-strong)] text-[0.472rem] font-normal text-[color:var(--ob-muted)]"
    >
      i
    </span>
  );
}

function HourlyChart() {
  const width = 900;
  const height = 300;
  const max = 1.4;
  const step = width / (HOURS.length - 1);
  const y = (value: number) => height - (value / max) * (height - 20) - 10;
  const line = HOURS.map(
    (value, i) => `${i === 0 ? "M" : "L"}${i * step},${y(value)}`,
  ).join(" ");

  return (
    <div className="pt-[12px]">
      <p className="pb-[3px] text-[0.761rem] text-[color:var(--ob-muted)]">
        $1
      </p>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="h-[228px] w-full"
        preserveAspectRatio="none"
        role="img"
        aria-label="Gross revenue by hour"
      >
        {/* Faint hour bands behind the line. */}
        {HOURS.map((_, index) =>
          index % 2 === 0 ? (
            <rect
              key={index}
              x={index * step - step / 2}
              y={0}
              width={step * 0.55}
              height={height}
              fill="var(--ob-surface-2)"
            />
          ) : null,
        )}
        <path
          d={line}
          fill="none"
          stroke="#5b5bd6"
          strokeWidth={2}
          vectorEffect="non-scaling-stroke"
        />
        {HOURS.map((value, index) => (
          <circle
            key={index}
            cx={index * step}
            cy={y(value)}
            r={4}
            fill="#5b5bd6"
            vectorEffect="non-scaling-stroke"
          />
        ))}
      </svg>
    </div>
  );
}
