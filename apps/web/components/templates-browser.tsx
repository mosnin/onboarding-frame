"use client";

import { useMemo, useState } from "react";
import { templateCatalog } from "onboarding-frame";
import { BrowseSidebar, type SidebarCategory } from "./browse-sidebar";
import { BrowseToolbar, type SortMode, type ViewMode } from "./browse-toolbar";
import { PieceCard } from "./piece-card";
import { TemplatePreview } from "./template-preview";

/**
 * The dashboard gallery.
 *
 * Client-side because filtering, sorting and the view toggle all act on the
 * same list; the catalogue itself is a module import, so there is no fetch and
 * the first paint is the full grid.
 */
export function TemplatesBrowser() {
  const [filter, setFilter] = useState("");
  const [sort, setSort] = useState<SortMode>("default");
  const [view, setView] = useState<ViewMode>("grid");

  const visible = useMemo(() => {
    const needle = filter.trim().toLowerCase();
    const matched = needle
      ? templateCatalog.filter(
          (entry) =>
            entry.name.toLowerCase().includes(needle) ||
            entry.blurb.toLowerCase().includes(needle),
        )
      : templateCatalog;

    if (sort === "default") return matched;
    const sorted = [...matched].sort((a, b) => a.name.localeCompare(b.name));
    return sort === "name" ? sorted : sorted.reverse();
  }, [filter, sort]);

  // Templates with more than one page are the ones worth surfacing in the rail.
  const categories: SidebarCategory[] = useMemo(
    () =>
      templateCatalog
        .filter((entry) => entry.pages.length > 1)
        .map((entry) => ({
          id: entry.slug,
          label: entry.name,
          href: `/templates/${entry.slug}`,
          count: entry.pages.length,
        })),
    [],
  );

  return (
    <div className="mx-auto flex max-w-[1700px] gap-7 px-4 py-6 sm:px-6">
      <BrowseSidebar
        title="Templates"
        total={templateCatalog.length}
        titleHref="/templates"
        categories={categories}
        categoriesLabel="Multi-page"
        filter={filter}
        onFilterChange={setFilter}
      />

      <main className="min-w-0 flex-1 pb-20">
        <div className="flex flex-wrap items-start justify-between gap-5">
          <div>
            <h1 className="text-[2.6rem] font-bold leading-tight tracking-[-0.02em]">
              Templates
            </h1>
            <p className="mt-1.5 max-w-2xl text-[1.08rem] text-[color:var(--site-muted)]">
              Full-page product surfaces, each with its own palette and type
              scale. Every image is a labelled placeholder.
            </p>
          </div>
          <BrowseToolbar
            sort={sort}
            onSortChange={setSort}
            view={view}
            onViewChange={setView}
          />
        </div>

        <p className="mt-6 inline-flex items-center gap-2 rounded-xl border border-[color:var(--site-border)] px-4 py-2 text-[0.95rem]">
          <span className="font-semibold tabular-nums">{visible.length}</span>
          <span className="text-[color:var(--site-muted)]">
            {visible.length === 1 ? "template" : "templates"}
            {filter.trim() && ` matching “${filter.trim()}”`}
          </span>
        </p>

        {visible.length === 0 ? (
          <p className="mt-8 rounded-2xl border border-dashed border-[color:var(--site-border)] p-16 text-center text-[color:var(--site-muted)]">
            Nothing matches that filter.
          </p>
        ) : (
          <div
            className={
              view === "grid"
                ? "mt-7 grid gap-6 sm:grid-cols-2 xl:grid-cols-3"
                : "mt-7 grid gap-3"
            }
          >
            {visible.map((entry) => (
              <PieceCard
                key={entry.slug}
                href={`/templates/${entry.slug}`}
                title={entry.name}
                blurb={entry.blurb}
                layout={view}
                badge={
                  entry.pages.length > 1
                    ? `${entry.pages.length} pages`
                    : undefined
                }
                preview={
                  <TemplatePreview
                    slug={entry.slug}
                    page={entry.pages[0]?.id ?? "home"}
                    height={view === "grid" ? 250 : 86}
                  />
                }
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
