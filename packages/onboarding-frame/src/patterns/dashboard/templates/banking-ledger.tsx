"use client";

import type { ReactNode } from "react";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ArrowsLeftRightIcon,
  ArrowsUpDownIcon,
  BankSolid,
  BellIcon,
  BookmarkIcon,
  CardIcon,
  CaretDownIcon,
  CaretUpIcon,
  ChartBarIcon,
  FileTextIcon,
  FunnelIcon,
  GearIcon,
  GridFourIcon,
  HouseIcon,
  ListChecksIcon,
  NoteIcon,
  PaperclipIcon,
  ReceiptIcon,
  SearchIcon,
  TrendUpIcon,
} from "../../../ui/icons-solid";
import { Avatar } from "../../../ui/avatar";
import { BrandMark } from "../../../ui/brand";
import { cn } from "../../../lib/cn";
import { Surface, bankingTokens } from "./tokens";
import { Main, NavItem, NavSection, Shell, Sidebar } from "./chrome";
import type { TemplateProps } from "./props";

export type BankingPage = "transactions" | "home" | "cards";

export interface BankingLedgerProps extends TemplateProps {
  page?: BankingPage;
}

const NAV = [
  { id: "home", label: "Home", Icon: HouseIcon },
  { id: "tasks", label: "Tasks", Icon: ListChecksIcon },
  { id: "transactions", label: "Transactions", Icon: ReceiptIcon },
  { id: "payments", label: "Payments", Icon: ArrowsLeftRightIcon, caret: true },
  { id: "cards", label: "Cards", Icon: CardIcon },
  { id: "capital", label: "Capital", Icon: TrendUpIcon },
];

const ACCOUNTS = [
  { id: "credit", label: "Credit Card" },
  { id: "checking", label: "Checking ••2502", balance: "$972.04" },
  { id: "savings", label: "Savings ••5679", balance: "$1,020.00" },
];

const WORKFLOWS = [
  { id: "bills", label: "Bill Pay", Icon: ReceiptIcon },
  { id: "invoicing", label: "Invoicing", Icon: FileTextIcon, caret: true },
  { id: "reimbursements", label: "Reimbursements", Icon: NoteIcon },
  { id: "accounting", label: "Accounting", Icon: ChartBarIcon },
];

/**
 * Direction is carried entirely by hue: green in, magenta out. The failed
 * charge keeps a struck-through $0.00 rather than being filtered away — a
 * ledger that hides its failures is not a ledger.
 */
const ROWS = [
  { id: "t1", date: "Nov 2", name: "Workspace", amount: "-$6", cents: "41", out: true, account: "Checking ••2502", method: "Card ••9932", card: true },
  { id: "t2", date: "Oct 30", name: "Wise US Inc", amount: "$10", cents: "60", account: "Checking ••2502", method: "Request" },
  { id: "t3", date: "Oct 29", name: "Workspace", amount: "-$2", cents: "55", out: true, account: "Checking ••2502", method: "Card ••9932", card: true, attachment: true },
  { id: "t4", date: "Oct 28", name: "Acme", amount: "-$1", cents: "00", out: true, account: "Savings ••5679", method: "Wire Payment" },
  { id: "t5", date: "Oct 28", name: "Acme", amount: "-$10", cents: "60", out: true, account: "Checking ••2502", method: "ACH Payment" },
  { id: "t6", date: "Oct 28", name: "From Checking ••2502", amount: "$10", cents: "00", account: "Savings ••5679", method: "Transfer In" },
  { id: "t7", date: "Oct 28", name: "To Savings ••5679", amount: "-$10", cents: "00", out: true, account: "Checking ••2502", method: "Transfer Out" },
  { id: "t8", date: "Oct 28", name: "From Checking ••2502", amount: "$10", cents: "00", account: "Savings ••5679", method: "Transfer In" },
  { id: "t9", date: "Oct 28", name: "To Savings ••5679", amount: "-$10", cents: "00", out: true, account: "Checking ••2502", method: "Transfer Out" },
  { id: "t10", date: "Oct 28", name: "TEMPORARY HOLD", amount: "$0", cents: "00", account: "Checking ••2502", method: "Card ••9932", card: true, failed: true },
];

