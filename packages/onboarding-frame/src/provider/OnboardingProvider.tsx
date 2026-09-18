"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import type {
  ColorScheme,
  OnboardingEvent,
  OnboardingEventName,
  OnboardingTheme,
} from "../types";
import { cn } from "../lib/cn";

interface OnboardingContextValue {
  theme: OnboardingTheme;
  scheme: ColorScheme;
  setScheme: (scheme: ColorScheme) => void;
  emit: (
    name: OnboardingEventName,
    flowId: string,
    targetId?: string,
    data?: Record<string, unknown>,
  ) => void;
}

const OnboardingContext = createContext<OnboardingContextValue | null>(null);

/** Access the ambient theme and event emitter. Safe to call outside a provider. */
export function useOnboarding(): OnboardingContextValue {
  const ctx = useContext(OnboardingContext);
  if (ctx) return ctx;
  // Standalone fallback so every component renders without a provider.
  return {
    theme: {},
    scheme: "light",
    setScheme: () => {},
    emit: () => {},
  };
}

/** Translate a theme object into the CSS custom properties the styles read. */
export function themeToCssVars(theme: OnboardingTheme): CSSProperties {
  const vars: Record<string, string> = {};
  if (theme.brand) vars["--ob-brand"] = theme.brand;
  if (theme.brandForeground) vars["--ob-brand-fg"] = theme.brandForeground;
  if (theme.ctaBackground) vars["--ob-cta-bg"] = theme.ctaBackground;
  if (theme.ctaForeground) vars["--ob-cta-fg"] = theme.ctaForeground;
  if (theme.radius) vars["--ob-radius"] = theme.radius;
  if (theme.density !== undefined) vars["--ob-density"] = String(theme.density);
  if (theme.fontFamily) vars["--ob-font-sans"] = theme.fontFamily;
  if (theme.displayFontFamily) vars["--ob-font-display"] = theme.displayFontFamily;
  return vars as CSSProperties;
}

/** Background layer for full-screen flows. */
export function canvasStyle(theme: OnboardingTheme): CSSProperties {
  const canvas = theme.canvas;
  if (!canvas || canvas.kind === "solid") return { background: "var(--ob-bg)" };

  const stops = canvas.stops?.length
    ? canvas.stops
    : ["#2b2350", "#3a2d1c", "#141414"];
  const [a, b, c] = [stops[0]!, stops[1] ?? stops[0]!, stops[2] ?? "var(--ob-bg)"];

  if (canvas.kind === "spotlight-glow") {
    return {
      background: `radial-gradient(90% 70% at 50% 0%, ${a} 0%, transparent 70%), ${c}`,
    };
  }
  // mesh
  return {
    background: [
      `radial-gradient(60% 50% at 0% 0%, ${a} 0%, transparent 60%)`,
      `radial-gradient(55% 45% at 100% 0%, ${b} 0%, transparent 60%)`,
      c,
    ].join(", "),
  };
}

export interface OnboardingProviderProps {
  children: ReactNode;
  theme?: OnboardingTheme;
  /** Receives every event the flows emit — wire this to your analytics. */
  onEvent?: (event: OnboardingEvent) => void;
  className?: string;
}

/**
 * Supplies theming and analytics to every flow beneath it.
 *
 * Flows render correctly without a provider; wrapping them only adds shared
 * theming and a single event sink.
 */
export function OnboardingProvider({
  children,
  theme = {},
  onEvent,
  className,
}: OnboardingProviderProps) {
  const [scheme, setScheme] = useState<ColorScheme>(theme.scheme ?? "light");

  // Follow the theme prop when the consumer drives the scheme externally.
  const activeScheme = theme.scheme ?? scheme;

  const emit = useCallback<OnboardingContextValue["emit"]>(
    (name, flowId, targetId, data) => {
      onEvent?.({ name, flowId, targetId, at: Date.now(), data });
    },
    [onEvent],
  );

  const value = useMemo<OnboardingContextValue>(
    () => ({ theme, scheme: activeScheme, setScheme, emit }),
    [theme, activeScheme, emit],
  );

  return (
    <OnboardingContext.Provider value={value}>
      <div
        data-ob-root=""
        data-ob-scheme={activeScheme}
        style={themeToCssVars(theme)}
        className={cn(
          "ob-root font-[family-name:var(--ob-font-sans)] text-[color:var(--ob-fg)]",
          className,
        )}
      >
        {children}
      </div>
    </OnboardingContext.Provider>
  );
}
