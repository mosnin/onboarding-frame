"use client";

import {
  ArrowsUpDownIcon,
  BellIcon,
  BrowsersIcon,
  CardIcon,
  CaretDownIcon,
  CaretLeftIcon,
  GearIcon,
  GlobeIcon,
  HeartbeatIcon,
  InfoIcon,
  PathIcon,
  PauseIcon,
  PhoneIcon,
  QuestionIcon,
  SunIcon,
  TreeStructureIcon,
  UserIcon,
  WarningIcon,
} from "../../../ui/icons-solid";
import { Avatar } from "../../../ui/avatar";
import { BrandMark } from "../../../ui/brand";
import { Wordmark } from "../../../ui/wordmark";
import { cn } from "../../../lib/cn";
import { Surface, uptimeTokens } from "./tokens";
import { Main, NavItem, Shell, Sidebar } from "./chrome";
import type { TemplateProps } from "./props";

export type UptimePage = "monitor" | "incidents" | "heartbeats";

export interface UptimeMonitorProps extends TemplateProps {
  page?: UptimePage;
}

const NAV = [
  { id: "monitors", label: "Monitors", Icon: GlobeIcon },
  { id: "heartbeats", label: "Heartbeats", Icon: HeartbeatIcon },
  { id: "oncall", label: "Who's on-call?", Icon: PhoneIcon },
  { id: "incidents", label: "Incidents", Icon: WarningIcon, badge: "2" },
  { id: "team", label: "Team members", Icon: UserIcon },
  { id: "status", label: "Status pages", Icon: BrowsersIcon },
  { id: "escalation", label: "Escalation policies", Icon: TreeStructureIcon },
  { id: "integrations", label: "Integrations", Icon: PathIcon },
];

const TAIL = [
  { id: "billing", label: "Billing", Icon: CardIcon },
  { id: "help", label: "Help & Support", Icon: QuestionIcon },
  { id: "theme", label: "Light mode", Icon: SunIcon },
];

const TIMES = [
  "03:05pm", "03:10pm", "03:15pm", "03:20pm", "03:25pm",
  "03:30pm", "03:35pm", "03:40pm", "03:45pm", "03:50pm",
];

/**
 * Cold-start response times: every region begins in the seconds and collapses
 * to a steady baseline within two ticks. That opening cliff is the shape of a
 * monitor's first day, and smoothing it away would hide the one thing a new
 * user is looking for.
 */
const REGIONS = [
  {
    id: "europe",
    label: "Europe",
    color: "#41d1c4",
    points: [3600, 300, 120, 100, 95, 90, 110, 95, 88, 92, 90, 140, 120, 95, 100, 130, 180, 260, 320],
  },
  {
    id: "north-america",
    label: "North America",
    color: "#7b7bf0",
    points: [2700, 420, 380, 360, 350, 345, 340, 338, 335, 340, 342, 345, 348, 400, 420, 430, 420, 410, 400],
  },
  {
    id: "asia",
    label: "Asia",
    color: "#e8a33d",
    points: [3900, 1400, 700, 600, 1700, 300, 1650, 620, 560, 540, 900, 520, 480, 470, 900, 480, 1050, 520, 800],
  },
  {
    id: "australia",
    label: "Australia",
    color: "#5dd88f",
    points: [4050, 900, 430, 420, 415, 410, 405, 400, 402, 405, 408, 410, 412, 415, 418, 420, 425, 430, 700],
  },
];

/**
 * Uptime monitor detail.
 *
 * The status is carried by a large dot in a soft halo rather than a chip — at
 * this size "up" is readable before any text is. The action row is plain
 * glyph-and-label rather than buttons, which keeps four destructive-ish
 * actions from dominating a page whose job is to say "everything is fine".
 */
