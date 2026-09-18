"use client";

import { useCallback, useEffect, useState } from "react";

/**
 * `useState` that mirrors into localStorage.
 *
 * Reads lazily after mount so server and client markup match, and degrades to
 * plain state when storage is unavailable (private mode, blocked cookies).
 */
export function usePersistentState<T>(
  key: string | null,
  initial: T,
): [T, (value: T | ((prev: T) => T)) => void, { clear: () => void }] {
  const [value, setValue] = useState<T>(initial);

  useEffect(() => {
    if (!key) return;
    try {
      const raw = window.localStorage.getItem(key);
      if (raw !== null) setValue(JSON.parse(raw) as T);
    } catch {
      /* storage unavailable — keep the in-memory value */
    }
  }, [key]);

  const update = useCallback(
    (next: T | ((prev: T) => T)) => {
      setValue((prev) => {
        const resolved =
          typeof next === "function" ? (next as (p: T) => T)(prev) : next;
        if (key) {
          try {
            window.localStorage.setItem(key, JSON.stringify(resolved));
          } catch {
            /* ignore write failures */
          }
        }
        return resolved;
      });
    },
    [key],
  );

  const clear = useCallback(() => {
    if (!key) return;
    try {
      window.localStorage.removeItem(key);
    } catch {
      /* ignore */
    }
  }, [key]);

  return [value, update, { clear }];
}
