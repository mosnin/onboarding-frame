"use client";

import { BarChart, Donut, LineChart } from "../../../ui/charts";
import { cn } from "../../../lib/cn";
import { Placeholder } from "../../../ui/placeholder";
import { Surface, crmTokens } from "./tokens";
import { Btn, Main, Shell, Sidebar } from "./chrome";
import type { TemplateProps } from "./props";

export type CrmPage = "companies" | "board" | "record" | "dashboard";

export interface CrmWorkspaceProps extends TemplateProps {
  page?: CrmPage;
}

const NAV = [
  { id: "companies", label: "Companies", glyph: "🏢" },
  { id: "people", label: "People", glyph: "👤" },
  { id: "opportunities", label: "Opportunities", glyph: "🎯" },
  { id: "tasks", label: "Tasks", glyph: "✅" },
  { id: "notes", label: "Notes", glyph: "🗒" },
  { id: "dashboards", label: "Dashboards", glyph: "▦" },
  { id: "workflows", label: "Workflows", glyph: "⚙", caret: true },
];

const OTHER = [
  { id: "settings", label: "Settings", glyph: "⚙" },
  { id: "docs", label: "Documentation", glyph: "?" },
];

/** Records share one shape across the table, board and detail views. */
const RECORDS = [
  { id: "r1", name: "Harbour Labs", domain: "harbourlabs.com", by: "System", owner: "A. Rivera", age: "7 days ago", staff: "45", stage: "Contacted", city: "Singapore" },
  { id: "r2", name: "Northwind", domain: "northwind.io", by: "System", owner: "A. Rivera", age: "7 days ago", staff: "5,000", stage: "New", city: "San Francisco" },
  { id: "r3", name: "Cinder", domain: "cinder.dev", by: "System", owner: "", age: "7 days ago", staff: "1,100", stage: "In discussion", city: "San Francisco" },
  { id: "r4", name: "Meridian", domain: "meridian.com", by: "System", owner: "", age: "7 days ago", staff: "8,000", stage: "Proposal sent", city: "Dublin" },
  { id: "r5", name: "Lumaworks", domain: "lumaworks.com", by: "System", owner: "", age: "7 days ago", staff: "800", stage: "Negotiation", city: "San Francisco" },
  { id: "r6", name: "Fernwood", domain: "fernwood.app", by: "System", owner: "", age: "7 days ago", staff: "400", stage: "Active client", city: "San Francisco" },
  { id: "r7", name: "Atlas Type", domain: "atlastype.dev", by: "A. Rivera", owner: "", age: "2 days ago", staff: "", stage: "Contacted", city: "" },
  { id: "r8", name: "Keystone", domain: "keystone.com", by: "A. Rivera", owner: "", age: "2 days ago", staff: "", stage: "In discussion", city: "Lagos" },
  { id: "r9", name: "Driftwood", domain: "driftwood.co", by: "A. Rivera", owner: "", age: "2 days ago", staff: "", stage: "New", city: "Lyon" },
  { id: "r10", name: "Signal Post", domain: "signalpost.io", by: "A. Rivera", owner: "", age: "2 days ago", staff: "", stage: "Proposal sent", city: "Madrid" },
];

const STAGES = [
  { id: "New", tone: "#e7f0ff", text: "#2f6bff" },
  { id: "Contacted", tone: "#ffeadc", text: "#c2560f" },
  { id: "In discussion", tone: "#fdf3cf", text: "#8a6d10" },
  { id: "Proposal sent", tone: "#efe7ff", text: "#6b46e5" },
  { id: "Negotiation", tone: "#fde8f3", text: "#b8347c" },
  { id: "Active client", tone: "#e0f6e9", text: "#12784a" },
];

