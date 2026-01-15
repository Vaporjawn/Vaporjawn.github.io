/**
 * Type definitions for Firebase services
 * @module backend/firebase/types
 */

import type { FirebaseApp } from 'firebase/app';
import type { Analytics } from 'firebase/analytics';
import type { Firestore } from 'firebase/firestore';
import type { FirebaseStorage } from 'firebase/storage';

/**
 * Firebase configuration object
 */
export interface FirebaseConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
  measurementId: string;
}

/**
 * Firebase services container
 */
export interface FirebaseServices {
  app: FirebaseApp;
  analytics: Analytics | null;
  firestore: Firestore;
  storage: FirebaseStorage;
}

/**
 * Firebase initialization options
 */
export interface FirebaseInitOptions {
  enableAnalytics?: boolean;
  enableOfflinePersistence?: boolean;
}
