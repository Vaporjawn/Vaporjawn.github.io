import { describe, expect, test } from "vitest";
import { normalizeSiteUrl } from "../normalizeSiteUrl";

describe("normalizeSiteUrl", () => {
  test("rewrites vaporjawn.github.io project pages to the vaporjawn.dev apex", () => {
    expect(normalizeSiteUrl("http://vaporjawn.github.io/Checkers/")).toBe(
      "https://vaporjawn.dev/Checkers/"
    );
    expect(normalizeSiteUrl("https://vaporjawn.github.io/SNEK/")).toBe(
      "https://vaporjawn.dev/SNEK/"
    );
  });

  test("rewrites the bare vaporjawn.github.io user site to the apex root", () => {
    expect(normalizeSiteUrl("https://vaporjawn.github.io")).toBe(
      "https://vaporjawn.dev/"
    );
  });

  test("rewrites www.vaporjawn.dev (broken TLS cert) to the apex", () => {
    expect(normalizeSiteUrl("https://www.vaporjawn.dev/")).toBe(
      "https://vaporjawn.dev/"
    );
  });

  test("upgrades a plain http vaporjawn.dev link to https", () => {
    expect(normalizeSiteUrl("http://vaporjawn.dev/Sud0ku/")).toBe(
      "https://vaporjawn.dev/Sud0ku/"
    );
  });

  test("leaves an already-correct vaporjawn.dev https link unchanged", () => {
    expect(normalizeSiteUrl("https://vaporjawn.dev/snapple-facts/")).toBe(
      "https://vaporjawn.dev/snapple-facts/"
    );
  });

  test("leaves unrelated external homepages untouched", () => {
    expect(normalizeSiteUrl("https://fake-checker-ai.vercel.app")).toBe(
      "https://fake-checker-ai.vercel.app"
    );
    expect(normalizeSiteUrl("https://klingon-translator-victor.surge.sh")).toBe(
      "https://klingon-translator-victor.surge.sh"
    );
    expect(normalizeSiteUrl("https://www.npmjs.com/package/some-pkg")).toBe(
      "https://www.npmjs.com/package/some-pkg"
    );
  });

  test("returns undefined for null/undefined/empty input", () => {
    expect(normalizeSiteUrl(undefined)).toBeUndefined();
    expect(normalizeSiteUrl(null)).toBeUndefined();
    expect(normalizeSiteUrl("")).toBeUndefined();
  });

  test("returns malformed/non-absolute strings unchanged rather than throwing", () => {
    expect(normalizeSiteUrl("not a url")).toBe("not a url");
  });
});
