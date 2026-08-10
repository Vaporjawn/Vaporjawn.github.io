# CLAUDE.md — Architecture Context for vaporjawn.github.io

Portfolio site for Victor Williams (@Vaporjawn). React 19 + TypeScript 5.9 (strict) +
Vite 7, deployed to GitHub Pages at the custom domain `www.vaporjawn.dev` (see `CNAME`).
Firebase (Firestore + Analytics + Storage — **not** Firebase Hosting) provides
backend-as-a-service for a small admin analytics dashboard.

**Deeper references, read as needed rather than every session**:

- **`.claude/memory/`** — my own operational memory for this repo: `repo-map.md`
  (condensed structural index), `gotchas-and-todos.md` (hard rules, dead code, known
  doc/code discrepancies), `session-log.md` (append-only dated log — **add an entry
  after any substantive session**).
- **`docs/ARCHITECTURE.md`** — exhaustive, code-verified technical reference (full route
  table, every page/component, the full hooks/contexts/utils/Firebase glue layer,
  build/CI/security detail, and an explicit housekeeping section).
- **`docs/README.md`** — index of historical feature-by-feature docs (implementation
  summaries, bug fixes, planning roadmaps) — useful for "why does this exist"
  archaeology, not a current-state reference.

This file is the fast, load-every-session summary. When it and the deeper docs disagree,
re-verify against actual code — this repo's own documentation has drifted from reality
before (see "Known Drift" below).

---

## Essential Commands

```bash
npm start              # Dev server on :5173 (vite --host)
npm run build           # tsc && vite build → dist/
npm run preview          # Serve the production build on :4173 (what Playwright targets)
npm run lint             # ESLint (--max-warnings 4 — keep it below 4, it's a hard ceiling)
npm run lint:fix          # ESLint --fix
npm run format            # Prettier --write on src/**/*.{ts,tsx,js,jsx,json,md}
npm run format:check       # Prettier --check (CI-style, no writes)
npm run typecheck           # tsc --noEmit (alias, same as `npx tsc --noEmit`)
npm test -- --run            # Vitest, one-shot (no watch)
npm run test:watch            # Vitest watch mode
npm run test:cov               # Vitest with coverage (v8 provider)
npm run check                   # build + format:check + lint + test:cov, in that order
npx playwright test              # e2e (Chromium only; spins up `npm run preview` first)
npm run fetch:contribs             # Refresh public/data/contributions.json (needs GITHUB_LOGIN + a token)
npm run generate:rss                # Regenerate public/rss.xml from content/blog/*.md(x) — NOT wired into CI, manual only
node scripts/generate-admin-hash.mjs <pw> # Generate a VITE_ADMIN_PASSWORD_HASH value
```

**Test runner is Vitest, not Jest** — `jest.config.cjs`/`jest.config.old.cjs`/
`jest.tsconfig.json`/`__mocks__/fileMock.js` are dead leftovers from a migration never
cleaned up. Don't reach for Jest APIs or trust those config files.

---

## Tech Stack At A Glance

| Layer        | Choice                                                                                      |
| ------------ | ------------------------------------------------------------------------------------------- |
| Framework    | React 19, TypeScript 5.9 strict                                                             |
| Build        | Vite 7 (`@vitejs/plugin-react`, MDX via `@mdx-js/rollup`)                                   |
| Routing      | React Router **v7** (`react-router-dom@^7`) — not v6                                        |
| UI           | MUI v7 (**Grid v2**), Emotion, Framer Motion                                                |
| Server state | TanStack React Query (`staleTime: 5min`, `retry: 2`)                                        |
| Forms        | react-hook-form + Yup                                                                       |
| Backend      | Firebase (Firestore, Analytics, Storage — **no Hosting**)                                   |
| Testing      | Vitest + React Testing Library + jsdom (unit), Playwright/Chromium (e2e, local-only)        |
| Content      | MDX/Markdown blog posts (`content/blog/`) via gray-matter + remark-gfm + rehype-highlight   |
| Telemetry    | GA4, Sentry, Hotjar, custom Web Vitals monitoring — all prod-gated, all wired in `main.tsx` |
| Deploy       | GitHub Actions → GitHub Pages (`.github/workflows/deploy-pages.yml`)                        |

---

