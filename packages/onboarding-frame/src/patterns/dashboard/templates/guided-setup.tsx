"use client";

import { Placeholder } from "../../../ui/placeholder";
import { cn } from "../../../lib/cn";
import { Surface, guidedSetupTokens } from "./tokens";
import { Btn, Card, Chip, Fab, Main, Shell, Sidebar } from "./chrome";
import type { TemplateProps } from "./props";

const RAIL = ["💡", "⬆", "👤", "🤖", "▤", "📊"];
const RAIL_BOTTOM = ["✈", "📣", "⌾"];

const STEPS = [
  {
    n: 1,
    title: "Send some text to try it out",
    body: "See how capture works on any content",
    action: "Generate sample text",
    expanded: true,
  },
  { n: 2, title: "Review the captured feedback", body: "Complete step 1 first", action: "Review", disabled: true },
  { n: 3, title: "Install feedback sources", body: "Automatically capture feedback from your tools", chevron: true },
];

/**
 * Guided setup dashboard.
 *
 * A two-column activation page: product picker on the left, and a numbered
 * sequence on the right where only the current step is interactive. Later
 * steps stay visible but disabled, so the path is legible without being noisy.
 */
export function GuidedSetupTemplate({
  brandName = "Signal",
  className,
}: TemplateProps) {
  return (
    <Surface tokens={guidedSetupTokens}>
    <Shell className={cn(className)}>
      {/* Narrow icon rail */}
      <aside className="hidden w-[64px] shrink-0 flex-col items-center gap-6 bg-[#e8e9fd] py-5 sm:flex">
        <Placeholder width={30} height={30} radius={7} glyph="▦" />
        <nav className="grid gap-5 text-[color:var(--ob-fg-soft)]">
          {RAIL.map((glyph, i) => (
            <button key={i} type="button" className="text-lg opacity-70 hover:opacity-100">
              {glyph}
            </button>
          ))}
        </nav>
        <div className="mt-auto grid gap-5 text-[color:var(--ob-fg-soft)]">
          {RAIL_BOTTOM.map((glyph, i) => (
            <button key={i} type="button" className="relative text-lg opacity-70 hover:opacity-100">
              {glyph}
              {i === 1 && (
                <span className="absolute -right-0.5 -top-0.5 size-2 rounded-full bg-[#ef4444]" />
              )}
            </button>
          ))}
          <Placeholder shape="circle" width={28} height={28} glyph="◍" />
        </div>
      </aside>

      <Main className="relative">
        <div className="grid gap-10 px-6 py-10 sm:px-12 lg:grid-cols-[minmax(0,420px)_1fr]">
          <div className="grid content-start gap-7">
            <div>
              <h1 className="text-[2.4rem] font-extrabold tracking-tight">
                Welcome to {brandName} 🎉
              </h1>
              <p className="mt-2 text-[1.05rem] text-[color:var(--ob-muted)]">
                We&apos;ve customised this getting started dashboard for you
              </p>
            </div>

            <Card className="border-[color:var(--ob-border-strong)] p-5">
              <div className="flex items-start gap-3">
                <div className="flex-1">
                  <h3 className="font-bold">Autopilot</h3>
                  <p className="mt-1 text-[0.92rem] text-[color:var(--ob-muted)]">
                    Automatically capture feedback from your sources
                  </p>
                </div>
                <Chip tone="success" className="px-2.5 py-1">Start</Chip>
              </div>
            </Card>

            <div>
              <button
                type="button"
                className="flex w-full items-center gap-2 py-2 text-left font-semibold"
              >
                <span className="flex-1">Set up other products</span>
                <span aria-hidden className="opacity-50">⌄</span>
              </button>
              <div className="flex items-start gap-3 py-3">
                <div className="flex-1">
                  <h4 className="font-bold">Portal</h4>
                  <p className="mt-0.5 text-[0.92rem] text-[color:var(--ob-muted)]">
                    Let users post and vote on feedback
                  </p>
                </div>
                <button type="button" aria-label="Add portal" className="text-lg opacity-50">
                  ＋
                </button>
              </div>
            </div>
          </div>

          <div className="grid content-start gap-4">
            <h2 className="text-xl font-extrabold tracking-tight">
              Let us show you the magic of Autopilot ✨
            </h2>

            {STEPS.map((step) => (
              <Card key={step.n} className={cn("p-5", step.disabled && "opacity-60")}>
                <div className="flex items-start gap-3">
                  <span
                    aria-hidden
                    className="grid size-6 shrink-0 place-items-center rounded-full bg-[color:var(--ob-surface-3)] text-[0.78rem] font-bold text-[color:var(--ob-muted)]"
                  >
                    {step.n}
                  </span>
                  <div className="flex-1">
                    <h3 className="font-bold">{step.title}</h3>
                    <p className="mt-0.5 text-[0.92rem] text-[color:var(--ob-muted)]">
                      {step.body}
                    </p>
                  </div>
                  {step.action && (
                    <Btn tone="neutral" size="sm" className={step.disabled ? "opacity-60" : undefined}>
                      {step.n === 1 && <span aria-hidden>✨</span>}
                      {step.action}
                    </Btn>
                  )}
                  {step.chevron && <span aria-hidden className="text-lg opacity-40">›</span>}
                </div>

                {step.expanded && (
                  <div className="mt-4 grid gap-3">
                    <div className="rounded-[10px] border border-[color:var(--ob-border)] p-4 text-[0.92rem] leading-relaxed text-[color:var(--ob-muted)]">
                      Paste text that could contain product feedback. For example, an
                      email, a chat message, a support conversation, or a call transcript.
                    </div>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {["User", "Company"].map((label) => (
                        <button
                          key={label}
                          type="button"
                          className="flex items-center gap-2 rounded-[10px] border border-[color:var(--ob-border)] px-3.5 py-2.5 text-left text-[0.92rem] text-[color:var(--ob-muted)]"
                        >
                          <span aria-hidden className="opacity-60">
                            {label === "User" ? "☺" : "▤"}
                          </span>
                          <span className="flex-1">{label}</span>
                          <span aria-hidden className="opacity-50">⌄</span>
                        </button>
                      ))}
                    </div>
                    <Btn tone="neutral" size="sm" className="justify-self-end opacity-60">
                      Submit
                    </Btn>
                  </div>
                )}
              </Card>
            ))}
          </div>
        </div>

        <Fab glyph="💬" tone="#5b5bd6" />
      </Main>
    </Shell>
    </Surface>
  );
}
