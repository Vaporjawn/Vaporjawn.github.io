import { test, expect } from "@playwright/test";

/**
 * E2E: 404 / Not Found page
 *
 * Verifies that navigating to an unknown route renders the error page
 * with the expected 404 heading and a link to return to the homepage.
 */
test.describe("404 page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/this-route-does-not-exist-xyz-abc");
  });

  test("renders the 404 ERROR heading", async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: /404 ERROR/i })
    ).toBeVisible();
  });

  test("renders the 'Page not found' message", async ({ page }) => {
    await expect(page.getByText(/Page not found/i)).toBeVisible();
  });

  test("provides a link to return home", async ({ page }) => {
    // The error page should have a button/link that navigates back to /
    const homeLink = page.getByRole("link", { name: /home/i }).first();
    await expect(homeLink).toBeVisible();
  });

  test("another unknown path also shows 404", async ({ page }) => {
    await page.goto("/definitely/not/a/valid/page/12345");
    await expect(
      page.getByRole("heading", { name: /404 ERROR/i })
    ).toBeVisible();
  });
});
