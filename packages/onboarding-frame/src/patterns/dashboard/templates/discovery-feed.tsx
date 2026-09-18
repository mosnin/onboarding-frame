"use client";

import { Avatar, Thumb } from "../../../ui/avatar";
import { cn } from "../../../lib/cn";
import { Surface, discoveryFeedTokens } from "./tokens";
import { Main, Shell } from "./chrome";
import type { TemplateProps } from "./props";
import {
  ChevronDown,
  Icon,
  SearchIcon,
  SettingsIcon,
  type IconName,
} from "../../../ui/icons";

const RAIL: IconName[] = ["home", "grid", "layers", "bell", "user", "plus"];

/*
 * The reference's counters are not bare numbers — each pairs a mark with its
 * count: saves to a board, shares, and pins. Without the marks the pills read
 * as unexplained digits.
 */
type Badge = { icon: IconName; n: string };
const save = (n: string): Badge => ({ icon: "box", n });
const share = (n: string): Badge => ({ icon: "share", n });
const pin = (n: string): Badge => ({ icon: "pin", n });

const TABS = ["Collections", "Recents", "For You", "More"];

/** Deterministic column heights keep the masonry rhythm without real images. */
const ITEMS = [
  { id: "1", col: 0, h: 330, cat: "Art & design", title: "Paintings by a contemporary portraitist, first seen on an album cover.", author: "M. Gogh", badges: [save("4")] },
  { id: "2", col: 1, h: 250, cat: "Art & design", title: "I've been following this painter for five years, and each new piece still surprises me.", author: "Glauber", badges: [save("5")] },
  { id: "3", col: 2, h: 300, cat: "Art & design", title: "Light, materiality and the photographic image: fragments of stone with subtle tensions.", author: "M. Gogh", badges: [share("1"), save("5")] },
  { id: "4", col: 3, h: 230, cat: "Art & design", title: "The artwork on this record is by a Dutch illustrator. Note: the vinyl release differs.", author: "M. Gogh", badges: [share("1"), save("4")] },
  { id: "5", col: 4, h: 210, cat: "Music & sounds", title: "Instrumental music full of textures and references to the rhythms of nature.", author: "M. Gogh", badges: [share("1")] },
  { id: "6", col: 0, h: 260, cat: "Art & design", title: "Beautiful, calm and ethereal series of paintings — I've never seen ink used this way.", author: "Glauber", badges: [pin("1"), save("5")] },
  { id: "7", col: 1, h: 320, cat: "Industrial design", title: "Love the boldness of this custom sound system, inspired by and designed for a gallery.", author: "Glauber", badges: [save("5")] },
  { id: "8", col: 2, h: 220, cat: "Music & sounds", title: "An album I spent many hours with while creating. I recently returned to it.", author: "A. Dubrovin", badges: [] },
  { id: "9", col: 3, h: 290, cat: "Art & design", title: "Welcome to the platform! It's exciting to finally have a place where we can share.", author: "Glauber", badges: [pin("15"), share("3"), save("3")] },
  { id: "10", col: 4, h: 240, cat: "Art & design", title: "An artist whose work I return to again and again for inspiration. Brightness and rhythm.", author: "A. Dubrovin", badges: [pin("1"), save("5")] },
];

/**
 * Discovery feed.
 *
 * Masonry gallery with almost no chrome: a thin icon rail, a text tab strip,
 * and cards where the image carries the weight and metadata sits beneath.
 */
export function DiscoveryFeedTemplate({
  userName = "Alex Rivera",
  className,
}: TemplateProps) {
  const columns = [0, 1, 2, 3, 4].map((col) => ITEMS.filter((item) => item.col === col));

  return (
    <Surface tokens={discoveryFeedTokens}>
      <Shell className={cn(className)}>
        <aside className="hidden w-[55px] shrink-0 flex-col items-center gap-[22px] border-r border-[color:var(--ob-border)] py-[15px] sm:flex">
          <Avatar name={userName} size={23} />
          <nav className="mt-auto grid gap-[18px] text-[color:var(--ob-fg-soft)]">
            {RAIL.map((name, i) => (
              <button
                key={name}
                type="button"
                className={cn(
                  "relative grid size-[28px] place-items-center rounded-[8px] transition-colors",
                  i === 1 ? "bg-[color:var(--ob-surface-2)]" : "opacity-60 hover:opacity-100",
                )}
              >
                <Icon name={name} width={16} height={16} />
                {i === 3 && (
                  <span className="absolute -right-[2px] -top-[2px] grid size-[12px] place-items-center rounded-full bg-[#e0332c] text-[0.462rem] font-bold text-white">
                    2
                  </span>
                )}
              </button>
            ))}
          </nav>
          <button type="button" aria-label="Settings" className="mb-[3px] mt-auto opacity-60">
            <SettingsIcon width={16} height={16} />
          </button>
        </aside>

        <Main>
          <header className="flex items-center gap-[22px] px-[22px] py-[15px]">
            {TABS.map((tab, i) => (
              <button
                key={tab}
                type="button"
                aria-current={i === 2 ? "page" : undefined}
                className={cn(
                  // Flex, so the caret sits beside the label rather than
                  // wrapping under it as an inline block.
                  "flex items-center text-[0.754rem]",
                  i === 2
                    ? "font-bold text-[color:var(--ob-fg)]"
                    : "text-[color:var(--ob-muted)] hover:text-[color:var(--ob-fg)]",
                )}
              >
                {tab}
                {i === 3 && <ChevronDown width={11} height={11} className="ml-[3px] opacity-50" />}
              </button>
            ))}
            <button type="button" aria-label="Search" className="ml-auto opacity-60">
              <SearchIcon width={15} height={15} />
            </button>
          </header>

          <div className="grid grid-cols-2 gap-[12px] px-[22px] pb-[31px] md:grid-cols-3 xl:grid-cols-5">
            {columns.map((column, i) => (
              <div key={i} className="grid content-start gap-[22px]">
                {column.map((item) => (
                  <article key={item.id}>
                    <div className="relative">
                      <span className="block" style={{ height: item.h }}>
                        <Thumb seed={item.author + item.h} alt="Post image" radius={8} />
                      </span>
                      {item.badges.length > 0 && (
                        <div className="absolute bottom-[9px] left-[9px] flex gap-[5px]">
                          {item.badges.map((badge, j) => (
                            <span
                              key={j}
                              className="flex items-center gap-[3px] rounded-full bg-white/92 px-[6px] py-[3px] text-[0.554rem] font-bold text-[#111] [box-shadow:var(--ob-shadow)]"
                            >
                              <Icon name={badge.icon} width={9} height={9} />
                              {badge.n}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    <p className="mt-[9px] text-[0.523rem] font-bold uppercase tracking-wide text-[color:var(--ob-muted)]">
                      {item.cat}
                    </p>
                    <p className="mt-[5px] text-[0.731rem] leading-snug">{item.title}</p>
                    <div className="mt-[8px] flex items-center gap-[6px]">
                      <Avatar name={item.author} size={14} />
                      <span className="text-[0.631rem] text-[color:var(--ob-muted)]">
                        {item.author}
                      </span>
                    </div>
                  </article>
                ))}
              </div>
            ))}
          </div>
        </Main>
      </Shell>
    </Surface>
  );
}
