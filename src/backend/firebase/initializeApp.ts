/**
 * Firebase App initialization
 * @module backend/firebase/initializeApp
 */

import { initializeApp, type FirebaseApp } from 'firebase/app';
import { getFirebaseConfig } from './config';

let firebaseApp: FirebaseApp | null = null;

/**
 * Initialize Firebase app instance
 * @returns Initialized Firebase app
 */
export function initializeFirebaseApp(): FirebaseApp {
  if (firebaseApp) {
    return firebaseApp;
  }

  try {
    const config = getFirebaseConfig();
    firebaseApp = initializeApp(config);
    console.log('[Firebase] App initialized successfully');
    return firebaseApp;
  } catch (error) {
    console.error('[Firebase] Failed to initialize app:', error);
    throw error;
  }
}

/**
 * Get the initialized Firebase app instance
 * @returns Firebase app instance
 * @throws {Error} If app is not initialized
 */
export function getFirebaseApp(): FirebaseApp {
  if (!firebaseApp) {
    throw new Error('Firebase app not initialized. Call initializeFirebaseApp() first.');
  }
  return firebaseApp;
}
