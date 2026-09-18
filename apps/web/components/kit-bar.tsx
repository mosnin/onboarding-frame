"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useKit } from "@/lib/kit";
import { shelves } from "@/lib/shelves";
import { Glyph } from "onboarding-frame";

/**
 * Persistent kit summary.
 *
 * Stays out of the way until something is selected, then follows you across
 * shelves so the trip to checkout is always one click.
 */
export function KitBar() {
  const { kit, ready, count, clear } = useKit();
  const pathname = usePathname();

  if (!ready || count === 0 || pathname === "/kit") return null;

  const slots = shelves
    .filter((shelf) => shelf.id !== "addons")
    .map((shelf) => {
      const id = kit[shelf.id as "onboarding" | "dashboard" | "pricing"];
      const item = id
        ? shelf.items.find((entry) => entry.id === id)
        : undefined;
      return { shelf, item };
    });

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-40 flex justify-center p-4">
      <div className="pointer-events-auto flex max-w-full flex-wrap items-center gap-3 rounded-2xl border border-[color:var(--site-border)] bg-[color:var(--site-bg)]/95 p-2.5 pl-4 shadow-[0_12px_40px_-12px_rgb(0_0_0/0.3)] backdrop-blur">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
          {slots.map(({ shelf, item }) => (
            <span key={shelf.id} className="flex items-center gap-1.5 text-sm">
              <Glyph value={shelf.glyph} size={15} className="opacity-70" />
              <span
                className={
                  item
                    ? "font-semibold"
                    : "text-[color:var(--site-muted)] line-through decoration-[color:var(--site-border)]"
                }
              >
                {item?.name ?? shelf.noun}
              </span>
            </span>
          ))}
          {kit.addons.length > 0 && (
            <span className="flex items-center gap-1.5 text-sm">
              <Glyph value="puzzle" size={15} className="opacity-70" />
              <span className="font-semibold">
                {kit.addons.length} add-on{kit.addons.length === 1 ? "" : "s"}
              </span>
            </span>
          )}
        </div>

        <button
          type="button"
          onClick={clear}
          className="rounded-full px-2.5 py-1.5 text-xs font-semibold text-[color:var(--site-muted)] hover:text-[color:var(--site-fg)]"
        >
          Clear
        </button>
        <Link
          href="/kit"
          className="rounded-full bg-[color:var(--site-fg)] px-4 py-2 text-sm font-semibold text-[color:var(--site-bg)]"
        >
          Export kit · {count}
        </Link>
      </div>
    </div>
  );
}
