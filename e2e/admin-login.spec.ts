import { test, expect } from "@playwright/test";

/**
 * E2E: Admin login page (/admin/login)
 *
 * Tests:
 * 1. The login page renders correctly.
 * 2. Submitting an incorrect password shows an error message.
 * 3. The protected /admin route redirects unauthenticated users to the login page.
 *
 * Note: We cannot test a successful login here without knowing the real
 * admin password (stored as VITE_ADMIN_PASSWORD_HASH). That is intentional —
 * the correct-password test would require either a test .env file or a
 * dedicated test admin hash that mirrors the dev environment setup.
 */
test.describe("Admin login", () => {
  test("renders the Admin Access heading", async ({ page }) => {
    await page.goto("/admin/login");
    await expect(
      page.getByRole("heading", { name: /Admin Access/i })
    ).toBeVisible();
  });

  test("renders a password input field", async ({ page }) => {
    await page.goto("/admin/login");
    const passwordInput = page.getByLabel(/Password/i);
    await expect(passwordInput).toBeVisible();
  });

  test("renders a Login submit button", async ({ page }) => {
    await page.goto("/admin/login");
    const loginButton = page.getByRole("button", { name: /Login/i });
    await expect(loginButton).toBeVisible();
  });

  test("shows an error message for an incorrect password", async ({ page }) => {
    await page.goto("/admin/login");

    // Fill the password field with a clearly wrong value and submit
    await page.getByLabel(/Password/i).fill("wrong-password-1234!");
    await page.getByRole("button", { name: /Login/i }).click();

    // The error alert should appear
    await expect(
      page.getByText(/Invalid password\. Please try again\./i)
    ).toBeVisible({ timeout: 8_000 });
  });

  test("unauthenticated /admin access redirects to login page", async ({
    page,
  }) => {
    // When not authenticated, visiting /admin should land on /admin/login
    await page.goto("/admin");
    await expect(page).toHaveURL(/\/admin\/login/);
    await expect(
      page.getByRole("heading", { name: /Admin Access/i })
    ).toBeVisible();
  });
});
