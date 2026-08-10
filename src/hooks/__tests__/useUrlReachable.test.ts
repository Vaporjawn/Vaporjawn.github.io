import { renderHook, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import { useUrlReachable } from "../useUrlReachable";

const originalFetch = global.fetch;

describe("useUrlReachable", () => {
  beforeEach(() => {
    let store: Record<string, string> = {};
    global.fetch = vi.fn();
    Object.defineProperty(window, "localStorage", {
      value: {
        getItem: (k: string) => store[k] ?? null,
        setItem: (k: string, v: string) => {
          store[k] = v;
        },
        removeItem: (k: string) => {
          delete store[k];
        },
        clear: () => {
          store = {};
        },
      },
      writable: true,
    });
  });

  afterEach(() => {
    vi.resetAllMocks();
    global.fetch = originalFetch as typeof fetch;
  });

  test("returns true immediately when no url is provided", () => {
    const { result } = renderHook(() => useUrlReachable(undefined));
    expect(result.current).toBe(true);
  });

  test("stays true (optimistic) while a check is pending, then flips false on a proven-broken response", async () => {
    (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      ok: false,
      status: 404,
    });

    const { result } = renderHook(() =>
      useUrlReachable("https://vaporjawn.dev/Prime-Number-Finder-Java/")
    );

    expect(result.current).toBe(true);
    await waitFor(() => expect(result.current).toBe(false));
  });

  test("stays reachable for a working URL", async () => {
    (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      ok: true,
      status: 200,
    });

    const { result } = renderHook(() =>
      useUrlReachable("https://vaporjawn.dev/snapple-facts/")
    );

    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));
    expect(result.current).toBe(true);
  });

  test("fails open (stays reachable) when the check itself errors, e.g. CORS/network failure", async () => {
    (global.fetch as ReturnType<typeof vi.fn>).mockRejectedValueOnce(
      new TypeError("Failed to fetch")
    );

    const { result } = renderHook(() =>
      useUrlReachable("https://github.com/Vaporjawn/better-discord-themes")
    );

    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));
    expect(result.current).toBe(true);
  });

  test("uses cached result on remount instead of re-fetching", async () => {
    (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      ok: false,
      status: 404,
    });

    const url = "https://vaporjawn.dev/Tic-Tac-Toe/";
    const { result, unmount } = renderHook(() => useUrlReachable(url));
    await waitFor(() => expect(result.current).toBe(false));
    unmount();

    const { result: result2 } = renderHook(() => useUrlReachable(url));
    expect(result2.current).toBe(false);
    expect(global.fetch).toHaveBeenCalledTimes(1);
  });
});