## Project Structure

```
src/
  assets/              # Static images (JPEG/PNG originals + .webp counterparts)
  backend/
    firebase/          # Firebase init MODULE (7 files: index/config/initializeApp/
                        # initializeAnalytics/initializeFirestore/initializeStorage/types)
                        # — a directory, NOT a single firebase.ts. Dead firebase.ts.old
                        # sits alongside, unimported.
  components/          # Shared, reusable components (16 subdirs)
    OptimizedImage/    # Lazy-load wrapper with <picture>/WebP support (only used once)
    SEO/               # react-helmet-async wrapper — used by all 13 content pages
    activity/          # Commit-graph + npm-activity subsystem (most sophisticated;
                        # page-scoped to /activity)
    charts/            # CareerTimeline, GitHubStatsChart (barrel exports); internal
                        # helpers in charts/components/ (StatCard, TimelineItem) and
                        # charts/utils/ (timelineUtils, githubStatsUtils). GitHubStatsChart
                        # is wired to live useGithubRepos() data via homePage.tsx.
    contact/, socials/ # ContactForm/ContactSection, SocialMedia + icon mapper
    header/, footer/   # Global layout chrome, mounted once in router.tsx
    errorBoundary/, a11y/, ProtectedRoute/  # Layout-level, mounted once in router.tsx
    illustrations/, testimonials/, Skeleton/, ThemeToggle/  # DEAD CODE — zero imports
                        # anywhere in src/. See .claude/memory/gotchas-and-todos.md.
  contexts/
    AdminAuthContext.tsx   # Context object + useAdminAuth hook ONLY (no component)
    AdminAuthProvider.tsx  # Provider component: sessionStorage, 1h session, countdown
    PortfolioContext.tsx   # Static portfolio.json context — NOT "GitHub API data".
                            # Does NOT split into a Provider file (allowed because the
                            # const context object passes allowConstantExport: true).
                            # Consumer hooks live in hooks/usePortfolioData.ts instead.
  data/                # Static source-of-truth JSON/TS: portfolio.json, socialLinks.ts
                        # (independent from portfolioData.social!), socialBrandColors.ts,
                        # testimonials.json (unused, feeds dead TestimonialsCarousel)
  pages/
    home/              # Largest page (26 files): HeroSection,
                        # ChartSection(GitHubStatsChart/CareerTimeline), CallToActionSection
    admin/             # AdminDashboard + AdminLogin (protected route). No tests.
    blog/              # BlogListPage, BlogPostPage — large monolithic files (~500 lines
                        # each), no sub-component split
    about/ contact/ projects/ resume/ services/ activity/
    AnalyticsDashboard/ # ORPHANED — no route, no imports anywhere. Distinct from admin/.
    privacy/ terms/ comingSoon/ dev-test/ error/
    projects/data/projectsData.ts  # DEAD CODE (verified 2026-08-10, zero imports) — the
                                     # Projects page actually merges data/portfolio.json's
                                     # `projects` (via useProjects) with live useGithubRepos/
                                     # useNpmPackages/useDevpostProjects in projectsPage.tsx's
                                     # unifiedProjects logic. Edit portfolio.json to change
                                     # what's shown on /projects, not this file.
  hooks/               # 8 custom hooks: useIntersectionObserver, usePortfolioData,
                        # useNpmPackages, useGithubActivity, useGithubRepos,
                        # useDevpostProjects (HTML-scrapes Devpost), useSwipeGesture,
                        # useStarredProjects (dev-only). The 4 data-fetching hooks each
                        # hand-roll their own localStorage TTL cache instead of sharing
                        # utils/secureStorage.ts.
  utils/               # analytics.ts (GA4 + dual-writes to Firestore), hotjar.ts,
                        # errorTracking.ts (Sentry), performanceMonitoring.ts,
                        # pwa.ts, passwordHash.ts, secureStorage.ts, blogUtils.ts,
                        # readTimeEstimate.ts, slugify.ts
  services/analytics/  # Firestore read/write layer consumed by utils/analytics.ts
  router.tsx           # React Router v7 route tree, ALL context providers, theming,
                        # header/footer, ErrorBoundary — most of the "app shell" lives
                        # here, not in main.tsx
  main.tsx             # Bootstrap only: QueryClient, HelmetProvider, BrowserRouter,
                        # Firebase init + prod-only telemetry init (fires before render)
```

