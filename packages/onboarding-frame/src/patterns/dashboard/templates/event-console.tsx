"use client";

import type { ReactNode } from "react";
import {
  ArrowClockwiseIcon,
  BellIcon,
  BrowsersIcon,
  LinkChainIcon,
  ListChecksIcon,
  PencilIcon,
  SearchIcon,
  TreeIcon,
  UserIcon,
} from "../../../ui/icons-solid";
import { Avatar, Thumb } from "../../../ui/avatar";
import { BrandMark } from "../../../ui/brand";
import { Wordmark } from "../../../ui/wordmark";
import { cn } from "../../../lib/cn";
import { Surface, eventConsoleTokens } from "./tokens";
import { Main, Shell } from "./chrome";
import type { TemplateProps } from "./props";

export type ConsolePage = "overview" | "marketing" | "finance";

export interface EventConsoleProps extends TemplateProps {
  page?: ConsolePage;
}

const TABS = ["Overview", "Marketing", "Team", "Finance", "Profile", "Settings"];

const ORDERS = [
  {
    id: "o1",
    name: "Sam Lee",
    when: "Jan 28, 2026 1:50 PM",
    event: "Cookie Meet-Up: Tast…",
    order: "#22291646",
    total: "$0.00",
    avatar: false,
  },
  {
    id: "o2",
    name: "Samantha Lee",
    when: "Jan 27, 2026 3:47 PM",
    event: "Cookie Meet-Up: Tast…",
    order: "#22267059",
    total: "$0.00",
    avatar: false,
  },
  {
    id: "o3",
    name: "Alex Smith",
    when: "Jan 27, 2026 3:36 PM",
    event: "Cookie Meet-Up: Tast…",
    order: "#22267021",
    total: "$0.00",
    avatar: true,
    series: true,
  },
  {
    id: "o4",
    name: "Alex Smith",
    when: "Jan 27, 2026 3:30 PM",
    event: "Cookie Meet-Up: Tast…",
    order: "#22267003",
    total: "$0.00",
    avatar: true,
  },
];

const DAYS = ["Jan 21", "Jan 22", "Jan 23", "Jan 24", "Jan 25", "Jan 26", "Jan 27", "Jan 28"];

/** Four tickets, all on one day. Flat then a hump, and nothing either side. */
const TICKETS = [0, 0, 0, 0, 0, 0.1, 3, 1];

/**
 * Event organiser console.
 *
 * The progress bar toward $100,000 is empty, and stays empty — the four orders
 * below are all $0.00 because the event is free. Keeping both on screen is the
 * point: the dashboard is measuring revenue for a creator who has not charged
 * for anything yet, and inventing a number would remove exactly that.
 */
