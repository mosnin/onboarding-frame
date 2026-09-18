"use client";

import { Placeholder } from "../../../ui/placeholder";
import { cn } from "../../../lib/cn";
import { Surface, guidesTokens } from "./tokens";
import { Btn, Card, Chip, Main, SearchField, Shell, Sidebar, Table, TopBar } from "./chrome";
import type { TemplateProps } from "./api-console";

const NAV = [
  { id: "started", label: "Get started", glyph: "◯", pill: true },
  { id: "home", label: "Home", glyph: "⌂" },
  { id: "composer", label: "Composer", glyph: "✦" },
  { id: "gap1", gap: true },
  { id: "campaigns", label: "Campaigns", glyph: "▷" },
  { id: "flows", label: "Flows", glyph: "⛓" },
  { id: "gap2", gap: true },
  { id: "website", label: "Website", glyph: "▤", caret: true },
  { id: "social", label: "Social", glyph: "⚯", caret: true },
  { id: "service", label: "Service", glyph: "✉", caret: true },
  { id: "audience", label: "Audience", glyph: "👥", caret: true },
  { id: "content", label: "Content", glyph: "▥", caret: true },
  { id: "analytics", label: "Analytics", glyph: "◔", caret: true },
];

const IDEAS = [
  { id: "flows", label: "Discover missing flows", glyph: "⛓" },
  { id: "campaign", label: "Generate a campaign", glyph: "▷" },
  { id: "segments", label: "Audit my segments", glyph: "👥" },
];

/**
 * Guides with an assistant panel.
 *
 * A personalised setup guide down the middle, with a docked assistant on the
 * right that suggests next actions. The guide rows carry their own state —
 * done, in progress, needs review — so progress is legible at a glance.
 */
