import { test, expect } from "@playwright/test";

/**
 * E2E: Home page
 *
 * Verifies that the homepage loads correctly, renders the hero content,
 * and includes basic navigation links. These are smoke tests — if they
 * fail, something fundamental is broken in the build or routing.
 */
test.describe("Home page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("renders the hero heading with the owner name", async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: /VICTOR WILLIAMS/i })
    ).toBeVisible();
  });

  test("renders the professional title", async ({ page }) => {
    await expect(
      page.getByText(/SOFTWARE DEVELOPER & DIGITAL CREATIVE/i)
    ).toBeVisible();
  });

  test("page title contains the site name", async ({ page }) => {
    await expect(page).toHaveTitle(/Victor Williams/i);
  });

  test("navigation header is present", async ({ page }) => {
    // The header/nav renders for all public routes
    const header = page.locator("header").first();
    await expect(header).toBeVisible();
  });

  test("renders at least one social media link", async ({ page }) => {
    // HeroContent renders social links as anchor tags
    const links = page.getByRole("link");
    await expect(links.first()).toBeVisible();
    const count = await links.count();
    expect(count).toBeGreaterThan(0);
  });
});
