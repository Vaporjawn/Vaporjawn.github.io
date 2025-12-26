// Security headers configuration for static hosting
// Add this to your hosting provider's configuration (Netlify, Vercel, etc.)

export const securityHeaders = {
  // Content Security Policy
  "Content-Security-Policy": [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "img-src 'self' data: https: blob:",
    "font-src 'self' data: https://fonts.gstatic.com",
    "connect-src 'self' https://api.github.com https://www.google-analytics.com https://sentry.io",
    "frame-src 'self' https://calendly.com",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self' https://formspree.io",
    "frame-ancestors 'none'",
    "upgrade-insecure-requests",
  ].join("; "),

  // Prevent clickjacking
  "X-Frame-Options": "DENY",

  // Prevent MIME type sniffing
  "X-Content-Type-Options": "nosniff",

  // Enable XSS protection
  "X-XSS-Protection": "1; mode=block",

  // Referrer Policy
  "Referrer-Policy": "strict-origin-when-cross-origin",

  // Permissions Policy (formerly Feature Policy)
  "Permissions-Policy": [
    "camera=()",
    "microphone=()",
    "geolocation=()",
    "interest-cohort=()",
  ].join(", "),

  // HSTS - Force HTTPS
  "Strict-Transport-Security": "max-age=63072000; includeSubDomains; preload",
};

// Netlify _headers file format
export const netlifyHeaders = `/*
  Content-Security-Policy: ${securityHeaders["Content-Security-Policy"]}
  X-Frame-Options: ${securityHeaders["X-Frame-Options"]}
  X-Content-Type-Options: ${securityHeaders["X-Content-Type-Options"]}
  X-XSS-Protection: ${securityHeaders["X-XSS-Protection"]}
  Referrer-Policy: ${securityHeaders["Referrer-Policy"]}
  Permissions-Policy: ${securityHeaders["Permissions-Policy"]}
  Strict-Transport-Security: ${securityHeaders["Strict-Transport-Security"]}

/service-worker.js
  Cache-Control: no-cache

/manifest.json
  Cache-Control: public, max-age=3600

/assets/*
  Cache-Control: public, max-age=31536000, immutable
`;

// Vercel vercel.json format
export const vercelConfig = {
  headers: [
    {
      source: "/(.*)",
      headers: Object.entries(securityHeaders).map(([key, value]) => ({
        key,
        value,
      })),
    },
    {
      source: "/service-worker.js",
      headers: [
        {
          key: "Cache-Control",
          value: "no-cache",
        },
      ],
    },
    {
      source: "/assets/:path*",
      headers: [
        {
          key: "Cache-Control",
          value: "public, max-age=31536000, immutable",
        },
      ],
    },
  ],
};
