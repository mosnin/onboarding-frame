"use client";

import type { ComponentType } from "react";
import { BarChart, Donut, LineChart } from "../../../ui/charts";
import { cn } from "../../../lib/cn";
import { Surface, crmTokens } from "./tokens";
import { Btn, Main, Shell, Sidebar } from "./chrome";
import type { TemplateProps } from "./props";
import { Avatar } from "../../../ui/avatar";
import { BrandMark } from "../../../ui/brand";
import {
  BuildingsIcon,
  CalendarIcon,
  CaretDownIcon,
  CaretUpIcon,
  ChatDotsIcon,
  CheckIcon,
  CheckSquareIcon,
  CrosshairIcon,
  CurrencyIcon,
  ExternalSquareIcon,
  GearIcon,
  HouseIcon,
  LinkIcon,
  MapPinIcon,
  MoreVerticalIcon,
  NotepadIcon,
  QuestionIcon,
  SearchIcon,
  SidebarBold,
  SquaresFourIcon,
  TargetIcon,
  UserIcon,
  UsersThreeIcon,
} from "../../../ui/icons-solid";

export type CrmPage = "companies" | "board" | "record" | "dashboard";

export interface CrmWorkspaceProps extends TemplateProps {
  page?: CrmPage;
}

/*
 * The reference sets every rail mark in a tinted rounded tile, and the tint
 * carries the meaning — blue for records, teal for work, orange for
 * automation. Colours sampled off the capture.
 */
type NavItem = {
  id: string;
  label: string;
  Icon: ComponentType<{ size?: number; className?: string }>;
  tile: string;
  ink: string;
  caret?: boolean;
};

const NAV: NavItem[] = [
  { id: "companies", label: "Companies", Icon: BuildingsIcon, tile: "#cfe1ff", ink: "#3b6fe0" },
  { id: "people", label: "People", Icon: UserIcon, tile: "#d0deff", ink: "#3b6fe0" },
  { id: "opportunities", label: "Opportunities", Icon: TargetIcon, tile: "#ffd9db", ink: "#e03e46" },
  { id: "tasks", label: "Tasks", Icon: CheckSquareIcon, tile: "#b1f6e9", ink: "#12987c" },
  { id: "notes", label: "Notes", Icon: NotepadIcon, tile: "#9deadb", ink: "#12987c" },
  { id: "dashboards", label: "Dashboards", Icon: SquaresFourIcon, tile: "#ececec", ink: "#6b6b6b" },
  { id: "workflows", label: "Workflows", Icon: GearIcon, tile: "#f5c993", ink: "#b3700d", caret: true },
];

const WORKFLOW_CHILDREN = ["Workflows", "Workflow Runs", "Workflow Versions"];

const OTHER = [
  { id: "settings", label: "Settings", Icon: GearIcon },
  { id: "docs", label: "Documentation", Icon: QuestionIcon },
];

/**
 * Records share one shape across the table, board and detail views.
 *
 * These are the companies the reference's own seed data lists, with their
 * Simple Icons slug where the set carries the mark. Replacing them with
 * invented names was what made the table read as filler: a CRM's demo data is
 * recognisable companies, and the row marks are most of what you see.
 */
