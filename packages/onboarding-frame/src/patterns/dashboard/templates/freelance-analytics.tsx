"use client";

import type { ReactNode } from "react";
import {
  ArticleIcon,
  BellIcon,
  BriefcaseIcon,
  BrowsersIcon,
  CardIcon,
  CaretDownIcon,
  ChatDotsIcon,
  ConfettiIcon,
  CrossIcon,
  GlobeIcon,
  GridFourIcon,
  PaletteIcon,
  ShareIcon,
  SparkleIcon,
  UsersIcon,
} from "../../../ui/icons-solid";
import { Avatar } from "../../../ui/avatar";
import { cn } from "../../../lib/cn";
import { Placeholder } from "../../../ui/placeholder";
import { Surface, freelanceTokens } from "./tokens";
import { Main, Shell, Sidebar } from "./chrome";
import type { TemplateProps } from "./props";

export type FreelancePage = "analytics" | "projects" | "profile";

export interface FreelanceAnalyticsProps extends TemplateProps {
  page?: FreelancePage;
}

const RAIL = [
  { id: "home", Icon: BrowsersIcon },
  { id: "messages", Icon: ChatDotsIcon },
  { id: "network", Icon: UsersIcon },
  { id: "divider-1", divider: true },
  { id: "profile", Icon: BrowsersIcon },
  { id: "analytics", Icon: GridFourIcon, active: true },
  { id: "portfolio", Icon: PaletteIcon },
  { id: "divider-2", divider: true },
  { id: "explore", Icon: GlobeIcon },
  { id: "jobs", Icon: BriefcaseIcon },
  { id: "divider-3", divider: true },
  { id: "docs", Icon: ArticleIcon },
  { id: "wallet", Icon: CardIcon },
];

/**
 * Freelancer analytics.
 *
 * The payouts chart is the detail worth keeping: a zero series drawn as a flat
 * line at the *vertical middle* of the card with the fill fading below it,
 * rather than pinned to the floor. It reads as "no data yet" instead of as a
 * measured zero — and the two states are genuinely different for someone who
 * has not invoiced anyone.
 */
