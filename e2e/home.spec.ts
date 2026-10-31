import test, { expect } from "../src/test/e2e/util/test";

test.describe("Home Page", () => {
  test("loads successfully", async ({ homePage }) => {
    await homePage.goto();
    await expect(homePage.page).toHaveTitle(/Taproot/);
  });

  test("renders header", async ({ homePage }) => {
    await homePage.goto();
    await expect(homePage.getHeader()).toBeVisible();
  });

  test("shows the get started call to action", async ({ homePage }) => {
    await homePage.goto();
    await expect(homePage.getGetStartedButton()).toBeVisible();
  });

  test("links to the GitHub repository", async ({ homePage }) => {
    await homePage.goto();
    await expect(homePage.getGithubLink()).toBeVisible();
  });
});
