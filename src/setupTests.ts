import "@testing-library/jest-dom";
import { vi } from 'vitest';

// Mock all asset imports
vi.mock('*.svg', () => ({ default: 'test-file-stub' }));
vi.mock('*.png', () => ({ default: 'test-file-stub' }));
vi.mock('*.jpg', () => ({ default: 'test-file-stub' }));
vi.mock('*.jpeg', () => ({ default: 'test-file-stub' }));
vi.mock('*.gif', () => ({ default: 'test-file-stub' }));
vi.mock('*.pdf', () => ({ default: 'test-file-stub' }));

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

// Mock import.meta.env for Vite environment variables in Jest
// Jest/Node doesn't support import.meta (ESM-only feature), so we mock it on global
// This allows components using import.meta.env to work in test environment
// @ts-expect-error creating import.meta structure for test environment
globalThis.import = {
	meta: {
		env: {
			MODE: "test",
			PROD: false,
			DEV: false,
			VITE_GA_MEASUREMENT_ID: "TEST_GA_ID",
			VITE_HOTJAR_SITE_ID: "TEST_HOTJAR_ID",
			VITE_HOTJAR_VERSION: "6",
			VITE_SENTRY_DSN: "TEST_SENTRY_DSN",
			VITE_APP_VERSION: "1.0.0-test",
			VITE_FORM_ENDPOINT: "https://test.formspree.io/test",
			VITE_GOOGLE_SITE_VERIFICATION: "TEST_VERIFICATION_CODE",
		},
	},
};