const RECORDS = [
  { id: "r1", name: "Mobbin", brand: "", domain: "mobbin.com", by: "Alex Smith", owner: "Alex Smith", age: "7 days ago", staff: "45", linkedin: "mobbin", stage: "Contacted", city: "75 Ayer Rajah Crescent, Sing…" },
  { id: "r2", name: "Airbnb", brand: "airbnb", domain: "airbnb.com", by: "System", owner: "Alex Smith", age: "7 days ago", staff: "5,000", linkedin: "airbnb", stage: "New", city: "888 Brannan St, San Franci…" },
  { id: "r3", name: "Anthropic", brand: "anthropic", domain: "anthropic.com", by: "System", owner: "", age: "7 days ago", staff: "1,100", linkedin: "", stage: "In discussion", city: "548 Market Street, San Fra…" },
  { id: "r4", name: "Stripe", brand: "stripe", domain: "stripe.com", by: "System", owner: "", age: "7 days ago", staff: "8,000", linkedin: "", stage: "Proposal sent", city: "Eutaw Street, Dublin, Ireland" },
  { id: "r5", name: "Figma", brand: "figma", domain: "figma.com", by: "System", owner: "", age: "7 days ago", staff: "800", linkedin: "", stage: "Negotiation", city: "760 Market St, Floor 10, Sa…" },
  { id: "r6", name: "Notion", brand: "notion", domain: "notion.com", by: "System", owner: "", age: "7 days ago", staff: "400", linkedin: "", stage: "Active client", city: "2300 Harrison St, San Fran…" },
  { id: "r7", name: "Clerk.com", brand: "clerk", domain: "clerk.dev", by: "Alex Smith", owner: "", age: "2 days ago", staff: "", linkedin: "", stage: "Contacted", city: "San Francisco" },
  { id: "r8", name: "Whop", brand: "", domain: "whop.com", by: "Alex Smith", owner: "", age: "2 days ago", staff: "", linkedin: "", stage: "In discussion", city: "" },
  { id: "r9", name: "Vercel", brand: "vercel", domain: "vercel.com", by: "Alex Smith", owner: "", age: "2 days ago", staff: "", linkedin: "", stage: "New", city: "San Francisco" },
  { id: "r10", name: "GitBook", brand: "gitbook", domain: "gitbook.com", by: "Alex Smith", owner: "", age: "2 days ago", staff: "", linkedin: "", stage: "Proposal sent", city: "Lyon" },
  { id: "r11", name: "Warby Parker", brand: "", domain: "warbyparker.c…", by: "Alex Smith", owner: "", age: "2 days ago", staff: "", linkedin: "", stage: "New", city: "New York" },
  { id: "r12", name: "Shipt", brand: "", domain: "shipt.com", by: "Alex Smith", owner: "", age: "2 days ago", staff: "", linkedin: "", stage: "Contacted", city: "Birmingham" },
  { id: "r13", name: "Alchemy Pay", brand: "alchemy", domain: "alchemypay.o…", by: "Alex Smith", owner: "", age: "2 days ago", staff: "", linkedin: "", stage: "New", city: "Singapore" },
  { id: "r14", name: "Superhuman", brand: "", domain: "superhuman.c…", by: "Alex Smith", owner: "", age: "2 days ago", staff: "", linkedin: "", stage: "Contacted", city: "San Francisco" },
  { id: "r15", name: "Transcend", brand: "", domain: "transcend.io", by: "Alex Smith", owner: "", age: "2 days ago", staff: "", linkedin: "", stage: "New", city: "San Francisco" },
  { id: "r16", name: "Dovetail", brand: "dovetail", domain: "dovetail.com", by: "Alex Smith", owner: "", age: "2 days ago", staff: "", linkedin: "", stage: "In discussion", city: "Sydney" },
  { id: "r17", name: "Outseta", brand: "", domain: "outseta.com", by: "Alex Smith", owner: "", age: "2 days ago", staff: "", linkedin: "", stage: "New", city: "San Diego" },
  { id: "r18", name: "Uber for Business", brand: "uber", domain: "uber.com", by: "Alex Smith", owner: "", age: "2 days ago", staff: "", linkedin: "", stage: "Contacted", city: "San Francisco" },
];

/** The capture's own total; the table shows the first page of it. */
const RECORD_TOTAL = 217;

const STAGES = [
  { id: "New", tone: "#e7f0ff", text: "#2f6bff" },
  { id: "Contacted", tone: "#ffeadc", text: "#c2560f" },
  { id: "In discussion", tone: "#fdf3cf", text: "#8a6d10" },
  { id: "Proposal sent", tone: "#efe7ff", text: "#6b46e5" },
  { id: "Negotiation", tone: "#fde8f3", text: "#b8347c" },
  { id: "Active client", tone: "#e0f6e9", text: "#12784a" },
];

