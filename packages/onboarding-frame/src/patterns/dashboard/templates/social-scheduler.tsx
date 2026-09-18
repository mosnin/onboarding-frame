"use client";

import type { ReactNode } from "react";
import { Ring } from "../../../ui/charts";
import { cn } from "../../../lib/cn";
import { Surface, schedulerTokens } from "./tokens";
import { Main, Shell, Sidebar } from "./chrome";
import type { TemplateProps } from "./props";
import { Avatar, Thumb } from "../../../ui/avatar";
import { BrandMark } from "../../../ui/brand";
import { Plus, TrendUpIcon } from "../../../ui/icons";
import {
  CalendarIcon,
  ChartBarIcon,
  ChatDotsIcon,
  ChatsIcon,
  ExternalSquareIcon,
  HouseIcon,
  IdCardIcon,
  LeafIcon,
  LightbulbIcon,
  QuestionIcon,
  SidebarBold,
  StackMark,
} from "../../../ui/icons-solid";

export type SchedulerPage = "home" | "publish" | "community";

export interface SocialSchedulerProps extends TemplateProps {
  page?: SchedulerPage;
}

const NAV = [
  { id: "home", label: "Home", Icon: HouseIcon },
  { id: "create", label: "Create", Icon: LightbulbIcon },
  { id: "publish", label: "Publish", Icon: CalendarIcon, badge: "3" },
  // The reference tints only this one; the Publish count is plain grey.
  {
    id: "community",
    label: "Community",
    Icon: ChatsIcon,
    badge: "1",
    badgeTone: true,
  },
  { id: "start", label: "Start Page", Icon: IdCardIcon, external: true },
  { id: "analytics", label: "Analytics", Icon: ChartBarIcon, external: true },
];

const CHANNELS = [
  {
    id: "c1",
    handle: "hello.asmith",
    count: "0",
    live: false,
    brand: "threads",
  },
  {
    id: "c2",
    handle: "hello.asmith",
    count: "3",
    live: true,
    brand: "instagram",
  },
  { id: "c3", handle: "as cupcake", count: "0", live: false, brand: "threads" },
];

/** Simple Icons carries all of these but LinkedIn, which falls back to a tile. */
const CONNECT = [
  { label: "LinkedIn", brand: "linkedin" },
  { label: "Bluesky", brand: "bluesky" },
  { label: "Facebook", brand: "facebook" },
];

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
    sub: "100% from last week",
    trend: true,
  },
];

const PULSE = [
  { id: "posts", label: "Posts", value: "1" },
  { id: "followers", label: "Followers", value: "1" },
  { id: "comments", label: "Comments", value: "0" },
];

