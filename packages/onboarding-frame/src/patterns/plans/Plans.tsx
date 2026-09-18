"use client";

import { useEffect, useMemo, useState } from "react";
import type { BillingPeriod, PlanTier, PlansConfig } from "../../types";
import { Glyph } from "../../ui/glyph";
import { Icon } from "../../ui/icons";
import { cn } from "../../lib/cn";
import { formatMoney } from "../../lib/utils";
import { canvasStyle, useOnboarding } from "../../provider/OnboardingProvider";
import { useKeyboard } from "../../hooks/useKeyboard";
import { Button, Confetti, Pill, Radio } from "../../ui/primitives";
import { Check, ChevronLeft, Cross, Gift, Info } from "../../ui/icons";
import {
  CheckoutPanel,
  ComparisonMatrix,
  Countdown,
  OfferHeadline,
  PeriodToggle,
  QuietTierCard,
  QuotaMatrix,
  TermCard,
  priceFor,
} from "./parts";

export interface PlansProps {
  config: PlansConfig;
  /** Fires when a plan is chosen or checkout is submitted. */
  onSelectPlan?: (plan: PlanTier, period: BillingPeriod) => void;
  onCheckout?: (plan: PlanTier, period: BillingPeriod) => void;
  onDismiss?: () => void;
  /** Fires for the free escape hatch and footer links. */
  onAction?: (actionId: string) => void;
  className?: string;
  inline?: boolean;
}

function Dismiss({ onClick }: { onClick?: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Close"
      className="absolute right-5 top-5 z-10 grid size-9 place-items-center rounded-full text-[color:var(--ob-muted)] transition-colors hover:bg-[color:var(--ob-surface-2)] hover:text-[color:var(--ob-fg)]"
    >
      <Cross className="size-5" />
    </button>
  );
}

/**
 * Plan selection and paywall surfaces.
 *
 * `spotlight-sequence` walks value -> plans -> checkout as one flow; every
 * other variant is a single screen. All prices come from the config in minor
 * units, so currency formatting stays correct across locales.
 */
