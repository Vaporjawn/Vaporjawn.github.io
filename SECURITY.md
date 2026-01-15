# Security Policy

## 🔒 Security Features

This project implements multiple layers of security to protect against common web vulnerabilities:

### XSS Protection
- **DOMPurify Integration**: All user-generated content and blog posts are sanitized using DOMPurify before rendering
- **Strict Whitelist**: Only safe HTML tags are allowed (headings, paragraphs, links, images, code blocks)
- **Attribute Filtering**: Only safe attributes like `href`, `src`, `alt`, `title`, and `class` are permitted
- **Attack Prevention**: Blocks `<script>` tags, inline event handlers, `<iframe>` elements, and `javascript:` URLs

### Content Security Policy (CSP)
- **Hardened Policy**: Removed unsafe directives (`unsafe-inline`, `unsafe-eval`) from script sources
- **Trusted Domains**: Whitelisted only verified external script sources:
  - Google Analytics: `https://www.googletagmanager.com`, `https://www.google-analytics.com`
  - Hotjar: `https://static.hotjar.com`
  - Sentry: `https://js.sentry-cdn.com`
- **Style Safety**: MUI Emotion compatibility maintained with controlled `unsafe-inline` in style-src
- **Frame Protection**: X-Frame-Options set to DENY to prevent clickjacking

### Dependency Security
- **Zero Vulnerabilities**: Regular `npm audit` checks ensure no known security issues
- **Automated Updates**: Dependabot configured for automatic security patches
- **Legacy Peer Deps**: Using `--legacy-peer-deps` flag for React 19 early adoption (no runtime security impact)

### Secure Storage
- **Enterprise-Grade Utility**: Custom `secureStorage.ts` wrapper for localStorage with:
  - **Versioning System**: Automatic cache invalidation when data schemas change
  - **TTL Validation**: Enforced expiration prevents serving stale data
  - **Quota Handling**: Graceful degradation when storage limits exceeded
  - **Corruption Protection**: Try-catch wrappers prevent parse errors from crashing the app
  - **Type Safety**: Full TypeScript generics for type-safe cache operations

### External Script Security
- **CORS Configuration**: `crossOrigin="anonymous"` attribute on all dynamically loaded scripts
- **CSP Whitelisting**: Alternative to Subresource Integrity (SRI) for scripts with dynamic parameters
- **Error Reporting**: Enhanced CORS configuration enables better error tracking in Sentry

### Security Headers
All pages served with comprehensive security headers:
- `Content-Security-Policy`: Hardened policy (see above)
- `X-Frame-Options: DENY`: Prevents embedding in iframes
- `X-Content-Type-Options: nosniff`: Blocks MIME type sniffing
- `X-XSS-Protection: 1; mode=block`: Browser XSS filter enabled
- `Strict-Transport-Security`: HTTPS enforcement with 2-year max-age
- `Referrer-Policy: strict-origin-when-cross-origin`: Privacy-focused referrer handling
- `Permissions-Policy`: Disables camera, microphone, geolocation access

## 🔍 Vulnerability Disclosure

### Reporting Security Issues

If you discover a security vulnerability, please report it responsibly:

**Email**: victor.williams.dev@gmail.com
**Subject**: [SECURITY] Brief description of the issue

### Please Include:
- Description of the vulnerability
- Steps to reproduce the issue
- Potential impact assessment
- Suggested remediation (optional)

### Response Timeline:
- **Initial Response**: Within 48 hours
- **Status Update**: Within 7 days
- **Fix Timeline**: Critical issues patched within 30 days

### Please Do NOT:
- Publicly disclose the vulnerability before a fix is available
- Test the vulnerability on production systems beyond proof-of-concept
- Access or modify user data without permission

## 📋 Security Best Practices for Contributors

### Code Review Checklist
- [ ] **Sanitize User Input**: Always use DOMPurify for any content from external sources
- [ ] **Avoid `dangerouslySetInnerHTML`**: Only use with DOMPurify sanitization
- [ ] **Test CSP Changes**: Verify no console violations in browser DevTools
- [ ] **Run Security Audit**: Execute `npm audit` before committing
- [ ] **Update Dependencies**: Keep packages current with `npm update`
- [ ] **Review External Scripts**: Add new domains to CSP whitelist only after verification

