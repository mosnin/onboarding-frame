"use client";

import type { ReactNode } from "react";
import {
  ArrowCircleOutIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  BellIcon,
  BrowsersIcon,
  CaretDownIcon,
  CaretRightIcon,
  ChatBarsIcon,
  ChatCircleDotsIcon,
  ChartPieIcon,
  CopyrightIcon,
  CrossCircleIcon,
  ExternalSquareIcon,
  FlowerIcon,
  EnvelopeIcon,
  GearIcon,
  ListChecksIcon,
  MegaphoneIcon,
  PlusIcon,
  QuestionIcon,
  SearchIcon,
  ShieldIcon,
} from "../../../ui/icons-solid";
import { Avatar } from "../../../ui/avatar";
import { Wordmark } from "../../../ui/wordmark";
import { cn } from "../../../lib/cn";
import { Surface, communityTokens } from "./tokens";
import { Main, Shell, Sidebar } from "./chrome";
import type { TemplateProps } from "./props";

export type CommunityPage = "traffic" | "modlog" | "scheduled";

export interface CommunityTrafficProps extends TemplateProps {
  page?: CommunityPage;
}

const GROUPS = [
  {
    label: "Content",
    Icon: ListChecksIcon,
    items: [{ id: "scheduled", label: "Scheduled posts" }],
  },
  {
    label: "Other",
    Icon: GearIcon,
    items: [
      { id: "awards", label: "Awards" },
      { id: "wiki", label: "Wiki pages" },
      { id: "settings", label: "Community settings", badge: "NEW", chevron: true },
      { id: "appearance", label: "Community appearance", chevron: true },
    ],
  },
  {
    label: "Modmail",
    Icon: EnvelopeIcon,
    items: [{ id: "modmail", label: "Modmail", external: true }],
  },
  {
    label: "Community activity",
    Icon: BrowsersIcon,
    items: [
      { id: "traffic", label: "Traffic stats" },
      { id: "modlog", label: "Mod log" },
    ],
  },
  {
    label: "Mod help center",
    Icon: QuestionIcon,
    items: [
      { id: "help", label: "Mod help center", external: true },
      { id: "education", label: "Mod education site", external: true },
      { id: "conduct", label: "Moderator code of conduct", external: true },
      { id: "support", label: "r/ModSupport", external: true },
      { id: "modhelp", label: "r/ModHelp", external: true },
      { id: "contact", label: "Contact Reddit", external: true },
    ],
  },
];

const PLATFORMS = [
  { id: "new", label: "New Reddit", color: "#0079d3" },
  { id: "old", label: "Old Reddit", color: "#f2b544" },
  { id: "mobile", label: "Mobile Web", color: "#ff4500" },
  { id: "apps", label: "Reddit Apps", color: "#39a0a0" },
];

/**
 * A brand-new community: one day of traffic and nothing either side. The chart
 * keeps every zero day plotted rather than cropping to the single spike, which
 * is what makes "21 pageviews in a week" read correctly.
 */
const PAGEVIEWS = [0, 0, 0, 0, 0, 21, 0];
const OLD_REDDIT = [0, 0, 0, 0, 0, 0, 0];
const DAYS = ["January 8", "Jan 9", "Jan 10", "Jan 11", "Jan 12", "Jan 13", "Jan 14"];

const TABLE = [
  { day: "1/14/23", views: 0, uniques: 0, joined: 0 },
  { day: "1/13/23", views: 21, uniques: 2, joined: 0 },
  { day: "1/12/23", views: 0, uniques: 0, joined: 0 },
  { day: "1/11/23", views: 0, uniques: 0, joined: 0 },
];

/**
 * Community traffic stats.
 *
 * Two accents on purpose: the orange brand sits in the chrome and badges while
 * links, active tabs and the primary series are blue. The chart is drawn with
 * a full ruled plot box (both axes, vertical gridlines, a rotated axis title)
 * rather than the borderless sparkline style used elsewhere in this
 * catalogue — an older admin surface, and it should read as one.
 */