export function UptimeMonitorTemplate({
  brandName = "Acme",
  className,
  page = "monitor",
}: UptimeMonitorProps) {
  return (
    <Surface tokens={uptimeTokens} className={className}>
      <Shell>
        <Sidebar width={232} bg="#171a21">
          <div className="flex items-center gap-[7px] px-[17px] pb-[20px] pt-[17px]">
            <Wordmark name={brandName} size={14} mark={22} radius={4} />
            <CaretDownIcon size={11} />
          </div>

          <nav className="grid gap-[1px] px-[10px]">
            {NAV.map((item) => (
              <NavItem
                key={item.id}
                label={item.label}
                glyph={<item.Icon size={11} />}
                badge={item.badge}
                active={item.id === "monitors" && page === "monitor"}
                className="text-[0.874rem]"
              />
            ))}
          </nav>

          <nav className="mt-auto grid gap-[1px] px-[10px] pb-[13px]">
            {TAIL.map((item) => (
              <NavItem
                key={item.id}
                label={item.label}
                glyph={<item.Icon size={11} />}
                className="text-[0.874rem]"
              />
            ))}
          </nav>

          <div className="mx-[10px] mb-[13px] flex items-center gap-[10px] rounded-[var(--ob-radius)] border border-[color:var(--ob-border-strong)] px-[10px] py-[8px]">
            <BrandMark brand="Team" size={27} label="Team" />
            <span className="flex-1 leading-tight">
              <span className="block text-[0.749rem] text-[color:var(--ob-muted)]">
                Team
              </span>
              <span className="block text-[0.832rem] font-semibold">JDAcme</span>
            </span>
            <ArrowsUpDownIcon size={11} />
          </div>
        </Sidebar>

        <Main className="overflow-auto">
          <header className="flex h-[63px] shrink-0 items-center gap-[13px] px-[27px]">
            <span className="relative ml-auto">
              <BellIcon size={14} />
              <span className="absolute -right-[1px] -top-[1px] size-[7px] rounded-full bg-[#e8a33d]" />
            </span>
            <span className="flex items-center gap-[8px]">
              <Avatar name="Jane Smith" size={28} />
              <span className="text-[0.874rem] font-medium">Jane Smith</span>
              <CaretDownIcon size={11} />
            </span>
          </header>

          <div className="px-[33px] pb-[33px] lg:px-[118px]">
            <p className="flex items-center gap-[7px] text-[0.874rem] text-[color:var(--ob-muted)]">
              <CaretLeftIcon size={11} /> Monitors
            </p>

            <div className="flex items-center gap-[17px] pt-[17px]">
              {/* Status as a haloed dot: legible before the word "Up" is read. */}
              <span className="grid size-[47px] shrink-0 place-items-center rounded-full bg-[color-mix(in_oklab,#41d18c_16%,transparent)]">
                <span className="size-[17px] rounded-full bg-[color:var(--ob-success)]" />
              </span>
              <div>
                <h1 className="text-[1.664rem] font-bold tracking-[-0.01em]">
                  acmecorp.example.app
                </h1>
                <p className="pt-[3px] text-[0.899rem]">
                  <span className="text-[color:var(--ob-success)]">Up</span>
                  <span className="text-[color:var(--ob-muted)]">
                    {" "}
                    · Checked every 3 minutes
                  </span>
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-[27px] pt-[23px]">
              {[
                { id: "alert", Icon: WarningIcon, label: "Send test alert" },
                { id: "incidents", Icon: InfoIcon, label: "Incidents" },
                { id: "pause", Icon: PauseIcon, label: "Pause this monitor" },
                { id: "configure", Icon: GearIcon, label: "Configure" },
              ].map((action) => (
                <span
                  key={action.id}
                  className="flex items-center gap-[8px] text-[0.899rem] font-medium"
                >
                  <action.Icon size={11} />
                  {action.label}
                </span>
              ))}
            </div>

            <div className="grid gap-[17px] pt-[23px] lg:grid-cols-3">
              {[
                { id: "up", label: "Currently up for", value: "49 mins 40 seconds" },
                { id: "checked", label: "Last checked at", value: "14 seconds ago" },
                { id: "incidents", label: "Incidents", value: "0" },
              ].map((stat) => (
                <section
                  key={stat.id}
                  className="rounded-[var(--ob-radius)] border border-[color:var(--ob-border)] bg-[color:var(--ob-surface)] px-[20px] py-[17px]"
                >
                  <p className="text-[0.899rem] text-[color:var(--ob-muted)]">
                    {stat.label}
                  </p>
                  <p className="pt-[7px] text-[1.249rem] font-bold">{stat.value}</p>
                </section>
              ))}
            </div>

            <section className="mt-[17px] rounded-[var(--ob-radius)] border border-[color:var(--ob-border)] bg-[color:var(--ob-surface)] p-[23px]">
              <div className="flex flex-wrap items-center gap-[13px]">
                <h2 className="flex-1 text-[0.999rem] font-bold">
                  Response times across regions in the last day
                </h2>
                <span className="inline-flex rounded-[var(--ob-radius-sm)] bg-[color:var(--ob-surface-2)] p-[3px]">
                  {["Day", "Week", "Month"].map((range, index) => (
                    <span
                      key={range}
                      className={cn(
                        "rounded-[var(--ob-radius-sm)] px-[17px] py-[4px] text-[0.849rem]",
                        index === 0
                          ? "bg-[color:var(--ob-surface-3)] font-medium"
                          : "text-[color:var(--ob-fg-soft)]",
                      )}
                    >
                      {range}
                    </span>
                  ))}
                </span>
              </div>

              <RegionChart />

              <div className="flex flex-wrap items-center gap-[27px] pt-[17px]">
                {REGIONS.map((region) => (
                  <span key={region.id} className="flex items-center gap-[8px]">
                    <span
                      aria-hidden
                      className="h-[1px] w-[17px] rounded-full"
                      style={{ background: region.color }}
                    />
                    <span className="text-[0.849rem]">{region.label}</span>
                  </span>
                ))}
              </div>
            </section>
          </div>
        </Main>
      </Shell>
    </Surface>
  );
}