const COLUMNS = [
  { id: "name", label: "Name", Icon: BuildingsIcon },
  { id: "domain", label: "Domain", Icon: LinkIcon },
  { id: "by", label: "Created by", Icon: UserIcon },
  { id: "owner", label: "Account Owner", Icon: UserIcon },
  { id: "age", label: "Creation date", Icon: CalendarIcon },
  { id: "staff", label: "Employees", Icon: UsersThreeIcon },
  { id: "linkedin", label: "Linkedin", Icon: LinkIcon },
  { id: "city", label: "Address", Icon: MapPinIcon },
];

function Chipish({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-[5px] border border-[color:var(--ob-border)] bg-[color:var(--ob-surface-2)] px-1.5 py-0.5 text-[0.78rem]">
      {children}
    </span>
  );
}

function StageChip({ stage }: { stage: string }) {
  const found = STAGES.find((s) => s.id === stage);
  return (
    <span
      className="inline-flex items-center rounded-[5px] px-1.5 py-0.5 text-[0.75rem] font-medium"
      style={{ background: found?.tone, color: found?.text }}
    >
      {stage}
    </span>
  );
}

/**
 * CRM workspace.
 *
 * Four real views over one record set — table, board, record detail and a
 * dashboard — because a CRM is judged on how the same data reads in each.
 * Switching pages here re-renders the same records rather than a fresh set of
 * invented ones.
 */