/**
 * Banking ledger.
 *
 * The summary strip splits into three cells that answer different questions —
 * the month's net change, its shape over time, and which counterparty drove
 * it — rather than three variations on one number. The hovered tooltip is kept
 * because it carries the per-counterparty split that the chart alone does not.
 */
export function BankingLedgerTemplate({
  className,
  page = "transactions",
}: BankingLedgerProps) {
  return (
    <Surface tokens={bankingTokens} className={className}>
      <Shell>
        <Sidebar width={218} bg="var(--ob-surface)">
          <div className="flex items-center gap-[9px] px-[15px] pb-[15px] pt-[15px]">
            <BrandMark brand="Acme" size={23} label="Acme" />
            <span className="flex-1 text-[0.848rem] font-semibold">Acme</span>
            <span aria-hidden className="text-[0.53rem] opacity-50">
              <ArrowsUpDownIcon size={9} />
            </span>
          </div>

          <nav className="grid gap-[2px] px-[9px]">
            {NAV.map((item) => (
              <NavItem
                key={item.id}
                label={item.label}
                glyph={<item.Icon size={11} />}
                active={item.id === page}
                trailing={
                  item.caret ? (
                    <span aria-hidden className="text-[0.53rem] opacity-50">
                      <CaretDownIcon size={8} />
                    </span>
                  ) : undefined
                }
                className="text-[0.818rem]"
              />
            ))}
            <NavItem
              label="Accounts"
              glyph={<BankSolid size={11} />}
              trailing={
                <span aria-hidden className="text-[0.53rem] opacity-50">
                  <CaretUpIcon size={8} />
                </span>
              }
              className="text-[0.818rem]"
            />
            {ACCOUNTS.map((account) => (
              <button
                key={account.id}
                type="button"
                className="rounded-[var(--ob-radius-sm)] px-[9px] py-[6px] pl-[27px] text-left"
              >
                <span className="block text-[0.795rem]">{account.label}</span>
                {account.balance && (
                  <span className="block text-[0.757rem] tabular-nums text-[color:var(--ob-muted)]">
                    {account.balance}
                  </span>
                )}
              </button>
            ))}
          </nav>

          <NavSection label="Workflows" />
          <nav className="grid gap-[2px] px-[9px]">
            {WORKFLOWS.map((item) => (
              <NavItem
                key={item.id}
                label={item.label}
                glyph={<item.Icon size={11} />}
                trailing={
                  item.caret ? (
                    <span aria-hidden className="text-[0.53rem] opacity-50">
                      <CaretDownIcon size={8} />
                    </span>
                  ) : undefined
                }
                className="text-[0.818rem]"
              />
            ))}
          </nav>
        </Sidebar>

        <Main className="relative overflow-auto">
          <header className="flex h-[58px] shrink-0 items-center gap-[12px] px-[21px]">
            <span className="flex w-full max-w-[651px] items-center gap-[8px] rounded-[var(--ob-radius)] bg-[color:var(--ob-surface-2)] px-[12px] py-[9px] text-[0.795rem] text-[color:var(--ob-muted)]">
              <SearchIcon size={11} />
              <span className="flex-1">Search for anything</span>
              <kbd className="rounded border border-[color:var(--ob-border)] px-[5px] py-[2px] text-[0.545rem] font-semibold">
                ⌘K
              </kbd>
            </span>
            <span className="ml-auto flex items-center gap-[12px]">
              <span className="flex items-center gap-[15px] rounded-[var(--ob-radius)] border border-[color:var(--ob-border-strong)] px-[15px] py-[8px] text-[0.818rem] font-medium">
                Move Money
                <span aria-hidden className="text-[0.53rem] opacity-60">
                  <CaretDownIcon size={8} />
                </span>
              </span>
              <span aria-hidden className="text-[color:var(--ob-fg-soft)]">
                ⊘
              </span>
              <span className="relative" aria-hidden>
                <BellIcon size={11} />
                <span className="absolute -right-[2px] -top-[2px] size-[6px] rounded-full bg-[color:var(--ob-brand)]" />
              </span>
              <Avatar name="Transactions" size={27} />
            </span>
          </header>

          <div className="px-[21px] pb-[24px]">
            <div className="flex items-center gap-[12px]">
              <h1 className="flex-1 text-[1.514rem] font-bold tracking-[-0.01em]">
                Transactions
              </h1>
              <span className="flex items-center gap-[6px] rounded-[var(--ob-radius)] border border-[color:var(--ob-border-strong)] px-[12px] py-[8px] text-[0.795rem] font-medium">
                <PaperclipIcon size={10} /> Match Receipts
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-[9px] pt-[15px]">
              {[
                { id: "views", label: "Data Views", Icon: BookmarkIcon, caret: true },
                { id: "filters", label: "Filters", Icon: FunnelIcon },
                { id: "date", label: "Date", caret: true },
                { id: "keywords", label: "Keywords", caret: true },
                { id: "amount", label: "Amount", caret: true },
              ].map((pill) => (
                <span
                  key={pill.id}
                  className="flex items-center gap-[8px] rounded-[var(--ob-radius)] border border-[color:var(--ob-border-strong)] px-[12px] py-[6px] text-[0.795rem]"
                >
                  {pill.Icon && <pill.Icon size={10} />}
                  {pill.label}
                  {pill.caret && (
                    <span aria-hidden className="text-[0.53rem] opacity-60">
                      <CaretDownIcon size={8} />
                    </span>
                  )}
                </span>
              ))}
              <span className="ml-auto flex items-center gap-[12px] text-[color:var(--ob-fg-soft)]">
                {[GridFourIcon, ArrowsUpDownIcon, GearIcon].map((Mark, i) => (
                  <span key={i}>
                    <Mark size={11} />
                  </span>
                ))}
                <span className="flex items-center gap-[6px] text-[0.795rem] font-medium">
                  <span aria-hidden>⤓</span> Export All
                </span>
              </span>
            </div>

            <section className="mt-[15px] grid border-y border-[color:var(--ob-border)] lg:grid-cols-[minmax(0,0.45fr)_minmax(0,1fr)_minmax(0,0.65fr)]">
              <div className="py-[18px] pr-[18px]">
                <p className="text-[0.818rem] text-[color:var(--ob-fg-soft)]">
                  Net change this month
                </p>
                <p className="pt-[3px] text-[1.514rem] font-bold leading-none tabular-nums">
                  −$6<span className="text-[0.946rem]">.41</span>
                </p>
                <p className="pt-[6px] text-[0.795rem] text-[color:var(--ob-muted)]">
                  vs. −$3.55 last month
                </p>

                <ul className="grid gap-[9px] pt-[21px]">
                  <Flow label="Money in" value="$0.00" color="var(--ob-success)" />
                  <Flow label="Money out" value="−$6.41" color="var(--ob-brand)" />
                </ul>
              </div>

              <div className="border-l border-[color:var(--ob-border)] px-[18px] py-[18px]">
                <div className="flex gap-[9px]">
                  <div className="grid shrink-0 text-right text-[0.757rem] tabular-nums text-[color:var(--ob-muted)]">
                    <span className="leading-none">$7</span>
                    <span className="mt-[calc((200px/2)-0.8em)] leading-none">$3</span>
                  </div>
                  <div className="min-w-[0px] flex-1">
                    <MonthChart />
                    <p className="flex pt-[6px] text-[0.757rem] text-[color:var(--ob-muted)]">
                      {["Nov 1", "Nov 3", "Nov 5", "Nov 7"].map((tick) => (
                        <span key={tick} className="flex-1">
                          {tick}
                        </span>
                      ))}
                    </p>
                  </div>
                </div>
              </div>

              <div className="border-l border-[color:var(--ob-border)] px-[18px] py-[18px]">
                <p className="flex items-center gap-[12px] text-[0.795rem]">
                  <span className="flex items-center gap-[6px]">
                    To/From
                    <span aria-hidden className="text-[0.53rem] opacity-60">
                      <CaretDownIcon size={8} />
                    </span>
                  </span>
                  <span className="ml-auto flex items-center gap-[6px]">
                    <GridFourIcon size={10} /> Group Table
                  </span>
                  <span aria-hidden className="text-[0.53rem] opacity-60">
                    <CaretUpIcon size={8} />
                  </span>
                </p>

                <div className="flex items-end gap-[12px] pt-[18px]">
                  <div className="grid shrink-0 text-right text-[0.757rem] tabular-nums text-[color:var(--ob-muted)]">
                    <span className="leading-none">$7</span>
                    <span className="mt-[calc((140px/2)-0.8em)] leading-none">$3</span>
                  </div>
                  <span className="flex h-[129px] flex-1 items-end gap-[12px]">
                    <span className="h-[62%] flex-1 bg-[color:var(--ob-surface-2)]" />
                    <span className="h-full flex-1 border-t-2 border-[color:var(--ob-brand)] bg-[color-mix(in_oklab,#e5457f_14%,transparent)]" />
                  </span>
                </div>
                <p className="pt-[9px] text-center text-[0.757rem] text-[color:var(--ob-muted)]">
                  Workspace
                </p>
              </div>
            </section>

            <div className="relative overflow-x-auto">
              <table className="w-full min-w-[818px] border-collapse text-[0.795rem]">
                <thead>
                  <tr className="text-[color:var(--ob-fg-soft)]">
                    <th className="px-[12px] py-[12px]">
                      <span
                        aria-hidden
                        className="block size-[14px] rounded border border-[color:var(--ob-border-strong)]"
                      />
                    </th>
                    {[
                      "Date",
                      "To/From",
                      "Amount",
                      "Account",
                      "Method",
                      "",
                      "Attachment",
                    ].map((head, index) => (
                      <th
                        key={head || index}
                        className={cn(
                          "px-[12px] py-[12px] font-normal",
                          index === 2 ? "text-right" : "text-left",
                        )}
                      >
                        {head}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {ROWS.map((row) => (
                    <tr key={row.id} className="border-t border-[color:var(--ob-border)]">
                      <td className="px-[12px] py-[12px]">
                        <span
                          aria-hidden
                          className="block size-[14px] rounded border border-[color:var(--ob-border-strong)]"
                        />
                      </td>
                      <td className="px-[12px] py-[12px] text-[color:var(--ob-fg-soft)]">
                        {row.date}
                      </td>
                      <td className="px-[12px] py-[12px]">
                        <span className="flex items-center gap-[9px]">
                          <BrandMark brand={row.name} size={23} />
                          <span>{row.name}</span>
                          {row.failed && (
                            <span className="rounded bg-[color-mix(in_oklab,#e5457f_14%,transparent)] px-[6px] py-[2px] text-[0.681rem] font-medium text-[color:var(--ob-brand)]">
                              Failed
                            </span>
                          )}
                        </span>
                      </td>
                      <td
                        className={cn(
                          "px-[12px] py-[12px] text-right tabular-nums",
                          row.out
                            ? ""
                            : row.failed
                              ? "text-[color:var(--ob-muted)] line-through"
                              : "text-[color:var(--ob-success)]",
                        )}
                      >
                        {row.amount}
                        <span className="text-[0.643rem]">.{row.cents}</span>
                      </td>
                      <td className="px-[12px] py-[12px]">{row.account}</td>
                      <td className="px-[12px] py-[12px]">
                        <span className="flex items-center gap-[8px]">
                          <span className="text-[color:var(--ob-muted)]">
                            {row.card ? (
                              <CardIcon size={11} />
                            ) : row.method.startsWith("Transfer In") ? (
                              <ArrowRightIcon size={11} />
                            ) : row.method.startsWith("Transfer Out") ? (
                              <ArrowLeftIcon size={11} />
                            ) : (
                              <ArrowsLeftRightIcon size={11} />
                            )}
                          </span>
                          {row.method}
                        </span>
                      </td>
                      <td className="px-[12px] py-[12px]">
                        <span className="flex h-[27px] w-full items-center justify-end rounded-[var(--ob-radius)] border border-[color:var(--ob-border)] px-[9px] text-[0.568rem] text-[color:var(--ob-muted)]">
                          <CaretDownIcon size={8} />
                        </span>
                      </td>
                      <td className="px-[12px] py-[12px] text-right">
                        {row.attachment ? (
                          <span className="text-[color:var(--ob-fg-soft)]">
                            <PaperclipIcon size={11} />
                          </span>
                        ) : (
                          <span
                            aria-hidden
                            className="inline-grid size-[21px] place-items-center rounded-full border border-[color:var(--ob-border-strong)] text-[0.643rem]"
                          >
                            +
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* The hover readout carries the split the chart cannot show. */}
              <span className="pointer-events-none absolute right-[13%] top-[12px] hidden w-[197px] rounded-[var(--ob-radius)] bg-[#1c1c1f] p-[15px] text-white shadow-[0_8px_24px_rgba(0,0,0,0.25)] xl:block">
                <span className="block text-[0.818rem] font-semibold">Workspace</span>
                <span className="flex items-baseline gap-[9px] pt-[9px] text-[0.795rem]">
                  <span className="flex-1 text-white/70">Net change</span>
                  <span className="tabular-nums">−$6.41</span>
                </span>
                <span className="mt-[9px] grid gap-[6px] border-t border-white/15 pt-[9px] text-[0.795rem]">
                  <span className="flex items-baseline gap-[9px]">
                    <span className="h-[11px] w-[2px] bg-[color:var(--ob-success)]" />
                    <span className="flex-1 text-white/70">Money in</span>
                    <span className="tabular-nums">$0.00</span>
                  </span>
                  <span className="flex items-baseline gap-[9px]">
                    <span className="h-[11px] w-[2px] bg-[color:var(--ob-brand)]" />
                    <span className="flex-1 text-white/70">Money out</span>
                    <span className="tabular-nums">−$6.41</span>
                  </span>
                </span>
              </span>
            </div>
          </div>
        </Main>
      </Shell>
    </Surface>
  );
}

function Flow({
  label,
  value,
  color,
}: {
  label: string;
  value: string;
  color: string;
}): ReactNode {
  return (
    <li className="flex items-center gap-[9px] text-[0.818rem]">
      <span aria-hidden className="h-[12px] w-[2px]" style={{ background: color }} />
      <span className="flex-1">{label}</span>
      <span className="tabular-nums">{value}</span>
    </li>
  );
}

function MonthChart() {
  const width = 800;
  const height = 200;
  const spend = [0, 0.1, 2.6, 6.4, 6.6, 6.7, 6.7, 6.7, 6.7];
  const max = 7;
  const step = width / (spend.length - 1);
  const y = (value: number) => height - (value / max) * height;
  const line = spend
    .map((value, i) => `${i === 0 ? "M" : "L"}${i * step},${y(value)}`)
    .join(" ");

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className="h-[151px] w-full"
      preserveAspectRatio="none"
      role="img"
      aria-label="Money in and out this month"
    >
      <defs>
        <linearGradient id="ob-bank-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#e5457f" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#e5457f" stopOpacity="0.02" />
        </linearGradient>
      </defs>
      <path d={`${line} L${width},${height} L0,${height} Z`} fill="url(#ob-bank-fill)" />
      <path
        d={line}
        fill="none"
        stroke="#e5457f"
        strokeWidth={2.5}
        vectorEffect="non-scaling-stroke"
      />
      {/* Money in never moves, so its line sits flat on the floor. */}
      <line
        x1={0}
        x2={width}
        y1={height - 2}
        y2={height - 2}
        stroke="var(--ob-success)"
        strokeWidth={2}
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}
