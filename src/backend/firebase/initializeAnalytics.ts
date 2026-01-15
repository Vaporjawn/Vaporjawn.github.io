/**
 * Firebase Analytics initialization
 * @module backend/firebase/initializeAnalytics
 */

import { getAnalytics, type Analytics } from 'firebase/analytics';
import type { FirebaseApp } from 'firebase/app';

let analyticsInstance: Analytics | null = null;

/**
 * Initialize Firebase Analytics
 * @param app - Firebase app instance
 * @returns Analytics instance or null if not supported
 */
export function initializeFirebaseAnalytics(app: FirebaseApp): Analytics | null {
  if (analyticsInstance) {
    return analyticsInstance;
  }

  // Only initialize in browser environment
  if (typeof window === 'undefined') {
    console.warn('[Firebase Analytics] Not available in server environment');
    return null;
  }

  try {
    analyticsInstance = getAnalytics(app);
    console.log('[Firebase Analytics] Initialized successfully');
    return analyticsInstance;
  } catch (error) {
    console.error('[Firebase Analytics] Failed to initialize:', error);
    return null;
  }
}

/**
 * Get the initialized Analytics instance
 * @returns Analytics instance or null if not initialized
 */
export function getFirebaseAnalytics(): Analytics | null {
  return analyticsInstance;
}
