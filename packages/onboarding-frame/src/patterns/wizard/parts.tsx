"use client";

import type { CSSProperties, ReactNode } from "react";
import type {
  FieldValue,
  ReviewCard,
  WizardConfig,
  WizardSidePanel,
} from "../../types";
import { cn } from "../../lib/cn";
import { Breadcrumbs, Button, Dots, ProgressBar, Stars } from "../../ui/primitives";
import { ChevronLeft, ChevronRight, Check, Spinner } from "../../ui/icons";

/* ------------------------------------------------------------------ *
 * Assistant orb
 * ------------------------------------------------------------------ */

/**
 * Grainy gradient sphere used as an assistant's identity.
 *
 * The grain is an inline SVG turbulence layer, so the orb stays crisp at any
 * size and needs no image asset.
 */
export function Orb({
  stops,
  size = 136,
  className,
}: {
  stops?: string[];
  size?: number;
  className?: string;
}) {
  const [a, b, c] = [
    stops?.[0] ?? "#f9a8c0",
    stops?.[1] ?? "#f2f0ec",
    stops?.[2] ?? "#8fc4ec",
  ];
  return (
    <div
      aria-hidden
      className={cn("relative shrink-0 rounded-full", className)}
      style={{
        width: size,
        height: size,
        background: `radial-gradient(60% 55% at 30% 25%, ${a} 0%, transparent 62%),
                     radial-gradient(65% 60% at 72% 72%, ${c} 0%, transparent 64%),
                     ${b}`,
      }}
    >
      <svg className="absolute inset-0 size-full rounded-full opacity-[0.45] mix-blend-overlay">
        <filter id="ob-grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="3" />
        </filter>
        <circle cx="50%" cy="50%" r="50%" filter="url(#ob-grain)" />
      </svg>
    </div>
  );
}

/** Drifting glyph tiles behind a welcome screen. Positions are deterministic. */
/**
 * Ambient logo tiles behind a welcome screen.
 *
 * The reference scatters app tiles across the canvas at varying depth — some
 * crisp, most blurred back — so the headline reads against a busy but quiet
 * field. Two things matter and were previously missing: the tiles are *logos*,
 * so each is a slot rather than an invented mark, and the scatter leaves the
 * middle alone. A tile landing under the headline is the one placement that
 * makes the screen look accidental.
 */
