"use client";

import { Avatar } from "../../../ui/avatar";
import { BrandMark } from "../../../ui/brand";
import { cn } from "../../../lib/cn";
import { Surface, assistantHomeTokens } from "./tokens";
import { Btn, Main, Shell, Sidebar } from "./chrome";
import type { TemplateProps } from "./props";
import {
  BellIcon,
  CalendarIcon,
  ChevronDown,
  CircleIcon,
  HistoryIcon,
  HomeIcon,
  Icon,
  ImageIcon,
  MicIcon,
  IncognitoIcon,
  MonitorIcon,
  Plus,
  SearchIcon,
  SettingsIcon,
  Shuffle,
  SidebarIcon,
  TrendUpIcon,
  type IconName,
} from "../../../ui/icons";

const NAV: { id: string; label: string; icon: IconName; active?: boolean }[] = [
  { id: "new", label: "New", icon: "plus", active: true },
  { id: "computer", label: "Computer", icon: "monitor" },
  { id: "spaces", label: "Spaces", icon: "folder" },
  { id: "artifacts", label: "Artifacts", icon: "image" },
  { id: "customize", label: "Customise", icon: "target" },
  { id: "history", label: "History", icon: "history" },
];

const TOPICS = ["Discover", "Finance", "Health", "Academic", "Patents"];

const SUGGESTIONS: {
  id: string;
  label: string;
  icon?: IconName;
  logos?: string[];
}[] = [
  { id: "connect", label: "Connect your apps", logos: ["slack", "notion", "googledrive"] },
  { id: "deck", label: "Prepare a QBR deck", icon: "image" },
  { id: "tool", label: "Build an internal tool", icon: "settings" },
  { id: "gtm", label: "Automate my GTM motion", icon: "target" },
  { id: "viz", label: "Visualise my data", icon: "pieChart" },
  { id: "remind", label: "Set a reminder", icon: "bell" },
];

/**
 * Assistant home.
 *
 * A single centred prompt is the entire primary surface. Everything else —
 * topic nav, suggestions, plan status — is arranged around it without
 * competing for attention.
 */
