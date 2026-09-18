"use client";

import { useCallback, useEffect, useLayoutEffect, useState } from "react";
import type { TourConfig, TourPlacement, TourStep } from "../../types";
import { cn } from "../../lib/cn";
import { useOnboarding } from "../../provider/OnboardingProvider";
import { useKeyboard } from "../../hooks/useKeyboard";
import { Button, Dots } from "../../ui/primitives";
import { ArrowRight, ChevronLeft, Cross } from "../../ui/icons";

export interface TourProps {
  config: TourConfig;
  /** Controls visibility. Omit to let the tour manage its own open state. */
  open?: boolean;
  onComplete?: () => void;
  onDismiss?: () => void;
  className?: string;
  /** Render inside the parent rather than as a viewport overlay. */
  inline?: boolean;
}

interface Rect {
  top: number;
  left: number;
  width: number;
  height: number;
}

const PAD = 8;

/** Track a target element's viewport rect across scroll and resize. */
function useTargetRect(selector: string | undefined, active: boolean): Rect | null {
  const [rect, setRect] = useState<Rect | null>(null);

  useLayoutEffect(() => {
    if (!active || !selector) {
      setRect(null);
      return;
    }
    const measure = () => {
      const element = document.querySelector(selector);
      if (!element) {
        setRect(null);
        return;
      }
      const box = element.getBoundingClientRect();
      setRect({
        top: box.top - PAD,
        left: box.left - PAD,
        width: box.width + PAD * 2,
        height: box.height + PAD * 2,
      });
    };
    measure();
    // Scroll the target into view before the first measurement settles.
    document.querySelector(selector)?.scrollIntoView({
      block: "center",
      behavior: "smooth",
    });
    const timer = setTimeout(measure, 320);
    window.addEventListener("resize", measure);
    window.addEventListener("scroll", measure, true);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", measure);
      window.removeEventListener("scroll", measure, true);
    };
  }, [selector, active]);

  return rect;
}

/** Place the bubble beside the target, flipping when it would overflow. */
function bubblePosition(rect: Rect | null, placement: TourPlacement = "auto") {
  if (!rect) {
    return { top: "50%", left: "50%", transform: "translate(-50%,-50%)" };
  }
  const side =
    placement === "auto"
      ? rect.top > (typeof window !== "undefined" ? window.innerHeight : 800) / 2
        ? "top"
        : "bottom"
      : placement;

  switch (side) {
    case "top":
      return {
        top: `${rect.top - 12}px`,
        left: `${rect.left + rect.width / 2}px`,
        transform: "translate(-50%,-100%)",
      };
    case "left":
      return {
        top: `${rect.top + rect.height / 2}px`,
        left: `${rect.left - 12}px`,
        transform: "translate(-100%,-50%)",
      };
    case "right":
      return {
        top: `${rect.top + rect.height / 2}px`,
        left: `${rect.left + rect.width + 12}px`,
        transform: "translate(0,-50%)",
      };
    default:
      return {
        top: `${rect.top + rect.height + 12}px`,
        left: `${rect.left + rect.width / 2}px`,
        transform: "translate(-50%,0)",
      };
  }
}

function Bubble({
  step,
  index,
  total,
  config,
  onNext,
  onBack,
  onSkip,
  style,
  className,
}: {
  step: TourStep;
  index: number;
  total: number;
  config: TourConfig;
  onNext: () => void;
  onBack: () => void;
  onSkip: () => void;
  style?: React.CSSProperties;
  className?: string;
}) {
  const last = index === total - 1;
  return (
    <div
      role="dialog"
      aria-label={step.title}
      style={style}
      className={cn(
        "ob-animate-in pointer-events-auto z-[70] w-[320px] max-w-[calc(100vw-2rem)] rounded-[var(--ob-radius-lg)] border border-[color:var(--ob-border)] bg-[color:var(--ob-surface)] p-4 [box-shadow:var(--ob-shadow-lg)]",
        className,
      )}
    >
      <div className="flex items-start gap-3">
        <h4 className="flex-1 font-bold">{step.title}</h4>
        {config.dismissible !== false && (
          <button
            type="button"
            onClick={onSkip}
            aria-label="Close tour"
            className="text-[color:var(--ob-muted)] hover:text-[color:var(--ob-fg)]"
          >
            <Cross />
          </button>
        )}
      </div>
      {step.body && (
        <p className="mt-1.5 text-[0.9rem] leading-relaxed text-[color:var(--ob-muted)]">
          {step.body}
        </p>
      )}
      <div className="mt-4 flex items-center gap-3">
        {config.showStepCount !== false && (
          <span className="text-[0.78rem] font-semibold tabular-nums text-[color:var(--ob-muted)]">
            {index + 1} / {total}
          </span>
        )}
        <div className="ml-auto flex items-center gap-2">
          {index > 0 && (
            <Button tone="ghost" size="sm" onClick={onBack}>
              Back
            </Button>
          )}
          <Button tone="brand" size="sm" onClick={onNext}>
            {step.ctaLabel ?? (last ? (config.finishLabel ?? "Finish") : "Next")}
          </Button>
        </div>
      </div>
    </div>
  );
}

