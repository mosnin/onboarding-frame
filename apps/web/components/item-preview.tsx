"use client";

import { useMemo } from "react";
import {
  presets,
  type OnboardingTheme,
  type PatternKind,
} from "onboarding-frame";
import { FlowRenderer } from "./flow-renderer";
import { TemplateBody } from "./template-viewer";

/**
 * Shrunk-down live preview.
 *
 * Renders the real component at full size and scales it down, rather than
 * shipping screenshots. Previews can never go stale, and what you see on the
 * shelf is literally the thing you are adding to the kit.
 */
export function ItemPreview({
  kind,
  variant,
  height = 190,
  scale = 0.34,
}: {
  kind: PatternKind;
  variant: string;
  height?: number;
  scale?: number;
}) {
  const preset = useMemo(() => {
    if (kind === "dashboard") return null;
    const group = presets[kind] as Record<string, unknown>;
    const entry = group?.[variant];
    if (entry && typeof entry === "object" && "config" in entry) {
      return entry as { config: unknown; theme?: OnboardingTheme };
    }
    return { config: entry, theme: undefined };
  }, [kind, variant]);

  return (
    <div
      aria-hidden
      className="relative overflow-hidden rounded-lg border border-[color:var(--site-border)] bg-[color:var(--site-surface)]"
      style={{ height }}
    >
      <div
        className="pointer-events-none origin-top-left"
        style={{
          transform: `scale(${scale})`,
          width: `${100 / scale}%`,
          height: `${100 / scale}%`,
        }}
      >
        {kind === "dashboard" ? (
          <TemplateBody slug={variant} page="home" />
        ) : (
          <FlowRenderer
            kind={kind}
            config={preset?.config}
            theme={preset?.theme}
          />
        )}
      </div>
    </div>
  );
}