export function Plans({
  config,
  onSelectPlan,
  onCheckout,
  onDismiss,
  onAction,
  className,
  inline,
}: PlansProps) {
  const { theme, emit } = useOnboarding();
  const currency = config.currency ?? "USD";
  const [period, setPeriod] = useState<BillingPeriod>(
    config.defaultPeriod ?? "monthly",
  );
  const [selectedId, setSelectedId] = useState(
    config.plans.find((p) => p.highlighted)?.id ?? config.plans[0]?.id ?? "",
  );
  const [screen, setScreen] = useState(0);
  const [seats, setSeats] = useState(config.seats?.default ?? 1);

  const selected = useMemo(
    () => config.plans.find((p) => p.id === selectedId) ?? config.plans[0],
    [config.plans, selectedId],
  );

  useEffect(() => {
    emit("flow_started", config.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const choose = (plan: PlanTier) => {
    setSelectedId(plan.id);
    emit("plan_selected", config.id, plan.id, { period });
    onSelectPlan?.(plan, period);
  };

  const checkout = () => {
    if (!selected) return;
    emit("checkout_submitted", config.id, selected.id, { period });
    onCheckout?.(selected, period);
  };

  useKeyboard(true, { Escape: () => onDismiss?.() });

  const header = (
    <div className="grid justify-items-center gap-3.5 text-center">
      {/*
        The reference breaks its heading over two lines and colours only the
        first, which is what gives it its shape. Setting both lines the same
        colour on one line is the version that reads as a generic modal.
      */}
      <h2 className="text-balance text-[2rem] font-bold leading-[1.08] tracking-[-0.02em] sm:text-[2.85rem]">
        {config.titleAccent && (
          <span className="block text-[color:var(--ob-brand)]">
            {config.titleAccent}
          </span>
        )}
        {config.title}
      </h2>
      {config.subtitle && (
        <p className="max-w-xl text-pretty text-[1rem] text-[color:var(--ob-muted)]">
          {config.subtitle}
        </p>
      )}
      {config.promoLabel && <Pill gradient>{config.promoLabel}</Pill>}
      {config.showPeriodToggle && (
        <PeriodToggle period={period} onChange={setPeriod} />
      )}
    </div>
  );

  const shell = (children: React.ReactNode, style?: React.CSSProperties) => (
    <div
      className={cn(
        "relative flex w-full flex-col items-center justify-center gap-10 overflow-hidden px-6 py-16",
        inline ? "min-h-[680px] rounded-[var(--ob-radius-lg)]" : "min-h-screen",
        className,
      )}
      style={style}
    >
      {config.dismissible !== false && <Dismiss onClick={onDismiss} />}
      {children}
    </div>
  );

  switch (config.variant) {
    /* --------------------- Spotlight sequence --------------------- */
    case "spotlight-sequence": {
      const sequence = config.sequence ?? ["value", "plans", "checkout"];
      const current = sequence[Math.min(screen, sequence.length - 1)];
      const advance = () =>
        screen >= sequence.length - 1 ? checkout() : setScreen(screen + 1);

      return shell(
        <>
          {screen > 0 && (
            <button
              type="button"
              onClick={() => setScreen(screen - 1)}
              className="absolute left-5 top-5 flex items-center gap-1 text-sm text-[color:var(--ob-muted)] hover:text-[color:var(--ob-fg)]"
            >
              <ChevronLeft className="size-4" /> Back
            </button>
          )}

          {current === "value" && (
            <div className="ob-animate-in grid w-full justify-items-center gap-10">
              {header}
              <ComparisonMatrix config={config} />
              <Button
                tone="cta"
                size="lg"
                onClick={advance}
                className="min-w-[280px]"
              >
                {selected?.ctaLabel ?? "Subscribe now"}
              </Button>
            </div>
          )}

          {current === "plans" && (
            <div className="ob-animate-in grid w-full max-w-4xl justify-items-center gap-10">
              {header}
              <div className="grid w-full gap-4 sm:grid-cols-3">
                {config.plans.map((plan) => (
                  <TermCard
                    key={plan.id}
                    plan={plan}
                    period={period}
                    currency={currency}
                    selected={plan.id === selectedId}
                    onSelect={() => choose(plan)}
                  />
                ))}
              </div>
              {config.footnote && (
                <p className="max-w-lg text-center text-[0.82rem] leading-relaxed text-[color:var(--ob-muted)]">
                  {config.footnote}
                </p>
              )}
              <Button
                tone="cta"
                size="lg"
                onClick={advance}
                className="min-w-[280px]"
              >
                {selected?.ctaLabel ?? "Subscribe now"}
              </Button>
            </div>
          )}

          {current === "checkout" && config.checkout && selected && (
            <div className="ob-animate-in grid w-full max-w-6xl gap-10 lg:grid-cols-2 lg:items-center">
              <div className="grid content-center gap-8">
                <h2 className="text-balance text-[2.4rem] font-extrabold leading-[1.1] tracking-tight">
                  {config.title}
                </h2>
                <ul className="grid gap-5">
                  {config.checkout.benefits?.map((benefit) => (
                    <li key={benefit.label} className="flex items-center gap-4">
                      <span
                        aria-hidden
                        className="grid size-9 shrink-0 place-items-center rounded-[10px] bg-[color:var(--ob-surface-2)] text-lg"
                      >
                        <Glyph value={benefit.glyph ?? "sparkle"} size={17} />
                      </span>
                      <span className="text-[1.05rem]">{benefit.label}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <CheckoutPanel
                checkout={config.checkout}
                total={
                  priceFor(selected, period) * (period === "annual" ? 12 : 1)
                }
                currency={currency}
                onSubmit={checkout}
              />
            </div>
          )}
        </>,
        canvasStyle(theme),
      );
    }

    /* ------------------------ Quiet tiers ------------------------ */
    case "quiet-tiers":
      return shell(
        <div className="grid w-full max-w-5xl justify-items-center gap-10">
          <div className="grid justify-items-center gap-3 text-center">
            {config.promoLabel && <Pill>{config.promoLabel}</Pill>}
            <h2 className="text-balance text-[1.7rem] font-semibold tracking-tight">
              {config.title}
            </h2>
            {config.subtitle && (
              <p className="text-[color:var(--ob-muted)]">{config.subtitle}</p>
            )}
            {config.showPeriodToggle && (
              <PeriodToggle period={period} onChange={setPeriod} />
            )}
          </div>

          <div
            className="grid w-full gap-4"
            style={{
              gridTemplateColumns: `repeat(auto-fit,minmax(min(100%,260px),1fr))`,
            }}
          >
            {config.plans.map((plan) => (
              <QuietTierCard
                key={plan.id}
                plan={plan}
                period={period}
                currency={currency}
                onSelect={() => {
                  choose(plan);
                  onCheckout?.(plan, period);
                }}
              />
            ))}
          </div>

          {config.freeEscape && (
            <div className="flex items-center gap-2">
              <Button
                tone="outline"
                shape="rounded"
                onClick={() => onAction?.(config.freeEscape!.id)}
              >
                {config.freeEscape.label}
              </Button>
              {config.freeEscape.hint && (
                <span
                  title={config.freeEscape.hint}
                  className="text-[color:var(--ob-muted)]"
                >
                  <Info />
                </span>
              )}
            </div>
          )}
        </div>,
      );

    /* --------------------- Comparison table --------------------- */
    case "comparison-table":
      return shell(
        <div className="grid w-full justify-items-center gap-10">
          {header}
          <ComparisonMatrix config={config} />
          <Button
            tone="cta"
            size="lg"
            onClick={checkout}
            className="min-w-[280px]"
          >
            {selected?.ctaLabel ?? "Subscribe now"}
          </Button>
        </div>,
        canvasStyle(theme),
      );

    /* ----------------------- Quota matrix ----------------------- */
    case "quota-matrix":
      return shell(
        <div className="grid w-full justify-items-center gap-10">
          {header}
          <QuotaMatrix config={config} />
          <Button
            tone="cta"
            size="lg"
            shape="rounded"
            onClick={checkout}
            className="min-w-[128px]"
          >
            {selected?.ctaLabel ?? "Continue"}
          </Button>
        </div>,
        canvasStyle(theme),
      );

    /* ----------------------- Usage slider ----------------------- */
    case "usage-slider": {
      const range = config.seats ?? { min: 1, max: 50, default: 5 };
      const perSeat = selected ? priceFor(selected, period) : 0;
      return shell(
        <div className="grid w-full max-w-2xl justify-items-center gap-10">
          {header}
          <div className="w-full rounded-[var(--ob-radius-lg)] border border-[color:var(--ob-border)] bg-[color:var(--ob-surface)] p-8">
            <div className="flex items-baseline justify-between">
              <span className="text-[color:var(--ob-muted)]">
                {range.label ?? "Team members"}
              </span>
              <span className="text-2xl font-extrabold tabular-nums">
                {seats}
              </span>
            </div>
            <input
              type="range"
              min={range.min}
              max={range.max}
              value={seats}
              aria-label={range.label ?? "Team members"}
              onChange={(e) => setSeats(Number(e.target.value))}
              className="mt-4 w-full accent-[color:var(--ob-brand)]"
            />
            <div className="mt-8 grid gap-2 border-t border-[color:var(--ob-border)] pt-6">
              {config.plans.map((plan) => (
                <button
                  key={plan.id}
                  type="button"
                  onClick={() => choose(plan)}
                  className={cn(
                    "flex items-center gap-3 rounded-[var(--ob-radius)] border px-4 py-3.5 text-left transition-colors",
                    plan.id === selectedId
                      ? "border-[color:var(--ob-brand)] [box-shadow:0_0_0_1px_var(--ob-brand)]"
                      : "border-[color:var(--ob-border)]",
                  )}
                >
                  <Radio checked={plan.id === selectedId} />
                  <span className="flex-1 font-semibold">{plan.name}</span>
                  <span className="tabular-nums">
                    {formatMoney(
                      priceFor(plan, period) * (plan.perSeat ? seats : 1),
                      currency,
                    )}
                    /mo
                  </span>
                </button>
              ))}
            </div>
            <p className="mt-6 text-center text-sm text-[color:var(--ob-muted)]">
              {formatMoney(perSeat, currency)} per seat ·{" "}
              <strong className="text-[color:var(--ob-fg)]">
                {formatMoney(
                  perSeat * (selected?.perSeat ? seats : 1),
                  currency,
                )}
              </strong>{" "}
              billed {period}
            </p>
          </div>
          <Button
            tone="cta"
            size="lg"
            onClick={checkout}
            className="min-w-[280px]"
          >
            {selected?.ctaLabel ?? "Continue"}
          </Button>
        </div>,
      );
    }

    /* ---------------------- Trial timeline ---------------------- */
    case "trial-timeline":
      return shell(
        <div className="grid w-full max-w-6xl gap-12 lg:grid-cols-2 lg:items-center">
          <div className="grid content-center gap-7">
            <div>
              <h2 className="text-[2.2rem] font-extrabold tracking-tight">
                {config.title}
              </h2>
              {config.subtitle && (
                <p className="mt-2 text-[color:var(--ob-muted)]">
                  {config.subtitle}
                </p>
              )}
            </div>

            <div className="grid gap-2.5">
              <span className="text-[0.72rem] font-bold uppercase tracking-wider text-[color:var(--ob-muted)]">
                Plan
              </span>
              {config.plans.map((plan) => (
                <button
                  key={plan.id}
                  type="button"
                  onClick={() => choose(plan)}
                  className={cn(
                    "flex items-center gap-3 rounded-[var(--ob-radius)] border px-4 py-4 text-left transition-colors",
                    plan.id === selectedId
                      ? "border-[color:var(--ob-brand)] [box-shadow:0_0_0_1px_var(--ob-brand)]"
                      : "border-[color:var(--ob-border)]",
                  )}
                >
                  <span className="flex-1 font-semibold">{plan.name}</span>
                  {plan.note && (
                    <span className="rounded-full bg-[color:var(--ob-surface-2)] px-2.5 py-1 text-[0.78rem] text-[color:var(--ob-muted)]">
                      {plan.note}
                    </span>
                  )}
                  <Radio checked={plan.id === selectedId} />
                </button>
              ))}
            </div>

            {config.checkout?.wallets && (
              <div className="grid gap-2.5">
                <span className="text-[0.72rem] font-bold uppercase tracking-wider text-[color:var(--ob-muted)]">
                  Payment method
                </span>
                {config.checkout.wallets.map((wallet) => (
                  <button
                    key={wallet.id}
                    type="button"
                    onClick={checkout}
                    className="flex items-center gap-3 rounded-[var(--ob-radius)] border border-[color:var(--ob-border)] px-4 py-4 text-left font-semibold hover:border-[color:var(--ob-border-strong)]"
                  >
                    <span className="flex-1">{wallet.label}</span>
                    <Radio checked={wallet.tone === "primary"} />
                  </button>
                ))}
              </div>
            )}

            <Button
              tone="brand"
              size="lg"
              shape="rounded"
              block
              onClick={checkout}
            >
              {config.checkout?.submitLabel ?? "Start free trial"}
            </Button>

            {config.footnote && (
              <p className="text-center text-[0.82rem] leading-relaxed text-[color:var(--ob-muted)]">
                {config.footnote}
              </p>
            )}

            {config.footerLinks && (
              <div className="flex flex-wrap justify-center gap-6">
                {config.footerLinks.map((link) => (
                  <button
                    key={link.id}
                    type="button"
                    onClick={() => onAction?.(link.id)}
                    className="text-sm font-semibold text-[color:var(--ob-fg-soft)] hover:text-[color:var(--ob-fg)]"
                  >
                    {link.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          <aside className="grid content-start gap-8 rounded-[var(--ob-radius-lg)] bg-[color:var(--ob-surface-2)] p-8">
            {config.socialProof?.awards && (
              <div className="flex flex-wrap justify-center gap-6 opacity-60">
                {config.socialProof.awards.map((award) => (
                  <span
                    key={award}
                    className="text-center text-[0.72rem] font-semibold leading-tight"
                  >
                    <Icon name="trophy" size={20} className="mx-auto" />
                    <br />
                    {award}
                  </span>
                ))}
              </div>
            )}
            {config.socialProof?.headline && (
              <h3 className="text-center text-2xl font-extrabold text-[color:var(--ob-brand)]">
                {config.socialProof.headline}
              </h3>
            )}
            {config.socialProof?.testimonials && (
              <div className="grid gap-3">
                {config.socialProof.testimonials.map((item) => (
                  <figure
                    key={item.title}
                    className="rounded-[var(--ob-radius)] bg-[color:var(--ob-surface)] p-5 [box-shadow:var(--ob-shadow)]"
                  >
                    <figcaption className="font-bold">{item.title}</figcaption>
                    <blockquote className="mt-1 text-[0.92rem] leading-relaxed text-[color:var(--ob-muted)]">
                      {item.body}
                    </blockquote>
                  </figure>
                ))}
              </div>
            )}
            {config.timeline && (
              <ol className="grid gap-6">
                {config.timeline.map((milestone, i) => (
                  <li key={milestone.title} className="relative flex gap-4">
                    {i < config.timeline!.length - 1 && (
                      <span
                        aria-hidden
                        className="absolute left-[13px] top-8 h-[calc(100%+0.5rem)] w-[3px] rounded-full bg-[color:var(--ob-brand)] opacity-35"
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
                  </li>
                ))}
              </ol>
            )}
          </aside>
        </div>,
      );

    /* ------------------------ Offer modal ------------------------ */
    case "offer-modal": {
      const offer = config.offer;
      if (!offer) return null;
      const card = (
        <div className="ob-animate-pop relative w-[520px] max-w-[calc(100vw-2rem)] overflow-hidden rounded-[var(--ob-radius-lg)] bg-[color:var(--ob-surface)] p-8 [box-shadow:var(--ob-shadow-lg)]">
          {offer.celebrate !== false && <Confetti pieces={36} />}
          {config.dismissible !== false && <Dismiss onClick={onDismiss} />}

          <div className="grid justify-items-center gap-5">
            <span
              aria-hidden
              className="grid size-20 place-items-center rounded-[22px] text-4xl"
              style={{
                background: offer.accent ?? "var(--ob-brand)",
                boxShadow: `0 0 48px -8px ${offer.accent ?? "var(--ob-brand)"}`,
              }}
            >
              {offer.glyph ?? (
                <Gift className="size-9 text-[color:var(--ob-brand-fg)]" />
              )}
            </span>

            <OfferHeadline text={offer.headline} accent={offer.accent} />

            {offer.body && (
              <p className="text-center text-[0.92rem] text-[color:var(--ob-muted)]">
                {offer.body}
              </p>
            )}

            {offer.promoCode && (
              <div className="flex w-full items-center justify-center gap-2 rounded-[var(--ob-radius)] bg-[color:var(--ob-surface-2)] px-4 py-3">
                <Check
                  className="size-4 text-[color:var(--ob-brand)]"
                  strokeWidth={3}
                />
                <code className="font-[family-name:var(--ob-font-mono)] font-bold">
                  {offer.promoCode}
                </code>
                <span className="text-[color:var(--ob-muted)]">
                  {offer.promoNote ?? "promocode is applied"}
                </span>
              </div>
            )}

            <div className="grid w-full grid-cols-2 items-center gap-4 rounded-[var(--ob-radius)] bg-[color:var(--ob-surface-2)] p-5">
              <div className="grid justify-items-center gap-1 border-r border-dashed border-[color:var(--ob-border-strong)]">
                <span
                  className="text-3xl font-extrabold"
                  style={{ color: offer.accent ?? "var(--ob-brand)" }}
                >
                  {offer.discountLabel}
                </span>
                <span className="text-[0.72rem] text-[color:var(--ob-muted)]">
                  {offer.discountNote}
                </span>
              </div>
              <Countdown seconds={offer.countdownSeconds ?? 599} />
            </div>

            <Button
              tone="brand"
              size="lg"
              shape="rounded"
              block
              onClick={checkout}
            >
              {offer.ctaLabel ?? "Claim discount"}
            </Button>
          </div>
        </div>
      );

      if (inline)
        return (
          <div className={cn("grid place-items-center py-10", className)}>
            {card}
          </div>
        );
      return (
        <div className="fixed inset-0 z-[70] grid place-items-center p-4">
          <button
            type="button"
            aria-label="Close offer"
            onClick={onDismiss}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          />
          <div className="relative">{card}</div>
        </div>
      );
    }

    default:
      return null;
  }
}
