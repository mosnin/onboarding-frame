"use client";

import type { ReactNode } from "react";
import { Ring } from "../../../ui/charts";
import { cn } from "../../../lib/cn";
import { AvatarSlot, Placeholder, WordmarkSlot } from "../../../ui/placeholder";
import { Surface, schedulerTokens } from "./tokens";
import { Main, NavItem, NavSection, Shell, Sidebar } from "./chrome";
import type { TemplateProps } from "./api-console";

export type SchedulerPage = "home" | "publish" | "community";

export interface SocialSchedulerProps extends TemplateProps {
  page?: SchedulerPage;
}

const NAV = [
  { id: "home", label: "Home", glyph: "⌂" },
  { id: "create", label: "Create", glyph: "✎" },
  { id: "publish", label: "Publish", glyph: "▦", badge: "3" },
  { id: "community", label: "Community", glyph: "◎", badge: "1" },
  { id: "start", label: "Start Page", glyph: "▤", external: true },
  { id: "analytics", label: "Analytics", glyph: "▥", external: true },
];

const CHANNELS = [
  { id: "c1", handle: "hello.asmith", count: "0", live: false },
  { id: "c2", handle: "hello.asmith", count: "3", live: true },
  { id: "c3", handle: "as cupcake", count: "0", live: false },
];

const CONNECT = ["LinkedIn", "Bluesky", "Facebook"];

/** Rings, not bars: each score is a share of its own target, not of a total. */
const SCORES = [
  {
    id: "streak",
    value: 100,
    display: "1",
    color: "#8b5cf6",
    label: "Week Streak",
    sub: "Well ahead of schedule",
  },
  {
    id: "goals",
    value: 100,
    display: "100%",
    color: "#2f9e44",
    label: "Posting Goals",
    sub: "1 of 1, nice work!",
  },
  {
    id: "comments",
    value: 60,
    display: "60",
    color: "#e8a33d",
    label: "Comment Score",
    sub: "↗ 100% from last week",
  },
];

const PULSE = [
  { id: "posts", label: "Posts", value: "1" },
  { id: "followers", label: "Followers", value: "1" },
  { id: "comments", label: "Comments", value: "0" },
];

const QUEUE = [
  { id: "q1", when: "Jun 26, 9:43 AM", channel: "hello.asmith" },
  { id: "q2", when: "Jun 30, 9:45 AM", channel: "hello.asmith" },
];

const TEMPLATES = [
  {
    id: "t1",
    glyph: "🧯",
    title: "You don't need what you think you need",
    body: "Challenge the myth that success requires a certain tool, degree, or habit. Share what…",
  },
  {
    id: "t2",
    glyph: "🌀",
    title: "No 5-year plan — just progress",
    body: "Share what happened when you stopped chasing a perfect roadmap and started…",
  },
  {
    id: "t3",
    glyph: "🏔",
    title: "Share a project that challenged you in a good way",
    body: "Talk about a project that pushed you outside your comfort zone.",
  },
  {
    id: "t4",
    glyph: "💬",
    title: "My “Ask Me Anything” moment",
    body: "Invite your audience to ask you questions about your journey, work, or expertise.…",
  },
];

/**
 * Social scheduling home.
 *
 * Everything here is borderless: cards are grey fills on white with 16px
 * radii, which is what makes the surface read as consumer software rather than
 * as the hairline-ruled B2B tools elsewhere in this catalogue. The counts are
 * left honestly small (1 post, 0 comments) because a brand-new account is the
 * state this screen is designed for.
 */
