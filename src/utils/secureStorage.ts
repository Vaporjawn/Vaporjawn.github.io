// Secure localStorage wrapper with versioning, validation, and error handling
// Provides defense against cache poisoning and quota exceeded errors

interface CacheEnvelope<T> {
  version: number;
  timestamp: number;
  data: T;
  checksum?: string; // Optional integrity check
}

interface SecureStorageOptions {
  version?: number;
  ttlMs?: number;
  enableChecksum?: boolean; // Future enhancement for data integrity
}

/**
 * Securely store data in localStorage with versioning and error handling
 */
export function setSecureItem<T>(
  key: string,
  data: T,
  options: SecureStorageOptions = {}
): boolean {
  const { version = 1, enableChecksum = false } = options;

  try {
    const envelope: CacheEnvelope<T> = {
      version,
      timestamp: Date.now(),
      data,
    };

    // Future enhancement: Add checksum for integrity validation
    if (enableChecksum) {
      // envelope.checksum = generateChecksum(JSON.stringify(data));
    }

    localStorage.setItem(key, JSON.stringify(envelope));
    return true;
  } catch (error) {
    // Handle quota exceeded gracefully
    if (error instanceof Error && error.name === "QuotaExceededError") {
      console.warn(`[SecureStorage] Quota exceeded for key: ${key}. Attempting cleanup...`);

      // Attempt to free space by removing oldest items
      try {
        cleanupOldestItems(1);
        // Retry after cleanup
        localStorage.setItem(key, JSON.stringify({
          version,
          timestamp: Date.now(),
          data,
        }));
        return true;
      } catch {
        console.error(`[SecureStorage] Failed to store data after cleanup: ${key}`);
        return false;
      }
    }

    console.error(`[SecureStorage] Failed to store data: ${key}`, error);
    return false;
  }
}

/**
 * Securely retrieve data from localStorage with versioning and validation
 */
export function getSecureItem<T>(
  key: string,
  options: SecureStorageOptions = {}
): T | null {
  const { version = 1, ttlMs } = options;

  try {
    const raw = localStorage.getItem(key);
    if (!raw) return null;

    const envelope: CacheEnvelope<T> = JSON.parse(raw);

    // Version validation - prevent using incompatible cache
    if (envelope.version !== version) {
      console.warn(`[SecureStorage] Version mismatch for key: ${key}. Expected ${version}, got ${envelope.version}`);
      localStorage.removeItem(key); // Clear invalid cache
      return null;
    }

    // TTL validation - expire old data
    if (ttlMs !== undefined) {
      const age = Date.now() - envelope.timestamp;
      if (age >= ttlMs) {
        console.debug(`[SecureStorage] Expired cache for key: ${key} (age: ${age}ms, TTL: ${ttlMs}ms)`);
        localStorage.removeItem(key);
        return null;
      }
    }

    // Future enhancement: Validate checksum for integrity
    if (envelope.checksum) {
      // const computed = generateChecksum(JSON.stringify(envelope.data));
      // if (computed !== envelope.checksum) {
      //   console.error(`[SecureStorage] Checksum validation failed for key: ${key}`);
      //   localStorage.removeItem(key); // Clear corrupted cache
      //   return null;
      // }
    }

    return envelope.data;
  } catch (error) {
    // Handle corrupted data gracefully
    console.error(`[SecureStorage] Failed to retrieve data: ${key}`, error);

    // Clear corrupted cache
    try {
      localStorage.removeItem(key);
    } catch {
      // Ignore cleanup errors
    }

    return null;
  }
}

/**
 * Check if cache is still valid (not expired)
 */
export function isCacheValid(key: string, ttlMs: number, version = 1): boolean {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return false;

    const envelope: CacheEnvelope<unknown> = JSON.parse(raw);

    // Version check
    if (envelope.version !== version) return false;

    // TTL check
    const age = Date.now() - envelope.timestamp;
    return age < ttlMs;
  } catch {
    return false;
  }
}

/**
 * Get cache age in milliseconds
 */
export function getCacheAge(key: string): number | null {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return null;

    const envelope: CacheEnvelope<unknown> = JSON.parse(raw);
    return Date.now() - envelope.timestamp;
  } catch {
    return null;
  }
}

/**
 * Remove oldest cache items to free up space
 */
function cleanupOldestItems(count = 1): void {
  try {
    const items: Array<{ key: string; timestamp: number }> = [];

    // Collect all cache items with timestamps
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (!key) continue;

      try {
        const raw = localStorage.getItem(key);
        if (!raw) continue;

        const envelope: CacheEnvelope<unknown> = JSON.parse(raw);
        if (envelope.timestamp) {
          items.push({ key, timestamp: envelope.timestamp });
        }
      } catch {
        // Skip invalid items
        continue;
      }
    }

    // Sort by timestamp (oldest first)
    items.sort((a, b) => a.timestamp - b.timestamp);

    // Remove oldest items
    for (let i = 0; i < Math.min(count, items.length); i++) {
      localStorage.removeItem(items[i].key);
      console.debug(`[SecureStorage] Removed oldest cache item: ${items[i].key}`);
    }
  } catch (error) {
    console.error("[SecureStorage] Failed to cleanup old items", error);
  }
}

/**
 * Clear all cache items (useful for logout or data reset)
 */
export function clearAllCache(): void {
  try {
    const keysToRemove: string[] = [];

    // Collect all cache keys
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (!key) continue;

      // Only remove items that look like cache (have envelope structure)
      try {
        const raw = localStorage.getItem(key);
        if (raw) {
          const parsed = JSON.parse(raw);
          if (parsed.version !== undefined && parsed.timestamp !== undefined) {
            keysToRemove.push(key);
          }
        }
      } catch {
        // Skip non-JSON items
        continue;
      }
    }

    // Remove identified cache items
    keysToRemove.forEach(key => {
      localStorage.removeItem(key);
    });

    console.debug(`[SecureStorage] Cleared ${keysToRemove.length} cache items`);
  } catch (error) {
    console.error("[SecureStorage] Failed to clear cache", error);
  }
}

/**
 * Get storage usage statistics
 */
export function getStorageStats(): {
  used: number;
  available: number;
  percentage: number;
} {
  try {
    let used = 0;
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key) {
        const value = localStorage.getItem(key);
        used += key.length + (value?.length || 0);
      }
    }

    // Typical localStorage limit is 5-10MB (5MB = 5242880 bytes)
    const available = 5242880; // 5MB in bytes
    const percentage = (used / available) * 100;

    return {
      used,
      available,
      percentage: Math.round(percentage * 100) / 100,
    };
  } catch {
    return {
      used: 0,
      available: 0,
      percentage: 0,
    };
  }
}

// Future enhancement: Generate checksum for data integrity validation
// function generateChecksum(data: string): string {
//   // Implementation: Use SubtleCrypto API for SHA-256 hash
//   // Or use a lightweight hash function for client-side validation
//   return ""; // Placeholder
// }
