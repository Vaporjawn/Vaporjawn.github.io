/**
 * Password hashing utility using Web Crypto API
 * @module utils/passwordHash
 */

/**
 * Hash a password using SHA-256 algorithm
 *
 * @param password - Plain text password to hash
 * @returns Hex string representation of the hash
 *
 * @example
 * const hash = await hashPassword('mySecurePassword123');
 * console.log(hash); // e.g., "a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3"
 */
export async function hashPassword(password: string): Promise<string> {
  // Convert password string to Uint8Array
  const encoder = new TextEncoder();
  const data = encoder.encode(password);

  // Hash using SHA-256
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);

  // Convert ArrayBuffer to hex string
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, "0")).join("");

  return hashHex;
}

/**
 * Verify a password against a stored hash
 *
 * @param password - Plain text password to verify
 * @param storedHash - Hex string hash to compare against
 * @returns True if password matches hash, false otherwise
 *
 * @example
 * const isValid = await verifyPassword('myPassword', storedHash);
 * if (isValid) {
 *   console.log('Password correct!');
 * }
 */
export async function verifyPassword(
  password: string,
  storedHash: string
): Promise<boolean> {
  const inputHash = await hashPassword(password);
  return inputHash === storedHash;
}
