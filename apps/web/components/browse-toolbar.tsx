"use client";

import { GridIcon, ListIcon, SortIcon } from "./icons";

export type SortMode = "default" | "name" | "name-desc";
export type ViewMode = "grid" | "list";

const SORTS: { id: SortMode; label: string }[] = [
  { id: "default", label: "Default" },
  { id: "name", label: "A–Z" },
  { id: "name-desc", label: "Z–A" },
];

/**
 * Sort and view controls.
 *
 * "Default" is catalogue order, which for the dashboards is the order their
 * references arrived — a real ordering, so it is offered as a sort rather than
 * relabelled "Newest", which would imply publication dates the catalogue does
 * not carry.
 */
export function BrowseToolbar({
  sort,
  onSortChange,
  view,
  onViewChange,
}: {
  sort: SortMode;
  onSortChange: (value: SortMode) => void;
  view: ViewMode;
  onViewChange: (value: ViewMode) => void;
}) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <div className="flex items-center gap-1 rounded-xl border border-[color:var(--site-border)] p-1">
        <span className="grid size-8 place-items-center text-[color:var(--site-muted)]">
          <SortIcon />
        </span>
        {SORTS.map((entry) => (
          <button
            key={entry.id}
            type="button"
            onClick={() => onSortChange(entry.id)}
            aria-pressed={sort === entry.id}
            className={`rounded-lg px-3.5 py-1.5 text-[0.92rem] font-medium transition-colors ${
              sort === entry.id
                ? "bg-[color:var(--site-bg)] text-[color:var(--site-fg)] shadow-[var(--site-shadow)] ring-1 ring-[color:var(--site-border)]"
                : "text-[color:var(--site-muted)] hover:text-[color:var(--site-fg)]"
            }`}
          >
            {entry.label}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-1 rounded-xl border border-[color:var(--site-border)] p-1">
        {[
          { id: "list" as const, label: "List", icon: <ListIcon /> },
          { id: "grid" as const, label: "Grid", icon: <GridIcon /> },
        ].map((entry) => (
          <button
            key={entry.id}
            type="button"
            onClick={() => onViewChange(entry.id)}
            aria-pressed={view === entry.id}
            className={`flex items-center gap-2 rounded-lg px-3.5 py-1.5 text-[0.92rem] font-medium transition-colors ${
              view === entry.id
                ? "bg-[color:var(--site-bg)] text-[color:var(--site-fg)] shadow-[var(--site-shadow)] ring-1 ring-[color:var(--site-border)]"
                : "text-[color:var(--site-muted)] hover:text-[color:var(--site-fg)]"
            }`}
          >
            {entry.icon}
            <span className="hidden sm:inline">{entry.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
