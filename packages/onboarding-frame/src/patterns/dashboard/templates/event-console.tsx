"use client";

import type { ReactNode } from "react";
import {
  ArrowClockwiseIcon,
  BellIcon,
  BrowsersIcon,
  CircleFillIcon,
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
        <header className="flex h-[72px] shrink-0 items-center gap-[14px] px-[15px] sm:px-[23px]">
          <Wordmark name={brandName} size={15} mark={21} radius={6} />

          {/* The nav is a floating pill, not a bar. */}
          <nav className="mx-auto flex max-w-full items-center gap-[6px] overflow-x-auto rounded-full bg-[color:var(--ob-surface-2)] px-[8px] py-[7px]">
            {TABS.map((tab) => (
              <span
                key={tab}
                className={cn(
                  "rounded-full px-[14px] py-[6px] text-[0.75rem]",
                  tab.toLowerCase() === page
                    ? "font-semibold text-[color:var(--ob-fg)]"
                    : "text-[color:var(--ob-muted)]",
                )}
              >
                {tab}
              </span>
            ))}
          </nav>

          <span className="flex shrink-0 items-center gap-[8px] sm:gap-[14px]">
            <Avatar name={userName} size={25} />
            <BellIcon size={13} />
            <ListChecksIcon size={13} />
          </span>
        </header>

        <Main className="overflow-auto px-[23px] pb-[28px]">
          <div className="grid gap-[23px] xl:grid-cols-[minmax(0,1fr)_420px]">
            <div>
              <div className="flex flex-wrap items-center gap-[14px]">
                <BrandMark brand="Acme" size={50} label="Acme" />
                <h1 className="text-[1.529rem] font-bold tracking-[-0.01em]">Acme</h1>

                <span className="flex items-center gap-[7px] pl-[11px] text-[0.75rem]">
                  <TreeIcon size={13} />
                  Apprentice
                  <span
                    aria-hidden
                    className="grid size-[14px] place-items-center rounded-full border border-[color:var(--ob-border-strong)] text-[0.473rem] text-[color:var(--ob-muted)]"
                  >
                    ?
                  </span>
                </span>

                <span className="ml-auto flex min-w-[222px] flex-col gap-[6px]">
                  <span className="text-right text-[0.75rem] text-[color:var(--ob-fg-soft)]">
                    $0 / $100,000
                  </span>
                  {/* Nothing earned yet, so the track stays empty. */}
                  <span className="block h-[4px] rounded-full bg-[color:var(--ob-surface-3)]" />
                </span>
              </div>

              <div className="flex flex-wrap items-stretch gap-[14px] pt-[17px]">
                {[
                  { id: "events", label: "Events", value: "4" },
                  { id: "attendees", label: "Total attendees", value: "3" },
                ].map((stat) => (
                  <section
                    key={stat.id}
                    className="grid flex-1 justify-items-center rounded-[var(--ob-radius)] border border-[color:var(--ob-border)] px-[23px] py-[17px]"
                  >
                    <p className="text-[0.66rem] font-medium uppercase tracking-wide text-[color:var(--ob-muted)]">
                      {stat.label}
                    </p>
                    <p className="pt-[6px] text-[1.32rem] font-bold leading-none tabular-nums">
                      {stat.value}
                    </p>
                  </section>
                ))}
                <span className="grid place-items-center rounded-full bg-[color:var(--ob-cta-bg)] px-[25px] text-[0.799rem] font-semibold text-[color:var(--ob-cta-fg)]">
                  + Create New Event
                </span>
              </div>

              <section className="relative mt-[14px] rounded-[var(--ob-radius)] border border-[color:var(--ob-border)] p-[17px]">
                <ArrowClockwiseIcon size={13} />
                <TicketChart />
              </section>

              <div className="flex flex-wrap items-end gap-[11px] pt-[14px]">
                <div className="flex-1">
                  <p className="text-[0.66rem] font-medium uppercase tracking-wide text-[color:var(--ob-muted)]">
                    Tickets this week
                  </p>
                  <p className="pt-[3px] text-[1.112rem] font-bold tabular-nums leading-none">
                    4
                  </p>
                </div>
                <span className="inline-flex rounded-[var(--ob-radius)] border border-[color:var(--ob-border)] p-[3px]">
                  {["1W", "1M", "ALL"].map((range, index) => (
                    <span
                      key={range}
                      className={cn(
                        "rounded-[var(--ob-radius-sm)] px-[14px] py-[6px] text-[0.73rem]",
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

              <h2 className="pb-[11px] pt-[25px] text-[1.112rem] font-bold">Events</h2>
              <section className="rounded-[var(--ob-radius)] border border-[color:var(--ob-border)] p-[17px]">
                <div className="flex items-start gap-[11px]">
                  <div className="flex-1">
                    <p className="text-[0.73rem] italic text-[color:var(--ob-muted)]">
                      Event series:
                    </p>
                    <h3 className="pt-[3px] text-[1.042rem] font-bold">
                      Cookie Meet-Up: Taste, Trade, &amp; Chat
                    </h3>
                    <p className="flex items-center gap-[6px] pt-[6px] text-[0.73rem] text-[color:var(--ob-success)]">
                      <CircleFillIcon size={7} /> Live
                    </p>
                  </div>
                  <span className="flex items-center gap-[11px] text-[color:var(--ob-fg-soft)]">
                    <PencilIcon size={13} />
                    <BrowsersIcon size={13} />
                  </span>
                </div>

                <div className="relative mt-[14px] overflow-hidden rounded-[var(--ob-radius)]">
                  <span className="block h-[132px]">
                    <Thumb seed="cookie-meet-up" radius={0} alt="Event banner" />
                  </span>
                  <span className="absolute inset-x-[17px] bottom-[17px] flex items-end gap-[11px]">
                    <span className="flex-1 text-[0.903rem] font-bold">
                      Cookie Meet-Up: Taste, Trade, &amp; Chat
                    </span>
                    {["3", "13"].map((value) => (
                      <span
                        key={value}
                        className="grid h-[38px] w-[55px] place-items-center rounded-[var(--ob-radius)] bg-[color-mix(in_oklab,#000000_55%,transparent)] text-[0.834rem] font-bold tabular-nums"
                      >
                        {value}
                      </span>
                    ))}
                  </span>
                </div>
              </section>
            </div>

            <aside>
              <h2 className="pb-[11px] text-[1.112rem] font-bold">Orders</h2>

              <span className="flex items-center gap-[8px] pb-[11px]">
                <SearchIcon size={13} />
                <span className="flex-1 rounded-[var(--ob-radius)] border border-[color:var(--ob-border)] px-[11px] py-[8px] text-[0.709rem] text-[color:var(--ob-muted)]">
                  Search (Event Name, Attendee Name, Email, Order
                </span>
              </span>

              <div className="grid gap-[11px]">
                {ORDERS.map((order) => (
                  <article
                    key={order.id}
                    className="flex items-start gap-[11px] rounded-[var(--ob-radius)] bg-[color:var(--ob-surface)] p-[14px]"
                  >
                    {order.avatar ? (
                      <Avatar name={order.name} size={38} />
                    ) : (
                      <UserIcon size={13} />
                    )}
                    <div className="min-w-[0px] flex-1">
                      <p className="text-[0.799rem] font-semibold">{order.name}</p>
                      <p className="pt-[3px] text-[0.709rem] text-[color:var(--ob-muted)]">
                        {order.when}
                      </p>
                      <p className="truncate pt-[1px] text-[0.709rem] text-[color:var(--ob-muted)]">
                        {order.event}
                      </p>
                      {order.series && (
                        <span className="mt-[6px] inline-flex items-center gap-[4px] rounded-[var(--ob-radius-sm)] bg-[color:var(--ob-surface-2)] px-[7px] py-[3px] text-[0.66rem] text-[color:var(--ob-fg-soft)]">
                          <LinkChainIcon size={13} /> series
                        </span>
                      )}
                    </div>
                    <div className="shrink-0 text-right">
                      <p className="text-[0.73rem]">Order {order.order}</p>
                      <p className="pt-[6px] text-[0.834rem] font-bold tabular-nums">
                        {order.total}
                      </p>
                    </div>
                  </article>
                ))}
              </div>

              <span className="mt-[11px] block rounded-[var(--ob-radius)] border border-[color:var(--ob-border)] py-[11px] text-center text-[0.779rem] font-medium">
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
    <div className="flex gap-[11px]">
      <div className="grid shrink-0 text-right text-[0.695rem] tabular-nums text-[color:var(--ob-muted)]">
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
          className="h-[292px] w-full"
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

        <div className="flex pt-[8px]">
          {DAYS.map((day) => (
            <span key={day} className="flex-1 text-[0.66rem] text-[color:var(--ob-muted)]">
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