---

## App Bootstrap & Routing

**`main.tsx`** provider order: `StrictMode > QueryClientProvider > HelmetProvider >
BrowserRouter > AnalyticsWrapper (useLocation page-view tracking) > Router`. Firebase
init and all prod-only telemetry (`initSentry`, `initGA`, `initHotjar`,
`initPerformanceMonitoring`, `monitorLongTasks`, `registerServiceWorker`,
`setupInstallPrompt`) fire at module top-level, before `render()`, gated on
`import.meta.env.PROD`.

**`router.tsx`** owns the actual route table (all lazy-loaded, one shared
`<Suspense>`), plus `ThemeProvider`/`CssBaseline`/`ErrorBoundary`/`PortfolioProvider`/
`AdminAuthProvider`/`Header`(or `AdminHeader`)/`Footer`/`SkipNavigation` — i.e. if
you're looking for where a provider or layout piece is mounted, check `router.tsx`
first, not `main.tsx`.

| Path                                                                        | Notes                                                         |
| --------------------------------------------------------------------------- | ------------------------------------------------------------- |
| `/`, `/about`, `/resume`, `/services`, `/contact`, `/projects`, `/activity` | Standard content pages                                        |
| `/blog`, `/blog/:slug`                                                      | List + post detail                                            |
| `/privacy`, `/terms`, `/coming-soon`                                        | Static/simple pages                                           |
| `/admin/login`                                                              | Public                                                        |
| `/admin`                                                                    | Behind `ProtectedRoute` → `useAdminAuth()`                    |
| `/dev-test`                                                                 | Only registered when `import.meta.env.MODE === "development"` |
| `*`                                                                         | 404 (`pages/error`)                                           |

Header conditionally swaps to `AdminHeader` when `pathname.startsWith("/admin")`. Dark
mode is `useState` lifted into `Router`, persisted to `localStorage["vaporjawn-theme-mode"]`.

---

## Key Conventions

### React Fast Refresh (react-refresh/only-export-components)

Each `.tsx` file must export **only React components**. Do not co-export context
objects, hooks, utility functions, or plain values from a component file. The rule is
configured `['warn', { allowConstantExport: true }]` — a `const` context object IS
allowed alongside a component export (that's how `PortfolioContext.tsx` gets away with
NOT splitting into a separate Provider file — see Project Structure above), but it's
still a `warn`, and `npm run lint --max-warnings 4` means the project tolerates at most
4 warnings project-wide before failing. Don't casually push it to 5.

- **Context pattern**: context object + hook in `*Context.tsx`, provider component in
  `*Provider.tsx` (this is the norm — `AdminAuthContext`/`AdminAuthProvider` follow it
  strictly; `PortfolioContext` is the one exception, per above).
- **Utility pattern**: helpers that are not components live in `src/utils/` or alongside
  the file they belong to, never re-exported from a component file.

### MUI Grid v2 (not v1)

This project uses MUI v7 where Grid v2 is the default.

```tsx
// ✅ Correct — Grid v2
<Grid size={{ xs: 12, md: 6 }}>
<Grid size={12}>

// ❌ Wrong — Grid v1 (removed in MUI v7)
<Grid item xs={12} md={6}>
```

Never use the `item` prop or bare breakpoint props (`xs`, `sm`, `md`…) on `<Grid>`.

### OptimizedImage — WebP / `<picture>` support

Pass both `src` (JPEG fallback) and `srcWebP` (`.webp`) for best performance:

```tsx
import profileImage from "../assets/profile-picture.jpeg";
import profileImageWebP from "../assets/profile-picture.webp";

<OptimizedImage
  src={profileImage}
  srcWebP={profileImageWebP}
  alt="…"
  priority
/>;
```

When `srcWebP` is provided, the component wraps the `<img>` in a `<picture>` element
with a WebP `<source>` so browsers choose the smaller file automatically. Currently only
used in one place (`HeroProfile.tsx`) despite being a general-purpose primitive.

### React hooks — module-scope components

Never define a React component inside another component's render function. Components
that call hooks (e.g. `useTheme`) must be declared at module scope:

```tsx
// ✅ Correct — module scope
const CustomTooltip: React.FC<Props> = ({ active, payload }) => {
  const theme = useTheme();
  …
};

export const ParentChart: React.FC = () => {
  return <Tooltip content={<CustomTooltip />} />;
};

// ❌ Wrong — inner component violates react-hooks/exhaustive-deps and react-refresh
export const ParentChart: React.FC = () => {
  const CustomTooltip = () => { const theme = useTheme(); … };
  return <Tooltip content={<CustomTooltip />} />;
};
```

`charts/components/TimelineItem.tsx` is a real example of doing this correctly in this
codebase (module-scope component, calls `useTheme()` itself). The original canonical
example here, `charts/components/CustomTooltip.tsx`, was deleted 2026-08-01 when the
`LineChart` it served was removed from `GitHubStatsChart` — see the Known Drift section
below for that whole story; the rule itself is unaffected.

### TypeScript

- **Strict mode** is enabled (`tsconfig.app.json`): `strict`, `noUnusedLocals`,
  `noUnusedParameters`, `noFallthroughCasesInSwitch` all on. All `any` types must be
  justified.
- Config is a 3-file project-reference split: `tsconfig.json` (empty root) →
  `tsconfig.app.json` (app code, ES2020/DOM) + `tsconfig.node.json` (just
  `vite.config.ts`, Node-targeted ES2022/2023). A 4th file, `jest.tsconfig.json`, exists
  only for the dead Jest config — ignore it.
- Use `import type { … }` for type-only imports (`@typescript-eslint/consistent-type-imports`).
- Asset imports (`.jpeg`, `.webp`, `.jpg`, `.svg`, `.pdf`, `.mp4`) need `// @ts-ignore` at
  the import site in component files. Type declarations for these are currently
  **duplicated across two files** — root `assets-global.d.ts` and `src/test-types.d.ts`
  (the latter explicitly comments "Jest asset type declarations" and also carries a pile
  of hyper-specific relative-path logo declarations patched in for old `ts-jest` ESM
  issues). Both are still load-bearing today; don't delete either without checking.
- Path alias `@assets/*` → `src/assets/*` is defined in `tsconfig.app.json` **only** —
  it is NOT mirrored in `vite.config.ts` (no `resolve.alias` there), so it's TS-only
  today and would need a matching Vite alias to actually resolve if used in a real import.

### React Query

`QueryClient` is created once in `main.tsx`. Default options: `staleTime: 5 min`,
`retry: 2`. Use `useQuery` / `useMutation` from `@tanstack/react-query` for any server
state. `ReactQueryDevtools` is mounted next to the root (tree-shaken in production).

### Firebase

Initialized once in `main.tsx` via `initializeFirebase({ enableAnalytics: true,
enableOfflinePersistence: true })`, wrapped in try/catch so a Firebase failure doesn't
crash the app. Lives at **`src/backend/firebase/`** — a 7-file module (`index.ts`
barrel + `config`/`initializeApp`/`initializeAnalytics`/`initializeFirestore`/
`initializeStorage`/`types`), not a single `firebase.ts` file. All Firebase imports must
be subpath imports (`firebase/app`, `firebase/auth`, `firebase/firestore`,
`firebase/storage`, `firebase/analytics`), never the bare `firebase` package, so the
`firebase-vendor` Rollup chunk captures them correctly — confirmed followed throughout.
Firestore is used for admin-dashboard analytics event storage (`src/services/analytics/`
is the read/write layer); there is **no Firebase Hosting** — GitHub Pages is the actual
static host.

### Data layer — watch for duplication

- `src/data/portfolio.json` backs `PortfolioContext` (`personalInfo`/`skills`/
  `projects`/`experience`/`social`) and its `projects` array is the one the Projects
  page actually reads (via `useProjects()`), merged there with live `useGithubRepos()`/
  `useNpmPackages()`/`useDevpostProjects()` data. `src/pages/projects/data/projectsData.ts`
  _looks_ like a second project dataset but is dead code (zero imports) — don't edit it
  expecting it to affect `/projects`.
- `src/data/socialLinks.ts` (12 entries, used by `SocialMedia`/`Footer`) is likewise
  independent from `portfolioData.social` (used by `useSocial()`) — two separate lists,
  not the same data.
