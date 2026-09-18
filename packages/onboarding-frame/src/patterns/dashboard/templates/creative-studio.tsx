"use client";

import { Avatar, Thumb } from "../../../ui/avatar";
import { cn } from "../../../lib/cn";
import { Surface, creativeStudioTokens } from "./tokens";
import { Btn, Main, SearchField, Shell, Sidebar, TopBar } from "./chrome";
import type { TemplateProps } from "./props";
import {
  CheckCircleIcon,
  ChevronDown,
  ClockIcon,
  CoinsIcon,
  Gift,
  Icon,
  LifebuoyIcon,
  LinkIcon,
  RecordIcon,
  RobotIcon,
  Sparkle,
  type IconName,
} from "../../../ui/icons";

type Row = { id: string; label: string; icon: IconName; active?: boolean };

const NAV: Row[] = [
  { id: "home", label: "Home", icon: "home", active: true },
  { id: "recents", label: "Recents", icon: "folder" },
  { id: "shared", label: "Shared with me", icon: "share" },
];

const WORKSPACES: Row[] = [
  { id: "personal", label: "Personal", icon: "lock" },
  { id: "general", label: "General", icon: "users" },
];

const TOOLS: Row[] = [
  { id: "brand", label: "Brand studio", icon: "palette" },
  { id: "media", label: "Media library", icon: "video" },
  { id: "speakers", label: "AI speakers", icon: "mic" },
  { id: "layouts", label: "Layout packs", icon: "grid" },
  { id: "learn", label: "Learn the basics", icon: "book" },
];

/** Each chip carries a mark in the reference; label-only chips read as tags. */
const PROMPTS: { label: string; icon: IconName }[] = [
  { label: "Clean up video recording", icon: "video" },
  { label: "Generate with an avatar", icon: "userPlus" },
  { label: "Rough cut of podcast", icon: "mic" },
  { label: "Create social clips", icon: "layers" },
  { label: "Translate & dub video", icon: "globe" },
  { label: "Turn slides into video", icon: "monitor" },
  { label: "Generate animated video", icon: "play" },
];

const FEATURES: { id: string; title: string; body: string; icon: IconName }[] = [
  { id: "maker", title: "AI video maker", body: "Watch the studio assemble your video with voiceover and visuals", icon: "video" },
  { id: "speaker", title: "Create with AI speaker", body: "Let an avatar present your script — no need to record", icon: "userPlus" },
  { id: "transcribe", title: "Transcribe", body: "Accurate, fast, across twenty-five languages", icon: "chat" },
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
        {/* Measured off the reference: 241px, not 272. */}
        <Sidebar width={241}>
          <div className="flex items-center gap-2 p-4">
            <Avatar name={brandName} size={26} rounded={6} />
            <button type="button" aria-label="Tasks" className="ml-auto opacity-50">
              <CheckCircleIcon width={18} height={18} />
            </button>
          </div>

          <div className="mx-3 flex items-center gap-2.5 rounded-[10px] border border-[color:var(--ob-border)] p-2.5">
            <span className="grid size-7 place-items-center rounded-[7px] bg-[color:var(--ob-surface-3)] text-[0.78rem] font-bold">
              {userName.slice(0, 1)}
            </span>
            <span className="flex-1 truncate text-[0.9rem] font-medium">
              {userName}&apos;s workspace
            </span>
            <ChevronDown width={15} height={15} className="opacity-40" />
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
                <Icon name={item.icon} width={17} height={17} className="shrink-0 opacity-70" />
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
                {group.title}
                <ChevronDown width={13} height={13} className="opacity-60" />
              </button>
              <nav className="grid gap-0.5 px-3">
                {group.items.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    className="flex items-center gap-3 rounded-[8px] px-3 py-2.5 text-left text-[0.95rem] text-[color:var(--ob-fg-soft)] hover:bg-[color:var(--ob-surface-2)]"
                  >
                    <Icon name={item.icon} width={17} height={17} className="shrink-0 opacity-70" />
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
                <CoinsIcon width={15} height={15} className="opacity-70" /> 100
              </span>
              <span className="flex items-center gap-1.5 text-[0.86rem] font-semibold">
                <ClockIcon width={15} height={15} className="opacity-70" /> 60m
              </span>
              <Btn tone="neutral" size="sm" className="border-[#d9a8bb] text-[color:var(--ob-brand)]">
                Upgrade
              </Btn>
              <Btn tone="neutral" size="sm">
                <Gift width={15} height={15} /> Earn $20
              </Btn>
              <Avatar name={userName} size={30} />
              <button type="button" aria-label="Help" className="relative opacity-60">
                <LifebuoyIcon width={19} height={19} />
                <span className="absolute -right-0.5 -top-0.5 size-[6px] rounded-full bg-[#e0245e]" />
              </button>
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
                <RecordIcon width={12} height={12} className="text-[#d1344f]" /> Record
              </Btn>
              <Btn tone="dark" size="sm">New project</Btn>
            </div>

            {/* Textured hero band */}
            <section
              className="mt-5 rounded-[14px] px-6 py-10 sm:px-12"
              style={{
                background:
                  "repeating-linear-gradient(90deg, #ece3e6 0 1px, #f3edef 1px 7px, #efe8ea 7px 11px), #f2ebee",
              }}
            >
              <h2 className="flex items-center justify-center gap-3 text-[1.9rem] font-semibold tracking-tight">
                <RobotIcon width={30} height={30} className="opacity-80" />
                What can I help you with?
              </h2>

              <div className="mx-auto mt-6 max-w-3xl rounded-[12px] bg-[color:var(--ob-surface)] p-4 [box-shadow:var(--ob-shadow)]">
                <p className="px-1 pb-6 pt-1 text-[1rem] text-[color:var(--ob-muted)]">
                  Upload a file or describe what you want to make, and I&apos;ll help you plan it.
                </p>
                <div className="flex items-center gap-3">
                  <button type="button" aria-label="Attach" className="opacity-55">
                    <LinkIcon width={17} height={17} />
                  </button>
                  <button type="button" className="flex items-center gap-1.5 text-[0.88rem] text-[color:var(--ob-muted)]">
                    <Sparkle width={15} height={15} /> Auto
                  </button>
                  <Btn tone="dark" size="sm" className="ml-auto bg-[color:var(--ob-brand)]">
                    Get started
                  </Btn>
                </div>
              </div>

              <div className="mx-auto mt-5 flex max-w-4xl flex-wrap justify-center gap-2.5">
                {PROMPTS.map((prompt) => (
                  <button
                    key={prompt.label}
                    type="button"
                    className="flex items-center gap-2 rounded-full border border-[color:var(--ob-border)] bg-[color:var(--ob-surface)] px-3.5 py-2 text-[0.88rem] font-medium"
                  >
                    <Icon name={prompt.icon} width={15} height={15} className="opacity-70" />
                    {prompt.label}
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
                    <Icon
                      name={feature.icon}
                      width={22}
                      height={22}
                      className="text-[#e07a5f]"
                    />
                    <h4 className="mt-3 font-bold">{feature.title}</h4>
                    <p className="mt-1.5 text-[0.9rem] leading-relaxed text-[color:var(--ob-fg-soft)]">
                      {feature.body}
                    </p>
                  </div>
                  <span className="block size-[150px] shrink-0 self-center">
                    <Thumb seed="feature-art" radius={8} alt="Feature art" />
                  </span>
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
              <span className="block h-[190px] w-[420px] max-w-full">
                <Thumb seed="product-tour" radius={10} alt="Product tour still" />
              </span>
            </section>
          </div>
        </Main>
      </Shell>
    </Surface>
  );
}
