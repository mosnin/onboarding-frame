"use client";

import { Placeholder } from "../../../ui/placeholder";
import { cn } from "../../../lib/cn";
import { Surface, setupChecklistTokens } from "./tokens";
import { ProgressBar } from "../../../ui/primitives";
import { BarChart, LineChart } from "../../../ui/charts";
import {
  Banner,
  Btn,
  Card,
  Fab,
  Main,
  SearchField,
  Shell,
  Sidebar,
  Tabs,
  TopBar,
} from "./chrome";
import type { TemplateProps } from "./props";
import {
  BellIcon,
  Check,
  ChevronDown,
  ChevronRight,
  GemIcon,
  Icon,
  Sparkle,
  type IconName,
} from "../../../ui/icons";

const NAV: {
  id: string;
  label: string;
  icon: IconName;
  active?: boolean;
  caret?: boolean;
}[] = [
  { id: "setup", label: "Setup", icon: "rocket", active: true },
  { id: "home", label: "Home", icon: "home" },
  { id: "projects", label: "Projects", icon: "briefcase" },
  { id: "leads", label: "Lead capture", icon: "magnet", caret: true },
  { id: "calendar", label: "Calendar", icon: "calendar" },
  { id: "services", label: "Services", icon: "list" },
  { id: "files", label: "Files", icon: "file", caret: true },
  { id: "templates", label: "Templates", icon: "layout", caret: true },
  { id: "finance", label: "Finance", icon: "dollar", caret: true },
  { id: "automations", label: "Automations", icon: "zap", caret: true },
  { id: "tools", label: "Tools", icon: "menu", caret: true },
  { id: "reports", label: "Reports", icon: "barChart" },
  { id: "contacts", label: "Contacts", icon: "user" },
];

const TASKS = [
  { id: "plan", title: "Choose your plan", mins: "2 mins", body: "Pick a plan that fits your workflow and business goals." },
  { id: "services", title: "Add your services", mins: "1 min", body: "List your offerings to use in proposals and bookings." },
  { id: "types", title: "Customise project types", mins: "2 mins", body: "Define the types of work you manage for better organisation." },
  { id: "pipeline", title: "Customise your pipeline", mins: "3 mins", body: "Tailor your workflow stages to match how you move clients from enquiry to delivery." },
  { id: "form", title: "Publish a lead form", mins: "2 mins", body: "Start capturing new enquiries directly into your workspace." },
  { id: "project", title: "Create your first project", mins: "3 mins", body: "Set up a workspace for an upcoming or sample project to see how everything connects." },
  { id: "contact", title: "Add your first contact", mins: "1 min", body: "Add a client or lead to begin tracking communication and bookings." },
];

const RESOURCES: { id: string; label: string; icon: IconName }[] = [
  { id: "account", label: "Setting up your account", icon: "book" },
  { id: "pro", label: "Hire a certified pro", icon: "shieldCheck" },
  { id: "community", label: "Join the community", icon: "users" },
  { id: "help", label: "Visit the help centre", icon: "lifebuoy" },
];

/**
 * Setup checklist dashboard.
 *
 * The whole page is the onboarding: a dark nav rail carrying a persistent
 * progress card, a step-by-step task list as the main column, and a support
 * rail of brand, integration and education cards.
 */
export type ChecklistPage = "setup" | "finance";

export interface SetupChecklistProps extends TemplateProps {
  page?: ChecklistPage;
}

