"use client";

import { cn } from "../../../lib/cn";
import { AvatarSlot, LogoSlot, WordmarkSlot } from "../../../ui/placeholder";
import { Surface, automationTokens } from "./tokens";
import { Main, NavItem, Shell, Sidebar } from "./chrome";
import type { TemplateProps } from "./api-console";

export type AutomationPage = "apps" | "dashboard" | "history";

export interface AutomationAppsProps extends TemplateProps {
  page?: AutomationPage;
}

const NAV = [
  { id: "dashboard", label: "Dashboard", glyph: "▨" },
  { id: "zaps", label: "Workflows", glyph: "⚡" },
  { id: "transfers", label: "Transfers", glyph: "⇄" },
  { id: "apps", label: "My Apps", glyph: "▦" },
  { id: "history", label: "Run History", glyph: "🕐" },
  { id: "explore", label: "Explore", glyph: "🌐" },
  { id: "help", label: "Get Help", glyph: "?" },
];

const APPS = [
  { id: "sheets", name: "Sheets", connections: "1", workflows: "1" },
  { id: "forms", name: "Forms", connections: "1", workflows: "1" },
];

const FOOTER_LINKS = [
  "Pricing",
  "Help",
  "Developer Platform",
  "Press",
  "Jobs",
  "For Companies",
  "Transfer",
];

/**
 * Connected apps.
 *
 * Two connections and a great deal of white space — which is the honest shape
 * of this page for a new account, and why the footer is inside the content
 * column rather than pinned: with so little content, a pinned footer would
 * float in the middle of nothing. The usage bar is empty because zero of a
 * thousand tasks have run.
 */
