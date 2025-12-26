# Analytics & Monitoring Setup Guide

Complete guide for setting up Google Search Console, Google Analytics, Hotjar, and the Analytics Dashboard.

## Table of Contents
1. [Google Search Console Setup](#google-search-console-setup)
2. [Google Analytics 4 Configuration](#google-analytics-4-configuration)
3. [Hotjar Integration](#hotjar-integration)
4. [Analytics Dashboard Setup](#analytics-dashboard-setup)
5. [Custom Events Tracking](#custom-events-tracking)
6. [Privacy & GDPR Compliance](#privacy--gdpr-compliance)

---

## Google Search Console Setup

### 1. Create Property
1. Go to [Google Search Console](https://search.google.com/search-console)
2. Click "Add Property"
3. Choose "URL prefix" and enter your domain: `https://www.vaporjawn.dev`

### 2. Verify Ownership

**Method 1: HTML Meta Tag (Recommended)**
1. Google will provide a verification meta tag
2. Add the verification code to your `.env` file:
   ```bash
   VITE_GOOGLE_SITE_VERIFICATION=your-verification-code-here
   ```
3. The SEO component will automatically include it in the `<head>`
4. Deploy your changes
5. Click "Verify" in Google Search Console

**Method 2: HTML File Upload**
1. Download the verification HTML file from Google
2. Place it in the `public/` directory
3. Deploy and verify

### 3. Submit Sitemap
1. In Google Search Console, go to "Sitemaps"
2. Enter sitemap URL: `https://www.vaporjawn.dev/sitemap.xml`
3. Click "Submit"

### 4. Monitor Performance
- **Search Results**: Track impressions, clicks, CTR, and position
- **Coverage**: Identify indexing issues
- **Mobile Usability**: Check mobile-friendliness
- **Core Web Vitals**: Monitor page experience metrics

---

## Google Analytics 4 Configuration

### 1. Create GA4 Property
1. Go to [Google Analytics](https://analytics.google.com)
2. Click "Admin" → "Create Property"
3. Enter property details:
   - Property name: "Victor Williams Portfolio"
   - Time zone: Your timezone
   - Currency: USD

### 2. Create Data Stream
1. Choose "Web" platform
2. Enter website URL: `https://www.vaporjawn.dev`
3. Stream name: "Portfolio Website"
4. Copy the **Measurement ID** (format: `G-XXXXXXXXXX`)

### 3. Configure Environment Variable
Add to your `.env` file:
```bash
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

### 4. Custom Events Setup

The following events are already configured in `src/utils/analytics.ts`:

**Engagement Events:**
- `scroll_depth` - Tracks 25%, 50%, 75%, 100% scroll milestones
- `time_on_page` - Tracks 30s, 1min, 2min, 5min engagement
- `navigate` - Tracks navigation between pages

**Conversion Events:**
- `submit_contact_form` - Contact form submissions
- `download_resume` - Resume downloads
- `open_calendly` - Meeting scheduling
- `signup_newsletter` - Newsletter signups
- `click_cta` - Call-to-action button clicks

**Content Events:**
- `view_project` - Project page views
- `click_project_link` - External project links
- `read_blog` - Blog post reading progress
- `search` - Search queries and results
- `apply_filter` - Filter usage

**Social & External:**
- `click_social_link` - Social media clicks
- `click_external_link` - External link clicks
- `play_video` - Video plays
- `download_file` - File downloads

### 5. Create Custom Reports
In GA4, create custom reports for:
- Project views by technology
- Blog post engagement
- Contact form conversion funnel
- Social media traffic sources

### 6. Set Up Conversion Tracking
Mark these events as conversions in GA4:
- `submit_contact_form`
- `download_resume`
- `open_calendly`
- `signup_newsletter`

---

## Hotjar Integration

### 1. Create Hotjar Account
1. Go to [Hotjar](https://www.hotjar.com)
2. Sign up for a free account (up to 35 daily sessions)
3. Create a new site

### 2. Get Site ID
1. In Hotjar dashboard, go to "Sites & Organizations"
2. Copy your **Site ID** (numeric value)

### 3. Configure Environment Variables
Add to your `.env` file:
```bash
VITE_HOTJAR_SITE_ID=your-site-id
VITE_HOTJAR_VERSION=6
```

### 4. Enable Features in Hotjar Dashboard

**Heatmaps:**
- Click heatmaps: See where users click
- Move heatmaps: See where users move their cursor
- Scroll heatmaps: See how far users scroll

**Recordings:**
- Session recordings: Watch real user sessions
- Set up triggers for specific pages or events
- Configure privacy settings (mask sensitive data)

**Feedback:**
- On-site surveys
- Feedback widgets
- NPS surveys

### 5. Custom Events
The following Hotjar events are tracked:
- `form_submission_contact` - Contact form submissions
- `cta_click_*` - CTA button clicks
- `feature_*` - Feature usage
- `error_*` - Error encounters

### 6. Privacy Configuration
Ensure sensitive data is masked:
1. In Hotjar dashboard → Settings → Privacy
2. Enable "Suppress text" for forms
3. Add CSS classes to suppress: `.sensitive`, `.private`
4. Enable IP anonymization

---

## Analytics Dashboard Setup

### 1. Access Dashboard
In development mode, access the dashboard at:
```
http://localhost:5173/analytics
```

**Note**: Dashboard is only accessible in development mode for security. For production access, implement authentication.

### 2. Connect to Google Analytics API

**Option A: Manual Data Viewing**
- Use dashboard links to open Google Analytics, Hotjar, and Search Console
- Current implementation shows mock data for layout

**Option B: Real-Time Data (Advanced)**
To display real analytics data in the dashboard:

1. **Enable Google Analytics Reporting API**
   - Go to [Google Cloud Console](https://console.cloud.google.com)
   - Enable "Google Analytics Reporting API"

2. **Create Service Account**
   - Create service account with Viewer permissions
   - Download JSON key file
   - Add service account email to GA4 property with "Viewer" role

3. **Install Dependencies**
   ```bash
   npm install @google-analytics/data
   ```

4. **Update Dashboard Component**
   - Replace mock data with API calls
   - Use service account for authentication
   - Implement data caching

### 3. Dashboard Features

**Key Metrics:**
- Page views and unique visitors
- Average session duration
- Bounce rate
- Contact form submissions
- Project views
- Social clicks
- Blog reads

**Visualizations:**
- Page views over time (line chart)
- Top pages (bar chart)
- Traffic sources (pie chart)
- Device breakdown (pie chart)

**Time Ranges:**
- Last 24 hours
- Last 7 days
- Last 30 days
- Last 90 days
- Last year

---

## Custom Events Tracking

### Implementation Examples

**1. Track Button Clicks**
```typescript
import { trackCTAClick } from '../utils/analytics';

<Button onClick={() => trackCTAClick('Get Started', 'Hero Section')}>
  Get Started
</Button>
```

**2. Track Form Submissions**
```typescript
import { trackContactFormSubmit } from '../utils/analytics';

const handleSubmit = async (data) => {
  try {
    await submitForm(data);
    trackContactFormSubmit(true);
  } catch (error) {
    trackContactFormSubmit(false);
  }
};
```

**3. Track Project Views**
```typescript
import { trackProjectView } from '../utils/analytics';

useEffect(() => {
  trackProjectView(project.name);
}, [project]);
```

**4. Track Search**
```typescript
import { trackSearch } from '../utils/analytics';

const handleSearch = (query) => {
  const results = searchProjects(query);
  trackSearch(query, results.length);
};
```

**5. Track Social Clicks**
```typescript
import { trackSocialClick } from '../utils/analytics';

<IconButton onClick={() => trackSocialClick('GitHub')}>
  <GitHub />
</IconButton>
```

**6. Track External Links**
```typescript
import { trackExternalLink } from '../utils/analytics';

<Link
  href={project.liveUrl}
  onClick={() => trackExternalLink(project.liveUrl, project.name)}
>
  View Live
</Link>
```

### Automatic Tracking

The following are tracked automatically:
- **Page views**: Every route change
- **Scroll depth**: 25%, 50%, 75%, 100% milestones
- **Time on page**: 30s, 1min, 2min, 5min intervals
- **Navigation**: Page transitions

---

## Privacy & GDPR Compliance

### 1. Cookie Consent
Implement cookie consent banner (recommended: `react-cookie-consent`):

```typescript
import CookieConsent from 'react-cookie-consent';

<CookieConsent
  location="bottom"
  buttonText="Accept"
  declineButtonText="Decline"
  enableDeclineButton
  onAccept={() => {
    initGA();
    initHotjar();
  }}
>
  This website uses cookies to enhance user experience.
</CookieConsent>
```

### 2. Privacy Policy
Update `src/pages/privacy/PrivacyPolicy.tsx` with:
- Data collection practices
- Cookie usage
- Third-party services (GA, Hotjar)
- User rights (access, deletion, opt-out)

### 3. Opt-Out Options
Provide users with opt-out mechanisms:

**Google Analytics:**
```typescript
window['ga-disable-G-XXXXXXXXXX'] = true;
```

**Hotjar:**
```typescript
import { stopHotjarRecording } from '../utils/hotjar';
stopHotjarRecording();
```

### 4. IP Anonymization
Both GA4 and Hotjar anonymize IPs by default in the current setup.

### 5. Data Retention
Configure data retention in:
- **GA4**: Admin → Data Settings → Data Retention (2 months recommended)
- **Hotjar**: Settings → Data & Privacy → Data Retention (365 days default)

---

## Testing & Validation

### 1. Test Google Analytics
1. Open browser console
2. Navigate to different pages
3. Check for GA events: `dataLayer` in console
4. Use [Google Analytics DebugView](https://analytics.google.com/analytics/web/#/debugview)

### 2. Test Hotjar
1. Enable Hotjar in your account
2. Visit your site
3. Check Hotjar dashboard for recordings
4. Verify heatmaps are collecting data

### 3. Test Custom Events
Open browser console and run:
```javascript
window.gtag('event', 'test_event', {
  event_category: 'Test',
  event_label: 'Manual Test'
});
```

Check in GA4 Realtime reports.

---

## Monitoring Best Practices

### 1. Regular Checks
- **Weekly**: Review top pages, traffic sources, user behavior
- **Monthly**: Analyze conversion rates, goal completions
- **Quarterly**: Review and update custom events

### 2. Set Up Alerts
In Google Analytics:
- Traffic drops > 20%
- Conversion rate drops > 15%
- Server errors spike

### 3. A/B Testing
Use analytics data to:
- Test CTA placements
- Optimize contact form
- Improve project showcase
- Refine content strategy

### 4. Performance Monitoring
Compare analytics with Core Web Vitals:
- Pages with high bounce rates → Check performance
- Low time on page → Check content quality
- High exit rates → Check user flow

---

## Troubleshooting

### Google Analytics Not Loading
1. Check `VITE_GA_MEASUREMENT_ID` is set correctly
2. Verify in production mode (`import.meta.env.PROD`)
3. Check browser console for errors
4. Disable ad blockers for testing

### Hotjar Not Recording
1. Verify `VITE_HOTJAR_SITE_ID` is correct
2. Check Hotjar script loads (Network tab)
3. Ensure not in incognito mode
4. Check Hotjar dashboard settings

### Events Not Tracking
1. Check browser console for `gtag` errors
2. Verify event names match GA4 configuration
3. Test in GA4 DebugView
4. Check ad blockers aren't blocking tracking

### Dashboard Not Loading
1. Ensure in development mode
2. Check route is defined in router
3. Verify all imports resolve
4. Check browser console for errors

---

## Next Steps

1. ✅ Set up Google Search Console verification
2. ✅ Configure Google Analytics 4 Measurement ID
3. ✅ Enable Hotjar tracking
4. ✅ Access analytics dashboard
5. ✅ Test custom events tracking
6. 🔄 Implement cookie consent banner
7. 🔄 Connect dashboard to real Analytics API (optional)
8. 🔄 Set up automated reports
9. 🔄 Configure conversion goals
10. 🔄 Create custom audience segments

---

## Resources

- [Google Analytics 4 Documentation](https://support.google.com/analytics/answer/9304153)
- [Google Search Console Help](https://support.google.com/webmasters)
- [Hotjar Documentation](https://help.hotjar.com)
- [Google Analytics Reporting API](https://developers.google.com/analytics/devguides/reporting/data/v1)
- [GDPR Compliance Guide](https://gdpr.eu/compliance/)

---

**Last Updated**: December 26, 2025
**Status**: Complete - Ready for implementation