const COLUMNS = [
  { id: "name", label: "Name", glyph: "🏢" },
  { id: "domain", label: "Domain", glyph: "🔗" },
  { id: "by", label: "Created by", glyph: "◎" },
  { id: "owner", label: "Account owner", glyph: "👤" },
  { id: "age", label: "Creation date", glyph: "🗓" },
  { id: "staff", label: "Employees", glyph: "👥" },
  { id: "city", label: "Address", glyph: "🗺" },
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
  userName = "Alex Rivera",
  className,
}: CrmWorkspaceProps) {
  const active =
    page === "board" || page === "record" ? "companies" : page === "dashboard" ? "dashboards" : "companies";

  return (
    <Surface tokens={crmTokens}>
      <Shell className={cn(className)} bg="var(--ob-bg)">
        <Sidebar width={252} bg="var(--ob-bg)" className="border-r-0">
          <div className="flex items-center gap-2 p-3">
            <Placeholder width={22} height={22} radius={5} />
            <span className="flex-1 truncate text-[0.88rem] font-semibold">
              {userName.split(" ")[0]}&apos;s workspace
            </span>
            <span aria-hidden className="opacity-40">⌄</span>
          </div>

          <div className="flex items-center gap-2 px-3 pb-3">
            <button type="button" aria-label="Search" className="opacity-50">⌕</button>
            <button type="button" aria-label="Panels" className="opacity-50">▥</button>
            <button
              type="button"
              className="ml-auto flex items-center gap-1.5 rounded-full border border-[color:var(--ob-border)] px-2.5 py-1 text-[0.8rem] font-medium"
            >
              ✦ New chat
            </button>
          </div>

          <p className="px-4 pb-1 pt-3 text-[0.75rem] font-semibold text-[color:var(--ob-muted)]">
            Workspace
          </p>
          <nav className="grid gap-0.5 px-2">
            {NAV.map((item) => (
              <button
                key={item.id}
                type="button"
                aria-current={item.id === active ? "page" : undefined}
                className={cn(
                  "flex items-center gap-2.5 rounded-[6px] px-2.5 py-1.5 text-left text-[0.88rem]",
                  item.id === active
                    ? "bg-[color:var(--ob-surface-3)] font-semibold"
                    : "text-[color:var(--ob-fg-soft)] hover:bg-[color:var(--ob-surface-2)]",
                )}
              >
                <span aria-hidden className="w-4 text-center">{item.glyph}</span>
                <span className="flex-1">{item.label}</span>
                {item.caret && <span aria-hidden className="opacity-40">›</span>}
              </button>
            ))}
          </nav>

          <p className="px-4 pb-1 pt-5 text-[0.75rem] font-semibold text-[color:var(--ob-muted)]">
            Other
          </p>
          <nav className="grid gap-0.5 px-2">
            {OTHER.map((item) => (
              <button
                key={item.id}
                type="button"
                className="flex items-center gap-2.5 rounded-[6px] px-2.5 py-1.5 text-left text-[0.88rem] text-[color:var(--ob-fg-soft)] hover:bg-[color:var(--ob-surface-2)]"
              >
                <span aria-hidden className="w-4 text-center">{item.glyph}</span>
                {item.label}
              </button>
            ))}
          </nav>
        </Sidebar>

        <Main className="p-2 pl-0">
          <div className="flex flex-1 flex-col overflow-hidden rounded-[8px] border border-[color:var(--ob-border)] bg-[color:var(--ob-surface)]">
            {/* Record header */}
            <div className="flex items-center gap-2 border-b border-[color:var(--ob-border)] px-3 py-2.5">
              <span aria-hidden>🏢</span>
              <span className="text-[0.92rem] font-semibold">
                {page === "record"
                  ? "Companies / Harbour Labs"
                  : page === "dashboard"
                    ? "Dashboards / Pipeline"
                    : "Companies"}
              </span>
              <div className="ml-auto flex items-center gap-2">
                {page === "record" ? (
                  <Btn tone="neutral" size="sm">✉ Send email</Btn>
                ) : (
                  <Btn tone="neutral" size="sm">＋ New company</Btn>
                )}
                <button type="button" aria-label="More" className="opacity-50">⋮</button>
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
      <div className="flex items-center gap-2 border-b border-[color:var(--ob-border)] px-3 py-2">
        <span aria-hidden className="opacity-50">☰</span>
        <span className="text-[0.88rem] font-semibold">All companies</span>
        <span className="text-[0.88rem] text-[color:var(--ob-muted)]">· {RECORDS.length}</span>
        <span aria-hidden className="opacity-40">⌄</span>
        <div className="ml-auto flex items-center gap-4 text-[0.85rem] text-[color:var(--ob-fg-soft)]">
          <button type="button">Filter</button>
          <button type="button">Sort</button>
          <button type="button">Options</button>
        </div>
      </div>

      <div className="flex-1 overflow-auto">
        <table className="w-full border-collapse text-[0.85rem]">
          <thead className="sticky top-0 bg-[color:var(--ob-surface)]">
            <tr>
              <th className="w-9 border-b border-r border-[color:var(--ob-border)] px-2 py-2">
                <span aria-hidden className="block size-3.5 rounded-[3px] border border-[color:var(--ob-border-strong)]" />
              </th>
              {COLUMNS.map((column) => (
                <th
                  key={column.id}
                  className="whitespace-nowrap border-b border-r border-[color:var(--ob-border)] px-3 py-2 text-left font-medium text-[color:var(--ob-fg-soft)]"
                >
                  <span className="flex items-center gap-1.5">
                    <span aria-hidden className="opacity-60">{column.glyph}</span>
                    {column.label}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {RECORDS.map((record) => (
              <tr key={record.id} className="hover:bg-[color:var(--ob-surface-2)]">
                <td className="border-b border-r border-[color:var(--ob-border)] px-2 py-2">
                  <span aria-hidden className="block size-3.5 rounded-[3px] border border-[color:var(--ob-border-strong)]" />
                </td>
                <td className="whitespace-nowrap border-b border-r border-[color:var(--ob-border)] px-3 py-2">
                  <span className="flex items-center gap-2">
                    <Placeholder width={16} height={16} radius={4} />
                    <span className="font-medium">{record.name}</span>
                  </span>
                </td>
                <td className="border-b border-r border-[color:var(--ob-border)] px-3 py-2">
                  <Chipish>{record.domain}</Chipish>
                </td>
                <td className="whitespace-nowrap border-b border-r border-[color:var(--ob-border)] px-3 py-2">
                  <span className="flex items-center gap-1.5">
                    <Placeholder width={14} height={14} radius={3} />
                    {record.by}
                  </span>
                </td>
                <td className="whitespace-nowrap border-b border-r border-[color:var(--ob-border)] px-3 py-2">
                  {record.owner && (
                    <span className="flex items-center gap-1.5">
                      <Placeholder shape="circle" width={14} height={14} />
                      {record.owner}
                    </span>
                  )}
                </td>
                <td className="whitespace-nowrap border-b border-r border-[color:var(--ob-border)] px-3 py-2">
                  {record.age}{" "}
                  <span className="text-[color:var(--ob-muted)]">GMT-11</span>
                </td>
                <td className="border-b border-r border-[color:var(--ob-border)] px-3 py-2 tabular-nums">
                  {record.staff}
                </td>
                <td className="whitespace-nowrap border-b border-[color:var(--ob-border)] px-3 py-2">
                  {record.city}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Aggregate footer — a table of records always owes you its totals. */}
      <div className="flex items-center gap-6 border-t border-[color:var(--ob-border)] px-3 py-2 text-[0.82rem]">
        <button type="button" className="flex items-center gap-1 text-[color:var(--ob-muted)]">
          Calculate <span aria-hidden className="opacity-50">⌄</span>
        </button>
        <span className="text-[color:var(--ob-muted)]">
          Count all <strong className="text-[color:var(--ob-fg)]">{RECORDS.length}</strong>
        </span>
        <span className="ml-auto text-[color:var(--ob-muted)]">
          Max employees <strong className="text-[color:var(--ob-fg)]">8,000</strong>
        </span>
        <span className="text-[color:var(--ob-muted)]">
          Empty address <strong className="text-[color:var(--ob-fg)]">20%</strong>
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
                    <Placeholder width={16} height={16} radius={4} />
                    {record.name}
                  </p>
                  <dl className="mt-2.5 grid gap-1.5 text-[0.8rem]">
                    <div className="flex items-center gap-2">
                      <span aria-hidden className="opacity-50">🔗</span>
                      <Chipish>{record.domain}</Chipish>
                    </div>
                    <div className="flex items-center gap-2">
                      <span aria-hidden className="opacity-50">◎</span>
                      <span>{record.by}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span aria-hidden className="opacity-50">🗓</span>
                      <span>{record.age}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span aria-hidden className="opacity-50">👥</span>
                      <span className={record.staff ? "" : "text-[color:var(--ob-muted)]"}>
                        {record.staff || "Employees"}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span aria-hidden className="opacity-50">🗺</span>
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
          <Placeholder width={56} height={56} radius={12} />
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
              { label: "Domain name", glyph: "🔗", value: <Chipish>{record.domain}</Chipish> },
              { label: "Account owner", glyph: "👤", value: record.owner || "—" },
            ],
          },
          {
            heading: "Business",
            rows: [
              { label: "ARR", glyph: "💰", value: "$3.5m" },
              { label: "Employees", glyph: "👥", value: record.staff },
              { label: "ICP", glyph: "◎", value: "✓ True" },
            ],
          },
          {
            heading: "Contact",
            rows: [
              { label: "Address", glyph: "🗺", value: record.city },
              { label: "Stage", glyph: "∿", value: <StageChip stage={record.stage} /> },
            ],
          },
        ].map((group) => (
          <div key={group.heading} className="pb-4">
            <button
              type="button"
              className="flex w-full items-center py-2 text-left text-[0.88rem] font-semibold"
            >
              <span className="flex-1">{group.heading}</span>
              <span aria-hidden className="opacity-40">⌃</span>
            </button>
            {group.rows.map((row) => (
              <div key={row.label} className="flex items-center gap-2 py-1.5 text-[0.85rem]">
                <span aria-hidden className="opacity-50">{row.glyph}</span>
                <span className="w-32 shrink-0 text-[color:var(--ob-muted)]">{row.label}</span>
                <span>{row.value}</span>
              </div>
            ))}
          </div>
        ))}

        <div className="border-t border-[color:var(--ob-border)] pt-4">
          <div className="flex items-center gap-2 pb-2">
            <h3 className="flex-1 font-semibold">People</h3>
            <button type="button" aria-label="Open" className="opacity-50">↗</button>
            <button type="button" aria-label="Add" className="opacity-50">＋</button>
          </div>
          {["Dana Okoye", "Priya Raman"].map((person) => (
            <span
              key={person}
              className="mb-1.5 mr-1.5 inline-flex items-center gap-1.5 rounded-[5px] bg-[color:var(--ob-surface-2)] px-2 py-1 text-[0.82rem]"
            >
              <Placeholder shape="circle" width={14} height={14} />
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
                      {group.key === "DONE" ? "✓" : ""}
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
                      🗓 {task.due}
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
            { label: "Northwind", color: "#fde2c0" },
            { label: "Cinder", color: "#f7c98b" },
            { label: "Lumaworks", color: "#f0a95c" },
            { label: "Not set", color: "#e08b3a" },
            { label: "Meridian", color: "#d97528" },
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
                <td className="border-b border-[color:var(--ob-border)] px-2 py-2">
                  <span className="flex items-center gap-2">
                    <Placeholder width={16} height={16} radius={4} />
                    {record.name}
                  </span>
                </td>
                <td className="border-b border-[color:var(--ob-border)] px-2 py-2">
                  <Chipish>{record.domain}</Chipish>
                </td>
                <td className="border-b border-[color:var(--ob-border)] px-2 py-2">
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
