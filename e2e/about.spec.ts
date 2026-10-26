import { test, expect } from "@playwright/test";

test.use({ headless: true, reducedMotion: "reduce", serviceWorkers: "block" });

for (const mode of ["dark", "light"] as const) {
  for (const [width, height] of [
    [320, 740],
    [390, 844],
    [768, 1024],
    [844, 390],
    [1024, 768],
    [1279, 900],
    [1280, 900],
    [1440, 900],
    [1535, 900],
    [1536, 900],
    [1920, 1080],
    [2560, 1440],
  ]) {
    test(`About stays centered and readable at ${width}x${height} in ${mode} mode`, async ({
      page,
    }) => {
      await page.setViewportSize({ width, height });
      await page.addInitScript((theme) => {
        localStorage.setItem("vaporjawn-theme-mode", theme);
      }, mode);
      await page.goto("/about");
      const heading = page.getByRole("heading", {
        level: 1,
        name: /About Victor Williams/i,
      });
      await expect(heading).toBeVisible();
      await page.evaluate(() => document.fonts.ready);
      const card = page.locator("main .MuiPaper-root").filter({ has: heading });
      await expect(card).toHaveCount(1);

      const bounds = await card.boundingBox();
      expect(bounds).not.toBeNull();
      expect(
        Math.abs(bounds!.x + bounds!.width / 2 - width / 2)
      ).toBeLessThanOrEqual(1);
      expect(bounds!.x).toBeGreaterThanOrEqual(16);
      expect(bounds!.x + bounds!.width).toBeLessThanOrEqual(width - 16 + 1);

      const layout = await page.locator("main").evaluate((main) => ({
        documentWidth: document.documentElement.scrollWidth,
        viewportWidth: window.innerWidth,
        clipped: Array.from(main.querySelectorAll("h1, h2, p, button, a"))
          .filter((element) => {
            const rect = element.getBoundingClientRect();
            return (
              rect.width > 0 &&
              (rect.left < -1 ||
                rect.right > window.innerWidth + 1 ||
                element.scrollWidth > element.clientWidth + 1)
            );
          })
          .map((element) => element.textContent?.trim()),
      }));
      expect(layout.documentWidth).toBeLessThanOrEqual(layout.viewportWidth);
      expect(layout.clipped).toEqual([]);
      const controls = await page
        .locator("header button, main button, main a")
        .evaluateAll((elements) =>
          elements
            .filter((element) => {
              const rect = element.getBoundingClientRect();
              return (
                rect.width > 0 &&
                (rect.left < -1 ||
                  rect.right > window.innerWidth + 1 ||
                  rect.width < 44 ||
                  rect.height < 44)
              );
            })
            .map(
              (element) =>
                element.getAttribute("aria-label") || element.textContent
            )
        );
      expect(controls).toEqual([]);
      await page
        .getByRole("heading", { name: "Get In Touch" })
        .scrollIntoViewIfNeeded();
      await expect(
        page.getByRole("button", { name: /victor\.williams\.dev@gmail\.com/i })
      ).toBeVisible();
    });
  }
}

test("About wraps an unbroken heading and remains reachable by keyboard", async ({
  page,
}) => {
  await page.setViewportSize({ width: 320, height: 740 });
  await page.goto("/about");
  const heading = page.getByRole("heading", { level: 1 });
  await expect(heading).toBeVisible();
  await heading.evaluate((element) => {
    element.textContent =
      "About AVeryLongUnbrokenNameThatMustStillFitOnAMobileScreen";
  });
  expect(
    await heading.evaluate(
      (element) => element.scrollWidth <= element.clientWidth + 1
    )
  ).toBe(true);
  const skip = page.getByRole("button", { name: /skip to main content/i });
  await page.keyboard.press("Tab");
  await expect(skip).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.locator("#main-content")).toBeFocused();
});

for (const [width, height] of [
  [320, 740],
  [844, 390],
  [1279, 900],
]) {
  test(`navigation and theme controls stay usable at ${width}x${height}`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height });
    await page.addInitScript(() =>
      localStorage.setItem("vaporjawn-theme-mode", "dark")
    );
    await page.goto("/about");
    await page.getByRole("button", { name: "open drawer" }).click();
    await expect(
      page.getByRole("button", { name: "Close navigation menu" })
    ).toBeInViewport();
    const toggle = page.getByRole("button", { name: "Switch to light mode" });
    await toggle.scrollIntoViewIfNeeded();
    await toggle.click();
    await expect
      .poll(() =>
        page.evaluate(() => localStorage.getItem("vaporjawn-theme-mode"))
      )
      .toBe("light");
    const about = page.getByRole("button", { name: "About", exact: true });
    await about.focus();
    await page.keyboard.press("Enter");
    await expect(
      page.getByRole("button", { name: "Close navigation menu" })
    ).toBeHidden();
    await expect(
      page.getByRole("heading", { name: /About Victor Williams/i, level: 1 })
    ).toBeVisible();
  });
}
