"use client";

import type { ReactNode } from "react";
import {
  BankSolid,
  BrowsersIcon,
  CaretDownIcon,
  CaretRightIcon,
  CaretUpIcon,
  ChatDotsIcon,
  ClockIcon,
  FlagIcon,
  GearIcon,
  GridFourIcon,
  HouseIcon,
  ListChecksIcon,
  MegaphoneIcon,
  PencilIcon,
  ReceiptIcon,
  SearchIcon,
  SparkleIcon,
  TagIcon,
  TargetIcon,
  QuestionIcon,
} from "../../../ui/icons-solid";
import { Avatar, Thumb } from "../../../ui/avatar";
import { BrandMark } from "../../../ui/brand";
import { cn } from "../../../lib/cn";
import { Surface, listingTokens } from "./tokens";
import { Main, NavItem, Shell, Sidebar } from "./chrome";
import type { TemplateProps } from "./props";

export type ListingPage = "traffic" | "insights";

export interface ListingStatsProps extends TemplateProps {
  page?: ListingPage;
}

const NAV = [
  { id: "search", label: "Search", Icon: SearchIcon },
  { id: "dashboard", label: "Dashboard", Icon: HouseIcon },
  { id: "listings", label: "Listings", Icon: TagIcon },
  { id: "messages", label: "Messages", Icon: ChatDotsIcon },
  { id: "orders", label: "Orders", Icon: ReceiptIcon },
  { id: "visibility", label: "Shop search visibility", Icon: TargetIcon },
];

const STATS_CHILDREN = [
  { id: "traffic", label: "Shop traffic" },
  { id: "insights", label: "Marketplace insights" },
];

const MARKETING_CHILDREN = [
  { id: "ads", label: "Ads" },
  { id: "discounts", label: "Sales and discounts" },
  { id: "social", label: "Social media" },
  { id: "share", label: "Share & Save" },
];

/**
 * Three metrics over one week, each with a single burst of activity. The curve
 * is drawn as a smooth hump because that is what one busy day looks like when
 * a weekly series is interpolated — and each metric gets its own colour so the
 * three cells do not read as one chart cut into pieces.
 */
const CURVE = [0, 0, 0, 0.1, 0.6, 1, 0.55, 0.08, 0];

const SUGGESTIONS = [
  "Add more photos so buyers can see every detail. Highlight its shape, size, and texture with different angles and close ups.",
  "The more tags you have, the more likely buyers are to find your items. Add more tags.",
];

/**
 * Marketplace listing stats.
 *
 * The metric labels are small caps and *underlined* rather than coloured, and
 * the controls are full pills — a combination specific enough that flattening
 * it into a generic card style would lose the product entirely. The year-over
 * -year figures read "--% YoY" because the listing has no prior year, which is
 * the honest state for a new listing and not a loading placeholder.
 */
