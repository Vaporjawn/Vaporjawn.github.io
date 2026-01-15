# Admin Dashboard Setup Guide

## Overview

The admin dashboard at `/admin` provides password-protected access to analytics and portfolio insights. This guide covers setup, configuration, and security considerations.

## Features

- 🔐 **Password Protection**: SHA-256 hashed password verification
- ⏱️ **Session Management**: 1-hour automatic timeout, clears on tab close
- 📊 **Analytics Dashboard**: Mock data ready for Google Analytics integration
- 📱 **Responsive Design**: Works on desktop, tablet, and mobile
- 🎨 **Theme Integration**: Matches your existing portfolio design

## Quick Start

### 1. Generate Password Hash

Run the hash generation script with your desired password:

```bash
node scripts/generate-admin-hash.mjs yourSecurePassword123
```

The script will output your hash and provide setup instructions.

### 2. Configure Environment Variable

**Local Development:**

1. Create `.env` file in project root (if it doesn't exist)
2. Add your hash:
   ```env
   VITE_ADMIN_PASSWORD_HASH=your-generated-hash-here
   ```

**Production (GitHub Pages):**

If using GitHub Actions for deployment:
1. Go to repository Settings → Secrets and variables → Actions
2. Add new secret: `VITE_ADMIN_PASSWORD_HASH`
3. Update your GitHub Actions workflow to use this secret

**Production (Vercel):**
1. Go to project Settings → Environment Variables
2. Add: `VITE_ADMIN_PASSWORD_HASH` with your hash
3. Redeploy after adding

**Production (Netlify):**
1. Go to Site settings → Build & deploy → Environment
2. Add: `VITE_ADMIN_PASSWORD_HASH` with your hash
3. Trigger new deploy

### 3. Access the Dashboard

1. Navigate to `https://yourdomain.com/admin/login`
2. Enter your password
3. Session lasts 1 hour or until tab closes

## Security Considerations

### ⚠️ Important Limitations

This is **client-side authentication** and provides **basic protection only**. It should NOT be used for:
- Highly sensitive data
- Production systems with strict security requirements
- Multiple user access control
- Compliance-driven environments (HIPAA, PCI-DSS, etc.)

**Why Frontend Auth is Limited:**
- Password hash is visible in client-side code
- Can be bypassed by determined users with developer tools
- No server-side validation
- No rate limiting on login attempts

### ✅ Appropriate Use Cases

This solution is appropriate for:
- Personal portfolio admin dashboards
- Development/staging environment protection
- Basic analytics viewing
- Single-admin user scenarios
- Non-sensitive configuration management

### 🔒 Security Best Practices

1. **Strong Passwords**: Use minimum 12 characters with mixed case, numbers, symbols
2. **Different Passwords**: Never reuse passwords from other accounts
3. **Environment Management**:
   - Never commit `.env` to version control
   - Use different passwords for dev/staging/production
   - Rotate passwords periodically
4. **Session Security**:
   - Sessions use sessionStorage (clears on tab close)
   - 1-hour automatic timeout
   - Logout button for manual session termination
5. **HTTPS Required**: Always use HTTPS in production (enforced by security headers)

## Architecture

### Authentication Flow

```
1. User visits /admin → Redirects to /admin/login
2. User enters password → SHA-256 hash generated in browser
3. Hash compared to VITE_ADMIN_PASSWORD_HASH
4. If match: Session stored in sessionStorage, redirected to /admin
5. If no match: Error message displayed
6. Session expires after 1 hour or tab close
```

### Key Components

- **`/src/utils/passwordHash.ts`**: SHA-256 hashing using Web Crypto API
- **`/src/contexts/AdminAuthContext.tsx`**: Session management and authentication state
- **`/src/pages/admin/AdminLogin.tsx`**: Login page with password form
- **`/src/components/ProtectedRoute/ProtectedRoute.tsx`**: Route wrapper requiring auth
- **`/src/pages/admin/AdminDashboard.tsx`**: Main admin dashboard

### Session Storage

Session data structure:
```typescript
{
  isAuthenticated: boolean;
  loginTime: number; // Unix timestamp
  expiresAt: number; // Unix timestamp
}
```

Storage key: `admin-auth-session` in sessionStorage

## Integration with Analytics

The dashboard currently displays **mock data**. To connect real analytics:

### Google Analytics 4

1. Get GA4 Measurement ID from Google Analytics
2. Add to `.env`:
   ```env
   VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
   ```
3. Implement GA4 Reporting API:
   - Install: `npm install @google-analytics/data`
   - Create server endpoint or serverless function
   - Fetch data and replace mock data in AdminDashboard.tsx

### Hotjar Integration

1. Get Hotjar site ID from Hotjar dashboard
2. Add to `.env`:
   ```env
   VITE_HOTJAR_SITE_ID=your-site-id
   VITE_HOTJAR_VERSION=6
   ```
3. Access heatmaps and recordings via Hotjar dashboard links

### Google Search Console

Access directly via dashboard button - requires Google account authentication.

## Customization

### Change Session Duration

Edit `/src/contexts/AdminAuthContext.tsx`:

```typescript
// Change 1 hour (3600000ms) to desired duration
const SESSION_DURATION = 60 * 60 * 1000; // milliseconds
```

### Add Additional Protection

Consider adding:
- Rate limiting with local counters
- CAPTCHA integration
- IP whitelisting (via hosting provider)
- Two-factor authentication (requires backend)

### Customize Dashboard

Edit `/src/pages/admin/AdminDashboard.tsx`:
- Add/remove metric cards
- Change chart types
- Add custom analytics queries
- Modify layout and styling

## Troubleshooting

### Cannot Login

1. **Check environment variable**:
   ```bash
   # In browser console
   console.log(import.meta.env.VITE_ADMIN_PASSWORD_HASH);
   ```
   - Should show your hash (not undefined)
   - If undefined, hash wasn't set correctly

2. **Verify password**:
   - Regenerate hash: `node scripts/generate-admin-hash.mjs yourpassword`
   - Compare with stored hash
   - Case-sensitive match required

3. **Clear session storage**:
   ```javascript
   // In browser console
   sessionStorage.removeItem('admin-auth-session');
   ```

### Session Expires Too Quickly

- Check browser settings (private browsing clears sessionStorage more aggressively)
- Verify SESSION_DURATION in AdminAuthContext.tsx
- Confirm no browser extensions interfering with storage

### Hash Generation Script Fails

```bash
# Ensure Node.js is installed
node --version

# Make script executable (Unix/Mac)
chmod +x scripts/generate-admin-hash.mjs

# Run with full path
node /full/path/to/scripts/generate-admin-hash.mjs yourpassword
```

### Production Build Issues

```bash
# Verify environment variables are set
npm run build

# Check build output includes admin pages
ls dist/assets

# Test production build locally
npm run preview
```

## Maintenance

### Regular Tasks

- [ ] Rotate admin password quarterly
- [ ] Review session logs (if implemented)
- [ ] Update dependencies: `npm update`
- [ ] Test login flow after major updates
- [ ] Verify security headers in production

### Monitoring

Consider adding:
- Failed login attempt tracking
- Session duration analytics
- Dashboard access logs (requires backend)

## Migration Path

If you need stronger security later:

1. **Backend Authentication**: Add Node.js/Python backend with JWT tokens
2. **OAuth Integration**: Use GitHub/Google OAuth for authentication
3. **Role-Based Access**: Implement user roles and permissions
4. **Database Sessions**: Store sessions server-side
5. **API Protection**: Move sensitive data behind authenticated API endpoints

## Additional Resources

- [Web Crypto API Documentation](https://developer.mozilla.org/en-US/docs/Web/API/Web_Crypto_API)
- [React Router Authentication](https://reactrouter.com/docs/en/v6/examples/auth)
- [OWASP Frontend Security](https://owasp.org/www-project-web-security-testing-guide/)
- [Content Security Policy Guide](https://content-security-policy.com/)

## Support

For issues or questions:
1. Check existing issues: https://github.com/vaporjawn/vaporjawn.github.io/issues
2. Review security documentation: `/docs/security-hardening-complete.md`
3. Contact: victor.williams.dev@gmail.com

---

**Security Warning**: This implementation provides basic UX-level protection only. Do not use for sensitive data or production systems requiring robust security. Always use HTTPS in production and follow web security best practices.
