#!/usr/bin/env node
/**
 * onboarding-frame CLI.
 *
 * Ejects a piece's source into a project, the way `shadcn` does — because the
 * library is meant to be owned as well as imported. The source comes from the
 * published registry, which is generated from this package's own files, so an
 * ejected copy is the same code the package ships rather than a second
 * maintained version of it.
 */

import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

// The deployed catalogue. Override with --registry (or ONBOARDING_FRAME_REGISTRY)
// when pointing at a fork or a local `next start`.
const DEFAULT_REGISTRY =
  process.env.ONBOARDING_FRAME_REGISTRY ??
  "https://onboarding-frame-mosnins-projects.vercel.app/registry";
const DEFAULT_DIR = "components/onboarding";

const HELP = `
onboarding-frame — add onboarding UI source to your project

Usage
  npx onboarding-frame add <item...> [options]
  npx onboarding-frame list
  npx onboarding-frame help

Items
  An item is a pattern (wizard, checklist, tour, empty-state, plans), a
  dashboard template slug (api-console, crm-workspace, …), or "core".
  A pattern may be written as <pattern>/<variant> — the variant selects which
  preset to use, and the CLI prints the snippet for it after copying.

Options
  --dir <path>       Where to write files. Default: ${DEFAULT_DIR}
  --cwd <path>       Project root. Default: the current directory
  --registry <url>   Registry base URL. Default: the public one, or
                     $ONBOARDING_FRAME_REGISTRY when that is set
  --overwrite        Replace files that already exist
  --dry-run          Print what would be written, write nothing
  --help, -h         Show this message
`;

function parseArgs(argv) {
  const options = {
    dir: DEFAULT_DIR,
    cwd: process.cwd(),
    registry: process.env.ONBOARDING_FRAME_REGISTRY ?? DEFAULT_REGISTRY,
    overwrite: false,
    dryRun: false,
  };
  const items = [];

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    switch (arg) {
      case "--dir":
      case "--cwd":
      case "--registry": {
        const value = argv[index + 1];
        if (!value) fail(`${arg} needs a value`);
        options[arg === "--dir" ? "dir" : arg === "--cwd" ? "cwd" : "registry"] = value;
        index += 1;
        break;
      }
      case "--overwrite":
        options.overwrite = true;
        break;
      case "--dry-run":
        options.dryRun = true;
        break;
      case "--help":
      case "-h":
        console.log(HELP.trim());
        process.exit(0);
        break;
      default:
        if (arg.startsWith("-")) fail(`Unknown option: ${arg}`);
        items.push(arg);
    }
  }

  return { options, items };
}

function fail(message) {
  console.error(`✗ ${message}`);
  process.exit(1);
}

async function fetchItem(registry, name) {
  const url = `${registry.replace(/\/$/, "")}/${name}.json`;
  let response;
  try {
    response = await fetch(url);
  } catch (error) {
    fail(`Could not reach the registry at ${url}\n  ${error.message}`);
  }
  if (response.status === 404) {
    fail(`No registry item named "${name}". Run \`npx onboarding-frame list\` to see them.`);
  }
  if (!response.ok) {
    fail(`Registry returned ${response.status} for ${url}`);
  }
  return readJson(response, url);
}

/**
 * A misconfigured `--registry` usually returns an HTML page, and letting
 * JSON.parse throw at that point reports a syntax error in someone else's
 * server rather than the thing they got wrong.
 */
async function readJson(response, url) {
  const body = await response.text();
  try {
    return JSON.parse(body);
  } catch {
    fail(`${url} did not return JSON. Check --registry points at a registry index.`);
  }
}

/**
 * Resolve an item and everything it needs, depth-first, without duplicates —
 * so ejecting three patterns copies the shared core once.
 */