export function FreelanceAnalyticsTemplate({
  brandName = "Acme",
  userName = "Alex Rivera",
  className,
  page = "analytics",
}: FreelanceAnalyticsProps) {
  return (
    <Surface tokens={freelanceTokens} className={className}>
      <Shell>
        <Sidebar width={64} bg="var(--ob-surface)" className="items-center">
          <div className="pb-[22px] pt-[14px]">
            <Avatar name={brandName} size={27} rounded={8} />
          </div>
          <div className="pb-[18px]">
            <Avatar name={userName} size={34} />
          </div>
          <nav className="grid w-full justify-items-center gap-[13px]">
            {RAIL.map((item) =>
              item.divider ? (
                <span
                  key={item.id}
                  className="my-[4px] h-px w-[36px] bg-[color:var(--ob-border)]"
                />
              ) : (
                <span
                  key={item.id}
                  className={cn(
                    "grid size-[36px] place-items-center rounded-[var(--ob-radius-sm)]",
                    item.active
                      ? "bg-[color-mix(in_oklab,#7c5cff_14%,transparent)] text-[#5b40d6]"
                      : "text-[color:var(--ob-muted)]",
                  )}
                >
                  {item.Icon ? <item.Icon size={16} /> : null}
                </span>
              ),
            )}
          </nav>
          <span className="mb-[22px] mt-auto grid size-[40px] place-items-center rounded-full bg-[color:var(--ob-surface-2)] text-[color:var(--ob-fg-soft)]">
            <ChatDotsIcon size={16} />
          </span>
        </Sidebar>

        <Main className="relative overflow-auto">
          <header className="flex h-[80px] shrink-0 items-center gap-[11px] border-b border-[color:var(--ob-border)] px-[29px] xl:px-[32px]">
            <h1 className="flex-1 text-[1.449rem] font-bold">Analytics</h1>

            {/* Gradient outline marks the upgrade path without a fill. */}
            <span
              className="inline-flex rounded-full p-px"
              style={{ background: "linear-gradient(90deg,#f5a623,#e0562d,#7c5cff)" }}
            >
              <span className="flex items-center gap-[7px] rounded-full bg-[color:var(--ob-surface)] px-[18px] py-[9px] text-[0.906rem] font-medium">
                <SparkleIcon size={13} />
                Acme Pro
              </span>
            </span>

            <span className="flex items-center gap-[7px] rounded-full border border-[color:var(--ob-border-strong)] px-[18px] py-[9px] text-[0.906rem] font-medium">
              <ShareIcon size={13} /> Share profile
            </span>
            <ChatDotsIcon size={13} />
            <BellIcon size={13} />
          </header>

          <div className="px-[29px] py-[22px] xl:px-[172px]">
            <span className="inline-flex items-center gap-[29px] rounded-full border border-[color:var(--ob-border-strong)] px-[18px] py-[9px] text-[0.951rem] font-medium">
              Last 30 days
              <CaretDownIcon size={13} />
            </span>

            <h2 className="pb-[14px] pt-[25px] text-[1.359rem] font-semibold text-[color:var(--ob-muted)]">
              Income
            </h2>

            <div className="grid gap-[18px] lg:grid-cols-[minmax(0,1fr)_minmax(0,0.42fr)]">
              <section className="overflow-hidden rounded-[var(--ob-radius-lg)] border border-[color:var(--ob-border)]">
                <div className="flex flex-wrap items-start gap-[14px] p-[22px]">
                  <div className="flex-1">
                    <h3 className="text-[1.042rem] font-semibold">Total Payouts</h3>
                    <p className="pt-[7px] text-[2.355rem] font-normal leading-none">
                      <span className="align-super text-[0.996rem]">$</span>0
                    </p>
                  </div>
                  <span className="flex items-center gap-[7px] rounded-full border border-[color:var(--ob-border-strong)] px-[18px] py-[9px] text-[0.924rem] font-medium">
                    <span aria-hidden>+</span> Start project
                  </span>
                  <span className="flex items-center gap-[7px] rounded-full border border-[color:var(--ob-border-strong)] px-[18px] py-[9px] text-[0.924rem] font-medium">
                    <span aria-hidden>$</span> Send invoice
                  </span>
                </div>

                {/* Zero at mid-height: "nothing yet", not "measured zero". */}
                <div className="relative h-[263px]">
                  <span className="absolute inset-x-[0px] top-1/2 border-t border-[color:var(--ob-brand)]" />
                  <span
                    className="absolute inset-x-[0px] top-1/2 bottom-[0px]"
                    style={{
                      background:
                        "linear-gradient(to bottom, color-mix(in oklab, #4a6cf7 22%, transparent), transparent)",
                    }}
                  />
                </div>
              </section>

              <div className="grid content-start gap-[18px]">
                <section className="rounded-[var(--ob-radius-lg)] border border-[color:var(--ob-border)] p-[22px]">
                  <div className="flex items-start gap-[11px]">
                    <h3 className="flex flex-1 items-center gap-[7px] text-[1.042rem] font-semibold">
                      Active projects <InfoDot />
                    </h3>
                    <ProBadge />
                  </div>
                  <p className="pt-[7px] text-[1.993rem] font-normal leading-none tabular-nums">
                    2
                  </p>
                  <MiniRise />
                </section>

                <section className="rounded-[var(--ob-radius-lg)] border border-[color:var(--ob-border)] p-[22px]">
                  <div className="flex items-start gap-[11px]">
                    <h3 className="flex-1 text-[1.042rem] font-semibold">Invoices</h3>
                    <ProBadge />
                  </div>
                  <div className="grid justify-items-center pt-[18px]">
                    <Placeholder width={190} height={83} radius={9} label="" />
                    <p className="max-w-[26ch] pt-[14px] text-center text-[0.951rem] text-[color:var(--ob-fg-soft)]">
                      Manage all of your client payments in one place.
                    </p>
                    <span className="mt-[14px] w-full rounded-[var(--ob-radius)] bg-[color:var(--ob-surface-2)] py-[11px] text-center text-[0.951rem] font-semibold">
                      Send invoice
                    </span>
                  </div>
                </section>
              </div>
            </div>

            <h2 className="pb-[14px] pt-[29px] text-[1.359rem] font-semibold text-[color:var(--ob-muted)]">
              Views
            </h2>

            <div className="grid rounded-[var(--ob-radius-lg)] border border-[color:var(--ob-border)] lg:grid-cols-[minmax(0,1fr)_minmax(0,0.62fr)]">
              <section className="p-[22px]">
                <h3 className="text-[1.042rem] font-semibold">Impressions</h3>
                <p className="pt-[7px] text-[1.993rem] font-normal leading-none tabular-nums">
                  1
                </p>
                <SpikeAtEnd />
              </section>
              <section className="border-l border-[color:var(--ob-border)] p-[22px]">
                <div className="flex items-start gap-[11px]">
                  <h3 className="flex-1 text-[1.042rem] font-semibold">
                    Recently viewed you in search
                  </h3>
                  <ProBadge />
                </div>
              </section>
            </div>
          </div>

          <span
            className="absolute bottom-[22px] right-[29px] flex items-center gap-[11px] rounded-full px-[22px] py-[13px] text-[0.951rem] font-semibold text-white"
            style={{ background: "linear-gradient(90deg,#7c5cff,#a855f7)" }}
          >
            <ConfettiIcon size={14} /> New features unlocked!
            <CrossIcon size={12} className="ml-[7px] opacity-70" />
          </span>
        </Main>
      </Shell>
    </Surface>
  );
}

