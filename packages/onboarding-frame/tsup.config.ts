import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm", "cjs"],
  dts: true,
  sourcemap: true,
  clean: true,
  // Treeshaking runs rollup after esbuild and drops module-level directives,
  // which silently strips the "use client" banner below. Every component here
  // uses hooks, so losing that directive breaks the package in React Server
  // Component apps — the main place it is meant to run.
  treeshake: false,
  external: ["react", "react-dom"],
  banner: { js: '"use client";' },
});
