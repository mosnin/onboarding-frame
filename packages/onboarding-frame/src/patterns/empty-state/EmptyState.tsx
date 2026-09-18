"use client";

import { useState, type ReactNode } from "react";
import type { EmptyStateConfig } from "../../types";
import { cn } from "../../lib/cn";
import { useOnboarding } from "../../provider/OnboardingProvider";
import { Button } from "../../ui/primitives";
import { Check, Sparkle } from "../../ui/icons";

export interface EmptyStateProps {
  config: EmptyStateConfig;
  onAction?: (actionId: string) => void;
  /** Called when the sample-data affordance is used. */
  onLoadSampleData?: () => void;
  /** Rendered once sample data has been loaded. */
  populated?: ReactNode;
  className?: string;
}

/**
 * First-run empty state.
 *
 * `sample-data` keeps the before/after transition inside the component: press
 * the affordance and it swaps to `populated`, which is the moment that teaches
 * people what the screen is for.
 */
export function EmptyState({
  config,
  onAction,
  onLoadSampleData,
  populated,
  className,
}: EmptyStateProps) {
  const { emit } = useOnboarding();
  const [loaded, setLoaded] = useState(false);

  if (loaded && populated) {
    return <div className="ob-animate-in">{populated}</div>;
  }

  const loadSample = () => {
    emit("sample_data_loaded", config.id);
    setLoaded(true);
    onLoadSampleData?.();
  };

  const actions = (
    <div className="flex flex-wrap items-center justify-center gap-3">
      {config.primaryCta && (
        <Button tone="brand" onClick={() => onAction?.(config.primaryCta!.id)}>
          {config.primaryCta.label}
        </Button>
      )}
      {config.variant === "sample-data" && (
        <Button tone="outline" onClick={loadSample}>
          <Sparkle className="size-4" />
          {config.sampleDataLabel ?? "Load demo data"}
        </Button>
      )}
      {config.secondaryCta && (
        <Button tone="ghost" onClick={() => onAction?.(config.secondaryCta!.id)}>
          {config.secondaryCta.label}
        </Button>
      )}
    </div>
  );

  const copy = (
    <div className="grid max-w-md gap-2.5 text-center">
      <h3 className="text-xl font-bold tracking-tight">{config.title}</h3>
      {config.body && (
        <p className="text-pretty leading-relaxed text-[color:var(--ob-muted)]">
          {config.body}
        </p>
      )}
      {config.hints && (
        <ul className="mx-auto mt-2 grid gap-1.5 text-left">
          {config.hints.map((hint) => (
            <li
              key={hint}
              className="flex items-start gap-2 text-[0.88rem] text-[color:var(--ob-fg-soft)]"
            >
              <Check className="mt-0.5 size-4 shrink-0 text-[color:var(--ob-success)]" />
              {hint}
            </li>
          ))}
        </ul>
      )}
    </div>
  );

  /* Ghost rows hint at the shape of the data that will land here. */
  if (config.variant === "ghost-preview") {
    return (
      <div
        className={cn(
          "relative overflow-hidden rounded-[var(--ob-radius-lg)] border border-[color:var(--ob-border)] bg-[color:var(--ob-surface)] p-8",
          className,
        )}
      >
        <div aria-hidden className="grid gap-3 opacity-40 [mask-image:linear-gradient(black,transparent)]">
          {Array.from({ length: config.ghostRows ?? 5 }, (_, i) => (
            <div
              key={i}
              className="flex items-center gap-3 rounded-[var(--ob-radius)] border border-[color:var(--ob-border)] p-4"
            >
              <span className="size-9 shrink-0 rounded-full bg-[color:var(--ob-surface-3)]" />
              <span className="h-3 flex-1 rounded-full bg-[color:var(--ob-surface-3)]" style={{ maxWidth: `${70 - i * 8}%` }} />
              <span className="h-3 w-14 rounded-full bg-[color:var(--ob-surface-3)]" />
            </div>
          ))}
        </div>
        <div className="absolute inset-0 grid place-items-center">
          <div className="grid justify-items-center gap-6 px-6">
            {copy}
            {actions}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "grid justify-items-center gap-6 rounded-[var(--ob-radius-lg)] border border-dashed border-[color:var(--ob-border-strong)] bg-[color:var(--ob-surface)] px-6 py-16",
        className,
      )}
    >
      {config.glyph && (
        <span
          aria-hidden
          className="grid size-20 place-items-center rounded-full bg-[color:var(--ob-surface-2)] text-4xl"
        >
          {config.glyph}
        </span>
      )}
      {copy}
      {actions}
    </div>
  );
}
