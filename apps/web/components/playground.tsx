"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { presets, type OnboardingTheme, type PatternKind } from "onboarding-frame";
import { FlowRenderer } from "./flow-renderer";
import { CodeBlock } from "./code-block";
import { CopyButton } from "./copy-button";
import { catalog } from "@/lib/catalog";
import { agentPrompt, usageSnippet } from "@/lib/snippets";

const BRANDS = [
  { id: "#2f6bff", label: "Blue" },
  { id: "#1fd760", label: "Green" },
  { id: "#ccff00", label: "Acid" },
  { id: "#7c4dff", label: "Violet" },
  { id: "#f5c98a", label: "Sand" },
  { id: "#ff2d6f", label: "Pink" },
];

const FONTS = [
  { id: "Inter", stack: '"Inter Variable", Inter, ui-sans-serif, system-ui, sans-serif' },
  { id: "Geist", stack: '"Geist", "Inter Variable", ui-sans-serif, system-ui, sans-serif' },
  { id: "Jakarta", stack: '"Plus Jakarta Sans", "Inter Variable", ui-sans-serif, sans-serif' },
  { id: "Manrope", stack: '"Manrope", "Inter Variable", ui-sans-serif, sans-serif' },
  { id: "DM Sans", stack: '"DM Sans", "Inter Variable", ui-sans-serif, sans-serif' },
  { id: "Grotesk", stack: '"Space Grotesk", "Inter Variable", ui-sans-serif, sans-serif' },
];

const RADII = [
  { id: "0.35rem", label: "Sharp" },
  { id: "0.75rem", label: "Default" },
  { id: "1.1rem", label: "Soft" },
  { id: "1.6rem", label: "Pill" },
];

function Control({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid gap-2">
      <span className="text-[0.72rem] font-bold uppercase tracking-wide text-[color:var(--site-muted)]">
        {label}
      </span>
      {children}
    </div>
  );
}

/**
 * Live playground.
 *
 * Controls mutate a real config object, the preview renders that object, and
 * the export tabs serialise the very same object — so what you copy is exactly
 * what you just looked at.
 */
