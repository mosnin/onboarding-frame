"use client";

import Link from "next/link";
import { useKit } from "@/lib/kit";
import type { Shelf } from "@/lib/shelves";
import { ItemPreview } from "./item-preview";

export function ShelfGrid({ shelf }: { shelf: Shelf }) {
  const { select, has, ready } = useKit();

  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {shelf.items.map((item) => {
        const picked = ready && has(shelf.id, item.id);
        return (
          <article
            key={item.id}
            className={`flex flex-col overflow-hidden rounded-xl border transition-colors ${
              picked
                ? "border-[color:var(--site-accent)] ring-1 ring-[color:var(--site-accent)]"
                : "border-[color:var(--site-border)]"
            }`}
          >
            <ItemPreview kind={item.kind} variant={item.variant} />

            <div className="flex flex-1 flex-col gap-3 p-4">
              <div>
                <h3 className="font-bold">{item.name}</h3>
                <p className="mt-1.5 text-[0.9rem] leading-relaxed text-[color:var(--site-muted)]">
                  {item.blurb}
                </p>
              </div>

              {item.tags && (
                <div className="flex flex-wrap gap-1.5">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-[color:var(--site-surface)] px-2 py-0.5 text-[0.7rem] font-semibold text-[color:var(--site-muted)]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              <div className="mt-auto flex items-center gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => select(shelf.id, item.id)}
                  className={`flex-1 rounded-lg px-3 py-2 text-sm font-semibold transition-colors ${
                    picked
                      ? "bg-[color:var(--site-accent)] text-white"
                      : "border border-[color:var(--site-border)] hover:bg-[color:var(--site-surface)]"
                  }`}
                >
                  {picked ? "✓ In your kit" : "Add to kit"}
                </button>
                <Link
                  href={
                    shelf.id === "dashboard"
                      ? `/templates/${item.variant}`
                      : `/playground?pattern=${item.kind === "empty-state" ? "empty-state" : item.kind}&variant=${item.variant}`
                  }
                  className="rounded-lg border border-[color:var(--site-border)] px-3 py-2 text-sm font-semibold text-[color:var(--site-muted)] hover:text-[color:var(--site-fg)]"
                >
                  {shelf.id === "dashboard" ? "Open" : "Edit"}
                </Link>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
