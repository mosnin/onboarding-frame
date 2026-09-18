"use client";

import type { ReactNode } from "react";
import { Donut } from "../../../ui/charts";
import {
  ArrowClockwiseIcon,
  ArrowUpIcon,
  ArrowUpRightIcon,
  ArticleIcon,
  BarcodeIcon,
  CalendarIcon,
  CaretLeftIcon,
  CaretRightIcon,
  CardIcon,
  CaretUpDownIcon,
  CodeIcon,
  CopyIcon,
  EnvelopeIcon,
  GearIcon,
  GridFourIcon,
  LifebuoyIcon,
  PencilIcon,
  PercentIcon,
  QrCodeIcon,
  StarIcon,
  StorefrontIcon,
  TicketIcon,
  UserIcon,
  UsersIcon,
  WrenchIcon,
} from "../../../ui/icons-solid";
import { Avatar, Thumb } from "../../../ui/avatar";
import { Wordmark } from "../../../ui/wordmark";
import { cn } from "../../../lib/cn";
import { Surface, eventTokens } from "./tokens";
import { Main, NavItem, NavSection, Shell, Sidebar } from "./chrome";
import type { TemplateProps } from "./props";

export type EventPage = "analytics" | "rsvps" | "tracking";

export interface EventAnalyticsProps extends TemplateProps {
  page?: EventPage;
}

const NAV = [
  { id: "overview", label: "Overview", Icon: GridFourIcon },
  { id: "experiences", label: "Experiences", Icon: TicketIcon },
  { id: "schedule", label: "Schedule", Icon: CalendarIcon },
  { id: "members", label: "Members", Icon: UsersIcon },
  { id: "plans", label: "Plans", Icon: StarIcon },
  { id: "codes", label: "Discount Codes", Icon: BarcodeIcon },
  { id: "perks", label: "Perks", Icon: StarIcon },
  { id: "transactions", label: "Transactions", Icon: CardIcon },
  { id: "pricing", label: "Market & Pricing", Icon: PercentIcon },
];

