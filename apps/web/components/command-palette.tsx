"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { navIndex, searchNav, type NavEntry } from "@/lib/navigation";
import { SearchIcon } from "./icons";

/**
 * ⌘K search.
 *
 * Built rather than faked: the header shows a search affordance, so it has to
 * search something. It reads the same index the sidebar does, which means a
 * piece added to a shelf is findable here without being registered twice.
 */
export function CommandPalette({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // With no query, show a useful starting set rather than an empty panel.
  const results = useMemo(
    () => (query.trim() ? searchNav(query) : navIndex.slice(0, 8)),
    [query],
  );

  useEffect(() => {
    if (!open) return;
    setQuery("");
    setActive(0);
    // Focus after paint, or the dialog steals it back.
    const id = requestAnimationFrame(() => inputRef.current?.focus());
    return () => cancelAnimationFrame(id);
  }, [open]);

  useEffect(() => {
    setActive(0);
  }, [query]);

  const go = useCallback(
    (entry: NavEntry) => {
      onClose();
      router.push(entry.href);
    },
    [onClose, router],
  );

  useEffect(() => {
    if (!open) return;

    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key === "ArrowDown") {
        event.preventDefault();
        setActive((index) => Math.min(index + 1, results.length - 1));
        return;
      }
      if (event.key === "ArrowUp") {
        event.preventDefault();
        setActive((index) => Math.max(index - 1, 0));
        return;
      }
      if (event.key === "Enter") {
        const entry = results[active];
        if (entry) {
          event.preventDefault();
          go(entry);
        }
      }
    }

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, results, active, go, onClose]);

  // Keep the highlighted row in view when arrowing past the fold.
  useEffect(() => {
    listRef.current
      ?.querySelector<HTMLElement>(`[data-index="${active}"]`)
      ?.scrollIntoView({ block: "nearest" });
  }, [active]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center px-4 pt-[12vh]"
      role="dialog"
      aria-modal="true"
      aria-label="Search the catalogue"
    >
      <button
        type="button"
        aria-label="Close search"
        onClick={onClose}
        className="absolute inset-0 cursor-default bg-[color:var(--site-fg)]/25 backdrop-blur-[2px]"
      />

      <div className="relative w-full max-w-[640px] overflow-hidden rounded-2xl border border-[color:var(--site-border)] bg-[color:var(--site-bg)] shadow-[var(--site-shadow-lift)]">
        <div className="flex items-center gap-3 border-b border-[color:var(--site-border)] px-4">
          <SearchIcon className="shrink-0 text-[color:var(--site-muted)]" size={18} />
          <input
            ref={inputRef}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search templates, flows and pages…"
            className="w-full bg-transparent py-4 text-[0.98rem] outline-none placeholder:text-[color:var(--site-muted)]"
          />
          <kbd className="shrink-0 rounded border border-[color:var(--site-border)] px-1.5 py-0.5 text-[0.7rem] font-semibold text-[color:var(--site-muted)]">
            Esc
          </kbd>
        </div>

        <div ref={listRef} className="site-scroll max-h-[52vh] overflow-y-auto p-2">
          {results.length === 0 ? (
            <p className="px-3 py-10 text-center text-[0.95rem] text-[color:var(--site-muted)]">
              Nothing matches &ldquo;{query}&rdquo;.
            </p>
          ) : (
            results.map((entry, index) => (
              <button
                key={entry.id}
                type="button"
                data-index={index}
                onMouseEnter={() => setActive(index)}
                onClick={() => go(entry)}
                className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors ${
                  index === active
                    ? "bg-[color:var(--site-surface)]"
                    : "hover:bg-[color:var(--site-surface)]"
                }`}
              >
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-[0.95rem] font-medium">
                    {entry.label}
                  </span>
                  <span className="block truncate text-[0.82rem] text-[color:var(--site-muted)]">
                    {entry.group}
                  </span>
                </span>
                {index === active && (
                  <kbd className="shrink-0 rounded border border-[color:var(--site-border)] px-1.5 py-0.5 text-[0.68rem] font-semibold text-[color:var(--site-muted)]">
                    ↵
                  </kbd>
                )}
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

/** Opens the palette on ⌘K / Ctrl-K from anywhere on the page. */
export function useCommandPalette() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen((value) => !value);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return { open, setOpen };
}
