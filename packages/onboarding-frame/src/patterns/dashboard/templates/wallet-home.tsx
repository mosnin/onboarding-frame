"use client";

import type { ReactNode } from "react";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  ArrowsLeftRightIcon,
  CardIcon,
  CaretLeftIcon,
  ChartPieIcon,
  CrownIcon,
  DownloadIcon,
  GearIcon,
  GlobeIcon,
  HouseIcon,
  PlusIcon,
  SearchIcon,
  ShieldStarIcon,
} from "../../../ui/icons-solid";
import { Avatar, Thumb } from "../../../ui/avatar";
import { cn } from "../../../lib/cn";
import { Surface, walletTokens } from "./tokens";
import { Main, Shell, Sidebar } from "./chrome";
import type { TemplateProps } from "./props";

export type WalletPage = "trending" | "explore" | "create";

export interface WalletHomeProps extends TemplateProps {
  page?: WalletPage;
}

const NAV = [
  { id: "home", label: "Home", Icon: HouseIcon },
  { id: "assets", label: "Assets", Icon: ChartPieIcon },
  { id: "apps", label: "Apps", Icon: GlobeIcon },
];

const ACTIONS = [
  { id: "buy", label: "Buy", Icon: PlusIcon },
  { id: "swap", label: "Swap", Icon: ArrowsLeftRightIcon },
  { id: "send", label: "Send", Icon: ArrowUpIcon },
  { id: "receive", label: "Receive", Icon: ArrowDownIcon },
];

const TRENDING = ["Mint pass", "Onchain quiz", "Season pass", "Creator drop"];

/**
 * Consumer wallet home.
 *
 * The identity strip carries a gradient border — not a fill — which is the
 * detail that makes it read as a credential rather than another card. The rank
 * is shown as "# ---" because this account has not placed yet; substituting a
 * plausible number would misrepresent a brand-new wallet.
 */
