"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { OnboardingEvent, OnboardingTheme, PatternKind } from "onboarding-frame";
import { FlowRenderer } from "./flow-renderer";
import { CodeBlock } from "./code-block";
import { CopyButton } from "./copy-button";
import type { PatternEntry } from "@/lib/catalog";
import { componentNameFor, usageSnippet } from "@/lib/snippets";

interface Preset {
  config: unknown;
  theme?: OnboardingTheme;
}

export function PatternExplorer({
  pattern,
  presets,
}: {
  pattern: PatternEntry;
  /** variant id -> preset, serialised on the server. */
  presets: Record<string, Preset>;
}) {
  const [variant, setVariant] = useState(pattern.variants[0]!.id);
  const [resetKey, setResetKey] = useState(0);
  const [tab, setTab] = useState<"preview" | "config" | "usage" | "events">("preview");
  const [events, setEvents] = useState<OnboardingEvent[]>([]);

  const preset = presets[variant];
  const configJson = useMemo(
    () => JSON.stringify(preset?.config ?? {}, null, 2),
    [preset],
  );
  const snippet = useMemo(
    () => usageSnippet(pattern.kind as PatternKind, variant, preset?.theme),
    [pattern.kind, variant, preset?.theme],
  );

  const reset = () => {
    setResetKey((k) => k + 1);
    setEvents([]);
  };

  const activeVariant = pattern.variants.find((v) => v.id === variant);

  return (
    <div className="grid gap-6">
      {/* Variant switcher */}
      <div className="flex flex-wrap gap-2">
        {pattern.variants.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => {
              setVariant(item.id);
              reset();
            }}
            className={`rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors ${
              variant === item.id
                ? "border-transparent bg-[color:var(--site-fg)] text-[color:var(--site-bg)]"
                : "border-[color:var(--site-border)] text-[color:var(--site-muted)] hover:text-[color:var(--site-fg)]"
            }`}
          >
            {item.name}
          </button>
        ))}
      </div>

      {activeVariant && (
        <p className="max-w-3xl text-[0.95rem] leading-relaxed text-[color:var(--site-muted)]">
          {activeVariant.blurb}
        </p>
      )}

      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-2 border-b border-[color:var(--site-border)] pb-3">
        {(["preview", "config", "usage", "events"] as const).map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setTab(item)}
            className={`rounded-full px-3 py-1.5 text-xs font-semibold capitalize transition-colors ${
              tab === item
                ? "bg-[color:var(--site-surface)] text-[color:var(--site-fg)]"
                : "text-[color:var(--site-muted)] hover:text-[color:var(--site-fg)]"
            }`}
          >
            {item}
            {item === "events" && events.length > 0 && (
              <span className="ml-1.5 tabular-nums opacity-60">{events.length}</span>
            )}
          </button>
        ))}

        <div className="ml-auto flex items-center gap-2">
          <button
            type="button"
            onClick={reset}
            className="rounded-full border border-[color:var(--site-border)] px-3 py-1.5 text-xs font-semibold transition-colors hover:bg-[color:var(--site-surface)]"
          >
            Reset
          </button>
          <Link
            href={`/playground?pattern=${pattern.slug}&variant=${variant}`}
            className="rounded-full bg-[color:var(--site-accent)] px-3 py-1.5 text-xs font-semibold text-white"
          >
            Customise
          </Link>
        </div>
      </div>

      {/* Panel */}
      {tab === "preview" && (
        <div className="overflow-hidden rounded-xl border border-[color:var(--site-border)]">
          <FlowRenderer
            kind={pattern.kind as PatternKind}
            config={preset?.config}
            theme={preset?.theme}
            resetKey={resetKey}
            onEvent={(event) => setEvents((prev) => [...prev, event].slice(-60))}
          />
        </div>
      )}

      {tab === "config" && (
        <CodeBlock
          code={configJson}
          language="json"
          title={`${variant}.json — the whole flow is this object`}
        />
      )}

      {tab === "usage" && (
        <div className="grid gap-4">
          <CodeBlock code={snippet} title={`${componentNameFor(pattern.kind as PatternKind)} usage`} />
          <div className="rounded-xl border border-[color:var(--site-border)] p-4">
            <p className="text-sm text-[color:var(--site-muted)]">
              Prefer to own the source? Pull this variant into your repo:
            </p>
            <div className="mt-3 flex items-center gap-2">
              <code className="flex-1 overflow-auto rounded-lg bg-[color:var(--site-surface)] px-3 py-2 text-[0.8rem]" style={{ fontFamily: "var(--font-mono)" }}>
                npx onboarding-frame add {pattern.slug}/{variant}
              </code>
              <CopyButton value={`npx onboarding-frame add ${pattern.slug}/${variant}`} />
            </div>
          </div>
        </div>
      )}

      {tab === "events" && (
        <div className="rounded-xl border border-[color:var(--site-border)]">
          {events.length === 0 ? (
            <p className="p-8 text-center text-sm text-[color:var(--site-muted)]">
              Interact with the preview — every analytics event the flow emits appears here.
            </p>
          ) : (
            <ul className="divide-y divide-[color:var(--site-border)]">
              {events.map((event, i) => (
                <li key={i} className="flex flex-wrap items-center gap-3 px-4 py-2.5 text-sm">
                  <code
                    className="rounded bg-[color:var(--site-surface)] px-2 py-0.5 text-[0.78rem] font-semibold"
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    {event.name}
                  </code>
                  {event.targetId && (
                    <span className="text-[color:var(--site-muted)]">{event.targetId}</span>
                  )}
                  {event.data ? (
                    <span className="truncate text-[0.78rem] text-[color:var(--site-muted)]">
                      {JSON.stringify(event.data)}
                    </span>
                  ) : null}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
