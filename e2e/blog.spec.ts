import { test, expect } from "@playwright/test";

/**
 * E2E: Blog list page (/blog)
 *
 * Verifies that the blog listing page loads, shows the heading, and
 * renders at least one blog post card. The page uses placeholder posts
 * so no real Firestore fetch is required.
 */
test.describe("Blog list page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/blog");
  });

  test("renders the Technical Blog heading", async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: /Technical Blog/i })
    ).toBeVisible();
  });

  test("page title contains Blog", async ({ page }) => {
    await expect(page).toHaveTitle(/Blog/i);
  });

  test("renders at least one blog post card", async ({ page }) => {
    // Placeholder posts are rendered as cards — look for a card heading
    // The first placeholder post title is known:
    const firstPost = page.getByText(/Building a Modern Portfolio with React/i);
    await expect(firstPost).toBeVisible({ timeout: 10_000 });
  });

  test("renders the sort/filter controls", async ({ page }) => {
    // MUI Select renders as a combobox — locate by role which is stable regardless of label association
    const sortControl = page.getByRole("combobox").first();
    await expect(sortControl).toBeVisible();
  });

  test("search input is present", async ({ page }) => {
    const searchBox = page.getByPlaceholder(/Search/i);
    await expect(searchBox).toBeVisible();
  });
});
