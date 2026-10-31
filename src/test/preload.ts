import { afterEach } from "bun:test";

import { GlobalRegistrator } from "@happy-dom/global-registrator";

/**
 * Global test preload - runs once before all test files.
 * Sets up happy-dom for DOM testing.
 */

// Register happy-dom globals for React Testing Library
GlobalRegistrator.register();

// Clean up DOM between tests
afterEach(() => {
  document.body.innerHTML = "";
});

/**
 * Cleanup handler for test environment teardown.
 */
const cleanup = () => {
  GlobalRegistrator.unregister();
};

// Register cleanup handlers for various exit scenarios
process.on("beforeExit", cleanup);
process.on("SIGINT", () => {
  cleanup();
  process.exit(130);
});
process.on("SIGTERM", () => {
  cleanup();
  process.exit(143);
});
