"use client";

import { BrandMark } from "../../../ui/brand";
import { Avatar, Thumb } from "../../../ui/avatar";
import { cn } from "../../../lib/cn";
import { Surface, guidesTokens } from "./tokens";
import { LineChart } from "../../../ui/charts";
import { Btn, Card, Chip, Main, SearchField, Shell, Sidebar, Table, TopBar } from "./chrome";
import type { TemplateProps } from "./props";
import {
  ArrowUpIcon,
  BellIcon,
  Check,
  ChevronDown,
  ChevronUp,
  ClipboardIcon,
  Cross,
  ExpandIcon,
  Icon,
  MonitorIcon,
  Plus,
  SettingsIcon,
  Sparkle,
  TrendUpIcon,
  UserPlusIcon,
  type IconName,
} from "../../../ui/icons";

const NAV = [
  { id: "started", label: "Get started", icon: "circle", pill: true },
  { id: "home", label: "Home", icon: "home" },
  { id: "composer", label: "Composer", icon: "sparkle" },
  { id: "gap1", gap: true },
  { id: "campaigns", label: "Campaigns", icon: "send" },
  { id: "flows", label: "Flows", icon: "branch" },
  { id: "gap2", gap: true },
  { id: "website", label: "Website", icon: "monitor", caret: true },
  { id: "social", label: "Social", icon: "share", caret: true },
  { id: "service", label: "Service", icon: "mail", caret: true },
  { id: "audience", label: "Audience", icon: "users", caret: true },
  { id: "content", label: "Content", icon: "image", caret: true },
  { id: "analytics", label: "Analytics", icon: "pieChart", caret: true },
];

const IDEAS = [
  { id: "flows", label: "Discover missing flows", icon: "branch" },
  { id: "campaign", label: "Generate a campaign", icon: "send" },
  { id: "segments", label: "Audit my segments", icon: "users" },
];

/**
 * Guides with an assistant panel.
 *
 * A personalised setup guide down the middle, with a docked assistant on the
 * right that suggests next actions. The guide rows carry their own state —
 * done, in progress, needs review — so progress is legible at a glance.
 */
export type GuidesPage = "started" | "dashboards";

export interface GuidesAssistantProps extends TemplateProps {
  page?: GuidesPage;
}

