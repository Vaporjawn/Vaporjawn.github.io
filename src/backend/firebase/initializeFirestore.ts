/**
 * Firestore initialization
 * @module backend/firebase/initializeFirestore
 */

import {
  getFirestore,
  initializeFirestore,
  persistentLocalCache,
  persistentMultipleTabManager,
  type Firestore,
} from 'firebase/firestore';
import type { FirebaseApp } from 'firebase/app';

let firestoreInstance: Firestore | null = null;

/**
 * Initialize Firestore with offline persistence
 * @param app - Firebase app instance
 * @param enablePersistence - Enable offline persistence (default: true)
 * @returns Firestore instance
 */
export function initializeFirestoreDB(
  app: FirebaseApp,
  enablePersistence = true
): Firestore {
  if (firestoreInstance) {
    return firestoreInstance;
  }

  try {
    if (enablePersistence) {
      // Initialize with offline persistence for better UX
      firestoreInstance = initializeFirestore(app, {
        localCache: persistentLocalCache({
          tabManager: persistentMultipleTabManager(),
        }),
      });
      console.log('[Firestore] Initialized with offline persistence');
    } else {
      firestoreInstance = getFirestore(app);
      console.log('[Firestore] Initialized without persistence');
    }

    return firestoreInstance;
  } catch (error) {
    console.error('[Firestore] Failed to initialize:', error);
    throw error;
  }
}

/**
 * Get the initialized Firestore instance
 * @returns Firestore instance
 * @throws {Error} If Firestore is not initialized
 */
export function getFirestoreDB(): Firestore {
  if (!firestoreInstance) {
    throw new Error('Firestore not initialized. Call initializeFirestoreDB() first.');
  }
  return firestoreInstance;
}