export function Playground() {
  const search = useSearchParams();
  const initialPattern = search.get("pattern") ?? "wizard";
  const initialVariant = search.get("variant");

  const [patternSlug, setPatternSlug] = useState(initialPattern);
  const pattern = catalog.find((p) => p.slug === patternSlug) ?? catalog[0]!;
  const [variant, setVariant] = useState(
    initialVariant ?? pattern.variants[0]!.id,
  );
  const [resetKey, setResetKey] = useState(0);
  const [tab, setTab] = useState<"config" | "prompt" | "code">("config");

  // Theme overrides layered on top of the preset's own theme.
  const [scheme, setScheme] = useState<"light" | "dark" | "preset">("preset");
  const [brand, setBrand] = useState<string | null>(null);
  const [radius, setRadius] = useState<string | null>(null);
  const [font, setFont] = useState<string | null>(null);
  const [density, setDensity] = useState(1);
  const [title, setTitle] = useState("");

  const preset = useMemo(() => {
    const group = presets[pattern.kind as PatternKind] as Record<string, unknown>;
    const entry = group?.[variant];
    if (entry && typeof entry === "object" && "config" in entry) {
      return entry as { config: Record<string, unknown>; theme?: OnboardingTheme };
    }
    return { config: (entry ?? {}) as Record<string, unknown>, theme: undefined };
  }, [pattern.kind, variant]);

  const theme: OnboardingTheme = useMemo(() => {
    const base = { ...(preset.theme ?? {}) };
    if (scheme !== "preset") base.scheme = scheme;
    if (brand) base.brand = brand;
    if (radius) base.radius = radius;
    if (font) base.fontFamily = font;
    base.density = density;
    return base;
  }, [preset.theme, scheme, brand, radius, font, density]);

  const config = useMemo(() => {
    const next = { ...preset.config };
    if (title.trim()) {
      // Wizards title their steps; every other pattern has a top-level title.
      if (pattern.kind === "wizard" && Array.isArray(next.steps)) {
        const steps = [...(next.steps as Record<string, unknown>[])];
        if (steps[0]) steps[0] = { ...steps[0], title: title.trim() };
        next.steps = steps;
      } else {
        next.title = title.trim();
      }
    }
    return next;
  }, [preset.config, title, pattern.kind]);

  const blueprint = useMemo(
    () => ({
      $schema: "https://onboarding-frame.dev/schema/v1.json",
      pattern: pattern.kind,
      theme,
      config,
    }),
    [pattern.kind, theme, config],
  );

  const blueprintJson = useMemo(() => JSON.stringify(blueprint, null, 2), [blueprint]);
  const prompt = useMemo(
    () => agentPrompt(pattern.kind as PatternKind, variant, config, theme),
    [pattern.kind, variant, config, theme],
  );
  const snippet = useMemo(
    () => usageSnippet(pattern.kind as PatternKind, variant, theme),
    [pattern.kind, variant, theme],
  );

  const selectPattern = (slug: string) => {
    const next = catalog.find((p) => p.slug === slug);
    if (!next) return;
    setPatternSlug(slug);
    setVariant(next.variants[0]!.id);
    setResetKey((k) => k + 1);
  };

  return (
    <main className="mx-auto max-w-[1700px] px-4 py-8 sm:px-6">
      <header className="mb-6">
        <h1 className="text-[2rem] font-extrabold tracking-tight">Playground</h1>
        <p className="mt-2 max-w-3xl text-[color:var(--site-muted)]">
          Tune a flow, then copy the config — or a ready-to-paste prompt that hands
          the whole thing to a coding agent.
        </p>
      </header>

      <div className="grid gap-6 xl:grid-cols-[300px_1fr]">
        {/* Controls */}
        <aside className="grid content-start gap-6 rounded-xl border border-[color:var(--site-border)] p-5">
          <Control label="Pattern">
            <select
              value={patternSlug}
              onChange={(e) => selectPattern(e.target.value)}
              className="w-full rounded-lg border border-[color:var(--site-border)] bg-[color:var(--site-bg)] px-3 py-2 text-sm"
            >
              {catalog.map((entry) => (
                <option key={entry.slug} value={entry.slug}>
                  {entry.name}
                </option>
              ))}
            </select>
          </Control>

          <Control label="Variant">
            <div className="grid gap-1.5">
              {pattern.variants.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setVariant(item.id);
                    setResetKey((k) => k + 1);
                  }}
                  className={`rounded-lg px-3 py-2 text-left text-sm font-medium transition-colors ${
                    variant === item.id
                      ? "bg-[color:var(--site-fg)] text-[color:var(--site-bg)]"
                      : "border border-[color:var(--site-border)] text-[color:var(--site-muted)] hover:text-[color:var(--site-fg)]"
                  }`}
                >
                  {item.name}
                </button>
              ))}
            </div>
          </Control>

          <Control label="Colour scheme">
            <div className="grid grid-cols-3 gap-1.5">
              {(["preset", "light", "dark"] as const).map((value) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setScheme(value)}
                  className={`rounded-lg border px-2 py-1.5 text-xs font-semibold capitalize ${
                    scheme === value
                      ? "border-transparent bg-[color:var(--site-fg)] text-[color:var(--site-bg)]"
                      : "border-[color:var(--site-border)] text-[color:var(--site-muted)]"
                  }`}
                >
                  {value}
                </button>
              ))}
            </div>
          </Control>

          <Control label="Brand colour">
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setBrand(null)}
                className={`rounded-lg border px-2.5 py-1.5 text-xs font-semibold ${
                  brand === null
                    ? "border-transparent bg-[color:var(--site-fg)] text-[color:var(--site-bg)]"
                    : "border-[color:var(--site-border)] text-[color:var(--site-muted)]"
                }`}
              >
                Preset
              </button>
              {BRANDS.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  aria-label={item.label}
                  aria-pressed={brand === item.id}
                  onClick={() => setBrand(item.id)}
                  className={`size-8 rounded-lg border-2 transition-transform ${
                    brand === item.id
                      ? "scale-110 border-[color:var(--site-fg)]"
                      : "border-transparent"
                  }`}
                  style={{ background: item.id }}
                />
              ))}
            </div>
          </Control>

          <Control label="Typeface">
            <select
              value={font ?? ""}
              onChange={(e) => setFont(e.target.value || null)}
              className="w-full rounded-lg border border-[color:var(--site-border)] bg-[color:var(--site-bg)] px-3 py-2 text-sm"
            >
              <option value="">Preset</option>
              {FONTS.map((item) => (
                <option key={item.id} value={item.stack}>
                  {item.id}
                </option>
              ))}
            </select>
          </Control>

          <Control label="Corner radius">
            <div className="grid grid-cols-2 gap-1.5">
              {RADII.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setRadius(radius === item.id ? null : item.id)}
                  className={`rounded-lg border px-2 py-1.5 text-xs font-semibold ${
                    radius === item.id
                      ? "border-transparent bg-[color:var(--site-fg)] text-[color:var(--site-bg)]"
                      : "border-[color:var(--site-border)] text-[color:var(--site-muted)]"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </Control>

          <Control label={`Density · ${density.toFixed(2)}`}>
            <input
              type="range"
              min={0.8}
              max={1.3}
              step={0.05}
              value={density}
              onChange={(e) => setDensity(Number(e.target.value))}
              className="w-full accent-[color:var(--site-accent)]"
            />
          </Control>

          <Control label="Headline override">
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Leave blank to keep the preset"
              className="w-full rounded-lg border border-[color:var(--site-border)] bg-[color:var(--site-bg)] px-3 py-2 text-sm"
            />
          </Control>

          <button
            type="button"
            onClick={() => setResetKey((k) => k + 1)}
            className="rounded-lg border border-[color:var(--site-border)] px-3 py-2 text-sm font-semibold"
          >
            Restart flow
          </button>
        </aside>

        {/* Preview + exports */}
        <div className="grid min-w-0 gap-5">
          <div className="overflow-hidden rounded-xl border border-[color:var(--site-border)]">
            <FlowRenderer
              kind={pattern.kind as PatternKind}
              config={config}
              theme={theme}
              resetKey={resetKey}
            />
          </div>

          <div className="grid gap-3">
            <div className="flex flex-wrap items-center gap-2">
              {(
                [
                  { id: "config", label: "Config JSON" },
                  { id: "prompt", label: "AI agent prompt" },
                  { id: "code", label: "React usage" },
                ] as const
              ).map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setTab(item.id)}
                  className={`rounded-full px-3.5 py-1.5 text-sm font-semibold transition-colors ${
                    tab === item.id
                      ? "bg-[color:var(--site-surface)] text-[color:var(--site-fg)]"
                      : "text-[color:var(--site-muted)] hover:text-[color:var(--site-fg)]"
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <div className="ml-auto flex items-center gap-2">
                <code
                  className="hidden rounded-lg bg-[color:var(--site-surface)] px-3 py-1.5 text-[0.78rem] sm:block"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  npm i onboarding-frame
                </code>
                <CopyButton value="npm i onboarding-frame" label="Copy install" />
              </div>
            </div>

            {tab === "config" && (
              <CodeBlock
                code={blueprintJson}
                language="json"
                title="blueprint.json — pattern, theme and config in one object"
              />
            )}
            {tab === "prompt" && (
              <CodeBlock
                code={prompt}
                language="markdown"
                title="Paste this into your coding agent"
              />
            )}
            {tab === "code" && <CodeBlock code={snippet} title="React usage" />}
          </div>
        </div>
      </div>
    </main>
  );
}
