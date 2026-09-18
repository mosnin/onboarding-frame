"use client";

import { useEffect } from "react";

/** Bind window-level key handlers for as long as `active` is true. */
export function useKeyboard(
  active: boolean,
  handlers: Partial<Record<"Escape" | "ArrowLeft" | "ArrowRight" | "Enter", () => void>>,
): void {
  useEffect(() => {
    if (!active) return;
    const onKey = (event: KeyboardEvent) => {
      const handler = handlers[event.key as keyof typeof handlers];
      if (!handler) return;
      // Let text inputs own Enter and the arrow keys.
      const target = event.target as HTMLElement | null;
      const tag = target?.tagName;
      if ((tag === "INPUT" || tag === "TEXTAREA") && event.key !== "Escape") return;
      event.preventDefault();
      handler();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // `handlers` is re-created each render; depending on `active` alone is
    // intentional — the latest closure is captured by the listener body.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, handlers]);
}
