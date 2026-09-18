import { readFile } from "node:fs/promises";
import path from "node:path";
import { templateCatalog } from "onboarding-frame";
import { catalog } from "./catalog";

/**
 * Source registry.
 *
 * The docs site advertises `npx onboarding-frame add <item>`, so something has
 * to actually serve that source. Rather than keep a second copy of every
 * component, the registry reads the package's own files at build time and
 * publishes them as static JSON — which means an ejected copy is byte-for-byte
 * the code the package ships, and cannot drift from it.
 */

export interface RegistryFile {
  /** Path relative to the destination directory the CLI writes into. */
  path: string;
  content: string;
}

export interface RegistryItem {
  name: string;
  title: string;
  description: string;
  /** npm packages the ejected source needs. */
  dependencies: string[];
  /** Other registry items that must be installed alongside this one. */
  registryDependencies: string[];
  files: RegistryFile[];
  /** Variant ids this item implements, when it is a config-driven pattern. */
  variants?: { id: string; name: string; blurb: string }[];
}

/** Package root, resolved from the web app's working directory at build time. */
const PACKAGE_ROOT = path.join(
  process.cwd(),
  "..",
  "..",
  "packages",
  "onboarding-frame",
);

// ui/icons.tsx re-exports Lucide, ui/icons-solid.tsx re-exports Phosphor and
// ui/brand.tsx reads Simple Icons' path data, so an ejected piece needs all
// three installed.
const RUNTIME_DEPENDENCIES = [
  "clsx",
  "tailwind-merge",
  "lucide-react",
  "@phosphor-icons/react",
  "simple-icons",
];

/**
 * Files every ejected piece needs. Splitting these into their own item means a
 * project that ejects three patterns gets one copy of the primitives, not
 * three.
 */
const CORE_FILES = [
  "src/types.ts",
  "src/styles.css",
  "src/lib/cn.ts",
  "src/lib/utils.ts",
  "src/provider/OnboardingProvider.tsx",
  "src/ui/primitives.tsx",
  "src/ui/icons.tsx",
  "src/ui/icons-solid.tsx",
  "src/ui/brand.tsx",
  "src/ui/avatar.tsx",
  "src/ui/wordmark.tsx",
  "src/ui/glyph.tsx",
  "src/ui/fields.tsx",
  "src/ui/placeholder.tsx",
  "src/hooks/usePersistentState.ts",
  "src/hooks/useKeyboard.ts",
];

/** Per-pattern source, on top of core. */
const PATTERN_FILES: Record<string, string[]> = {
  wizard: [
    "src/patterns/wizard/Wizard.tsx",
    "src/patterns/wizard/parts.tsx",
    "src/hooks/useWizard.ts",
  ],
  checklist: ["src/patterns/checklist/Checklist.tsx"],
  tour: ["src/patterns/tour/Tour.tsx"],
  "empty-state": ["src/patterns/empty-state/EmptyState.tsx"],
  plans: ["src/patterns/plans/Plans.tsx", "src/patterns/plans/parts.tsx"],
};

/** Dashboard templates share the app chrome, the token scopes and the charts. */
const DASHBOARD_SHELL = [
  "src/patterns/dashboard/templates/props.ts",
  "src/patterns/dashboard/templates/chrome.tsx",
  "src/patterns/dashboard/templates/tokens.tsx",
  "src/ui/charts.tsx",
];

/**
 * Template slug to source file. Kept explicit rather than derived from the
 * slug, because a few templates carry a second file and a silent mismatch here
 * would ship a broken eject.
 */
const TEMPLATE_EXTRA_FILES: Record<string, string[]> = {
  "api-console": ["src/patterns/dashboard/templates/api-console-pages.tsx"],
};

async function readSource(relative: string): Promise<RegistryFile> {
  const absolute = path.join(PACKAGE_ROOT, relative);
  const content = await readFile(absolute, "utf8");
  // Drop the leading `src/` so the CLI writes into the destination directly.
  return { path: relative.replace(/^src\//, ""), content };
}

async function readAll(paths: string[]): Promise<RegistryFile[]> {
  const files = await Promise.all(paths.map(readSource));
  return files;
}

export async function registryItemNames(): Promise<string[]> {
  return [
    "core",
    ...Object.keys(PATTERN_FILES),
    "dashboard-shell",
    ...templateCatalog.map((template) => template.slug),
  ];
}

export async function getRegistryItem(
  name: string,
): Promise<RegistryItem | null> {
  if (name === "core") {
    return {
      name: "core",
      title: "Core",
      description:
        "Design tokens, the provider, shared primitives and the config types every other item builds on.",
      dependencies: RUNTIME_DEPENDENCIES,
      registryDependencies: [],
      files: await readAll(CORE_FILES),
    };
  }

  if (name === "dashboard-shell") {
    return {
      name: "dashboard-shell",
      title: "Dashboard shell",
      description:
        "App chrome, per-template token scopes and the dependency-free chart kit the dashboard templates share.",
      dependencies: RUNTIME_DEPENDENCIES,
      registryDependencies: ["core"],
      files: await readAll(DASHBOARD_SHELL),
    };
  }

  const pattern = catalog.find((entry) => entry.slug === name);
  if (pattern && PATTERN_FILES[pattern.slug]) {
    return {
      name: pattern.slug,
      title: pattern.name,
      description: pattern.description,
      dependencies: RUNTIME_DEPENDENCIES,
      registryDependencies: ["core"],
      files: await readAll(PATTERN_FILES[pattern.slug]!),
      variants: pattern.variants,
    };
  }

  const template = templateCatalog.find((entry) => entry.slug === name);
  if (template) {
    const files = [
      `src/patterns/dashboard/templates/${template.slug}.tsx`,
      ...(TEMPLATE_EXTRA_FILES[template.slug] ?? []),
    ];
    return {
      name: template.slug,
      title: template.name,
      description: template.blurb,
      dependencies: RUNTIME_DEPENDENCIES,
      registryDependencies: ["core", "dashboard-shell"],
      files: await readAll(files),
    };
  }

  return null;
}
