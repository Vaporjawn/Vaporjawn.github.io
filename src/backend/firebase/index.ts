/**
 * Firebase services initialization and exports
 * @module backend/firebase
 */

import type { FirebaseServices, FirebaseInitOptions } from "./types";
import { initializeFirebaseApp } from "./initializeApp";
import { initializeFirebaseAnalytics } from "./initializeAnalytics";
import { initializeFirestoreDB } from "./initializeFirestore";
import { initializeFirebaseStorage } from "./initializeStorage";

// Export types
export type { FirebaseConfig, FirebaseServices, FirebaseInitOptions } from "./types";

// Export individual initialization functions
export { initializeFirebaseApp, getFirebaseApp } from "./initializeApp";
export { initializeFirebaseAnalytics, getFirebaseAnalytics } from "./initializeAnalytics";
export { initializeFirestoreDB, getFirestoreDB } from "./initializeFirestore";
export { initializeFirebaseStorage, getFirebaseStorage } from "./initializeStorage";
export { getFirebaseConfig } from "./config";

let servicesInitialized = false;
let services: FirebaseServices | null = null;

/**
 * Initialize all Firebase services
 * @param options - Initialization options
 * @returns Firebase services container
 */
export function initializeFirebase(options: FirebaseInitOptions = {}): FirebaseServices {
  if (servicesInitialized && services) {
    return services;
  }

  const { enableAnalytics = true, enableOfflinePersistence = true } = options;

  try {
    const app = initializeFirebaseApp();
    const analytics = enableAnalytics ? initializeFirebaseAnalytics(app) : null;
    const firestore = initializeFirestoreDB(app, enableOfflinePersistence);
    const storage = initializeFirebaseStorage(app);

    services = {
      app,
      analytics,
      firestore,
      storage,
    };

    servicesInitialized = true;
    console.log("[Firebase] All services initialized successfully");

    return services;
  } catch (error) {
    console.error("[Firebase] Failed to initialize services:", error);
    throw error;
  }
}

/**
 * Get initialized Firebase services
 * @returns Firebase services container
 * @throws {Error} If services are not initialized
 */
export function getFirebaseServices(): FirebaseServices {
  if (!services) {
    throw new Error("Firebase services not initialized. Call initializeFirebase() first.");
  }
  return services;
}

/**
 * Whether Firebase successfully initialized (config present, no init error).
 *
 * Callers that fire on every page view/navigation (analytics logging in
 * particular) should check this *before* attempting a Firestore call, rather
 * than relying on catching the "not initialized" exception every time — with
 * no `VITE_FIREBASE_*` env vars configured (e.g. no production secrets set up
 * yet), that pattern logs a fresh console error on every single page load.
 *
 * @example
 * ```ts
 * if (!isFirebaseInitialized()) return; // skip quietly, nothing configured yet
 * ```
 */
export function isFirebaseInitialized(): boolean {
  return servicesInitialized;
}