export function AmbientTiles({ tiles }: { tiles: string[] }) {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {tiles.map((label, i) => {
        // Golden-angle scatter: spread without the banding a modulus gives.
        const a = i * 137.508;
        const r = 0.34 + ((i * 0.13) % 0.62);
        const x = 50 + Math.cos((a * Math.PI) / 180) * r * 52;
        const y = 50 + Math.sin((a * Math.PI) / 180) * r * 46;

        // Keep the middle clear for the headline and its call to action.
        const clear = Math.abs(x - 50) < 21 && Math.abs(y - 50) < 19;
        if (clear) return null;

        // Depth: a couple sit forward, the rest recede and blur.
        const depth = ((i * 3) % 7) / 6;
        const near = depth > 0.82;
        return (
          <span
            key={`${label}-${i}`}
            title={label}
            className="absolute grid place-items-center rounded-[13px] bg-[color:var(--ob-surface)] [box-shadow:var(--ob-shadow)]"
            style={{
              left: `${x}%`,
              top: `${y}%`,
              width: 54,
              height: 54,
              opacity: near ? 0.96 : 0.2 + depth * 0.55,
              filter: near ? undefined : `blur(${(1 - depth) * 3.4}px)`,
              transform: `translate(-50%, -50%) scale(${0.82 + depth * 0.3})`,
            }}
          >
            <span
              className="rounded-[7px] border border-dashed border-[color:var(--ob-border-strong)]"
              style={{ width: 24, height: 24 }}
            />
          </span>
        );
      })}
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * Header
 * ------------------------------------------------------------------ */

export interface WizardHeaderProps {
  config: WizardConfig;
  index: number;
  total: number;
  onBack?: () => void;
  onGoTo?: (index: number) => void;
  /** `edge` welds a thick bar to the very top of the viewport. */
  progressPlacement?: "inset" | "edge";
  showCounter?: boolean;
  right?: ReactNode;
  className?: string;
}

export function WizardHeader({
  config,
  index,
  total,
  onBack,
  onGoTo,
  progressPlacement = "inset",
  showCounter,
  right,
  className,
}: WizardHeaderProps) {
  const style =
    config.progressStyle ?? (config.showProgress === false ? "none" : "bar");
  const canBack = config.showBack !== false && index > 0;

  if (progressPlacement === "edge") {
    return (
      <>
        <div className="fixed inset-x-0 top-0 z-30 h-1.5 bg-[color:var(--ob-surface-2)]">
          <div
            className="h-full bg-[color:var(--ob-brand)] transition-[width] duration-500 ease-out"
            style={{ width: `${((index + 1) / Math.max(total, 1)) * 100}%` }}
          />
        </div>
        <header
          className={cn(
            "flex items-center justify-between px-6 pt-6 sm:px-10",
            className,
          )}
        >
          {canBack ? (
            <button
              type="button"
              onClick={onBack}
              className="flex items-center gap-1 text-sm text-[color:var(--ob-fg-soft)] hover:text-[color:var(--ob-fg)]"
            >
              <ChevronLeft className="size-4" /> Back
            </button>
          ) : (
            <span />
          )}
          {showCounter && (
            <span className="text-sm text-[color:var(--ob-muted)]">
              {index + 1} of {total}
            </span>
          )}
          {right}
        </header>
      </>
    );
  }

  return (
    <header
      className={cn("flex items-center gap-4 px-6 pt-6 sm:px-10", className)}
    >
      {canBack ? (
        <button
          type="button"
          onClick={onBack}
          aria-label="Go back"
          className="grid size-9 shrink-0 place-items-center rounded-[10px] text-[color:var(--ob-fg-soft)] transition-colors hover:bg-[color:var(--ob-surface-2)] hover:text-[color:var(--ob-fg)]"
        >
          <ChevronLeft />
        </button>
      ) : (
        <span className="size-9 shrink-0" />
      )}

      <div className="flex flex-1 items-center justify-center">
        {style === "bar" && (
          <ProgressBar value={index + 1} total={total} className="max-w-2xl" />
        )}
        {style === "dots" && (
          <Dots count={total} active={index} onSelect={onGoTo} />
        )}
        {style === "breadcrumb" && (
          <Breadcrumbs
            items={config.steps.map((s) => ({
              id: s.id,
              label: s.breadcrumbLabel ?? s.title,
            }))}
            activeIndex={index}
            onSelect={onGoTo}
          />
        )}
      </div>

      <div className="flex size-9 shrink-0 items-center justify-end">{right}</div>
    </header>
  );
}

/** Brand lockup used by the warm-survey header. */
export function BrandMark({
  glyph,
  name,
}: {
  glyph?: string;
  name?: string;
}) {
  if (!glyph && !name) return null;
  return (
    <span className="flex items-center gap-2 text-[1.05rem] font-extrabold">
      {glyph && <span aria-hidden>{glyph}</span>}
      {name}
    </span>
  );
}

/* ------------------------------------------------------------------ *
 * Side panels
 * ------------------------------------------------------------------ */

export function SidePanel({
  panel,
  values,
}: {
  panel: WizardSidePanel;
  values: Record<string, FieldValue>;
}) {
  switch (panel.kind) {
    case "summary":
      return (
        <div className="grid content-start gap-8 p-8 sm:p-12">
          {panel.title && (
            <h3 className="text-lg font-bold text-[color:var(--ob-fg-soft)]">
              {panel.title}
            </h3>
          )}
          {panel.stats && (
            <div className="flex flex-wrap gap-10">
              {panel.stats.map((stat) => (
                <div key={stat.label}>
                  <p className="text-4xl font-extrabold tracking-tight">
                    {stat.value}
                  </p>
                  <p className="mt-1 flex items-center gap-1.5 text-sm text-[color:var(--ob-muted)]">
                    <span
                      aria-hidden
                      className="size-1.5 rounded-full"
                      style={{ background: stat.tone ?? "var(--ob-brand)" }}
                    />
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          )}
          {panel.groups?.map((group) => (
            <div key={group.heading} className="grid gap-4">
              <h4 className="text-[0.72rem] font-bold uppercase tracking-wider text-[color:var(--ob-muted)]">
                {group.heading}
              </h4>
              {group.rows.map((row) => (
                <div key={row.label} className="grid gap-2">
                  <div className="flex items-baseline justify-between text-[0.95rem]">
                    <span className="font-semibold">
                      {row.label}
                      {row.hint && (
                        <span className="ml-2 font-normal text-[color:var(--ob-muted)]">
                          {row.hint}
                        </span>
                      )}
                    </span>
                    <span className="font-semibold tabular-nums">{row.value}</span>
                  </div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-[color:var(--ob-surface-3)]">
                    <div
                      className="h-full rounded-full bg-[linear-gradient(90deg,var(--ob-brand),color-mix(in_oklab,var(--ob-brand)_40%,white))] transition-[width] duration-700"
                      style={{ width: `${row.pct ?? 0}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      );

    case "diagram": {
      const nodes = panel.nodes ?? [];
      return (
        <div className="grid place-items-center p-10">
          <div className="relative grid size-[320px] place-items-center">
            <div className="absolute size-[300px] rounded-full border border-[color:var(--ob-border)]" />
            <div className="absolute size-[210px] rounded-full border border-[color:var(--ob-border)]" />
            <div className="relative z-10 grid size-24 place-items-center rounded-full bg-[color:var(--ob-surface)] text-3xl [box-shadow:var(--ob-shadow)]">
              {panel.glyph ?? "✳"}
            </div>
            {nodes.map((node, i) => {
              const angle = (i / Math.max(nodes.length, 1)) * Math.PI * 2 - Math.PI / 2;
              return (
                <span
                  key={node.label}
                  className="absolute flex items-center gap-1 whitespace-nowrap rounded-full px-2.5 py-1 text-[0.68rem] font-bold uppercase"
                  style={{
                    background: node.tone ?? "var(--ob-surface-2)",
                    left: `calc(50% + ${Math.cos(angle) * 150}px)`,
                    top: `calc(50% + ${Math.sin(angle) * 150}px)`,
                    transform: "translate(-50%,-50%)",
                  }}
                >
                  {node.glyph} {node.label}
                </span>
              );
            })}
          </div>
          {panel.leaves && (
            <div className="mt-6 flex flex-wrap justify-center gap-2">
              {panel.leaves.map((leaf) => (
                <span
                  key={leaf}
                  className="rounded-[8px] border border-[color:var(--ob-border)] bg-[color:var(--ob-surface)] px-3 py-1.5 text-xs text-[color:var(--ob-fg-soft)]"
                >
                  {leaf}
                </span>
              ))}
            </div>
          )}
        </div>
      );
    }

    case "medallion":
      return (
        <div className="relative grid h-full place-items-center">
          <div
            aria-hidden
            className="absolute inset-x-0 top-1/2 h-px bg-[color:var(--ob-border)]"
          />
          <div className="relative grid size-32 place-items-center rounded-full bg-[color:var(--ob-surface)] text-4xl [box-shadow:var(--ob-shadow-lg)]">
            {panel.glyph ?? "🛡"}
          </div>
        </div>
      );

    case "timeline":
      return (
        <div className="grid content-center gap-8 p-8 sm:p-12">
          {panel.milestones?.map((milestone, i) => (
            <div key={milestone.title} className="relative flex gap-4 pb-2">
              {i < (panel.milestones?.length ?? 0) - 1 && (
                <span
                  aria-hidden
                  className="absolute left-[13px] top-7 h-full w-[3px] rounded-full bg-[color:var(--ob-brand)] opacity-40"
                />
              )}
              <span className="relative z-10 grid size-7 shrink-0 place-items-center rounded-full bg-[color:var(--ob-brand)] text-xs text-[color:var(--ob-brand-fg)]">
                {milestone.glyph ?? i + 1}
              </span>
              <div>
                <p className="font-bold">{milestone.title}</p>
                {milestone.body && (
                  <p className="mt-1 text-[0.92rem] leading-relaxed text-[color:var(--ob-fg-soft)]">
                    {milestone.body}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      );

    case "social-proof":
      return (
        <div className="grid content-start gap-7 p-8 sm:p-12">
          {panel.awards && (
            <div className="flex flex-wrap justify-center gap-6 opacity-50">
              {panel.awards.map((award) => (
                <span
                  key={award}
                  className="text-center text-[0.72rem] font-semibold leading-tight"
                >
                  🏅
                  <br />
                  {award}
                </span>
              ))}
            </div>
          )}
          {panel.proofHeadline && (
            <h3 className="text-center text-2xl font-extrabold text-[color:var(--ob-brand)]">
              {panel.proofHeadline}
            </h3>
          )}
          <div className="grid gap-3">
            {panel.testimonials?.map((testimonial) => (
              <figure
                key={testimonial.title}
                className="rounded-[var(--ob-radius-lg)] bg-[color:var(--ob-surface)] p-5 [box-shadow:var(--ob-shadow)]"
              >
                <Stars count={testimonial.stars ?? 5} />
                <figcaption className="mt-2 font-bold">
                  {testimonial.title}
                </figcaption>
                <blockquote className="mt-1 text-[0.92rem] leading-relaxed text-[color:var(--ob-fg-soft)]">
                  {testimonial.body}
                </blockquote>
              </figure>
            ))}
          </div>
        </div>
      );

    case "media":
      return (
        <div className="grid h-full place-items-center p-6">
          <div
            className="relative flex aspect-[4/5] w-full max-w-xl items-end overflow-hidden rounded-[var(--ob-radius-lg)]"
            style={{
              background:
                panel.media?.startsWith("http") || panel.media?.startsWith("/")
                  ? `center/cover no-repeat url(${panel.media})`
                  : (panel.media ??
                    "linear-gradient(160deg,#2b3a44,#16202a)"),
            }}
          >
            {(panel.caption || panel.metaChips) && (
              <div className="m-4 w-full rounded-[var(--ob-radius)] bg-black/45 p-4 text-white backdrop-blur-md">
                {panel.caption && (
                  <p className="text-[0.88rem] leading-relaxed">{panel.caption}</p>
                )}
                {panel.metaChips && (
                  <div className="mt-3 flex flex-wrap items-center gap-4 text-[0.78rem] opacity-80">
                    {panel.metaChips.map((chip) => (
                      <span key={chip.label} className="flex items-center gap-1.5">
                        {chip.glyph} {chip.label}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      );

    case "custom":
      return (
        <div className="grid h-full place-items-center p-8">
          {panel.render?.({
            values,
            setValue: () => {},
            next: () => {},
            back: () => {},
          })}
        </div>
      );

    default:
      return null;
  }
}

/* ------------------------------------------------------------------ *
 * Review + confirm
 * ------------------------------------------------------------------ */

export function ReviewGrid({ cards }: { cards: ReviewCard[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {cards.map((card) => (
        <div
          key={card.id}
          className="flex min-h-[220px] flex-col rounded-[var(--ob-radius-lg)] border border-[color:var(--ob-border)] bg-[color:var(--ob-surface)] p-5"
        >
          <div className="flex items-center gap-2">
            <h4 className="font-bold">{card.title}</h4>
            {card.action && (
              <span className="text-sm text-[color:var(--ob-muted)]">
                {card.action.label}
              </span>
            )}
            {card.linkLabel && (
              <span className="ml-auto flex items-center gap-0.5 text-sm text-[color:var(--ob-muted)]">
                {card.linkLabel}
                <ChevronRight className="size-4" />
              </span>
            )}
          </div>
          <p className="mt-3 text-4xl font-extrabold tracking-tight">{card.value}</p>
          {card.unit && (
            <p className="mt-1 text-sm text-[color:var(--ob-muted)]">{card.unit}</p>
          )}
          <div className="mt-auto pt-6">
            {card.emptyNote && (
              <p className="text-sm italic text-[color:var(--ob-muted)]">
                {card.emptyNote}
              </p>
            )}
            {card.chip && (
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-[color:var(--ob-surface-2)] px-2.5 py-1 text-[0.7rem] font-bold uppercase">
                  {card.chip.glyph} {card.chip.label}
                </span>
                {card.chip.value && (
                  <span className="ml-auto font-semibold tabular-nums">
                    {card.chip.value}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export function ConfirmCard({
  title,
  summary,
  avatar,
  avatarTone,
  editLabel,
  onEdit,
}: {
  title: string;
  summary: string;
  avatar?: string;
  avatarTone?: string;
  editLabel?: string;
  onEdit?: () => void;
}) {
  return (
    <div className="flex items-start gap-5 rounded-[var(--ob-radius-lg)] bg-[color:var(--ob-surface)] p-6 [box-shadow:var(--ob-shadow)]">
      <span
        aria-hidden
        className="grid size-20 shrink-0 place-items-center rounded-full text-3xl"
        style={{ background: avatarTone ?? "var(--ob-surface-2)" }}
      >
        {avatar}
      </span>
      <div className="flex-1 pt-1">
        <div className="flex items-start gap-3">
          <h3 className="flex-1 text-2xl font-extrabold tracking-tight">{title}</h3>
          {editLabel && (
            <Button tone="outline" size="sm" onClick={onEdit}>
              {editLabel}
            </Button>
          )}
        </div>
        <p className="mt-1 text-[1.02rem] leading-relaxed text-[color:var(--ob-fg-soft)]">
          {summary}
        </p>
      </div>
    </div>
  );
}

export function Interstitial({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  return (
    <div className="grid place-items-center gap-4 text-center">
      <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">{title}</h2>
      {description && (
        <p className="text-[color:var(--ob-muted)]">{description}</p>
      )}
      <Spinner className="mt-4 size-7 animate-spin text-[color:var(--ob-muted)]" />
    </div>
  );
}

/** Renders `[label](href)` spans inside otherwise plain text. */
export function RichText({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  const parts = text.split(/(\[[^\]]+\]\([^)]*\))/g);
  return (
    <span className={className}>
      {parts.map((part, i) => {
        const match = /^\[([^\]]+)\]\(([^)]*)\)$/.exec(part);
        if (!match) return <span key={i}>{part}</span>;
        return (
          <a
            key={i}
            href={match[2] || "#"}
            className="underline underline-offset-2 hover:opacity-80"
          >
            {match[1]}
          </a>
        );
      })}
    </span>
  );
}

export const panelSurface: CSSProperties = {
  background: "var(--ob-surface-2)",
};

export { Check };
