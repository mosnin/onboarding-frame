"use client";

import {
  ArticleIcon,
  BrowsersIcon,
  CaretDownIcon,
  CaretLeftIcon,
  CaretRightIcon,
  CaretUpIcon,
  ChatDotsIcon,
  CircleFillIcon,
  CloudIcon,
  EnvelopeIcon,
  GridFourIcon,
  MapPinIcon,
  MegaphoneIcon,
  PathIcon,
  PencilIcon,
  SearchIcon,
  SidebarSimpleIcon,
  SparkleIcon,
  UsersIcon,
} from "../../../ui/icons-solid";
import { Avatar, Thumb } from "../../../ui/avatar";
import { cn } from "../../../lib/cn";
import { Surface, audienceTokens } from "./tokens";
import { Main, NavItem, Shell, Sidebar } from "./chrome";
import type { TemplateProps } from "./props";

export type AudiencePage = "audience" | "dashboard" | "reports";

export interface AudienceAnalyticsProps extends TemplateProps {
  page?: AudiencePage;
}

const NAV = [
  { id: "campaigns", label: "Campaigns", Icon: MegaphoneIcon, caret: true },
  { id: "automations", label: "Automations", Icon: PathIcon, caret: true },
  { id: "sms", label: "SMS", Icon: ChatDotsIcon, badge: "New", caret: true },
  { id: "audiences", label: "Audience", Icon: UsersIcon, caret: true },
];

const ANALYTICS_CHILDREN = [
  { id: "dashboard", label: "Marketing dashboard" },
  { id: "audience", label: "Audience" },
  { id: "reports", label: "Reports" },
  { id: "custom", label: "Custom reports" },
];

const TAIL = [
  { id: "website", label: "Website", Icon: ArticleIcon, caret: true },
  { id: "content", label: "Content", Icon: CloudIcon, caret: true },
  {
    id: "integrations",
    label: "Integrations",
    Icon: GridFourIcon,
    caret: true,
  },
];

const DAYS = [
  "Jul 07",
  "Jul 08",
  "Jul 09",
  "Jul 10",
  "Jul 11",
  "Jul 12",
  "Jul 13",
  "Jul 14",
  "Jul 15",
  "Jul 16",
  "Jul 17",
  "Jul 18",
  "Jul 19",
  "Jul 20",
  "Jul 21",
  "Jul 22",
  "Jul 23",
  "Jul 24",
  "Jul 25",
  "Jul 26",
  "Jul 27",
  "Jul 28",
  "Jul 29",
  "Jul 30",
  "Jul 31",
  "Aug 01",
  "Aug 02",
  "Aug 03",
  "Aug 04",
  "Aug 05",
];

/** Two sign-ups all month. Every other day is a real zero, so every day is dotted. */
const GROWTH = [
  0, 0, 0, 0, 0, 1, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0,
];

/**
 * Audience analytics.
 *
 * Two details define this surface: a dot on *every* day of the series, which
 * marks each zero as a real reading rather than a gap, and a solid baseline
 * drawn at zero underneath. Together they let a month with two sign-ups be
 * shown at full scale without looking like a broken chart.
 */