function ProBadge() {
  return (
    <span className="flex shrink-0 items-center gap-[5px] text-[0.797rem] font-semibold uppercase tracking-wide text-[color:var(--ob-muted)]">
      <SparkleIcon size={13} />
      Pro
    </span>
  );
}

function InfoDot(): ReactNode {
  return (
    <span
      aria-hidden
      className="grid size-[14px] shrink-0 place-items-center rounded-full border border-[color:var(--ob-border-strong)] text-[0.543rem] font-normal text-[color:var(--ob-muted)]"
    >
      i
    </span>
  );
}

/** Flat then rising at the very end — two projects, both started recently. */
function MiniRise() {
  return (
    <svg
      viewBox="0 0 400 110"
      className="mt-[14px] h-[100px] w-full"
      preserveAspectRatio="none"
      role="img"
      aria-label="Active projects over the last 30 days"
    >
      <defs>
        <linearGradient id="ob-freelance-rise" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#4a6cf7" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#4a6cf7" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path
        d="M0,88 L330,88 C355,88 365,20 400,8 L400,110 L0,110 Z"
        fill="url(#ob-freelance-rise)"
      />
      <path
        d="M0,88 L330,88 C355,88 365,20 400,8"
        fill="none"
        stroke="#4a6cf7"
        strokeWidth={2}
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

/** One impression, one day: a single narrow spike, not a trend. */
function SpikeAtEnd() {
  return (
    <svg
      viewBox="0 0 700 150"
      className="mt-[14px] h-[136px] w-full"
      preserveAspectRatio="none"
      role="img"
      aria-label="Impressions over the last 30 days"
    >
      <defs>
        <linearGradient id="ob-freelance-spike" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#4a6cf7" stopOpacity="0.28" />
          <stop offset="100%" stopColor="#4a6cf7" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path
        d="M0,140 L600,140 C615,140 622,18 632,18 C642,18 650,140 665,140 L700,140 L700,150 L0,150 Z"
        fill="url(#ob-freelance-spike)"
      />
      <path
        d="M0,140 L600,140 C615,140 622,18 632,18 C642,18 650,140 665,140 L700,140"
        fill="none"
        stroke="#4a6cf7"
        strokeWidth={2}
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}
