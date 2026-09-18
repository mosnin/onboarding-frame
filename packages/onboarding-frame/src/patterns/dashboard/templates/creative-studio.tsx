"use client";

import { Placeholder } from "../../../ui/placeholder";
import { cn } from "../../../lib/cn";
import { Surface, creativeStudioTokens } from "./tokens";
import { Btn, Main, SearchField, Shell, Sidebar, TopBar } from "./chrome";
import type { TemplateProps } from "./props";

const NAV = [
  { id: "home", label: "Home", glyph: "⌂", active: true },
  { id: "recents", label: "Recents", glyph: "🗂" },
  { id: "shared", label: "Shared with me", glyph: "↗" },
];

const WORKSPACES = [
  { id: "personal", label: "Personal", glyph: "🔒" },
  { id: "general", label: "General", glyph: "👥" },
];

const TOOLS = [
  { id: "brand", label: "Brand studio", glyph: "🅐" },
  { id: "media", label: "Media library", glyph: "▶" },
  { id: "speakers", label: "AI speakers", glyph: "∿" },
  { id: "layouts", label: "Layout packs", glyph: "▦" },
  { id: "learn", label: "Learn the basics", glyph: "📖" },
];

const PROMPTS = [
  "Clean up a recording",
  "Generate with an avatar",
  "Rough cut of a podcast",
  "Create social clips",
  "Translate & dub video",
  "Turn slides into video",
  "Generate animated video",
];

const FEATURES = [
  { id: "maker", title: "AI video maker", body: "Watch the studio assemble your video with voiceover and visuals", glyph: "🎬" },
  { id: "speaker", title: "Create with an AI speaker", body: "Let an avatar present your script — no need to record", glyph: "👤" },
  { id: "transcribe", title: "Transcribe", body: "Accurate, fast, across twenty-five languages", glyph: "❝" },
];

/**
 * Creative studio home.
 *
 * An oversized prompt hero sits on a textured band, with capability chips
 * underneath — the surface teaches what the tool can do before asking the
 * person to decide what to make.
 */