export function CommunityTrafficTemplate({
  brandName = "Acme",
  className,
  page = "traffic",
}: CommunityTrafficProps) {
  return (
    <Surface tokens={communityTokens} className={className}>
      <Shell className="flex-col">
        <header className="flex h-[50px] shrink-0 items-center overflow-x-auto gap-[11px] border-b border-[color:var(--ob-border)] bg-[color:var(--ob-surface)] px-[14px]">
          <Wordmark name={brandName} size={19} mark={26} radius={13} />
          <span className="flex items-center gap-[7px] pl-[11px] text-[0.865rem] font-medium">
            <Avatar name="r/Acme_Mods" size={21} letters={1} />
            r/Acme_Mods
            <CaretDownIcon size={17} />
          </span>

          <div className="mx-auto flex w-full max-w-[584px] items-center gap-[7px] rounded-full bg-[color:var(--ob-surface-2)] px-[11px] py-[7px]">
            <SearchIcon size={17} />
            {/* The scoped-search pill lives inside the field in the reference. */}
            <span className="flex items-center gap-[6px] rounded-full bg-[color-mix(in_oklab,#0079d3_16%,transparent)] px-[7px] py-[3px] text-[0.774rem] font-medium text-[color:var(--ob-brand)]">
              <Avatar name="r/Acme_Mods" size={14} letters={1} />
              r/Acme_Mods
              <CrossCircleIcon size={13} weight="fill" />
            </span>
            <span className="text-[0.838rem] text-[color:var(--ob-muted)]">
              Search Reddit
            </span>
          </div>

          <span className="flex items-center gap-[11px] text-[color:var(--ob-fg-soft)]">
            <ArrowCircleOutIcon size={21} />
            <CopyrightIcon size={21} />
            <ChatBarsIcon size={21} />
            <span className="h-[21px] w-px bg-[color:var(--ob-border-strong)]" />
            <ShieldIcon size={21} />
            <ChatCircleDotsIcon size={21} />
            <BellIcon size={21} />
            <PlusIcon size={21} />
          </span>
          <span className="flex items-center gap-[6px] rounded-full bg-[color:var(--ob-surface-2)] px-[11px] py-[6px] text-[0.802rem] font-semibold">
            <MegaphoneIcon size={17} /> Advertise
          </span>
          <span className="flex items-center gap-[7px] pl-[4px]">
            <Avatar name="Mod_Account" size={28} />
            <span className="leading-tight">
              <span className="block text-[0.774rem] font-medium">Mod_Account</span>
              <span className="block text-[0.693rem] text-[color:var(--ob-muted)]">
                <FlowerIcon size={12} weight="fill" className="inline align-[-1px] text-[#ff4500]" />{" "}
                1 karma
              </span>
            </span>
            <CaretDownIcon size={17} />
          </span>
        </header>

        <div className="flex items-center gap-[7px] border-b border-[color:var(--ob-border)] bg-[color:var(--ob-surface)] px-[14px] py-[9px] text-[0.711rem] font-bold uppercase tracking-wide">
          <Avatar name="r/Acme_Mods" size={18} letters={1} />
          <span className="text-[color:var(--ob-cta-bg)]">r/Acme_Mods</span>
          <span className="text-[color:var(--ob-muted)]">/</span>
          <span>Traffic stats</span>
        </div>

        <div className="flex min-h-[0px] flex-1">
          <Sidebar width={294} bg="var(--ob-surface)">
            <div className="grid gap-[4px] py-[11px]">
              {GROUPS.map((group) => (
                <div key={group.label}>
                  <p className="flex items-center gap-[9px] px-[21px] pb-[4px] pt-[14px] text-[0.711rem] font-bold uppercase tracking-wide text-[color:var(--ob-muted)]">
                    <group.Icon size={17} />
                    {group.label}
                  </p>
                  {group.items.map((item) => {
                    const active = item.id === page;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        aria-current={active ? "page" : undefined}
                        className={cn(
                          "flex w-full items-center gap-[7px] py-[9px] pl-[21px] pr-[18px] text-left text-[0.911rem]",
                          active
                            ? "border-l-[3px] border-[color:var(--ob-cta-bg)] bg-[color:var(--ob-surface-2)] pl-[calc(1.5rem-3px)] font-medium"
                            : "text-[color:var(--ob-fg-soft)] hover:bg-[color:var(--ob-surface-2)]",
                        )}
                      >
                        <span className="flex-1">{item.label}</span>
                        {"badge" in item && item.badge && (
                          <span className="rounded-[3px] bg-[color:var(--ob-cta-bg)] px-[6px] py-[3px] text-[0.638rem] font-bold text-white">
                            {item.badge}
                          </span>
                        )}
                        {"external" in item && item.external && (
                          <ExternalSquareIcon size={13} className="opacity-50" />
                        )}
                        {"chevron" in item && item.chevron && (
                          <CaretRightIcon size={17} />
                        )}
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>
          </Sidebar>

          <Main className="overflow-auto p-[21px]">
            <h1 className="pb-[14px] text-[1.23rem] font-bold">
              Traffic Stats{" "}
              <span className="text-[0.911rem] font-normal text-[color:var(--ob-muted)]">
                updating every hour
              </span>
            </h1>

            <section className="rounded-[var(--ob-radius-lg)] bg-[color:var(--ob-surface)] p-[21px]">
              <nav className="flex gap-[21px] pb-[21px]">
                {["Pageviews", "Uniques", "Members"].map((tab, index) => (
                  <span
                    key={tab}
                    className={cn(
                      "pb-[4px] text-[0.958rem] font-semibold",
                      index === 0
                        ? "border-b-2 border-[color:var(--ob-brand)] text-[color:var(--ob-brand)]"
                        : "",
                    )}
                  >
                    {tab}
                  </span>
                ))}
              </nav>

              <div className="grid gap-[14px] pb-[29px] sm:grid-cols-3">
                {[
                  { value: "21", label: "Total - last 24 hours" },
                  { value: "21", label: "Total - last 7 days" },
                  { value: "0", label: "Total - last month" },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-[var(--ob-radius)] border border-[color:var(--ob-border)] px-[18px] py-[14px]"
                  >
                    <p className="text-[1.823rem] font-normal tabular-nums leading-none">
                      {stat.value}
                    </p>
                    <p className="pt-[7px] text-[0.711rem] font-bold uppercase tracking-wide text-[color:var(--ob-muted)]">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>

              <div className="flex gap-[29px]">
                <RuledChart />
                <ul className="grid content-start gap-[11px] pt-[21px]">
                  {PLATFORMS.map((platform) => (
                    <li key={platform.id} className="flex items-center gap-[11px]">
                      <span
                        aria-hidden
                        className="size-[14px] rounded-[3px]"
                        style={{ background: platform.color }}
                      />
                      <span className="text-[0.911rem] text-[color:var(--ob-fg-soft)]">
                        {platform.label}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex items-center gap-[14px] pt-[14px]">
                <span className="text-[color:var(--ob-fg-soft)]">
                  <ArrowLeftIcon size={18} />
                </span>
                <span className="mx-auto flex items-center gap-[14px] text-[0.911rem] font-semibold">
                  <span>Hour</span>
                  <span className="rounded bg-[color-mix(in_oklab,#0079d3_12%,transparent)] px-[7px] py-[3px] text-[color:var(--ob-brand)]">
                    Day
                  </span>
                  <span>Month</span>
                </span>
                <span className="text-[color:var(--ob-fg-soft)] opacity-30">
                  <ArrowRightIcon size={18} />
                </span>
              </div>
            </section>

            <section className="mt-[18px] rounded-[var(--ob-radius-lg)] bg-[color:var(--ob-surface)] p-[21px]">
              <nav className="flex gap-[21px] pb-[18px]">
                {["Day", "Day of week", "Month"].map((tab, index) => (
                  <span
                    key={tab}
                    className={cn(
                      "pb-[4px] text-[0.958rem] font-semibold",
                      index === 0
                        ? "border-b-2 border-[color:var(--ob-brand)] text-[color:var(--ob-brand)]"
                        : "",
                    )}
                  >
                    {tab}
                  </span>
                ))}
              </nav>

              <table className="w-full border-collapse text-[0.911rem]">
                <thead>
                  <tr className="bg-[color:var(--ob-surface-2)] text-[0.711rem] font-bold uppercase tracking-wide text-[color:var(--ob-fg-soft)]">
                    <Th>
                      Day <CaretDownIcon size={11} weight="fill" className="inline align-[0px]" />
                    </Th>
                    <Th>Pageviews</Th>
                    <Th>Uniques</Th>
                    <Th>Members joined</Th>
                  </tr>
                </thead>
                <tbody>
                  {TABLE.map((row) => (
                    <tr key={row.day}>
                      <Td>{row.day}</Td>
                      <Td>{row.views}</Td>
                      <Td>{row.uniques}</Td>
                      <Td>{row.joined}</Td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>
          </Main>
        </div>
      </Shell>
    </Surface>
  );
}

function Th({ children }: { children: ReactNode }) {
  return (
    <th className="border border-[color:var(--ob-border)] px-[18px] py-[11px] text-left font-bold">
      {children}
    </th>
  );
}

function Td({ children }: { children: ReactNode }) {
  return (
    <td className="border border-[color:var(--ob-border)] px-[18px] py-[13px] tabular-nums">
      {children}
    </td>
  );
}

/**
 * Hand-drawn plot box.
 *
 * The shared chart kit deliberately omits axis frames and vertical gridlines,
 * so this one is laid out here instead of bending the kit — the ruled box and
 * the rotated axis title are exactly what date this surface.
 */
function RuledChart() {
  const width = 1240;
  const height = 350;
  const max = 25;
  const step = width / (DAYS.length - 1);
  const y = (value: number) => height - (value / max) * height;
  const path = (points: number[]) =>
    points.map((value, i) => `${i === 0 ? "M" : "L"}${i * step},${y(value)}`).join(" ");

  return (
    <div className="flex min-w-[0px] flex-1 gap-[11px]">
      <span className="flex items-center">
        <span
          className="whitespace-nowrap text-[0.774rem] font-bold text-[color:var(--ob-fg-soft)]"
          style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
        >
          Pageviews
        </span>
      </span>

      <div className="min-w-[0px] flex-1">
        <div className="flex">
          <div className="grid shrink-0 pr-[7px] text-right text-[0.748rem] tabular-nums text-[color:var(--ob-fg-soft)]">
            {[25, 20, 15, 10, 5, 0].map((tick, index) => (
              <span
                key={tick}
                className={cn("leading-none", index > 0 && "mt-[calc((350px/5)-0.8em)]")}
              >
                {tick}
              </span>
            ))}
          </div>

          <svg
            viewBox={`0 0 ${width} ${height}`}
            className="h-[320px] min-w-[0px] flex-1"
            preserveAspectRatio="none"
            role="img"
            aria-label="Pageviews per day"
          >
            {/* Horizontal gridlines and, unusually, vertical ones too. */}
            {[0, 1, 2, 3, 4, 5].map((index) => (
              <line
                key={`h${index}`}
                x1={0}
                x2={width}
                y1={(height / 5) * index}
                y2={(height / 5) * index}
                stroke="var(--ob-border)"
                strokeWidth={1}
                vectorEffect="non-scaling-stroke"
              />
            ))}
            {DAYS.map((_, index) => (
              <line
                key={`v${index}`}
                x1={index * step}
                x2={index * step}
                y1={0}
                y2={height}
                stroke="var(--ob-border)"
                strokeWidth={1}
                vectorEffect="non-scaling-stroke"
              />
            ))}
            <path
              d={path(OLD_REDDIT)}
              fill="none"
              stroke="#f2b544"
              strokeWidth={2}
              vectorEffect="non-scaling-stroke"
            />
            <path
              d={path(PAGEVIEWS)}
              fill="none"
              stroke="#0079d3"
              strokeWidth={2}
              vectorEffect="non-scaling-stroke"
            />
          </svg>
        </div>

        <div className="flex pl-[1.732rem] pt-[7px]">
          {DAYS.map((day, index) => (
            <span
              key={day}
              className={cn(
                "flex-1 text-[0.748rem] text-[color:var(--ob-fg-soft)]",
                index === 0
                  ? "text-left"
                  : index === DAYS.length - 1
                    ? "text-right"
                    : "text-center",
              )}
            >
              {day}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
