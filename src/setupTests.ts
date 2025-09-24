<<<<<<< Updated upstream
import '@testing-library/jest-dom';
=======
import "@testing-library/jest-dom";

// Polyfill / mock for IntersectionObserver in jsdom test environment
// Needed because hooks/components rely on it but jsdom doesn't implement it.
if (typeof window !== "undefined" && !("IntersectionObserver" in window)) {
		class MockIntersectionObserver implements IntersectionObserver {
		readonly root: Element | Document | null = null;
		readonly rootMargin: string = "0px";
		readonly thresholds: ReadonlyArray<number> = [0];
		takeRecords(): IntersectionObserverEntry[] { return []; }
		observe(): void { /* no-op */ }
		unobserve(): void { /* no-op */ }
		disconnect(): void { /* no-op */ }
			constructor() {}
	}
		// @ts-expect-error assigning to readonly global for test env
	window.IntersectionObserver = MockIntersectionObserver as unknown as typeof IntersectionObserver;
	// Also expose on globalThis for code referencing global scope directly
		// @ts-expect-error propagate to global scope
	global.IntersectionObserver = window.IntersectionObserver;
}

>>>>>>> Stashed changes