export function GuidesAssistantTemplate({
  brandName = "Beacon",
  userName = "Sam",
  className,
}: TemplateProps) {
  return (
    <Surface tokens={guidesTokens}>
      <Shell className={cn(className)}>
        <Sidebar width={272} bg="var(--ob-surface)">
          <div className="p-4">
            <Placeholder width={26} height={26} radius={6} glyph="▦" />
          </div>
          <nav className="grid gap-0.5 px-3">
            {NAV.map((item) =>
              item.gap ? (
                <span key={item.id} className="h-4" />
              ) : (
                <button
                  key={item.id}
                  type="button"
                  className={cn(
                    "flex items-center gap-3 rounded-[8px] px-3 py-2.5 text-left text-[0.92rem]",
                    item.pill
                      ? "bg-[color:var(--ob-surface-3)] font-semibold"
                      : "text-[color:var(--ob-fg-soft)] hover:bg-[color:var(--ob-surface-2)]",
                  )}
                >
                  <span aria-hidden className="w-4 text-center opacity-70">{item.glyph}</span>
                  <span className="flex-1">{item.label}</span>
                  {item.caret && <span aria-hidden className="opacity-40">⌄</span>}
                </button>
              ),
            )}
          </nav>

          {[
            { title: "Advanced", items: [{ id: "ma", label: "Marketing analytics", glyph: "💡" }] },
            {
              title: `Grow with ${brandName}`,
              items: [
                { id: "sms", label: "Text setup guide", glyph: "💬" },
                { id: "wa", label: "Chat setup guide", glyph: "📱" },
                { id: "growth", label: "Growth strategies", glyph: "📈" },
              ],
            },
          ].map((group) => (
            <div key={group.title}>
              <p className="px-6 pb-1 pt-5 text-[0.78rem] text-[color:var(--ob-muted)]">
                {group.title}
              </p>
              <nav className="grid gap-0.5 px-3">
                {group.items.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    className="flex items-center gap-3 rounded-[8px] px-3 py-2.5 text-left text-[0.92rem] text-[color:var(--ob-fg-soft)] hover:bg-[color:var(--ob-surface-2)]"
                  >
                    <span aria-hidden className="w-4 text-center opacity-70">{item.glyph}</span>
                    {item.label}
                  </button>
                ))}
              </nav>
            </div>
          ))}

          <div className="mt-auto flex items-center gap-2.5 border-t border-[color:var(--ob-border)] p-4">
            <span className="grid size-7 place-items-center rounded-full bg-[color:var(--ob-surface-3)] text-[0.72rem] font-bold">
              {userName.slice(0, 2).toUpperCase()}
            </span>
            <span className="flex-1 truncate text-[0.9rem] font-medium">{userName}</span>
            <span aria-hidden className="opacity-40">⌄</span>
          </div>
        </Sidebar>

        <Main>
          <TopBar bg="var(--ob-surface)">
            <SearchField
              placeholder="Search"
              shortcut="⌘K"
              rounded="md"
              className="mx-auto w-full max-w-[720px]"
            />
            <div className="flex items-center gap-3">
              <button type="button" aria-label="Notifications" className="relative opacity-70">
                ⌾
                <span className="absolute -right-1 -top-1 grid size-4 place-items-center rounded-full bg-[#e0332c] text-[0.6rem] font-bold text-white">
                  7
                </span>
              </button>
              <Btn tone="neutral" size="sm">Account plan</Btn>
              <Btn tone="ghost" size="sm">Support</Btn>
              <button type="button" aria-label="Assistant" className="text-[color:var(--ob-brand)]">
                ✦
              </button>
            </div>
          </TopBar>

          <div className="flex flex-1 gap-5 p-5">
            {/* Guide column */}
            <div className="flex-1 rounded-[14px] border border-[color:var(--ob-border)] bg-[color:var(--ob-surface)] p-8">
              <div className="grid justify-items-center gap-3 text-center">
                <span className="flex items-center gap-2 rounded-full border border-[color:var(--ob-border)] px-3.5 py-1.5 text-[0.86rem] font-medium">
                  <span aria-hidden className="size-4 rounded-full border-2 border-[color:var(--ob-border-strong)]" />
                  0 / 4 guides completed
                </span>
                <h1 className="text-[2rem] font-extrabold tracking-tight">
                  Let&apos;s get started, {userName}!
                </h1>
                <p className="max-w-lg text-pretty text-[color:var(--ob-muted)]">
                  Based on what we know about your business, we&apos;ve created a
                  personalised setup guide to help you start seeing value.
                </p>
              </div>

              <Card className="mt-8 grid gap-6 p-6 lg:grid-cols-[300px_1fr]">
                <div>
                  <h2 className="flex items-center gap-2 font-bold">
                    <span aria-hidden>⚙</span> Account setup
                  </h2>
                  <p className="mt-1.5 text-[0.92rem] text-[color:var(--ob-muted)]">
                    Get set up to start sending and grow your marketing.
                  </p>
                  <Chip tone="info" className="mt-3">2 / 3 completed</Chip>
                </div>

                <div className="grid gap-3">
                  {[
                    { id: "tools", label: "Business tools", done: true, logos: 1 },
                    { id: "channels", label: "Marketing channels", done: true, logos: 3 },
                    { id: "branding", label: "Confirm branding", done: false, swatches: true },
                  ].map((row) => (
                    <div
                      key={row.id}
                      className="flex items-center gap-3 rounded-[10px] border border-[color:var(--ob-border)] p-4"
                    >
                      <span
                        aria-hidden
                        className={cn(
                          "grid size-6 shrink-0 place-items-center rounded-full text-[0.7rem]",
                          row.done
                            ? "bg-[color:var(--ob-success)] text-white"
                            : "border-2 border-dashed border-[color:var(--ob-border-strong)]",
                        )}
                      >
                        {row.done ? "✓" : ""}
                      </span>
                      <span className="flex-1 font-bold">{row.label}</span>
                      {row.logos && (
                        <span className="flex gap-1.5">
                          {Array.from({ length: row.logos }, (_, i) => (
                            <Placeholder key={i} width={24} height={24} radius={12} />
                          ))}
                        </span>
                      )}
                      {row.swatches && (
                        <span className="flex gap-1.5">
                          <Placeholder width={28} height={24} radius={4} />
                          <span className="size-6 rounded bg-[#ec4899]" />
                          <span className="size-6 rounded bg-[#2b2b2b]" />
                          <span className="size-6 rounded border border-[color:var(--ob-border)] bg-white" />
                        </span>
                      )}
                      <Btn tone={row.done ? "ghost" : "dark"} size="sm">
                        {row.done ? "Manage" : "Review"}
                      </Btn>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="mt-5 grid gap-6 p-6 lg:grid-cols-[300px_1fr]">
                <div>
                  <h2 className="flex items-center gap-2 font-bold">
                    <span aria-hidden>👥</span> Grow your audience
                  </h2>
                  <p className="mt-1.5 text-[0.92rem] text-[color:var(--ob-muted)]">
                    Build your subscriber base by turning visitors into subscribers.
                  </p>
                  <Chip tone="info" className="mt-3">0 / 2 completed</Chip>
                </div>

                <div>
                  <Table
                    columns={["Form", "Type", "Status", "Submitted"]}
                    align={["left", "left", "left", "right"]}
                    rows={[
                      [
                        <span key="f" className="flex items-center gap-2.5">
                          <span aria-hidden className="opacity-40">⌃</span>
                          <Placeholder width={40} height={32} radius={4} />
                          <span className="font-medium">Sign-up form</span>
                        </span>,
                        <Chip key="t">▣ Popup</Chip>,
                        <Chip key="s" tone="brand">✦ Suggested</Chip>,
                        <span key="n" className="tabular-nums">0</span>,
                      ],
                    ]}
                  />
                  <div className="mt-4 grid gap-5 rounded-[10px] bg-[color:var(--ob-surface-2)] p-5 sm:grid-cols-[1fr_200px]">
                    <div>
                      <h3 className="font-bold">Sign-up form</h3>
                      <p className="mt-1.5 text-[0.92rem] leading-relaxed text-[color:var(--ob-muted)]">
                        A multi-step sign-up form that collects email and text
                        messaging consent, and confirms subscription to your mailing
                        list.
                      </p>
                    </div>
                    <Placeholder
                      ratio={3 / 4}
                      radius={8}
                      label="Form preview"
                      className="w-full"
                    />
                  </div>
                </div>
              </Card>
            </div>

            {/* Assistant panel */}
            <aside className="hidden w-[360px] shrink-0 flex-col rounded-[14px] border border-[color:var(--ob-border)] bg-[color:var(--ob-surface)] xl:flex">
              <div className="flex items-center gap-2 border-b border-[color:var(--ob-border)] p-4">
                <span aria-hidden className="text-[color:var(--ob-brand)]">✦</span>
                <span className="font-semibold">New chat</span>
                <span aria-hidden className="opacity-40">⌄</span>
                <Chip tone="info" className="ml-1">Beta</Chip>
                <div className="ml-auto flex items-center gap-2 text-[color:var(--ob-muted)]">
                  <button type="button" aria-label="Expand">⤢</button>
                  <button type="button" aria-label="Close">✕</button>
                </div>
              </div>

              <div className="grid content-start gap-5 p-6 text-center">
                <span aria-hidden className="text-3xl text-[color:var(--ob-brand)]">✦</span>
                <div>
                  <h3 className="text-lg font-bold">What can I help you with?</h3>
                  <p className="mt-1.5 text-[0.9rem] leading-relaxed text-[color:var(--ob-muted)]">
                    Ask questions, get recommendations, and bring your marketing to
                    life — all in one place.
                  </p>
                </div>
                <Btn tone="neutral" size="sm" className="justify-self-center">
                  Learn more
                </Btn>

                <p className="mt-2 text-left text-[0.85rem] text-[color:var(--ob-muted)]">
                  A few ideas to get started
                </p>
                <div className="grid gap-2.5">
                  {IDEAS.map((idea) => (
                    <button
                      key={idea.id}
                      type="button"
                      className="flex items-center gap-3 rounded-[10px] border border-[color:var(--ob-brand)] bg-[color:var(--ob-brand-soft)] px-3.5 py-3 text-left text-[0.92rem] font-medium"
                    >
                      <span aria-hidden className="opacity-70">{idea.glyph}</span>
                      {idea.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-auto border-t border-[color:var(--ob-border)] p-4">
                <p className="text-[0.76rem] leading-relaxed text-[color:var(--ob-muted)]">
                  This assistant records conversations to improve responses.
                </p>
                <div className="mt-3 rounded-[10px] border border-[color:var(--ob-border)] p-3">
                  <p className="text-[0.92rem] text-[color:var(--ob-muted)]">
                    Ask anything
                  </p>
                  <div className="mt-6 flex items-center gap-3 text-[color:var(--ob-muted)]">
                    <button type="button" aria-label="Attach">＋</button>
                    <button type="button" aria-label="Templates">▤</button>
                    <button
                      type="button"
                      aria-label="Send"
                      className="ml-auto grid size-7 place-items-center rounded-full bg-[color:var(--ob-surface-3)]"
                    >
                      ↑
                    </button>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </Main>
      </Shell>
    </Surface>
  );
}