export function WalletHomeTemplate({
  brandName = "Wallet",
  className,
  page = "trending",
}: WalletHomeProps) {
  return (
    <Surface tokens={walletTokens} className={className}>
      <Shell>
        <Sidebar width={239} bg="var(--ob-bg)" className="relative border-r-0">
          <div className="px-[19px] pb-[30px] pt-[21px]">
            <Avatar name={brandName} size={40} />
          </div>

          <nav className="grid gap-[6px] px-[15px]">
            {NAV.map((item, index) => (
              <span
                key={item.id}
                className={cn(
                  "flex items-center gap-[15px] rounded-full px-[19px] py-[15px] text-[1.085rem] font-semibold",
                  index === 0
                    ? "bg-[color-mix(in_oklab,#1652f0_28%,#0a0b0d)] text-[color:var(--ob-brand)]"
                    : "text-[color:var(--ob-fg-soft)]",
                )}
              >
                <item.Icon size={18} />
                {item.label}
              </span>
            ))}
          </nav>

          <div className="mx-[15px] my-[19px] border-t border-[color:var(--ob-border)]" />

          <nav className="grid gap-[6px] px-[15px]">
            {ACTIONS.map((action) => (
              <span
                key={action.id}
                className="flex items-center gap-[15px] rounded-full px-[11px] py-[9px] text-[1.085rem] font-semibold"
              >
                <action.Icon size={13} />
                {action.label}
              </span>
            ))}
          </nav>

          <CaretLeftIcon size={13} />
        </Sidebar>

        <Main className="overflow-auto">
          <header className="flex h-[98px] shrink-0 items-center gap-[15px] border-b border-[color:var(--ob-border)] px-[30px]">
            <div className="ml-auto flex w-full max-w-[679px] items-center gap-[11px] rounded-full bg-[color:var(--ob-surface-2)] px-[23px] py-[13px] text-[0.991rem] text-[color:var(--ob-muted)]">
              <SearchIcon size={13} /> Search coins, NFTs, apps…
            </div>
            {[CardIcon, GearIcon].map((Icon, index) => (
              <span
                key={index}
                className="grid size-[42px] shrink-0 place-items-center rounded-full bg-[color:var(--ob-surface-2)]"
              >
                <Icon size={17} />
              </span>
            ))}
          </header>

          <nav className="flex gap-[34px] border-b border-[color:var(--ob-border)] px-[30px]">
            {[
              { id: "trending", label: "Trending" },
              { id: "explore", label: "Explore" },
              { id: "create", label: "Create" },
            ].map((tab) => (
              <span
                key={tab.id}
                className={cn(
                  "py-[19px] text-[1.085rem] font-semibold",
                  tab.id === page
                    ? "border-b-2 border-[color:var(--ob-brand)] text-[color:var(--ob-brand)]"
                    : "text-[color:var(--ob-fg-soft)]",
                )}
              >
                {tab.label}
              </span>
            ))}
          </nav>

          <div className="px-[30px] py-[23px]">
            <section className="grid overflow-hidden rounded-[var(--ob-radius-lg)] lg:grid-cols-2">
              <div className="bg-[color:var(--ob-surface)] px-[38px] py-[34px]">
                {/* Gradient outline, not a fill — it has to sit on the card. */}
                <span
                  className="inline-flex rounded-full p-px"
                  style={{
                    background:
                      "linear-gradient(90deg,#1652f0,#22d3ee,#4ade80)",
                  }}
                >
                  <span className="rounded-full bg-[color:var(--ob-surface)] px-[19px] py-[8px] text-[0.83rem] font-bold uppercase tracking-wide">
                    Fresh drop
                  </span>
                </span>

                <div className="flex items-center gap-[11px] pt-[26px]">
                  <span className="block size-[42px] shrink-0">
                    <Thumb seed="creator-badge" radius={8} alt="Creator" />
                  </span>
                  <span className="text-[0.943rem] font-bold uppercase tracking-wide">
                    Creator
                  </span>
                </div>

                <h1 className="pt-[19px] text-[2.925rem] font-bold leading-[1.05] tracking-[-0.03em]">
                  Alzenaverse
                  <br />
                  Halloween
                </h1>

                <p className="max-w-[48ch] pt-[19px] text-[1.057rem] leading-relaxed text-[color:var(--ob-fg-soft)]">
                  Alzenaverse Halloween is a limited-edition release of magical
                  potions and portraits by the creator.
                </p>

                <span
                  className="mt-[30px] block rounded-full px-[23px] py-[15px] text-center text-[1.057rem] font-bold text-white"
                  style={{
                    background: "linear-gradient(90deg,#1652f0,#35c8e8)",
                  }}
                >
                  Mint +1000 points
                </span>
              </div>

              <div className="relative bg-black">
                <Thumb seed="featured-drop" radius={0} alt="Drop artwork" />
                <span
                  aria-hidden
                  className="absolute right-[23px] top-[23px] grid size-[42px] place-items-center rounded-full bg-[color-mix(in_oklab,#f7f8f8_16%,transparent)] text-[0.943rem]"
                >
                  <DownloadIcon size={16} />
                </span>
              </div>
            </section>

            {/* Gradient border again, this time around the whole strip. */}
            <div
              className="mt-[19px] rounded-[var(--ob-radius-lg)] p-px"
              style={{
                background: "linear-gradient(90deg,#8b5cf6,#1652f0,#4ade80)",
              }}
            >
              <div className="flex flex-wrap items-center gap-[19px] rounded-[calc(var(--ob-radius-lg)-1px)] bg-[color:var(--ob-bg)] p-[19px]">
                <Avatar name="yourname.acme.id" size={51} />
                <span className="flex-1 text-[1.321rem] font-bold">
                  yourname.acme.id
                </span>
                <Badge
                  glyph={<ShieldStarIcon size={15} />}
                  value="100"
                  label="Points"
                  tone="#8b5cf6"
                />
                <Badge
                  glyph={<CrownIcon size={15} />}
                  value="# ---"
                  label="My rank"
                  tone="#4ade80"
                />
              </div>
            </div>

            <div className="flex items-end gap-[15px] pb-[19px] pt-[34px]">
              <div className="flex-1">
                <h2 className="text-[1.651rem] font-bold tracking-[-0.01em]">
                  Trending onchain
                </h2>
                <p className="pt-[6px] text-[0.991rem] text-[color:var(--ob-fg-soft)]">
                  The onchain experiences everyone&rsquo;s doing today
                </p>
              </div>
              <span className="text-[0.991rem] font-semibold text-[color:var(--ob-brand)]">
                See experiences
              </span>
            </div>

            <div className="grid gap-[19px] sm:grid-cols-2 xl:grid-cols-4">
              {TRENDING.map((item) => (
                <div key={item} className="relative">
                  <span className="block h-[198px]">
                    <Thumb seed={item} radius={15} alt={item} />
                  </span>
                  <span
                    aria-hidden
                    className="absolute bottom-[15px] right-[15px] grid size-[34px] place-items-center rounded-full bg-[color-mix(in_oklab,#0a0b0d_55%,transparent)] text-[0.849rem]"
                  >
                    <DownloadIcon size={14} />
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Main>
      </Shell>
    </Surface>
  );
}

function Badge({
  glyph,
  value,
  label,
  tone,
}: {
  glyph: ReactNode;
  value: string;
  label: string;
  tone: string;
}) {
  return (
    <span className="flex items-center gap-[11px] rounded-[var(--ob-radius)] bg-[color:var(--ob-surface)] px-[19px] py-[13px]">
      <span
        aria-hidden
        className="grid size-[34px] place-items-center rounded-full text-[0.896rem]"
        style={{ background: `color-mix(in oklab, ${tone} 28%, transparent)` }}
      >
        {glyph}
      </span>
      <span className="leading-tight">
        <span className="block text-[1.085rem] font-bold tabular-nums">
          {value}
        </span>
        <span className="block text-[0.802rem] font-semibold uppercase tracking-wide text-[color:var(--ob-muted)]">
          {label}
        </span>
      </span>
    </span>
  );
}
