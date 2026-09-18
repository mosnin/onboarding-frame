"use client";

import { Placeholder } from "../../../ui/placeholder";
import { cn } from "../../../lib/cn";
import { Surface, setupChecklistTokens } from "./tokens";
import { ProgressBar } from "../../../ui/primitives";
import { Banner, Btn, Card, Main, SearchField, Shell, Sidebar, TopBar } from "./chrome";
import type { TemplateProps } from "./api-console";

const NAV = [
  { id: "setup", label: "Setup", glyph: "🚀", active: true },
  { id: "home", label: "Home", glyph: "⌂" },
  { id: "projects", label: "Projects", glyph: "💼" },
  { id: "leads", label: "Lead capture", glyph: "🧲", caret: true },
  { id: "calendar", label: "Calendar", glyph: "🗓" },
  { id: "services", label: "Services", glyph: "≡$" },
  { id: "files", label: "Files", glyph: "🗎", caret: true },
  { id: "templates", label: "Templates", glyph: "⊞", caret: true },
  { id: "finance", label: "Finance", glyph: "$", caret: true },
  { id: "automations", label: "Automations", glyph: "⚡", caret: true },
  { id: "tools", label: "Tools", glyph: "☰", caret: true },
  { id: "reports", label: "Reports", glyph: "📊" },
  { id: "contacts", label: "Contacts", glyph: "👤" },
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

const RESOURCES = [
  { id: "account", label: "Setting up your account", glyph: "▤" },
  { id: "pro", label: "Hire a certified pro", glyph: "⬡" },
  { id: "community", label: "Join the community", glyph: "👥" },
  { id: "help", label: "Visit the help centre", glyph: "?" },
];

/**
 * Setup checklist dashboard.
 *
 * The whole page is the onboarding: a dark nav rail carrying a persistent
 * progress card, a step-by-step task list as the main column, and a support
 * rail of brand, integration and education cards.
 */
export function SetupChecklistTemplate({
  brandName = "Fernwood",
  userName = "Alex",
  className,
}: TemplateProps) {
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
        <span aria-hidden>✦</span>
      </Banner>

      <div className="flex flex-1">
        <Sidebar width={290} bg="#141414" className="border-r-0 text-white">
          <div className="p-4">
            <Placeholder width={44} height={40} radius={6} glyph="▦" />
          </div>

          {/* Persistent setup progress lives above the nav, not inside it. */}
          <div className="mx-3 rounded-[10px] border border-white/15 p-3.5">
            <div className="flex items-center gap-2">
              <span className="flex-1 font-semibold">Set up your account</span>
              <span aria-hidden className="opacity-60">›</span>
            </div>
            <div className="mt-3 h-1 overflow-hidden rounded-full bg-white/15">
              <div className="h-full w-0 rounded-full bg-[#4ade80]" />
            </div>
            <p className="mt-2 text-[0.82rem] text-white/60">0/7 completed</p>
          </div>

          <nav className="mt-4 grid gap-0.5 px-2">
            {NAV.map((item) => (
              <button
                key={item.id}
                type="button"
                aria-current={item.active ? "page" : undefined}
                className={cn(
                  "flex items-center gap-3 rounded-[8px] px-3 py-2.5 text-left text-[0.95rem] transition-colors",
                  item.active ? "bg-white/10 font-semibold" : "text-white/75 hover:bg-white/5",
                )}
              >
                <span aria-hidden className="w-4 text-center opacity-80">{item.glyph}</span>
                <span className="flex-1">{item.label}</span>
                {item.caret && <span aria-hidden className="opacity-40">⌄</span>}
              </button>
            ))}
          </nav>

          <div className="mt-auto grid gap-1 p-2">
            {[
              { id: "settings", label: "Settings", glyph: "⚙" },
              { id: "resources", label: "Resources", glyph: "◎" },
            ].map((item) => (
              <button
                key={item.id}
                type="button"
                className="flex items-center gap-3 rounded-[8px] px-3 py-2.5 text-left text-[0.95rem] text-white/75 hover:bg-white/5"
              >
                <span aria-hidden>{item.glyph}</span>
                {item.label}
              </button>
            ))}
          </div>
        </Sidebar>

        <Main>
          <TopBar border={false} className="gap-4">
            <SearchField placeholder="Search" className="w-[220px]" />
            <div className="ml-auto flex items-center gap-4">
              <button type="button" className="flex items-center gap-1.5 text-[0.9rem] font-semibold text-[#5b4bd6]">
                <span aria-hidden>💎</span> See pricing
              </button>
              <button type="button" aria-label="Notifications" className="relative">
                ⌾
                <span className="absolute -right-1.5 -top-1.5 grid size-4 place-items-center rounded-full bg-[#3b82f6] text-[0.6rem] font-bold text-white">
                  3
                </span>
              </button>
              <Btn tone="neutral" size="sm" className="border-[#c7d2fe] bg-[#eef2ff] text-[#4f46e5]">
                + New
              </Btn>
            </div>
          </TopBar>

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
                      className="flex items-center gap-4 rounded-[10px] border border-[color:var(--ob-border)] p-4 transition-colors hover:border-[color:var(--ob-border-strong)]"
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
                        <p className="mt-0.5 text-[0.9rem] text-[color:var(--ob-muted)]">
                          {task.body}
                        </p>
                      </div>
                      <span aria-hidden className="shrink-0 text-lg opacity-40">›</span>
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
                  glyph="▶"
                />
                <ul className="mt-5 grid gap-4">
                  {RESOURCES.map((item) => (
                    <li key={item.id} className="flex items-center gap-3 text-[0.95rem]">
                      <span aria-hidden className="w-5 text-center opacity-60">
                        {item.glyph}
                      </span>
                      {item.label}
                    </li>
                  ))}
                </ul>
              </Card>
            </div>
          </div>
        </Main>
      </div>
    </Shell>
    </Surface>
  );
}