const QUEUE = [
  {
    id: "q1",
    when: "Jun 26, 9:43 AM",
    channel: "hello.asmith",
    brand: "instagram",
  },
  {
    id: "q2",
    when: "Jun 30, 9:45 AM",
    channel: "hello.asmith",
    brand: "instagram",
  },
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
    Icon: ChatDotsIcon,
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
      {/*
        The reference is not a white app with a white rail: the page is a warm
        #f7f6f2 the rail sits directly on, and the content is a white panel
        inset within it — 9px from the top, 12 from the right. Measured at a
        1512 render: rail 240, panel 242..1500.
      */}
      <Shell>
        <Sidebar width={240} bg="transparent" className="border-r-0">
          <div className="flex h-[46px] shrink-0 items-center gap-1.5 px-[17px]">
            <StackMark size={19} className="text-[color:var(--ob-fg)]" />
            <span className="text-[1.05rem] font-bold tracking-[-0.02em]">
              Buffer
            </span>
            <span className="ml-auto flex items-center gap-1 text-[0.8rem] text-[color:var(--ob-muted)]">
              <LeafIcon size={17} />
              <span className="grid size-[15px] place-items-center rounded-full bg-[#e6ddfa] text-[0.62rem] font-semibold text-[#5b3ecc]">
                1
              </span>
            </span>
          </div>

          <div className="px-[17px] pb-[13px] pt-[19px]">
            <button
              type="button"
              className="flex h-[39px] w-full items-center justify-center gap-1.5 rounded-full bg-[color:var(--ob-cta-bg)] text-[0.95rem] font-semibold text-[color:var(--ob-cta-fg)]"
            >
              <Plus size={16} strokeWidth={2.4} /> New
            </button>
          </div>

          {/* Pills are 32 tall on a 36 pitch, inset 17 from each rail edge. */}
          <nav className="grid gap-1 px-[17px]">
            {NAV.map((item) => (
              <button
                key={item.id}
                type="button"
                aria-current={item.id === page ? "page" : undefined}
                className={cn(
                  "flex h-8 items-center gap-2.5 rounded-lg px-2.5 text-left text-[0.9rem]",
                  item.id === page
                    ? "bg-[#ecebe5] text-[color:var(--ob-fg)]"
                    : "text-[color:var(--ob-fg-soft)]",
                )}
              >
                <item.Icon size={17} className="shrink-0" />
                <span className="flex-1 truncate">{item.label}</span>
                {item.badge &&
                  (item.badgeTone ? (
                    <span className="grid h-[18px] min-w-[18px] place-items-center rounded-full bg-[#cdeec0] px-1 text-[0.72rem] font-semibold text-[#2c5c1c]">
                      {item.badge}
                    </span>
                  ) : (
                    <span className="text-[0.8rem] tabular-nums text-[color:var(--ob-muted)]">
                      {item.badge}
                    </span>
                  ))}
                {item.external && (
                  <ExternalSquareIcon
                    size={14}
                    className="text-[color:var(--ob-muted)]"
                  />
                )}
              </button>
            ))}
          </nav>

          <RailHeading>Channels</RailHeading>
          <nav className="grid gap-1 px-[17px]">
            {CHANNELS.map((channel) => (
              <button
                key={channel.id}
                type="button"
                className="flex h-9 items-center gap-2.5 rounded-lg px-2.5 text-left text-[0.9rem] text-[color:var(--ob-fg-soft)]"
              >
                <span className="relative flex shrink-0 items-center">
                  {channel.live && (
                    <span className="absolute -left-[7px] size-[5px] rounded-full bg-[#2f9e44]" />
                  )}
                  <Avatar
                    name={channel.handle}
                    size={26}
                    rounded={7}
                    badge={<BrandMark brand={channel.brand} size={11} />}
                  />
                </span>
                <span className="flex-1 truncate">{channel.handle}</span>
                <span className="text-[0.8rem] tabular-nums text-[color:var(--ob-muted)]">
                  {channel.count}
                </span>
              </button>
            ))}
          </nav>

          <RailHeading>Connect channels</RailHeading>
          <nav className="grid gap-1 px-[17px]">
            {CONNECT.map((item) => (
              <button
                key={item.label}
                type="button"
                className="flex h-8 items-center gap-2.5 rounded-lg px-2.5 text-left text-[0.9rem] text-[color:var(--ob-fg-soft)]"
              >
                <BrandMark brand={item.brand} label={item.label} size={19} />
                <span className="flex-1 truncate">{item.label}</span>
              </button>
            ))}
            <button
              type="button"
              className="flex h-8 items-center gap-2.5 rounded-lg px-2.5 text-left text-[0.9rem] text-[color:var(--ob-fg-soft)]"
            >
              <Plus size={17} strokeWidth={1.8} className="shrink-0" />
              <span className="flex-1">More channels</span>
            </button>
          </nav>

          <div className="mt-auto flex items-center gap-2.5 px-[17px] py-4">
            <Avatar name="AS Mobbin" size={28} rounded={8} />
            <span className="min-w-0 flex-1">
              <span className="block truncate text-[0.86rem] font-semibold">
                AS Mobbin
              </span>
              <span className="block text-[0.78rem] text-[color:var(--ob-muted)]">
                Team Plan
              </span>
            </span>
            <SidebarBold size={17} className="text-[color:var(--ob-muted)]" />
          </div>
        </Sidebar>

        <Main className="my-[9px] mr-3 overflow-auto rounded-2xl border border-[color:var(--ob-border)] bg-[color:var(--ob-surface)] relative px-8 pb-8 pt-[21px]">
          {page === "home" && <Home />}
          {page === "publish" && <Publish />}
          {page === "community" && <Community />}

          <button
            type="button"
            aria-label="Help"
            className="absolute bottom-4 right-4 grid size-[22px] place-items-center rounded-full border border-[#9dbcf5] text-[#3b74e0]"
          >
            <QuestionIcon size={14} />
          </button>
        </Main>
      </Shell>
    </Surface>
  );
}

/** Rail group label — sentence case and small, as the reference sets it. */
function RailHeading({ children }: { children: ReactNode }) {
  return (
    <p className="px-[27px] pb-1.5 pt-[18px] text-[0.8rem] text-[color:var(--ob-muted)]">
      {children}
    </p>
  );
}

