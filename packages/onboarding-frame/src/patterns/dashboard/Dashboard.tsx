"use client";

import { useState, type ReactNode } from "react";
import type { DashboardConfig, QuotaMeter, StatTile } from "../../types";
import { cn } from "../../lib/cn";
import { clamp, percent } from "../../lib/utils";
import { useOnboarding } from "../../provider/OnboardingProvider";
import { Button } from "../../ui/primitives";
import { ArrowRight, ChevronRight, Sparkle } from "../../ui/icons";
import { Checklist } from "../checklist/Checklist";
import { EmptyState } from "../empty-state/EmptyState";

export interface DashboardProps {
  config: DashboardConfig;
  onAction?: (actionId: string) => void;
  /** Rendered as the main body of `workspace-hub` once data exists. */
  children?: ReactNode;
  className?: string;
}

/** Inline sparkline from normalised 0-1 points. */
function Sparkline({ points }: { points: number[] }) {
  if (points.length < 2) return null;
  const step = 100 / (points.length - 1);
  const path = points
    .map(
      (p, i) => `${i === 0 ? "M" : "L"}${i * step},${28 - clamp(p, 0, 1) * 26}`,
    )
    .join(" ");
  return (
    <svg
      viewBox="0 0 100 28"
      preserveAspectRatio="none"
      className="h-7 w-full"
      aria-hidden
    >
      <path
        d={path}
        fill="none"
        stroke="var(--ob-brand)"
        strokeWidth={2}
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

function StatCard({ stat }: { stat: StatTile }) {
  const tone =
    stat.trend === "up"
      ? "text-[color:var(--ob-success)]"
      : stat.trend === "down"
        ? "text-[color:var(--ob-danger)]"
        : "text-[color:var(--ob-muted)]";
  return (
    <div className="grid gap-3 rounded-[var(--ob-radius-lg)] border border-[color:var(--ob-border)] bg-[color:var(--ob-surface)] p-5">
      <span className="text-[0.82rem] font-semibold text-[color:var(--ob-muted)]">
        {stat.label}
      </span>
      <div className="flex items-baseline gap-2">
        <span className="text-3xl font-extrabold tracking-tight tabular-nums">
          {stat.value}
        </span>
        {stat.delta && (
          <span className={cn("text-sm font-bold", tone)}>{stat.delta}</span>
        )}
      </div>
      {stat.spark && <Sparkline points={stat.spark} />}
      {stat.hint && (
        <span className="text-[0.78rem] text-[color:var(--ob-muted)]">
          {stat.hint}
        </span>
      )}
    </div>
  );
}

function Meter({ meter }: { meter: QuotaMeter }) {
  const pct = percent(meter.used, meter.limit);
  const warn = pct >= (meter.warnAt ?? 0.8) * 100;
  return (
    <div className="grid gap-2">
      <div className="flex items-baseline justify-between">
        <span className="text-[0.92rem] font-semibold">{meter.label}</span>
        <span className="text-[0.86rem] tabular-nums text-[color:var(--ob-muted)]">
          {meter.used.toLocaleString()} / {meter.limit.toLocaleString()}
          {meter.unit ? ` ${meter.unit}` : ""}
        </span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-[color:var(--ob-surface-3)]">
        <div
          className="h-full rounded-full transition-[width] duration-700"
          style={{
            width: `${pct}%`,
            background: warn ? "var(--ob-danger)" : "var(--ob-brand)",
          }}
        />
      </div>
    </div>
  );
}

/**
 * The surface an onboarding flow delivers people into.
 *
 * Keeping it in the library matters because activation UI — the checklist, the
 * empty state, the quota nudge — lives here, not in the flow that preceded it.
 */
export function Dashboard({
  config,
  onAction,
  children,
  className,
}: DashboardProps) {
  const { emit } = useOnboarding();
  const [activeNav, setActiveNav] = useState(config.nav?.[0]?.id ?? "");
  const [seeded, setSeeded] = useState(false);

  const title = config.title.replace("{name}", config.userName ?? "there");

  const overQuota = (config.meters ?? []).some(
    (m) => percent(m.used, m.limit) >= (m.warnAt ?? 0.8) * 100,
  );

  const heading = (
    <header className="grid gap-1.5">
      <h1 className="text-[1.9rem] font-extrabold tracking-tight">{title}</h1>
      {config.subtitle && (
        <p className="text-[color:var(--ob-muted)]">{config.subtitle}</p>
      )}
    </header>
  );

  const quickActions = config.quickActions && (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {config.quickActions.map((action) => (
        <button
          key={action.id}
          type="button"
          onClick={() => {
            emit("cta_clicked", config.id, action.id);
            onAction?.(action.id);
          }}
          className="group flex items-center gap-3 rounded-[var(--ob-radius-lg)] border border-[color:var(--ob-border)] bg-[color:var(--ob-surface)] p-4 text-left transition-colors hover:border-[color:var(--ob-border-strong)]"
        >
          <span
            aria-hidden
            className="grid size-10 shrink-0 place-items-center rounded-[10px] text-xl"
            style={{ background: action.glyphTone ?? "var(--ob-surface-2)" }}
          >
            {action.glyph}
          </span>
          <span className="flex-1">
            <span className="block font-semibold">{action.label}</span>
            {action.description && (
              <span className="block text-[0.82rem] text-[color:var(--ob-muted)]">
                {action.description}
              </span>
            )}
          </span>
          <ChevronRight className="size-4 shrink-0 text-[color:var(--ob-muted)] transition-transform group-hover:translate-x-0.5" />
        </button>
      ))}
    </div>
  );

  const activity = config.activity && (
    <section className="rounded-[var(--ob-radius-lg)] border border-[color:var(--ob-border)] bg-[color:var(--ob-surface)]">
      <h2 className="border-b border-[color:var(--ob-border)] px-5 py-3.5 font-bold">
        Recent activity
      </h2>
      <ul>
        {config.activity.map((item) => (
          <li
            key={item.id}
            className="flex items-center gap-3 border-b border-[color:var(--ob-border)] px-5 py-3.5 last:border-b-0"
          >
            <span
              aria-hidden
              className="grid size-8 shrink-0 place-items-center rounded-full bg-[color:var(--ob-surface-2)] text-sm"
            >
              {item.glyph ?? item.actor.slice(0, 1)}
            </span>
            <p className="flex-1 text-[0.92rem]">
              <strong className="font-semibold">{item.actor}</strong>{" "}
              {item.action}
              {item.target && (
                <strong className="font-semibold"> {item.target}</strong>
              )}
            </p>
            <time className="shrink-0 text-[0.78rem] text-[color:var(--ob-muted)]">
              {item.at}
            </time>
          </li>
        ))}
      </ul>
    </section>
  );

  const upgrade = config.upgradeNudge && overQuota && (
    <aside className="flex flex-wrap items-center gap-4 rounded-[var(--ob-radius-lg)] border border-[color:var(--ob-brand)] bg-[color:var(--ob-brand-soft)] p-5">
      <Sparkle className="size-5 shrink-0" />
      <div className="flex-1">
        <p className="font-bold">{config.upgradeNudge.title}</p>
        {config.upgradeNudge.body && (
          <p className="mt-0.5 text-[0.9rem] text-[color:var(--ob-fg-soft)]">
            {config.upgradeNudge.body}
          </p>
        )}
      </div>
      <Button
        tone="brand"
        onClick={() => onAction?.(config.upgradeNudge!.planId ?? "upgrade")}
      >
        {config.upgradeNudge.ctaLabel}
        <ArrowRight className="size-4" />
      </Button>
    </aside>
  );

  switch (config.variant) {
    /* ---------------------- Metrics overview ---------------------- */
    case "metrics-overview":
      return (
        <div className={cn("grid gap-8 p-6 sm:p-10", className)}>
          {heading}
          {config.stats && (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {config.stats.map((stat) => (
                <StatCard key={stat.id} stat={stat} />
              ))}
            </div>
          )}
          {upgrade}
          {activity}
        </div>
      );

    /* ------------------------ Usage billing ------------------------ */
    case "usage-billing":
      return (
        <div className={cn("grid gap-8 p-6 sm:p-10", className)}>
          {heading}
          <section className="grid gap-6 rounded-[var(--ob-radius-lg)] border border-[color:var(--ob-border)] bg-[color:var(--ob-surface)] p-6">
            <h2 className="font-bold">This billing period</h2>
            {config.meters?.map((meter) => (
              <Meter key={meter.id} meter={meter} />
            ))}
          </section>
          {upgrade}
          {config.stats && (
            <div className="grid gap-4 sm:grid-cols-3">
              {config.stats.map((stat) => (
                <StatCard key={stat.id} stat={stat} />
              ))}
            </div>
          )}
        </div>
      );

    /* ------------------------ Workspace hub ------------------------ */
    case "workspace-hub":
      return (
        <div className={cn("flex min-h-[620px]", className)}>
          <nav className="hidden w-56 shrink-0 flex-col gap-1 border-r border-[color:var(--ob-border)] bg-[color:var(--ob-surface)] p-3 sm:flex">
            {config.nav?.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveNav(item.id)}
                aria-current={activeNav === item.id}
                className={cn(
                  "flex items-center gap-2.5 rounded-[var(--ob-radius-sm)] px-3 py-2 text-left text-[0.92rem] font-medium transition-colors",
                  activeNav === item.id
                    ? "bg-[color:var(--ob-surface-2)] font-semibold"
                    : "text-[color:var(--ob-fg-soft)] hover:bg-[color:var(--ob-surface-2)]",
                )}
              >
                <span aria-hidden>{item.glyph}</span>
                <span className="flex-1">{item.label}</span>
                {item.badge && (
                  <span className="rounded-full bg-[color:var(--ob-brand)] px-1.5 text-[0.68rem] font-bold text-[color:var(--ob-brand-fg)]">
                    {item.badge}
                  </span>
                )}
              </button>
            ))}
          </nav>

          <div className="grid flex-1 content-start gap-8 p-6 sm:p-10">
            {heading}
            {seeded || !config.emptyState ? (
              (children ?? (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {config.stats?.map((stat) => (
                    <StatCard key={stat.id} stat={stat} />
                  ))}
                </div>
              ))
            ) : (
              <EmptyState
                config={config.emptyState}
                onAction={onAction}
                onLoadSampleData={() => setSeeded(true)}
              />
            )}
            {activity}
          </div>
        </div>
      );

    /* ----------------------- Activation home ----------------------- */
    default:
      return (
        <div className={cn("grid gap-8 p-6 sm:p-10", className)}>
          {heading}
          <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-start">
            <div className="grid gap-8">
              {quickActions}
              {config.stats && (
                <div className="grid gap-4 sm:grid-cols-3">
                  {config.stats.map((stat) => (
                    <StatCard key={stat.id} stat={stat} />
                  ))}
                </div>
              )}
              {activity}
            </div>
            <div className="grid gap-6">
              {config.checklist && (
                <Checklist
                  config={{ ...config.checklist, variant: "dashboard-card" }}
                  onTaskAction={(task) => onAction?.(task.id)}
                />
              )}
              {upgrade}
            </div>
          </div>
        </div>
      );
  }
}