export function SocialSchedulerTemplate({
  className,
  page = "home",
}: SocialSchedulerProps) {
  return (
    <Surface tokens={schedulerTokens} className={className}>
      <Shell>
        <Sidebar width={318} bg="var(--ob-surface)" className="border-r-0">
          <div className="flex items-center gap-2 px-5 pb-4 pt-5">
            <WordmarkSlot width={92} height={16} label="" />
            <span className="ml-auto flex items-center gap-1 text-[0.8rem] text-[color:var(--ob-muted)]">
              <span aria-hidden>🌱</span>1
            </span>
          </div>

          <div className="px-4 pb-4">
            <button
              type="button"
              className="flex w-full items-center justify-center gap-1.5 rounded-full bg-[color:var(--ob-cta-bg)] py-3 text-[0.95rem] font-semibold text-[color:var(--ob-cta-fg)]"
            >
              + New
            </button>
          </div>

          <nav className="grid gap-0.5 px-3">
            {NAV.map((item) => (
              <NavItem
                key={item.id}
                label={item.label}
                glyph={item.glyph}
                active={item.id === page}
                badge={item.badge}
                trailing={
                  item.external ? (
                    <span aria-hidden className="text-[0.75rem] text-[color:var(--ob-muted)]">
                      ↗
                    </span>
                  ) : undefined
                }
                className="rounded-full"
              />
            ))}
          </nav>

          <NavSection label="Channels" />
          <nav className="grid gap-0.5 px-3">
            {CHANNELS.map((channel) => (
              <NavItem
                key={channel.id}
                label={channel.handle}
                badge={channel.count}
                glyph={
                  <span className="relative inline-flex">
                    {channel.live && (
                      <span className="absolute -left-2 top-1.5 h-1.5 w-1.5 rounded-full bg-[color:var(--ob-success)]" />
                    )}
                    <AvatarSlot size={22} />
                  </span>
                }
                className="rounded-full"
              />
            ))}
          </nav>

          <NavSection label="Connect channels" />
          <nav className="grid gap-0.5 px-3">
            {CONNECT.map((name) => (
              <NavItem
                key={name}
                label={name}
                glyph={<AvatarSlot size={22} />}
                className="rounded-full"
              />
            ))}
            <NavItem label="More channels" glyph="+" className="rounded-full" />
          </nav>

          <div className="mt-auto flex items-center gap-2.5 px-5 py-5">
            <AvatarSlot size={30} />
            <span className="flex-1">
              <span className="block text-[0.88rem] font-semibold">AS Acme</span>
              <span className="block text-[0.78rem] text-[color:var(--ob-muted)]">
                Team Plan
              </span>
            </span>
            <span aria-hidden className="text-[color:var(--ob-muted)]">◧</span>
          </div>
        </Sidebar>

        <Main className="overflow-auto p-7">
          {page === "home" && <Home />}
          {page === "publish" && <Publish />}
          {page === "community" && <Community />}
        </Main>
      </Shell>
    </Surface>
  );
}

