import { createPageObject } from "@/test/e2e/util";

import type { PageObjectContext } from "@/test/e2e/util";

/**
 * Home page object.
 */
const createHomePageObject = ({ page, context }: PageObjectContext) =>
  createPageObject({
    page,
    context,
    name: "Home",
    baseUrl: "/",
    // Page-specific helpers
    getGithubLink: () => page.getByRole("link", { name: "GitHub" }).first(),
    getGetStartedButton: () => page.getByRole("link", { name: /get started/i }),
    getThemeToggle: () => page.getByRole("button").first(),
    getHeader: () => page.locator("header"),
  });

export type HomePageObject = ReturnType<typeof createHomePageObject>;

export default createHomePageObject;