export function SetupChecklistTemplate({
  brandName = "Fernwood",
  userName = "Alex",
  className,
  page = "setup",
}: SetupChecklistProps) {
  // Six of seven steps are done by the time someone lives in Finance, so the
  // rail's persistent progress reflects that rather than staying at zero.
  const done = page === "finance" ? 6 : 0;
  return (
    <Surface tokens={setupChecklistTokens}>
    <Shell className={cn("flex-col", className)} bg="var(--ob-surface-2)">
      <Banner tone="dark">
        <span>
          Spring savings are here! Don&apos;t miss 25% off {brandName}!{" "}
          <button type="button" className="font-semibold underline underline-offset-2">
            View plans
          </button>
        </span>
        <Sparkle width={15} height={15} className="text-[#f5c451]" />
      </Banner>

      <div className="flex flex-1">
        {/* Measured off the reference: 240px on #121416. */}
        <Sidebar width={240} bg="#121416" className="border-r-0 text-white">
          <div className="p-4">
            <Placeholder width={44} height={40} radius={6} />
          </div>

          {/* Persistent setup progress lives above the nav, not inside it. */}
          <div className="mx-3 rounded-[10px] border border-white/15 p-3.5">
            <div className="flex items-center gap-2">
              <span className="flex-1 font-semibold">Set up your account</span>
              <span aria-hidden className="opacity-60">›</span>
            </div>
            <div className="mt-3 h-1 overflow-hidden rounded-full bg-white/15">
              <div
                className="h-full rounded-full bg-[#4ade80]"
                style={{ width: `${(done / 7) * 100}%` }}
              />
            </div>
            <p className="mt-2 text-[0.82rem] text-white/60">{done}/7 completed</p>
          </div>

          <nav className="mt-4 grid gap-0.5 px-2">
            {NAV.map((item) => (
              <button
                key={item.id}
                type="button"
                aria-current={
                  (item.active ? page === "setup" : item.id === page) ? "page" : undefined
                }
                className={cn(
                  "flex items-center gap-3 rounded-[8px] px-3 py-2.5 text-left text-[0.95rem] transition-colors",
                  (item.active ? page === "setup" : item.id === page)
                    ? "bg-white/10 font-semibold"
                    : "text-white/75 hover:bg-white/5",
                )}
              >
                <Icon name={item.icon} width={17} height={17} className="shrink-0 opacity-80" />
                <span className="flex-1">{item.label}</span>
                {item.caret && <ChevronDown width={14} height={14} className="opacity-40" />}
              </button>
            ))}
          </nav>

          <div className="mt-auto grid gap-1 p-2">
            {[
              { id: "settings", label: "Settings", icon: "settings" as IconName },
              { id: "resources", label: "Resources", icon: "book" as IconName },
            ].map((item) => (
              <button
                key={item.id}
                type="button"
                className="flex items-center gap-3 rounded-[8px] px-3 py-2.5 text-left text-[0.95rem] text-white/75 hover:bg-white/5"
              >
                <Icon name={item.icon} width={17} height={17} className="shrink-0 opacity-80" />
                {item.label}
              </button>
            ))}
          </div>
        </Sidebar>

        <Main className="relative">
          <TopBar border={false} className="gap-4">
            <SearchField placeholder="Search" className="w-[220px]" />
            <div className="ml-auto flex items-center gap-4">
              <button type="button" className="flex items-center gap-1.5 text-[0.9rem] font-semibold text-[#5b4bd6]">
                <GemIcon width={16} height={16} /> See pricing
              </button>
              <button type="button" aria-label="Notifications" className="relative opacity-70">
                <BellIcon width={20} height={20} />
                {/* The reference sets this as a small blue rounded square
                    clearing the bell, not a disc sitting on top of it. */}
                <span className="absolute -right-2 -top-2 grid h-[17px] min-w-[17px] place-items-center rounded-[5px] bg-[#3b82f6] px-1 text-[0.62rem] font-bold text-white">
                  3
                </span>
              </button>
              <Btn tone="neutral" size="sm" className="border-[#c7d2fe] bg-[#eef2ff] text-[#4f46e5]">
                + New
              </Btn>
            </div>
          </TopBar>

          {page === "finance" ? (
            <FinancePage />
          ) : (
          <div className="grid gap-6 px-6 py-6 sm:px-10 lg:grid-cols-[1fr_360px]">
            <div className="grid content-start gap-6">
              <h1 className="text-[2rem] font-extrabold tracking-tight">
                Welcome to {brandName}, {userName}!
              </h1>

              <Card className="p-6">
                <div className="flex flex-wrap items-center gap-4">
                  <h2 className="flex-1 text-lg font-extrabold">Let&apos;s start step-by-step</h2>
                  <span className="text-[0.88rem] text-[color:var(--ob-muted)]">
                    0/7 completed
                  </span>
                  <ProgressBar value={0} total={7} className="w-[320px] max-w-full" />
                </div>

                <ul className="mt-5 grid gap-3">
                  {TASKS.map((task) => (
                    <li
                      key={task.id}
                      /* Measured: the reference's rows run ~125px, which is
                         what gives the list its unhurried rhythm. */
                      className="flex items-center gap-4 rounded-[10px] border border-[color:var(--ob-border)] px-5 py-6 transition-colors hover:border-[color:var(--ob-border-strong)]"
                    >
                      <span
                        aria-hidden
                        className="size-5 shrink-0 rounded-full border-2 border-[color:var(--ob-border-strong)]"
                      />
                      <div className="flex-1">
                        <p className="flex items-center gap-2.5 font-bold">
                          {task.title}
                          <span className="rounded bg-[color:var(--ob-surface-2)] px-1.5 py-0.5 text-[0.72rem] font-semibold text-[color:var(--ob-muted)]">
                            {task.mins}
                          </span>
                        </p>
                        <p className="mt-1.5 text-[0.92rem] text-[color:var(--ob-muted)]">
                          {task.body}
                        </p>
                      </div>
                      <ChevronRight width={20} height={20} className="shrink-0 opacity-40" />
                    </li>
                  ))}
                </ul>
              </Card>
            </div>

            {/* Support rail */}
            <div className="grid content-start gap-5">
              <Card className="p-0">
                <div className="flex items-center gap-2 p-5 pb-3">
                  <h3 className="flex-1 font-extrabold">Brand elements</h3>
                  <span aria-hidden className="opacity-40">›</span>
                </div>
                <div className="flex items-center gap-3 border-t border-[color:var(--ob-border)] p-5">
                  <Placeholder
                    width={52}
                    height={52}
                    radius={8}
                    label="Logo"
                    className="border-[#a5b4fc]"
                  />
                  <span aria-hidden className="size-11 rounded-full bg-[#1170b8]" />
                  <span className="grid size-11 place-items-center rounded-full bg-[color:var(--ob-surface-3)] text-[0.82rem] font-bold text-[color:var(--ob-muted)]">
                    {userName.slice(0, 2).toUpperCase()}
                  </span>
                </div>
              </Card>

              <Card className="p-0">
                <div className="flex items-center gap-2 p-5 pb-3">
                  <h3 className="flex-1 font-extrabold">Integrations</h3>
                  <span aria-hidden className="opacity-40">›</span>
                </div>
                <div className="flex flex-wrap gap-2.5 p-5 pt-2">
                  {["Mail", "Meetings", "Design", "Calendar", "Accounting"].map((name) => (
                    <span
                      key={name}
                      className="flex items-center gap-2 rounded-full border border-[color:var(--ob-border)] px-3 py-1.5 text-[0.86rem] font-medium"
                    >
                      <Placeholder width={18} height={18} radius={4} />
                      {name}
                    </span>
                  ))}
                </div>
              </Card>

              <Card className="p-5">
                <h3 className="font-extrabold">
                  Start using {brandName} with confidence
                </h3>
                <Placeholder
                  ratio={16 / 9}
                  label="Tutorial video thumbnail"
                  radius={10}
                  className="mt-4"
                />
                <ul className="mt-5 grid gap-4">
                  {RESOURCES.map((item) => (
                    <li key={item.id} className="flex items-center gap-3 text-[0.95rem]">
                      <Icon name={item.icon} width={17} height={17} className="shrink-0 opacity-60" />
                      {item.label}
                    </li>
                  ))}
                </ul>
              </Card>
            </div>
          </div>
          )}
        </Main>
      </div>
    </Shell>
    </Surface>
  );
}