export function EventConsoleTemplate({
  brandName = "Acme",
  userName = "Alex Rivera",
  className,
  page = "overview",
}: EventConsoleProps) {
  return (
    <Surface tokens={eventConsoleTokens} className={className}>
      <Shell className="flex-col">
        <header className="flex h-[77px] shrink-0 items-center gap-[15px] px-4 sm:px-[24px]">
          <Wordmark name={brandName} size={16} mark={21} radius={6} />

          {/* The nav is a floating pill, not a bar. */}
          <nav className="mx-auto flex max-w-full items-center gap-[6px] overflow-x-auto rounded-full bg-[color:var(--ob-surface-2)] px-[9px] py-[7px]">
            {TABS.map((tab) => (
              <span
                key={tab}
                className={cn(
                  "rounded-full px-[15px] py-[6px] text-[0.8rem]",
                  tab.toLowerCase() === page
                    ? "font-semibold text-[color:var(--ob-fg)]"
                    : "text-[color:var(--ob-muted)]",
                )}
              >
                {tab}
              </span>
            ))}
          </nav>

          <span className="flex shrink-0 items-center gap-2 sm:gap-[15px]">
            <Avatar name={userName} size={27} />
            <BellIcon size={14} />
            <ListChecksIcon size={14} />
          </span>
        </header>

        <Main className="overflow-auto px-[24px] pb-[30px]">
          <div className="grid gap-[24px] xl:grid-cols-[minmax(0,1fr)_420px]">
            <div>
              <div className="flex flex-wrap items-center gap-[15px]">
                <BrandMark brand="Acme" size={53} label="Acme" />
                <h1 className="text-[1.63rem] font-bold tracking-[-0.01em]">Acme</h1>

                <span className="flex items-center gap-[7px] pl-[12px] text-[0.8rem]">
                  <TreeIcon size={14} />
                  Apprentice
                  <span
                    aria-hidden
                    className="grid size-[15px] place-items-center rounded-full border border-[color:var(--ob-border-strong)] text-[0.504rem] text-[color:var(--ob-muted)]"
                  >
                    ?
                  </span>
                </span>

                <span className="ml-auto flex min-w-[237px] flex-col gap-[6px]">
                  <span className="text-right text-[0.8rem] text-[color:var(--ob-fg-soft)]">
                    $0 / $100,000
                  </span>
                  {/* Nothing earned yet, so the track stays empty. */}
                  <span className="block h-[4px] rounded-full bg-[color:var(--ob-surface-3)]" />
                </span>
              </div>

              <div className="flex flex-wrap items-stretch gap-[15px] pt-[18px]">
                {[
                  { id: "events", label: "Events", value: "4" },
                  { id: "attendees", label: "Total attendees", value: "3" },
                ].map((stat) => (
                  <section
                    key={stat.id}
                    className="grid flex-1 justify-items-center rounded-[var(--ob-radius)] border border-[color:var(--ob-border)] px-[24px] py-[18px]"
                  >
                    <p className="text-[0.704rem] font-medium uppercase tracking-wide text-[color:var(--ob-muted)]">
                      {stat.label}
                    </p>
                    <p className="pt-[6px] text-[1.407rem] font-bold leading-none tabular-nums">
                      {stat.value}
                    </p>
                  </section>
                ))}
                <span className="grid place-items-center rounded-full bg-[color:var(--ob-cta-bg)] px-[27px] text-[0.852rem] font-semibold text-[color:var(--ob-cta-fg)]">
                  + Create New Event
                </span>
              </div>

              <section className="relative mt-[15px] rounded-[var(--ob-radius)] border border-[color:var(--ob-border)] p-[18px]">
                <ArrowClockwiseIcon size={14} />
                <TicketChart />
              </section>

              <div className="flex flex-wrap items-end gap-[12px] pt-[15px]">
                <div className="flex-1">
                  <p className="text-[0.704rem] font-medium uppercase tracking-wide text-[color:var(--ob-muted)]">
                    Tickets this week
                  </p>
                  <p className="pt-[3px] text-[1.185rem] font-bold tabular-nums leading-none">
                    4
                  </p>
                </div>
                <span className="inline-flex rounded-[var(--ob-radius)] border border-[color:var(--ob-border)] p-[3px]">
                  {["1W", "1M", "ALL"].map((range, index) => (
                    <span
                      key={range}
                      className={cn(
                        "rounded-[var(--ob-radius-sm)] px-[15px] py-[6px] text-[0.778rem]",
                        index === 0
                          ? "bg-[color:var(--ob-surface-2)] font-semibold"
                          : "text-[color:var(--ob-muted)]",
                      )}
                    >
                      {range}
                    </span>
                  ))}
                </span>
              </div>

              <h2 className="pb-[12px] pt-[27px] text-[1.185rem] font-bold">Events</h2>
              <section className="rounded-[var(--ob-radius)] border border-[color:var(--ob-border)] p-[18px]">
                <div className="flex items-start gap-[12px]">
                  <div className="flex-1">
                    <p className="text-[0.778rem] italic text-[color:var(--ob-muted)]">
                      Event series:
                    </p>
                    <h3 className="pt-[3px] text-[1.111rem] font-bold">
                      Cookie Meet-Up: Taste, Trade, &amp; Chat
                    </h3>
                    <p className="flex items-center gap-[6px] pt-[6px] text-[0.778rem] text-[color:var(--ob-success)]">
                      ● Live
                    </p>
                  </div>
                  <span className="flex items-center gap-[12px] text-[color:var(--ob-fg-soft)]">
                    <PencilIcon size={14} />
                    <BrowsersIcon size={14} />
                  </span>
                </div>

                <div className="relative mt-[15px] overflow-hidden rounded-[var(--ob-radius)]">
                  <span className="block h-[141px]">
                    <Thumb seed="cookie-meet-up" radius={0} alt="Event banner" />
                  </span>
                  <span className="absolute inset-x-[18px] bottom-[18px] flex items-end gap-[12px]">
                    <span className="flex-1 text-[0.963rem] font-bold">
                      Cookie Meet-Up: Taste, Trade, &amp; Chat
                    </span>
                    {["3", "13"].map((value) => (
                      <span
                        key={value}
                        className="grid h-[41px] w-[59px] place-items-center rounded-[var(--ob-radius)] bg-[color-mix(in_oklab,#000000_55%,transparent)] text-[0.889rem] font-bold tabular-nums"
                      >
                        {value}
                      </span>
                    ))}
                  </span>
                </div>
              </section>
            </div>

            <aside>
              <h2 className="pb-[12px] text-[1.185rem] font-bold">Orders</h2>

              <span className="flex items-center gap-[9px] pb-[12px]">
                <SearchIcon size={14} />
                <span className="flex-1 rounded-[var(--ob-radius)] border border-[color:var(--ob-border)] px-[12px] py-[9px] text-[0.756rem] text-[color:var(--ob-muted)]">
                  Search (Event Name, Attendee Name, Email, Order
                </span>
              </span>

              <div className="grid gap-[12px]">
                {ORDERS.map((order) => (
                  <article
                    key={order.id}
                    className="flex items-start gap-[12px] rounded-[var(--ob-radius)] bg-[color:var(--ob-surface)] p-[15px]"
                  >
                    {order.avatar ? (
                      <Avatar name={order.name} size={41} />
                    ) : (
                      <UserIcon size={14} />
                    )}
                    <div className="min-w-[0px] flex-1">
                      <p className="text-[0.852rem] font-semibold">{order.name}</p>
                      <p className="pt-[3px] text-[0.756rem] text-[color:var(--ob-muted)]">
                        {order.when}
                      </p>
                      <p className="truncate pt-[1px] text-[0.756rem] text-[color:var(--ob-muted)]">
                        {order.event}
                      </p>
                      {order.series && (
                        <span className="mt-[6px] inline-flex items-center gap-[4px] rounded-[var(--ob-radius-sm)] bg-[color:var(--ob-surface-2)] px-[7px] py-[3px] text-[0.704rem] text-[color:var(--ob-fg-soft)]">
                          <LinkChainIcon size={14} /> series
                        </span>
                      )}
                    </div>
                    <div className="shrink-0 text-right">
                      <p className="text-[0.778rem]">Order {order.order}</p>
                      <p className="pt-[6px] text-[0.889rem] font-bold tabular-nums">
                        {order.total}
                      </p>
                    </div>
                  </article>
                ))}
              </div>

              <span className="mt-[12px] block rounded-[var(--ob-radius)] border border-[color:var(--ob-border)] py-[12px] text-center text-[0.83rem] font-medium">
                View More
              </span>
            </aside>
          </div>
        </Main>
      </Shell>
    </Surface>
  );
}

function TicketChart(): ReactNode {
  const width = 1080;
  const height = 420;
  const max = 3.2;
  const step = width / (TICKETS.length - 1);
  const y = (value: number) => height - (value / max) * height;

  // Smooth the hump so four tickets on one day read as a curve, not a spike.
  const path = TICKETS.reduce((acc, value, index) => {
    const x = index * step;
    if (index === 0) return `M${x},${y(value)}`;
    const prevX = (index - 1) * step;
    const prevY = y(TICKETS[index - 1]!);
    const cx = (prevX + x) / 2;
    return `${acc} C${cx},${prevY} ${cx},${y(value)} ${x},${y(value)}`;
  }, "");

  return (
    <div className="flex gap-[12px]">
      <div className="grid shrink-0 text-right text-[0.741rem] tabular-nums text-[color:var(--ob-muted)]">
        {[3, 2, 1, 0].map((tick, index) => (
          <span
            key={tick}
            className={cn("leading-none", index > 0 && "mt-[calc((420px/3)-0.8em)]")}
          >
            {tick}
          </span>
        ))}
      </div>

      <div className="min-w-[0px] flex-1">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="h-[311px] w-full"
          preserveAspectRatio="none"
          role="img"
          aria-label="Tickets sold per day"
        >
          <defs>
            <linearGradient id="ob-posh-fill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#e8134b" stopOpacity="0.75" />
              <stop offset="100%" stopColor="#e8134b" stopOpacity="0.05" />
            </linearGradient>
          </defs>
          {[0, 1, 2, 3].map((index) => (
            <line
              key={index}
              x1={0}
              x2={width}
              y1={(height / 3) * index}
              y2={(height / 3) * index}
              stroke="var(--ob-border-strong)"
              strokeWidth={1}
              strokeDasharray="4 6"
              vectorEffect="non-scaling-stroke"
            />
          ))}
          <path d={`${path} L${width},${height} L0,${height} Z`} fill="url(#ob-posh-fill)" />
          <path
            d={path}
            fill="none"
            stroke="#e8134b"
            strokeWidth={2.5}
            vectorEffect="non-scaling-stroke"
          />
        </svg>

        <div className="flex pt-[9px]">
          {DAYS.map((day) => (
            <span key={day} className="flex-1 text-[0.704rem] text-[color:var(--ob-muted)]">
              <span
                className="inline-block whitespace-nowrap"
                style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
              >
                {day}
              </span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
