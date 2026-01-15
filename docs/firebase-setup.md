# Firebase Setup Guide

Complete guide to setting up Firebase Analytics and Firestore for the admin dashboard.

## 📋 Table of Contents

- [Prerequisites](#prerequisites)
- [Firebase Project Setup](#firebase-project-setup)
- [Environment Variables](#environment-variables)
- [Firestore Database Setup](#firestore-database-setup)
- [Security Rules Deployment](#security-rules-deployment)
- [Local Development](#local-development)
- [Testing](#testing)
- [Troubleshooting](#troubleshooting)

## 🎯 Prerequisites

- **Firebase Project**: Active Firebase project (currently: `vaporjawn-12`)
- **Firebase CLI**: Install with `npm install -g firebase-tools`
- **Node.js**: v18.x or higher
- **Admin Access**: Firebase project owner or editor permissions

## 🔥 Firebase Project Setup

### 1. Create/Access Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select existing project `vaporjawn-12` or create new project
3. Navigate to Project Settings (gear icon)

### 2. Enable Required Services

#### Enable Firestore Database
1. In Firebase Console, go to **Build** → **Firestore Database**
2. Click **Create Database**
3. Select **Start in production mode** (security rules will be deployed separately)
4. Choose database location: `us-central` (or closest to your users)
5. Click **Enable**

#### Enable Firebase Analytics
1. In Firebase Console, go to **Build** → **Analytics**
2. Click **Enable Google Analytics**
3. Select or create Google Analytics account
4. Click **Enable Analytics**

### 3. Register Web App

1. In Firebase Console, go to **Project Settings**
2. Scroll to **Your apps** section
3. Click **Add app** → **Web** (</> icon)
4. Register app with nickname: "Portfolio Website"
5. Enable Firebase Hosting (optional)
6. Copy the Firebase config object - you'll need these values for environment variables

## 🔑 Environment Variables

Create or update `.env` file in project root with Firebase configuration:

```env
# Firebase Configuration
VITE_FIREBASE_API_KEY=AIzaSy...your-api-key
VITE_FIREBASE_AUTH_DOMAIN=vaporjawn-12.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=vaporjawn-12
VITE_FIREBASE_STORAGE_BUCKET=vaporjawn-12.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789012
VITE_FIREBASE_APP_ID=1:123456789012:web:abc123def456
VITE_FIREBASE_MEASUREMENT_ID=G-XXXXXXXXXX

# Google Analytics (existing)
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# Admin Dashboard (existing)
VITE_ADMIN_PASSWORD_HASH=your-hashed-password
```

### Environment Variable Descriptions

| Variable | Description | Required | Example |
|----------|-------------|----------|---------|
| `VITE_FIREBASE_API_KEY` | Firebase API key for web apps | ✅ Yes | `AIzaSyXxXxXxXx...` |
| `VITE_FIREBASE_AUTH_DOMAIN` | Firebase Authentication domain | ✅ Yes | `project-id.firebaseapp.com` |
| `VITE_FIREBASE_PROJECT_ID` | Firebase project identifier | ✅ Yes | `vaporjawn-12` |
| `VITE_FIREBASE_STORAGE_BUCKET` | Firebase Storage bucket | ⚠️ Optional | `project-id.firebasestorage.app` |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | Cloud Messaging sender ID | ⚠️ Optional | `123456789012` |
| `VITE_FIREBASE_APP_ID` | Firebase app identifier | ✅ Yes | `1:123:web:abc123` |
| `VITE_FIREBASE_MEASUREMENT_ID` | Google Analytics measurement ID | ⚠️ Optional | `G-XXXXXXXXXX` |

**Note**: All required variables must be present or Firebase initialization will fail with descriptive error messages.

## 📊 Firestore Database Setup

### Collections Structure

The application creates and uses these Firestore collections:

#### 1. **analytics_pageViews**
Stores individual page view events.

**Document Structure**:
```typescript
{
  timestamp: Timestamp,        // Server timestamp
  path: string,                // Page path (e.g., "/", "/projects")
  title: string,               // Page title from document.title
  sessionId: string,           // Unique session identifier
  referrer: string,            // Document referrer URL
  deviceType: 'mobile' | 'tablet' | 'desktop',
  trafficSource: 'direct' | 'social' | 'search' | 'referral' | 'other'
}
```

**Indexes Required**: None (simple queries only)

#### 2. **analytics_events**
Stores user interaction events.

**Document Structure**:
```typescript
{
  timestamp: Timestamp,        // Server timestamp
  type: string,                // Event type: page_view, project_view, etc.
  label: string,               // Event label (project name, form name, etc.)
  sessionId: string,           // Session identifier
  metadata?: Record<string, any>  // Optional additional data
}
```

**Event Types**:
- `page_view` - Page navigation
- `project_view` - Project detail viewed
- `project_click` - Project card clicked
- `contact_submit` - Contact form submitted
- `social_click` - Social media link clicked
- `blog_read` - Blog post read
- `resume_download` - Resume downloaded
- `section_view` - Page section viewed

#### 3. **analytics_sessions**
Stores session metadata and aggregated metrics.

**Document Structure**:
```typescript
{
  sessionId: string,           // Unique session identifier
  startTime: Timestamp,        // Session start time
  lastActivity: Timestamp,     // Last activity timestamp
  deviceType: string,          // Device type classification
  trafficSource: string,       // Traffic source classification
  pageCount: number,           // Number of pages viewed
  eventCount: number,          // Number of events triggered
  duration: number             // Session duration in minutes
}
```

**Session Timeout**: 30 minutes of inactivity

#### 4. **analytics_daily** (Future)
Pre-aggregated daily statistics (requires Cloud Functions).

**Document Structure**:
```typescript
{
  date: string,                // Date in YYYY-MM-DD format
  pageViews: number,           // Total page views
  uniqueVisitors: number,      // Unique session count
  avgSessionDuration: number,  // Average session length (minutes)
  bounceRate: number,          // Bounce rate percentage
  // ... additional aggregated metrics
}
```

### Composite Indexes

Firestore will automatically suggest required composite indexes when queries fail. Deploy them via Firebase Console or `firestore.indexes.json`.

**Common indexes needed**:
```json
{
  "indexes": [
    {
      "collectionGroup": "analytics_pageViews",
      "queryScope": "COLLECTION",
      "fields": [
        { "fieldPath": "timestamp", "order": "DESCENDING" }
      ]
    },
    {
      "collectionGroup": "analytics_events",
      "queryScope": "COLLECTION",
      "fields": [
        { "fieldPath": "timestamp", "order": "DESCENDING" },
        { "fieldPath": "type", "order": "ASCENDING" }
      ]
    }
  ]
}
```

## 🔒 Security Rules Deployment

### 1. Review Security Rules

The security rules in `firestore.rules` provide:
- ✅ Public read access (admin dashboard uses client-side auth)
- ✅ Client write access for analytics events
- ✅ Immutable event logs (no updates/deletes)
- ✅ Timestamp validation (prevent backdating)
- ✅ Document structure validation

### 2. Deploy Security Rules

```bash
# Login to Firebase CLI (if not already logged in)
firebase login

# Initialize Firebase in project (if not already done)
firebase init firestore
# Select existing project: vaporjawn-12
# Use existing firestore.rules file
# Use existing firestore.indexes.json file

# Deploy security rules only
firebase deploy --only firestore:rules

# Deploy rules and indexes together
firebase deploy --only firestore
```

### 3. Verify Deployment

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Navigate to **Firestore Database** → **Rules**
3. Verify rules match `firestore.rules` file
4. Check **Indexes** tab for any required composite indexes

## 💻 Local Development

### 1. Install Dependencies

```bash
npm install
```

**Firebase SDK** (already installed):
- `firebase` v11.1.0+ - Core Firebase SDK
- Includes Firestore, Analytics, and App modules

### 2. Start Development Server

```bash
npm run dev
```

The application will:
1. Initialize Firebase with environment variables
2. Connect to production Firestore (or emulator if configured)
3. Start logging analytics events automatically
4. Display real-time data in admin dashboard

### 3. Firebase Emulator (Optional)

For development without affecting production data:

```bash
# Install Firebase emulators
npm install -g firebase-tools

# Initialize emulators
firebase init emulators
# Select: Firestore, Authentication (if needed)

# Start emulators
firebase emulators:start

# Update .env to point to emulator
VITE_USE_FIREBASE_EMULATOR=true
VITE_FIRESTORE_EMULATOR_HOST=localhost:8080
```

**Note**: Emulator configuration requires additional setup in `src/backend/firebase/initializeFirestore.ts`.

## 🧪 Testing

### 1. Test Event Logging

```bash
# Start development server
npm run dev

# Open browser to http://localhost:5173
# Navigate through portfolio pages
# Check browser console for Firebase logs:
# - "[Firebase] Page view logged: /"
# - "[Firebase] Event logged: project_click"
```

### 2. Verify Firestore Data

1. Open [Firebase Console](https://console.firebase.google.com/)
2. Go to **Firestore Database** → **Data**
3. Check collections:
   - `analytics_pageViews` - Should contain documents with recent timestamps
   - `analytics_events` - Should contain user interaction events
   - `analytics_sessions` - Should contain session documents

### 3. Test Admin Dashboard

```bash
# Navigate to admin dashboard
# http://localhost:5173/admin

# Login with admin credentials
# Dashboard should display:
# - Real page view counts
# - Real visitor counts
# - Real event counts
# - Charts with actual data
```

### 4. Test Error Handling

```bash
# Test without environment variables
# Remove VITE_FIREBASE_API_KEY from .env
npm run dev
# Should see: "[App] Failed to initialize Firebase: Missing required Firebase config field: apiKey"

# Test network errors
# Disconnect network, refresh dashboard
# Should see: "Error Loading Data" alert with retry option
```

## 🐛 Troubleshooting

### Firebase Initialization Errors

**Problem**: `Failed to initialize Firebase: Missing required Firebase config field`
```
Solution:
1. Check .env file contains all required VITE_FIREBASE_* variables
2. Restart development server (Vite requires restart for .env changes)
3. Verify environment variables match Firebase Console config
```

**Problem**: `Firebase: Error (auth/api-key-not-valid)`
```
Solution:
1. Verify VITE_FIREBASE_API_KEY is correct
2. Check Firebase Console → Project Settings → General → Web API Key
3. Ensure no extra spaces or quotes in .env file
```

### Firestore Permission Errors

**Problem**: `Missing or insufficient permissions`
```
Solution:
1. Deploy security rules: firebase deploy --only firestore:rules
2. Check rules allow client writes to analytics collections
3. Verify Firebase Console → Firestore → Rules shows correct rules
```

**Problem**: `PERMISSION_DENIED: Missing or insufficient permissions`
```
Solution:
1. Check browser console for specific collection/document path
2. Verify security rules allow read/write for that path
3. Test rules in Firebase Console → Firestore → Rules → Simulator
```

### Missing Index Errors

**Problem**: `The query requires an index`
```
Solution:
1. Click the provided link in error message (opens Firebase Console)
2. Click "Create Index" button
3. Wait 2-5 minutes for index to build
4. Retry query/refresh dashboard
```

### Dashboard Showing Zero Data

**Problem**: Dashboard displays all zeros despite browsing site
```
Solution:
1. Check browser console for Firebase logging messages
2. Verify Firestore collections have documents in Firebase Console
3. Check date range selector (default: 30 days) - change to "Last 24 Hours"
4. Verify analytics.ts functions are being called (add console.logs)
5. Check session timeout (30 minutes) - sessions may have expired
```

### Network Errors

**Problem**: `Failed to load dashboard data: Network request failed`
```
Solution:
1. Check internet connection
2. Verify Firebase project is active (not deleted/suspended)
3. Check browser console Network tab for 403/404 errors
4. Verify Firestore security rules allow reads
5. Try manual refresh button in dashboard
```

### Build/Deploy Errors

**Problem**: `Firebase config undefined in production build`
```
Solution:
1. Environment variables must be set in hosting platform (Netlify/Vercel)
2. Prefix all variables with VITE_ for Vite to expose them
3. Rebuild and redeploy after adding environment variables
4. Verify variables in build logs
```

## 📈 Performance Optimization

### Query Optimization
- Limit query results with `.limit(100)` for large datasets
- Use pagination for historical data views
- Cache dashboard metrics in React state (30s-60s)

### Write Optimization
- Batch writes for bulk operations (future Cloud Functions)
- Use transactions for atomic updates
- Implement write throttling for high-traffic events

### Security Considerations
- Review security rules regularly
- Implement Firebase Authentication for production admin access
- Add rate limiting for write operations
- Monitor Firestore usage in Firebase Console

## 🚀 Production Checklist

Before deploying to production:

- [ ] All environment variables configured in hosting platform
- [ ] Firestore security rules deployed
- [ ] Required composite indexes created
- [ ] Firebase project billing enabled (free tier may be insufficient)
- [ ] Admin authentication implemented (Firebase Auth recommended)
- [ ] Analytics event logging tested end-to-end
- [ ] Dashboard displays real data correctly
- [ ] Error handling tested (network failures, permission errors)
- [ ] Performance monitoring enabled (Firebase Performance Monitoring)
- [ ] Backup strategy implemented (Firestore exports)

## 📚 Additional Resources

- [Firebase Documentation](https://firebase.google.com/docs)
- [Firestore Security Rules](https://firebase.google.com/docs/firestore/security/get-started)
- [Firebase Analytics](https://firebase.google.com/docs/analytics)
- [Firebase CLI Reference](https://firebase.google.com/docs/cli)
- [Vite Environment Variables](https://vitejs.dev/guide/env-and-mode.html)

## 🆘 Support

For issues specific to this project:
1. Check existing documentation in `/docs` directory
2. Review GitHub Issues for similar problems
3. Create new issue with detailed error messages and logs

For Firebase-specific issues:
1. Check [Firebase Support](https://firebase.google.com/support)
2. Search [Stack Overflow firebase tag](https://stackoverflow.com/questions/tagged/firebase)
3. Post in [Firebase Google Group](https://groups.google.com/g/firebase-talk)
