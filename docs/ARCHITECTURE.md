# Architecture Deep-Dive

A code-verified, from-first-principles technical reference for the vaporjawn.github.io
codebase. Unlike the rest of `docs/` (which is a historical log of features as they were
built), this document describes **what's actually on disk right now**, re-derived by
reading the source directly rather than trusting prior notes. Where it disagrees with
`CLAUDE.md` or older docs, this file is the more current one — see
[§10 Known Inconsistencies & Housekeeping](#10-known-inconsistencies--housekeeping).

> **Snapshot date**: 2026-08-01, branch `fix/react-group-and-misc`, with an in-progress
> uncommitted refactor (see §3.1). Treat anything here describing that refactor as a
> point-in-time note that may already be committed/changed by the time you read this —
> check `git status` / `git log` first.

---

## 1. Stack & High-Level Shape

React 19 + TypeScript 5.9 (strict) + Vite 7, deployed as a static site to GitHub Pages
under the custom domain `vaporjawn.dev`. Firebase (Firestore + Analytics + Storage,
**not** Firebase Hosting) provides backend-as-a-service for a small admin analytics
dashboard and blog post storage. MUI v7 (Grid v2) is the component library, Framer
Motion for animation, React Query for server state, React Router v7 for routing,
React Hook Form + Yup for forms, MDX for blog content.

Two test runners' worth of config exist on disk but only one is live: **Vitest** is the
real, CI-wired test runner; Jest config files are dead leftovers from a prior migration
(see §8.3). Playwright covers a small set of e2e smoke tests, not wired into CI.

## 2. App Bootstrap — `src/main.tsx`

Provider nesting, outer → inner:

```
<StrictMode>
  <QueryClientProvider client={queryClient}>      staleTime: 5min, retry: 2
    <HelmetProvider>
      <BrowserRouter>
        <AnalyticsWrapper>                        useLocation() page-view tracking
          <Router />                              — all app providers live HERE, not main.tsx
        </AnalyticsWrapper>
      </BrowserRouter>
    </HelmetProvider>
    <ReactQueryDevtools initialIsOpen={false} buttonPosition="bottom-right" />
  </QueryClientProvider>
</StrictMode>
```

Before `createRoot(...).render(...)` even runs, `main.tsx` does two things at module
top-level:

- `initializeFirebase({ enableAnalytics: true, enableOfflinePersistence: true })`,
  wrapped in try/catch so a Firebase failure never crashes the app.
- **Production-only** (`import.meta.env.PROD`) side effects, fired once: `initSentry()`,
  `initGA()`, `initHotjar()`, `initPerformanceMonitoring()`, `monitorLongTasks()`,
  `registerServiceWorker()`, `setupInstallPrompt()`.

`AnalyticsWrapper` is a small component defined right in `main.tsx` that calls
`useLocation()` and — production only — fires `trackPageView` + starts
`initScrollTracking`/`initTimeTracking` on every path change, with cleanup on unmount.
It must sit inside `BrowserRouter`, which is why the actual page tree is nested one
level deeper via `<Router />`.

**Everything else** — theming, `PortfolioProvider`, `AdminAuthProvider`,
`ErrorBoundary`, header/footer, the route table itself — lives in `src/router.tsx`, not
`main.tsx`. If you're looking for where a context is mounted, check there first.

## 3. Routing — `src/router.tsx`

Every page is `React.lazy()`-loaded, all sharing one `<Suspense fallback={<LoadingSpinner />}>`
around the whole `<Routes>` block (route-component-level code splitting, not
per-route-boundary).

| Path | Component | Notes |
|---|---|---|
| `/` | `pages/home/homePage` | |
| `/about` | `pages/about` | |
| `/resume` | `pages/resume/resumePage` | |
| `/services` | `pages/services/servicesPage` | |
| `/contact` | `pages/contact/contactPage` | |
| `/projects` | `pages/projects/projectsPage` | |
| `/activity` | `pages/activity/activityPage` | |
| `/blog` | `pages/blog/BlogListPage` | |
| `/blog/:slug` | `pages/blog/BlogPostPage` | |
| `/privacy` | `pages/privacy/PrivacyPolicy` | |
| `/terms` | `pages/terms/TermsOfService` | |
| `/coming-soon` | `pages/comingSoon` | |
| `/admin/login` | `pages/admin/AdminLogin` | public |
| `/admin` | `pages/admin/AdminDashboard` | wrapped in `<ProtectedRoute>` |
| `/dev-test` | `pages/dev-test` | **only registered when `import.meta.env.MODE === "development"`** |
| `*` | `pages/error` | catch-all 404 |

- **Auth guard**: `src/components/ProtectedRoute/ProtectedRoute.tsx` reads
  `isAuthenticated` from `useAdminAuth()`, shows a `CircularProgress` for a fixed 100ms
  grace window while the session check resolves, then renders `children` or redirects
  to `/admin/login` (preserving `location` in nav state for post-login return).
- **Conditional header**: `Router` swaps `Header` for `AdminHeader` when
  `location.pathname.startsWith("/admin")`.
- **Global layout, mounted once in `router.tsx`** (not per-page): `ThemeProvider` +
  `createVaporwaveTheme` + `CssBaseline` → `ErrorBoundary` → `AdminAuthProvider` →
  `PortfolioProvider` (outermost of the two contexts) wrap everything; `Header`/
  `AdminHeader` and `Footer` bracket a `<Box component="main" id="main-content" tabIndex={-1}>`
  containing the routed content; `SkipNavigation` sits just under `CssBaseline`, jumping
  focus to `#main-content`.
- Dark mode is `useState` lifted into `Router`, persisted to `localStorage` under
  `vaporjawn-theme-mode`, defaulting to `window.matchMedia("(prefers-color-scheme: dark)")`.
- **Orphaned page**: `src/pages/AnalyticsDashboard/AnalyticsDashboard.tsx` (394 lines)
  exists on disk with zero route and zero imports anywhere — dead code, distinct from
  the real admin dashboard at `/admin`.

### 3.1 In-flight simplification: progressive homepage section removal

As of this snapshot, an **uncommitted** change on `fix/react-group-and-misc` is
progressively trimming homepage sections the site owner decided they didn't want,
across several iterations in the same session:

1. **"Technical Skills" grid removed**: `src/pages/home/components/SkillsSection/`
   (whole directory) deleted; `homePage.tsx`'s `useSkills()` call and standalone
   `<SkillsSection>` block removed.
2. **"Technical Skills Proficiency" radar chart removed**:
   `src/components/charts/SkillsRadarChart.tsx` deleted (it rendered hard-coded
   placeholder data, never actually wired to `portfolio.json`); the
   `<ChartSection><SkillsRadarChart /></ChartSection>` block removed from `homePage.tsx`.
   Its functionality was briefly consolidated into a new
   `src/components/charts/components/SkillsSummary.tsx`, rendered *inside*
   `CareerTimeline.tsx` — skills grouped by category, sorted by `level` descending, shown
   as MUI `Chip`s with a `"{name} — {level}% proficiency"` tooltip, no chart/graph visual.
3. **"Core Skills" summary removed too**: `SkillsSummary.tsx` (from step 2) and its test
   were then deleted outright, and the `<SkillsSummary />` render call removed from
   `CareerTimeline.tsx`. Net result: **no skills-proficiency UI remains anywhere on the
   homepage** — `portfolio.json`'s `skills` data is currently unconsumed by any homepage
   component (still consumed elsewhere — check before assuming it's fully dead).
4. **"GitHub Contributions" heatmap section removed**: the `<GitHubContributions />` call
   removed from `homePage.tsx`, and — since it had zero other call sites — its entire
   component subsystem deleted outright: `src/components/github/` (`GitHubContributions.tsx`,
   `components/ContributionStatus.tsx`, `components/ContributionFallback.tsx`) and
   `src/components/contribs/ContribHeatmap.tsx`. See old §5.4 (now a tombstone) for what
   this subsystem used to do. **Orphaned as a result**: the `contribs.yml` CI workflow and
   `scripts/fetch-contribs.mjs` still run on a schedule/push and keep committing
   `public/data/contributions.json` back to the repo, but nothing reads that file anymore
   — left alone deliberately (a CI/automation change is out of scope for a UI-section
   removal), flagged in §10 instead.
5. **`GitHubStatsChart` (the "GitHub Statistics Dashboard" section, still on the page)
   wired to live data.** Immediately after step 4, the site owner separately reported
   this section's numbers looked fake/stale and asked for it to be live and error-free.
   Root cause turned out to be **two separate problems**, not one:
   - `GitHubStatsChart` itself was **never** wired to real data —
     `homePage.tsx` called `<GitHubStatsChart />` with zero props, and the component's
     "mock defaults" (hard-coded 1,250 stars / 320 forks / 45 repos / 127-day streak,
     fake 6-month commit/PR/issue history) were unconditionally what every visitor saw.
     Fixed by wiring `homePage.tsx` → `useGithubRepos()` (existing hook, real
     `api.github.com/users/{user}/repos` call, 3h cache) → new
     `charts/utils/githubStatsUtils.ts` → `GitHubStatsChart` props, with real
     `loading`/`error` states (§5.2).
   - The `contribs.yml`/`contributions.json` pipeline from step 4 — the *only* accurate
     source for a true "Day Streak" or 6-month activity history (it's the GraphQL
     `contributionsCollection`, which is private-repo-inclusive; the public REST Events
     API was tested live and only returned ~6 days of actual activity for this account,
     nowhere near enough) — turned out to be **broken, not just orphaned**: `gh run list
     --workflow=contribs.yml` showed it failing on *every single scheduled run* since
     ~Sep 2025. `gh api .../actions/jobs/{id}/logs` on the latest failure showed the
     fetch step succeeding every time but `git push` rejected with `GH006: Protected
     branch update failed — Changes must be made through a pull request`. `main` has
     required-PR-review branch protection (`required_approving_review_count: 1`,
     `require_code_owner_reviews: true`, `enforce_admins: false`); the workflow pushes
     with the default `GITHUB_TOKEN`, which isn't exempt.
   - **Decision** (site owner, presented with the trade-offs — this needed a human call,
     not an autonomous one, since fixing the pipeline means either weakening branch
     protection or the owner generating a PAT): ship the parts that could be made
     genuinely live safely (stars/forks/repos/languages) and **drop** "Day Streak" and
     the 6-month chart entirely rather than fake or leave them broken. The
     `contribs.yml` root cause is fully diagnosed and documented (§10 item 18) as a
     follow-up the owner can act on later — not fixed as part of this change.
   - Added tests: `charts/utils/__tests__/githubStatsUtils.test.ts` (pure aggregation
     logic) and `charts/__tests__/GitHubStatsChart.test.tsx` (loading/error/populated
     states, all via static props — no network in tests, matching the `GitHubSection`
     testing convention in §5.3).
6. Verified clean after each step — `grep -rn` for each deleted symbol returns zero hits
   outside `.claude/`/`docs/`, `npx tsc --noEmit` and `npm run lint` pass, full
   `npm test -- --run` green, and a live browser check (real GitHub API response: 32
   stars / 23 forks / 98 repos / JavaScript 34% · TypeScript 29% · Java 13% · HTML 6% ·
   Python 5% · Other 14% at the time of writing — will drift as the account changes,
   that's the point).

Check `git status`/`git log` before trusting any of the above is still current —
`.claude/memory/session-log.md` has the full blow-by-blow.

## 4. Pages Inventory (`src/pages/*`)

| Dir | ~Files | Shape |
|---|---|---|
| `home/` | 26 | Largest page. `homePage.tsx` renders `SEO → HeroSection → ChartSection(GitHubStatsChart) → ChartSection(CareerTimeline) → CallToActionSection`. Sub-dirs: `HeroSection/`, `ChartSection/`, `CallToActionSection/`, `utils/backgroundUtils.ts` (parallax). |
| `contact/` | 13 | `contactPage.tsx` + `components/` (ContactHero, ContactMethods, ContactFormSection, ContactCTA, FAQSection) + `constants.tsx`/`types.ts`. |
| `resume/` | 9 | `resumePage.tsx` + `components/` (ResumeActions, ResumeViewer). PDF-related — excluded from Vitest coverage (see §8.3). |
| `projects/` | 8 | `projectsPage.tsx` + **its own** `data/projectsData.ts` (independent from `src/data/portfolio.json` — see §10) + `category/` filter subtree. |
| `about/` | 7 | `aboutPage.tsx` + `components/` (AboutBioSection, AboutContactSection). |
| `admin/` | 5 | `AdminDashboard.tsx`, `AdminLogin.tsx`, `components/` (BlogPostForm, BlogPostsList, TabPanel). **No tests.** |
| `blog/` | 2 | `BlogListPage.tsx` (507 lines), `BlogPostPage.tsx` (487 lines) — large monolithic files, no sub-component split. |
| `services/` | 2 | `servicesPage.tsx` + co-located test. |
| `activity/` | 2 | `activityPage.tsx` — hosts the `activity/` component subsystem (§5.3) + `PullToRefresh`. |
| `comingSoon/`, `dev-test/`, `error/`, `terms/` | 2 each | Small, single-purpose pages. |
| `AnalyticsDashboard/` | 1 | **Orphaned**, see §3. |
| `privacy/` | 1 | `PrivacyPolicy.tsx` only. |

## 5. Shared Component Library — `src/components/`

16 subdirectories. Testing is uneven: only `activity/` (5 files, ~49 tests), `footer/`,
and `header/AdminHeader` have dedicated tests — everything else is untested at the
component level.

### 5.1 Universally used
- **`SEO/SEO.tsx`** — `react-helmet-async` wrapper: meta tags, OG, Twitter Card, hardcoded
  `schema.org/Person` JSON-LD. Imported by all 13 content pages.
- **`header/header.tsx`** (`Header`) + **`header/AdminHeader.tsx`** — site nav vs. admin
  nav (session countdown timer, logout confirmation dialog), both using
  **`header/components/darkModeToggle.tsx`**.
- **`footer/footer.tsx`** (`Footer`) — brand blurb from `usePortfolio()`, nav link columns
  from local `constants.ts`, full social icon row via `socials/`.
- **`errorBoundary/errorBoundary.tsx`** — class component (required for
  `componentDidCatch`), full-page fallback with dev-only stack trace.
- **`a11y/SkipNavigation.tsx`**, **`ProtectedRoute/ProtectedRoute.tsx`** — layout-level,
  each mounted once in `router.tsx`.

### 5.2 `charts/` (barrel exports `CareerTimeline`, `GitHubStatsChart` only)
- **`CareerTimeline.tsx`** — pulls `experience` from `PortfolioContext`, falls back to a
  4-entry hardcoded default; renders a list of `TimelineItem`. No longer renders any
  skills-summary content — see §3.1 for the removed `SkillsSummary` step.
- **`GitHubStatsChart.tsx`** — Recharts dashboard (3 `StatCard`s + `PieChart`). **As of
  2026-08-01 this is wired to live data** (§3.1 step 5) — `homePage.tsx` calls
  `useGithubRepos()` and passes real `stats`/`languageData`/`loading`/`error` props.
  The component itself stays presentational/dumb (matches the `GitHubSection`
  convention in §5.3): it never fetches on its own, and its internal
  `defaultStats`/`defaultLanguageData` (all zeros / empty) only apply to standalone/test
  renders with no props — real visitors never see a mock fallback. On `error` it shows
  an MUI `Alert` instead of the dashboard; on `loading` it shows `Skeleton`s. The
  previous "Day Streak" stat card and "Contribution Activity (Last 6 Months)" line chart
  were removed entirely, not wired to live data — see §3.1 step 5 for why.
- **`components/`** (internal, not barrel-exported): `StatCard`, `TimelineItem` (Framer
  Motion stagger-in). `CustomTooltip` was deleted alongside the `LineChart` it served
  (§3.1 step 5) — nothing in this directory used it afterward.
- **`utils/timelineUtils.ts`** — `experienceToTimelineEvent` maps `PortfolioContext`
  data → `TimelineEvent`.
- **`utils/githubStatsUtils.ts`** (new, §3.1 step 5) — `computeRepoStats(repos)` and
  `computeLanguageDistribution(repos, maxSlices = 5)`, pure functions turning
  `GithubRepo[]` (from `useGithubRepos`) into `GitHubStatsChart`'s props. Language
  bucketing keeps the top N by repo count and folds the rest into "Other"; unknown
  languages fall back to a rotating color palette rather than a hardcoded map miss.

### 5.3 `activity/` — most sophisticated subsystem, page-scoped to `/activity`
"GitKraken-inspired" commit-graph renderer:
- **`CommitGraph.tsx`** — groups `CommitGraphEvent[]` into lanes (GitHub trunk +
  per-repo branches + an npm lane), renders glyph nodes (push/PR/merge/release/fork/
  star/issue/comment/npm-publish) with connector lines, plus an offscreen `<ol>`
  mirroring the graph for screen readers.
- **`ActivityLegend.tsx`**, **`GitHubSection.tsx`** (graph/list toggle, refresh, loading/
  error states), **`NpmSection.tsx`** (recent package list) — Paper-card wrappers.
- **`constants.ts`**, **`utils.ts`** (`relativeTime`, `colorForLane`), **`types.ts`**.
- Consumed only by `pages/activity/activityPage.tsx`, alongside
  **`PullToRefresh/PullToRefresh.tsx`** (raw touch-event pull-to-refresh, no library).

### 5.4 GitHub contributions graph — REMOVED (2026-08-01, §3.1 step 4)
This subsection used to document a 3-tier fallback chain (`github/GitHubContributions.tsx`
→ `contribs/ContribHeatmap.tsx` → external `ghchart.rshah.org` SVG →
`github/components/ContributionFallback.tsx` → static PNG →
`github/components/ContributionStatus.tsx` error state), with auto-refresh intentionally
disabled per a documented past bug (`docs/bug-fixes/refresh-loop-fix.md`). The entire
`components/github/` and `components/contribs/` subsystem has since been deleted — see
§3.1 for why. Kept as a numbered tombstone rather than renumbered away because other
sections cross-reference `§5.x` numbers by position; `docs/bug-fixes/refresh-loop-fix.md`
is now historical-only (describes a bug in code that no longer exists).

### 5.5 `contact/`, `socials/`
- **`contact/ContactForm.tsx`** — `react-hook-form` + `yupResolver`, POSTs to Formspree
  (`VITE_FORM_ENDPOINT`), fires analytics + `react-hot-toast`.
- **`contact/ContactSection.tsx`** — simpler `mailto:` card + `SocialMedia`.
- **`socials/socialMedia.tsx`** (`SocialMedia`) — reads `data/socialLinks.ts` (12 entries,
  **independent** from `PortfolioContext.social`, see §10), distinguishes
  internal/external/email link kinds.
- **`socials/utils/iconMapper.tsx`** — maps platform keys to MUI/FontAwesome icons or
  imported brand SVG/PNGs, colored via `data/socialBrandColors.ts`.

### 5.6 Utility/primitive components
- **`OptimizedImage/OptimizedImage.tsx`** — `useIntersectionObserver`-driven lazy image,
  MUI `Skeleton` placeholder, `<picture>`+WebP `<source>` when `srcWebP` given. Despite
  being a general-purpose primitive, only used in one place (`HeroProfile.tsx`).

### 5.7 Dead / unused components (zero import sites anywhere in `src/`)
Flagged for cleanup or intentional archival — see §10:
- `illustrations/CodeIllustration.tsx`, `illustrations/RocketIllustration.tsx`
- `testimonials/TestimonialsCarousel.tsx` (despite `src/data/testimonials.json` existing
  as ready-to-use content for it)
- `Skeleton/SkeletonLoader.tsx`
- `ThemeToggle/ThemeToggle.tsx` (functionally superseded by `header/components/darkModeToggle.tsx`)

## 6. Hooks, Contexts, Utils, Data — the glue layer

### 6.1 `src/contexts/` — the react-refresh split, and its one exception
Convention: context object + `useX()` hook in `*Context.tsx`; the `Provider` component
in a separate `*Provider.tsx` (required because `react-refresh/only-export-components`
demands `.tsx` files export only components).

- **`AdminAuthContext.tsx` / `AdminAuthProvider.tsx`** — strictly follows the split.
- **`PortfolioContext.tsx`** — does **not** split. It exports the context object, several
  interfaces (`Skill`, `Project`, `Experience`, `SocialLink`, `PersonalInfo`,
  `PortfolioData`), *and* the `PortfolioProvider` component, all from one file. This
  still lints clean because the ESLint rule is configured
  `['warn', { allowConstantExport: true }]`, which explicitly permits a `const` context
  object alongside a component export. The consumer hooks (`usePortfolio`, `useProjects`,
  `useSkills`, `useSocial`) live separately in `src/hooks/usePortfolioData.ts`.
- **Data source**: `PortfolioContext` loads `src/data/portfolio.json` statically, cast
  `as PortfolioData` with no transformation. `usePortfolio()` throws if called outside
  the provider.
- **Mount order** (`router.tsx`): `PortfolioProvider` (outer) → `AdminAuthProvider`
  (inner) — both mounted unconditionally for every route, even though `AdminAuthContext`
  is only ever consumed by admin pages/`ProtectedRoute`.

### 6.2 Admin auth mechanics (`AdminAuthContext`/`AdminAuthProvider` + `utils/passwordHash.ts`)
- Storage: `sessionStorage` (tab-scoped, not `localStorage`), key `admin-auth-session`,
  value `{ authenticated, expiresAt }`.
- Session length: hardcoded `SESSION_DURATION_MS = 60 * 60 * 1000` (1 hour).
- `login(password)` reads `import.meta.env.VITE_ADMIN_PASSWORD_HASH` (fails closed if
  unset) and calls `verifyPassword()`.
- `utils/passwordHash.ts`: `hashPassword()`/`verifyPassword()` — **SHA-256 via
  `crypto.subtle.digest`, hex-encoded, no salt, plain `===` comparison (not
  constant-time)**. Intentionally lightweight — per `CLAUDE.md`, this protects draft
  content, not sensitive data. The hash itself is generated locally via
  `scripts/generate-admin-hash.mjs <password>` and set as `VITE_ADMIN_PASSWORD_HASH`.
- `sessionTimeRemaining` (the MM:SS countdown `AdminHeader` displays) comes from a
  `setInterval(1000ms)` inside the provider that re-reads `sessionStorage`, recomputes
  remaining seconds, and auto-logs-out at zero.

### 6.3 `src/hooks/` (8 hooks)

| Hook | Returns | Notes |
|---|---|---|
| `useIntersectionObserver` | `[ref, isVisible]` | Thin native `IntersectionObserver` wrapper; powers scroll animations and `OptimizedImage`. |
| `usePortfolioData` | `usePortfolio()`, `useProjects()`, `useSkills()`, `useSocial()` | Consumer hooks over `PortfolioContext`. `useSkills` flattens the 10 fixed categories into `allSkills` + per-category getters. |
| `useNpmPackages` | `{packages, loading, error, refresh}` | Hits `registry.npmjs.org` client-side; localStorage stale-while-revalidate cache, 12h TTL. |
| `useGithubActivity` | `{events, loading, error, refresh}` | Hits `api.github.com/users/{user}/events/public` (unauthenticated, 60 req/hr limit); 10-min cache TTL. |
| `useGithubRepos` | `{repos, loading, error, refresh, lastUpdated}` | Hits `api.github.com/users/{user}/repos`; 3h cache TTL, filters forks by default. As of 2026-08-01 called from **both** `pages/activity/activityPage.tsx` and `pages/home/homePage.tsx` (the latter feeds `GitHubStatsChart` via `charts/utils/githubStatsUtils.ts` — §3.1 step 5, §5.2). |
| `useDevpostProjects` | `{projects, loading, error, lastUpdated, refresh}` | **Scrapes** the public Devpost profile HTML via `fetch` + `DOMParser` (no official API); 6h cache TTL. |
| `useSwipeGesture` | `ref` | Raw touch-event swipe detection, no library. |
| `useStarredProjects` | `{toggleStar, isStarred, getFeaturedStatus, canModifyStars}` | **Dev-only** localStorage overlay for toggling a project's "featured" flag without editing the JSON; no-ops outside `MODE === "development"`. |

All four GitHub/npm/Devpost data hooks independently reimplement the same
localStorage-cache-with-TTL pattern inline, rather than sharing one abstraction — see §10.

### 6.4 `src/utils/` (10 files)

**Telemetry** (all wired from `main.tsx`, prod-gated):
- `analytics.ts` — GA4 (`gtag`) + ~20 `trackX()` convenience wrappers. **Dual-writes**:
  most tracking calls also invoke `src/services/analytics/*` functions that persist the
  same events to Firestore (for the admin dashboard) — GA4 failures are silent,
  Firestore failures are caught and logged individually.
- `hotjar.ts` — session-replay/heatmap snippet + tagging helpers.
- `errorTracking.ts` — Sentry init (`browserTracingIntegration`, `replayIntegration`
  with `maskAllText`/`blockAllMedia`), `captureError`/`captureMessage`/`setUserContext`.
- `performanceMonitoring.ts` — Core Web Vitals (FCP/LCP/FID/CLS/TTFB) via
  `PerformanceObserver`, reported through `errorTracking.ts` + `gtag`; `monitorLongTasks()`
  flags >50ms tasks.

**PWA**: `pwa.ts` — service worker register/unregister/update-check,
`beforeinstallprompt` capture-and-defer for "Add to Home Screen".

**Security/storage**: `passwordHash.ts` (§6.2); `secureStorage.ts` — a **separate, more
disciplined** versioned-localStorage abstraction (`setSecureItem`/`getSecureItem` with
TTL, checksum, quota-eviction) that the four data-fetching hooks in §6.3 do **not** use
(they each hand-roll their own simpler cache instead — see §10).

**Content**: `blogUtils.ts` (`gray-matter` frontmatter parsing, excerpt generation,
filter/sort), `readTimeEstimate.ts` (200wpm, strips markdown syntax first),
`slugify.ts`.

### 6.5 `src/backend/firebase/` — restructured from a single file into a module

**On disk this is a directory, not `firebase.ts`** (see §10) — 7 files:

| File | Role |
|---|---|
| `index.ts` | Barrel; `initializeFirebase(options)` — idempotent singleton, calls app → analytics → firestore → storage init in order. |
| `config.ts` | `getFirebaseConfig()` reads 7 `VITE_FIREBASE_*` env vars, validates required fields. |
| `initializeApp.ts` | Wraps `firebase/app`. |
| `initializeAnalytics.ts` | Wraps `firebase/analytics`; SSR-safe (`typeof window` guard); returns `null` on failure instead of throwing. |
| `initializeFirestore.ts` | Wraps `firebase/firestore`; when offline persistence is on, uses `persistentLocalCache` + `persistentMultipleTabManager`. |
| `initializeStorage.ts` | Wraps `firebase/storage`. |
| `types.ts` | `FirebaseConfig`, `FirebaseServices`, `FirebaseInitOptions`. |

Every file imports Firebase via **subpath imports** (`firebase/app`, `firebase/auth`,
`firebase/firestore`, `firebase/storage`, `firebase/analytics`) — confirmed, never the
bare `firebase` package — which is what makes the `firebase-vendor` Rollup manual chunk
in `vite.config.ts` actually work. A dead `firebase.ts.old` sits alongside (unimported,
confirmed via grep) with a hardcoded config including an `apiKey` — not a real secret
(Firebase web API keys are public-by-design, access is gated by Firestore rules, not
key secrecy) but stale/should be deleted.

`src/services/analytics/` is the downstream consumer: `logEvent.ts`,
`fetchDashboardData.ts` read/write the Firestore collections that `utils/analytics.ts`'s
dual-write calls target.

### 6.6 `src/data/` — static source-of-truth content
- **`portfolio.json`** — backs `PortfolioContext`: `personalInfo`, `skills` (10
  category arrays), `projects`, `experience`, `social`.
- **`socialLinks.ts`** — 12-entry canonical social link list for `SocialMedia`/`Footer`
  — independent of `portfolioData.social`.
- **`socialBrandColors.ts`** — per-platform brand color tokens.
- **`testimonials.json`** — ready content for the currently-unused `TestimonialsCarousel`.

## 7. Content — Blog

`content/blog/` holds 3 real, published posts (`.md`/`.mdx`, gray-matter frontmatter:
`title`/`description`/`date`/`author`/`tags[]`/`image`/`readTime`/`published`), rendered
via the MDX Vite plugin (`remark-gfm` + `rehype-highlight`, see §8.1) and
`utils/blogUtils.ts`. `scripts/generate-rss.mjs` independently regex-parses the same
frontmatter (not a full YAML parser) to build `public/rss.xml` via `npm run generate:rss`
— **not currently wired into any CI workflow or the build script**, must be run manually.

## 8. Build, Tooling & Config

### 8.1 `vite.config.ts`
- Plugins: an inline `enforce: 'pre'` MDX plugin (`@mdx-js/rollup` + `remark-gfm` +
  `rehype-highlight`) so `.mdx` blog posts compile directly, then `@vitejs/plugin-react`.
- `base: "/"` (root path, correct for the custom domain — not a GH-Pages project-page
  subpath).
- `manualChunks`: `react-vendor` (react, react-dom, react-router-dom), `mui-vendor`
  (@mui/material, @mui/icons-material), `animation-vendor` (framer-motion),
  `charts-vendor` (recharts), `firebase-vendor` (firebase/app, /auth, /firestore,
  /storage, /analytics). `chunkSizeWarningLimit: 600` (kB).
- Dev server `host: true, port: 5173`; preview `port: 4173` (what Playwright targets).
- **No `resolve.alias`** — the `@assets/*` path alias only exists in `tsconfig.app.json`,
  not mirrored in Vite, so it's TS-only today (would need a matching Vite alias to
  actually resolve at build/runtime if ever used in an import).

### 8.2 TypeScript — 4 config files, project-reference split
- `tsconfig.json` — empty root, references the two below.
- `tsconfig.app.json` — app code (`src/`): `target: ES2020`, `moduleResolution: bundler`,
  `jsx: react-jsx`, full strict set (`strict`, `noUnusedLocals`, `noUnusedParameters`,
  `noFallthroughCasesInSwitch`), path alias `@assets/* → src/assets/*`.
- `tsconfig.node.json` — just `vite.config.ts`, Node-targeted (`ES2022`/`ES2023` lib).
- `jest.tsconfig.json` — extends `tsconfig.app.json`, only consumed by the dead Jest
  config (§8.3), not the live build.

### 8.3 Testing — Vitest is live, Jest is dead
`package.json`'s `test`/`test:cov`/`test:watch` scripts all invoke `vitest`. No script,
and no CI workflow, invokes `jest`. `jest.config.cjs`, `jest.config.old.cjs`,
`jest.tsconfig.json`, and the `jest*`/`ts-jest` devDependencies are **leftover from a
Jest→Vitest migration that was never cleaned up** — candidates for deletion (see §10).

`vitest.config.ts` (live config): `environment: "jsdom"`, `globals: true`,
`setupFiles: ["./src/setupTests.ts"]`, coverage via `@vitest/coverage-v8`
(text/json/html/lcov), with `src/main.tsx`, `src/vite-env.d.ts`, and
`src/pages/resume/resumePage.tsx` excluded from coverage (the resume page is excluded
for a documented PDF-import issue during testing).

`src/setupTests.ts` — mocks asset imports (`*.svg/.png/.jpg/.jpeg/.gif/.pdf/.webp` →
`{default: "test-file-stub"}`), polyfills `IntersectionObserver` if absent, and shims
`import.meta.env` with test values for every `VITE_*` var the app reads.

**Real current test count** (verified 2026-08-01, not the "253+" figure quoted
elsewhere): **32 test files**, **~239** `it(`/`test(` call sites under `src/`, plus
**19** separate Playwright e2e tests (below) — ~258 combined, close to but not exactly
matching the older claim. (Was 31 files/~232, then 30 files/~225 after
`SkillsSummary.test.tsx` was deleted, then 32/~239 after adding
`githubStatsUtils.test.ts` + `GitHubStatsChart.test.tsx` — all the same day, see §3.1.)

### 8.4 `e2e/` — Playwright (4 files, 19 tests, smoke-level only)
- `home.spec.ts` (5) — hero heading, subtitle, `<title>`, header, at least one social link.
- `blog.spec.ts` (5) — list heading, `<title>`, a placeholder post card, sort/search UI.
- `admin-login.spec.ts` (5) — login form renders, wrong-password error, unauthenticated
  `/admin` redirects to `/admin/login`. **No successful-login test** (would need a real
  or dedicated test credential — intentionally omitted per an in-file comment).
- `not-found.spec.ts` (4) — 404 page content for arbitrary bad paths.

`playwright.config.ts`: `testDir: "./e2e"`, **Chromium only** (comment: keep CI fast, add
webkit/firefox "when coverage gaps matter"), `baseURL: http://localhost:4173` (the
**preview/production build**, not the dev server), `webServer` runs `npm run preview`.
**Not currently invoked by any GitHub Actions workflow** — e2e only runs locally.

### 8.5 Lint & format
- `eslint.config.js` (flat config): `@eslint/js` + `typescript-eslint` recommended +
  `eslint-config-prettier` + `eslint-plugin-react-hooks` + `eslint-plugin-react-refresh`
  + `eslint-plugin-prettier` + `eslint-plugin-react`. Notably `react-refresh/only-export-components`
  is `['warn', { allowConstantExport: true }]` (a warning, not an error) — which is why
  `npm run lint`'s `--max-warnings 4` matters: the codebase currently tolerates up to 4
  such warnings (plus `no-unused-vars`/`prefer-const`/`prefer-destructuring` warnings)
  without failing. Several configured rule keys (`import/*`, `jsx-a11y/*`, `promise/*`)
  reference plugins that aren't actually registered in this config — those rules are
  inert leftovers from a pre-flat-config `.eslintrc` migration.
- `.prettierrc`: double quotes, semicolons, `trailingComma: "es5"`, `printWidth: 80`,
  `tabWidth: 2`, `arrowParens: "always"` — deliberately non-conflicting with the ESLint
  `quotes`/`semi` rules (reinforced by `eslint-config-prettier`).

### 8.6 CI/CD — `.github/`
`dependabot.yml`: weekly npm + github-actions update groups (react, mui, testing,
build-tools, sentry, animation, charts).

| Workflow | Trigger | What it does |
|---|---|---|
| `build.js.yml` | push/PR to `main`/`V3` | `npm ci && npm run build`, Node 18/20/22 matrix. |
| `install.js.yml` | push/PR | `npm ci` only, Node 18/20/22 matrix — install sanity check. |
| `lint.js.yml` | push/PR | `npm run lint`, Node 18/20 matrix. |
| `tests.js.yml` | push/PR | `npm test` (→ Vitest), Node 18/20/22 matrix. |
| `deploy-pages.yml` | push to `main`, manual | Build job does `rm -rf node_modules package-lock.json && npm install` (**not `npm ci`** — regenerates the lockfile on every deploy) then `npm run build`; deploy job publishes `dist/` via `actions/deploy-pages`. This is the real production deploy path (the `gh-pages`-package `npm run deploy` script in `package.json` is not what CI uses). |
| `contribs.yml` | daily cron + manual + push (docs-path-ignored) | Runs `scripts/fetch-contribs.mjs`, commits `public/data/contributions.json` back to the branch directly if changed. **Orphaned as of 2026-08-01** (§3.1, §10#18) — the only component that read this file has been deleted; the workflow itself was deliberately left untouched (a CI/automation change is out of scope for a UI-section removal). |
| `securityScan.yml` | push/PR + weekly cron | `njsscan` static analysis → SARIF → GitHub code scanning. |
| `dependabot-auto-approve.yml` | Dependabot PRs | Auto-approves minor/patch bumps only (not major). |
| `dependabot-auto-assign.yml` | Dependabot PRs | Assigns PR to `Vaporjawn`. |
| `npm-publish.yml`, `npm-publish-github-packages.yml` | GitHub Release created | Publish to npm / GitHub Packages — **likely vestigial**: this is a private portfolio site, not a published npm package; both also pin Node 16, out of step with the 18/20/22 matrix elsewhere. |

No Playwright/e2e workflow exists — e2e tests are not part of CI today.

## 9. Security Posture

- **CSP & headers**: `public/_headers` sets a full CSP (script-src allowlists GA/Sentry/
  Hotjar/GTM; connect-src allowlists GitHub/npm/Sentry/Devpost APIs; frame-src allows
  Calendly), plus `X-Frame-Options: DENY`, `HSTS` (2yr, preload), `Permissions-Policy`
  locking down camera/mic/geolocation. **Note**: `_headers`/`_redirects` are a
  Netlify/Cloudflare-Pages convention — GitHub Pages itself does not interpret this file;
  it only takes effect if a CDN in front of GH Pages honors it. See §10 for the
  `_redirects` discrepancy.
- **Firestore rules** (`firestore.rules`): `analytics_pageViews`/`analytics_events`/
  `analytics_sessions` are publicly readable, writes are shape-validated
  (`isValidX()`) and recency-gated (must be within 5 minutes of now — prevents
  backdating), immutable after create (no update/delete) except session docs can only
  self-update their own `sessionId`. `analytics_daily` denies all client writes
  (reserved for an unimplemented Cloud Function aggregation job). Default-deny
  catch-all for everything else. **The rules file itself documents the gap**: reads are
  open to anyone who knows the collection names — protection is currently the client-side
  `AdminAuthContext` gate on the dashboard UI, not Firestore rules (a TODO for real
  Firebase Auth + RBAC is noted in-file).
- **Admin auth**: see §6.2 — SHA-256, no salt, non-constant-time compare, by design
  (protects draft content, not sensitive data — per `SECURITY.md`).
- **XSS**: DOMPurify with a strict tag/attribute allowlist (per `SECURITY.md`).
- `SECURITY.md` at repo root has the full policy + disclosure process, but its footer
  ("Last Updated: December 26, 2024", "236 tests passing") is stale relative to current
  state — see §10.

## 10. Known Inconsistencies & Housekeeping

Documenting these explicitly so future sessions don't have to rediscover them:

1. **`CLAUDE.md` says `src/backend/firebase.ts`** — it's actually
   `src/backend/firebase/` (a 7-file module, §6.5). A dead `firebase.ts.old` with a
   stale hardcoded config sits alongside it, unimported.
2. **`CLAUDE.md`/older docs mention `public/_redirects`** — it does not exist. Only
   `public/_headers` is present.
3. **Test count claims are stale**: `CLAUDE.md` says "253+ tests"; `SECURITY.md` says
   "236 tests passing" (dated Dec 2024). Real count as of this doc: ~239 unit/component
   tests (32 files) + 19 Playwright e2e = ~258 combined.
4. **Two independent project datasets**: `src/data/portfolio.json`'s `projects` array
   (consumed via `useProjects()`) and `src/pages/projects/data/projectsData.ts` (consumed
   directly by the Projects page) are separate, non-derived data sources. Worth
   consolidating or clearly documenting which one is canonical.
5. **Two independent social-link datasets**: `src/data/socialLinks.ts` (used by
   `SocialMedia`/`Footer`) vs. `portfolioData.social` (used by `useSocial()`) — not the
   same list, not derived from each other.
6. **Dead components** (§5.7): `illustrations/*`, `testimonials/TestimonialsCarousel.tsx`
   (despite ready `testimonials.json` content existing for it), `Skeleton/SkeletonLoader.tsx`,
   `ThemeToggle/ThemeToggle.tsx` (superseded by `header/components/darkModeToggle.tsx`).
   Plus the orphaned `pages/AnalyticsDashboard/AnalyticsDashboard.tsx` page (§3).
7. **`TestimonialsCarousel`'s `autoPlay` mode calls `setTimeout` directly in the render
   body** rather than inside a `useEffect` — a likely bug/anti-pattern, moot only because
   the component is currently unused.
8. **Four separate hand-rolled localStorage TTL caches** (`useNpmPackages`,
   `useGithubActivity`, `useGithubRepos`, `useDevpostProjects`) duplicate the same
   pattern that `src/utils/secureStorage.ts` already implements more robustly (checksum,
   quota-eviction) — `secureStorage.ts` is unused by any of them.
9. **Jest is fully dead** (§8.3) — `jest.config.cjs`, `jest.config.old.cjs`,
   `jest.tsconfig.json`, `__mocks__/fileMock.js`, `assets-global.d.ts`
   ("to ensure ts-jest picks them up"), and the `jest`/`ts-jest`/`jest-*` devDependencies
   are all candidates for deletion once confirmed nothing references them.
10. **`deploy-pages.yml` uses `rm -rf node_modules package-lock.json && npm install`**
    instead of `npm ci` — regenerates the lockfile on every production deploy rather than
    installing the committed one exactly. Worth reviewing (reproducibility risk).
11. **`npm-publish.yml` / `npm-publish-github-packages.yml`** appear to be vestigial
    template boilerplate for a project that isn't a published npm package (Node 16 pin,
    out of step with the rest of CI).
12. **`test-results/.last-run.json`** (Playwright bookkeeping) is tracked in git, not
    gitignored — `coverage/` is correctly gitignored but `test-results/` is not.
13. **`old_files_backup/`** (366 files, root) is a deliberately-archived predecessor
    React 18 app (added in a "prior to legacy folder purge" commit) — inert except for
    incidental Dependabot bumps to its own `package.json`. Should not be edited; a
    reasonable future candidate for outright deletion now that the current app is stable.
14. **`social-media-layout-test.html`** at repo root is a manual, one-off visual
    scratch artifact (no JS, no test runner hookup) — not a real test, candidate for
    deletion or relocation to a scratch/docs folder.
15. **Default Vite favicon** (`/vite.svg`) is still wired in `index.html` — not yet
    replaced with a custom site icon, despite `apple-touch-icon`/PWA icons being set up
    properly.
16. **`PortfolioContext.tsx` is documented elsewhere as a "GitHub API data context"** —
    it is not; it's the static `portfolio.json` context (personalInfo/skills/projects/
    experience/social). Live GitHub API data is handled entirely separately by
    `useGithubActivity`/`useGithubRepos`, unrelated to this context.
17. **`generate:rss` (`scripts/generate-rss.mjs`) is not wired into the build or CI** —
    `public/rss.xml` only updates when someone runs it manually.
18. **`contribs.yml` is both orphaned AND actively broken** (diagnosed 2026-08-01, §3.1
    step 5). Orphaned: the only component that ever read `public/data/contributions.json`
    (`components/github/GitHubContributions.tsx`) was deleted in step 4. Broken,
    independently of that: `gh run list --workflow=contribs.yml` shows **every single
    scheduled run failing** since ~Sep 2025 (confirmed via `gh api
    repos/Vaporjawn/Vaporjawn.github.io/actions/jobs/{id}/logs` on the latest failure) —
    the `node scripts/fetch-contribs.mjs` step succeeds every time, but the subsequent
    `git push` is rejected with `GH006: Protected branch update failed — Changes must be
    made through a pull request` (`main`'s branch protection requires 1 approving +
    code-owner review; the workflow pushes with the default `GITHUB_TOKEN`, which isn't
    exempt). This is *why* the file's `fetchedAt` was frozen at 2025-09-26 the whole
    time — not a rare flake, a 100%-reproducible failure on every run. **To actually fix
    it** (not attempted here — this needs a owner decision, not an autonomous one):
    either (a) add a bypass allowance for the actions bot on `main`'s branch protection
    (`required_pull_request_reviews.bypass_pull_request_allowances`) — a real security
    trade-off on a rule the owner set up deliberately, or (b) have the owner generate a
    personal access token with `repo` scope (their account has `enforce_admins: false`
    exemption, so a PAT push from them bypasses the review requirement), store it as a
    secret (e.g. `CONTRIB_PUSH_TOKEN`), and switch the workflow's checkout/push steps to
    use it instead of `GITHUB_TOKEN`. Until one of those happens, this workflow will keep
    failing daily and doing nothing — cheap enough to leave running, but worth knowing
    it's not silently succeeding.

None of the above are blocking — they're accumulated normal drift in an actively
developed solo project. Flagging them here means a future session (human or agent) can
decide deliberately whether to fix, document-as-intentional, or ignore each one, instead
of rediscovering them from scratch.

## 11. Environment Variables Reference (names only — see `.env.example` for the template)

| Variable | Purpose |
|---|---|
| `CONTRIB_GRAPHQL_TOKEN` (+ `CONTRIB_TOKEN`, `GITHUB_TOKEN` fallbacks) | GitHub GraphQL token for `scripts/fetch-contribs.mjs`. |
| `GITHUB_LOGIN` | GitHub username for the contributions calendar (`vaporjawn`). |
| `VITE_FIREBASE_API_KEY` / `_AUTH_DOMAIN` / `_PROJECT_ID` / `_STORAGE_BUCKET` / `_MESSAGING_SENDER_ID` / `_APP_ID` / `_MEASUREMENT_ID` | Firebase Web SDK config (public identifiers; project `vaporjawn-12`). |
| `VITE_GA_MEASUREMENT_ID` | Google Analytics 4. |
| `VITE_GOOGLE_SITE_VERIFICATION` | Search Console verification meta tag. |
| `VITE_HOTJAR_SITE_ID` / `VITE_HOTJAR_VERSION` | Hotjar session replay/heatmaps. |
| `VITE_ADMIN_PASSWORD_HASH` | SHA-256 hash of the admin password, from `scripts/generate-admin-hash.mjs`. |
| `VITE_FORM_ENDPOINT` | Formspree endpoint for `ContactForm`. |
| `VITE_SENTRY_DSN` | Sentry error tracking. |
| `VITE_APP_VERSION` | Referenced in `setupTests.ts`'s env shim; app version string. |

---

*This document is generated by reading the actual source tree, not by trusting other
docs. If you're updating this repo and something here goes stale, prefer re-verifying
against the code over trusting this file blindly — same principle it was written under.*
