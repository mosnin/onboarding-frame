"use client";

import { useEffect, type ReactNode } from "react";
import type { FieldValue, WizardConfig, WizardStep } from "../../types";
import { Glyph } from "../../ui/glyph";
import { cn } from "../../lib/cn";
import { useWizard, type WizardState } from "../../hooks/useWizard";
import { useKeyboard } from "../../hooks/useKeyboard";
import { canvasStyle, useOnboarding } from "../../provider/OnboardingProvider";
import { Field } from "../../ui/fields";
import { Button, Dots, SchemeToggle } from "../../ui/primitives";
import { ArrowRight, ChevronLeft } from "../../ui/icons";
import {
  AmbientTiles,
  BrandMark,
  ConfirmCard,
  Interstitial,
  Orb,
  ReviewGrid,
  RichText,
  SidePanel,
  WizardHeader,
} from "./parts";

export interface WizardProps {
  config: WizardConfig;
  onComplete?: (values: Record<string, FieldValue>) => void;
  onDismiss?: () => void;
  /** Fires for secondary actions: skip links, footer links, header actions. */
  onAction?: (actionId: string, state: WizardState) => void;
  /** localStorage key to resume progress across reloads. */
  persistKey?: string;
  initialValues?: Record<string, FieldValue>;
  className?: string;
  /** Render inside the parent instead of filling the viewport. */
  inline?: boolean;
}

/* ------------------------------------------------------------------ *
 * Helpers
 * ------------------------------------------------------------------ */

/**
 * Fill `{fieldId}` and `{fieldId:option}` placeholders from collected answers.
 * `:option` resolves ids to their option labels and joins them with "and".
 */
function interpolate(
  template: string,
  values: Record<string, FieldValue>,
  config: WizardConfig,
): string {
  return template.replace(
    /\{([\w-]+)(:option)?\}/g,
    (_match, id: string, asOption) => {
      const value = values[id];
      if (value === undefined || value === null) return "";
      if (!asOption)
        return Array.isArray(value) ? value.join(", ") : String(value);

      const ids = Array.isArray(value) ? value.map(String) : [String(value)];
      const labels: string[] = [];
      for (const step of config.steps) {
        for (const field of step.fields ?? []) {
          for (const option of field.options ?? []) {
            if (ids.includes(option.id)) labels.push(option.label);
          }
        }
      }
      if (labels.length <= 1) return labels[0] ?? "";
      return `${labels.slice(0, -1).join(", ")} and ${labels[labels.length - 1]}`;
    },
  );
}

function ctaLabelFor(step: WizardStep, config: WizardState, fallback?: string) {
  return step.ctaLabel ?? fallback ?? (config.isLast ? "Finish" : "Continue");
}

/* ------------------------------------------------------------------ *
 * Step body
 * ------------------------------------------------------------------ */

