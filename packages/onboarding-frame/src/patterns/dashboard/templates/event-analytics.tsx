"use client";

import type { ReactNode } from "react";
import { Donut } from "../../../ui/charts";
import { cn } from "../../../lib/cn";
import { AvatarSlot, Placeholder, WordmarkSlot } from "../../../ui/placeholder";
import { Surface, eventTokens } from "./tokens";
import { Main, NavItem, NavSection, Shell, Sidebar } from "./chrome";
import type { TemplateProps } from "./props";

export type EventPage = "analytics" | "rsvps" | "tracking";

export interface EventAnalyticsProps extends TemplateProps {
  page?: EventPage;
}

const NAV = [
  { id: "overview", label: "Overview", glyph: "▥" },
  { id: "experiences", label: "Experiences", glyph: "▦" },
  { id: "schedule", label: "Schedule", glyph: "▤" },
  { id: "members", label: "Members", glyph: "👥" },
  { id: "plans", label: "Plans", glyph: "◆" },
  { id: "codes", label: "Discount Codes", glyph: "◎" },
  { id: "perks", label: "Perks", glyph: "★" },
  { id: "transactions", label: "Transactions", glyph: "▭" },
  { id: "pricing", label: "Market & Pricing", glyph: "%" },
];

const GROUPS = [
  { label: "Front Desk", items: [{ id: "checkin", label: "Check-in", glyph: "▨" }, { id: "pos", label: "Point of Sale", glyph: "▣" }] },
  { label: "Campaigns", items: [{ id: "email", label: "Email & SMS", glyph: "✉" }] },
  {
    label: "Other",
    items: [
      { id: "settings", label: "Settings", glyph: "⚙" },
      { id: "team", label: "Team", glyph: "👤" },
      { id: "integrations", label: "Integrations", glyph: "⑄" },
      { id: "embeds", label: "Embeds", glyph: "</>" },
    ],
  },
];

const STATS = [
  { id: "rsvps", label: "RSVPs", value: "6" },
  { id: "views", label: "Event page views", value: "7" },
  { id: "conversion", label: "Conversion Rate", value: "71%", info: true },
];

/**
 * Dark event analytics.
 *
 * The numbers are those of one small real event — six RSVPs, nobody checked in
 * yet — so the capacity and check-in bars are honestly near-empty. Filling them
 * with plausible-looking figures would hide the state this screen exists to
 * show: an organiser looking at an event that has not happened.
 */
