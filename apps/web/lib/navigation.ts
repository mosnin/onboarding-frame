import { templateCatalog } from "onboarding-frame";
import { catalog } from "./catalog";
import { shelves } from "./shelves";

/**
 * One index of everything the site can navigate to.
 *
 * The header search, the command palette and the browse sidebar all read from
 * here, so a piece added to a shelf shows up in all three without being
 * registered three times.
 */

export interface NavEntry {
  id: string;
  label: string;
  /** Where it sits: shown as the second line in search results. */
  group: string;
  href: string;
  keywords?: string;
}

export const GETTING_STARTED = [
  { id: "introduction", label: "Introduction", href: "/" },
  { id: "installation", label: "Installation", href: "/docs" },
  { id: "playground", label: "Playground", href: "/playground" },
];

export const SHELF_LINKS = shelves.map((shelf) => ({
  id: shelf.id,
  label: shelf.name,
  href: `/shelf/${shelf.id}`,
  count: shelf.items.length,
  glyph: shelf.glyph,
}));

/** Every searchable destination, flattened once at module load. */
export const navIndex: NavEntry[] = [
  ...GETTING_STARTED.map((entry) => ({
    id: `page:${entry.id}`,
    label: entry.label,
    group: "Get started",
    href: entry.href,
  })),
  {
    id: "page:kit",
    label: "Your kit",
    group: "Get started",
    href: "/kit",
    keywords: "export agent prompt",
  },
  ...shelves.flatMap((shelf) =>
    shelf.items.map((item) => ({
      id: `${shelf.id}:${item.id}`,
      label: item.name,
      group: shelf.name,
      href:
        shelf.id === "dashboard"
          ? `/templates/${item.variant}`
          : `/playground?pattern=${item.kind}&variant=${item.variant}`,
      keywords: `${item.blurb} ${item.tags?.join(" ") ?? ""}`,
    })),
  ),
  ...templateCatalog.map((template) => ({
    id: `template:${template.slug}`,
    label: template.name,
    group: "Dashboard templates",
    href: `/templates/${template.slug}`,
    keywords: template.blurb,
  })),
  ...catalog.flatMap((pattern) =>
    pattern.variants.map((variant) => ({
      id: `pattern:${pattern.slug}:${variant.id}`,
      label: `${pattern.name} — ${variant.name}`,
      group: "Patterns",
      href: `/patterns/${pattern.slug}?variant=${variant.id}`,
      keywords: variant.blurb,
    })),
  ),
];

/** Case-insensitive substring match across label, group and keywords. */
export function searchNav(query: string, limit = 24): NavEntry[] {
  const needle = query.trim().toLowerCase();
  if (!needle) return [];

  const scored: { entry: NavEntry; score: number }[] = [];
  for (const entry of navIndex) {
    const label = entry.label.toLowerCase();
    // A label match outranks a description match, so typing a name finds it.
    const score = label.startsWith(needle)
      ? 0
      : label.includes(needle)
        ? 1
        : `${entry.group} ${entry.keywords ?? ""}`
              .toLowerCase()
              .includes(needle)
          ? 2
          : -1;
    if (score >= 0) scored.push({ entry, score });
  }

  return scored
    .sort((a, b) => a.score - b.score)
    .slice(0, limit)
    .map((hit) => hit.entry);
}

export const FOOTER_COLUMNS = [
  {
    title: "Browse",
    links: [
      { label: "Onboarding", href: "/shelf/onboarding" },
      { label: "Dashboards", href: "/shelf/dashboard" },
      { label: "Pricing", href: "/shelf/pricing" },
      { label: "Add-ons", href: "/shelf/addons" },
      { label: "All templates", href: "/templates" },
    ],
  },
  {
    title: "Build",
    links: [
      { label: "Playground", href: "/playground" },
      { label: "Your kit", href: "/kit" },
      { label: "Patterns", href: "/patterns/wizard" },
    ],
  },
  {
    title: "Docs",
    links: [
      { label: "Introduction", href: "/" },
      { label: "Installation", href: "/docs" },
      { label: "Registry", href: "/registry" },
    ],
  },
];