export function CrmWorkspaceTemplate({
  page = "companies",
  userName = "Alex Smith",
  className,
}: CrmWorkspaceProps) {
  // The capture names the workspace after the account, not "<first>'s
  // workspace"; the rail shows the initials tile beside it.
  const workspace = `AS ${userName.split(" ").slice(-1)[0]}`;
  const active =
    page === "board" || page === "record" ? "companies" : page === "dashboard" ? "dashboards" : "companies";

  return (
    <Surface tokens={crmTokens}>
      <Shell className={cn(className)} bg="var(--ob-bg)">
        <Sidebar width={221} bg="var(--ob-bg)" className="border-r-0">
          <div className="flex items-center gap-2 px-2.5 py-2.5">
            <Avatar name={workspace} size={20} rounded={5} />
            <span className="flex-1 truncate text-[0.82rem] font-semibold">{workspace}</span>
            <CaretDownIcon size={12} className="text-[color:var(--ob-muted)]" />
            <button type="button" aria-label="Search" className="text-[color:var(--ob-fg-soft)]">
              <SearchIcon size={15} />
            </button>
            <button type="button" aria-label="Panels" className="text-[color:var(--ob-fg-soft)]">
              <SidebarBold size={15} />
            </button>
          </div>

          <div className="flex items-center gap-2 px-2.5 pb-2">
            {/* A two-up segmented pill, then the chat action. */}
            <span className="flex items-center rounded-full border border-[color:var(--ob-border)] p-[2px]">
              <span className="grid size-[22px] place-items-center rounded-full bg-[color:var(--ob-surface-3)]">
                <HouseIcon size={13} />
              </span>
              <span className="grid size-[22px] place-items-center rounded-full text-[color:var(--ob-fg-soft)]">
                <ChatDotsIcon size={13} />
              </span>
            </span>
            <button
              type="button"
              className="ml-auto flex items-center gap-1.5 rounded-full border border-[color:var(--ob-border)] px-2.5 py-[3px] text-[0.76rem] font-medium"
            >
              <ChatDotsIcon size={13} /> New chat
            </button>
          </div>

          <p className="px-3 pb-1 pt-3 text-[0.72rem] text-[color:var(--ob-muted)]">Workspace</p>
          <nav className="grid gap-[1px] px-2">
            {NAV.map((item) => (
              <div key={item.id}>
                <button
                  type="button"
                  aria-current={item.id === active ? "page" : undefined}
                  className={cn(
                    "flex h-[27px] w-full items-center gap-2 rounded-[6px] px-1.5 text-left text-[0.82rem]",
                    item.id === active
                      ? "bg-[color:var(--ob-surface-3)] font-medium"
                      : "text-[color:var(--ob-fg-soft)]",
                  )}
                >
                  <span
                    aria-hidden
                    className="grid size-[18px] shrink-0 place-items-center rounded-[5px]"
                    style={{ background: item.tile, color: item.ink }}
                  >
                    <item.Icon size={12} />
                  </span>
                  <span className="flex-1 truncate">{item.label}</span>
                  {item.caret && <CaretDownIcon size={11} className="text-[color:var(--ob-muted)]" />}
                </button>

                {/* Workflows is expanded in the capture, with a tree spine. */}
                {item.caret &&
                  WORKFLOW_CHILDREN.map((child) => (
                    <span
                      key={child}
                      className="ml-[13px] flex h-[27px] items-center gap-2 border-l border-[color:var(--ob-border)] pl-3 text-[0.82rem] text-[color:var(--ob-fg-soft)]"
                    >
                      <span
                        aria-hidden
                        className="grid size-[18px] shrink-0 place-items-center rounded-[5px] border border-[color:var(--ob-border)] text-[color:var(--ob-muted)]"
                      >
                        <GearIcon size={11} />
                      </span>
                      <span className="truncate">{child}</span>
                    </span>
                  ))}
              </div>
            ))}
          </nav>

          <p className="px-3 pb-1 pt-4 text-[0.72rem] text-[color:var(--ob-muted)]">Other</p>
          <nav className="grid gap-[1px] px-2">
            {OTHER.map((item) => (
              <button
                key={item.id}
                type="button"
                className="flex h-[27px] items-center gap-2 rounded-[6px] px-1.5 text-left text-[0.82rem] text-[color:var(--ob-fg-soft)]"
              >
                <span aria-hidden className="grid size-[18px] shrink-0 place-items-center text-[color:var(--ob-muted)]">
                  <item.Icon size={13} />
                </span>
                {item.label}
              </button>
            ))}
          </nav>
        </Sidebar>

        <Main className="p-2 pl-0">
          <div className="flex flex-1 flex-col overflow-hidden rounded-[8px] border border-[color:var(--ob-border)] bg-[color:var(--ob-surface)]">
            {/* Record header */}
            <div className="flex items-center gap-2 border-b border-[color:var(--ob-border)] px-2 py-[3px]">
              <span
                aria-hidden
                className="grid size-[18px] shrink-0 place-items-center rounded-[5px]"
                style={{ background: "#cfe1ff", color: "#3b6fe0" }}
              >
                <BuildingsIcon size={12} />
              </span>
              <span className="text-[0.86rem] font-semibold">
                {page === "record"
                  ? "Companies / Mobbin"
                  : page === "dashboard"
                    ? "Dashboards / Pipeline"
                    : "Companies"}
              </span>
              <div className="ml-auto flex items-center gap-2">
                {page === "record" ? (
                  <Btn tone="neutral" size="sm">Send email</Btn>
                ) : (
                  <Btn tone="neutral" size="sm">+ New Company</Btn>
                )}
                <button
                  type="button"
                  aria-label="More"
                  className="text-[color:var(--ob-muted)]"
                >
                  <MoreVerticalIcon size={15} />
                </button>
              </div>
            </div>

            {page === "companies" && <TableView />}
            {page === "board" && <BoardView />}
            {page === "record" && <RecordView />}
            {page === "dashboard" && <DashboardView />}
          </div>
        </Main>
      </Shell>
    </Surface>
  );
}

/* ----------------------------- Table ----------------------------- */