export function EventAnalyticsTemplate({
  className,
  page = "analytics",
}: EventAnalyticsProps) {
  return (
    <Surface tokens={eventTokens} className={className}>
      <Shell>
        <Sidebar width={278} bg="var(--ob-bg)" className="relative">
          <div className="flex items-center gap-2.5 px-5 pb-5 pt-6">
            <WordmarkSlot width={120} height={18} label="" />
          </div>

          <nav className="grid gap-0.5 px-3">
            {NAV.map((item) => (
              <NavItem key={item.id} label={item.label} glyph={item.glyph} />
            ))}
          </nav>

          {GROUPS.map((group) => (
            <div key={group.label}>
              <NavSection label={group.label} />
              <nav className="grid gap-0.5 px-3">
                {group.items.map((item) => (
                  <NavItem key={item.id} label={item.label} glyph={item.glyph} />
                ))}
              </nav>
            </div>
          ))}

          <NavSection label="Help" />
          <nav className="grid gap-0.5 px-3 pb-5">
            <NavItem
              label="Resource Center"
              glyph="▤"
              trailing={
                <span aria-hidden className="text-[0.75rem] text-[color:var(--ob-muted)]">
                  ↗
                </span>
              }
            />
          </nav>

          {/* The collapse control straddles the sidebar edge in the reference. */}
          <span className="absolute -right-3 top-1/2 grid size-6 place-items-center rounded-full border border-[color:var(--ob-border-strong)] bg-[color:var(--ob-surface2,var(--ob-surface-2))] text-[0.7rem] text-[color:var(--ob-fg-soft)]">
            ‹
          </span>
        </Sidebar>

        <Main className="overflow-auto">
          <header className="flex items-center gap-3 px-6 py-4">
            <span className="flex items-center gap-2 text-[0.98rem] font-medium">
              <span aria-hidden>‹</span> Back
            </span>
            <span className="ml-auto" aria-hidden>
              ▣
            </span>
            <span className="flex items-center gap-2.5 rounded-[var(--ob-radius-sm)] border border-[color:var(--ob-border)] px-3 py-1.5">
              <AvatarSlot size={22} />
              <span className="leading-tight">
                <span className="block text-[0.66rem] uppercase tracking-wide text-[color:var(--ob-muted)]">
                  Community
                </span>
                <span className="block text-[0.92rem] font-semibold">ASAcme</span>
              </span>
              <span aria-hidden className="text-[0.7rem] text-[color:var(--ob-muted)]">
                ⌃⌄
              </span>
            </span>
          </header>

          <div className="grid gap-5 px-6 pb-8">
            <section className="flex items-center gap-4 rounded-[var(--ob-radius)] border border-[color:var(--ob-border)] bg-[color:var(--ob-surface)] p-5">
              <Placeholder width={56} height={56} radius={10} label="" />
              <div className="min-w-0 flex-1">
                <h1 className="flex items-center gap-2.5 text-[1.35rem] font-bold tracking-[-0.01em]">
                  ASAcme gathering
                  <span className="flex items-center gap-1.5 text-[0.8rem] text-[color:var(--ob-muted)]">
                    <GlyphBtn>↗</GlyphBtn>
                    <GlyphBtn>⧉</GlyphBtn>
                    <GlyphBtn>▦</GlyphBtn>
                  </span>
                </h1>
                <p className="pt-1 text-[0.95rem] text-[color:var(--ob-muted)]">
                  Jul 11th, 12:00 AM - 2:00 AM CDT · Chicago, IL
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-2.5">
                <OutlinePill glyph="👤">Add attendee</OutlinePill>
                <OutlinePill glyph="✎">Edit</OutlinePill>
                <OutlinePill>···</OutlinePill>
              </div>
            </section>

            <nav className="flex gap-7 border-b border-[color:var(--ob-border)] px-1">
              {[
                { id: "rsvps", label: "RSVPs" },
                { id: "analytics", label: "Analytics" },
                { id: "tracking", label: "Tracking links" },
              ].map((tab) => (
                <span
                  key={tab.id}
                  className={cn(
                    "pb-3 text-[0.98rem]",
                    tab.id === page
                      ? "border-b-2 border-[color:var(--ob-fg)] font-semibold"
                      : "text-[color:var(--ob-muted)]",
                  )}
                >
                  {tab.label}
                </span>
              ))}
            </nav>

            {page === "analytics" && <Analytics />}
            {page === "rsvps" && <Rsvps />}
            {page === "tracking" && <Tracking />}
          </div>
        </Main>
      </Shell>
    </Surface>
  );
}

