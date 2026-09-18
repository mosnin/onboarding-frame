"use client";

import type { ReactNode } from "react";
import { cn } from "../../../lib/cn";
import { AvatarSlot, LogoSlot, Placeholder } from "../../../ui/placeholder";
import { Surface, walletTokens } from "./tokens";
import { Main, Shell, Sidebar } from "./chrome";
import type { TemplateProps } from "./props";

export type WalletPage = "trending" | "explore" | "create";

export interface WalletHomeProps extends TemplateProps {
  page?: WalletPage;
}

const NAV = [
  { id: "home", label: "Home", glyph: "⌂" },
  { id: "assets", label: "Assets", glyph: "◔" },
  { id: "apps", label: "Apps", glyph: "◎" },
];

const ACTIONS = [
  { id: "buy", label: "Buy", glyph: "+" },
  { id: "swap", label: "Swap", glyph: "⇄" },
  { id: "send", label: "Send", glyph: "↑" },
  { id: "receive", label: "Receive", glyph: "↓" },
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
export function WalletHomeTemplate({ className, page = "trending" }: WalletHomeProps) {
  return (
    <Surface tokens={walletTokens} className={className}>
      <Shell>
        <Sidebar width={320} bg="var(--ob-bg)" className="relative border-r-0">
          <div className="px-5 pb-6 pt-4">
            <LogoSlot size={42} label="" radius={10} />
          </div>

          <nav className="grid gap-1.5 px-4">
            {NAV.map((item, index) => (
              <span
                key={item.id}
                className={cn(
                  "flex items-center gap-4 rounded-full px-5 py-3.5 text-[1.15rem] font-semibold",
                  index === 0
                    ? "bg-[color-mix(in_oklab,#1652f0_28%,#0a0b0d)] text-[color:var(--ob-brand)]"
                    : "text-[color:var(--ob-fg-soft)]",
                )}
              >
                <span aria-hidden className="text-[1.15rem]">
                  {item.glyph}
                </span>
                {item.label}
              </span>
            ))}
          </nav>

          <div className="mx-4 my-5 border-t border-[color:var(--ob-border)]" />

          <nav className="grid gap-1.5 px-4">
            {ACTIONS.map((action) => (
              <span
                key={action.id}
                className="flex items-center gap-4 rounded-full px-3 py-2.5 text-[1.15rem] font-semibold"
              >
                <span
                  aria-hidden
                  className="grid size-10 place-items-center rounded-full bg-[color:var(--ob-surface-2)] text-[1.05rem]"
                >
                  {action.glyph}
                </span>
                {action.label}
              </span>
            ))}
          </nav>

          <span
            aria-hidden
            className="mt-auto px-7 pb-8 text-[color:var(--ob-muted)]"
          >
            ‹
          </span>
        </Sidebar>

        <Main className="overflow-auto">
          <header className="flex h-[104px] shrink-0 items-center gap-4 border-b border-[color:var(--ob-border)] px-8">
            <div className="ml-auto flex w-full max-w-[720px] items-center gap-3 rounded-full bg-[color:var(--ob-surface-2)] px-6 py-3.5 text-[1.05rem] text-[color:var(--ob-muted)]">
              <span aria-hidden>⌕</span> Search coins, NFTs, apps…
            </div>
            {["▭", "⚙"].map((glyph) => (
              <span
                key={glyph}
                aria-hidden
                className="grid size-11 shrink-0 place-items-center rounded-full bg-[color:var(--ob-surface-2)]"
              >
                {glyph}
              </span>
            ))}
          </header>

          <nav className="flex gap-9 border-b border-[color:var(--ob-border)] px-8">
            {[
              { id: "trending", label: "Trending" },
              { id: "explore", label: "Explore" },
              { id: "create", label: "Create" },
            ].map((tab) => (
              <span
                key={tab.id}
                className={cn(
                  "py-5 text-[1.15rem] font-semibold",
                  tab.id === page
                    ? "border-b-2 border-[color:var(--ob-brand)] text-[color:var(--ob-brand)]"
                    : "text-[color:var(--ob-fg-soft)]",
                )}
              >
                {tab.label}
              </span>
            ))}
          </nav>

          <div className="px-8 py-6">
            <section className="grid overflow-hidden rounded-[var(--ob-radius-lg)] lg:grid-cols-2">
              <div className="bg-[color:var(--ob-surface)] px-10 py-9">
                {/* Gradient outline, not a fill — it has to sit on the card. */}
                <span
                  className="inline-flex rounded-full p-px"
                  style={{
                    background: "linear-gradient(90deg,#1652f0,#22d3ee,#4ade80)",
                  }}
                >
                  <span className="rounded-full bg-[color:var(--ob-surface)] px-5 py-2 text-[0.88rem] font-bold uppercase tracking-wide">
                    Fresh drop
                  </span>
                </span>

                <div className="flex items-center gap-3 pt-7">
                  <Placeholder width={44} height={44} radius={8} label="" />
                  <span className="text-[1rem] font-bold uppercase tracking-wide">
                    Creator
                  </span>
                </div>

                <h1 className="pt-5 text-[3.1rem] font-bold leading-[1.05] tracking-[-0.03em]">
                  Alzenaverse
                  <br />
                  Halloween
                </h1>

                <p className="max-w-[48ch] pt-5 text-[1.12rem] leading-relaxed text-[color:var(--ob-fg-soft)]">
                  Alzenaverse Halloween is a limited-edition release of magical potions
                  and portraits by the creator.
                </p>

                <span
                  className="mt-8 block rounded-full px-6 py-4 text-center text-[1.12rem] font-bold text-white"
                  style={{ background: "linear-gradient(90deg,#1652f0,#35c8e8)" }}
                >
                  Mint +1000 points
                </span>
              </div>

              <div className="relative bg-black">
                <Placeholder height="100%" label="Drop artwork" radius={0} />
                <span
                  aria-hidden
                  className="absolute right-6 top-6 grid size-11 place-items-center rounded-full bg-[color-mix(in_oklab,#f7f8f8_16%,transparent)] text-[1rem]"
                >
                  ⤓
                </span>
              </div>
            </section>

            {/* Gradient border again, this time around the whole strip. */}
            <div
              className="mt-5 rounded-[var(--ob-radius-lg)] p-px"
              style={{
                background: "linear-gradient(90deg,#8b5cf6,#1652f0,#4ade80)",
              }}
            >
              <div className="flex flex-wrap items-center gap-5 rounded-[calc(var(--ob-radius-lg)-1px)] bg-[color:var(--ob-bg)] p-5">
                <AvatarSlot size={54} />
                <span className="flex-1 text-[1.4rem] font-bold">yourname.acme.id</span>
                <Badge glyph="🛡" value="100" label="Points" tone="#8b5cf6" />
                <Badge glyph="♛" value="# ---" label="My rank" tone="#4ade80" />
              </div>
            </div>

            <div className="flex items-end gap-4 pb-5 pt-9">
              <div className="flex-1">
                <h2 className="text-[1.75rem] font-bold tracking-[-0.01em]">
                  Trending onchain
                </h2>
                <p className="pt-1.5 text-[1.05rem] text-[color:var(--ob-fg-soft)]">
                  The onchain experiences everyone&rsquo;s doing today
                </p>
              </div>
              <span className="text-[1.05rem] font-semibold text-[color:var(--ob-brand)]">
                See experiences
              </span>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
              {TRENDING.map((item) => (
                <div key={item} className="relative">
                  <Placeholder height={210} radius={16} label={item} />
                  <span
                    aria-hidden
                    className="absolute bottom-4 right-4 grid size-9 place-items-center rounded-full bg-[color-mix(in_oklab,#0a0b0d_55%,transparent)] text-[0.9rem]"
                  >
                    ⤓
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
    <span className="flex items-center gap-3 rounded-[var(--ob-radius)] bg-[color:var(--ob-surface)] px-5 py-3.5">
      <span
        aria-hidden
        className="grid size-9 place-items-center rounded-full text-[0.95rem]"
        style={{ background: `color-mix(in oklab, ${tone} 28%, transparent)` }}
      >
        {glyph}
      </span>
      <span className="leading-tight">
        <span className="block text-[1.15rem] font-bold tabular-nums">{value}</span>
        <span className="block text-[0.85rem] font-semibold uppercase tracking-wide text-[color:var(--ob-muted)]">
          {label}
        </span>
      </span>
    </span>
  );
}
