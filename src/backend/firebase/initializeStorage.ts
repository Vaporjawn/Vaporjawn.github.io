/**
 * Firebase Storage initialization
 * @module backend/firebase/initializeStorage
 */

import {
  getStorage,
  type FirebaseStorage,
} from 'firebase/storage';
import type { FirebaseApp } from 'firebase/app';

let storageInstance: FirebaseStorage | null = null;

/**
 * Initialize Firebase Storage
 * @param app - Firebase app instance
 * @returns Firebase Storage instance
 */
export function initializeFirebaseStorage(app: FirebaseApp): FirebaseStorage {
  if (storageInstance) {
    return storageInstance;
  }

  try {
    storageInstance = getStorage(app);
    console.log('[Storage] Initialized successfully');
    return storageInstance;
  } catch (error) {
    console.error('[Storage] Failed to initialize:', error);
    throw error;
  }
}

/**
 * Get the initialized Firebase Storage instance
 * @returns Firebase Storage instance
 * @throws {Error} If Storage is not initialized
 */
export function getFirebaseStorage(): FirebaseStorage {
  if (!storageInstance) {
    throw new Error('Firebase Storage not initialized. Call initializeFirebaseStorage() first.');
  }
  return storageInstance;
}