function StepBody({
  step,
  state,
  config,
  align = "center",
  titleClass,
  tone,
}: {
  step: WizardStep;
  state: WizardState;
  config: WizardConfig;
  align?: "center" | "left";
  titleClass?: string;
  tone?: "light" | "dark" | "neon";
}) {
  const kind = step.kind ?? "question";

  if (kind === "interstitial") {
    return <Interstitial title={step.title} description={step.description} />;
  }

  if (kind === "confirm") {
    const title = step.summaryTitleField
      ? String(state.values[step.summaryTitleField] ?? step.title)
      : step.title;
    const avatarOption = step.summaryAvatarField
      ? config.steps
          .flatMap((s) => s.fields ?? [])
          .flatMap((f) => f.options ?? [])
          .find((o) => o.id === state.values[step.summaryAvatarField!])
      : undefined;
    return (
      <div className="grid gap-8">
        <h2
          className={cn(
            "text-center text-3xl font-semibold tracking-tight sm:text-[2.6rem]",
            titleClass,
          )}
        >
          {step.title}
        </h2>
        <ConfirmCard
          title={title}
          summary={
            step.summaryTemplate
              ? interpolate(step.summaryTemplate, state.values, config)
              : ""
          }
          avatar={avatarOption?.avatarSeed ?? avatarOption?.glyph}
          avatarTone={avatarOption?.glyphTone}
          editLabel={step.editLabel ?? "Edit"}
          onEdit={() => state.goTo(0)}
        />
      </div>
    );
  }

  const heading = (
    <div
      className={cn(
        "grid gap-3",
        align === "center" ? "text-center" : "text-left",
      )}
    >
      <h2
        className={cn(
          "text-balance text-3xl font-bold tracking-tight sm:text-[2.1rem]",
          titleClass,
        )}
      >
        {interpolate(step.title, state.values, config)}
      </h2>
      {step.description && (
        <p
          className={cn(
            "text-pretty text-[1.02rem] leading-relaxed text-[color:var(--ob-muted)]",
            align === "left" && "max-w-xl",
          )}
        >
          {step.description}{" "}
          {step.learnMore && (
            <a
              href={step.learnMore.href ?? "#"}
              className="underline underline-offset-2 hover:opacity-80"
            >
              {step.learnMore.label}
            </a>
          )}
        </p>
      )}
    </div>
  );

  if (kind === "welcome") return heading;

  if (kind === "review") {
    return (
      <div className="grid gap-8">
        {heading}
        {step.reviewCards && <ReviewGrid cards={step.reviewCards} />}
      </div>
    );
  }

  return (
    <div className="grid gap-10">
      {heading}
      {step.render ? (
        step.render({
          values: state.values,
          setValue: state.setValue,
          next: state.next,
          back: state.back,
        })
      ) : (
        <div className="grid gap-6">
          {(step.fields ?? []).map((field) => (
            <div key={field.id} className="grid gap-2">
              {field.sectionLabel && (
                <span className="text-[0.72rem] font-bold uppercase tracking-wider text-[color:var(--ob-muted)]">
                  {field.sectionLabel}
                </span>
              )}
              <Field
                field={field}
                value={state.values[field.id]}
                onChange={(value) => state.setValue(field.id, value)}
                tone={tone}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * Footer
 * ------------------------------------------------------------------ */

function StepFooter({
  step,
  state,
  config,
  onAction,
  ctaTone = "cta",
  align = "center",
}: {
  step: WizardStep;
  state: WizardState;
  config: WizardConfig;
  onAction?: (id: string, state: WizardState) => void;
  ctaTone?: "cta" | "brand" | "brand-soft" | "gradient";
  align?: "center" | "left" | "stretch";
}) {
  if ((step.kind ?? "question") === "interstitial") return null;

  const shape = config.ctaStyle ?? "pill";
  const label = ctaLabelFor(step, state, config.ctaLabel);

  const cta =
    shape === "circle" ? (
      <button
        type="button"
        disabled={!state.canAdvance}
        onClick={state.next}
        aria-label={label}
        className={cn(
          "grid size-14 place-items-center rounded-full border transition-all",
          "focus-visible:outline-none focus-visible:[box-shadow:var(--ob-ring)]",
          state.canAdvance
            ? "border-[color:var(--ob-brand)] text-[color:var(--ob-brand)] hover:bg-[color:var(--ob-brand-soft)]"
            : "border-[color:var(--ob-border)] text-[color:var(--ob-muted)] opacity-50",
        )}
      >
        <ArrowRight className="size-5" />
      </button>
    ) : (
      <Button
        tone={ctaTone}
        size="lg"
        shape={shape === "block" ? "rounded" : "pill"}
        block={shape === "block" || align === "stretch"}
        disabled={!state.canAdvance}
        onClick={state.next}
        className={
          shape === "pill" && align === "center" ? "min-w-[260px]" : undefined
        }
      >
        {label}
        {shape !== "block" && <ArrowRight className="size-4" />}
      </Button>
    );

  return (
    <div
      className={cn(
        "grid gap-4",
        align === "center" && "justify-items-center",
        align === "left" && "justify-items-start",
      )}
    >
      {cta}

      {step.secondaryCta && (
        <Button
          tone="outline"
          size="lg"
          shape="rounded"
          block={align === "stretch"}
          onClick={() => onAction?.(step.secondaryCta!.id, state)}
        >
          {step.secondaryCta.label}
        </Button>
      )}

      {step.skippable && (
        <button
          type="button"
          onClick={state.skip}
          className="text-sm font-semibold text-[color:var(--ob-fg-soft)] hover:text-[color:var(--ob-fg)]"
        >
          {config.skipLabel ?? "Skip"}
        </button>
      )}

      {step.inlineLink && (
        <button
          type="button"
          onClick={() => onAction?.(step.inlineLink!.id, state)}
          className="text-sm text-[color:var(--ob-fg-soft)] underline underline-offset-4 hover:text-[color:var(--ob-fg)]"
        >
          {step.inlineLink.label}
        </button>
      )}

      {config.footerLinks && (
        <div className="flex flex-wrap items-center justify-center gap-6 pt-2">
          {config.footerLinks.map((link) => (
            <button
              key={link.id}
              type="button"
              onClick={() => onAction?.(link.id, state)}
              className="text-sm font-semibold text-[color:var(--ob-fg-soft)] hover:text-[color:var(--ob-fg)]"
            >
              {link.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * Shell
 * ------------------------------------------------------------------ */

function Shell({
  children,
  inline,
  className,
  style,
}: {
  children: ReactNode;
  inline?: boolean;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div
      className={cn(
        "relative flex w-full flex-col overflow-hidden",
        inline ? "min-h-[680px] rounded-[var(--ob-radius-lg)]" : "min-h-screen",
        className,
      )}
      style={style}
    >
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * Wizard
 * ------------------------------------------------------------------ */

/**
 * Config-driven setup wizard.
 *
 * Every reference layout is a `variant`; the copy, fields, branching and
 * theming all come from `config`, so a flow can be restyled without touching
 * the component.
 */
export function Wizard({
  config,
  onComplete,
  onDismiss,
  onAction,
  persistKey,
  initialValues,
  className,
  inline,
}: WizardProps) {
  const state = useWizard(config, {
    onComplete,
    onDismiss,
    persistKey,
    initialValues,
  });
  const { theme, scheme, setScheme, emit } = useOnboarding();
  const { step } = state;

  useEffect(() => {
    emit("flow_started", config.id);
    // Emitted once per mounted flow.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Interstitials advance on their own.
  useEffect(() => {
    if ((step.kind ?? "question") !== "interstitial") return;
    const timer = setTimeout(() => state.next(), step.autoAdvanceMs ?? 2200);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step.id]);

  useKeyboard(true, {
    ArrowLeft: state.back,
    Enter: () => state.canAdvance && state.next(),
  });

  const schemeToggle = config.showSchemeToggle ? (
    <SchemeToggle scheme={scheme} onChange={setScheme} />
  ) : null;

  switch (config.variant) {
    /* ------------------------- Neon quiz ------------------------- */
    case "neon-quiz": {
      const media = step.sidePanel;
      return (
        <Shell inline={inline} className={className} style={canvasStyle(theme)}>
          <WizardHeader
            config={config}
            index={state.index}
            total={state.total}
            onBack={state.back}
            progressPlacement="edge"
            showCounter
            right={schemeToggle}
          />
          <div
            className={cn(
              "flex flex-1 gap-8 px-6 pb-10 pt-6 sm:px-10",
              media ? "flex-col lg:flex-row" : "flex-col",
            )}
          >
            <div
              className={cn(
                "flex flex-1 flex-col justify-center gap-10",
                media ? "lg:max-w-[46%]" : "mx-auto w-full max-w-4xl",
              )}
            >
              <StepBody
                step={step}
                state={state}
                config={config}
                align={media ? "left" : "center"}
                tone="neon"
                titleClass="sm:text-[2.6rem]"
              />
              <StepFooter
                step={step}
                state={state}
                config={{ ...config, ctaStyle: config.ctaStyle ?? "block" }}
                onAction={onAction}
                ctaTone="brand"
                align="stretch"
              />
            </div>
            {media && (
              <div className="flex-1">
                <SidePanel panel={media} values={state.values} />
              </div>
            )}
          </div>
        </Shell>
      );
    }

    /* ---------------------- Fullscreen quiz ---------------------- */
    case "fullscreen-quiz":
      return (
        <Shell inline={inline} className={className} style={canvasStyle(theme)}>
          <WizardHeader
            config={config}
            index={state.index}
            total={state.total}
            onBack={state.back}
            onGoTo={state.goTo}
            right={
              config.topBarAction ? (
                <button
                  type="button"
                  aria-label={config.topBarAction.label}
                  onClick={() => onAction?.(config.topBarAction!.id, state)}
                  className="grid size-9 place-items-center rounded-full text-[color:var(--ob-fg-soft)] hover:bg-[color:var(--ob-surface-2)]"
                >
                  <Glyph
                    value={config.topBarAction.glyph ?? "megaphone"}
                    size={18}
                  />
                </button>
              ) : (
                schemeToggle
              )
            }
          />
          <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col justify-center gap-14 px-6 py-12">
            <StepBody step={step} state={state} config={config} tone="dark" />
          </div>
          <div className="px-6 pb-16">
            <StepFooter
              step={step}
              state={state}
              config={config}
              onAction={onAction}
            />
          </div>
        </Shell>
      );

    /* ----------------------- Warm survey ----------------------- */
    case "warm-survey": {
      const isWelcome = (step.kind ?? "question") === "welcome";
      return (
        <Shell inline={inline} className={className} style={canvasStyle(theme)}>
          {isWelcome && config.ambientTiles && (
            <AmbientTiles tiles={config.ambientTiles} />
          )}
          <header className="relative z-10 flex items-center justify-between px-6 pt-6 sm:px-10">
            <div className="flex items-center gap-3">
              {state.index > 0 && config.showBack !== false && (
                <button
                  type="button"
                  onClick={state.back}
                  aria-label="Go back"
                  className="text-[color:var(--ob-fg-soft)] hover:text-[color:var(--ob-fg)]"
                >
                  <ChevronLeft />
                </button>
              )}
              <BrandMark glyph={config.logoGlyph} name={config.brandName} />
            </div>
            {!isWelcome && (
              <Dots
                count={state.total}
                active={state.index}
                onSelect={state.goTo}
              />
            )}
            {schemeToggle ?? <span />}
          </header>

          <div className="relative z-10 mx-auto flex w-full max-w-3xl flex-1 flex-col justify-center gap-12 px-6 py-16">
            <StepBody
              step={step}
              state={state}
              config={config}
              titleClass="sm:text-[2.6rem] font-extrabold"
            />
            <StepFooter
              step={step}
              state={state}
              config={config}
              onAction={onAction}
              ctaTone="brand-soft"
            />
          </div>
        </Shell>
      );
    }

    /* ------------------------ Split rail ------------------------ */
    case "split-rail": {
      const panel = step.sidePanel;
      return (
        <Shell
          inline={inline}
          className={className}
          style={{ background: "var(--ob-bg)" }}
        >
          <div className="flex items-center gap-6 border-b border-[color:var(--ob-border)] px-6 py-4 sm:px-8">
            <BrandMark glyph={config.logoGlyph} name={config.brandName} />
            <div className="flex flex-1 justify-center">
              <WizardHeader
                config={config}
                index={state.index}
                total={state.total}
                onGoTo={state.goTo}
                className="!px-0 !pt-0"
              />
            </div>
            <div className="flex items-center gap-4">
              {config.headerActions?.map((action) => (
                <button
                  key={action.id}
                  type="button"
                  onClick={() => onAction?.(action.id, state)}
                  className="flex items-center gap-1.5 text-sm text-[color:var(--ob-fg-soft)] hover:text-[color:var(--ob-fg)]"
                >
                  <Glyph value={action.glyph} size={16} /> {action.label}
                </button>
              ))}
              {schemeToggle}
            </div>
          </div>
          <div className="h-0.5 bg-[color:var(--ob-surface-2)]">
            <div
              className="h-full bg-[color:var(--ob-brand)] transition-[width] duration-500"
              style={{
                width: `${((state.index + 1) / Math.max(state.total, 1)) * 100}%`,
              }}
            />
          </div>

          <div className="flex flex-1 flex-col lg:flex-row">
            <div
              className={cn(
                "flex flex-1 flex-col px-6 py-10 sm:px-12",
                step.centered ? "mx-auto w-full max-w-2xl" : "lg:max-w-[62%]",
              )}
            >
              {state.index > 0 && config.showBack !== false && (
                <button
                  type="button"
                  onClick={state.back}
                  className="mb-6 flex items-center gap-2 text-sm font-semibold text-[color:var(--ob-fg-soft)] hover:text-[color:var(--ob-fg)]"
                >
                  <ChevronLeft className="size-4" /> Back
                </button>
              )}
              <div className="flex-1">
                <StepBody
                  step={step}
                  state={state}
                  config={config}
                  align={step.centered ? "center" : "left"}
                  titleClass="sm:text-[2.4rem]"
                />
              </div>
              <div className={cn("pt-10", step.stickyCta && "sticky bottom-6")}>
                <StepFooter
                  step={step}
                  state={state}
                  config={{ ...config, ctaStyle: "block" }}
                  onAction={onAction}
                  ctaTone="gradient"
                  align="stretch"
                />
              </div>
            </div>
            {panel && (
              <aside className="flex-1 border-t border-[color:var(--ob-border)] bg-[color:var(--ob-surface-2)] lg:border-l lg:border-t-0">
                <SidePanel panel={panel} values={state.values} />
              </aside>
            )}
          </div>
        </Shell>
      );
    }

    /* ---------------------- Conversational ---------------------- */
    case "conversational":
      return (
        <Shell
          inline={inline}
          className={className}
          style={{ background: "var(--ob-surface-2)" }}
        >
          <header className="flex items-start justify-between px-6 pt-6">
            {state.index > 0 && config.showBack !== false ? (
              <button
                type="button"
                onClick={state.back}
                aria-label="Go back"
                className="grid size-10 place-items-center rounded-[10px] border border-[color:var(--ob-border)] bg-[color:var(--ob-surface)] text-[color:var(--ob-fg-soft)] hover:text-[color:var(--ob-fg)]"
              >
                <ChevronLeft />
              </button>
            ) : (
              <span className="size-10" />
            )}
            {step.skippable && (
              <button
                type="button"
                onClick={state.skip}
                className="text-sm text-[color:var(--ob-fg-soft)] underline underline-offset-4"
              >
                {config.skipLabel ?? "Skip"}
              </button>
            )}
          </header>

          <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col items-center justify-start gap-10 px-6 pt-16">
            {config.avatar && (
              <Orb
                stops={config.avatar.stops}
                size={136}
                className="ob-animate-pop"
              />
            )}
            <div className="w-full">
              <StepBody
                step={step}
                state={state}
                config={config}
                titleClass="sm:text-[2.6rem] font-semibold"
              />
            </div>
            <StepFooter
              step={step}
              state={state}
              config={{ ...config, ctaStyle: config.ctaStyle ?? "circle" }}
              onAction={onAction}
            />
          </div>
        </Shell>
      );

    /* ---------------------- Centered card ---------------------- */
    default:
      return (
        <Shell
          inline={inline}
          className={cn("items-center justify-center p-6", className)}
          style={canvasStyle(theme)}
        >
          <div className="w-full max-w-lg rounded-[var(--ob-radius-lg)] border border-[color:var(--ob-border)] bg-[color:var(--ob-surface)] p-8 [box-shadow:var(--ob-shadow-lg)]">
            <WizardHeader
              config={config}
              index={state.index}
              total={state.total}
              onBack={state.back}
              onGoTo={state.goTo}
              className="!px-0 !pt-0 pb-8"
            />
            <StepBody step={step} state={state} config={config} />
            <div className="pt-8">
              <StepFooter
                step={step}
                state={state}
                config={config}
                onAction={onAction}
              />
            </div>
          </div>
        </Shell>
      );
  }
}

export { RichText };
