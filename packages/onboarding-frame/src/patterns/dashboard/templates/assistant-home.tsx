"use client";

import { Placeholder } from "../../../ui/placeholder";
import { cn } from "../../../lib/cn";
import { Surface, assistantHomeTokens } from "./tokens";
import { Btn, Main, Shell, Sidebar } from "./chrome";
import type { TemplateProps } from "./props";

const NAV = [
  { id: "new", label: "New", glyph: "＋", active: true },
  { id: "computer", label: "Computer", glyph: "▭" },
  { id: "spaces", label: "Spaces", glyph: "🗂" },
  { id: "artifacts", label: "Artifacts", glyph: "🖼" },
  { id: "customize", label: "Customise", glyph: "◎" },
  { id: "history", label: "History", glyph: "🕘" },
];

const TOPICS = ["Discover", "Finance", "Health", "Academic", "Patents"];

const SUGGESTIONS = [
  { id: "connect", label: "Connect your apps", logos: 3 },
  { id: "deck", label: "Prepare a QBR deck", glyph: "▤" },
  { id: "tool", label: "Build an internal tool", glyph: "🔧" },
  { id: "gtm", label: "Automate my GTM motion", glyph: "◎" },
  { id: "viz", label: "Visualise my data", glyph: "◔" },
  { id: "remind", label: "Set a reminder", glyph: "⌾" },
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
    <Shell className={cn(className)} bg="#fbfaf8">
      <Sidebar width={264} bg="#f4f2ef" className="border-r-0">
        <div className="flex items-center gap-2 p-4">
          <Placeholder width={26} height={26} radius={6} glyph="▦" />
          <button
            type="button"
            aria-label="Collapse sidebar"
            className="ml-auto opacity-50 hover:opacity-100"
          >
            ▤
          </button>
        </div>

        <nav className="grid gap-0.5 px-3">
          {NAV.map((item) => (
            <button
              key={item.id}
              type="button"
              aria-current={item.active ? "page" : undefined}
              className={cn(
                "flex items-center gap-3 rounded-[10px] px-3 py-2.5 text-left text-[0.98rem] transition-colors",
                item.active
                  ? "bg-[color:var(--ob-surface-3)] font-semibold"
                  : "text-[color:var(--ob-fg-soft)] hover:bg-[color:var(--ob-surface-3)]",
              )}
            >
              <span aria-hidden className="w-5 text-center opacity-70">{item.glyph}</span>
              {item.label}
            </button>
          ))}
        </nav>

        <p className="px-6 pt-4 text-[0.88rem] text-[color:var(--ob-muted)]">
          No recent sessions
        </p>

        <div className="mt-auto grid gap-3 p-4">
          <button
            type="button"
            className="flex items-center gap-2 justify-self-start rounded-full border border-[color:var(--ob-border)] bg-[color:var(--ob-surface)] px-3.5 py-2 text-[0.9rem] font-medium"
          >
            <span aria-hidden>⬆</span> Upgrade plan
            <span aria-hidden className="size-1.5 rounded-full bg-[#0f8f6f]" />
          </button>
          <div className="flex items-center gap-2.5 rounded-[10px] px-2 py-2">
            <Placeholder shape="circle" width={26} height={26} glyph="◍" />
            <span className="flex-1 truncate text-[0.9rem]">{userName}@example.com</span>
            <span aria-hidden className="opacity-50">⌾</span>
          </div>
        </div>
      </Sidebar>

      <Main>
        <header className="flex flex-wrap items-center gap-4 px-6 py-5">
          <button
            type="button"
            className="rounded-full bg-[color:var(--ob-surface-2)] px-4 py-2 text-[0.92rem] font-semibold"
          >
            Free plan · <span className="underline underline-offset-2">Upgrade</span>
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
            <Btn tone="neutral" size="sm" className="rounded-full">
              <span aria-hidden>🗓</span> Scheduled <span aria-hidden className="opacity-50">⌄</span>
            </Btn>
            <Btn tone="neutral" size="sm" className="rounded-full px-2.5" aria-label="Library">
              ▥
            </Btn>
          </div>
        </header>

        <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col justify-center gap-8 px-6 pb-24">
          <h1 className="text-center text-[3.4rem] font-semibold tracking-[-0.03em]">
            {brandName.toLowerCase()}
          </h1>

          {/* Composer */}
          <div className="rounded-[18px] border border-[color:var(--ob-border)] bg-[color:var(--ob-surface)] p-4 [box-shadow:var(--ob-shadow)]">
            <p className="px-1 pb-6 pt-1 text-[1.05rem] text-[color:var(--ob-muted)]">
              Ask anything…
            </p>
            <div className="flex items-center gap-2">
              <button type="button" aria-label="Attach" className="px-1.5 text-lg opacity-60">
                ＋
              </button>
              <button
                type="button"
                className="flex items-center gap-1.5 rounded-full border border-[color:var(--ob-border)] px-3 py-1.5 text-[0.88rem] font-medium"
              >
                <span aria-hidden>⌕</span> Search <span aria-hidden className="opacity-50">⌄</span>
              </button>
              <button
                type="button"
                aria-label="Screen"
                className="rounded-full border border-[color:var(--ob-border)] px-2.5 py-1.5 text-[0.88rem]"
              >
                ▭
              </button>
              <div className="ml-auto flex items-center gap-3">
                <button type="button" className="flex items-center gap-1 text-[0.88rem] text-[color:var(--ob-muted)]">
                  Model <span aria-hidden className="opacity-50">⌄</span>
                </button>
                <button type="button" aria-label="Voice input" className="opacity-60">🎙</button>
                <button
                  type="button"
                  aria-label="Start voice session"
                  className="grid size-9 place-items-center rounded-full bg-[color:var(--ob-cta-bg)] text-[color:var(--ob-cta-fg)]"
                >
                  ∿
                </button>
              </div>
            </div>
          </div>

          <div>
            <div className="mb-3 flex items-center gap-2">
              <p className="flex-1 text-[0.92rem] text-[color:var(--ob-muted)]">
                Try out {brandName} Computer
              </p>
              <button type="button" aria-label="Shuffle suggestions" className="opacity-50">
                ⤨
              </button>
            </div>
            <div className="grid gap-2.5 sm:grid-cols-3">
              {SUGGESTIONS.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className="flex items-center gap-2.5 rounded-[10px] border border-[color:var(--ob-border)] bg-[color:var(--ob-surface)] px-3.5 py-3 text-left text-[0.92rem] font-medium transition-colors hover:border-[color:var(--ob-border-strong)]"
                >
                  {item.logos ? (
                    <span className="flex -space-x-1.5">
                      {Array.from({ length: item.logos }, (_, i) => (
                        <Placeholder key={i} width={18} height={18} radius={4} />
                      ))}
                    </span>
                  ) : (
                    <span aria-hidden className="opacity-60">{item.glyph}</span>
                  )}
                  {item.label}
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