export function AutomationAppsTemplate({
  className,
  page = "apps",
}: AutomationAppsProps) {
  return (
    <Surface tokens={automationTokens} className={className}>
      <Shell className="flex-col">
        <header className="flex h-[92px] shrink-0 items-center gap-5 px-8">
          <span aria-hidden className="text-[1.3rem] text-[color:var(--ob-fg-soft)]">
            ✕
          </span>
          <WordmarkSlot width={120} height={26} label="" />
          <span aria-hidden className="ml-auto text-[1.25rem] text-[color:var(--ob-fg-soft)]">
            ⌕
          </span>
          <AvatarSlot size={40} />
        </header>

        <div className="flex min-h-0 flex-1">
          <Sidebar width={415} bg="var(--ob-surface)">
            <div className="px-6 pb-6">
              <span className="flex items-center justify-center gap-2 rounded-[var(--ob-radius)] bg-[color:var(--ob-cta-bg)] py-4 text-[1.2rem] font-semibold text-[color:var(--ob-cta-fg)]">
                <span aria-hidden>+</span> Create workflow
              </span>
            </div>

            <nav className="grid gap-1 px-4">
              {NAV.map((item) => (
                <NavItem
                  key={item.id}
                  label={item.label}
                  glyph={item.glyph}
                  active={item.id === page}
                  className={cn(
                    "px-4 py-3 text-[1.15rem]",
                    item.id === page &&
                      "bg-[color-mix(in_oklab,#ff4f00_10%,transparent)] font-bold",
                  )}
                />
              ))}
            </nav>

            <div className="mx-6 my-6 border-t border-[color:var(--ob-border)]" />

            <div className="px-6">
              <h2 className="flex items-center gap-3 pb-5 text-[1.2rem] font-bold">
                <span aria-hidden className="text-[color:var(--ob-fg-soft)]">
                  ▭
                </span>
                Free Plan
              </h2>

              <p className="flex items-center gap-3 text-[1.08rem]">
                <span className="flex-1 font-bold">Tasks</span>
                <span className="tabular-nums text-[color:var(--ob-fg-soft)]">
                  0 / 1,000
                </span>
              </p>
              {/* Nothing has run, so the track is genuinely empty. */}
              <span className="mt-2 block h-1 rounded-full bg-[color:var(--ob-surface-3)]" />

              <p className="flex items-center gap-3 pt-5 text-[1.08rem]">
                <span className="flex-1 font-bold">Workflows</span>
                <span className="text-[color:var(--ob-fg-soft)]">Unlimited</span>
              </p>

              <p className="pt-5 text-[1.05rem] text-[color:var(--ob-fg-soft)]">
                Monthly usage resets in 29 days
              </p>
              <p className="pt-2 text-[1.05rem] font-medium text-[color:var(--ob-brand)] underline">
                Manage Plan
              </p>

              <span className="mt-5 block rounded-[var(--ob-radius)] border border-[color:var(--ob-brand)] py-3.5 text-center text-[1.12rem] font-semibold text-[color:var(--ob-brand)]">
                Upgrade plan
              </span>
            </div>
          </Sidebar>

          <Main className="overflow-auto px-10 py-8">
            <div className="flex flex-wrap items-center gap-5">
              <h1 className="flex-1 text-[2.2rem] font-bold">Apps</h1>
              <span className="flex w-[280px] items-center gap-2.5 rounded-[var(--ob-radius)] border border-[color:var(--ob-border-strong)] px-4 py-3 text-[1.05rem] text-[color:var(--ob-muted)]">
                <span aria-hidden>⌕</span> Search apps
              </span>
              <span className="flex items-center gap-2 rounded-[var(--ob-radius)] bg-[color:var(--ob-brand)] px-6 py-3 text-[1.08rem] font-semibold text-white">
                <span aria-hidden>+</span> Add connection
              </span>
            </div>

            <div className="grid gap-4 pt-6">
              {APPS.map((app) => (
                <article
                  key={app.id}
                  className="flex items-center gap-5 rounded-[var(--ob-radius)] border border-[color:var(--ob-border-strong)] px-6 py-5"
                >
                  <LogoSlot size={52} label="" radius={8} />
                  <h2 className="flex-1 text-[1.4rem] font-bold">{app.name}</h2>
                  <Stat value={app.connections} label="Connection" />
                  <Stat value={app.workflows} label="Workflow" />
                  <span aria-hidden className="pl-4 text-[1.3rem] text-[color:var(--ob-muted)]">
                    ›
                  </span>
                </article>
              ))}
            </div>

            {/* The footer sits in the flow: there is not enough here to pin it. */}
            <footer className="flex flex-wrap items-start gap-8 pt-24">
              <div>
                <p className="flex items-center gap-3 text-[1.1rem] font-bold">
                  Follow us
                  {["f", "in", "◉", "𝕏", "▶"].map((glyph) => (
                    <span
                      key={glyph}
                      aria-hidden
                      className="grid size-9 place-items-center rounded-full bg-[color:var(--ob-surface-3)] text-[0.95rem] font-normal"
                    >
                      {glyph}
                    </span>
                  ))}
                </p>
                <div className="pt-10">
                  <WordmarkSlot width={110} height={24} label="" />
                </div>
              </div>

              <div className="ml-auto text-right">
                <p className="flex flex-wrap justify-end gap-7 text-[1.08rem] font-bold">
                  {FOOTER_LINKS.map((link) => (
                    <span key={link}>{link}</span>
                  ))}
                </p>
                <p className="flex flex-wrap items-center justify-end gap-3 pt-10 text-[1.02rem] font-bold">
                  <span>© 2026 Acme Inc.</span>
                  <span>Manage cookies</span>
                  <span aria-hidden className="text-[color:var(--ob-border-strong)]">
                    |
                  </span>
                  <span>Legal</span>
                  <span aria-hidden className="text-[color:var(--ob-border-strong)]">
                    |
                  </span>
                  <span>Privacy</span>
                </p>
              </div>
            </footer>
          </Main>
        </div>
      </Shell>
    </Surface>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <span className="w-[130px] shrink-0 text-center">
      <span className="block text-[1.35rem] font-bold tabular-nums">{value}</span>
      <span className="block text-[1.02rem] text-[color:var(--ob-fg-soft)]">{label}</span>
    </span>
  );
}
