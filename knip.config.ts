import type { KnipConfig } from "knip";

/**
 * Knip configuration.
 * @see https://knip.dev/overview/configuration
 */
const knipConfig: KnipConfig = {
  entry: ["src/routes/**/*.{ts,tsx}", "src/router.tsx"],
  project: ["src/**/*.{ts,tsx,css}"],
  // used for proper management of Thornberry components, see https://knip.dev/reference/configuration#ignoreexportsusedinfile
  ignoreExportsUsedInFile: true,
  ignore: ["**/*.gen.*", "src/test/**", "**/*.test.{ts,tsx}"],
  ignoreDependencies: [
    // Nitro runtime dependency
    "srvx",
    "@testing-library/jest-dom",
    "@testing-library/dom",
    "@testing-library/react",
    "happy-dom",
  ],
  tags: ["-knipignore"],
};

export default knipConfig;
