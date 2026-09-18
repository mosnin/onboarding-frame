"use client";

import type { ReactNode } from "react";
import { Ring } from "../../../ui/charts";
import {
  ArrowClockwiseIcon,
  ArrowRightIcon,
  BellIcon,
  CakeIcon,
  PathIcon,
  QuestionIcon,
  UserPlusIcon,
  ArticleIcon,
  BuildingsIcon,
  CardIcon,
  CaretDownIcon,
  CaretRightIcon,
  ChartPieIcon,
  FileTextIcon,
  GlobeIcon,
  GridFourIcon,
  HardDrivesIcon,
  MegaphoneIcon,
  SparkleIcon,
  TrophyIcon,
  UsersIcon,
  WrenchIcon,
} from "../../../ui/icons-solid";
import { cn } from "../../../lib/cn";
import { AvatarSlot, WordmarkSlot } from "../../../ui/placeholder";
import { Surface, capTableTokens } from "./tokens";
import { Main, NavItem, Shell, Sidebar } from "./chrome";
import type { TemplateProps } from "./props";

export type CapTablePage = "shareholders" | "notes" | "log";

export interface CapTableProps extends TemplateProps {
  page?: CapTablePage;
}

const NAV = [
  { id: "start", label: "Getting Started", Icon: CakeIcon },
  { id: "dashboard", label: "Dashboard", Icon: GridFourIcon },
];

const CAP_CHILDREN = [
  { id: "shareholders", label: "Shareholders" },
  { id: "notes", label: "Note holders" },
  { id: "log", label: "Transactions log" },
];

const TAIL = [
  { id: "plans", label: "Equity plans", Icon: ChartPieIcon, chevron: true },
  { id: "tools", label: "Tools", Icon: WrenchIcon, chevron: true },
  { id: "comms", label: "Communication", Icon: MegaphoneIcon },
  { id: "dataroom", label: "Data room", Icon: HardDrivesIcon },
  { id: "secondaries", label: "Secondaries", Icon: CardIcon },
  { id: "documents", label: "Documents", Icon: ArticleIcon, chevron: true },
  { id: "company", label: "Company", Icon: BuildingsIcon, chevron: true },
];

const WHATS_NEW = ["2FA security", "Bare trusts & SPVs", "Reporting"];

const SUMMARY = [
  { id: "invested", value: "$0.00", label: "Total invested", info: true },
  { id: "unpaid", value: "$0.00", label: "Total unpaid" },
  { id: "undiluted", value: "44.44%", label: "Undiluted" },
  { id: "diluted", value: "23.52%", label: "Diluted" },
  { id: "shares", value: "4", label: "COM shares" },
];

const TRANSACTIONS = [
  {
    id: "t1",
    date: "27 Oct 2023",
    type: "Shares issued",
    klass: "COM",
    shares: "8",
    total: "8",
    price: "$0.00",
    investment: "$0.00",
    transfer: "-",
  },
  {
    id: "t2",
    date: "31 Oct 2023",
    type: "Share split",
    klass: "COM",
    shares: "1.00:1",
    total: "8",
    price: "-",
    investment: "-",
    transfer: "-",
  },
  {
    id: "t3",
    date: "31 Oct 2023",
    type: "Buy back",
    klass: "COM",
    shares: "-4",
    total: "4",
    price: "$1.00",
    investment: "$4.00",
    transfer: "-",
  },
];

/**
 * Cap table shareholder detail.
 *
 * Two tabs are visibly disabled rather than hidden, because a company with no
 * notes or RSUs still needs to know those instruments exist — hiding them
 * would make the product look smaller than it is. The summary figures are all
 * zero on money and non-zero on ownership, which is exactly what a founder's
 * own line looks like: shares held, nothing paid for them.
 */