export function AudienceAnalyticsTemplate({
  brandName = "Acme",
  userName = "Alex Rivera",
  className,
  page = "audience",
}: AudienceAnalyticsProps) {
  return (
    <Surface tokens={audienceTokens} className={className}>
      <Shell className="flex-col">
        {/* The brand appears as a band, not as a button colour. */}
        <span className="h-[4px] shrink-0 bg-[color:var(--ob-cta-bg)]" />

        <header className="flex h-[50px] shrink-0 items-center gap-[12px] border-b border-[color:var(--ob-border)] px-[17px]">
          <Avatar name={brandName} size={28} />
          <div className="mx-auto flex w-full max-w-[558px] items-center gap-[7px] rounded-full border border-[color:var(--ob-border-strong)] px-[14px] py-[9px] text-[0.741rem] text-[color:var(--ob-fg-soft)]">
            <SearchIcon size={13} /> Search
          </div>
          <span className="flex items-center gap-[9px]">
            <span className="flex items-center gap-[6px] rounded-full bg-[color-mix(in_oklab,#ffe01b_35%,white)] px-[12px] py-[7px] text-[0.706rem] font-medium">
              <CircleFillIcon
                size={7}
                className="text-[color:var(--ob-success)]"
              />
              Live expert help
            </span>
            <Avatar name={userName} size={28} />
          </span>
        </header>

        <div className="flex min-h-[0px] flex-1">
          <Sidebar width={263} bg="var(--ob-surface)" className="border-r-0">
            <div className="px-[14px] pb-[14px] pt-[14px]">
              <span className="flex items-center justify-center gap-[7px] rounded-full border border-[color:var(--ob-fg)] py-[10px] text-[0.776rem] font-medium">
                <PencilIcon size={13} /> Create
              </span>
            </div>

            <nav className="grid gap-[2px] px-[9px]">
              {NAV.map((item) => (
                <NavItem
                  key={item.id}
                  label={
                    item.badge ? (
                      <span className="flex items-center gap-[6px]">
                        {item.label}
                        <span className="rounded bg-[color-mix(in_oklab,#8b5cf6_16%,transparent)] px-[4px] py-[2px] text-[0.537rem] font-semibold text-[#6d3fd4]">
                          {item.badge}
                        </span>
                      </span>
                    ) : (
                      item.label
                    )
                  }
                  glyph={<item.Icon size={13} />}
                  trailing={<CaretDownIcon size={13} />}
                  className="text-[0.762rem]"
                />
              ))}

              <NavItem
                label="Analytics"
                glyph={<BrowsersIcon size={13} />}
                active
                trailing={<CaretUpIcon size={13} />}
                className="text-[0.762rem]"
              />
              {ANALYTICS_CHILDREN.map((item) => (
                <NavItem
                  key={item.id}
                  label={item.label}
                  indent
                  active={item.id === page}
                  className="text-[0.741rem]"
                />
              ))}

              {TAIL.map((item) => (
                <NavItem
                  key={item.id}
                  label={item.label}
                  glyph={<item.Icon size={13} />}
                  trailing={<CaretDownIcon size={13} />}
                  className="text-[0.762rem]"
                />
              ))}
            </nav>

            <SidebarSimpleIcon
              size={16}
              className="mt-auto mx-[17px] mb-[17px] text-[color:var(--ob-fg-soft)]"
            />
          </Sidebar>

          <Main className="overflow-auto bg-[color:var(--ob-surface-2)]">
            <header className="flex items-center gap-[12px] border-b border-[color:var(--ob-border)] bg-[color:var(--ob-surface)] px-[28px] py-[14px]">
              <h1
                className="flex-1 text-[1.412rem] font-bold tracking-[-0.01em]"
                style={{ fontFamily: "var(--ob-font-display)" }}
              >
                Audience analytics
              </h1>
              <span className="text-[0.741rem] font-medium text-[color:var(--ob-brand)]">
                Manage contacts
              </span>
            </header>

            {page === "dashboard" ? (
              <AudienceDashboard />
            ) : (
              <div className="grid gap-[17px] p-[22px]">
                <section className="rounded-[var(--ob-radius-lg)] border border-[color:var(--ob-border)] bg-[color:var(--ob-surface)] px-[22px] pb-[17px] pt-[14px]">
                  <div className="flex flex-wrap items-center justify-center gap-[20px] pb-[12px]">
                    {[
                      { label: "Subscribed", color: "#7a9a3e" },
                      { label: "Unsubscribed", color: "#c9d97a" },
                      { label: "Non-subscribed", color: "#9dc5e8" },
                    ].map((item) => (
                      <span
                        key={item.label}
                        className="flex items-center gap-[7px]"
                      >
                        <span
                          aria-hidden
                          className="h-[6px] w-[14px] rounded-full"
                          style={{ background: item.color }}
                        />
                        <span className="text-[0.706rem] text-[color:var(--ob-fg-soft)]">
                          {item.label}
                        </span>
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-center gap-[17px] border-b border-[color:var(--ob-border)] pb-[14px] text-[0.741rem]">
                    <span className="tabular-nums">0 - 16 of 30</span>
                    <span className="flex items-center gap-[4px] text-[color:var(--ob-fg-soft)]">
                      <CaretLeftIcon size={13} /> Previous
                    </span>
                    <span className="flex items-center gap-[4px] font-medium text-[color:var(--ob-brand)]">
                      Next <CaretRightIcon size={13} />
                    </span>
                  </div>

                  <p className="pt-[14px] text-[0.719rem] text-[color:var(--ob-fg-soft)]">
                    Note: This new way of viewing your subscriber data by
                    channel was launched April 1, 2024
                  </p>
                </section>

                <section className="rounded-[var(--ob-radius-lg)] border border-[color:var(--ob-border)] bg-[color:var(--ob-surface)] px-[22px] py-[20px]">
                  <h2
                    className="text-[1.412rem] font-bold tracking-[-0.01em]"
                    style={{ fontFamily: "var(--ob-font-display)" }}
                  >
                    What&apos;s changed
                  </h2>
                  <p className="pt-[3px] text-[0.741rem] text-[color:var(--ob-fg-soft)]">
                    Jul 7, 2024 - Aug 5, 2024
                  </p>

                  <div className="mt-[17px] flex flex-wrap items-center gap-[12px] border-t border-[color:var(--ob-border)] pt-[17px]">
                    {/* Dotted underline marks a term with a definition on hover. */}
                    <h3 className="flex-1 border-b-2 border-dotted border-[color:var(--ob-brand)] pb-[2px] text-[0.882rem] font-medium">
                      Total net subscriptions growth
                    </h3>
                    <span className="inline-flex rounded-[var(--ob-radius)] border border-[color:var(--ob-border-strong)] p-[3px]">
                      {["Day", "Week", "Month"].map((range, index) => (
                        <span
                          key={range}
                          className={cn(
                            "px-[17px] py-[6px] text-[0.741rem]",
                            index === 0
                              ? "rounded-[var(--ob-radius-sm)] bg-[color:var(--ob-surface)] font-medium shadow-[0_1px_3px_rgba(0,0,0,0.12)]"
                              : "border-l border-[color:var(--ob-border)] text-[color:var(--ob-fg-soft)]",
                          )}
                        >
                          {range}
                        </span>
                      ))}
                    </span>
                  </div>

                  <p className="flex items-center gap-[12px] pt-[14px]">
                    <span className="text-[1.199rem] font-bold tabular-nums">
                      4
                    </span>
                    <span
                      aria-hidden
                      className="grid size-[22px] place-items-center rounded-full bg-[color:var(--ob-surface-2)] text-[color:var(--ob-muted)]"
                    >
                      --
                    </span>
                    <span className="text-[0.741rem] text-[color:var(--ob-fg-soft)]">
                      compared to last year
                    </span>
                  </p>

                  <GrowthChart />
                </section>
              </div>
            )}
          </Main>

          {/* A feedback tab pinned to the window edge, rotated in place. */}
          <span className="hidden shrink-0 items-start pt-[112px] xl:flex">
            <span
              className="rounded-l-[var(--ob-radius-sm)] bg-[color:var(--ob-surface-2)] px-[6px] py-[14px] text-[0.649rem] text-[color:var(--ob-fg-soft)]"
              style={{ writingMode: "vertical-rl" }}
            >
              Feedback
            </span>
          </span>
        </div>
      </Shell>
    </Surface>
  );
}

function GrowthChart() {
  const width = 1280;
  const height = 360;
  const max = 4;
  const step = width / (GROWTH.length - 1);
  const y = (value: number) => height - (value / max) * height;
  const line = GROWTH.map(
    (value, i) => `${i === 0 ? "M" : "L"}${i * step},${y(value)}`,
  ).join(" ");

  return (
    <div className="flex gap-[9px] pt-[14px]">
      <div className="grid shrink-0 pr-[3px] text-right text-[0.671rem] tabular-nums text-[color:var(--ob-fg-soft)]">
        {[4, 3, 2, 1, 0].map((tick, index) => (
          <span
            key={tick}
            className={cn(
              "leading-none",
              index > 0 && "mt-[calc((360px/4)-0.8em)]",
            )}
          >
            {tick}
          </span>
        ))}
      </div>

      <div className="min-w-[0px] flex-1">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="h-[254px] w-full"
          preserveAspectRatio="none"
          role="img"
          aria-label="Net subscriptions per day"
        >
          {[0, 1, 2, 3, 4].map((index) => (
            <line
              key={index}
              x1={0}
              x2={width}
              y1={(height / 4) * index}
              y2={(height / 4) * index}
              stroke="var(--ob-border)"
              strokeWidth={1}
              vectorEffect="non-scaling-stroke"
            />
          ))}
          {/* Solid zero baseline under the series. */}
          <line
            x1={0}
            x2={width}
            y1={height}
            y2={height}
            stroke="var(--ob-fg)"
            strokeWidth={1.5}
            vectorEffect="non-scaling-stroke"
          />
          <path
            d={line}
            fill="none"
            stroke="var(--ob-success)"
            strokeWidth={2}
            vectorEffect="non-scaling-stroke"
          />
          {GROWTH.map((value, index) => (
            <circle
              key={index}
              cx={index * step}
              cy={y(value)}
              r={5}
              fill="var(--ob-success)"
              vectorEffect="non-scaling-stroke"
            />
          ))}
        </svg>

        <div className="flex pt-[9px]">
          {DAYS.map((day) => (
            <span
              key={day}
              className="flex-1 whitespace-nowrap text-[0.564rem] text-[color:var(--ob-fg-soft)]"
              style={{
                transform: "rotate(-45deg)",
                transformOrigin: "left top",
              }}
            >
              {day}
            </span>
          ))}
        </div>

        <p className="flex items-center justify-end gap-[7px] pt-[34px] text-[0.706rem]">
          <span
            aria-hidden
            className="h-[2px] w-[14px] bg-[color:var(--ob-success)]"
          />
          <span
            aria-hidden
            className="-ml-[12px] size-[7px] rounded-full bg-[color:var(--ob-success)]"
          />
          <span className="pl-[3px]">Main list</span>
        </p>
      </div>
    </div>
  );
}

const SOURCES = [
  {
    id: "import",
    pct: "33%",
    name: "Aug 1st Import",
    sub: "Copy/Pasted File",
    color: "#3b1f4e",
  },
  { id: "popup", pct: "33%", name: "Popup Form", color: "#9dc5e8" },
  { id: "embedded", pct: "34%", name: "Embedded Form", color: "#7a9a3e" },
];

/**
 * Audience dashboard.
 *
 * The demographics card is a paid feature the account does not have, so it is
 * shown as an upsell in place of the chart rather than hidden. Keeping the
 * locked card in the flow — with its own illustration and its own call to
 * action — is what the reference does, and removing it would quietly change
 * what the page is for.
 */
function AudienceDashboard() {
  return (
    <div className="grid gap-[17px] p-[22px]">
      <div className="grid gap-[17px] lg:grid-cols-2">
        <section className="rounded-[var(--ob-radius-lg)] border border-[color:var(--ob-border)] bg-[color:var(--ob-surface)]">
          {SOURCES.map((source, index) => (
            <div
              key={source.id}
              className={cn(
                "flex items-center gap-[14px] px-[20px] py-[17px]",
                index > 0 && "border-t border-[color:var(--ob-border)]",
              )}
            >
              <span
                aria-hidden
                className="size-[10px] shrink-0 rounded-full"
                style={{ background: source.color }}
              />
              <span className="w-[3.881rem] shrink-0 text-[1.412rem] font-bold tabular-nums leading-none">
                {source.pct}
              </span>
              <span className="min-w-[0px] flex-1">
                <span className="block text-[0.776rem] font-semibold">
                  {source.name}
                </span>
                {source.sub && (
                  <span className="block text-[0.706rem] text-[color:var(--ob-fg-soft)]">
                    {source.sub}
                  </span>
                )}
              </span>
              <CaretRightIcon
                size={12}
                className="text-[color:var(--ob-fg-soft)]"
              />
            </div>
          ))}
        </section>

        <section className="rounded-[var(--ob-radius-lg)] border border-[color:var(--ob-border)] bg-[color:var(--ob-surface)]" />
      </div>

      <section className="rounded-[var(--ob-radius-lg)] border border-[color:var(--ob-border)] bg-[color:var(--ob-surface)]">
        <div className="border-b border-[color:var(--ob-border)] px-[20px] py-[17px]">
          <h2 className="flex flex-wrap items-center gap-[9px]">
            <SparkleIcon size={15} className="text-[color:var(--ob-brand)]" />
            <span className="border-b-2 border-dotted border-[color:var(--ob-brand)] pb-[2px] text-[1.235rem] font-medium text-[color:var(--ob-brand)]">
              Predicted demographics
            </span>
            <span className="rounded-full bg-[color-mix(in_oklab,#7a9a3e_18%,transparent)] px-[9px] py-[3px] text-[0.671rem] font-medium text-[#4d661f]">
              Paid feature
            </span>
          </h2>
          <p className="pt-[6px] text-[0.762rem] text-[color:var(--ob-fg-soft)]">
            Your contacts broken down by their predicted gender and age.
          </p>
        </div>

        <div className="grid justify-items-center px-[20px] py-[39px] text-center">
          <span className="block size-[134px]">
            <Thumb seed="audience-empty" radius={9} alt="Illustration" />
          </span>
          <h3
            className="pt-[17px] text-[1.412rem] font-bold tracking-[-0.01em]"
            style={{ fontFamily: "var(--ob-font-display)" }}
          >
            Know your people even better
          </h3>
          <p className="pt-[9px] text-[0.811rem] text-[color:var(--ob-fg-soft)]">
            Send targeted campaigns based on your contacts&rsquo; demographics.
          </p>
          <span className="mt-[17px] rounded-[var(--ob-radius-sm)] bg-[color:var(--ob-brand)] px-[17px] py-[9px] text-[0.741rem] font-semibold text-white">
            Upgrade Now
          </span>
        </div>
      </section>

      <h2
        className="pt-[6px] text-[1.412rem] font-bold tracking-[-0.01em]"
        style={{ fontFamily: "var(--ob-font-display)" }}
      >
        Engagement
      </h2>

      <div className="grid gap-[17px] lg:grid-cols-2">
        {[
          {
            id: "email",
            Icon: EnvelopeIcon,
            title: "Email marketing engagement",
            body: "See how your contacts have been interacting with your email campaigns over time.",
          },
          {
            id: "locations",
            Icon: MapPinIcon,
            title: "Top locations",
            body: "Based on your contacts\u2019 IP addresses, here is where most of them are.",
          },
        ].map((card) => (
          <section
            key={card.id}
            className="rounded-[var(--ob-radius-lg)] border border-[color:var(--ob-border)] bg-[color:var(--ob-surface)] px-[20px] py-[17px]"
          >
            <h3 className="flex items-center gap-[9px]">
              <card.Icon size={13} />
              <span className="border-b-2 border-dotted border-[color:var(--ob-brand)] pb-[2px] text-[1.059rem] font-medium text-[color:var(--ob-brand)]">
                {card.title}
              </span>
            </h3>
            <p className="pt-[9px] text-[0.762rem] text-[color:var(--ob-fg-soft)]">
              {card.body}
            </p>
          </section>
        ))}
      </div>
    </div>
  );
}