function Home() {
  return (
    <div className="mx-auto w-full max-w-[1330px]">
      <header className="flex items-start gap-4">
        <Placeholder width={58} height={58} radius={14} label="" glyph="👋" />
        <div className="flex-1">
          <h1 className="text-[1.8rem] font-bold tracking-[-0.02em]">
            Good Afternoon, Sam!
          </h1>
          <p className="pt-0.5 text-[0.98rem] font-medium text-[color:var(--ob-fg-soft)]">
            Wed, Jun 24 2026
          </p>
        </div>
        <span className="flex items-center gap-2 pt-2">
          <span className="grid h-8 w-8 place-items-center rounded-full text-[color:var(--ob-muted)]">
            ✉
          </span>
          <span className="grid h-8 w-8 place-items-center rounded-full bg-[color:var(--ob-surface-2)] text-[color:var(--ob-success)]">
            ◔
          </span>
        </span>
      </header>

      <section className="mt-5 grid gap-6 rounded-[var(--ob-radius)] bg-[color:var(--ob-surface-2)] p-6 sm:grid-cols-3">
        {SCORES.map((score) => (
          <div key={score.id} className="flex items-center gap-4">
            <Ring
              value={score.value}
              size={58}
              thickness={5}
              color={score.color}
              label={
                <span className="text-[1.05rem] font-bold tabular-nums">
                  {score.display}
                </span>
              }
            />
            <div>
              <p className="flex items-center gap-1.5 font-semibold">
                {score.label}
                <InfoDot />
              </p>
              <p className="text-[0.92rem] text-[color:var(--ob-fg-soft)]">{score.sub}</p>
            </div>
          </div>
        ))}
      </section>

      <h2 className="pb-3 pt-8 font-semibold">
        Weekly Pulse{" "}
        <span className="font-normal text-[color:var(--ob-muted)]">
          · Jun 21 to Jun 24 · Compared to previous week
        </span>
      </h2>
      <div className="grid gap-4 sm:grid-cols-3">
        {PULSE.map((item) => (
          <div
            key={item.id}
            className="rounded-[var(--ob-radius)] bg-[color:var(--ob-surface-2)] px-5 py-4"
          >
            <p className="flex items-center gap-1.5 text-[0.92rem] text-[color:var(--ob-fg-soft)]">
              <span className="flex-1">{item.label}</span>
              <InfoDot />
            </p>
            <p className="pt-1 text-[1.6rem] font-bold tabular-nums">{item.value}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-7 pt-8 lg:grid-cols-2">
        <div>
          <h2 className="pb-3 font-semibold">
            Up Next{" "}
            <span className="font-normal text-[color:var(--ob-muted)]">
              · 2 posts scheduled
            </span>
          </h2>
          <div className="grid gap-4">
            {QUEUE.map((post) => (
              <article
                key={post.id}
                className="rounded-[var(--ob-radius)] border border-[color:var(--ob-border)] p-4"
              >
                <div className="flex items-center gap-2.5">
                  <ChannelBadge />
                  <span className="text-[0.92rem] text-[color:var(--ob-muted)]">
                    {post.when}
                  </span>
                </div>
                <div className="flex items-end gap-4 pt-3">
                  <p className="flex-1 text-[0.98rem]">Post on {post.channel}</p>
                  <Placeholder width={66} height={66} radius={8} label="" />
                </div>
              </article>
            ))}
          </div>
        </div>

        <div>
          <h2 className="pb-3 font-semibold">
            Comments{" "}
            <span className="font-normal text-[color:var(--ob-muted)]">· 1 unanswered</span>
          </h2>
          <article className="rounded-[var(--ob-radius)] border border-[color:var(--ob-border)] p-4">
            <div className="flex items-center gap-2.5">
              <ChannelBadge />
              <span className="text-[0.92rem] font-medium">@user0</span>
            </div>
            <p className="pt-3 text-[0.98rem]">
              Whatever it is, I already know it&rsquo;a going to taste incredible.
              Can&rsquo;t wait 🧁
            </p>
          </article>
        </div>
      </div>

      <h2 className="pb-3 pt-8 font-semibold">Templates</h2>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {TEMPLATES.map((template) => (
          <article
            key={template.id}
            className="rounded-[var(--ob-radius)] border border-[color:var(--ob-border)] p-5"
          >
            <p aria-hidden className="text-[1.15rem]">
              {template.glyph}
            </p>
            <h3 className="pt-3 text-[1.05rem] font-semibold leading-snug">
              {template.title}
            </h3>
            <p className="pt-2 text-[0.92rem] leading-relaxed text-[color:var(--ob-fg-soft)]">
              {template.body}
            </p>
          </article>
        ))}
      </div>
    </div>
  );
}

function InfoDot() {
  return (
    <span
      aria-hidden
      className="grid h-[15px] w-[15px] shrink-0 place-items-center rounded-full border border-[color:var(--ob-border-strong)] text-[0.6rem] text-[color:var(--ob-muted)]"
    >
      i
    </span>
  );
}

function ChannelBadge() {
  return (
    <span className="relative inline-flex shrink-0">
      <AvatarSlot size={30} />
      <span className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-[4px] border-2 border-[color:var(--ob-surface)] bg-[color:var(--ob-surface-3)]" />
    </span>
  );
}

/**
 * The queue reads as a calendar week. Days with nothing scheduled say so
 * rather than rendering an empty slot that looks like a loading state.
 */
function Publish() {
  const days = [
    { day: "Mon 22", posts: [] as { time: string; channel: string }[] },
    { day: "Tue 23", posts: [] },
    { day: "Wed 24", posts: [{ time: "9:41 AM", channel: "hello.asmith" }] },
    { day: "Thu 25", posts: [] },
    { day: "Fri 26", posts: [{ time: "9:43 AM", channel: "hello.asmith" }] },
    { day: "Sat 27", posts: [] },
    { day: "Sun 28", posts: [] },
  ];

  return (
    <div className="mx-auto w-full max-w-[1330px]">
      <header className="flex items-center gap-3 pb-6">
        <h1 className="flex-1 text-[1.8rem] font-bold tracking-[-0.02em]">Publish</h1>
        <span className="rounded-full bg-[color:var(--ob-surface-2)] px-3.5 py-1.5 text-[0.88rem] font-medium">
          Week
        </span>
        <span className="rounded-full bg-[color:var(--ob-cta-bg)] px-4 py-1.5 text-[0.88rem] font-semibold text-[color:var(--ob-cta-fg)]">
          + New post
        </span>
      </header>

      <div className="grid gap-3 md:grid-cols-7">
        {days.map((entry) => (
          <section
            key={entry.day}
            className="min-h-[300px] rounded-[var(--ob-radius)] bg-[color:var(--ob-surface-2)] p-3"
          >
            <h2 className="pb-3 text-[0.85rem] font-semibold">{entry.day}</h2>
            {entry.posts.length === 0 ? (
              <p className="text-[0.82rem] text-[color:var(--ob-muted)]">Nothing queued</p>
            ) : (
              entry.posts.map((post) => (
                <article
                  key={post.time}
                  className="rounded-[var(--ob-radius-sm)] bg-[color:var(--ob-surface)] p-2.5"
                >
                  <p className="text-[0.78rem] text-[color:var(--ob-muted)]">{post.time}</p>
                  <div className="flex items-center gap-2 pt-1.5">
                    <AvatarSlot size={20} />
                    <span className="truncate text-[0.82rem]">{post.channel}</span>
                  </div>
                  <Placeholder height={54} radius={6} label="" className="mt-2" />
                </article>
              ))
            )}
          </section>
        ))}
      </div>
    </div>
  );
}

function Community() {
  const threads: { id: string; author: string; body: string; state: ReactNode }[] = [
    {
      id: "th1",
      author: "@user0",
      body: "Whatever it is, I already know it’a going to taste incredible. Can’t wait 🧁",
      state: (
        <span className="rounded-full bg-[color-mix(in_oklab,#e8a33d_20%,transparent)] px-2.5 py-0.5 text-[0.75rem] font-semibold text-[#8a5a08]">
          Unanswered
        </span>
      ),
    },
    {
      id: "th2",
      author: "@user1",
      body: "Do you ship outside the city? Would order a dozen for an office thing.",
      state: (
        <span className="rounded-full bg-[color-mix(in_oklab,#2f9e44_18%,transparent)] px-2.5 py-0.5 text-[0.75rem] font-semibold text-[color:var(--ob-success)]">
          Replied
        </span>
      ),
    },
  ];

  return (
    <div className="mx-auto w-full max-w-[900px]">
      <h1 className="pb-1 text-[1.8rem] font-bold tracking-[-0.02em]">Community</h1>
      <p className="pb-6 text-[0.98rem] text-[color:var(--ob-fg-soft)]">
        1 of 2 conversations still needs a reply.
      </p>

      <div className="grid gap-4">
        {threads.map((thread) => (
          <article
            key={thread.id}
            className="rounded-[var(--ob-radius)] border border-[color:var(--ob-border)] p-5"
          >
            <div className="flex items-center gap-2.5">
              <ChannelBadge />
              <span className="flex-1 font-medium">{thread.author}</span>
              {thread.state}
            </div>
            <p className="pt-3 text-[0.98rem]">{thread.body}</p>
            <div className="mt-4 rounded-[var(--ob-radius-sm)] bg-[color:var(--ob-surface-2)] px-4 py-3 text-[0.92rem] text-[color:var(--ob-muted)]">
              Reply as @hello.asmith…
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
