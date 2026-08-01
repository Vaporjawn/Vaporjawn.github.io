# Repo Map (condensed index — see docs/ARCHITECTURE.md for full depth)

Portfolio site, Victor Williams (@Vaporjawn). React 19 + TS 5.9 strict + Vite 7 → GitHub
Pages, custom domain vaporjawn.dev. Firebase = backend-as-a-service only (Firestore +
Analytics + Storage), **not** Hosting.

## Bootstrap (`src/main.tsx`)
`StrictMode > QueryClientProvider(staleTime 5min, retry 2) > HelmetProvider >
BrowserRouter > AnalyticsWrapper(useLocation page-view tracking) > Router`. Firebase init
+ prod-only Sentry/GA/Hotjar/perf-monitoring/SW-registration all fire at module
top-level, before render. **All context providers, theming, header/footer, and the
route table live in `router.tsx`, not `main.tsx`.**

## Routes (`src/router.tsx`)
`/` home · `/about` · `/resume` · `/services` · `/contact` · `/projects` · `/activity` ·
`/blog` · `/blog/:slug` · `/privacy` · `/terms` · `/coming-soon` · `/admin/login`
(public) · `/admin` (behind `ProtectedRoute` → `useAdminAuth()`) · `/dev-test`
(dev-mode-only route) · `*` → 404. All lazy-loaded, one shared `<Suspense>`.
Header swaps to `AdminHeader` when path starts with `/admin`. Dark mode: `useState` in
`Router`, persisted `localStorage["vaporjawn-theme-mode"]`.

**Orphaned page** (no route, no imports): `src/pages/AnalyticsDashboard/AnalyticsDashboard.tsx`.

## Pages (`src/pages/*`) — biggest first
`home/` (26 files, largest) → `contact/` (13) → `resume/` (9) → `projects/` (8, **own**
`data/projectsData.ts`, independent of `src/data/portfolio.json`) → `about/` (7) →
`admin/` (5, no tests) → `blog/` (2 files but 500-line monoliths, no sub-split) →
`services/`, `activity/`, `comingSoon/`, `dev-test/`, `error/`, `terms/` (2 each) →
`AnalyticsDashboard/` (1, orphaned), `privacy/` (1).

**Home page** renders: `SEO → HeroSection → ChartSection(GitHubStatsChart) →
ChartSection(CareerTimeline) → CallToActionSection`. No skills-summary or
GitHub-contributions section remains — both were removed in the same session (see
gotchas-and-todos.md §In-flight refactor for the full blow-by-blow).

## Shared components (`src/components/`, 16 subdirs)
- **Global/layout** (mounted once in `router.tsx`): `header/` (Header + AdminHeader +
  darkModeToggle), `footer/`, `errorBoundary/`, `a11y/SkipNavigation`,
  `ProtectedRoute/`.
- **Used everywhere**: `SEO/SEO.tsx` (13 pages).
- **`charts/`** (barrel: `CareerTimeline`, `GitHubStatsChart` only) — internal helpers in
  `charts/components/`: `StatCard`, `TimelineItem`. `GitHubStatsChart` is now wired to
  **live** `useGithubRepos()` data via `homePage.tsx` + `charts/utils/githubStatsUtils.ts`
  (2026-08-01) — no more hard-coded mock stats; see gotchas-and-todos.md §In-flight
  refactor for the full story, including the broken-CI root cause it surfaced.
- **`activity/`** — most sophisticated subsystem (commit-graph renderer, GitHub+npm
  sections), page-scoped to `/activity` only.
- **`github/` + `contribs/` — DELETED** (2026-08-01). Used to be a 3-tier
  contribution-graph fallback chain; removed along with the homepage section that used
  it. `contribs.yml` (CI) + `scripts/fetch-contribs.mjs` still run daily and still write
  `public/data/contributions.json`, but **every run has actually been failing** at the
  `git push` step (protected-branch rejection) since ~Sep 2025 — confirmed via `gh run
  list`/`gh api .../logs`, not just "orphaned." See gotchas-and-todos.md for the exact
  fix options; not applied here (needs an owner decision).
- **`contact/`**, **`socials/`** — forms + social link rendering.
- **`OptimizedImage/`** — lazy `<picture>`+WebP wrapper, only used in `HeroProfile.tsx`
  despite being general-purpose.
- **Dead code (zero imports anywhere)**: `illustrations/*`, `testimonials/TestimonialsCarousel.tsx`,
  `Skeleton/SkeletonLoader.tsx`, `ThemeToggle/ThemeToggle.tsx`.

## Contexts (`src/contexts/`)
- `AdminAuthContext.tsx`/`AdminAuthProvider.tsx` — split cleanly per convention.
  sessionStorage-based, 1h session, SHA-256 password hash (no salt), countdown timer.
- `PortfolioContext.tsx` — **does not split** (context + interfaces + Provider all in
  one file — allowed because the const context object passes
  `allowConstantExport: true`). Backs `src/data/portfolio.json`. Consumer hooks live in
  `src/hooks/usePortfolioData.ts`, not the context file.
