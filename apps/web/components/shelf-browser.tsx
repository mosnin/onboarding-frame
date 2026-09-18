"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useKit } from "@/lib/kit";
import type { Shelf } from "@/lib/shelves";
import { BrowseSidebar } from "./browse-sidebar";
import { BrowseToolbar, type SortMode, type ViewMode } from "./browse-toolbar";
import { CardButton, PieceCard } from "./piece-card";
import { ItemPreview } from "./item-preview";
import { TemplatePreview } from "./template-preview";
import { CheckIcon, PlusIcon } from "./icons";

export function ShelfBrowser({ shelf }: { shelf: Shelf }) {
  const { select, has, ready } = useKit();
  const [filter, setFilter] = useState("");
  const [sort, setSort] = useState<SortMode>("default");
  const [view, setView] = useState<ViewMode>("grid");

  const visible = useMemo(() => {
    const needle = filter.trim().toLowerCase();
    const matched = needle
      ? shelf.items.filter(
          (item) =>
            item.name.toLowerCase().includes(needle) ||
            item.blurb.toLowerCase().includes(needle) ||
            item.tags?.some((tag) => tag.toLowerCase().includes(needle)),
        )
      : shelf.items;

    if (sort === "default") return matched;
    const sorted = [...matched].sort((a, b) => a.name.localeCompare(b.name));
    return sort === "name" ? sorted : sorted.reverse();
  }, [shelf.items, filter, sort]);

  return (
    <div className="mx-auto flex max-w-[1700px] gap-7 px-4 py-6 sm:px-6">
      <BrowseSidebar
        title={shelf.name}
        total={shelf.items.length}
        titleHref={`/shelf/${shelf.id}`}
        categories={[]}
        filter={filter}
        onFilterChange={setFilter}
      />

      <main className="min-w-0 flex-1 pb-28">
        <div className="flex flex-wrap items-start justify-between gap-5">
          <div>
            <h1 className="text-[2.6rem] font-bold leading-tight tracking-[-0.02em]">
              {shelf.name}
            </h1>
            <p className="mt-1.5 max-w-2xl text-[1.08rem] text-[color:var(--site-muted)]">
              {shelf.tagline}
            </p>
          </div>
          <BrowseToolbar
            sort={sort}
            onSortChange={setSort}
            view={view}
            onViewChange={setView}
          />
        </div>

        <p className="mt-5 max-w-3xl text-pretty leading-relaxed text-[color:var(--site-muted)]">
          {shelf.description}
        </p>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <span className="inline-flex items-center gap-2 rounded-xl border border-[color:var(--site-border)] px-4 py-2 text-[0.95rem]">
            <span className="font-semibold tabular-nums">{visible.length}</span>
            <span className="text-[color:var(--site-muted)]">
              {visible.length === 1 ? "piece" : "pieces"}
            </span>
          </span>
          {shelf.multiple && (
            <span className="text-[0.95rem] font-medium text-[color:var(--site-accent)]">
              Pick as many of these as you like.
            </span>
          )}
        </div>

        {visible.length === 0 ? (
          <p className="mt-8 rounded-2xl border border-dashed border-[color:var(--site-border)] p-16 text-center text-[color:var(--site-muted)]">
            {shelf.items.length === 0
              ? "Nothing on this shelf yet."
              : "Nothing matches that filter."}
          </p>
        ) : (
          <div
            className={
              view === "grid"
                ? "mt-7 grid gap-6 sm:grid-cols-2 xl:grid-cols-3"
                : "mt-7 grid gap-3"
            }
          >
            {visible.map((item) => {
              const picked = ready && has(shelf.id, item.id);
              const href =
                shelf.id === "dashboard"
                  ? `/templates/${item.variant}`
                  : `/playground?pattern=${item.kind}&variant=${item.variant}`;

              return (
                <PieceCard
                  key={item.id}
                  href={href}
                  title={item.name}
                  blurb={item.blurb}
                  layout={view}
                  preview={
                    shelf.id === "dashboard" ? (
                      <TemplatePreview
                        slug={item.variant}
                        page="home"
                        height={view === "grid" ? 250 : 86}
                      />
                    ) : (
                      <ItemPreview
                        kind={item.kind}
                        variant={item.variant}
                        height={view === "grid" ? 250 : 86}
                      />
                    )
                  }
                  meta={
                    item.tags && view === "grid" ? (
                      <div className="flex flex-wrap gap-1.5">
                        {item.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full bg-[color:var(--site-surface)] px-2.5 py-1 text-[0.74rem] font-semibold text-[color:var(--site-muted)]"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    ) : undefined
                  }
                  action={
                    view === "grid" ? (
                      <CardButton
                        active={picked}
                        onClick={() => select(shelf.id, item.id)}
                      >
                        {picked ? (
                          <>
                            <CheckIcon /> In your kit
                          </>
                        ) : (
                          <>
                            <PlusIcon /> Add to kit
                          </>
                        )}
                      </CardButton>
                    ) : undefined
                  }
                />
              );
            })}
          </div>
        )}

        <p className="mt-10 text-[0.95rem] text-[color:var(--site-muted)]">
          Picked what you need?{" "}
          <Link
            href="/kit"
            className="font-semibold text-[color:var(--site-fg)] underline"
          >
            Export your kit
          </Link>{" "}
          as one prompt for your coding agent.
        </p>
      </main>
    </div>
  );
}
