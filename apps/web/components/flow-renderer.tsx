"use client";

import { useMemo, useState } from "react";
import {
  Checklist,
  Dashboard,
  EmptyState,
  OnboardingProvider,
  Plans,
  Tour,
  Wizard,
  type ChecklistConfig,
  type DashboardConfig,
  type EmptyStateConfig,
  type OnboardingEvent,
  type OnboardingTheme,
  type PatternKind,
  type PlansConfig,
  type TourConfig,
  type WizardConfig,
} from "onboarding-frame";

export interface FlowRendererProps {
  kind: PatternKind;
  config: unknown;
  theme?: OnboardingTheme;
  /** Bumping this remounts the flow, resetting it to step one. */
  resetKey?: number;
  onEvent?: (event: OnboardingEvent) => void;
  inline?: boolean;
}

/**
 * Renders any pattern from a config object.
 *
 * Everything in the docs site and the playground goes through here, so the
 * demos and the exported config can never drift apart.
 */
export function FlowRenderer({
  kind,
  config,
  theme,
  resetKey = 0,
  onEvent,
  inline = true,
}: FlowRendererProps) {
  const [done, setDone] = useState<string | null>(null);

  const body = useMemo(() => {
    switch (kind) {
      case "wizard":
        return (
          <Wizard
            config={config as WizardConfig}
            inline={inline}
            onComplete={() => setDone("Flow complete — the collected answers are in the event log.")}
          />
        );
      case "checklist":
        return (
          <div className="grid min-h-[520px] place-items-center p-8">
            <div className="w-full max-w-md">
              <Checklist config={config as ChecklistConfig} inline />
            </div>
          </div>
        );
      case "tour":
        return (
          <div className="grid min-h-[560px] place-items-center p-6">
            <Tour config={config as TourConfig} inline />
          </div>
        );
      case "empty-state":
        return (
          <div className="grid min-h-[520px] place-items-center p-8">
            <div className="w-full max-w-3xl">
              <EmptyState config={config as EmptyStateConfig} />
            </div>
          </div>
        );
      case "plans":
        return <Plans config={config as PlansConfig} inline />;
      case "dashboard":
        return <Dashboard config={config as DashboardConfig} />;
      default:
        return null;
    }
  }, [kind, config, inline]);

  return (
    <OnboardingProvider key={resetKey} theme={theme} onEvent={onEvent}>
      <div className="relative" style={{ background: "var(--ob-bg)" }}>
        {body}
        {done && (
          <div
            role="status"
            className="pointer-events-none absolute inset-x-0 bottom-4 mx-auto w-fit rounded-full bg-[color:var(--ob-cta-bg)] px-4 py-2 text-sm font-semibold text-[color:var(--ob-cta-fg)]"
          >
            {done}
          </div>
        )}
      </div>
    </OnboardingProvider>
  );
}
