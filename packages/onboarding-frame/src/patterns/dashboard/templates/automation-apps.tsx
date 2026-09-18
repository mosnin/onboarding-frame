"use client";

import {
  ArrowsLeftRightIcon,
  CardIcon,
  CaretRightIcon,
  ClockIcon,
  CloudIcon,
  CrossIcon,
  GlobeIcon,
  GridFourIcon,
  LightningIcon,
  QuestionIcon,
  SearchIcon,
} from "../../../ui/icons-solid";
import { BrandMark } from "../../../ui/brand";
import { Avatar } from "../../../ui/avatar";
import { Wordmark } from "../../../ui/wordmark";
import { cn } from "../../../lib/cn";
import { Surface, automationTokens } from "./tokens";
import { Main, NavItem, Shell, Sidebar } from "./chrome";
import type { TemplateProps } from "./props";

export type AutomationPage = "apps" | "dashboard" | "history";

export interface AutomationAppsProps extends TemplateProps {
  page?: AutomationPage;
}

const NAV = [
  { id: "dashboard", label: "Dashboard", Icon: CloudIcon },
  { id: "zaps", label: "Workflows", Icon: LightningIcon },
  { id: "transfers", label: "Transfers", Icon: ArrowsLeftRightIcon },
  { id: "apps", label: "My Apps", Icon: GridFourIcon },
  { id: "history", label: "Run History", Icon: ClockIcon },
  { id: "explore", label: "Explore", Icon: GlobeIcon },
  { id: "help", label: "Get Help", Icon: QuestionIcon },
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
  brandName = "Acme",
  userName = "Alex Rivera",
  className,
  page = "apps",
}: AutomationAppsProps) {
  return (
    <Surface tokens={automationTokens} className={className}>
      <Shell className="flex-col">
        <header className="flex h-[70px] shrink-0 items-center gap-[15px] px-[24px]">
          <CrossIcon size={15} className="text-[color:var(--ob-fg-soft)]" />
          <Wordmark name={brandName} size={15} mark={20} radius={5} />
          <SearchIcon size={14} />
          <Avatar name={userName} size={30} />
        </header>

        <div className="flex min-h-[0px] flex-1">
          <Sidebar width={315} bg="var(--ob-surface)">
            <div className="px-[18px] pb-[18px]">
              <span className="flex items-center justify-center gap-[6px] rounded-[var(--ob-radius)] bg-[color:var(--ob-cta-bg)] py-[12px] text-[0.91rem] font-semibold text-[color:var(--ob-cta-fg)]">
                <span aria-hidden>+</span> Create workflow
              </span>
            </div>

            <nav className="grid gap-[3px] px-[12px]">
              {NAV.map((item) => (
                <NavItem
                  key={item.id}
                  label={item.label}
                  glyph={<item.Icon size={14} />}
                  active={item.id === page}
                  className={cn(
                    "px-[12px] py-[9px] text-[0.873rem]",
                    item.id === page &&
                      "bg-[color-mix(in_oklab,#ff4f00_10%,transparent)] font-bold",
                  )}
                />
              ))}
            </nav>

            <div className="mx-[18px] my-[18px] border-t border-[color:var(--ob-border)]" />

            <div className="px-[18px]">
              <h2 className="flex items-center gap-[9px] pb-[15px] text-[0.91rem] font-bold">
                <CardIcon size={14} />
                Free Plan
              </h2>

              <p className="flex items-center gap-[9px] text-[0.819rem]">
                <span className="flex-1 font-bold">Tasks</span>
                <span className="tabular-nums text-[color:var(--ob-fg-soft)]">
                  0 / 1,000
                </span>
              </p>
              {/* Nothing has run, so the track is genuinely empty. */}
              <span className="mt-[6px] block h-[3px] rounded-full bg-[color:var(--ob-surface-3)]" />

              <p className="flex items-center gap-[9px] pt-[15px] text-[0.819rem]">
                <span className="flex-1 font-bold">Workflows</span>
                <span className="text-[color:var(--ob-fg-soft)]">Unlimited</span>
              </p>

              <p className="pt-[15px] text-[0.797rem] text-[color:var(--ob-fg-soft)]">
                Monthly usage resets in 29 days
              </p>
              <p className="pt-[6px] text-[0.797rem] font-medium text-[color:var(--ob-brand)] underline">
                Manage Plan
              </p>

              <span className="mt-[15px] block rounded-[var(--ob-radius)] border border-[color:var(--ob-brand)] py-[11px] text-center text-[0.85rem] font-semibold text-[color:var(--ob-brand)]">
                Upgrade plan
              </span>
            </div>
          </Sidebar>

          <Main className="overflow-auto px-[30px] py-[24px]">
            <div className="flex flex-wrap items-center gap-[15px]">
              <h1 className="flex-1 text-[1.669rem] font-bold">Apps</h1>
              <span className="flex w-[212px] items-center gap-[8px] rounded-[var(--ob-radius)] border border-[color:var(--ob-border-strong)] px-[12px] py-[9px] text-[0.797rem] text-[color:var(--ob-muted)]">
                <SearchIcon size={14} /> Search apps
              </span>
              <span className="flex items-center gap-[6px] rounded-[var(--ob-radius)] bg-[color:var(--ob-brand)] px-[18px] py-[9px] text-[0.819rem] font-semibold text-white">
                <span aria-hidden>+</span> Add connection
              </span>
            </div>

            <div className="grid gap-[12px] pt-[18px]">
              {APPS.map((app) => (
                <article
                  key={app.id}
                  className="flex items-center gap-[15px] rounded-[var(--ob-radius)] border border-[color:var(--ob-border-strong)] px-[18px] py-[15px]"
                >
                  <BrandMark brand={app.name} size={39} />
                  <h2 className="flex-1 text-[1.062rem] font-bold">{app.name}</h2>
                  <Stat value={app.connections} label="Connection" />
                  <Stat value={app.workflows} label="Workflow" />
                  <CaretRightIcon size={14} />
                </article>
              ))}
            </div>

            {/* The footer sits in the flow: there is not enough here to pin it. */}
            <footer className="flex flex-wrap items-start gap-[24px] pt-[73px]">
              <div>
                <p className="flex items-center gap-[9px] text-[0.835rem] font-bold">
                  Follow us
                  {["facebook", "linkedin", "instagram", "x", "youtube"].map((slug) => (
                    <span
                      key={slug}
                      className="grid size-[27px] place-items-center rounded-full bg-[color:var(--ob-surface-3)]"
                    >
                      <BrandMark brand={slug} size={13} colored={false} />
                    </span>
                  ))}
                </p>
                <div className="pt-[30px]">
                  <Wordmark name={brandName} size={13} mark={18} radius={5} />
                </div>
              </div>

              <div className="ml-auto text-right">
                <p className="flex flex-wrap justify-end gap-[21px] text-[0.819rem] font-bold">
                  {FOOTER_LINKS.map((link) => (
                    <span key={link}>{link}</span>
                  ))}
                </p>
                <p className="flex flex-wrap items-center justify-end gap-[9px] pt-[30px] text-[0.774rem] font-bold">
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
    <span className="w-[99px] shrink-0 text-center">
      <span className="block text-[1.024rem] font-bold tabular-nums">{value}</span>
      <span className="block text-[0.774rem] text-[color:var(--ob-fg-soft)]">{label}</span>
    </span>
  );
}