function Analytics() {
  return (
    <>
      <div className="flex items-center gap-3">
        <div className="inline-flex rounded-full border border-[color:var(--ob-border)] bg-[color:var(--ob-surface)] p-1">
          {["All time", "7d", "14d", "30d"].map((range) => (
            <span
              key={range}
              className={cn(
                "rounded-full px-4 py-1.5 text-[0.9rem]",
                range === "All time"
                  ? "bg-[color:var(--ob-surface-3)] font-semibold"
                  : "text-[color:var(--ob-muted)]",
              )}
            >
              {range}
            </span>
          ))}
        </div>
        <span className="ml-auto grid size-9 place-items-center rounded-full border border-[color:var(--ob-border)] text-[color:var(--ob-fg-soft)]">
          ↻
        </span>
      </div>

      <div className="grid gap-5 sm:grid-cols-3">
        {STATS.map((stat) => (
          <section
            key={stat.id}
            className="rounded-[var(--ob-radius)] border border-[color:var(--ob-border)] bg-[color:var(--ob-surface)] p-5"
          >
            <p className="flex items-center gap-1.5 text-[0.98rem] text-[color:var(--ob-fg-soft)]">
              {stat.label}
              {stat.info && <InfoDot />}
            </p>
            <p className="pt-1 text-[1.75rem] font-bold tabular-nums">{stat.value}</p>
          </section>
        ))}
      </div>

      <div className="grid gap-5 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)]">
        <section className="rounded-[var(--ob-radius)] border border-[color:var(--ob-border)] bg-[color:var(--ob-surface)] p-6">
          <div className="flex items-center gap-3">
            <h2 className="flex-1 text-[1.12rem] font-bold">Tickets Sales</h2>
            <span aria-hidden className="text-[color:var(--ob-muted)]">
              ✎
            </span>
          </div>

          <div className="flex items-center gap-10 pt-6">
            {/* One tier only, so the ring is a full circle rather than a split. */}
            <Donut
              size={198}
              thickness={9}
              segments={[{ id: "free", value: 6, color: "#b96bff" }]}
              center={
                <span className="grid place-items-center">
                  <span className="text-[1.8rem] font-bold leading-none tabular-nums">6</span>
                  <span className="pt-1 text-[0.88rem] text-[color:var(--ob-muted)]">
                    Tickets sold
                  </span>
                </span>
              }
            />
            <div className="flex-1">
              <div className="flex items-center gap-3">
                <span aria-hidden className="size-3 rounded-[3px] bg-[#b96bff]" />
                <span className="flex-1 text-[0.98rem]">Free</span>
                <span className="tabular-nums">6</span>
                <span className="rounded-full bg-[color:var(--ob-surface-3)] px-2 py-0.5 text-[0.78rem] font-semibold">
                  100%
                </span>
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-[var(--ob-radius)] border border-[color:var(--ob-border)] bg-[color:var(--ob-surface)] p-6">
          <div className="flex items-center gap-3">
            <h2 className="flex-1 text-[1.12rem] font-bold">Retention Rate</h2>
            <span aria-hidden className="text-[color:var(--ob-muted)]">
              ›
            </span>
          </div>

          <div className="grid justify-items-center pt-5">
            <span className="relative">
              <Donut
                size={122}
                thickness={7}
                segments={[{ id: "first", value: 5, color: "#5ddb9a" }]}
              />
              {/* The count rides the ring itself in the reference. */}
              <span className="absolute -left-2 top-1/2 grid size-6 -translate-y-1/2 place-items-center rounded-full bg-[color:var(--ob-fg)] text-[0.72rem] font-bold text-[color:var(--ob-bg)]">
                5
              </span>
            </span>
          </div>

          <ul className="grid gap-2.5 pt-5">
            {[
              { label: "First Timer", value: "5", pct: "100%", color: "#5ddb9a" },
              { label: "Returning", value: "0", pct: "0%", color: "#ff5f8a" },
            ].map((row) => (
              <li key={row.label} className="flex items-center gap-3">
                <span
                  aria-hidden
                  className="size-3 rounded-[3px]"
                  style={{ background: row.color }}
                />
                <span className="flex-1 text-[0.98rem]">{row.label}</span>
                <span className="tabular-nums">{row.value}</span>
                <span className="rounded-full bg-[color:var(--ob-surface-3)] px-2 py-0.5 text-[0.78rem] font-semibold">
                  {row.pct}
                </span>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <MeterCard
          title="Event Capacity"
          note="10 spots"
          rows={[
            { label: "Spots Taken", value: "6", color: "#5ddb9a" },
            { label: "Spots Remaining", value: "4", color: "var(--ob-surface-3)" },
          ]}
          fill={60}
        />
        <MeterCard
          title="Check-in"
          note="6 tickets"
          rows={[
            { label: "Checked-in", value: "0", color: "#5ddb9a" },
            { label: "No shows yet", value: "6", color: "var(--ob-surface-3)" },
          ]}
          fill={0}
        />
      </div>

      <section className="rounded-[var(--ob-radius)] border border-[color:var(--ob-border)] bg-[color:var(--ob-surface)] p-6">
        <div className="flex items-center gap-3">
          <h2 className="flex-1 text-[1.12rem] font-bold">RSVPs</h2>
          <span aria-hidden className="text-[color:var(--ob-muted)]">
            ›
          </span>
        </div>
        <p className="flex items-center gap-2.5 pt-3">
          <span className="text-[1.6rem] font-bold tabular-nums">6</span>
          <span className="rounded-full bg-[color-mix(in_oklab,#5ddb9a_18%,transparent)] px-2 py-0.5 text-[0.78rem] font-semibold text-[color:var(--ob-success)]">
            ↑100%
          </span>
        </p>
      </section>
    </>
  );
}

function MeterCard({
  title,
  note,
  rows,
  fill,
}: {
  title: string;
  note: string;
  rows: { label: string; value: string; color: string }[];
  fill: number;
}) {
  return (
    <section className="rounded-[var(--ob-radius)] border border-[color:var(--ob-border)] bg-[color:var(--ob-surface)] p-6">
      <div className="flex items-center gap-3">
        <h2 className="flex-1 text-[1.12rem] font-bold">{title}</h2>
        <span className="text-[0.92rem] text-[color:var(--ob-fg-soft)]">{note}</span>
      </div>

      <ul className="grid gap-2.5 pt-4">
        {rows.map((row) => (
          <li key={row.label} className="flex items-center gap-3">
            <span
              aria-hidden
              className="size-2 rounded-[2px]"
              style={{ background: row.color }}
            />
            <span className="flex-1 text-[0.98rem]">{row.label}</span>
            <span className="tabular-nums">{row.value}</span>
          </li>
        ))}
      </ul>

      <span className="mt-5 block h-1.5 overflow-hidden rounded-full bg-[color:var(--ob-surface-3)]">
        {/* A zero fill still shows a dot, so "none yet" is visibly not "no data". */}
        <span
          className="block h-full rounded-full bg-[color:var(--ob-success)]"
          style={{ width: fill === 0 ? "6px" : `${fill}%` }}
        />
      </span>
    </section>
  );
}

function GlyphBtn({ children }: { children: ReactNode }) {
  return (
    <span className="grid size-6 place-items-center rounded-[6px] border border-[color:var(--ob-border)] text-[0.72rem]">
      {children}
    </span>
  );
}

function OutlinePill({ children, glyph }: { children: ReactNode; glyph?: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-[color:var(--ob-border-strong)] px-3.5 py-2 text-[0.9rem] font-medium">
      {glyph && (
        <span aria-hidden className="text-[color:var(--ob-muted)]">
          {glyph}
        </span>
      )}
      {children}
    </span>
  );
}

function InfoDot() {
  return (
    <span
      aria-hidden
      className="grid size-[15px] shrink-0 place-items-center rounded-full border border-[color:var(--ob-border-strong)] text-[0.6rem] text-[color:var(--ob-muted)]"
    >
      i
    </span>
  );
}

function Rsvps() {
  const people = [
    { id: "p1", name: "Jordan Alvarez", tier: "Free", when: "Jul 2", checked: false },
    { id: "p2", name: "Priya Raman", tier: "Free", when: "Jul 3", checked: false },
    { id: "p3", name: "Sam Okafor", tier: "Free", when: "Jul 5", checked: false },
    { id: "p4", name: "Mei Tanaka", tier: "Free", when: "Jul 5", checked: false },
    { id: "p5", name: "Chris Bell", tier: "Free", when: "Jul 7", checked: false },
    { id: "p6", name: "Dana Whitfield", tier: "Free", when: "Jul 9", checked: false },
  ];

  return (
    <section className="overflow-hidden rounded-[var(--ob-radius)] border border-[color:var(--ob-border)] bg-[color:var(--ob-surface)]">
      <div className="grid grid-cols-[minmax(0,1fr)_110px_110px_130px] px-5 py-3 text-[0.85rem] text-[color:var(--ob-muted)]">
        <span>Attendee</span>
        <span>Ticket</span>
        <span>RSVP&rsquo;d</span>
        <span className="text-right">Check-in</span>
      </div>
      {people.map((person) => (
        <div
          key={person.id}
          className="grid grid-cols-[minmax(0,1fr)_110px_110px_130px] items-center border-t border-[color:var(--ob-border)] px-5 py-3.5 text-[0.95rem]"
        >
          <span className="flex items-center gap-2.5">
            <AvatarSlot size={28} />
            {person.name}
          </span>
          <span className="text-[color:var(--ob-fg-soft)]">{person.tier}</span>
          <span className="text-[color:var(--ob-muted)]">{person.when}</span>
          <span className="text-right text-[color:var(--ob-muted)]">Not yet</span>
        </div>
      ))}
    </section>
  );
}

function Tracking() {
  const links = [
    { id: "l1", label: "Instagram bio", clicks: 4, rsvps: 3 },
    { id: "l2", label: "Newsletter", clicks: 2, rsvps: 2 },
    { id: "l3", label: "Partner gym", clicks: 1, rsvps: 1 },
    { id: "l4", label: "Flyer QR", clicks: 0, rsvps: 0 },
  ];

  return (
    <section className="overflow-hidden rounded-[var(--ob-radius)] border border-[color:var(--ob-border)] bg-[color:var(--ob-surface)]">
      <div className="grid grid-cols-[minmax(0,1fr)_110px_110px_130px] px-5 py-3 text-[0.85rem] text-[color:var(--ob-muted)]">
        <span>Source</span>
        <span className="text-right">Clicks</span>
        <span className="text-right">RSVPs</span>
        <span className="text-right">Conversion</span>
      </div>
      {links.map((link) => (
        <div
          key={link.id}
          className="grid grid-cols-[minmax(0,1fr)_110px_110px_130px] items-center border-t border-[color:var(--ob-border)] px-5 py-3.5 text-[0.95rem]"
        >
          <span className="font-medium">{link.label}</span>
          <span className="text-right tabular-nums">{link.clicks}</span>
          <span className="text-right tabular-nums">{link.rsvps}</span>
          {/* No clicks means no rate to quote, so it says so. */}
          <span className="text-right tabular-nums text-[color:var(--ob-muted)]">
            {link.clicks === 0
              ? "—"
              : `${Math.round((link.rsvps / link.clicks) * 100)}%`}
          </span>
        </div>
      ))}
    </section>
  );
}