function Home() {
  return (
    <div className="w-full">
      <header className="flex items-start gap-3.5">
        <span
          aria-hidden
          className="grid size-11 shrink-0 place-items-center rounded-xl bg-[color:var(--ob-surface-2)] text-[1.35rem] leading-none"
        >
          👋
        </span>
        <div className="flex-1">
          <h1 className="text-[1.5rem] font-semibold leading-tight tracking-[-0.02em]">
            Good Afternoon, Sam!
          </h1>
          <p className="pt-0.5 text-[0.88rem] text-[color:var(--ob-fg-soft)]">
            Wed, Jun 24 2026
          </p>
        </div>
        <span className="flex items-center gap-2">
          <span className="grid size-7 place-items-center rounded-full text-[color:var(--ob-muted)]">
            <ChatsIcon size={18} />
          </span>
          <span className="grid size-7 place-items-center rounded-full bg-[#dff3d6] text-[color:var(--ob-success)]">
            <LeafIcon size={16} />
          </span>
        </span>
      </header>

      <section className="mt-[30px] grid gap-6 rounded-xl bg-[color:var(--ob-surface-2)] px-[13px] py-[10px] sm:grid-cols-3">
        {SCORES.map((score) => (
          <div key={score.id} className="flex items-center gap-4">
            <Ring
              value={score.value}
              size={52}
              thickness={4}
              color={score.color}
              label={
                <span className="text-[0.95rem] font-semibold tabular-nums">
                  {score.display}
                </span>
              }
            />
            <div>
              <p className="flex items-center gap-1.5 text-[0.9rem] font-semibold">
                {score.label}
                <InfoDot />
              </p>
              <p className="flex items-center gap-1 text-[0.86rem] text-[color:var(--ob-fg-soft)]">
                {"trend" in score && score.trend && (
                  <TrendUpIcon
                    width={14}
                    height={14}
                    className="text-[color:var(--ob-success)]"
                  />
                )}
                {score.sub}
              </p>
            </div>
          </div>
        ))}
      </section>

      <h2 className="pb-[10px] pt-[30px] text-[0.88rem] font-semibold">
        Weekly Pulse{" "}
        <span className="font-normal text-[color:var(--ob-muted)]">
          · Jun 21 to Jun 24 · Compared to previous week
        </span>
      </h2>
      <div className="grid gap-[25px] sm:grid-cols-3">
        {PULSE.map((item) => (
          <div
            key={item.id}
            className="rounded-xl border border-[color:var(--ob-border)] px-4 pb-3 pt-2.5"
          >
            <p className="flex items-center gap-1.5 text-[0.82rem] text-[color:var(--ob-muted)]">
              <span className="flex-1">{item.label}</span>
              <InfoDot />
            </p>
            <p className="pt-1.5 text-[1.3rem] font-semibold tabular-nums">
              {item.value}
            </p>
          </div>
        ))}
      </div>

      <div className="grid gap-[25px] pt-[45px] lg:grid-cols-2">
        <div>
          <h2 className="pb-[15px] text-[0.88rem] font-semibold">
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
                  <ChannelBadge name={post.channel} brand={post.brand} />
                  <span className="text-[0.88rem] text-[color:var(--ob-muted)]">
                    {post.when}
                  </span>
                </div>
                <div className="flex items-end gap-4 pt-3">
                  <p className="flex-1 text-[0.92rem]">
                    Post on {post.channel}
                  </p>
                  <span className="block size-[62px] shrink-0">
                    <Thumb
                      seed={post.id}
                      radius={8}
                      alt="Scheduled post image"
                    />
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div>
          <h2 className="pb-[15px] text-[0.88rem] font-semibold">
            Comments{" "}
            <span className="font-normal text-[color:var(--ob-muted)]">
              · 1 unanswered
            </span>
          </h2>
          <article className="rounded-[var(--ob-radius)] border border-[color:var(--ob-border)] p-4">
            <div className="flex items-center gap-2.5">
              <ChannelBadge />
              <span className="text-[0.92rem] font-medium">@user0</span>
            </div>
            <p className="pt-3 text-[0.98rem]">
              Whatever it is, I already know it&rsquo;a going to taste
              incredible. Can&rsquo;t wait 🧁
            </p>
          </article>
        </div>
      </div>

      <h2 className="pb-[15px] pt-[38px] text-[0.88rem] font-semibold">
        Templates
      </h2>
      <div className="grid gap-[25px] sm:grid-cols-2 xl:grid-cols-4">
        {TEMPLATES.map((template) => (
          <article
            key={template.id}
            className="rounded-xl border border-[color:var(--ob-border)] px-4 pb-4 pt-3.5"
          >
            <p aria-hidden className="text-[1.05rem]">
              {template.glyph}
            </p>
            <h3 className="pt-2.5 text-[0.92rem] font-semibold leading-snug">
              {template.title}
            </h3>
            <p className="pt-2 text-[0.82rem] leading-relaxed text-[color:var(--ob-muted)]">
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

function ChannelBadge({
  name = "hello.asmith",
  brand = "instagram",
}: {
  name?: string;
  brand?: string;
}) {
  return (
    <Avatar
      name={name}
      size={28}
      rounded={8}
      badge={<BrandMark brand={brand} size={11} />}
    />
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
        <h1 className="flex-1 text-[1.8rem] font-bold tracking-[-0.02em]">
          Publish
        </h1>
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
              <p className="text-[0.82rem] text-[color:var(--ob-muted)]">
                Nothing queued
              </p>
            ) : (
              entry.posts.map((post) => (
                <article
                  key={post.time}
                  className="rounded-[var(--ob-radius-sm)] bg-[color:var(--ob-surface)] p-2.5"
                >
                  <p className="text-[0.78rem] text-[color:var(--ob-muted)]">
                    {post.time}
                  </p>
                  <div className="flex items-center gap-2 pt-1.5">
                    <Avatar name={post.channel} size={20} rounded={6} />
                    <span className="truncate text-[0.82rem]">
                      {post.channel}
                    </span>
                  </div>
                  <span className="mt-2 block h-[54px]">
                    <Thumb
                      seed={post.time}
                      radius={6}
                      alt="Queued post image"
                    />
                  </span>
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
  const threads: {
    id: string;
    author: string;
    body: string;
    state: ReactNode;
  }[] = [
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
      <h1 className="pb-1 text-[1.8rem] font-bold tracking-[-0.02em]">
        Community
      </h1>
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