export function AssistantHomeTemplate({
  brandName = "Lumen",
  userName = "alex",
  className,
}: TemplateProps) {
  return (
    <Surface tokens={assistantHomeTokens}>
    {/*
      Every number here was measured off the reference rather than estimated:
      the rail is 199px (not the 264 it was built at), its fill is #f2eeeb
      against a #fbf7f6 canvas, and it does carry a hairline right border.
    */}
    <Shell className={cn(className)} bg="#fbf7f6">
      <Sidebar width={199} bg="#f2eeeb" className="border-r-[color:#e4e0dd]">
        <div className="flex items-center gap-2 px-3 py-3.5">
          <Avatar name={brandName} size={24} rounded={6} />
          <button
            type="button"
            aria-label="Collapse sidebar"
            className="ml-auto opacity-45 hover:opacity-100"
          >
            <SidebarIcon width={17} height={17} />
          </button>
        </div>

        <nav className="grid gap-[1.5px] px-2">
          {NAV.map((item) => (
            <button
              key={item.id}
              type="button"
              aria-current={item.active ? "page" : undefined}
              className={cn(
                "flex h-10 items-center gap-2.5 rounded-[9px] px-2.5 text-left text-[0.94rem] transition-colors",
                item.active
                  ? "bg-[#e9e5e2] font-medium"
                  : "text-[color:var(--ob-fg-soft)] hover:bg-[#ece8e5]",
              )}
            >
              <Icon name={item.icon} width={17} height={17} className="shrink-0 opacity-75" />
              {item.label}
            </button>
          ))}
        </nav>

        <p className="px-4 pt-4 text-[0.85rem] text-[color:var(--ob-muted)]">
          No recent sessions
        </p>

        <div className="mt-auto grid gap-3 p-4">
          <button
            type="button"
            className="flex items-center gap-2 justify-self-start rounded-full border border-[color:var(--ob-border)] bg-[color:var(--ob-surface)] px-3.5 py-2 text-[0.9rem] font-medium"
          >
            <TrendUpIcon width={14} height={14} /> Upgrade plan
            <span aria-hidden className="size-1.5 rounded-full bg-[#0f8f6f]" />
          </button>
          <div className="flex items-center gap-2.5 rounded-[10px] px-2 py-2">
            <Avatar name={userName} size={24} />
            <span className="flex-1 truncate text-[0.88rem]">{userName}@example.com</span>
            <BellIcon width={16} height={16} className="opacity-45" />
          </div>
        </div>
      </Sidebar>

      <Main>
        <header className="flex flex-wrap items-center gap-4 px-6 py-5">
          <button
            type="button"
            className="rounded-full bg-[color:var(--ob-surface-2)] px-4 py-2 text-[0.92rem] font-semibold"
          >
            Free plan · <span className="font-semibold">Upgrade</span>
          </button>
          <nav className="mx-auto hidden items-center gap-7 text-[0.98rem] md:flex">
            {TOPICS.map((topic) => (
              <button
                key={topic}
                type="button"
                className="text-[color:var(--ob-fg-soft)] transition-colors hover:text-[color:var(--ob-fg)]"
              >
                {topic}
              </button>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <Btn tone="neutral" size="sm" className="rounded-full font-medium">
              <CalendarIcon width={15} height={15} />
              <span className="font-medium">Scheduled</span>
              <ChevronDown width={14} height={14} className="opacity-50" />
            </Btn>
            <Btn
              tone="neutral"
              size="sm"
              className="rounded-full px-2.5"
              aria-label="Incognito"
            >
              <IncognitoIcon width={16} height={16} />
            </Btn>
          </div>
        </header>

        {/* Measured: the reference's composer is 637px wide, centred in the
            area right of the rail. 685 = 637 plus the 24px gutters, which the
            column keeps so it still breathes on a narrow screen. */}
        <div className="mx-auto flex w-full max-w-[685px] flex-1 flex-col justify-center gap-8 px-6 pb-24">
          <h1 className="text-center text-[3.25rem] font-normal tracking-[-0.035em]">
            {brandName.toLowerCase()}
          </h1>

          {/* Composer */}
          <div className="rounded-[18px] border border-[color:var(--ob-border)] bg-[color:var(--ob-surface)] p-4 [box-shadow:var(--ob-shadow)]">
            <p className="px-1 pb-6 pt-1 text-[1.05rem] text-[color:var(--ob-muted)]">
              Ask anything…
            </p>
            <div className="flex items-center gap-2">
              <button type="button" aria-label="Attach" className="px-1 opacity-55">
                <Plus width={18} height={18} />
              </button>
              <button
                type="button"
                className="flex items-center gap-1.5 rounded-full border border-[color:var(--ob-border)] px-3 py-1.5 text-[0.88rem] font-medium"
              >
                <SearchIcon width={14} height={14} /> Search
                <ChevronDown width={13} height={13} className="opacity-50" />
              </button>
              <button
                type="button"
                aria-label="Screen"
                className="rounded-full border border-[color:var(--ob-border)] px-2.5 py-1.5"
              >
                <MonitorIcon width={15} height={15} />
              </button>
              <div className="ml-auto flex items-center gap-3">
                <button type="button" className="flex items-center gap-1 text-[0.88rem] text-[color:var(--ob-muted)]">
                  Model <ChevronDown width={13} height={13} className="opacity-50" />
                </button>
                <button type="button" aria-label="Voice input" className="opacity-55">
                  <MicIcon width={17} height={17} />
                </button>
                <button
                  type="button"
                  aria-label="Start voice session"
                  className="grid size-9 place-items-center rounded-full bg-[color:var(--ob-cta-bg)] text-[color:var(--ob-cta-fg)]"
                >
                  <Icon name="activity" width={16} height={16} />
                </button>
              </div>
            </div>
          </div>

          <div>
            <div className="mb-3 flex items-center gap-2">
              <p className="flex-1 text-[0.92rem] font-normal text-[color:var(--ob-muted)]">
                Try out {brandName} Computer
              </p>
              <button type="button" aria-label="Shuffle suggestions" className="opacity-45">
                <Shuffle width={16} height={16} />
              </button>
            </div>
            <div className="grid gap-2 sm:grid-cols-3">
              {SUGGESTIONS.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  /* Measured: 209px chips with ~11px padding and a 6px gap,
                     which is what lets "Automate my GTM motion" sit on one
                     line. At px-3.5/gap-2.5 the label ellipsised. */
                  className="flex h-[46px] items-center gap-1.5 rounded-[10px] border border-[color:var(--ob-border)] bg-[color:var(--ob-surface)] px-[11px] text-left text-[0.86rem] font-medium transition-colors hover:border-[color:var(--ob-border-strong)]"
                >
                  {item.logos ? (
                    <span className="flex shrink-0 -space-x-2">
                      {item.logos.map((slug) => (
                        <BrandMark
                          key={slug}
                          brand={slug}
                          size={16}
                          className="rounded-[4px] bg-[color:var(--ob-surface)] p-px"
                        />
                      ))}
                    </span>
                  ) : (
                    item.icon && (
                      <Icon
                        name={item.icon}
                        width={15}
                        height={15}
                        className="shrink-0 opacity-55"
                      />
                    )
                  )}
                  <span className="whitespace-nowrap">{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </Main>
    </Shell>
    </Surface>
  );
}