### Before Deploying
```bash
# Check for vulnerabilities
npm audit

# Run tests
npm test

# Build and preview
npm run build
npm run preview

# Test in browser console for CSP violations
# Open DevTools → Console → Should see NO CSP errors
```

### Handling Sensitive Data
- **Never commit secrets**: Use environment variables for API keys and tokens
- **Use Sentry DSN carefully**: Public DSN is safe, but keep Auth Token secret
- **localStorage Security**: Use `secureStorage` utility for caching API responses
- **Validate All Inputs**: Never trust data from forms, URL parameters, or localStorage

## 🛡️ Known Security Limitations

### Subresource Integrity (SRI)
- **Not Used for**: Google Analytics and Hotjar scripts
- **Reason**: Scripts have dynamic URLs with query parameters (measurement IDs)
- **Mitigation**: CSP whitelisting restricts scripts to trusted domains
- **Alternative**: Could self-host scripts, but loses CDN benefits and automatic updates

### MUI Emotion Styles
- **CSP Exception**: `unsafe-inline` required in `style-src` directive
- **Reason**: Material-UI uses Emotion for CSS-in-JS styling
- **Impact**: Limited risk (only affects styles, not scripts)
- **Mitigation**: Script-src remains fully hardened

### Third-Party Dependencies
- **gray-matter**: Uses `eval()` in markdown frontmatter parsing
- **Impact**: Low risk (processes only trusted blog content)
- **Mitigation**: CSP blocks eval() in production environment
- **Note**: Build-time warning is expected, acceptable for functionality

## 🔄 Security Maintenance

### Regular Tasks
- **Weekly**: Review Dependabot pull requests
- **Monthly**: Run `npm audit` and update dependencies
- **Quarterly**: Review and test CSP policy effectiveness
- **Annually**: Security audit of all external integrations

### Monitoring
- **Sentry**: Real-time error and security event tracking
- **CSP Reporting**: Configure `report-to` directive for violation reports (planned)
- **Analytics**: Monitor unusual traffic patterns or error spikes
- **GitHub Security**: Dependabot alerts for vulnerable dependencies

### Security Roadmap
- [ ] Implement CSP violation reporting endpoint
- [ ] Add Snyk continuous security scanning
- [ ] Integrate secureStorage utility into API hooks
- [ ] Set up automated security testing in CI/CD
- [ ] Add automated security header scanning (securityheaders.com)

## 📚 Security Resources

### Tools Used
- [DOMPurify](https://github.com/cure53/DOMPurify) - XSS sanitizer
- [npm audit](https://docs.npmjs.com/cli/v8/commands/npm-audit) - Dependency vulnerability scanner
- [Sentry](https://sentry.io/) - Error tracking and monitoring
- [GitHub Dependabot](https://github.com/dependabot) - Automated dependency updates

### Standards & Guidelines
- [OWASP Top 10](https://owasp.org/www-project-top-ten/) - Web application security risks
- [Content Security Policy (CSP)](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP) - MDN documentation
- [Security Headers Best Practices](https://securityheaders.com/) - Header configuration guide
- [React Security Best Practices](https://react.dev/learn/security) - Official React security guide

### Testing Resources
- [XSS Payload Examples](https://github.com/swisskyrepo/PayloadsAllTheThings/tree/master/XSS%20Injection) - For security testing
- [CSP Evaluator](https://csp-evaluator.withgoogle.com/) - Google's CSP analyzer
- [Observatory by Mozilla](https://observatory.mozilla.org/) - Website security scanner

## 📞 Contact

For non-security related questions:
- **GitHub Issues**: [github.com/Vaporjawn/Vaporjawn.github.io/issues](https://github.com/Vaporjawn/Vaporjawn.github.io)
- **Email**: victor.williams.dev@gmail.com
- **Portfolio**: [victorwilliams.dev](https://victorwilliams.dev)

---

**Last Updated**: December 26, 2024
**Security Grade**: B+ (estimated via securityheaders.com)
**npm audit**: 0 vulnerabilities
**Test Coverage**: 236 tests passing