export function ListingStatsTemplate({ className, page = "traffic" }: ListingStatsProps) {
  return (
    <Surface tokens={listingTokens} className={className}>
      <Shell>
        <Sidebar width={256} bg="var(--ob-surface)">
          <div className="flex items-center gap-[9px] px-[18px] pb-[12px] pt-[15px]">
            <h2 className="flex-1 text-[1.016rem] font-bold">Shop Manager</h2>
            <ListChecksIcon size={14} />
          </div>

          <nav className="grid gap-[2px] px-[9px]">
            {NAV.map((item) => (
              <NavItem
                key={item.id}
                label={item.label}
                glyph={<item.Icon size={14} />}
                className="rounded-[var(--ob-radius-sm)] text-[0.79rem]"
              />
            ))}
          </nav>

          <div className="px-[9px] pt-[3px]">
            <NavItem
              label="Stats"
              glyph={<BrowsersIcon size={14} />}
              active
              trailing={
                <CaretUpIcon size={14} />
              }
              className="rounded-[var(--ob-radius-sm)] text-[0.79rem]"
            />
          </div>
          <nav className="grid gap-[2px] px-[9px]">
            {STATS_CHILDREN.map((item) => (
              <NavItem
                key={item.id}
                label={item.label}
                indent
                active={item.id === page}
                className="rounded-[var(--ob-radius-sm)] text-[0.79rem]"
              />
            ))}
          </nav>

          <nav className="grid gap-[2px] px-[9px] pt-[3px]">
            <NavItem
              label="Customer service stats"
              glyph={<SparkleIcon size={14} />}
              className="rounded-[var(--ob-radius-sm)] text-[0.79rem]"
            />
            <NavItem
              label="Policy violations"
              glyph={<FlagIcon size={14} />}
              className="rounded-[var(--ob-radius-sm)] text-[0.79rem]"
            />
            <NavItem
              label="Marketing"
              glyph={<MegaphoneIcon size={14} />}
              trailing={
                <CaretUpIcon size={14} />
              }
              className="rounded-[var(--ob-radius-sm)] text-[0.79rem]"
            />
            {MARKETING_CHILDREN.map((item) => (
              <NavItem
                key={item.id}
                label={item.label}
                indent
                className="rounded-[var(--ob-radius-sm)] text-[0.79rem]"
              />
            ))}
            {[
              { id: "finances", label: "Finances", Icon: BankSolid, caret: true },
              { id: "apps", label: "Apps", Icon: GridFourIcon },
              { id: "help", label: "Help", Icon: QuestionIcon, caret: true },
              { id: "settings", label: "Settings", Icon: GearIcon, caret: true },
            ].map((item) => (
              <NavItem
                key={item.id}
                label={item.label}
                glyph={<item.Icon size={14} />}
                trailing={
                  item.caret ? (
                    <CaretDownIcon size={14} />
                  ) : undefined
                }
                className="rounded-[var(--ob-radius-sm)] text-[0.79rem]"
              />
            ))}
          </nav>

          <p className="px-[18px] pb-[6px] pt-[18px] text-[0.692rem] text-[color:var(--ob-muted)]">
            Sales channels
          </p>
          <div className="flex items-center gap-[9px] px-[18px]">
            <BrandMark brand="HomemadeGoodsByAlex" size={20} label="HomemadeGoodsByAlex" />
            <span className="min-w-[0px] flex-1 text-[0.752rem] leading-snug">
              HomemadeGoodsByAlex
            </span>
            <PencilIcon size={14} />
          </div>

          <div className="mt-auto flex items-center gap-[9px] border-t border-[color:var(--ob-border)] px-[18px] py-[12px]">
            <Avatar name="Alex" size={24} />
            <span className="flex-1 text-[0.79rem]">Alex</span>
            <CaretUpIcon size={14} />
          </div>
        </Sidebar>

        <Main className="overflow-auto px-[30px] py-[21px]">
          <p className="flex items-center gap-[6px] text-[0.752rem]">
            <span className="underline">Stats</span>
            <CaretRightIcon size={14} />
            <span className="text-[color:var(--ob-fg-soft)]">Listing stats</span>
          </p>

          <h1 className="pt-[9px] text-[1.43rem] font-bold">Listing stats</h1>

          <span className="mt-[15px] inline-flex items-center gap-[6px] rounded-full border border-[color:var(--ob-fg)] px-[15px] py-[9px] text-[0.79rem]">
            <span className="font-bold">Date Range</span>
            Last 7 Days: Mar 01 - Mar 07
            <span aria-hidden className="text-[0.527rem]">
              ▾
            </span>
          </span>

          <section className="mt-[21px] rounded-[var(--ob-radius-lg)] border border-[color:var(--ob-border)] p-[18px]">
            <div className="flex gap-[21px]">
              <span className="block h-[137px] w-[172px] shrink-0">
                <Thumb seed="listing-hero" radius={6} alt="Listing photo" />
              </span>
              <div className="min-w-[0px] flex-1">
                <div className="flex items-start gap-[15px]">
                  <h2 className="flex-1 text-[1.129rem] font-bold leading-snug">
                    Natural Thyme, Red Pepper, Pul Biber Spice Blend | Cooking Seasoning
                  </h2>
                  <span className="shrink-0 rounded-full border border-[color:var(--ob-fg)] px-[15px] py-[8px] text-[0.752rem] font-medium">
                    View item
                  </span>
                </div>

                <div className="grid gap-[6px] pt-[18px] sm:grid-cols-2">
                  <p className="text-[0.79rem]">
                    <span className="text-[color:var(--ob-fg-soft)]">Price:</span> $7.99 -
                    $10.99
                  </p>
                  <p className="text-[0.79rem]">
                    <span className="text-[color:var(--ob-fg-soft)]">Status:</span> Inactive
                  </p>
                  <p className="text-[0.79rem]">
                    <span className="text-[color:var(--ob-fg-soft)]">Current stock:</span>{" "}
                    100
                  </p>
                </div>

                <div className="mt-[18px] rounded-[var(--ob-radius)] border border-[color:var(--ob-border)] p-[15px]">
                  <div className="flex items-start gap-[12px]">
                    <h3 className="flex-1 font-bold">Improvement Suggestions</h3>
                    <span className="shrink-0 text-[0.752rem] underline">Edit listing</span>
                  </div>
                  <ul className="list-disc pl-[15px] pt-[9px]">
                    {SUGGESTIONS.map((suggestion) => (
                      <li key={suggestion} className="pt-[3px] text-[0.767rem] leading-relaxed">
                        {suggestion}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <section className="mt-[15px] grid rounded-[var(--ob-radius-lg)] border border-[color:var(--ob-border)] sm:grid-cols-3">
            <MetricCell
              label="Visits"
              value="5"
              axis="6"
              legend="5 visits"
              color="#e8734a"
            />
            <MetricCell
              label="Items sold"
              value="1"
              axis="2"
              legend="1 item sold"
              color="#4aa8d8"
            />
            <MetricCell
              label="Revenue"
              value="SGD 0.70"
              axis="SGD 2"
              legend="SGD 0.70"
              color="#7fc9b8"
            />
          </section>

          <section className="mt-[21px] grid gap-[24px] lg:grid-cols-[minmax(0,0.6fr)_minmax(0,1fr)]">
            <div>
              <h2 className="text-[1.016rem] font-bold">Explore your data</h2>
              <p className="max-w-[40ch] pt-[6px] text-[0.767rem] leading-relaxed text-[color:var(--ob-fg-soft)]">
                How many visits result in an order? Look for trends and relationships
                between your numbers.
              </p>
            </div>

            <div className="rounded-[var(--ob-radius-lg)] border border-[color:var(--ob-border)] p-[15px]">
              <div className="flex flex-wrap items-center gap-[12px]">
                <Picker label="Total views" value="5" color="#e8734a" />
                <Picker label="Orders" value="1" color="#4aa8d8" />
                <span className="ml-auto flex items-center gap-[5px] text-[0.715rem] text-[color:var(--ob-muted)]">
                  <ClockIcon size={14} /> Updated Just now
                </span>
              </div>
            </div>
          </section>
        </Main>
      </Shell>
    </Surface>
  );
}

function MetricCell({
  label,
  value,
  axis,
  legend,
  color,
}: {
  label: string;
  value: string;
  axis: string;
  legend: string;
  color: string;
}) {
  const width = 400;
  const height = 120;
  const step = width / (CURVE.length - 1);
  const area =
    CURVE.map((v, i) => `${i === 0 ? "M" : "L"}${i * step},${height - v * height}`).join(
      " ",
    ) + ` L${width},${height} L0,${height} Z`;

  return (
    <div className="border-l border-[color:var(--ob-border)] px-[18px] py-[15px] first:border-l-0">
      <div className="flex items-center gap-[6px]">
        <span className="text-[0.662rem] font-bold uppercase tracking-wide underline">
          {label}
        </span>
        <span className="text-[0.662rem] text-[color:var(--ob-muted)] underline">
          --% YoY
        </span>
        <span className="ml-auto flex items-center gap-[5px] text-[0.692rem] text-[color:var(--ob-muted)]">
          <ClockIcon size={14} /> Just now
        </span>
      </div>

      <p className="pt-[6px] text-[1.655rem] font-bold leading-none tabular-nums">{value}</p>

      <div className="pt-[15px]">
        <p className="text-[0.692rem] text-[color:var(--ob-muted)]">{axis}</p>
        <div className="border-t border-[color:var(--ob-border)]">
          <svg
            viewBox={`0 0 ${width} ${height}`}
            className="h-[90px] w-full"
            preserveAspectRatio="none"
            role="img"
            aria-label={`${label} over the last seven days`}
          >
            <path d={area} fill={color} />
          </svg>
        </div>
        <p className="flex pt-[6px] text-[0.692rem] text-[color:var(--ob-muted)]">
          <span className="flex-1">01 Mar</span>
          <span>07 Mar</span>
        </p>
      </div>

      <p className="flex items-center gap-[8px] pt-[12px] text-[0.752rem]">
        <span aria-hidden className="size-[9px] rounded-full" style={{ background: color }} />
        <span className="flex-1">Marketplace</span>
        <span>{legend}</span>
      </p>
    </div>
  );
}

function Picker({
  label,
  value,
  color,
}: {
  label: string;
  value: string;
  color: string;
}): ReactNode {
  return (
    <span className="inline-flex min-w-[128px] items-center gap-[18px] rounded-[var(--ob-radius-lg)] border border-[color:var(--ob-fg)] px-[15px] py-[9px]">
      <span>
        <span
          className="block text-[0.617rem] font-bold uppercase tracking-wide"
          style={{ color }}
        >
          {label}
        </span>
        <span className="block pt-[2px] text-[1.204rem] font-bold leading-none tabular-nums">
          {value}
        </span>
      </span>
      <CaretDownIcon size={14} />
    </span>
  );
}