- Mount order in `router.tsx`: `PortfolioProvider` (outer) → `AdminAuthProvider` (inner),
  both mounted for every route unconditionally.

## Hooks (`src/hooks/`, 8 files)
`useIntersectionObserver`, `usePortfolioData` (usePortfolio/useProjects/useSkills/
useSocial), `useNpmPackages`, `useGithubActivity`, `useGithubRepos`,
`useDevpostProjects` (HTML-scrapes Devpost, no official API), `useSwipeGesture`,
`useStarredProjects` (dev-only). The four data-fetching hooks each hand-roll their own
localStorage TTL cache instead of sharing `utils/secureStorage.ts`.

## Utils (`src/utils/`, 12 files)
Telemetry: `analytics.ts` (GA4 + dual-writes to Firestore via `services/analytics/` —
`logEvent.ts` now gates every write on `isFirebaseInitialized()` first, added
2026-08-01, so it skips quietly instead of erroring on every page navigation when
Firebase isn't configured), `hotjar.ts`, `errorTracking.ts` (Sentry),
`performanceMonitoring.ts` (Web Vitals). PWA: `pwa.ts`. Security: `passwordHash.ts`,
`secureStorage.ts` (disciplined cache, unused by the hooks above). Content:
`blogUtils.ts` (`parseBlogPost` — as of 2026-08-01 uses a manual frontmatter split +
`js-yaml`, NOT `gray-matter`, because gray-matter breaks once bundled for the browser —
see gotchas-and-todos.md hard rule), `blogLoader.ts` (new 2026-08-01 —
`import.meta.glob(..., {query:'?raw'})` over `content/blog/*.{md,mdx}`, real content
replacing the old hard-coded `PLACEHOLDER_POSTS`), `readTimeEstimate.ts`, `slugify.ts`.

## Backend (`src/backend/firebase/` — a directory, NOT `firebase.ts`)
7 files: `index.ts` (barrel, idempotent `initializeFirebase()`), `config.ts`,
`initializeApp.ts`, `initializeAnalytics.ts`, `initializeFirestore.ts`,
`initializeStorage.ts`, `types.ts`. All subpath imports (`firebase/app` etc. — never
bare `firebase`), which is what makes the `firebase-vendor` Vite chunk work. Dead
`firebase.ts.old` sits alongside, unimported.

## Data (`src/data/`)
`portfolio.json` (source for `PortfolioContext`), `socialLinks.ts` (independent 12-entry
list, used by `SocialMedia`/`Footer` — NOT the same as `portfolioData.social`),
`socialBrandColors.ts`, `testimonials.json` (unused — feeds the dead
`TestimonialsCarousel`).

## Build/tooling one-liners
- **Vitest is live, Jest is dead** (config files remain on disk, unused by any script/CI).
- `vite.config.ts`: MDX plugin (`@mdx-js/rollup`, `enforce:'pre'`) — **must** keep
  `exclude: ["**/content/blog/**"]` on it (added 2026-08-01) or it silently
  mis-compiles the raw-text `import.meta.glob` blog import, see gotchas-and-todos.md
  hard rule. 5 manual chunks (react/mui/animation/charts/firebase-vendor),
  `chunkSizeWarningLimit: 600`, no `resolve.alias` (the `@assets/*` alias is TS-only,
  not mirrored in Vite).
- `playwright.config.ts`: Chromium only, targets **preview** server (4173, prod build),
  not wired into CI.
- `public/404.html` (new 2026-08-01) + a restore script in `index.html` — real GitHub
  Pages SPA fallback (the `rafgraph/spa-github-pages` pattern), so deep links no longer
  404 on direct load/refresh. `public/icons/` (8 PWA sizes), `public/favicon-{16,32}.png`,
  `public/apple-touch-icon.png`, `public/og-image.jpg`, and `public/assets/blog/*.jpg`
  (3 hero images) all now exist on disk too — none of them did before 2026-08-01; SVG
  sources for all of it live in `src/assets/brand-icon.svg` +
  `src/assets/blog-hero-sources/`.
- Real test count (2026-08-01): ~249 unit/component tests (34 files) + 19 e2e = ~268
  combined — not "253+"/"236" as claimed elsewhere.
- CI (`​.github/workflows/`): build/install/lint/tests run on Node 18/20/22 matrices;
  `deploy-pages.yml` is the real prod deploy (uses `npm install` + lockfile regen, not
  `npm ci`) — as of 2026-08-01 its build step passes all `VITE_*` repo secrets through
  via `env:` (previously had none at all, so Sentry/GA/Hotjar/Firebase could never have
  activated even if secrets existed — none currently do, see gotchas-and-todos.md
  §Owner action items); `contribs.yml` daily-cron-updates the contribution graph JSON
  (now orphaned — see above); `securityScan.yml` runs njsscan; two `npm-publish*.yml`
  workflows look vestigial.

Full depth on every point above: `../../docs/ARCHITECTURE.md`.