async function resolve(registry, names) {
  const seen = new Map();

  async function visit(name) {
    if (seen.has(name)) return;
    const item = await fetchItem(registry, name);
    // Mark before recursing so a cycle cannot spin forever.
    seen.set(name, item);
    for (const dependency of item.registryDependencies ?? []) {
      await visit(dependency);
    }
  }

  for (const name of names) await visit(name);
  return [...seen.values()];
}

async function exists(file) {
  try {
    await readFile(file);
    return true;
  } catch {
    return false;
  }
}

async function add(items, options) {
  if (items.length === 0) fail("Name at least one item to add.");

  // `wizard/fullscreen-quiz` installs the wizard; the variant picks the preset.
  const requested = items.map((item) => {
    const [name, variant] = item.split("/");
    return { name, variant };
  });

  const resolved = await resolve(options.registry, requested.map((entry) => entry.name));
  const target = path.resolve(options.cwd, options.dir);

  const written = [];
  const skipped = [];
  const dependencies = new Set();

  for (const item of resolved) {
    for (const dependency of item.dependencies ?? []) dependencies.add(dependency);

    for (const file of item.files) {
      const destination = path.join(target, file.path);
      if (!options.overwrite && (await exists(destination))) {
        skipped.push(path.relative(options.cwd, destination));
        continue;
      }
      if (!options.dryRun) {
        await mkdir(path.dirname(destination), { recursive: true });
        await writeFile(destination, file.content, "utf8");
      }
      written.push(path.relative(options.cwd, destination));
    }
  }

  const verb = options.dryRun ? "Would write" : "Wrote";
  console.log(`\n${verb} ${written.length} file${written.length === 1 ? "" : "s"} to ${options.dir}`);
  for (const file of written) console.log(`  + ${file}`);

  if (skipped.length > 0) {
    console.log(`\nSkipped ${skipped.length} existing file${skipped.length === 1 ? "" : "s"} (pass --overwrite to replace):`);
    for (const file of skipped) console.log(`  · ${file}`);
  }

  if (dependencies.size > 0) {
    console.log(`\nInstall the runtime dependencies:\n  npm install ${[...dependencies].join(" ")}`);
  }

  console.log(`\nImport the stylesheet once, at your app's entry point:\n  import "./${options.dir}/styles.css";`);

  for (const entry of requested) {
    if (!entry.variant) continue;
    const item = resolved.find((candidate) => candidate.name === entry.name);
    const known = item?.variants?.some((variant) => variant.id === entry.variant);
    if (!known) {
      console.log(`\n! "${entry.name}" has no variant "${entry.variant}" — copied the pattern anyway.`);
      if (item?.variants?.length) {
        console.log(`  Available: ${item.variants.map((variant) => variant.id).join(", ")}`);
      }
      continue;
    }
    console.log(`\nUse the ${entry.variant} variant:\n  const { config, theme } = presets.${entry.name}["${entry.variant}"];`);
  }
}

async function list(options) {
  const url = `${options.registry.replace(/\/$/, "")}`;
  let response;
  try {
    response = await fetch(url);
  } catch (error) {
    fail(`Could not reach the registry at ${url}\n  ${error.message}`);
  }
  if (!response.ok) fail(`Registry returned ${response.status} for ${url}`);

  const { items } = await readJson(response, url);
  if (!Array.isArray(items) || items.length === 0) {
    fail(`${url} returned no items.`);
  }
  const width = Math.max(...items.map((item) => item.name.length));
  console.log("");
  for (const item of items) {
    console.log(`  ${item.name.padEnd(width)}  ${item.title}`);
  }
  console.log(`\n  ${items.length} items · npx onboarding-frame add <name>\n`);
}

async function main() {
  const [command, ...rest] = process.argv.slice(2);
  const { options, items } = parseArgs(rest);

  switch (command) {
    case "add":
      await add(items, options);
      break;
    case "list":
      await list(options);
      break;
    case undefined:
    case "help":
      console.log(HELP.trim());
      break;
    default:
      fail(`Unknown command: ${command}\n\n${HELP.trim()}`);
  }
}

main().catch((error) => fail(error.stack ?? error.message));