/**
 * Product tour.
 *
 * `spotlight` and `beacon` anchor to real elements via CSS selectors;
 * `modal-sequence` and `feature-walkthrough` stand alone, so they work on a
 * page whose DOM the tour does not control.
 */
export function Tour({
  config,
  open,
  onComplete,
  onDismiss,
  className,
  inline,
}: TourProps) {
  const { emit } = useOnboarding();
  const [index, setIndex] = useState(0);
  const [selfOpen, setSelfOpen] = useState(true);
  const visible = open ?? selfOpen;

  const step = config.steps[index] ?? config.steps[0]!;
  const total = config.steps.length;
  const rect = useTargetRect(step?.target, visible && config.variant !== "modal-sequence");

  useEffect(() => {
    if (visible) emit("flow_started", config.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  const close = useCallback(() => {
    setSelfOpen(false);
    emit("flow_dismissed", config.id, step?.id);
    onDismiss?.();
  }, [emit, config.id, step?.id, onDismiss]);

  const next = useCallback(() => {
    emit("step_completed", config.id, step?.id);
    if (index >= total - 1) {
      setSelfOpen(false);
      emit("flow_completed", config.id);
      onComplete?.();
      return;
    }
    setIndex(index + 1);
  }, [index, total, emit, config.id, step?.id, onComplete]);

  const back = useCallback(() => setIndex((i) => Math.max(0, i - 1)), []);

  useKeyboard(visible, { Escape: close, ArrowRight: next, ArrowLeft: back });

  if (!visible || total === 0) return null;

  /* ------------------------ Feature walkthrough ------------------------ */
  if (config.variant === "feature-walkthrough") {
    return (
      <div
        className={cn(
          "grid gap-10 lg:grid-cols-2 lg:items-center",
          inline ? "" : "min-h-screen px-6 py-12 sm:px-10",
          className,
        )}
      >
        <div className="grid gap-8">
          {config.title && (
            <h2 className="text-balance text-3xl font-extrabold tracking-tight sm:text-[2.6rem]">
              {config.title}
            </h2>
          )}
          <ol className="grid gap-1 border-l-2 border-[color:var(--ob-border)]">
            {config.steps.map((item, i) => {
              const active = i === index;
              return (
                <li key={item.id} className="relative">
                  {active && (
                    <span
                      aria-hidden
                      className="absolute -left-[2px] top-0 h-full w-[3px] rounded-full"
                      style={{ background: item.accent ?? "var(--ob-brand)" }}
                    />
                  )}
                  <button
                    type="button"
                    onClick={() => setIndex(i)}
                    aria-current={active}
                    className="w-full px-5 py-4 text-left"
                  >
                    <span
                      className={cn(
                        "block text-xl font-bold transition-colors",
                        active
                          ? "text-[color:var(--ob-fg)]"
                          : "text-[color:var(--ob-muted)]",
                      )}
                    >
                      {item.title}
                    </span>
                    {active && item.body && (
                      <span className="ob-animate-in mt-1.5 block text-[0.95rem] leading-relaxed text-[color:var(--ob-fg-soft)]">
                        {item.body}
                      </span>
                    )}
                  </button>
                </li>
              );
            })}
          </ol>
          <Button
            tone="brand-soft"
            size="lg"
            onClick={next}
            className="justify-self-start"
          >
            {step.ctaLabel ?? config.finishLabel ?? "Get started"}
            <ArrowRight className="size-4" />
          </Button>
        </div>

        <div
          className="grid min-h-[420px] place-items-center rounded-[var(--ob-radius-lg)] p-8 transition-colors duration-500"
          style={{ background: step.panelTone ?? "var(--ob-surface-2)" }}
        >
          <div
            className="grid aspect-[4/3] w-full place-items-center overflow-hidden rounded-[var(--ob-radius)] bg-[color:var(--ob-surface)] text-5xl [box-shadow:var(--ob-shadow-lg)]"
            style={
              step.mediaKind === "image" && step.media
                ? { background: `center/cover no-repeat url(${step.media})` }
                : step.mediaKind === "gradient" && step.media
                  ? { background: step.media }
                  : undefined
            }
          >
            {step.mediaKind === "emoji" ? step.media : null}
          </div>
        </div>
      </div>
    );
  }

  /* -------------------------- Modal sequence -------------------------- */
  if (config.variant === "modal-sequence") {
    const body = (
      <div className="ob-animate-pop w-[440px] max-w-[calc(100vw-2rem)] overflow-hidden rounded-[var(--ob-radius-lg)] bg-[color:var(--ob-surface)] [box-shadow:var(--ob-shadow-lg)]">
        <div
          className="grid h-48 place-items-center text-5xl"
          style={{
            background:
              step.mediaKind === "image" && step.media
                ? `center/cover no-repeat url(${step.media})`
                : step.mediaKind === "gradient" && step.media
                  ? step.media
                  : "var(--ob-surface-2)",
          }}
        >
          {step.mediaKind === "emoji" ? step.media : null}
        </div>
        <div className="grid gap-2 p-6 text-center">
          <h3 className="text-xl font-extrabold tracking-tight">{step.title}</h3>
          {step.body && (
            <p className="text-pretty leading-relaxed text-[color:var(--ob-muted)]">
              {step.body}
            </p>
          )}
        </div>
        <div className="flex items-center gap-3 border-t border-[color:var(--ob-border)] p-4">
          {index > 0 ? (
            <Button tone="ghost" size="sm" onClick={back}>
              <ChevronLeft className="size-4" /> Back
            </Button>
          ) : (
            config.dismissible !== false && (
              <Button tone="ghost" size="sm" onClick={close}>
                {config.skipLabel ?? "Skip"}
              </Button>
            )
          )}
          {config.showDots !== false && (
            <Dots count={total} active={index} onSelect={setIndex} className="mx-auto" />
          )}
          <Button tone="brand" size="sm" onClick={next}>
            {step.ctaLabel ?? (index === total - 1 ? (config.finishLabel ?? "Done") : "Next")}
          </Button>
        </div>
      </div>
    );

    if (inline) return <div className={cn("grid place-items-center", className)}>{body}</div>;
    return (
      <div className="fixed inset-0 z-[70] grid place-items-center p-4">
        {config.backdrop !== false && (
          <button
            type="button"
            aria-label="Close tour"
            onClick={close}
            className="absolute inset-0 bg-black/55 backdrop-blur-[2px]"
          />
        )}
        <div className="relative">{body}</div>
      </div>
    );
  }

  /* ----------------------------- Beacon ----------------------------- */
  if (config.variant === "beacon") {
    return (
      <div data-ob-spotlight className={className}>
        {rect && (
          <>
            <span
              aria-hidden
              className="absolute size-4 rounded-full bg-[color:var(--ob-brand)] opacity-70"
              style={{
                top: rect.top + rect.height / 2 - 8,
                left: rect.left + rect.width - 8,
                animation: "ob-beacon 1.8s var(--ob-ease) infinite",
              }}
            />
            <span
              aria-hidden
              className="absolute size-3 rounded-full bg-[color:var(--ob-brand)]"
              style={{
                top: rect.top + rect.height / 2 - 6,
                left: rect.left + rect.width - 6,
              }}
            />
          </>
        )}
        <Bubble
          step={step}
          index={index}
          total={total}
          config={config}
          onNext={next}
          onBack={back}
          onSkip={close}
          style={{ position: "fixed", ...bubblePosition(rect, step.placement) }}
        />
      </div>
    );
  }

  /* ---------------------------- Spotlight ---------------------------- */
  return (
    <div data-ob-spotlight className={className}>
      {config.backdrop !== false && (
        <div
          aria-hidden
          className="pointer-events-auto absolute inset-0 transition-[box-shadow] duration-300"
          style={
            rect
              ? {
                  top: rect.top,
                  left: rect.left,
                  width: rect.width,
                  height: rect.height,
                  inset: "auto",
                  position: "fixed",
                  borderRadius: "var(--ob-radius)",
                  boxShadow: "0 0 0 9999px rgb(0 0 0 / 0.62)",
                }
              : { background: "rgb(0 0 0 / 0.62)" }
          }
          onClick={close}
        />
      )}
      {rect && (
        <span
          aria-hidden
          className="pointer-events-none fixed rounded-[var(--ob-radius)] ring-2 ring-[color:var(--ob-brand)] transition-all duration-300"
          style={{
            top: rect.top,
            left: rect.left,
            width: rect.width,
            height: rect.height,
          }}
        />
      )}
      <Bubble
        step={step}
        index={index}
        total={total}
        config={config}
        onNext={next}
        onBack={back}
        onSkip={close}
        style={{ position: "fixed", ...bubblePosition(rect, step.placement) }}
      />
    </div>
  );
}