const GROUPS = [
  { label: "Front Desk", items: [{ id: "checkin", label: "Check-in", Icon: StorefrontIcon }, { id: "pos", label: "Point of Sale", Icon: CardIcon }] },
  { label: "Campaigns", items: [{ id: "email", label: "Email & SMS", Icon: EnvelopeIcon }] },
  {
    label: "Other",
    items: [
      { id: "settings", label: "Settings", Icon: GearIcon },
      { id: "team", label: "Team", Icon: UserIcon },
      { id: "integrations", label: "Integrations", Icon: WrenchIcon },
      { id: "embeds", label: "Embeds", Icon: CodeIcon },
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
  brandName = "Acme",
  className,
  page = "analytics",
}: EventAnalyticsProps) {
  return (
    <Surface tokens={eventTokens} className={className}>
      <Shell>
        <Sidebar width={209} bg="var(--ob-bg)" className="relative">
          <div className="flex items-center gap-[9px] px-[17px] pb-[9px] pt-[16px]">
            <Wordmark name={brandName} size={13} mark={18} radius={5} />
          </div>

          <nav className="grid px-[10px]">
            {NAV.map((item) => (
              <NavItem
                key={item.id}
                label={item.label}
                glyph={<item.Icon size={15} />}
                className="gap-[13px] px-[12px] py-[7px] text-[0.86rem]"
              />
            ))}
          </nav>

          {GROUPS.map((group) => (
            <div key={group.label}>
              <NavSection label={group.label} />
              <nav className="grid px-[10px]">
                {group.items.map((item) => (
                  <NavItem
                key={item.id}
                label={item.label}
                glyph={<item.Icon size={15} />}
                className="gap-[13px] px-[12px] py-[7px] text-[0.86rem]"
              />
                ))}
              </nav>
            </div>
          ))}

          <NavSection label="Help" />
          <nav className="grid px-[10px] pb-[17px]">
            <NavItem
              label="Resource Center"
              className="gap-[13px] px-[12px] py-[7px] text-[0.86rem]"
              glyph={<ArticleIcon size={15} />}
              trailing={
                <ArrowUpRightIcon size={10} className="text-[color:var(--ob-muted)]" />
              }
            />
          </nav>

          {/* The collapse control straddles the sidebar edge in the reference. */}
          <span className="absolute -right-[10px] top-1/2 grid size-[21px] place-items-center rounded-full border border-[color:var(--ob-border-strong)] bg-[color:var(--ob-surface2,var(--ob-surface-2))] text-[color:var(--ob-fg-soft)]">
            <CaretLeftIcon size={10} />
          </span>
        </Sidebar>

        <Main className="overflow-auto">
          <header className="flex items-center gap-[10px] px-[21px] py-[14px]">
            <span className="flex items-center gap-[7px] text-[0.858rem] font-medium">
              <CaretLeftIcon size={13} /> Back
            </span>
            <span className="ml-auto text-[color:var(--ob-fg-soft)]">
              <StorefrontIcon size={20} />
            </span>
            <span className="h-[27px] w-px bg-[color:var(--ob-border)]" />
            <span className="flex items-center gap-[9px] rounded-[var(--ob-radius-sm)] border border-[color:var(--ob-border)] px-[10px] py-[6px]">
              <Avatar name="Community" size={20} />
              <span className="leading-tight">
                <span className="block text-[0.578rem] uppercase tracking-wide text-[color:var(--ob-muted)]">
                  Community
                </span>
                <span className="block text-[0.805rem] font-semibold">ASAcme</span>
              </span>
              <span className="text-[color:var(--ob-muted)]">
                <CaretUpDownIcon size={12} />
              </span>
            </span>
          </header>

          <div className="grid gap-[17px] px-[21px] pb-[28px]">
            <section className="flex items-center gap-[14px] rounded-[var(--ob-radius)] border border-[color:var(--ob-border)] bg-[color:var(--ob-surface)] p-[17px]">
              <span className="block size-[49px] shrink-0">
                <Thumb seed="acme-gathering" radius={9} alt="Event cover" />
              </span>
              <div className="min-w-[0px] flex-1">
                <h1 className="flex items-center gap-[9px] text-[1.182rem] font-bold tracking-[-0.01em]">
                  ASAcme gathering
                  <span className="flex items-center gap-[6px] text-[0.701rem] text-[color:var(--ob-muted)]">
                    <GlyphBtn><ArrowUpRightIcon size={12} /></GlyphBtn>
                    <GlyphBtn><CopyIcon size={12} /></GlyphBtn>
                    <GlyphBtn><QrCodeIcon size={12} /></GlyphBtn>
                  </span>
                </h1>
                <p className="pt-[3px] text-[0.832rem] text-[color:var(--ob-muted)]">
                  Jul 11th, 12:00 AM - 2:00 AM CDT · Chicago, IL
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-[9px]">
                <OutlinePill glyph={<UserIcon size={13} />}>Add attendee</OutlinePill>
                <OutlinePill glyph={<PencilIcon size={13} />}>Edit</OutlinePill>
                <OutlinePill>···</OutlinePill>
              </div>
            </section>

            <nav className="flex gap-[24px] border-b border-[color:var(--ob-border)] px-[3px]">
              {[
                { id: "rsvps", label: "RSVPs" },
                { id: "analytics", label: "Analytics" },
                { id: "tracking", label: "Tracking links" },
              ].map((tab) => (
                <span
                  key={tab.id}
                  className={cn(
                    "pb-[10px] text-[0.858rem]",
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
      <div className="flex items-center gap-[10px]">
        <div className="inline-flex rounded-full border border-[color:var(--ob-border)] bg-[color:var(--ob-surface)] p-[3px]">
          {["All time", "7d", "14d", "30d"].map((range) => (
            <span
              key={range}
              className={cn(
                "rounded-full px-[14px] py-[6px] text-[0.788rem]",
                range === "All time"
                  ? "bg-[color:var(--ob-surface-3)] font-semibold"
                  : "text-[color:var(--ob-muted)]",
              )}
            >
              {range}
            </span>
          ))}
        </div>
        <span className="ml-auto grid size-[31px] place-items-center rounded-full border border-[color:var(--ob-border)] text-[color:var(--ob-fg-soft)]">
          <ArrowClockwiseIcon size={13} />
        </span>
      </div>

      <div className="grid gap-[17px] sm:grid-cols-3">
        {STATS.map((stat) => (
          <section
            key={stat.id}
            className="rounded-[var(--ob-radius)] border border-[color:var(--ob-border)] bg-[color:var(--ob-surface)] p-[17px]"
          >
            <p className="flex items-center gap-[6px] text-[0.858rem] text-[color:var(--ob-fg-soft)]">
              {stat.label}
              {stat.info && <InfoDot />}
            </p>
            <p className="pt-[3px] text-[1.532rem] font-bold tabular-nums">{stat.value}</p>
          </section>
        ))}
      </div>

      <div className="grid gap-[17px] lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)]">
        <section className="rounded-[var(--ob-radius)] border border-[color:var(--ob-border)] bg-[color:var(--ob-surface)] p-[21px]">
          <div className="flex items-center gap-[10px]">
            <h2 className="flex-1 text-[0.98rem] font-bold">Tickets Sales</h2>
            <PencilIcon size={13} />
          </div>

          <div className="flex items-center gap-[35px] pt-[21px]">
            {/* One tier only, so the ring is a full circle rather than a split. */}
            <Donut
              size={173}
              thickness={8}
              segments={[{ id: "free", value: 6, color: "#b96bff" }]}
              center={
                <span className="grid place-items-center">
                  <span className="text-[1.575rem] font-bold leading-none tabular-nums">6</span>
                  <span className="pt-[3px] text-[0.77rem] text-[color:var(--ob-muted)]">
                    Tickets sold
                  </span>
                </span>
              }
            />
            <div className="flex-1">
              <div className="flex items-center gap-[10px]">
                <span aria-hidden className="size-[10px] rounded-[2px] bg-[#b96bff]" />
                <span className="flex-1 text-[0.858rem]">Free</span>
                <span className="tabular-nums">6</span>
                <span className="rounded-full bg-[color:var(--ob-surface-3)] px-[7px] py-[2px] text-[0.683rem] font-semibold">
                  100%
                </span>
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-[var(--ob-radius)] border border-[color:var(--ob-border)] bg-[color:var(--ob-surface)] p-[21px]">
          <div className="flex items-center gap-[10px]">
            <h2 className="flex-1 text-[0.98rem] font-bold">Retention Rate</h2>
            <CaretRightIcon size={13} />
          </div>

          <div className="grid justify-items-center pt-[17px]">
            <span className="relative">
              <Donut
                size={107}
                thickness={6}
                segments={[{ id: "first", value: 5, color: "#5ddb9a" }]}
              />
              {/* The count rides the ring itself in the reference. */}
              <span className="absolute -left-[7px] top-1/2 grid size-[21px] -translate-y-1/2 place-items-center rounded-full bg-[color:var(--ob-fg)] text-[0.63rem] font-bold text-[color:var(--ob-bg)]">
                5
              </span>
            </span>
          </div>

          <ul className="grid gap-[9px] pt-[17px]">
            {[
              { label: "First Timer", value: "5", pct: "100%", color: "#5ddb9a" },
              { label: "Returning", value: "0", pct: "0%", color: "#ff5f8a" },
            ].map((row) => (
              <li key={row.label} className="flex items-center gap-[10px]">
                <span
                  aria-hidden
                  className="size-[10px] rounded-[2px]"
                  style={{ background: row.color }}
                />
                <span className="flex-1 text-[0.858rem]">{row.label}</span>
                <span className="tabular-nums">{row.value}</span>
                <span className="rounded-full bg-[color:var(--ob-surface-3)] px-[7px] py-[2px] text-[0.683rem] font-semibold">
                  {row.pct}
                </span>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <div className="grid gap-[17px] lg:grid-cols-2">
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

      <section className="rounded-[var(--ob-radius)] border border-[color:var(--ob-border)] bg-[color:var(--ob-surface)] p-[21px]">
        <div className="flex items-center gap-[10px]">
          <h2 className="flex-1 text-[0.98rem] font-bold">RSVPs</h2>
          <CaretRightIcon size={13} />
        </div>
        <p className="flex items-center gap-[9px] pt-[10px]">
          <span className="text-[1.401rem] font-bold tabular-nums">6</span>
          <span className="rounded-full bg-[color-mix(in_oklab,#5ddb9a_18%,transparent)] px-[7px] py-[2px] text-[0.683rem] font-semibold text-[color:var(--ob-success)]">
            <span className="flex items-center gap-[2px]">
              <ArrowUpIcon size={9} weight="bold" /> 100%
            </span>
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
    <section className="rounded-[var(--ob-radius)] border border-[color:var(--ob-border)] bg-[color:var(--ob-surface)] p-[21px]">
      <div className="flex items-center gap-[10px]">
        <h2 className="flex-1 text-[0.98rem] font-bold">{title}</h2>
        <span className="text-[0.805rem] text-[color:var(--ob-fg-soft)]">{note}</span>
      </div>

      <ul className="grid gap-[9px] pt-[14px]">
        {rows.map((row) => (
          <li key={row.label} className="flex items-center gap-[10px]">
            <span
              aria-hidden
              className="size-[7px] rounded-[2px]"
              style={{ background: row.color }}
            />
            <span className="flex-1 text-[0.858rem]">{row.label}</span>
            <span className="tabular-nums">{row.value}</span>
          </li>
        ))}
      </ul>

      <span className="mt-[17px] block h-[6px] overflow-hidden rounded-full bg-[color:var(--ob-surface-3)]">
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
    <span className="grid size-[23px] place-items-center rounded-full bg-[color:var(--ob-surface-2)] text-[color:var(--ob-fg-soft)]">
      {children}
    </span>
  );
}

function OutlinePill({ children, glyph }: { children: ReactNode; glyph?: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-[6px] rounded-full border border-[color:var(--ob-border-strong)] px-[13px] py-[7px] text-[0.788rem] font-medium">
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
      className="grid size-[13px] shrink-0 place-items-center rounded-full border border-[color:var(--ob-border-strong)] text-[0.526rem] text-[color:var(--ob-muted)]"
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
      <div className="grid grid-cols-[minmax(0,1fr)_110px_110px_130px] px-[17px] py-[10px] text-[0.745rem] text-[color:var(--ob-muted)]">
        <span>Attendee</span>
        <span>Ticket</span>
        <span>RSVP&rsquo;d</span>
        <span className="text-right">Check-in</span>
      </div>
      {people.map((person) => (
        <div
          key={person.id}
          className="grid grid-cols-[minmax(0,1fr)_110px_110px_130px] items-center border-t border-[color:var(--ob-border)] px-[17px] py-[13px] text-[0.832rem]"
        >
          <span className="flex items-center gap-[9px]">
            <Avatar name={person.name} size={24} />
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
      <div className="grid grid-cols-[minmax(0,1fr)_110px_110px_130px] px-[17px] py-[10px] text-[0.745rem] text-[color:var(--ob-muted)]">
        <span>Source</span>
        <span className="text-right">Clicks</span>
        <span className="text-right">RSVPs</span>
        <span className="text-right">Conversion</span>
      </div>
      {links.map((link) => (
        <div
          key={link.id}
          className="grid grid-cols-[minmax(0,1fr)_110px_110px_130px] items-center border-t border-[color:var(--ob-border)] px-[17px] py-[13px] text-[0.832rem]"
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
