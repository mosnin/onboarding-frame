"use client";

import type { ReactNode } from "react";
import { cn } from "../../../lib/cn";
import { AvatarSlot, LogoSlot, Placeholder, WordmarkSlot } from "../../../ui/placeholder";
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
export function EventConsoleTemplate({ className, page = "overview" }: EventConsoleProps) {
  return (
    <Surface tokens={eventConsoleTokens} className={className}>
      <Shell className="flex-col">
        <header className="flex h-[104px] shrink-0 items-center gap-5 px-8">
          <WordmarkSlot width={110} height={28} label="" />

          {/* The nav is a floating pill, not a bar. */}
          <nav className="mx-auto flex items-center gap-2 rounded-full bg-[color:var(--ob-surface-2)] px-3 py-2.5">
            {TABS.map((tab) => (
              <span
                key={tab}
                className={cn(
                  "rounded-full px-5 py-2 text-[1.08rem]",
                  tab.toLowerCase() === page
                    ? "font-semibold text-[color:var(--ob-fg)]"
                    : "text-[color:var(--ob-muted)]",
                )}
              >
                {tab}
              </span>
            ))}
          </nav>

          <span className="flex items-center gap-5">
            <AvatarSlot size={36} />
            <span aria-hidden className="text-[1.15rem]">
              ⌾
            </span>
            <span aria-hidden className="text-[1.3rem]">
              ☰
            </span>
          </span>
        </header>

        <Main className="overflow-auto px-8 pb-10">
          <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_420px]">
            <div>
              <div className="flex flex-wrap items-center gap-5">
                <LogoSlot size={72} label="" radius={36} />
                <h1 className="text-[2.2rem] font-bold tracking-[-0.01em]">Acme</h1>

                <span className="flex items-center gap-2.5 pl-4 text-[1.08rem]">
                  <span aria-hidden className="text-[color:var(--ob-muted)]">
                    ⛰
                  </span>
                  Apprentice
                  <span
                    aria-hidden
                    className="grid size-5 place-items-center rounded-full border border-[color:var(--ob-border-strong)] text-[0.68rem] text-[color:var(--ob-muted)]"
                  >
                    ?
                  </span>
                </span>

                <span className="ml-auto flex min-w-[320px] flex-col gap-2">
                  <span className="text-right text-[1.08rem] text-[color:var(--ob-fg-soft)]">
                    $0 / $100,000
                  </span>
                  {/* Nothing earned yet, so the track stays empty. */}
                  <span className="block h-1.5 rounded-full bg-[color:var(--ob-surface-3)]" />
                </span>
              </div>

              <div className="flex flex-wrap items-stretch gap-5 pt-6">
                {[
                  { id: "events", label: "Events", value: "4" },
                  { id: "attendees", label: "Total attendees", value: "3" },
                ].map((stat) => (
                  <section
                    key={stat.id}
                    className="grid flex-1 justify-items-center rounded-[var(--ob-radius)] border border-[color:var(--ob-border)] px-8 py-6"
                  >
                    <p className="text-[0.95rem] font-medium uppercase tracking-wide text-[color:var(--ob-muted)]">
                      {stat.label}
                    </p>
                    <p className="pt-2 text-[1.9rem] font-bold leading-none tabular-nums">
                      {stat.value}
                    </p>
                  </section>
                ))}
                <span className="grid place-items-center rounded-full bg-[color:var(--ob-cta-bg)] px-9 text-[1.15rem] font-semibold text-[color:var(--ob-cta-fg)]">
                  + Create New Event
                </span>
              </div>

              <section className="relative mt-5 rounded-[var(--ob-radius)] border border-[color:var(--ob-border)] p-6">
                <span
                  aria-hidden
                  className="absolute right-6 top-6 grid size-10 place-items-center rounded-full bg-[color:var(--ob-surface-2)] text-[1rem]"
                >
                  ↻
                </span>
                <TicketChart />
              </section>

              <div className="flex flex-wrap items-end gap-4 pt-5">
                <div className="flex-1">
                  <p className="text-[0.95rem] font-medium uppercase tracking-wide text-[color:var(--ob-muted)]">
                    Tickets this week
                  </p>
                  <p className="pt-1 text-[1.6rem] font-bold tabular-nums leading-none">
                    4
                  </p>
                </div>
                <span className="inline-flex rounded-[var(--ob-radius)] border border-[color:var(--ob-border)] p-1">
                  {["1W", "1M", "ALL"].map((range, index) => (
                    <span
                      key={range}
                      className={cn(
                        "rounded-[var(--ob-radius-sm)] px-5 py-2 text-[1.05rem]",
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

              <h2 className="pb-4 pt-9 text-[1.6rem] font-bold">Events</h2>
              <section className="rounded-[var(--ob-radius)] border border-[color:var(--ob-border)] p-6">
                <div className="flex items-start gap-4">
                  <div className="flex-1">
                    <p className="text-[1.05rem] italic text-[color:var(--ob-muted)]">
                      Event series:
                    </p>
                    <h3 className="pt-1 text-[1.5rem] font-bold">
                      Cookie Meet-Up: Taste, Trade, &amp; Chat
                    </h3>
                    <p className="flex items-center gap-2 pt-2 text-[1.05rem] text-[color:var(--ob-success)]">
                      ● Live
                    </p>
                  </div>
                  <span className="flex items-center gap-4 text-[color:var(--ob-fg-soft)]">
                    <span aria-hidden>✎</span>
                    <span aria-hidden>◉</span>
                  </span>
                </div>

                <div className="relative mt-5 overflow-hidden rounded-[var(--ob-radius)]">
                  <Placeholder height={190} radius={0} label="Event banner" />
                  <span className="absolute inset-x-6 bottom-6 flex items-end gap-4">
                    <span className="flex-1 text-[1.3rem] font-bold">
                      Cookie Meet-Up: Taste, Trade, &amp; Chat
                    </span>
                    {["3", "13"].map((value) => (
                      <span
                        key={value}
                        className="grid h-14 w-20 place-items-center rounded-[var(--ob-radius)] bg-[color-mix(in_oklab,#000000_55%,transparent)] text-[1.2rem] font-bold tabular-nums"
                      >
                        {value}
                      </span>
                    ))}
                  </span>
                </div>
              </section>
            </div>

            <aside>
              <h2 className="pb-4 text-[1.6rem] font-bold">Orders</h2>

              <span className="flex items-center gap-3 pb-4">
                <span aria-hidden className="text-[1.15rem] text-[color:var(--ob-muted)]">
                  ⌕
                </span>
                <span className="flex-1 rounded-[var(--ob-radius)] border border-[color:var(--ob-border)] px-4 py-3 text-[1.02rem] text-[color:var(--ob-muted)]">
                  Search (Event Name, Attendee Name, Email, Order
                </span>
              </span>

              <div className="grid gap-4">
                {ORDERS.map((order) => (
                  <article
                    key={order.id}
                    className="flex items-start gap-4 rounded-[var(--ob-radius)] bg-[color:var(--ob-surface)] p-5"
                  >
                    {order.avatar ? (
                      <AvatarSlot size={56} />
                    ) : (
                      <span
                        aria-hidden
                        className="grid size-14 shrink-0 place-items-center rounded-full bg-[color:var(--ob-surface-3)] text-[1.3rem] text-[color:var(--ob-muted)]"
                      >
                        👤
                      </span>
                    )}
                    <div className="min-w-0 flex-1">
                      <p className="text-[1.15rem] font-semibold">{order.name}</p>
                      <p className="pt-1 text-[1.02rem] text-[color:var(--ob-muted)]">
                        {order.when}
                      </p>
                      <p className="truncate pt-0.5 text-[1.02rem] text-[color:var(--ob-muted)]">
                        {order.event}
                      </p>
                      {order.series && (
                        <span className="mt-2 inline-flex items-center gap-1.5 rounded-[var(--ob-radius-sm)] bg-[color:var(--ob-surface-2)] px-2.5 py-1 text-[0.95rem] text-[color:var(--ob-fg-soft)]">
                          <span aria-hidden>🔗</span> series
                        </span>
                      )}
                    </div>
                    <div className="shrink-0 text-right">
                      <p className="text-[1.05rem]">Order {order.order}</p>
                      <p className="pt-2 text-[1.2rem] font-bold tabular-nums">
                        {order.total}
                      </p>
                    </div>
                  </article>
                ))}
              </div>

              <span className="mt-4 block rounded-[var(--ob-radius)] border border-[color:var(--ob-border)] py-4 text-center text-[1.12rem] font-medium">
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
    <div className="flex gap-4">
      <div className="grid shrink-0 text-right text-[1rem] tabular-nums text-[color:var(--ob-muted)]">
        {[3, 2, 1, 0].map((tick, index) => (
          <span
            key={tick}
            className={cn("leading-none", index > 0 && "mt-[calc((420px/3)-0.8em)]")}
          >
            {tick}
          </span>
        ))}
      </div>

      <div className="min-w-0 flex-1">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="h-[420px] w-full"
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

        <div className="flex pt-3">
          {DAYS.map((day) => (
            <span key={day} className="flex-1 text-[0.95rem] text-[color:var(--ob-muted)]">
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
