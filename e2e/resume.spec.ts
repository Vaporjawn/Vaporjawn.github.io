import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import { test, expect } from "@playwright/test";

test.use({ headless: true, reducedMotion: "reduce", serviceWorkers: "block" });

for (const width of [320, 390, 768, 1440]) {
  test(`resume preview and download serve the published PDF at ${width}px`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/resume");
    await expect(
      page.getByRole("heading", { name: "Resume", exact: true })
    ).toBeVisible();
    const viewer = page.getByTitle("Victor Williams Resume", { exact: true });
    await expect(viewer).toBeVisible();
    const path = await viewer.getAttribute("src");
    expect(path).toMatch(/\/assets\/Resume-.*\.pdf$/);
    const response = await page.request.get(path!);
    expect(response.ok()).toBe(true);
    expect(response.headers()["content-type"]).toContain("application/pdf");
    const expected = await readFile(
      new URL("../src/assets/Resume.pdf", import.meta.url)
    );
    const hash = (data: Buffer) =>
      createHash("sha256").update(data).digest("hex");
    expect(hash(await response.body())).toBe(hash(expected));
    const downloadPromise = page.waitForEvent("download");
    await page.getByRole("button", { name: "Download resume as PDF" }).click();
    const download = await downloadPromise;
    expect(download.suggestedFilename()).toBe("Victor_Williams_Resume.pdf");
    expect(await download.failure()).toBeNull();
    expect(hash(await readFile((await download.path())!))).toBe(hash(expected));
    const clipped = await page
      .locator("main button, main iframe")
      .evaluateAll((elements) =>
        elements
          .filter((element) => {
            const bounds = element.getBoundingClientRect();
            return bounds.left < 0 || bounds.right > innerWidth + 1;
          })
          .map(
            (element) => element.getAttribute("aria-label") || element.tagName
          )
      );
    expect(clipped).toEqual([]);
  });
}

test("career timeline includes the AI tools from the current resume", async ({
  page,
}) => {
  await page.goto("/");
  await page
    .getByText("Career Journey", { exact: true })
    .scrollIntoViewIfNeeded();
  for (const tool of ["Claude Code", "Codex", "GitHub Copilot"]) {
    await expect(page.getByText(tool, { exact: true })).toBeVisible();
  }
});