export function GuidesAssistantTemplate({
  brandName = "Beacon",
  userName = "Sam",
  className,
  page = "started",
}: GuidesAssistantProps) {
  return (
    <Surface tokens={guidesTokens}>
      <Shell className={cn(className)}>
        {/* Measured off the reference: 229px. */}
        <Sidebar width={229} bg="var(--ob-surface)">
          <div className="p-4">
            <Avatar name={brandName} size={26} rounded={6} />
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
                    "flex items-center gap-[11px] rounded-[8px] px-[11px] py-[7px] text-left text-[0.78rem]",
                    item.pill
                      ? "bg-[color:var(--ob-surface-3)] font-semibold"
                      : "text-[color:var(--ob-fg-soft)] hover:bg-[color:var(--ob-surface-2)]",
                  )}
                >
                  <Icon name={item.icon as IconName} width={17} height={17} className="shrink-0 opacity-70" />
                  <span className="flex-1">{item.label}</span>
                  {item.caret && <ChevronDown width={14} height={14} className="opacity-40" />}
                </button>
              ),
            )}
          </nav>

          {[
            { title: "Advanced", items: [{ id: "ma", label: "Marketing analytics", icon: "lightbulb" }] },
            {
              title: `Grow with ${brandName}`,
              items: [
                { id: "sms", label: "Text setup guide", icon: "chat" },
                { id: "wa", label: "Chat setup guide", icon: "phone" },
                { id: "growth", label: "Growth strategies", icon: "trendUp" },
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
                    <Icon name={item.icon as IconName} width={17} height={17} className="shrink-0 opacity-70" />
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
            <ChevronDown width={15} height={15} className="opacity-40" />
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
              <button type="button" aria-label="Notifications" className="opacity-70">
                <BellIcon width={20} height={20} />
              </button>
              <Btn tone="neutral" size="sm">Account plan</Btn>
              <Btn tone="ghost" size="sm">Support</Btn>
              <button type="button" aria-label="Assistant" className="text-[color:var(--ob-brand)]">
                <Sparkle width={18} height={18} />
              </button>
            </div>
          </TopBar>

          {page === "dashboards" ? (
            <ReportingPage />
          ) : (
          <div className="flex flex-1 gap-3 p-4">
            {/*
              Measured: rail 229, guide column 849, assistant 398. The column
              has to be allowed to shrink (min-w-0) or the fixed panel gets
              pushed past the frame edge and clipped.
            */}
            {/* Guide column */}
            <div className="min-w-0 flex-1 rounded-[14px] border border-[color:var(--ob-border)] bg-[color:var(--ob-surface)] p-8">
              <div className="grid justify-items-center gap-3 text-center">
                <span className="flex items-center gap-2 rounded-full border border-[color:var(--ob-border)] px-3.5 py-1.5 text-[0.86rem] font-medium">
                  <span aria-hidden className="size-4 rounded-full border-2 border-[color:var(--ob-border-strong)]" />
                  0 / 4 guides completed
                </span>
                <h1 className="text-[2rem] font-extrabold tracking-tight">
                  Let&apos;s get started, {userName}!
                </h1>
                <p className="max-w-[600px] text-pretty text-[color:var(--ob-muted)]">
                  Based on what we know about your business, we&apos;ve created a
                  personalised setup guide to help you start seeing value.
                </p>
              </div>

              <Card className="mt-8 grid gap-6 p-6 lg:grid-cols-[300px_1fr]">
                <div>
                  <h2 className="flex items-center gap-2 font-bold">
                    <SettingsIcon width={18} height={18} /> Account setup
                  </h2>
                  <p className="mt-1.5 text-[0.92rem] text-[color:var(--ob-muted)]">
                    Get set up to start sending and grow your marketing.
                  </p>
                  <Chip tone="info" className="mt-3">2 / 3 completed</Chip>
                </div>

                <div className="grid gap-3">
                  {[
                    { id: "tools", label: "Business tools", done: true, logos: ["shopify"] },
                    { id: "channels", label: "Marketing channels", done: true, channels: true },
                    { id: "branding", label: "Confirm branding", done: false, swatches: true },
                  ].map((row) => (
                    <div
                      key={row.id}
                      // The trailing marks and the button cannot shrink, so on a
                      // narrow screen the row wraps them onto a second line
                      // rather than pushing them past the card.
                      className="flex flex-wrap items-center gap-3 rounded-[10px] border border-[color:var(--ob-border)] p-4"
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
                        {row.done ? <Check width={13} height={13} /> : null}
                      </span>
                      <span className="min-w-0 flex-1 truncate font-bold">{row.label}</span>
                      {row.logos && (
                        <span className="flex shrink-0 gap-1.5">
                          {row.logos.map((slug) => (
                            <BrandMark key={slug} brand={slug} size={26} />
                          ))}
                        </span>
                      )}
                      {row.channels && (
                        <span className="flex shrink-0 gap-1.5">
                          {(["mail", "chat", "share"] as IconName[]).map((name) => (
                            <span
                              key={name}
                              className="grid size-[26px] place-items-center rounded-full border border-[color:var(--ob-border)] text-[color:var(--ob-fg-soft)]"
                            >
                              <Icon name={name} width={13} height={13} />
                            </span>
                          ))}
                        </span>
                      )}
                      {row.swatches && (
                        <span className="flex shrink-0 gap-1.5">
                          <span aria-hidden className="h-6 w-7 rounded bg-[#6366f1]" />
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

              <Card className="mt-5 grid grid-cols-[minmax(0,1fr)] gap-6 p-6 lg:grid-cols-[300px_minmax(0,1fr)]">
                <div>
                  <h2 className="flex items-center gap-2 font-bold">
                    <UserPlusIcon width={18} height={18} /> Grow your audience
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
                          <ChevronUp width={15} height={15} className="opacity-40" />
                          <span className="block h-8 w-10 shrink-0">
                            <Thumb seed="signup-form" radius={4} alt="Sign-up form" />
                          </span>
                          <span className="whitespace-nowrap font-medium">Sign-up form</span>
                        </span>,
                        <Chip key="t">
                          <MonitorIcon width={12} height={12} /> Popup
                        </Chip>,
                        <Chip key="s" tone="brand">
                          <Sparkle width={12} height={12} /> Suggested
                        </Chip>,
                        <span key="n" className="tabular-nums">0</span>,
                      ],
                    ]}
                  />
                  <div className="mt-4 grid min-w-0 gap-5 rounded-[10px] bg-[color:var(--ob-surface-2)] p-5 sm:grid-cols-[minmax(0,1fr)_200px]">
                    <div>
                      <h3 className="font-bold">Sign-up form</h3>
                      <p className="mt-1.5 text-[0.92rem] leading-relaxed text-[color:var(--ob-muted)]">
                        A multi-step sign-up form that collects email and text
                        messaging consent, and confirms subscription to your mailing
                        list.
                      </p>
                    </div>
                    <span className="block aspect-[3/4] w-full">
                      <Thumb seed="form-preview" radius={8} alt="Form preview" />
                    </span>
                  </div>
                </div>
              </Card>
            </div>

            {/* Assistant panel */}
            <aside className="hidden w-[398px] shrink-0 flex-col rounded-[14px] border border-[color:var(--ob-border)] bg-[color:var(--ob-surface)] xl:flex">
              <div className="flex items-center gap-2 border-b border-[color:var(--ob-border)] p-4">
                <Sparkle width={17} height={17} className="text-[color:var(--ob-brand)]" />
                <span className="font-semibold">New chat</span>
                <ChevronDown width={15} height={15} className="opacity-40" />
                <Chip tone="info" className="ml-1">Beta</Chip>
                <div className="ml-auto flex items-center gap-2 text-[color:var(--ob-muted)]">
                  <button type="button" aria-label="Expand">
                    <ExpandIcon width={16} height={16} />
                  </button>
                  <button type="button" aria-label="Close">
                    <Cross width={16} height={16} />
                  </button>
                </div>
              </div>

              <div className="grid content-start gap-5 p-6 text-center">
                <Sparkle
                  width={34}
                  height={34}
                  className="mx-auto text-[color:var(--ob-brand)]"
                />
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
                      <Icon name={idea.icon as IconName} width={17} height={17} className="shrink-0 text-[#5b4bd6]" />
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
                    <button type="button" aria-label="Attach">
                      <Plus width={18} height={18} />
                    </button>
                    <button type="button" aria-label="Templates">
                      <ClipboardIcon width={18} height={18} />
                    </button>
                    <button
                      type="button"
                      aria-label="Send"
                      className="ml-auto grid size-7 place-items-center rounded-full bg-[color:var(--ob-surface-3)]"
                    >
                      <ArrowUpIcon width={15} height={15} />
                    </button>
                  </div>
                </div>
              </div>
            </aside>
          </div>
          )}
        </Main>
      </Shell>
    </Surface>
  );
}

/**
 * The "Overview dashboard" report.
 *
 * Widget cards carry a drag handle at the top centre and an overflow menu at
 * the top right, because the page is a rearrangeable dashboard rather than a
 * fixed report. The rate rows are graded against benchmarks (Poor/Excellent)
 * instead of only stating a number — a 0.00% open rate on 13 recipients is the
 * kind of figure that needs the label to be readable.
 */
function ReportingPage() {
  const rates = [
    { id: "open", label: "Open rate", grade: "Poor", value: "0.00%", delta: "0.00%", color: "#2563eb", bad: true },
    { id: "click", label: "Click rate", grade: "Excellent", value: "8.33%", delta: ">999%", color: "#43c59e", bad: false },
    { id: "order", label: "Placed Order rate", grade: "Poor", value: "0.00%", delta: "0.00%", color: "#e8c33d", bad: true },
  ];

  const messages = [
    {
      id: "m1",
      name: "AI Generated: Is Your Portfolio Ready for a Makeover?",
      sub: "AI Generated: Is Your Portfolio Ready for a Makeover?",
      sent: "Jul 23, 2026",
      time: "9:45 AM",
      recipients: 8,
      delivered: 7,
      opens: 0,
      openPct: "0.00%",
      clicks: 1,
      clickPct: "14.29%",
    },
    {
      id: "m2",
      name: "Email Campaign",
      sub: "Email Campaign",
      sent: "Jul 16, 2026",
      time: "12:00 AM",
      recipients: 5,
      delivered: 5,
      opens: 0,
      openPct: "0.00%",
      clicks: 0,
      clickPct: "0.00%",
    },
  ];

  return (
    <div className="flex-1 p-5">
      <p className="pb-4 text-[0.95rem] text-[color:var(--ob-fg-soft)]">
        Dashboards <span className="px-1 text-[color:var(--ob-muted)]">/</span>{" "}
        <span className="font-medium">Overview dashboard</span>
      </p>

      <Widget title="Campaign message performance">
        <div className="grid gap-8 pt-4 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
          <div>
            <span className="inline-flex items-center gap-8 rounded-[8px] border border-[color:var(--ob-border-strong)] bg-[color:var(--ob-surface)] px-3.5 py-2 text-[0.92rem]">
              All campaign messages
              <ChevronDown width={13} height={13} className="opacity-60" />
            </span>

            <p className="pt-6 text-[1.9rem] font-bold tabular-nums leading-none">13</p>
            <p className="pt-2 font-semibold">Total campaign recipients</p>
            <p className="flex items-center gap-2 pt-2">
              <Chip tone="success">
                <TrendUpIcon width={12} height={12} /> &gt;999%
              </Chip>
              <span className="text-[0.92rem] text-[color:var(--ob-muted)]">
                vs. previous period
              </span>
            </p>

            <ul className="grid gap-5 pt-7">
              {rates.map((rate) => (
                <li key={rate.id} className="flex items-center gap-4">
                  <span
                    aria-hidden
                    className="size-3 shrink-0 rounded-full"
                    style={{ background: rate.color }}
                  />
                  <span className="w-40 shrink-0 font-semibold">{rate.label}</span>
                  <Chip tone={rate.bad ? "danger" : "success"}>{rate.grade}</Chip>
                  <span className="w-20 text-right tabular-nums">{rate.value}</span>
                  <span
                    className={cn(
                      "w-24 text-right font-bold tabular-nums",
                      rate.bad
                        ? "text-[color:var(--ob-danger)]"
                        : "text-[#1f8f6f]",
                    )}
                  >
                    {rate.delta}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* One campaign landed in the window, so the line is flat then spikes. */}
          <LineChart
            height={215}
            gridLines={3}
            yLabels={["15.0%", "10.0%", "5.0%", "0.0%"]}
            xLabels={[
              "Jun 24",
              "Jun 28",
              "Jul 02",
              "Jul 06",
              "Jul 10",
              "Jul 14",
              "Jul 18",
              "Jul 22",
            ]}
            series={[
              {
                id: "click",
                points: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 14.3, 0],
                color: "#43c59e",
              },
            ]}
          />
        </div>
      </Widget>

      <div className="pt-5">
        <Widget title="Campaign message performance detail">
          <div className="overflow-x-auto pt-4">
            <table className="w-full min-w-[820px] border-collapse text-[0.92rem]">
              <thead>
                <tr className="text-[color:var(--ob-muted)]">
                  {["Name", "Sent date", "Recipients", "Delivered", "Unique Opens", "Unique Clicks"].map(
                    (head, index) => (
                      <th
                        key={head}
                        className={cn(
                          "border-b border-[color:var(--ob-border)] px-3 py-2.5 font-normal",
                          index === 0 ? "text-left" : "text-right",
                        )}
                      >
                        {head}
                      </th>
                    ),
                  )}
                </tr>
              </thead>
              <tbody>
                {messages.map((row) => (
                  <tr key={row.id}>
                    <td className="border-b border-[color:var(--ob-border)] px-3 py-3.5">
                      <span className="block w-full max-w-[26rem] font-medium text-[color:var(--ob-brand)]">
                        {row.name}
                      </span>
                      <span className="block text-[0.86rem] text-[color:var(--ob-muted)]">
                        {row.sub}
                      </span>
                    </td>
                    <td className="border-b border-[color:var(--ob-border)] px-3 py-3.5 text-right">
                      <span className="block tabular-nums">{row.sent}</span>
                      <span className="block text-[0.86rem] tabular-nums text-[color:var(--ob-muted)]">
                        {row.time}
                      </span>
                    </td>
                    <td className="border-b border-[color:var(--ob-border)] px-3 py-3.5 text-right tabular-nums">
                      {row.recipients}
                    </td>
                    <td className="border-b border-[color:var(--ob-border)] px-3 py-3.5 text-right tabular-nums">
                      {row.delivered}
                    </td>
                    <td className="border-b border-[color:var(--ob-border)] px-3 py-3.5 text-right">
                      <span className="block tabular-nums">{row.opens}</span>
                      <span className="block text-[0.86rem] tabular-nums text-[color:var(--ob-muted)]">
                        {row.openPct}
                      </span>
                    </td>
                    <td className="border-b border-[color:var(--ob-border)] px-3 py-3.5 text-right">
                      <span className="block tabular-nums">{row.clicks}</span>
                      <span className="block text-[0.86rem] tabular-nums text-[color:var(--ob-muted)]">
                        {row.clickPct}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Widget>
      </div>
    </div>
  );
}

function Widget({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="relative rounded-[14px] border border-[color:var(--ob-border)] bg-[color:var(--ob-surface)] p-6">
      <span
        aria-hidden
        className="absolute left-1/2 top-2 -translate-x-1/2 text-[0.7rem] tracking-[0.2em] text-[color:var(--ob-muted)]"
      >
        ⠿
      </span>
      <span aria-hidden className="absolute right-5 top-5 text-[color:var(--ob-muted)]">
        ⋮
      </span>
      <h2 className="text-[1.2rem] font-bold">{title}</h2>
      {children}
    </section>
  );
}