export function CreativeStudioTemplate({
  brandName = "Reel",
  userName = "Alex",
  className,
}: TemplateProps) {
  return (
    <Surface tokens={creativeStudioTokens}>
      <Shell className={cn(className)}>
        <Sidebar width={272}>
          <div className="flex items-center gap-2 p-4">
            <Placeholder width={26} height={26} radius={6} glyph="▦" />
            <button type="button" aria-label="Tasks" className="ml-auto opacity-50">✓</button>
          </div>

          <div className="mx-3 flex items-center gap-2.5 rounded-[10px] border border-[color:var(--ob-border)] p-2.5">
            <span className="grid size-7 place-items-center rounded-[7px] bg-[color:var(--ob-surface-3)] text-[0.78rem] font-bold">
              {userName.slice(0, 1)}
            </span>
            <span className="flex-1 truncate text-[0.9rem] font-medium">
              {userName}&apos;s workspace
            </span>
            <span aria-hidden className="opacity-40">⌄</span>
          </div>

          <nav className="mt-4 grid gap-0.5 px-3">
            {NAV.map((item) => (
              <button
                key={item.id}
                type="button"
                aria-current={item.active ? "page" : undefined}
                className={cn(
                  "flex items-center gap-3 rounded-[8px] px-3 py-2.5 text-left text-[0.95rem]",
                  item.active
                    ? "bg-[color:var(--ob-surface-2)] font-semibold"
                    : "text-[color:var(--ob-fg-soft)] hover:bg-[color:var(--ob-surface-2)]",
                )}
              >
                <span aria-hidden className="w-4 text-center opacity-70">{item.glyph}</span>
                {item.label}
              </button>
            ))}
          </nav>

          {[
            { title: "Workspaces", items: WORKSPACES },
            { title: "Tools", items: TOOLS },
          ].map((group) => (
            <div key={group.title}>
              <button
                type="button"
                className="flex w-full items-center gap-1.5 px-6 pb-1 pt-5 text-[0.85rem] font-semibold text-[color:var(--ob-muted)]"
              >
                {group.title} <span aria-hidden className="opacity-60">⌄</span>
              </button>
              <nav className="grid gap-0.5 px-3">
                {group.items.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    className="flex items-center gap-3 rounded-[8px] px-3 py-2.5 text-left text-[0.95rem] text-[color:var(--ob-fg-soft)] hover:bg-[color:var(--ob-surface-2)]"
                  >
                    <span aria-hidden className="w-4 text-center opacity-70">{item.glyph}</span>
                    {item.label}
                  </button>
                ))}
              </nav>
            </div>
          ))}
        </Sidebar>

        <Main>
          <TopBar border={false}>
            <SearchField placeholder="Search projects" className="mx-auto w-full max-w-[640px]" />
            <div className="flex items-center gap-2.5">
              <span className="flex items-center gap-1.5 text-[0.86rem] font-semibold">
                <span aria-hidden>◔</span> 100
              </span>
              <span className="flex items-center gap-1.5 text-[0.86rem] font-semibold">
                <span aria-hidden>⏱</span> 60m
              </span>
              <Btn tone="neutral" size="sm" className="border-[#d9a8bb] text-[color:var(--ob-brand)]">
                Upgrade
              </Btn>
              <Btn tone="neutral" size="sm">🎁 Earn $20</Btn>
              <Placeholder shape="circle" width={30} height={30} glyph="◍" />
            </div>
          </TopBar>

          <div className="px-6 pb-12 sm:px-8">
            <div className="flex items-center gap-3 rounded-[8px] bg-[#f6e6ec] px-5 py-3 text-[0.9rem]">
              <span className="flex-1 text-center">
                You&apos;re on a <strong>Free plan</strong>. Upgrade for more media minutes,
                credits and watermark-free exports.
              </span>
              <Btn tone="neutral" size="sm" className="border-[#d9a8bb] text-[color:var(--ob-brand)]">
                Upgrade
              </Btn>
            </div>

            <div className="mt-6 flex justify-end gap-2.5">
              <Btn tone="neutral" size="sm">
                <span aria-hidden className="text-[#d1344f]">⏺</span> Record
              </Btn>
              <Btn tone="dark" size="sm">New project</Btn>
            </div>

            {/* Textured hero band */}
            <section
              className="mt-5 rounded-[14px] px-6 py-10 sm:px-12"
              style={{
                background:
                  "repeating-linear-gradient(105deg, #efe7ea 0 2px, #f6f1f3 2px 9px), #f4eef0",
              }}
            >
              <h2 className="flex items-center justify-center gap-3 text-[1.9rem] font-semibold tracking-tight">
                <span aria-hidden>🤖</span> What can I help you with?
              </h2>

              <div className="mx-auto mt-6 max-w-3xl rounded-[12px] bg-[color:var(--ob-surface)] p-4 [box-shadow:var(--ob-shadow)]">
                <p className="px-1 pb-6 pt-1 text-[1rem] text-[color:var(--ob-muted)]">
                  Upload a file or describe what you want to make, and I&apos;ll help you plan it.
                </p>
                <div className="flex items-center gap-3">
                  <button type="button" aria-label="Attach" className="opacity-60">📎</button>
                  <button type="button" className="flex items-center gap-1.5 text-[0.88rem] text-[color:var(--ob-muted)]">
                    <span aria-hidden>▣</span> Auto
                  </button>
                  <Btn tone="dark" size="sm" className="ml-auto bg-[color:var(--ob-brand)]">
                    Get started
                  </Btn>
                </div>
              </div>

              <div className="mx-auto mt-5 flex max-w-4xl flex-wrap justify-center gap-2.5">
                {PROMPTS.map((prompt) => (
                  <button
                    key={prompt}
                    type="button"
                    className="rounded-full border border-[color:var(--ob-border)] bg-[color:var(--ob-surface)] px-3.5 py-2 text-[0.88rem] font-medium"
                  >
                    {prompt}
                  </button>
                ))}
                <button type="button" className="px-2 py-2 text-[0.88rem] text-[color:var(--ob-muted)]">
                  Browse prompt templates…
                </button>
              </div>
            </section>

            <h3 className="mt-10 text-lg font-bold">Popular features</h3>
            <div className="mt-4 grid gap-4 lg:grid-cols-3">
              {FEATURES.map((feature) => (
                <article
                  key={feature.id}
                  className="flex gap-4 rounded-[10px] border border-[color:var(--ob-border)] p-5"
                >
                  <div className="flex-1">
                    <span aria-hidden className="text-xl text-[color:var(--ob-brand)]">
                      {feature.glyph}
                    </span>
                    <h4 className="mt-3 font-bold">{feature.title}</h4>
                    <p className="mt-1.5 text-[0.9rem] leading-relaxed text-[color:var(--ob-fg-soft)]">
                      {feature.body}
                    </p>
                  </div>
                  <Placeholder
                    width={120}
                    height={100}
                    radius={8}
                    label="Feature art"
                    className="shrink-0 self-center"
                  />
                </article>
              ))}
            </div>

            <section className="mt-6 flex flex-wrap items-center gap-8 rounded-[14px] bg-[color:var(--ob-surface-2)] p-8">
              <div className="min-w-[280px] flex-1">
                <h3 className="text-[1.7rem] font-semibold tracking-tight">
                  Take a tour of {brandName}
                </h3>
                <p className="mt-2 max-w-md leading-relaxed text-[color:var(--ob-fg-soft)]">
                  Learn your way around the app, including the basics of text-based
                  editing, so you can start creating.
                </p>
              </div>
              <Placeholder
                width={420}
                height={190}
                radius={10}
                label="Product tour still"
                className="max-w-full"
              />
            </section>
          </div>
        </Main>
      </Shell>
    </Surface>
  );
}