function RegionChart() {
  const width = 1280;
  const height = 400;
  const max = 5000;
  const count = REGIONS[0]!.points.length;
  const step = width / (count - 1);
  const y = (value: number) => height - (value / max) * height;

  return (
    <div className="flex gap-[10px] pt-[20px]">
      <span className="flex items-center">
        <span
          className="whitespace-nowrap text-[0.749rem] text-[color:var(--ob-muted)]"
          style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
        >
          milliseconds
        </span>
      </span>

      <div className="grid shrink-0 pr-[7px] text-right text-[0.749rem] tabular-nums text-[color:var(--ob-muted)]">
        {["5k", "4k", "3k", "2k", "1k", "0"].map((tick, index) => (
          <span
            key={tick}
            className={cn("leading-none", index > 0 && "mt-[calc((400px/5)-0.8em)]")}
          >
            {tick}
          </span>
        ))}
      </div>

      <div className="min-w-[0px] flex-1">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="h-[333px] w-full"
          preserveAspectRatio="none"
          role="img"
          aria-label="Response times per region over the last day"
        >
          {[0, 1, 2, 3, 4, 5].map((index) => (
            <line
              key={index}
              x1={0}
              x2={width}
              y1={(height / 5) * index}
              y2={(height / 5) * index}
              stroke="var(--ob-border)"
              strokeWidth={1}
              vectorEffect="non-scaling-stroke"
            />
          ))}
          {REGIONS.map((region) => (
            <path
              key={region.id}
              d={region.points
                .map((value, i) => `${i === 0 ? "M" : "L"}${i * step},${y(value)}`)
                .join(" ")}
              fill="none"
              stroke={region.color}
              strokeWidth={2}
              vectorEffect="non-scaling-stroke"
            />
          ))}
        </svg>

        <div className="flex pt-[10px]">
          {TIMES.map((time) => (
            <span
              key={time}
              className="flex-1 text-center text-[0.749rem] text-[color:var(--ob-muted)]"
            >
              {time}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
