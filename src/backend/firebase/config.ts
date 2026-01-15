/**
 * Firebase configuration
 * @module backend/firebase/config
 */

import type { FirebaseConfig } from './types';

/**
 * Convert camelCase field name to SCREAMING_SNAKE_CASE environment variable name
 * @param field - camelCase field name (e.g., "apiKey", "authDomain")
 * @returns SCREAMING_SNAKE_CASE environment variable suffix (e.g., "API_KEY", "AUTH_DOMAIN")
 * @example
 * fieldToEnvVar('apiKey') // Returns 'API_KEY'
 * fieldToEnvVar('authDomain') // Returns 'AUTH_DOMAIN'
 */
function fieldToEnvVar(field: string): string {
  return field
    .replace(/([A-Z])/g, '_$1') // Insert underscore before capital letters
    .toUpperCase(); // Convert to uppercase
}

/**
 * Get Firebase configuration from environment variables
 * @returns Firebase configuration object
 * @throws {Error} If required environment variables are missing
 */
export function getFirebaseConfig(): FirebaseConfig {
  const config: FirebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY || '',
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || '',
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || '',
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || '',
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '',
    appId: import.meta.env.VITE_FIREBASE_APP_ID || '',
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || '',
  };

  // Validate required fields
  const requiredFields: (keyof FirebaseConfig)[] = [
    'apiKey',
    'authDomain',
    'projectId',
    'appId',
  ];

  const missingFields = requiredFields.filter((field) => !config[field]);

  if (missingFields.length > 0) {
    console.error(
      `[Firebase Config] Missing required environment variables: ${missingFields
        .map((f) => `VITE_FIREBASE_${fieldToEnvVar(f)}`)
        .join(', ')}`
    );
    console.error('[Firebase Config] Throwing configuration error...');
    throw new Error(
      `Firebase configuration incomplete: missing ${missingFields.join(', ')}`
    );
  }

  console.log('[Firebase Config] All required fields present, config valid');

  return config;
}