function TableView() {
  return (
    <>
      <div className="flex items-center gap-2 border-b border-[color:var(--ob-border)] px-2 py-[3px]">
        <SquaresFourIcon size={14} className="text-[color:var(--ob-muted)]" />
        <span className="text-[0.82rem] font-semibold">All Companies</span>
        <span className="text-[0.82rem] text-[color:var(--ob-muted)]">· {RECORD_TOTAL}</span>
        <CaretDownIcon size={11} className="text-[color:var(--ob-muted)]" />
        <div className="ml-auto flex items-center gap-4 text-[0.85rem] text-[color:var(--ob-fg-soft)]">
          <button type="button">Filter</button>
          <button type="button">Sort</button>
          <button type="button">Options</button>
        </div>
      </div>

      <div className="flex-1 overflow-auto">
        <table className="w-full border-collapse text-[0.79rem]">
          <thead className="sticky top-0 bg-[color:var(--ob-surface)]">
            <tr>
              <th className="w-9 border-b border-r border-[color:var(--ob-border)] px-2 py-[3px]">
                <span aria-hidden className="block size-3.5 rounded-[3px] border border-[color:var(--ob-border-strong)]" />
              </th>
              {COLUMNS.map((column) => (
                <th
                  key={column.id}
                  className="whitespace-nowrap border-b border-r border-[color:var(--ob-border)] px-2 py-[3px] text-left font-medium text-[color:var(--ob-fg-soft)]"
                >
                  <span className="flex items-center gap-1.5">
                    <column.Icon size={12} className="text-[color:var(--ob-muted)]" />
                    {column.label}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {RECORDS.map((record) => (
              <tr key={record.id} className="hover:bg-[color:var(--ob-surface-2)]">
                <td className="border-b border-r border-[color:var(--ob-border)] px-2 py-[3px]">
                  <span aria-hidden className="block size-3.5 rounded-[3px] border border-[color:var(--ob-border-strong)]" />
                </td>
                <td className="whitespace-nowrap border-b border-r border-[color:var(--ob-border)] px-2 py-[3px]">
                  <span className="flex items-center gap-2">
                    <BrandMark brand={record.brand || record.name} label={record.name} size={15} />
                    <span className="font-medium">{record.name}</span>
                  </span>
                </td>
                <td className="border-b border-r border-[color:var(--ob-border)] px-2 py-[3px]">
                  <Chipish>{record.domain}</Chipish>
                </td>
                <td className="whitespace-nowrap border-b border-r border-[color:var(--ob-border)] px-2 py-[3px]">
                  <span className="flex items-center gap-1.5">
                    <Avatar name={record.by} size={14} rounded={3} />
                    {record.by}
                  </span>
                </td>
                <td className="whitespace-nowrap border-b border-r border-[color:var(--ob-border)] px-2 py-[3px]">
                  {record.owner && (
                    <span className="flex items-center gap-1.5">
                      <Avatar name={record.owner} size={14} />
                      {record.owner}
                    </span>
                  )}
                </td>
                <td className="whitespace-nowrap border-b border-r border-[color:var(--ob-border)] px-2 py-[3px]">
                  {record.age}{" "}
                  <span className="text-[color:var(--ob-muted)]">GMT-11</span>
                </td>
                <td className="border-b border-r border-[color:var(--ob-border)] px-2 py-[3px] tabular-nums">
                  {record.staff}
                </td>
                <td className="whitespace-nowrap border-b border-r border-[color:var(--ob-border)] px-2 py-[3px]">
                  {record.linkedin && <Chipish>{record.linkedin}</Chipish>}
                </td>
                <td className="whitespace-nowrap border-b border-[color:var(--ob-border)] px-2 py-[3px]">
                  {record.city}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Aggregate footer — a table of records always owes you its totals. */}
      <div className="flex items-center gap-6 border-t border-[color:var(--ob-border)] px-2 py-[3px] text-[0.82rem]">
        <button type="button" className="flex items-center gap-1 text-[color:var(--ob-muted)]">
          Calculate <CaretDownIcon size={11} />
        </button>
        <span className="text-[color:var(--ob-muted)]">
          Count all <strong className="text-[color:var(--ob-fg)]">{RECORD_TOTAL}</strong>
        </span>
        <span className="ml-auto text-[color:var(--ob-muted)]">
          Max of Empl. <strong className="text-[color:var(--ob-fg)]">8,000</strong>
        </span>
        <span className="text-[color:var(--ob-muted)]">
          Empty of Linkedin <strong className="text-[color:var(--ob-fg)]">99%</strong>
        </span>
        <span className="text-[color:var(--ob-muted)]">
          Not empty of Addr… <strong className="text-[color:var(--ob-fg)]">138</strong>
        </span>
      </div>
    </>
  );
}

/* ----------------------------- Board ----------------------------- */

function BoardView() {
  return (
    <div className="flex flex-1 gap-3 overflow-x-auto p-3">
      {STAGES.map((stage) => {
        const cards = RECORDS.filter((record) => record.stage === stage.id);
        return (
          <div key={stage.id} className="w-[260px] shrink-0">
            <div className="flex items-center gap-2 pb-2.5">
              <span
                className="rounded-[5px] px-2 py-0.5 text-[0.78rem] font-semibold"
                style={{ background: stage.tone, color: stage.text }}
              >
                {stage.id}
              </span>
              <span className="text-[0.8rem] text-[color:var(--ob-muted)]">
                {cards.length || "–"}
              </span>
            </div>

            <div className="grid gap-2">
              {cards.map((record) => (
                <article
                  key={record.id}
                  className="rounded-[6px] border border-[color:var(--ob-border)] bg-[color:var(--ob-surface)] p-3"
                >
                  <p className="flex items-center gap-2 font-semibold">
                    <BrandMark brand={record.brand || record.name} label={record.name} size={15} />
                    {record.name}
                  </p>
                  <dl className="mt-2.5 grid gap-1.5 text-[0.8rem]">
                    <div className="flex items-center gap-2">
                      <LinkIcon size={13} className="text-[color:var(--ob-muted)]" />
                      <Chipish>{record.domain}</Chipish>
                    </div>
                    <div className="flex items-center gap-2">
                      <UserIcon size={13} className="text-[color:var(--ob-muted)]" />
                      <span>{record.by}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CalendarIcon size={13} className="text-[color:var(--ob-muted)]" />
                      <span>{record.age}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <UsersThreeIcon size={13} className="text-[color:var(--ob-muted)]" />
                      <span className={record.staff ? "" : "text-[color:var(--ob-muted)]"}>
                        {record.staff || "Employees"}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPinIcon size={13} className="text-[color:var(--ob-muted)]" />
                      <span className={record.city ? "" : "text-[color:var(--ob-muted)]"}>
                        {record.city || "Address"}
                      </span>
                    </div>
                  </dl>
                </article>
              ))}
              <button
                type="button"
                className="rounded-[6px] px-3 py-2 text-left text-[0.85rem] text-[color:var(--ob-muted)] hover:bg-[color:var(--ob-surface-2)]"
              >
                ＋ New
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ----------------------------- Record ----------------------------- */

interface Task {
  title: string;
  body: string;
  due: string;
  /** Past-due tasks colour their date; the flag is absent on the rest. */
  overdue?: boolean;
}

const TASKS: Record<"todo" | "progress" | "done", Task[]> = {
  todo: [
    { title: "Analyse performance metrics", body: "Define success KPIs and evaluation benchmarks", due: "May 21, 2026" },
    { title: "Define training scope", body: "Clarify datasets, outputs and objectives", due: "Today" },
    { title: "Schedule partnership call", body: "Coordinate an initial 60-minute session", due: "May 19, 2026", overdue: true },
  ],
  progress: [
    { title: "Send enterprise proposal", body: "Prepare and send a detailed collaboration proposal", due: "May 14, 2026" },
  ],
  done: [
    { title: "Prepare custom pricing", body: "Create a tailored enterprise package", due: "Today" },
  ],
};

function RecordView() {
  const record = RECORDS[0]!;
  return (
    <div className="flex flex-1 overflow-hidden">
      <div className="w-[330px] shrink-0 overflow-auto border-r border-[color:var(--ob-border)] p-5">
        <div className="grid justify-items-center gap-2.5 pb-5">
          <BrandMark
            brand={record.brand || record.name}
            label={record.name}
            size={56}
            className="rounded-[12px]"
          />
          <h2 className="text-[1.3rem] font-extrabold tracking-tight">{record.name}</h2>
          <p className="text-[0.85rem] text-[color:var(--ob-muted)]">Added 8 days ago</p>
        </div>

        <h3 className="border-t border-[color:var(--ob-border)] pb-2 pt-4 font-semibold">
          Fields
        </h3>

        {[
          {
            heading: "General",
            rows: [
              { label: "Domain name", Icon: LinkIcon, value: <Chipish>{record.domain}</Chipish> },
              { label: "Account owner", Icon: UserIcon, value: record.owner || "—" },
            ],
          },
          {
            heading: "Business",
            rows: [
              { label: "ARR", Icon: CurrencyIcon, value: "$3.5m" },
              { label: "Employees", Icon: UsersThreeIcon, value: record.staff },
              { label: "ICP", Icon: CrosshairIcon, value: <span className="inline-flex items-center gap-1"><CheckIcon size={11} /> True</span> },
            ],
          },
          {
            heading: "Contact",
            rows: [
              { label: "Address", Icon: MapPinIcon, value: record.city },
              { label: "Stage", Icon: CrosshairIcon, value: <StageChip stage={record.stage} /> },
            ],
          },
        ].map((group) => (
          <div key={group.heading} className="pb-4">
            <button
              type="button"
              className="flex w-full items-center py-2 text-left text-[0.88rem] font-semibold"
            >
              <span className="flex-1">{group.heading}</span>
              <CaretUpIcon size={11} />
            </button>
            {group.rows.map((row) => (
              <div key={row.label} className="flex items-center gap-2 py-1.5 text-[0.85rem]">
                <row.Icon size={13} className="text-[color:var(--ob-muted)]" />
                <span className="w-32 shrink-0 text-[color:var(--ob-muted)]">{row.label}</span>
                <span>{row.value}</span>
              </div>
            ))}
          </div>
        ))}

        <div className="border-t border-[color:var(--ob-border)] pt-4">
          <div className="flex items-center gap-2 pb-2">
            <h3 className="flex-1 font-semibold">People</h3>
            <button type="button" aria-label="Open" className="text-[color:var(--ob-muted)]">
              <ExternalSquareIcon size={14} />
            </button>
            <button type="button" aria-label="Add" className="opacity-50">＋</button>
          </div>
          {["Dana Okoye", "Priya Raman"].map((person) => (
            <span
              key={person}
              className="mb-1.5 mr-1.5 inline-flex items-center gap-1.5 rounded-[5px] bg-[color:var(--ob-surface-2)] px-2 py-1 text-[0.82rem]"
            >
              <Avatar name={person} size={14} />
              {person}
            </span>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-auto">
        <div className="flex items-center gap-6 border-b border-[color:var(--ob-border)] px-5">
          {["Timeline", "Tasks", "Notes", "Files", "Emails", "Calendar"].map((tab, i) => (
            <button
              key={tab}
              type="button"
              className={cn(
                "-mb-px border-b-2 py-3 text-[0.88rem] font-medium",
                i === 1
                  ? "border-[color:var(--ob-fg)] font-semibold"
                  : "border-transparent text-[color:var(--ob-muted)]",
              )}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="p-5">
          {[
            { key: "TODO", items: TASKS.todo },
            { key: "IN PROGRESS", items: TASKS.progress },
            { key: "DONE", items: TASKS.done },
          ].map((group) => (
            <section key={group.key} className="pb-6">
              <div className="flex items-center gap-2 pb-2.5">
                <h3 className="text-[0.78rem] font-bold tracking-wide text-[color:var(--ob-muted)]">
                  {group.key}
                </h3>
                <span className="text-[0.8rem] text-[color:var(--ob-muted)]">
                  {group.items.length}
                </span>
                {group.key === "TODO" && (
                  <Btn tone="neutral" size="sm" className="ml-auto">＋ Add task</Btn>
                )}
              </div>
              <div className="grid gap-1.5">
                {group.items.map((task) => (
                  <div
                    key={task.title}
                    className="flex items-center gap-3 rounded-[6px] border border-[color:var(--ob-border)] px-3.5 py-3"
                  >
                    <span
                      aria-hidden
                      className={cn(
                        "grid size-4 shrink-0 place-items-center rounded-full border text-[0.6rem]",
                        group.key === "DONE"
                          ? "border-transparent bg-[color:var(--ob-brand)] text-white"
                          : "border-[color:var(--ob-border-strong)]",
                      )}
                    >
                      {group.key === "DONE" ? <CheckIcon size={11} /> : null}
                    </span>
                    <span
                      className={cn(
                        "font-semibold",
                        group.key === "DONE" && "text-[color:var(--ob-muted)] line-through",
                      )}
                    >
                      {task.title}
                    </span>
                    <span className="flex-1 truncate text-[0.85rem] text-[color:var(--ob-muted)]">
                      {task.body}
                    </span>
                    <span
                      className={cn(
                        "shrink-0 text-[0.82rem]",
                        task.overdue
                          ? "text-[color:var(--ob-danger)]"
                          : "text-[color:var(--ob-muted)]",
                      )}
                    >
                      <CalendarIcon size={12} /> {task.due}
                    </span>
                    <Chipish>{RECORDS[0]!.name}</Chipish>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------------------------- Dashboard ---------------------------- */

function DashboardView() {
  return (
    <div className="grid flex-1 content-start gap-3 overflow-auto p-3 lg:grid-cols-2">
      <section className="rounded-[8px] border border-[color:var(--ob-border)] p-5">
        <h3 className="font-bold">Deals by company</h3>
        <div className="mt-4 flex items-center justify-center gap-8">
          <Donut
            size={190}
            thickness={26}
            segments={[
              { id: "a", value: 100, color: "#fde2c0" },
              { id: "b", value: 135, color: "#f7c98b" },
              { id: "c", value: 30, color: "#f0a95c" },
              { id: "d", value: 5.5, color: "#e08b3a" },
              { id: "e", value: 95, color: "#d97528" },
            ]}
            center={
              <span className="grid">
                <span className="text-[1.5rem] font-extrabold tracking-tight">365.5k</span>
                <span className="text-[0.8rem] text-[color:var(--ob-muted)]">Total</span>
              </span>
            }
          />
        </div>
        <div className="mt-5 flex flex-wrap justify-center gap-4 text-[0.8rem]">
          {[
            { label: "Airbnb", color: "#fde2c0" },
            { label: "Anthropic", color: "#f7c98b" },
            { label: "Stripe", color: "#f0a95c" },
            { label: "Not set", color: "#e08b3a" },
            { label: "Figma", color: "#d97528" },
          ].map((entry) => (
            <span key={entry.label} className="flex items-center gap-1.5">
              <span className="size-2.5 rounded-[3px]" style={{ background: entry.color }} />
              {entry.label}
            </span>
          ))}
        </div>
      </section>

      <section className="rounded-[8px] border border-[color:var(--ob-border)] p-5">
        <h3 className="font-bold">Companies</h3>
        <table className="mt-4 w-full border-collapse text-[0.85rem]">
          <thead>
            <tr>
              {["Name", "Domain", "Address", "Employees"].map((label) => (
                <th
                  key={label}
                  className="border-b border-[color:var(--ob-border)] px-2 py-2 text-left font-medium text-[color:var(--ob-muted)]"
                >
                  {label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {RECORDS.slice(0, 2).map((record) => (
              <tr key={record.id}>
                <td className="border-b border-[color:var(--ob-border)] px-2 py-[3px]">
                  <span className="flex items-center gap-2">
                    <BrandMark brand={record.brand || record.name} label={record.name} size={15} />
                    {record.name}
                  </span>
                </td>
                <td className="border-b border-[color:var(--ob-border)] px-2 py-[3px]">
                  <Chipish>{record.domain}</Chipish>
                </td>
                <td className="border-b border-[color:var(--ob-border)] px-2 py-[3px]">
                  {record.city}
                </td>
                <td className="border-b border-[color:var(--ob-border)] px-2 py-2 tabular-nums">
                  {record.staff}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="rounded-[8px] border border-[color:var(--ob-border)] p-5">
        <h3 className="font-bold">Pipeline value</h3>
        <BarChart
          className="mt-4"
          values={[80, 80.5, 45, 60, 100]}
          xLabels={["New", "Screening", "Meeting", "Proposal", "Customer"]}
          yLabels={["200k", "0"]}
          height={170}
          color="#f0a95c"
        />
      </section>

      <section className="rounded-[8px] border border-[color:var(--ob-border)] p-5">
        <h3 className="font-bold">Task status</h3>
        <LineChart
          className="mt-4"
          height={170}
          smooth
          series={[{ id: "tasks", points: [4, 2, 1], color: "#8fa8f5", area: true }]}
          yLabels={["6", "4", "2", "0"]}
          xLabels={["To do", "In progress", "Done"]}
        />
      </section>
    </div>
  );
}
