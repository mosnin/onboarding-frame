"use client";

import { Placeholder } from "../../../ui/placeholder";
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
export function DiscoveryFeedTemplate({ className }: TemplateProps) {
  const columns = [0, 1, 2, 3, 4].map((col) => ITEMS.filter((item) => item.col === col));

  return (
    <Surface tokens={discoveryFeedTokens}>
      <Shell className={cn(className)}>
        <aside className="hidden w-[72px] shrink-0 flex-col items-center gap-7 border-r border-[color:var(--ob-border)] py-5 sm:flex">
          <Placeholder shape="circle" width={30} height={30} />
          <nav className="mt-auto grid gap-6 text-[color:var(--ob-fg-soft)]">
            {RAIL.map((name, i) => (
              <button
                key={name}
                type="button"
                className={cn(
                  "relative grid size-9 place-items-center rounded-[10px] transition-colors",
                  i === 1 ? "bg-[color:var(--ob-surface-2)]" : "opacity-60 hover:opacity-100",
                )}
              >
                <Icon name={name} width={21} height={21} />
                {i === 3 && (
                  <span className="absolute -right-0.5 -top-0.5 grid size-4 place-items-center rounded-full bg-[#e0332c] text-[0.6rem] font-bold text-white">
                    2
                  </span>
                )}
              </button>
            ))}
          </nav>
          <button type="button" aria-label="Settings" className="mb-1 mt-auto opacity-60">
            <SettingsIcon width={21} height={21} />
          </button>
        </aside>

        <Main>
          <header className="flex items-center gap-7 px-7 py-5">
            {TABS.map((tab, i) => (
              <button
                key={tab}
                type="button"
                aria-current={i === 2 ? "page" : undefined}
                className={cn(
                  // Flex, so the caret sits beside the label rather than
                  // wrapping under it as an inline block.
                  "flex items-center text-[0.98rem]",
                  i === 2
                    ? "font-bold text-[color:var(--ob-fg)]"
                    : "text-[color:var(--ob-muted)] hover:text-[color:var(--ob-fg)]",
                )}
              >
                {tab}
                {i === 3 && <ChevronDown width={14} height={14} className="ml-1 opacity-50" />}
              </button>
            ))}
            <button type="button" aria-label="Search" className="ml-auto opacity-60">
              <SearchIcon width={19} height={19} />
            </button>
          </header>

          <div className="grid grid-cols-2 gap-4 px-7 pb-10 md:grid-cols-3 xl:grid-cols-5">
            {columns.map((column, i) => (
              <div key={i} className="grid content-start gap-7">
                {column.map((item) => (
                  <article key={item.id}>
                    <div className="relative">
                      <Placeholder
                        height={item.h}
                        radius={10}
                        label="Post image"
                        className="w-full"
                      />
                      {item.badges.length > 0 && (
                        <div className="absolute bottom-3 left-3 flex gap-1.5">
                          {item.badges.map((badge, j) => (
                            <span
                              key={j}
                              className="flex items-center gap-1 rounded-full bg-white/92 px-2 py-1 text-[0.72rem] font-bold text-[#111] [box-shadow:var(--ob-shadow)]"
                            >
                              <Icon name={badge.icon} width={12} height={12} />
                              {badge.n}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    <p className="mt-3 text-[0.68rem] font-bold uppercase tracking-wide text-[color:var(--ob-muted)]">
                      {item.cat}
                    </p>
                    <p className="mt-1.5 text-[0.95rem] leading-snug">{item.title}</p>
                    <div className="mt-2.5 flex items-center gap-2">
                      <Placeholder shape="circle" width={18} height={18} />
                      <span className="text-[0.82rem] text-[color:var(--ob-muted)]">
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