const FINANCE_MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

/**
 * Finance overview.
 *
 * Cashflow mixes two encodings on one plot: payment and expense bars for the
 * months that had activity, and net income as a line that crosses below zero
 * in July. The months with no activity are left empty rather than zero-filled,
 * and the linked-account cards stay in their unconnected state — a real new
 * account has no bank feed, and the card's job is to say so.
 */
function FinancePage() {
  const payments = [0, 0, 0, 0, 5200, 14000, 0, 0, 0, 0, 0, 0];
  const expenses = [0, 0, 0, 0, 0, 0, 7000, 0, 0, 0, 0, 0];

  return (
    <div className="px-6 py-6 sm:px-10">
      <h1 className="text-[2.2rem] font-extrabold tracking-tight">Finance</h1>

      <div className="pt-4">
        <Tabs
          items={[
            { id: "overview", label: "Overview" },
            { id: "payments", label: "Payments" },
            { id: "expenses", label: "Expenses" },
            { id: "books", label: "QuickBooks" },
            { id: "tax", label: "Tax Hub" },
          ]}
          active="overview"
        />
      </div>

      <div className="grid gap-6 pt-6 lg:grid-cols-[1fr_360px]">
        <div className="grid content-start gap-6">
          <Card className="p-0">
            <div className="flex flex-wrap items-center gap-3 border-b border-[color:var(--ob-border)] p-5">
              <div className="flex-1">
                <h2 className="flex items-center gap-1.5 text-lg font-extrabold">
                  Cashflow <InfoDot />
                </h2>
                <p className="pt-1 text-[0.9rem] text-[color:var(--ob-muted)]">
                  Jan 1&ndash;Dec 31, 2026
                </p>
              </div>
              <span className="flex items-center gap-2 text-[0.92rem]">
                {/* Switch in its on state: the knob sits right, check inside. */}
                <span className="flex h-5 w-9 items-center justify-end rounded-full bg-[color:var(--ob-fg)] px-[3px] text-white">
                  <Check width={11} height={11} />
                </span>
                Show net income
              </span>
              <span className="inline-flex items-center gap-10 rounded-[8px] border border-[color:var(--ob-border-strong)] px-3.5 py-2 text-[0.92rem]">
                This year <ChevronDown width={13} height={13} className="opacity-60" />
              </span>
            </div>

            <div className="grid gap-6 p-5 sm:grid-cols-3">
              <Figure dash label="Net income" value="$12,140" cents="74" />
              <Figure dot="#2f9e44" label="Paid payments (4)" value="$19,140" cents="74" />
              <Figure dot="#7f93f5" label="Expenses (1)" value="$7,000" cents="00" />
            </div>

            <div className="relative px-5 pb-2">
              <BarChart
                height={260}
                values={payments}
                color="#2f9e44"
                max={15000}
                xLabels={FINANCE_MONTHS}
                yLabels={["-$10K", "-$5K", "$0", "$5K", "$10K", "$15K"]}
              />
              {/* Expenses ride the same plot as a second, differently coloured bar. */}
              <div className="pointer-events-none absolute inset-x-5 bottom-2 top-0">
                <BarChart
                  height={260}
                  values={expenses}
                  color="#7f93f5"
                  max={15000}
                  className="opacity-100 [&_text]:hidden"
                />
              </div>
              <div className="pointer-events-none absolute inset-x-5 bottom-2 top-0">
                <LineChart
                  height={260}
                  gridLines={0}
                  min={-10000}
                  max={15000}
                  series={[
                    {
                      id: "net",
                      points: [0, 0, 0, 0, 5200, 14000, -7000, 0, 0, 0, 0, 0],
                      color: "#3d3d3d",
                    },
                  ]}
                  className="[&_text]:hidden"
                />
              </div>
            </div>

            <div className="flex items-center gap-3 border-t border-[color:var(--ob-border)] px-5 py-3">
              <p className="flex-1 text-[0.9rem] text-[color:var(--ob-muted)]">
                Last updated 46 minutes ago
              </p>
              <span className="flex items-center gap-1 text-[0.92rem] font-semibold">
                View expenses <span aria-hidden>›</span>
              </span>
            </div>
          </Card>

          <Card className="p-0">
            <div className="flex flex-wrap items-center gap-3 border-b border-[color:var(--ob-border)] p-5">
              <div className="flex-1">
                <h2 className="flex items-center gap-1.5 text-lg font-extrabold">
                  {brandLabel()} payments <InfoDot />
                </h2>
                <p className="pt-1 text-[0.9rem] text-[color:var(--ob-muted)]">
                  Jan 1&ndash;Dec 31, 2026
                </p>
              </div>
              <span className="inline-flex items-center gap-10 rounded-[8px] border border-[color:var(--ob-border-strong)] px-3.5 py-2 text-[0.92rem]">
                This year <ChevronDown width={13} height={13} className="opacity-60" />
              </span>
            </div>

            <div className="grid gap-6 p-5 sm:grid-cols-4">
              <Figure dot="#2f9e44" label="Paid (4)" value="$19,140" cents="74" />
              <Figure dot="#e8c33d" label="Processing (0)" value="$0" />
              <Figure dot="#e0332c" label="Overdue (1)" value="$11,915" cents="00" />
              <Figure dot="#bfbfbf" label="Upcoming (1)" value="$5,518" cents="50" />
            </div>
          </Card>
        </div>

        <div className="grid content-start gap-6">
          <Card>
            <div className="flex items-start gap-3">
              <h2 className="flex-1 text-lg font-extrabold">Financial tracker</h2>
              <span className="flex items-center gap-1 text-[0.9rem] font-semibold text-[#2563eb]">
                + Link account
              </span>
            </div>
            <p className="pt-2 text-[0.92rem] text-[color:var(--ob-muted)]">
              All your business accounts in one convenient place.
            </p>

            {[
              {
                id: "balance",
                icon: "bank" as IconName,
                label: "Accounts balance",
                blurb: "Connect your bank accounts to view your accounts balance.",
              },
              {
                id: "cards",
                icon: "creditCard" as IconName,
                label: "Credit card spending",
                blurb: "Connect your cards to view your credit card spending.",
              },
            ].map((slot, index) => (
              <div
                key={slot.id}
                className={cn(
                  "pt-5",
                  index > 0 && "mt-5 border-t border-[color:var(--ob-border)]",
                )}
              >
                <h3 className="flex items-center gap-2 font-semibold">
                  <Icon name={slot.icon} width={17} height={17} className="opacity-70" />
                  {slot.label}
                  <InfoDot />
                </h3>
                {/* Nothing is linked, so the figure really is zero. */}
                <p className="pt-2 text-[1.9rem] font-extrabold tabular-nums">$0</p>
                <div className="grid justify-items-center gap-3 pt-3">
                  <Placeholder width={110} height={70} radius={10} label="" />
                  <p className="max-w-[24ch] text-center text-[0.92rem] text-[color:var(--ob-muted)]">
                    {slot.blurb}
                  </p>
                </div>
              </div>
            ))}
          </Card>
        </div>
      </div>
    </div>
  );
}

function brandLabel() {
  return "Workspace";
}

function Figure({
  label,
  value,
  cents,
  dot,
  dash,
}: {
  label: string;
  value: string;
  cents?: string;
  dot?: string;
  dash?: boolean;
}) {
  return (
    <div>
      <p className="flex items-center gap-2 text-[0.95rem]">
        {dash ? (
          <span aria-hidden className="h-[2px] w-4 shrink-0 bg-[color:var(--ob-fg)]" />
        ) : (
          <span
            aria-hidden
            className="size-2.5 shrink-0 rounded-full"
            style={{ background: dot }}
          />
        )}
        <span className="flex items-center gap-1.5">
          {label}
          <InfoDot />
        </span>
      </p>
      <p className="pt-1.5 text-[1.45rem] font-extrabold tabular-nums">
        {value}
        {cents && (
          <span className="text-[0.95rem] font-extrabold">.{cents}</span>
        )}
      </p>
    </div>
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
