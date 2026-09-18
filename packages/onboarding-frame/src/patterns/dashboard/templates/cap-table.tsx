"use client";

import type { ReactNode } from "react";
import { Ring } from "../../../ui/charts";
import {
  ArrowClockwiseIcon,
  ArrowRightIcon,
  ArticleIcon,
  BellIcon,
  BuildingsIcon,
  CakeIcon,
  CardIcon,
  CaretDownIcon,
  CaretRightIcon,
  ChartPieIcon,
  FileTextIcon,
  GlobeIcon,
  GridFourIcon,
  HardDrivesIcon,
  MegaphoneIcon,
  PathIcon,
  QuestionIcon,
  SparkleIcon,
  TrophyIcon,
  UserPlusIcon,
  UsersIcon,
  WrenchIcon,
} from "../../../ui/icons-solid";
import { Avatar } from "../../../ui/avatar";
import { Wordmark } from "../../../ui/wordmark";
import { cn } from "../../../lib/cn";
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
export function CapTableTemplate({
  brandName = "Acme",
  userName = "Alex Rivera",
  className,
  page = "shareholders",
}: CapTableProps) {
  return (
    <Surface tokens={capTableTokens} className={className}>
      <Shell className="flex-col">
        <header className="flex h-[65px] shrink-0 items-center overflow-x-auto gap-[11px] border-b border-[color:var(--ob-border)] px-[18px]">
          <Wordmark name={brandName} size={13} mark={20} radius={4} />

          <span className="flex items-center gap-[9px] rounded-full bg-[color:var(--ob-surface-2)] py-[5px] pl-[5px] pr-[11px]">
            <Avatar name="JAcme" size={25} />
            <span className="text-[0.879rem] font-medium">JAcme</span>
            <span className="rounded-full bg-[color:var(--ob-surface-3)] px-[9px] py-[2px] text-[0.747rem] text-[color:var(--ob-muted)]">
              Free
            </span>
            <CaretDownIcon size={12} />
          </span>

          <span className="flex items-center gap-[7px] rounded-[var(--ob-radius-sm)] bg-[color-mix(in_oklab,#5b2ff5_10%,transparent)] px-[12px] py-[7px] text-[0.861rem] font-medium">
            <GlobeIcon size={12} /> Issue overseas equity right
          </span>

          {/* Setup progress rides in the top bar rather than a banner. */}
          <span className="mx-auto flex items-center gap-[11px] rounded-full border border-[color:var(--ob-border-strong)] py-[5px] pl-[7px] pr-[18px]">
            <Ring
              value={33}
              size={35}
              thickness={4}
              color="var(--ob-brand)"
              label={
                <span className="text-[0.615rem] font-bold tabular-nums">
                  33<span className="text-[0.439rem]">%</span>
                </span>
              }
            />
            <span className="text-[0.923rem] font-medium">Getting started</span>
            <CaretDownIcon size={12} />
          </span>

          <span className="flex items-center gap-[14px] text-[color:var(--ob-fg-soft)]">
            {[BellIcon, QuestionIcon, PathIcon].map((Mark, i) => (
              <span key={i}>
                <Mark size={13} />
              </span>
            ))}
          </span>
          <span className="flex items-center gap-[5px] rounded-[var(--ob-radius-sm)] border border-[color:var(--ob-border-strong)] px-[12px] py-[7px] text-[0.861rem] font-medium">
            <UserPlusIcon size={12} /> Invite co-pilots
          </span>
          <span className="rounded-[var(--ob-radius-sm)] bg-[color:var(--ob-brand)] px-[14px] py-[7px] text-[0.861rem] font-semibold text-white">
            Upgrade
          </span>
          <span className="inline-flex overflow-hidden rounded-[var(--ob-radius-sm)] bg-[color:var(--ob-surface-2)] p-[4px] text-[0.861rem]">
            <span className="rounded-[var(--ob-radius-sm)] bg-[color:var(--ob-surface)] px-[11px] py-[4px] font-medium">
              Company
            </span>
            <span className="px-[11px] py-[4px] text-[color:var(--ob-muted)]">
              Portal
            </span>
          </span>
          <Avatar name={userName} size={30} />
        </header>

        <div className="flex min-h-[0px] flex-1">
          <Sidebar width={294} bg="var(--ob-surface)">
            <nav className="grid gap-[2px] px-[11px] pt-[14px]">
              {NAV.map((item) => (
                <NavItem
                  key={item.id}
                  label={item.label}
                  glyph={<item.Icon size={12} />}
                  className="text-[0.923rem]"
                />
              ))}
              <NavItem
                label="Cap table"
                glyph={<UsersIcon size={12} />}
                trailing={<CaretDownIcon size={12} />}
                className="text-[0.923rem]"
              />
            </nav>

            <nav className="grid gap-[2px] px-[11px]">
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
                      "rounded-none text-[0.923rem]",
                      item.id === page &&
                        "bg-transparent font-semibold text-[color:var(--ob-brand)]",
                    )}
                  />
                </div>
              ))}
            </nav>

            <nav className="grid gap-[2px] px-[11px] pt-[4px]">
              {TAIL.map((item) => (
                <NavItem
                  key={item.id}
                  label={item.label}
                  glyph={<item.Icon size={12} />}
                  trailing={
                    item.chevron ? <CaretRightIcon size={12} /> : undefined
                  }
                  className="text-[0.923rem]"
                />
              ))}
            </nav>

            <div className="mt-auto p-[14px]">
              <div className="rounded-[var(--ob-radius)] border border-[color:var(--ob-border-strong)] p-[14px]">
                <h3 className="flex items-center gap-[7px] pb-[11px] text-[0.967rem] font-semibold">
                  <SparkleIcon size={12} />
                  What&apos;s New
                </h3>
                <ul className="grid gap-[9px]">
                  {WHATS_NEW.map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-[11px] rounded-[var(--ob-radius-sm)] bg-[color:var(--ob-surface-2)] px-[12px] py-[9px]"
                    >
                      <span className="flex-1 text-[0.879rem] font-medium">
                        {item}
                      </span>
                      <span
                        aria-hidden
                        className="grid size-[21px] place-items-center rounded-full border border-[color:var(--ob-brand)] text-[0.615rem] text-[color:var(--ob-brand)]"
                      >
                        <ArrowRightIcon size={11} />
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <p className="flex items-center gap-[9px] pt-[14px] text-[0.923rem]">
                <ArrowClockwiseIcon size={12} /> Update available
              </p>
              <p className="pt-[11px] text-right text-[0.721rem] text-[color:var(--ob-muted)]">
                version: b513e7b0
              </p>
            </div>
          </Sidebar>

          <Main className="overflow-auto p-[21px]">
            <section className="rounded-[var(--ob-radius-lg)] border border-[color:var(--ob-border)] px-[28px] pb-[35px] pt-[21px]">
              <h2 className="text-[1.318rem] font-bold">Summary</h2>

              <nav className="flex gap-[28px] border-b border-[color:var(--ob-border)] pt-[18px]">
                {[
                  { id: "shares", label: "Shares" },
                  { id: "options", label: "Options" },
                  { id: "notes", label: "Notes", off: true },
                  { id: "rsus", label: "RSUs", off: true },
                ].map((tab, index) => (
                  <span
                    key={tab.id}
                    className={cn(
                      "pb-[11px] text-[0.967rem]",
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

              <div className="grid gap-x-[28px] gap-y-[35px] pt-[35px] sm:grid-cols-3">
                {SUMMARY.map((item) => (
                  <div key={item.id} className="text-center">
                    <p className="text-[2.285rem] font-bold leading-none tabular-nums">
                      {item.value}
                    </p>
                    <p className="flex items-center justify-center gap-[5px] pt-[9px] text-[0.835rem] font-medium uppercase tracking-wide text-[color:var(--ob-muted)]">
                      {item.label}
                      {item.info && <InfoDot />}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            <section className="mt-[18px] flex items-center gap-[28px] rounded-[var(--ob-radius-lg)] border border-[color:var(--ob-border)] px-[28px] py-[21px]">
              <h2 className="text-[1.318rem] font-bold">Documents</h2>
              <span className="flex items-center gap-[9px] rounded-[var(--ob-radius)] border border-[color:var(--ob-border-strong)] px-[14px] py-[9px]">
                <FileTextIcon size={12} />
                <span className="text-[0.896rem] underline">
                  Shareholder Certificate 1 - Jane Smith - J…
                </span>
              </span>
            </section>

            <div className="flex flex-wrap items-center gap-[11px] pb-[14px] pt-[28px]">
              <h2 className="flex-1 text-[1.406rem] font-bold">
                Transaction history
              </h2>
              <span className="flex items-center gap-[7px] rounded-[var(--ob-radius)] bg-[color:var(--ob-brand)] px-[18px] py-[11px] text-[0.879rem] font-semibold text-white">
                <ArrowClockwiseIcon size={12} /> Re-Issue share certificate
              </span>
              <span className="flex items-center gap-[7px] rounded-[var(--ob-radius)] bg-[color-mix(in_oklab,#5b2ff5_14%,white)] px-[18px] py-[11px] text-[0.879rem] font-semibold">
                <TrophyIcon size={12} /> Download share certificate
              </span>
              <span className="flex items-center gap-[18px] rounded-[var(--ob-radius)] border border-[color:var(--ob-border-strong)] px-[14px] py-[11px] text-[0.879rem] font-medium">
                More
                <CaretDownIcon size={12} />
              </span>
            </div>

            <div className="overflow-x-auto rounded-[var(--ob-radius-lg)] border border-[color:var(--ob-border)]">
              <table className="w-full min-w-[896px] border-collapse text-[0.879rem]">
                <thead>
                  <tr className="text-[color:var(--ob-fg-soft)]">
                    <th className="px-[18px] py-[14px]">
                      <span
                        aria-hidden
                        className="block size-[16px] rounded-[4px] border border-[color:var(--ob-border-strong)]"
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
                          "px-[14px] py-[14px] font-semibold",
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
                    <tr
                      key={row.id}
                      className="border-t border-[color:var(--ob-border)]"
                    >
                      <td className="px-[18px] py-[18px]">
                        <span
                          aria-hidden
                          className="block size-[16px] rounded-[4px] border border-[color:var(--ob-border-strong)]"
                        />
                      </td>
                      <td className="px-[14px] py-[18px]">{row.date}</td>
                      <td className="px-[14px] py-[18px]">{row.type}</td>
                      <td className="px-[14px] py-[18px]">{row.klass}</td>
                      <td className="px-[14px] py-[18px] text-right tabular-nums">
                        {row.shares}
                      </td>
                      <td className="px-[14px] py-[18px] text-right tabular-nums">
                        {row.total}
                      </td>
                      <td className="px-[14px] py-[18px] text-right tabular-nums">
                        {row.price}
                      </td>
                      <td className="px-[14px] py-[18px] text-right tabular-nums">
                        {row.investment}
                      </td>
                      <td className="px-[14px] py-[18px] text-right tabular-nums">
                        {row.transfer}
                      </td>
                      <td className="px-[14px] py-[18px] text-right">
                        <span className="inline-flex items-center gap-[14px] rounded-[var(--ob-radius)] border border-[color:var(--ob-border-strong)] px-[12px] py-[7px] text-[0.835rem] font-medium">
                          More
                          <CaretDownIcon size={12} />
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
      className="grid size-[13px] shrink-0 place-items-center rounded-full border border-[color:var(--ob-border-strong)] text-[0.527rem] normal-case"
    >
      i
    </span>
  );
}