- If you're adding/editing a project or social link, check which of the two datasets
  the page you're touching actually reads before assuming there's one source of truth.

---

## Chunk Splitting Strategy (`vite.config.ts`)

| Chunk              | Contents                                              | Reason                        |
| ------------------ | ----------------------------------------------------- | ----------------------------- |
| `react-vendor`     | react, react-dom, react-router-dom                    | Changes rarely; long cache    |
| `mui-vendor`       | @mui/material, @mui/icons-material                    | Large, stable                 |
| `animation-vendor` | framer-motion                                         | Medium-sized, stable          |
| `charts-vendor`    | recharts                                              | Used only in admin + activity |
| `firebase-vendor`  | firebase/app, /auth, /firestore, /storage, /analytics | Subpath-imported only         |

Chunks above 600 kB trigger a build warning (`chunkSizeWarningLimit: 600`). Vite also
runs an `enforce: 'pre'` MDX plugin (`@mdx-js/rollup` + `remark-gfm` + `rehype-highlight`)
so `content/blog/*.mdx` compiles directly, ahead of `@vitejs/plugin-react`.

---

## Testing

- **Framework**: Vitest (`environment: "jsdom"`, `globals: true`) + React Testing
  Library + jsdom. **Not Jest** — Jest config files on disk are dead leftovers, ignore
  them.
- **Setup**: `src/setupTests.ts` — mocks asset imports (`*.jpeg`, `*.webp`, `*.svg`,
  `*.pdf`, `*.gif`, `*.png`…), polyfills `IntersectionObserver` if absent, and shims
  `import.meta.env` with test values for every `VITE_*` var the app reads.
- **Asset mocks**: for specific asset paths used in tests, add
  `vi.mock("…/assets/foo.webp", () => ({ default: "mock.webp" }))` at the top of the
  test file **before** any imports that trigger that module.
- **Coverage**: v8 provider, excludes `src/main.tsx`, `src/vite-env.d.ts`, and
  `src/pages/resume/resumePage.tsx` (documented PDF-import issue in tests).
