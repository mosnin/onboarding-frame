"use client";

import { useCallback, useEffect, useState } from "react";
import type { ShelfId } from "./shelves";

/**
 * The kit — what someone has picked so far.
 *
 * Held in localStorage rather than a server session: there is no account, and
 * a kit is just a handful of ids. Selections survive navigation and reloads,
 * which is the whole ergonomic point of shopping across several pages.
 */
export interface Kit {
  onboarding?: string;
  dashboard?: string;
  pricing?: string;
  addons: string[];
}

const EMPTY: Kit = { addons: [] };
const KEY = "onboarding-frame:kit";
/** Same-tab listeners; `storage` only fires in *other* tabs. */
const EVENT = "onboarding-frame:kit-change";

function read(): Kit {
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return EMPTY;
    const parsed = JSON.parse(raw) as Partial<Kit>;
    return { ...EMPTY, ...parsed, addons: parsed.addons ?? [] };
  } catch {
    return EMPTY;
  }
}

function write(kit: Kit) {
  try {
    window.localStorage.setItem(KEY, JSON.stringify(kit));
  } catch {
    /* private mode — the kit stays in memory for this page */
  }
  window.dispatchEvent(new CustomEvent(EVENT));
}

export function useKit() {
  // Start empty so server and client markup agree, then hydrate after mount.
  const [kit, setKit] = useState<Kit>(EMPTY);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setKit(read());
    setReady(true);
    const sync = () => setKit(read());
    window.addEventListener(EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const select = useCallback((shelf: ShelfId, itemId: string) => {
    const current = read();
    const next: Kit =
      shelf === "addons"
        ? {
            ...current,
            addons: current.addons.includes(itemId)
              ? current.addons.filter((id) => id !== itemId)
              : [...current.addons, itemId],
          }
        : // Picking the same item again clears the slot, so one control toggles.
          {
            ...current,
            [shelf]: current[shelf] === itemId ? undefined : itemId,
          };
    write(next);
    setKit(next);
  }, []);

  const clear = useCallback(() => {
    write(EMPTY);
    setKit(EMPTY);
  }, []);

  const has = useCallback(
    (shelf: ShelfId, itemId: string) =>
      shelf === "addons" ? kit.addons.includes(itemId) : kit[shelf] === itemId,
    [kit],
  );

  const count =
    (kit.onboarding ? 1 : 0) +
    (kit.dashboard ? 1 : 0) +
    (kit.pricing ? 1 : 0) +
    kit.addons.length;

  return { kit, ready, select, clear, has, count };
}
