/**
 * onboarding-frame — SaaS onboarding flows as a config-driven UI library.
 *
 * Every pattern takes a plain-object config, so a flow can be authored in the
 * playground, serialised to JSON, and dropped into a product unchanged.
 */

export { OnboardingProvider, useOnboarding, themeToCssVars, canvasStyle } from "./provider/OnboardingProvider";
export type { OnboardingProviderProps } from "./provider/OnboardingProvider";

export { Wizard } from "./patterns/wizard/Wizard";
export type { WizardProps } from "./patterns/wizard/Wizard";
export { Orb, AmbientTiles, SidePanel, ReviewGrid, ConfirmCard } from "./patterns/wizard/parts";

export { Checklist } from "./patterns/checklist/Checklist";
export type { ChecklistProps } from "./patterns/checklist/Checklist";

export { Tour } from "./patterns/tour/Tour";
export type { TourProps } from "./patterns/tour/Tour";

export { EmptyState } from "./patterns/empty-state/EmptyState";
export type { EmptyStateProps } from "./patterns/empty-state/EmptyState";

export { Plans } from "./patterns/plans/Plans";
export type { PlansProps } from "./patterns/plans/Plans";
export { Countdown, ComparisonMatrix, QuotaMatrix, CheckoutPanel, PeriodToggle } from "./patterns/plans/parts";

export { Dashboard } from "./patterns/dashboard/Dashboard";
export * from "./patterns/dashboard/templates";
export type { DashboardProps } from "./patterns/dashboard/Dashboard";

export { Placeholder, LogoSlot, AvatarSlot, WordmarkSlot } from "./ui/placeholder";
export { Avatar, Thumb } from "./ui/avatar";
export { BrandMark, BrandTile } from "./ui/brand";
export { Wordmark } from "./ui/wordmark";
export { LineChart, BarChart, Donut, Ring, Sparkline, Heatmap, BarList } from "./ui/charts";
export { Field, isMultiple } from "./ui/fields";
export * from "./ui/primitives";

export { useWizard } from "./hooks/useWizard";
export type { WizardState, UseWizardOptions } from "./hooks/useWizard";
export { usePersistentState } from "./hooks/usePersistentState";
export { useKeyboard } from "./hooks/useKeyboard";

export { cn } from "./lib/cn";
export { formatMoney, percent, clamp } from "./lib/utils";

export type * from "./types";
export * from "./presets";
