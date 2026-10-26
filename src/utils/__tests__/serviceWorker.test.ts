// @vitest-environment node
import { readFileSync } from "node:fs";
import { runInNewContext } from "node:vm";
import { describe, expect, it, vi } from "vitest";

const source = readFileSync(
  new URL("../../../public/service-worker.js", import.meta.url),
  "utf8"
);

describe("GitHub Pages service worker upgrades", () => {
  it("installs when deep SPA routes return 404, then evicts the previous release", async () => {
    const handlers: Record<
      string,
      (event: { waitUntil: (work: Promise<unknown>) => void }) => void
    > = {};
    let installedCache = "";
    const remove = vi.fn(async () => true);
    const claim = vi.fn();
    const skipWaiting = vi.fn();
    runInNewContext(source, {
      self: {
        addEventListener: (
          name: string,
          handler: (typeof handlers)[string]
        ) => {
          handlers[name] = handler;
        },
        skipWaiting,
        clients: { claim },
      },
      caches: {
        open: async (name: string) => {
          installedCache = name;
          return {
            addAll: async (urls: string[]) => {
              for (const url of urls) {
                if (!["/", "/index.html"].includes(url)) {
                  throw new Error(`GitHub Pages returned HTTP 404 for ${url}`);
                }
              }
            },
          };
        },
        keys: async () => ["vaporjawn-v2", installedCache],
        delete: remove,
      },
      console: { log: vi.fn() },
    });
    let install: Promise<unknown> | undefined;
    handlers.install({
      waitUntil: (work) => {
        install = work;
      },
    });
    await expect(install).resolves.toBeUndefined();
    expect(skipWaiting).toHaveBeenCalledOnce();
    expect(installedCache).not.toBe("vaporjawn-v2");
    let activation: Promise<unknown> | undefined;
    handlers.activate({
      waitUntil: (work) => {
        activation = work;
      },
    });
    await activation;
    expect(remove).toHaveBeenCalledExactlyOnceWith("vaporjawn-v2");
    expect(claim).toHaveBeenCalledOnce();
  });
});
