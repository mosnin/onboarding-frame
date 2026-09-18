export * from "./wizards";
export * from "./plans";
export * from "./surfaces";

import { wizardPresets } from "./wizards";
import { plansPresets } from "./plans";
import {
  checklistPresets,
  dashboardPresets,
  emptyStatePresets,
  tourPresets,
} from "./surfaces";

/** Every preset, grouped by pattern. */
export const presets = {
  wizard: wizardPresets,
  plans: plansPresets,
  checklist: checklistPresets,
  tour: tourPresets,
  "empty-state": emptyStatePresets,
  dashboard: dashboardPresets,
} as const;
