import type { NextConfig } from "next";

const config: NextConfig = {
  // Compile the workspace package from source so the docs site and the
  // library stay in lockstep during development.
  transpilePackages: ["onboarding-frame"],
  experimental: { optimizePackageImports: ["onboarding-frame"] },
};

export default config;