- **Real current count** (2026-08-01, don't trust older "253+"/"236" claims elsewhere):
  ~249 unit/component tests across 34 files, plus 19 separate Playwright e2e tests.
  `admin/` pages have **no tests**; `header/header.tsx` (the main nav) has no dedicated
  test file either (only `AdminHeader` does).
- **e2e** (`e2e/*.spec.ts`, Playwright, Chromium-only): smoke-level coverage of home,
  blog list, admin-login (wrong-password + redirect, no successful-login test), and 404. Targets the **preview/production build** (`localhost:4173`), not the dev server.
  **Not currently run in CI** — local-only today.
- Run: `npm test -- --run` (one-shot) or `npm run test:watch`.

---

## CI/CD (`.github/`)

Node 18/20/22 matrices for `build.js.yml`/`install.js.yml`/`tests.js.yml`
(`lint.js.yml` is 18/20 only), all triggered on push/PR to `main`/`V3`. Production
deploys happen via **`deploy-pages.yml`** (push to `main` or manual dispatch) — its
build step uses `rm -rf node_modules package-lock.json && npm install` (regenerating the
lockfile, not `npm ci`), then `npm run build`, then `actions/deploy-pages`. The
package.json `gh-pages`-based `npm run deploy` script is **not** what production
actually uses. `contribs.yml` refreshes the contributions-calendar JSON daily via cron
and commits it back directly. `securityScan.yml` runs `njsscan` weekly + on push/PR.
Dependabot runs weekly with grouped updates (react/mui/testing/build-tools/sentry/
animation/charts) and is auto-approved for minor/patch bumps only
(`dependabot-auto-approve.yml`). Two `npm-publish*.yml` workflows exist but look
vestigial (this isn't a published npm package). Full table:
`docs/ARCHITECTURE.md` §8.6.

---

## Deployment

Real production path: GitHub Actions (`deploy-pages.yml`) builds and publishes `dist/`
to GitHub Pages on every push to `main`. Custom domain `www.vaporjawn.dev` is set via
`CNAME`. Firebase Hosting is **not** configured (`firebase.json` only configures
Firestore rules/indexes) — Firebase is backend-as-a-service only.

Cache/CSP rules live in `public/_headers` (CSP allowlist for GA/Sentry/Hotjar/GTM, HSTS,
X-Frame-Options, per-path cache-control). **`public/_redirects` does not exist** despite
being referenced in older docs — only `_headers` is present. Note `_headers`/
`_redirects` are a Netlify/Cloudflare-Pages convention; GitHub Pages itself does not
interpret this file natively.

---

## Security Notes

- All `VITE_` prefixed environment variables are embedded in the client bundle — treat
  them as public. Firebase Web SDK config values are meant to be public (security is
  enforced by Firestore rules, not key secrecy).
- Admin authentication is handled locally via `AdminAuthContext` / `AdminAuthProvider`
  (SHA-256 hash via `src/utils/passwordHash.ts`, no salt, non-constant-time compare,
  `sessionStorage`-backed, 1-hour hardcoded session with a live countdown in
  `AdminHeader`). This is intentionally lightweight — it protects draft content, not
  sensitive data. Generate a hash with `node scripts/generate-admin-hash.mjs <password>`.
- **Firestore rules gap, documented in-file**: `analytics_pageViews`/`analytics_events`/
  `analytics_sessions` are publicly _readable_ by design today (writes are
  shape-validated + recency-gated, but reads have no auth check) — protection is
  currently only the client-side `AdminAuthContext` gate on the dashboard UI, not
  server-side rules. A TODO for real Firebase Auth + RBAC exists in `firestore.rules`
  itself.
- **Never commit** `.env` files containing real credentials.
- Full policy: `SECURITY.md` (note: its "236 tests passing" / Dec 2024 footer is stale).

---

## Known Drift (docs vs. code) — check `.claude/memory/gotchas-and-todos.md` for the full list

A few high-signal ones, since they're easy to trust wrongly:

- `src/backend/firebase.ts` (older docs) → actually `src/backend/firebase/` (directory).
- `public/_redirects` (older docs) → does not exist.
- "253+ tests" / "236 tests passing" → real count ~249 unit + 19 e2e ≈ 268.
- "React Router v6" (older docs) → actually `react-router-dom@^7`.
- `PortfolioContext` described as "GitHub API data context" → it's the static
  `portfolio.json` context; live GitHub API data is handled entirely separately by
  `useGithubActivity`/`useGithubRepos`.

Dead code with zero import sites anywhere in `src/`: `components/illustrations/*`,
`components/testimonials/TestimonialsCarousel.tsx`, `components/Skeleton/SkeletonLoader.tsx`,
`components/ThemeToggle/ThemeToggle.tsx`, and the whole `pages/AnalyticsDashboard/` page.
None of it is broken, it's just unreachable — see the memory file before deleting or
reviving any of it. Also `pages/projects/data/projectsData.ts` (12 hand-written project
entries) — the live `/projects` page is powered entirely by `usePortfolioData`
(`portfolio.json`) merged with the live GitHub API via `useGithubRepos`, not this file.

There is also, as of 2026-08-01, an **uncommitted, in-progress simplification** on branch
`fix/react-group-and-misc` progressively trimming/fixing homepage sections the site owner
flagged: the old "Technical Skills" grid and "Technical Skills Proficiency" radar chart
are gone (their functionality briefly lived in `charts/components/SkillsSummary.tsx`
inside `CareerTimeline`, but that's now gone too — no skills-proficiency UI remains
anywhere on the homepage), and the "GitHub Contributions" heatmap section is gone along
with its entire component subsystem (`components/github/`, `components/contribs/` —
both deleted, zero remaining references). The remaining "GitHub Statistics Dashboard"
(`GitHubStatsChart`) — previously showing 100% hard-coded fake numbers, always, not just
occasionally stale — is now wired to **live** `useGithubRepos()` data (stars/forks/repos/
languages, real loading/error states); "Day Streak" and the 6-month activity chart were
dropped rather than faked, since an accurate version needs the also-diagnosed-broken
`contribs.yml` pipeline (`GH006: Protected branch update failed` — every scheduled run
has failed since ~Sep 2025; see `.claude/memory/gotchas-and-todos.md` for the exact fix
options, not applied here pending an owner decision). Check `git status`/`git log` before
trusting this is still the current state — `.claude/memory/session-log.md` has the full
note.