export function CapTableTemplate({ className, page = "shareholders" }: CapTableProps) {
  return (
    <Surface tokens={capTableTokens} className={className}>
      <Shell className="flex-col">
        <header className="flex h-[74px] shrink-0 items-center overflow-x-auto gap-3 border-b border-[color:var(--ob-border)] px-5">
          <WordmarkSlot width={78} height={20} label="" />

          <span className="flex items-center gap-2.5 rounded-full bg-[color:var(--ob-surface-2)] py-1.5 pl-1.5 pr-3">
            <AvatarSlot size={28} />
            <span className="text-[1rem] font-medium">JAcme</span>
            <span className="rounded-full bg-[color:var(--ob-surface-3)] px-2.5 py-0.5 text-[0.85rem] text-[color:var(--ob-muted)]">
              Free
            </span>
            <CaretDownIcon size={14} />
          </span>

          <span className="flex items-center gap-2 rounded-[var(--ob-radius-sm)] bg-[color-mix(in_oklab,#5b2ff5_10%,transparent)] px-3.5 py-2 text-[0.98rem] font-medium">
            <GlobeIcon size={14} /> Issue overseas equity right
          </span>

          {/* Setup progress rides in the top bar rather than a banner. */}
          <span className="mx-auto flex items-center gap-3 rounded-full border border-[color:var(--ob-border-strong)] py-1.5 pl-2 pr-5">
            <Ring
              value={33}
              size={40}
              thickness={4}
              color="var(--ob-brand)"
              label={
                <span className="text-[0.7rem] font-bold tabular-nums">
                  33<span className="text-[0.5rem]">%</span>
                </span>
              }
            />
            <span className="text-[1.05rem] font-medium">Getting started</span>
            <CaretDownIcon size={14} />
          </span>

          <span className="flex items-center gap-4 text-[color:var(--ob-fg-soft)]">
            {[BellIcon, QuestionIcon, PathIcon].map((Mark, i) => (
              <span key={i}>
                <Mark size={15} />
              </span>
            ))}
          </span>
          <span className="flex items-center gap-1.5 rounded-[var(--ob-radius-sm)] border border-[color:var(--ob-border-strong)] px-3.5 py-2 text-[0.98rem] font-medium">
            <UserPlusIcon size={14} /> Invite co-pilots
          </span>
          <span className="rounded-[var(--ob-radius-sm)] bg-[color:var(--ob-brand)] px-4 py-2 text-[0.98rem] font-semibold text-white">
            Upgrade
          </span>
          <span className="inline-flex overflow-hidden rounded-[var(--ob-radius-sm)] bg-[color:var(--ob-surface-2)] p-1 text-[0.98rem]">
            <span className="rounded-[var(--ob-radius-sm)] bg-[color:var(--ob-surface)] px-3 py-1 font-medium">
              Company
            </span>
            <span className="px-3 py-1 text-[color:var(--ob-muted)]">Portal</span>
          </span>
          <AvatarSlot size={34} />
        </header>

        <div className="flex min-h-0 flex-1">
          <Sidebar width={335} bg="var(--ob-surface)">
            <nav className="grid gap-0.5 px-3 pt-4">
              {NAV.map((item) => (
                <NavItem
                  key={item.id}
                  label={item.label}
                  glyph={<item.Icon size={14} />}
                  className="text-[1.05rem]"
                />
              ))}
              <NavItem
                label="Cap table"
                glyph={<UsersIcon size={14} />}
                trailing={
                  <CaretDownIcon size={14} />
                }
                className="text-[1.05rem]"
              />
            </nav>

            <nav className="grid gap-0.5 px-3">
              {CAP_CHILDREN.map((item) => (
                <div
                  key={item.id}
                  className={cn(
                    item.id === page &&
                      "border-l-[3px] border-[color:var(--ob-brand)] bg-[color-mix(in_oklab,#5b2ff5_6%,transparent)]",
                  )}
                >
                  <NavItem
                    label={item.label}
                    indent
                    className={cn(
                      "rounded-none text-[1.05rem]",
                      item.id === page &&
                        "bg-transparent font-semibold text-[color:var(--ob-brand)]",
                    )}
                  />
                </div>
              ))}
            </nav>

            <nav className="grid gap-0.5 px-3 pt-1">
              {TAIL.map((item) => (
                <NavItem
                  key={item.id}
                  label={item.label}
                  glyph={<item.Icon size={14} />}
                  trailing={
                    item.chevron ? (
                      <CaretRightIcon size={14} />
                    ) : undefined
                  }
                  className="text-[1.05rem]"
                />
              ))}
            </nav>

            <div className="mt-auto p-4">
              <div className="rounded-[var(--ob-radius)] border border-[color:var(--ob-border-strong)] p-4">
                <h3 className="flex items-center gap-2 pb-3 text-[1.1rem] font-semibold">
                  <SparkleIcon size={14} />
                  What&apos;s New
                </h3>
                <ul className="grid gap-2.5">
                  {WHATS_NEW.map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-3 rounded-[var(--ob-radius-sm)] bg-[color:var(--ob-surface-2)] px-3.5 py-2.5"
                    >
                      <span className="flex-1 text-[1rem] font-medium">{item}</span>
                      <span
                        aria-hidden
                        className="grid size-6 place-items-center rounded-full border border-[color:var(--ob-brand)] text-[0.7rem] text-[color:var(--ob-brand)]"
                      >
                        <ArrowRightIcon size={13} />
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <p className="flex items-center gap-2.5 pt-4 text-[1.05rem]">
                <ArrowClockwiseIcon size={14} /> Update available
              </p>
              <p className="pt-3 text-right text-[0.82rem] text-[color:var(--ob-muted)]">
                version: b513e7b0
              </p>
            </div>
          </Sidebar>

          <Main className="overflow-auto p-6">
            <section className="rounded-[var(--ob-radius-lg)] border border-[color:var(--ob-border)] px-8 pb-10 pt-6">
              <h2 className="text-[1.5rem] font-bold">Summary</h2>

              <nav className="flex gap-8 border-b border-[color:var(--ob-border)] pt-5">
                {[
                  { id: "shares", label: "Shares" },
                  { id: "options", label: "Options" },
                  { id: "notes", label: "Notes", off: true },
                  { id: "rsus", label: "RSUs", off: true },
                ].map((tab, index) => (
                  <span
                    key={tab.id}
                    className={cn(
                      "pb-3 text-[1.1rem]",
                      index === 0
                        ? "-mb-px border-b-2 border-[color:var(--ob-brand)] font-semibold text-[color:var(--ob-brand)]"
                        : tab.off
                          ? // Instruments the company does not yet hold stay visible.
                            "text-[color:var(--ob-muted)] opacity-55"
                          : "text-[color:var(--ob-fg-soft)]",
                    )}
                  >
                    {tab.label}
                  </span>
                ))}
              </nav>

              <div className="grid gap-x-8 gap-y-10 pt-10 sm:grid-cols-3">
                {SUMMARY.map((item) => (
                  <div key={item.id} className="text-center">
                    <p className="text-[2.6rem] font-bold leading-none tabular-nums">
                      {item.value}
                    </p>
                    <p className="flex items-center justify-center gap-1.5 pt-2.5 text-[0.95rem] font-medium uppercase tracking-wide text-[color:var(--ob-muted)]">
                      {item.label}
                      {item.info && <InfoDot />}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            <section className="mt-5 flex items-center gap-8 rounded-[var(--ob-radius-lg)] border border-[color:var(--ob-border)] px-8 py-6">
              <h2 className="text-[1.5rem] font-bold">Documents</h2>
              <span className="flex items-center gap-2.5 rounded-[var(--ob-radius)] border border-[color:var(--ob-border-strong)] px-4 py-2.5">
                <FileTextIcon size={14} />
                <span className="text-[1.02rem] underline">
                  Shareholder Certificate 1 - Jane Smith - J…
                </span>
              </span>
            </section>

            <div className="flex flex-wrap items-center gap-3 pb-4 pt-8">
              <h2 className="flex-1 text-[1.6rem] font-bold">Transaction history</h2>
              <span className="flex items-center gap-2 rounded-[var(--ob-radius)] bg-[color:var(--ob-brand)] px-5 py-3 text-[1rem] font-semibold text-white">
                <ArrowClockwiseIcon size={14} /> Re-Issue share certificate
              </span>
              <span className="flex items-center gap-2 rounded-[var(--ob-radius)] bg-[color-mix(in_oklab,#5b2ff5_14%,white)] px-5 py-3 text-[1rem] font-semibold">
                <TrophyIcon size={14} /> Download share certificate
              </span>
              <span className="flex items-center gap-5 rounded-[var(--ob-radius)] border border-[color:var(--ob-border-strong)] px-4 py-3 text-[1rem] font-medium">
                More
                <CaretDownIcon size={14} />
              </span>
            </div>

            <div className="overflow-x-auto rounded-[var(--ob-radius-lg)] border border-[color:var(--ob-border)]">
              <table className="w-full min-w-[1020px] border-collapse text-[1rem]">
                <thead>
                  <tr className="text-[color:var(--ob-fg-soft)]">
                    <th className="px-5 py-4">
                      <span
                        aria-hidden
                        className="block size-[18px] rounded-[4px] border border-[color:var(--ob-border-strong)]"
                      />
                    </th>
                    {[
                      "Date",
                      "Type",
                      "Share class",
                      "Shares",
                      "Total shares",
                      "Price per share",
                      "Investment amount",
                      "Transfer amount",
                    ].map((head, index) => (
                      <th
                        key={head}
                        className={cn(
                          "px-4 py-4 font-semibold",
                          index >= 3 ? "text-right" : "text-left",
                        )}
                      >
                        {head}
                      </th>
                    ))}
                    <th />
                  </tr>
                </thead>
                <tbody>
                  {TRANSACTIONS.map((row) => (
                    <tr key={row.id} className="border-t border-[color:var(--ob-border)]">
                      <td className="px-5 py-5">
                        <span
                          aria-hidden
                          className="block size-[18px] rounded-[4px] border border-[color:var(--ob-border-strong)]"
                        />
                      </td>
                      <td className="px-4 py-5">{row.date}</td>
                      <td className="px-4 py-5">{row.type}</td>
                      <td className="px-4 py-5">{row.klass}</td>
                      <td className="px-4 py-5 text-right tabular-nums">{row.shares}</td>
                      <td className="px-4 py-5 text-right tabular-nums">{row.total}</td>
                      <td className="px-4 py-5 text-right tabular-nums">{row.price}</td>
                      <td className="px-4 py-5 text-right tabular-nums">
                        {row.investment}
                      </td>
                      <td className="px-4 py-5 text-right tabular-nums">{row.transfer}</td>
                      <td className="px-4 py-5 text-right">
                        <span className="inline-flex items-center gap-4 rounded-[var(--ob-radius)] border border-[color:var(--ob-border-strong)] px-3.5 py-2 text-[0.95rem] font-medium">
                          More
                          <CaretDownIcon size={14} />
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Main>
        </div>
      </Shell>
    </Surface>
  );
}

function InfoDot(): ReactNode {
  return (
    <span
      aria-hidden
      className="grid size-[15px] shrink-0 place-items-center rounded-full border border-[color:var(--ob-border-strong)] text-[0.6rem] normal-case"
    >
      i
    </span>
  );
}
