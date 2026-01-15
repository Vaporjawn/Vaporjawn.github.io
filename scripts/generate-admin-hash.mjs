#!/usr/bin/env node

/**
 * Generate Admin Password Hash
 *
 * Creates a SHA-256 hash of the provided password for use with the admin dashboard.
 * The hash should be stored in the VITE_ADMIN_PASSWORD_HASH environment variable.
 *
 * Usage:
 *   node scripts/generate-admin-hash.mjs yourpassword
 *
 * Security Notes:
 * - Never commit the real password or hash to version control
 * - Use strong, unique passwords (minimum 12 characters)
 * - Store the hash in environment variables or secure configuration management
 * - This is client-side authentication and should only be used for basic protection
 *
 * @module scripts/generate-admin-hash
 */

import { createHash } from 'crypto';

/**
 * Generate SHA-256 hash from password
 * @param {string} password - The password to hash
 * @returns {string} Hex-encoded SHA-256 hash
 */
function generateHash(password) {
  return createHash('sha256').update(password).digest('hex');
}

/**
 * Main execution
 */
function main() {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.error('\n❌ Error: No password provided\n');
    console.log('Usage: node scripts/generate-admin-hash.mjs <password>\n');
    console.log('Example:');
    console.log('  node scripts/generate-admin-hash.mjs mySecurePassword123\n');
    process.exit(1);
  }

  const password = args[0];

  // Password strength validation
  if (password.length < 12) {
    console.warn('\n⚠️  Warning: Password is shorter than 12 characters');
    console.warn('   Consider using a stronger password for better security\n');
  }

  const hash = generateHash(password);

  console.log('\n✅ Admin Password Hash Generated Successfully\n');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('\nYour admin password hash:');
  console.log('\x1b[36m%s\x1b[0m', hash); // Cyan color
  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

  console.log('\n📝 Next Steps:\n');
  console.log('1. Create a .env file in your project root (if it doesn\'t exist)');
  console.log('2. Add the following line to your .env file:');
  console.log('\x1b[32m%s\x1b[0m', `   VITE_ADMIN_PASSWORD_HASH=${hash}`); // Green color
  console.log('\n3. For production, set this environment variable in your hosting platform:');
  console.log('   - Vercel: Settings → Environment Variables');
  console.log('   - Netlify: Site settings → Build & deploy → Environment');
  console.log('   - GitHub Pages: Use GitHub Secrets if deploying via Actions');

  console.log('\n🔒 Security Reminders:\n');
  console.log('   • Never commit your .env file to version control');
  console.log('   • Add .env to your .gitignore file');
  console.log('   • Use different passwords for development and production');
  console.log('   • This is client-side auth - do not use for highly sensitive data');
  console.log('   • Session expires after 1 hour or when browser tab closes');
  console.log('');
}

main();
