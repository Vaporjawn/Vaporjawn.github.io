import { renderHook, act } from "@testing-library/react";
import { useNpmPackages } from "../useNpmPackages";

// Helper to flush microtasks
const flush = () => new Promise((r) => setTimeout(r, 0));

// Mock fetch & localStorage
const originalFetch = global.fetch;

describe("useNpmPackages", () => {
  beforeEach(() => {
    let store: Record<string, string> = {};
    global.fetch = jest.fn();
    // simple in-memory localStorage mock
  Object.defineProperty(window, "localStorage", {
      value: {
        getItem: (k: string) => store[k] ?? null,
        setItem: (k: string, v: string) => { store[k] = v; },
        removeItem: (k: string) => { delete store[k]; },
        clear: () => { store = {}; }
      },
      writable: true
    });
  });

  afterEach(() => {
    jest.resetAllMocks();
  global.fetch = originalFetch as typeof fetch;
  });

  function mockSearchResult(names: string[]) {
    return {
      objects: names.map((name, idx) => ({
        package: {
          name,
          version: "1.0." + idx,
          description: "Desc " + name,
          date: new Date(Date.now() - idx * 1000).toISOString(),
          links: { npm: `https://www.npmjs.com/package/${name}` },
          keywords: ["k" + idx]
        }
      }))
    };
  }

  test("fetches and normalizes data (no cache)", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockSearchResult(["pkg-a", "pkg-b"])
    });
    // downloads enrichment for first 2 packages
    ;(global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ downloads: 100 })
    });
    ;(global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ downloads: 200 })
    });

    const { result } = renderHook(() => useNpmPackages({ fetchDownloads: true, cacheTtlMs: 1000 }));

    expect(result.current.loading).toBe(true);
    await act(async () => { await flush(); });

    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
    expect(result.current.packages).toHaveLength(2);
  expect(result.current.packages[0].name).toBe("pkg-a");
    // Ensure downloads added
    const dlValues = result.current.packages.map(p => p.weeklyDownloads);
    expect(dlValues.filter(Boolean)).toHaveLength(2);
  });

  test("uses cache when fresh and avoids fetch until refresh", async () => {
    // Pre-populate cache
    const cacheKey = "npm_packages_vaporjawn_v1_vaporjawn_20";
    const cachedPayload = {
      fetchedAt: Date.now(),
      data: [{ name: "cached-pkg", version: "1.0.0", description: "", keywords: [] }]
    };
    window.localStorage.setItem(cacheKey, JSON.stringify(cachedPayload));

    const { result } = renderHook(() => useNpmPackages({ fetchDownloads: false, cacheTtlMs: 1000 * 60 * 60 }));

    // No fetch invoked yet (cache fresh)
    expect(global.fetch).not.toHaveBeenCalled();
    expect(result.current.packages[0].name).toBe("cached-pkg");
  });

  test("stale cache triggers background fetch", async () => {
    const cacheKey = "npm_packages_vaporjawn_v1_vaporjawn_20";
    const cachedPayload = {
      fetchedAt: Date.now() - 1000 * 60 * 60 * 24, // stale (24h)
      data: [{ name: "old-pkg", version: "1.0.0", description: "", keywords: [] }]
    };
    window.localStorage.setItem(cacheKey, JSON.stringify(cachedPayload));

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockSearchResult(["fresh-pkg"])
    });
    // downloads fetch for fresh-pkg
    ;(global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ downloads: 321 })
    });

    const { result } = renderHook(() => useNpmPackages({ cacheTtlMs: 1000 * 60 * 60, fetchDownloads: true }));

    // Immediately returns stale cache data
  expect(result.current.packages[0].name).toBe("old-pkg");

    await act(async () => { await flush(); });

    // After background revalidation
    expect(result.current.packages[0].name).toBe("fresh-pkg");
  });

  test("error during fetch sets error when no cache", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({ ok: false, status: 500 });
    const { result } = renderHook(() => useNpmPackages({ fetchDownloads: false }));
    await act(async () => { await flush(); });
  expect(result.current.error).toContain("npm search failed");
  });

  test("manual refresh bypasses cache", async () => {
    const cacheKey = "npm_packages_vaporjawn_v1_vaporjawn_20";
    const cachedPayload = {
      fetchedAt: Date.now(),
      data: [{ name: "cached-pkg", version: "1.0.0", description: "", keywords: [] }]
    };
    window.localStorage.setItem(cacheKey, JSON.stringify(cachedPayload));

    // Fresh cache means initial render should not fetch
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockSearchResult(["new-pkg"])
    });
    ;(global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ downloads: 999 })
    });

    const { result } = renderHook(() => useNpmPackages({ fetchDownloads: true }));
    expect(global.fetch).not.toHaveBeenCalled();
  expect(result.current.packages[0].name).toBe("cached-pkg");

    await act(async () => {
      result.current.refresh();
      await flush();
    });

    expect(global.fetch).toHaveBeenCalled();
    expect(result.current.packages[0].name).toBe("new-pkg");
  });

  test("limits downloads enrichment to first 10 packages", async () => {
    const names = Array.from({ length: 15 }, (_, i) => `pkg-${i}`);
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockSearchResult(names)
    });
    // Provide 10 download responses
    for (let i = 0; i < 10; i++) {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ downloads: i + 1 })
      });
    }

    const { result } = renderHook(() => useNpmPackages({ fetchDownloads: true }));
    await act(async () => { await flush(); });
    const enriched = result.current.packages.filter(p => typeof p.weeklyDownloads === "number");
    expect(enriched.length).toBeLessThanOrEqual(10);
  });
});
