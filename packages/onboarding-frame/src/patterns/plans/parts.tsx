"use client";

import { useEffect, useMemo, useState } from "react";
import type {
  BillingPeriod,
  CheckoutConfig,
  PlanTier,
  PlansConfig,
} from "../../types";
import { cn } from "../../lib/cn";
import { formatMoney } from "../../lib/utils";
import { Button, CheckBox, Pill, Radio } from "../../ui/primitives";
import {
  Check,
  ChevronDown,
  Cross,
  Icon,
  ImageIcon,
  Lock,
  VideoIcon,
  type IconName,
} from "../../ui/icons";

/** Monthly-equivalent price for a tier under the selected billing period. */
export function priceFor(plan: PlanTier, period: BillingPeriod): number {
  return period === "annual"
    ? (plan.priceAnnual ?? plan.priceMonthly)
    : plan.priceMonthly;
}

export function anchorFor(
  plan: PlanTier,
  period: BillingPeriod,
): number | undefined {
  return period === "annual" ? plan.anchorAnnual : plan.anchorMonthly;
}

export function PeriodToggle({
  period,
  onChange,
  savingLabel,
}: {
  period: BillingPeriod;
  onChange: (next: BillingPeriod) => void;
  savingLabel?: string;
}) {
  return (
    <div className="inline-flex items-center gap-1 rounded-full bg-[color:var(--ob-surface-2)] p-1">
      {(["monthly", "annual"] as const).map((value) => (
        <button
          key={value}
          type="button"
          aria-pressed={period === value}
          onClick={() => onChange(value)}
          className={cn(
            "rounded-full px-4 py-2 text-sm font-semibold capitalize transition-all",
            period === value
              ? "bg-[color:var(--ob-surface)] [box-shadow:var(--ob-shadow)]"
              : "text-[color:var(--ob-muted)]",
          )}
        >
          {value}
          {value === "annual" && savingLabel && (
            <span className="ml-1.5 text-[color:var(--ob-brand)]">
              {savingLabel}
            </span>
          )}
        </button>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * Plan cards
 * ------------------------------------------------------------------ */

export function TermCard({
  plan,
  period,
  currency,
  selected,
  onSelect,
}: {
  plan: PlanTier;
  period: BillingPeriod;
  currency: string;
  selected: boolean;
  onSelect: () => void;
}) {
  const price = priceFor(plan, period);
  const anchor = anchorFor(plan, period);
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onSelect}
      className={cn(
        "relative flex flex-col items-center gap-2 rounded-[var(--ob-radius-lg)] p-6 text-center transition-all",
        "focus-visible:outline-none focus-visible:[box-shadow:var(--ob-ring)]",
        selected
          ? "bg-[color:var(--ob-surface-2)] [background-clip:padding-box]"
          : "border border-[color:var(--ob-border)] bg-[color:var(--ob-surface)] hover:border-[color:var(--ob-border-strong)]",
      )}
      style={
        selected
          ? {
              // Gradient ring drawn as a border image so the card keeps its radius.
              border: "2px solid transparent",
              backgroundImage:
                "linear-gradient(var(--ob-surface-2),var(--ob-surface-2)), linear-gradient(90deg,#8f7bf0,#f2a0d0,#f5b969)",
              backgroundOrigin: "border-box",
              backgroundClip: "padding-box, border-box",
            }
          : undefined
      }
    >
      {plan.badge && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full px-3 py-1 text-[0.65rem] font-extrabold uppercase tracking-wide text-[#20121f] [background:linear-gradient(90deg,#c4b0ff,#f6c9e4,#f7cf94)]">
          {plan.badge}
        </span>
      )}
      <span className="text-lg font-extrabold">{plan.name}</span>
      <span className="flex items-baseline gap-2">
        {anchor !== undefined && (
          <span className="text-[color:var(--ob-muted)] line-through">
            {formatMoney(anchor, currency)}
          </span>
        )}
        <span className="text-xl font-extrabold">
          {formatMoney(price, currency)}
        </span>
        <span className="text-[color:var(--ob-muted)]">/month</span>
      </span>
      {plan.note && (
        <span className="text-sm text-[color:var(--ob-muted)]">
          {plan.note}
        </span>
      )}
    </button>
  );
}

export function QuietTierCard({
  plan,
  period,
  currency,
  onSelect,
}: {
  plan: PlanTier;
  period: BillingPeriod;
  currency: string;
  onSelect: () => void;
}) {
  return (
    <div
      className={cn(
        "flex flex-col rounded-[var(--ob-radius-lg)] border bg-[color:var(--ob-surface)] p-6",
        plan.highlighted
          ? "border-[color:var(--ob-brand)] [box-shadow:0_0_0_1px_var(--ob-brand)]"
          : "border-[color:var(--ob-border)]",
      )}
    >
      <h3 className="text-lg font-bold">{plan.name}</h3>
      <p className="mt-1 font-semibold text-[color:var(--ob-brand)]">
        {formatMoney(priceFor(plan, period), currency)}/month
      </p>
      {plan.inheritsLabel && (
        <p className="mt-5 text-[0.92rem] text-[color:var(--ob-muted)]">
          {plan.inheritsLabel}
        </p>
      )}
      <ul className="mt-4 grid gap-2.5">
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-start gap-2.5 text-[0.95rem]">
            <Check className="mt-1 size-4 shrink-0" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      {/* Spacer keeps every card's CTA on the same baseline. */}
      <div className="mt-auto pt-8">
        <Button tone="outline" shape="rounded" block onClick={onSelect}>
          {plan.ctaLabel ?? "Purchase"}
        </Button>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * Comparison matrix
 * ------------------------------------------------------------------ */

export function ComparisonMatrix({ config }: { config: PlansConfig }) {
  const columns = (config.compareColumns ?? config.plans.map((p) => p.id))
    .map((id) => config.plans.find((p) => p.id === id))
    .filter((p): p is PlanTier => Boolean(p));

  return (
    <div className="mx-auto w-full max-w-3xl overflow-x-auto">
      <table className="w-full border-collapse text-left">
        <thead>
          <tr>
            <th className="pb-4 pr-4 font-bold">Benefits</th>
            {columns.map((plan) => (
              <th
                key={plan.id}
                className={cn(
                  "px-4 pb-4 text-center font-bold",
                  plan.highlighted &&
                    "rounded-t-[var(--ob-radius-lg)] text-[#20121f] [background:linear-gradient(180deg,#c4b0ff,#f6c9e4,#f7cf94)]",
                )}
              >
                {plan.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {config.featureRows?.map((row) => (
            <tr
              key={row.label}
              className="border-t border-[color:var(--ob-border)]"
            >
              <td className="py-4 pr-4">
                <span className="flex items-center gap-2">
                  {row.label}
                  {row.locked && <Lock className="size-3.5 opacity-60" />}
                </span>
              </td>
              {columns.map((plan) => (
                <td
                  key={plan.id}
                  className={cn(
                    "px-4 py-4 text-center",
                    plan.highlighted && "bg-[color:var(--ob-surface-2)]",
                  )}
                >
                  {row.included[plan.id] ? (
                    <span className="mx-auto grid size-6 place-items-center rounded-full bg-[#f5c98a] text-[#3a2410]">
                      <Check className="size-3.5" strokeWidth={3} />
                    </span>
                  ) : (
                    <span className="mx-auto grid size-6 place-items-center rounded-full bg-[color:var(--ob-surface-3)] text-[color:var(--ob-muted)]">
                      <Cross className="size-3" strokeWidth={3} />
                    </span>
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * Quota matrix
 * ------------------------------------------------------------------ */

/**
 * Quota matrix.
 *
 * Measured off the reference rather than approximated: the value pills are a
 * fixed 122x38 with the count centred, the best plan's column is an olive wash
 * carrying lime text (not a saturated lime fill, which at this size reads as a
 * button and pulls the eye off the numbers), and the rows are separated by
 * hairlines inside no outer card at all. Each row names a model, which is why
 * the first column header reads as it does.
 */
export function QuotaMatrix({ config }: { config: PlansConfig }) {
  const columns = config.plans;
  const best = columns.find((p) => p.highlighted)?.id ?? columns[0]?.id;

  return (
    <div className="mx-auto w-full max-w-[830px]">
      <div
        className="grid items-center gap-x-3 border-b border-[color:var(--ob-border)] pb-3.5"
        style={{
          gridTemplateColumns: `minmax(0,1fr) repeat(${columns.length}, 122px)`,
        }}
      >
        <span className="text-[0.94rem] text-[color:var(--ob-muted)]">
          {config.quotaRowsLabel ?? "Model / Generations Amount"}
        </span>
        {columns.map((plan) => (
          <span
            key={plan.id}
            className="text-center text-[0.98rem] font-semibold text-[color:var(--ob-fg)]"
          >
            {plan.name}
          </span>
        ))}
      </div>

      {config.quotaRows?.map((row) => (
        <div
          key={row.label}
          /*
            Start-aligned, not centred: a badge makes its cell taller, and
            centring unequal cells drops the badge-less column half a line
            below the others. The pills sit on one line, badges hang under.
          */
          className="grid items-start gap-x-3 border-b border-[color:var(--ob-border)] py-6 last:border-b-0"
          style={{
            gridTemplateColumns: `minmax(0,1fr) repeat(${columns.length}, 122px)`,
          }}
        >
          <div className="min-w-0 pr-6 pt-1">
            <p className="flex items-center gap-2 text-[1.12rem] font-medium">
              {row.icon && (
                <Icon
                  name={row.icon as IconName}
                  width={17}
                  height={17}
                  className="shrink-0 opacity-90"
                />
              )}
              <span className="truncate">{row.label}</span>
            </p>
            {row.hint && (
              <p className="mt-1 text-[0.86rem] text-[color:var(--ob-muted)]">
                {row.hint}
              </p>
            )}
          </div>

          {columns.map((plan) => {
            const isBest = plan.id === best;
            const value = row.values[plan.id];
            const badge = row.badges?.[plan.id];
            const Mark = row.kind === "image" ? ImageIcon : VideoIcon;
            return (
              <div key={plan.id} className="grid justify-items-center gap-1.5">
                <span
                  className={cn(
                    "flex h-[38px] w-[122px] items-center justify-center gap-1.5 rounded-[8px] text-[0.92rem] font-semibold tabular-nums",
                    isBest
                      ? "bg-[color-mix(in_oklab,var(--ob-brand)_22%,#111)] text-[color:var(--ob-brand)]"
                      : "bg-[color:var(--ob-surface-2)] text-[color:var(--ob-fg-soft)]",
                  )}
                >
                  <Mark
                    width={12}
                    height={12}
                    className="shrink-0 opacity-75"
                  />
                  {value ?? "—"}
                </span>
                {badge && (
                  <span className="rounded-[5px] bg-[color:var(--ob-brand)] px-1.5 py-[3px] text-[0.64rem] font-bold leading-none text-[color:var(--ob-brand-fg)]">
                    {badge}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * Checkout
 * ------------------------------------------------------------------ */

/**
 * Demo checkout.
 *
 * The inputs are deliberately inert and labelled as a demo: this is a UI
 * reference, not a payment form. Wire a real processor's hosted fields in
 * place of `DemoField` when adopting it.
 */
function DemoField({ label, hint }: { label: string; hint?: string }) {
  return (
    <div className="flex items-center justify-between rounded-[var(--ob-radius)] bg-[color:var(--ob-surface-2)] px-4 py-3.5 text-[color:var(--ob-muted)]">
      <span>{label}</span>
      {hint && <span className="text-xs opacity-70">{hint}</span>}
    </div>
  );
}

export function CheckoutPanel({
  checkout,
  total,
  currency,
  onSubmit,
}: {
  checkout: CheckoutConfig;
  total: number;
  currency: string;
  onSubmit?: () => void;
}) {
  const [method, setMethod] = useState(checkout.methods?.[0]?.id ?? "card");
  const [consents, setConsents] = useState<Record<number, boolean>>({});
  const [showDetails, setShowDetails] = useState(false);

  const required = checkout.consents?.length ?? 0;
  const agreed = Object.values(consents).filter(Boolean).length;
  const canSubmit = agreed >= required;

  return (
    <div className="grid gap-5 rounded-[var(--ob-radius-lg)] bg-[color:var(--ob-surface)] p-6">
      <div>
        <div className="flex items-baseline justify-between">
          <h3 className="text-xl font-extrabold">Total due today</h3>
          <span className="text-xl font-extrabold tabular-nums">
            {formatMoney(total, currency)}
          </span>
        </div>
        {checkout.lineItems && (
          <div className="mt-2">
            <button
              type="button"
              onClick={() => setShowDetails((v) => !v)}
              aria-expanded={showDetails}
              className="flex items-center gap-1 text-sm font-semibold text-[color:var(--ob-brand)]"
            >
              View details
              <ChevronDown
                className={cn(
                  "size-4 transition-transform",
                  showDetails && "rotate-180",
                )}
              />
            </button>
            {showDetails && (
              <ul className="ob-animate-in mt-3 grid gap-2">
                {checkout.lineItems.map((item) => (
                  <li key={item.label} className="flex justify-between text-sm">
                    <span className="text-[color:var(--ob-muted)]">
                      {item.label}
                    </span>
                    <span className="tabular-nums">
                      {formatMoney(item.amount, currency)}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>

      {checkout.wallets && (
        <div className="grid gap-2.5">
          <span className="text-[0.72rem] font-bold uppercase tracking-wider text-[color:var(--ob-muted)]">
            Payment method
          </span>
          {checkout.wallets.map((wallet) => (
            <button
              key={wallet.id}
              type="button"
              onClick={onSubmit}
              className={cn(
                "rounded-[var(--ob-radius)] py-3.5 text-center font-bold transition-opacity hover:opacity-90",
                wallet.tone === "primary"
                  ? "bg-[color:var(--ob-brand)] text-[color:var(--ob-brand-fg)]"
                  : "border border-[color:var(--ob-border-strong)] bg-[color:var(--ob-surface)]",
              )}
            >
              {wallet.label}
            </button>
          ))}
          <div className="flex items-center gap-3 py-1 text-xs text-[color:var(--ob-muted)]">
            <span className="h-px flex-1 bg-[color:var(--ob-border)]" />
            OR
            <span className="h-px flex-1 bg-[color:var(--ob-border)]" />
          </div>
        </div>
      )}

      {checkout.methods && checkout.methods.length > 1 && (
        <div className="grid grid-flow-col gap-3">
          {checkout.methods.map((item) => (
            <button
              key={item.id}
              type="button"
              aria-pressed={method === item.id}
              onClick={() => setMethod(item.id)}
              className={cn(
                "flex items-center gap-2 rounded-full border px-4 py-3 font-semibold transition-colors",
                method === item.id
                  ? "border-[color:var(--ob-brand)] text-[color:var(--ob-brand)]"
                  : "border-[color:var(--ob-border-strong)] text-[color:var(--ob-fg-soft)]",
              )}
            >
              {item.glyph} {item.label}
            </button>
          ))}
        </div>
      )}

      <div className="grid gap-3">
        <p className="rounded-[var(--ob-radius-sm)] bg-[color:var(--ob-brand-soft)] px-3 py-2 text-[0.78rem] font-semibold text-[color:var(--ob-fg-soft)]">
          Demo only — these fields are inert. Never enter real card details.
        </p>
        <DemoField label="Card number" hint="demo" />
        <div className="grid grid-cols-2 gap-3">
          <DemoField label="Expiration date" />
          <DemoField label="Security code" />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <DemoField label="Country" hint="United States" />
          <DemoField label="ZIP code" />
        </div>
      </div>

      {checkout.consents && (
        <div className="grid gap-3">
          {checkout.consents.map((text, i) => (
            <button
              key={i}
              type="button"
              role="checkbox"
              aria-checked={Boolean(consents[i])}
              onClick={() =>
                setConsents((prev) => ({ ...prev, [i]: !prev[i] }))
              }
              className="flex items-start gap-3 text-left"
            >
              <span className="pt-0.5">
                <CheckBox checked={Boolean(consents[i])} />
              </span>
              <span className="text-[0.82rem] leading-relaxed text-[color:var(--ob-muted)]">
                {text}
              </span>
            </button>
          ))}
        </div>
      )}

      <Button
        tone="cta"
        size="lg"
        shape="rounded"
        block
        disabled={!canSubmit}
        onClick={onSubmit}
      >
        <Lock className="size-4" />
        {checkout.submitLabel ?? "Subscribe now"}
      </Button>

      {checkout.trustLabel && (
        <p className="text-center text-xs text-[color:var(--ob-muted)]">
          {checkout.trustLabel}
        </p>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * Countdown
 * ------------------------------------------------------------------ */

/** Live MM:SS countdown that stops at zero. */
export function Countdown({ seconds }: { seconds: number }) {
  const [left, setLeft] = useState(seconds);

  useEffect(() => {
    setLeft(seconds);
    const timer = setInterval(
      () => setLeft((value) => (value <= 0 ? 0 : value - 1)),
      1000,
    );
    return () => clearInterval(timer);
  }, [seconds]);

  const mm = String(Math.floor(left / 60)).padStart(2, "0");
  const ss = String(left % 60).padStart(2, "0");

  return (
    <div
      className="flex items-start justify-center gap-3"
      role="timer"
      aria-live="off"
    >
      {[
        { value: mm, label: "minutes" },
        { value: ss, label: "seconds" },
      ].map((part, i) => (
        <div key={part.label} className="flex items-start gap-3">
          {i === 1 && <span className="text-3xl font-extrabold">:</span>}
          <div className="grid justify-items-center">
            <span className="text-3xl font-extrabold tabular-nums">
              {part.value}
            </span>
            <span className="text-[0.72rem] text-[color:var(--ob-muted)]">
              {part.label}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

/** Render `**highlighted**` spans in the offer accent colour. */
export function OfferHeadline({
  text,
  accent,
}: {
  text: string;
  accent?: string;
}) {
  const parts = useMemo(() => text.split(/(\*\*[^*]+\*\*)/g), [text]);
  return (
    <h2 className="text-balance text-center text-[1.9rem] font-extrabold uppercase leading-[1.15] tracking-tight sm:text-[2.3rem]">
      {parts.map((part, i) => {
        const match = /^\*\*([^*]+)\*\*$/.exec(part);
        if (!match) return <span key={i}>{part}</span>;
        return (
          <span key={i} style={{ color: accent ?? "var(--ob-brand)" }}>
            {match[1]}
          </span>
        );
      })}
    </h2>
  );
}

export { Radio, Pill };
