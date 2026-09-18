#!/usr/bin/env node
/**
 * Verify every registry item ejects into a self-contained tree.
 *
 * A template that imports a file the registry does not ship still builds fine
 * inside this repo — the import resolves against the package source — and only
 * breaks for someone running `onboarding-frame add`. That failure mode is
 * invisible from the inside, so it gets a check of its own.
 *
 * Run after `pnpm --filter web build`, against the prerendered registry.
 */

import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const REGISTRY_DIR = path.join(
  process.cwd(),
  "apps",
  "web",
  ".next",
  "server",
  "app",
  "registry",
);

/** Extensions the TypeScript resolver would try, in order. */
const EXTENSIONS = ["", ".ts", ".tsx", ".css", "/index.ts", "/index.tsx"];

async function loadItems() {
  let entries;
  try {
    entries = await readdir(REGISTRY_DIR);
  } catch {
    console.error(
      `✗ No prerendered registry at ${REGISTRY_DIR}\n  Run \`pnpm --filter web build\` first.`,
    );
    process.exit(1);
  }

  const items = new Map();
  for (const entry of entries) {
    if (!entry.endsWith(".json.body")) continue;
    const raw = await readFile(path.join(REGISTRY_DIR, entry), "utf8");
    const item = JSON.parse(raw);
    items.set(item.name, item);
  }
  return items;
}

/** Collect an item plus everything it declares, the way the CLI does. */
function collect(items, name, seen = new Set()) {
  if (seen.has(name)) return seen;
  seen.add(name);
  const item = items.get(name);
  if (!item) return seen;
  for (const dependency of item.registryDependencies ?? []) {
    collect(items, dependency, seen);
  }
  return seen;
}

function checkItem(items, name) {
  const names = [...collect(items, name)];
  const missingItems = names.filter((candidate) => !items.has(candidate));
  if (missingItems.length > 0) {
    return [`declares unknown registry dependencies: ${missingItems.join(", ")}`];
  }

  const files = names.flatMap((candidate) => items.get(candidate).files);
  const present = new Set(files.map((file) => file.path));
  const problems = [];

  for (const file of files) {
    if (!/\.tsx?$/.test(file.path)) continue;
    const directory = path.posix.dirname(file.path);

    for (const match of file.content.matchAll(/from\s+"(\.[^"]+)"/g)) {
      const specifier = match[1];
      const resolved = path.posix.normalize(path.posix.join(directory, specifier));
      const found = EXTENSIONS.some((extension) => present.has(`${resolved}${extension}`));
      if (!found) {
        problems.push(`${file.path} imports "${specifier}", which the registry does not ship`);
      }
    }

    // An ejected file importing the package would defeat the point of ejecting.
    if (/from\s+"onboarding-frame(\/[^"]*)?"/.test(file.content)) {
      problems.push(`${file.path} imports the package it was ejected from`);
    }
  }

  return problems;
}

const items = await loadItems();
if (items.size === 0) {
  console.error("✗ The prerendered registry is empty.");
  process.exit(1);
}

let failures = 0;
for (const name of [...items.keys()].sort()) {
  const problems = checkItem(items, name);
  if (problems.length > 0) {
    failures += 1;
    console.error(`\n✗ ${name}`);
    for (const problem of problems) console.error(`    ${problem}`);
  }
}

if (failures > 0) {
  console.error(`\n${failures} registry item(s) would not eject cleanly.`);
  process.exit(1);
}

console.log(`✓ ${items.size} registry items eject cleanly`);
