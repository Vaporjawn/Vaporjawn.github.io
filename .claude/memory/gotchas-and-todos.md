# Gotchas, Hard Rules & Known Discrepancies

## Hard rules (violating these breaks the build or lint, not just style)

1. **`react-refresh/only-export-components`**: every `.tsx` file must export ONLY React
   components. Context objects, hooks, utils, plain values must NOT be co-exported from
   a component file. Pattern: `*Context.tsx` = context object + `useX` hook;
   `*Provider.tsx` = the Provider component. Exception that still lints clean:
   `const` context objects are permitted alongside a component export because the rule
   is configured `['warn', { allowConstantExport: true }]` — this is why
   `PortfolioContext.tsx` gets away with NOT splitting (see below), while
   `AdminAuthContext.tsx`/`AdminAuthProvider.tsx` do split. It's still a `warn`, not an
   `error` — `npm run lint` tolerates up to 4 total warnings project-wide
   (`--max-warnings 4`), don't casually add a 5th.
2. **MUI Grid v2, not v1**: `<Grid size={{ xs: 12, md: 6 }}>`, never `<Grid item xs={12}>`.
   The `item` prop and bare breakpoint props don't exist in this MUI v7 setup.
3. **No components defined inside another component's render body.** Anything calling a
   hook (`useTheme()`, etc.) must be a module-scope declaration — this bit a Recharts
   tooltip before. That original example, `charts/components/CustomTooltip.tsx`, was
   deleted 2026-08-01 (its `LineChart` was removed from `GitHubStatsChart` — see below);
   `charts/components/TimelineItem.tsx` is a still-live example of the correct pattern.
4. **Firebase imports must be subpath imports** (`firebase/app`, `firebase/firestore`,
   etc.), never the bare `firebase` package — required for the `firebase-vendor` Vite
   manual chunk to actually capture them.
5. **TypeScript strict mode is real** — `noUnusedLocals`, `noUnusedParameters`,
   `noFallthroughCasesInSwitch` all on. Asset imports (`.jpeg`/`.webp`/`.svg`/etc.) need
   `// @ts-ignore` at the import site in component files (types live in
   `assets-global.d.ts`, itself a Jest-era leftover but still load-bearing for this).
6. **Test runner is Vitest, not Jest** — `npm test` = `vitest run`. Don't reach for Jest
   APIs/config; the Jest files on disk are dead (see Discrepancies below).
7. **`gray-matter` is not browser-safe in this bundle — don't import it from anything
   that ships to the client.** It's Node-oriented internally (Buffer detection, an
   `eval`-based engine loader that Vite's own build output warns about) and throws
   `TypeError: expected input to be a string or buffer` once minified for production —
   even though it works fine in dev, in Vitest, *and* in the Node-side
   `scripts/generate-rss.mjs` (where it's still used, correctly, since that's real
   Node). `src/utils/blogUtils.ts`'s `parseBlogPost` (browser-bundled, via
   `utils/blogLoader.ts`) uses a manual frontmatter split + `js-yaml` instead — copy
   that pattern for any other client-side YAML/frontmatter parsing.
8. **`@mdx-js/rollup` in `vite.config.ts` is `enforce: 'pre'`, which puts it ahead of
   Vite's own `?raw`/`?url` query handling.** Without the `exclude: ["**/content/blog/**"]`
   on it, it silently mis-compiles any raw-text `import.meta.glob(..., {query:'?raw'})`
   import of a `.md`/`.mdx` file under that path — feeding the *already-transformed*
   `export default "..."` JS source back through the MDX compiler as markdown, producing
   a nonsense component instead of erroring loudly. A `/\?raw/` RegExp `exclude` does
   **not** work (verified empirically — the plugin's filter doesn't see the query
   string); path-based string excludes do. If you ever add a second raw-text-imported
   `.md`/`.mdx` source outside `content/blog/`, extend this exclude or you'll hit the
   same bug.

## In-flight refactor (check `git status` before trusting this is still true)

As of 2026-08-01, branch `fix/react-group-and-misc` has an **uncommitted** series of
changes progressively trimming homepage sections, driven by direct "get rid of this
section" feedback from the site owner across several iterations in one session:

1. `SkillsSection/` (component tree, the "Technical Skills" grid) deleted.
2. `SkillsRadarChart.tsx` (the "Technical Skills Proficiency" radar chart — it rendered
   hard-coded placeholder data, never actually wired to `portfolio.json`) deleted. Its
   functionality was briefly consolidated into `charts/components/SkillsSummary.tsx`,
   rendered inside `CareerTimeline.tsx`.
3. `SkillsSummary.tsx` and its test were then **also** deleted — the site owner didn't
   want that either. **Net result: no skills-proficiency UI exists anywhere on the
   homepage anymore**, and `portfolio.json`'s `skills` field has no homepage consumer
   left (re-check before assuming it's used elsewhere too).
4. `components/github/` + `components/contribs/` (the "GitHub Contributions" heatmap,
   a 3-tier fallback chain) deleted outright — `<GitHubContributions />` had exactly one
   call site (`homePage.tsx`), so removing the section made the whole subsystem dead.
   **Left deliberately untouched**: `contribs.yml` (CI workflow) and
   `scripts/fetch-contribs.mjs` still run on a cron/push and keep committing
   `public/data/contributions.json` — now orphaned, nothing reads that file. Disabling a
   CI workflow felt like a bigger call than a UI-section removal warranted; flagged here
   instead.
5. Site owner then separately reported the **remaining** "GitHub Statistics Dashboard"
   (`GitHubStatsChart`) looked fake/stale and asked for it to be live and error-free.
   Investigation found `homePage.tsx` called `<GitHubStatsChart />` with zero props the
   whole time — its "mock defaults" (1,250 stars / 320 forks / 45 repos / 127-day streak,
   fake 6-month history) were literally 100% of what every visitor ever saw, not
   occasional staleness. Root-caused the *actually*-stale piece too: `gh run list
   --workflow=contribs.yml` showed **every scheduled run failing** since ~Sep 2025 —
   the fetch step always succeeds, but `git push` gets rejected with `GH006: Protected
   branch update failed` (main requires PR review; the workflow's default `GITHUB_TOKEN`
   isn't exempt). Presented the site owner with the trade-off (fix requires either
   weakening branch protection or them generating a PAT — not something to decide
   unilaterally) and they chose: wire stars/forks/repos/languages to real
   `useGithubRepos()` data now (safe, no credentials needed), drop "Day Streak" and the
   6-month chart entirely rather than fake them (accurate versions need the broken
   pipeline fixed first), and leave the CI fix as a documented follow-up (see
   Housekeeping below for the exact remediation options). New file:
   `charts/utils/githubStatsUtils.ts` (pure aggregation, tested). `CustomTooltip.tsx`
   also deleted — it only ever served the now-removed `LineChart`.

6. Site owner then asked to fix the "Part 1 / Tier 0" trust-bug list from
   `docs/planning/portfolio-competitive-research-2026.md` verbatim: the `www` TLS cert,
   every deep link 404ing, the broken blog post, 3 missing hero images, 404ing PWA
   icons, and zero observability. All six root-caused and fixed to the extent possible
   without registrar/third-party-account access — full writeup is its own session-log
   entry ("Tier 0 trust-bug fixes...") since it's too long for this list. Short version:
   `public/404.html` + `index.html` restore script (real SPA fallback now), new
   `utils/blogLoader.ts` real content pipeline (`react-markdown`, replacing
   `dangerouslySetInnerHTML` + `dompurify`, which is now removed), generated on-brand PWA
   icons + blog hero images + default OG image (none of these directories existed on
   disk at all), `gray-matter` replaced with `js-yaml` in the browser-bundled parse path
   (Node-oriented internals broke under minification — see Hard Rules below),
   `@mdx-js/rollup` given a path-based `exclude` (was silently mis-compiling raw-text
   glob imports — see Hard Rules below), `deploy-pages.yml` now passes `VITE_*` secrets
   through to the build (none currently exist as actual secrets — that's the one
   genuinely unfixable piece, see Owner action items), and a real Firestore
   cascading-error bug fixed (`isFirebaseInitialized()` gate in
   `services/analytics/logEvent.ts`). The `www` TLS cert itself remains broken (DNS,
   no access) — every canonical/OG/sitemap/RSS URL in the codebase was at least
   repointed off of it and off the also-wrong raw `vaporjawn.github.io` onto the
   apex, `vaporjawn.dev`, which is the one domain that actually has a valid cert.

Verified clean after each step (no dangling imports, `tsc --noEmit` + `npm run lint`
pass, full test suite green, live browser check showing real fetched numbers) as of this
writing. If you see references to `SkillsSection`, `SkillsRadarChart`, `SkillsSummary`,
`components/github`/`components/contribs`, `CustomTooltip`, `GitHubStatsChart` mock
defaults, `dompurify`, `PLACEHOLDER_POSTS`, or a missing `public/404.html`/`public/icons/`/
`public/assets/blog/` that don't match "all deleted / now live / now exists," the state
has changed since — re-verify against actual `git log`/`git status`, don't trust this
note blindly past its own snapshot date.

## Dead / unused code (zero import sites in `src/`, confirmed via grep)

- `components/illustrations/CodeIllustration.tsx`, `RocketIllustration.tsx`
- `components/testimonials/TestimonialsCarousel.tsx` — has ready content sitting unused
  in `src/data/testimonials.json`. Also has a likely bug if ever revived: `autoPlay`
  calls `setTimeout` directly in the render body instead of inside a `useEffect`.
- `components/Skeleton/SkeletonLoader.tsx`
- `components/ThemeToggle/ThemeToggle.tsx` — superseded by
  `components/header/components/darkModeToggle.tsx`, which is the one actually wired in.
- `pages/AnalyticsDashboard/AnalyticsDashboard.tsx` — a whole orphaned page, no route.

None of these are broken, they're just not reachable from any route/import. Safe
candidates for deletion, or for wiring up if the intent was to use them — worth asking
before doing either.

## Discrepancies between docs (including CLAUDE.md) and actual code

Check these before trusting an older doc's specific claim:

| Claim | Reality |
|---|---|
| `src/backend/firebase.ts` (single file) | It's `src/backend/firebase/` — a 7-file module. A dead `firebase.ts.old` with a stale hardcoded config sits alongside, unimported. |
| `public/_redirects` exists | It does not. Only `public/_headers` exists. |
| "253+ tests" (CLAUDE.md) / "236 tests passing" (SECURITY.md, dated Dec 2024) | Real count 2026-08-01: ~249 unit/component tests (34 files) + 19 Playwright e2e ≈ 268 combined. |
| `PortfolioContext` described as "GitHub API data context" | It's the static `portfolio.json` context (personalInfo/skills/projects/experience/social). Live GitHub API data is handled entirely separately by `useGithubActivity`/`useGithubRepos`. |

## Data duplication worth knowing about (not necessarily bugs, just non-obvious)

- **Two independent project datasets**: `src/data/portfolio.json`'s `projects` array
  (via `useProjects()`) vs. `src/pages/projects/data/projectsData.ts` (used directly by
  the Projects page). Not derived from each other.
- **Two independent social-link datasets**: `src/data/socialLinks.ts` (→
  `SocialMedia`/`Footer`) vs. `portfolioData.social` (→ `useSocial()`).
- **Four hooks each reimplement their own localStorage TTL cache**
  (`useNpmPackages`, `useGithubActivity`, `useGithubRepos`, `useDevpostProjects`)
  instead of sharing `src/utils/secureStorage.ts`, which already does this more
  robustly (checksums, quota eviction). `secureStorage.ts` is currently unused.

## Housekeeping candidates (low priority, not blocking anything)

- **`contribs.yml` is orphaned AND actually broken**, not just unused. Orphaned: nothing
  reads `public/data/contributions.json` since `GitHubContributions.tsx` was deleted
  (step 4 above). Broken, independently: confirmed via `gh run list --workflow=contribs.yml`
  that **every scheduled run has failed** since ~Sep 2025, and via `gh api
  repos/Vaporjawn/Vaporjawn.github.io/actions/jobs/{id}/logs` on the latest one that the
  failure is `GH006: Protected branch update failed` at the `git push` step — `main`
  requires 1 approving + code-owner review, and the workflow's default `GITHUB_TOKEN`
  isn't exempt from that (`enforce_admins: false` only exempts the human owner's own
  pushes, not the Actions bot's). This explains why `fetchedAt` was frozen at
  2025-09-26 — not a flake, 100% reproducible every single run. **To fix**: either (a)
  add the actions bot to `required_pull_request_reviews.bypass_pull_request_allowances`
  on `main`'s branch protection — a real security trade-off, needs the owner's sign-off,
  not something to change unilaterally — or (b) have the owner generate a personal
  access token (`repo` scope; their account can bypass the review requirement per
  `enforce_admins: false`), add it as a repo secret (e.g. `CONTRIB_PUSH_TOKEN`), and
  point the workflow's checkout/push at that token instead of `GITHUB_TOKEN`. Neither
  was done here — this was flagged to the owner as a follow-up decision, not
  auto-applied.
- Delete dead Jest artifacts once confirmed fully unreferenced: `jest.config.cjs`,
  `jest.config.old.cjs`, `jest.tsconfig.json`, `__mocks__/fileMock.js`, and the
  `jest`/`ts-jest`/`jest-*` devDependencies. (`assets-global.d.ts` still matters for TS
  asset-import types even post-Jest — don't delete that one without checking first.)
  `src/test-types.d.ts` is a second, overlapping asset-declaration file (comment says
  "Jest asset type declarations" verbatim, plus a pile of hyper-specific relative-path
  declarations for individual logo files patched in for `ts-jest` ESM issues) — largely
  redundant with `assets-global.d.ts` now that Vitest is the live runner; worth
  consolidating into one file rather than two, once verified nothing still needs the
  ultra-specific relative-path entries.
- `deploy-pages.yml` runs `rm -rf node_modules package-lock.json && npm install` instead
  of `npm ci` on every production deploy — regenerates the lockfile rather than
  installing exactly what's committed. Worth a second look for reproducibility.
- `npm-publish.yml` / `npm-publish-github-packages.yml` look like vestigial template
  boilerplate (this isn't a published npm package; both also pin Node 16, unlike the
  18/20/22 matrix everywhere else in CI).
- `test-results/.last-run.json` is tracked in git (not gitignored) while `coverage/`
  correctly is.
- `old_files_backup/` (366 files) is a deliberately-archived predecessor React 18 app —
  don't touch it, but it's a reasonable future deletion candidate; it currently only
  gets incidental Dependabot bumps to its own inert `package.json`.
- `social-media-layout-test.html` at repo root is a manual one-off visual scratch
  artifact, not a real test — candidate for deletion.
- Default `/vite.svg` favicon still wired in `index.html`, not yet replaced with a
  custom site icon.
- `scripts/generate-rss.mjs` isn't wired into build or CI — `public/rss.xml` only
  updates when run manually. (As of 2026-08-01 it also uses `gray-matter` properly
  — a prior hand-rolled regex frontmatter parser silently truncated any field
  containing an apostrophe, e.g. "Google's Core Web Vitals" → "Google". Still not
  wired into CI, just no longer wrong when run.)

## Owner action items (genuinely need Victor's direct input/access — not code fixes)

- **`www.vaporjawn.dev` fails TLS (`ERR_CERT_COMMON_NAME_INVALID`) — DNS-level, no repo
  access can fix it.** Root cause confirmed via `openssl s_client -connect
  www.vaporjawn.dev:443`: it's served GitHub's generic `*.github.io` cert, not one
  scoped to `www.vaporjawn.dev`, because GitHub Pages only provisions HTTPS for the one
  domain configured as the custom domain (`vaporjawn.dev`, the apex — confirmed via `gh
  api repos/Vaporjawn/Vaporjawn.github.io/pages`: `"domains":["vaporjawn.dev"]` only).
  `dig +short www.vaporjawn.dev CNAME` shows it currently points at the apex domain
  itself (`vaporjawn.dev.`), not at `vaporjawn.github.io` — a live WebFetch of GitHub's
  own custom-domain docs confirms this exact pattern ("if you point your custom
  subdomain to your apex domain, you will encounter issues with enforcing HTTPS") is
  the documented cause. Two real options, both outside what I can do from this repo:
  (a) change the `www` CNAME record, at whatever registrar/DNS host manages
  `vaporjawn.dev`, to point directly at `vaporjawn.github.io` instead of at the apex —
  matches GitHub's documented setup, may or may not fully resolve it depending on
  whether GitHub also needs `www` added as a second custom domain (they don't support
  two simultaneously via the standard Pages UI, historically); or (b) put a CDN/proxy
  (e.g. Cloudflare) in front that terminates TLS for both `vaporjawn.dev` and
  `www.vaporjawn.dev` under one cert, proxying to GitHub Pages — more robust but a
  bigger infra change (nameserver delegation). Mitigated everything I could from inside
  the repo instead: every canonical/OG/Twitter/JSON-LD/sitemap/RSS/robots.txt URL now
  points at the working apex domain, not `www` (see the Tier-0 session-log entry).
- **No Sentry/GA4/Hotjar/Firebase credentials exist anywhere — not as GitHub repo
  secrets (`gh secret list` shows only `CONTRIB_GRAPHQL_TOKEN`), not in the local `.env`
  (every `VITE_FIREBASE_*`/`VITE_GA_MEASUREMENT_ID` line in it is commented out).** This
  is why "zero working observability" isn't a bug to fix in code — there's nothing
  configured to activate. To turn any of them on: create the account/project (Sentry
  project → DSN, GA4 property → Measurement ID, Hotjar site → Site ID, Firebase project
  → the 7 config values — `.env.example` has the exact variable names and a link to the
  Firebase console), add each as a **GitHub Actions repository secret** (Settings →
  Secrets and variables → Actions) named exactly `VITE_*` to match, and it'll flow
  through automatically — `deploy-pages.yml`'s build step now passes all of them
  through as of 2026-08-01 (previously had no `env:` block at all, so even
  already-configured secrets would never have reached the build). Can add them
  incrementally; anything left unset just stays disabled with its existing clean
  single `console.warn`, same as today.
- **`/resume` page headline is wrong and can't be fixed here.** The page renders a
  static `<iframe src={resume}>` against `src/assets/Resume.pdf` (a bundled binary
  asset, imported in `resumePage.tsx`) — there's no React-rendered resume text at all.
  The PDF's own internal content says "Senior Full Stack Software Engineer" (no CTO
  mention) and has a plaintext phone number on it. Fix: export an updated resume PDF
  with the corrected headline and the phone number removed, then replace
  `src/assets/Resume.pdf`. (The SEO *meta* description/keywords around this page were
  fixed in code on 2026-08-01 — only the actual visible/embedded document content is
  still wrong.)
- **The Kids Care Finder hiring/team-building leadership essay is still unwritten.**
  Two of the three planned leadership essays shipped
  (`content/blog/build-vs-buy-admin-auth.md`, `content/blog/framework-for-cutting-things.md`),
  grounded entirely in this repo's own real, public git history — no interview needed.
  The third ("how I structured hiring/team-building") needs real, non-public specifics
  from Victor about actual decisions at Kids Care Finder; it was deliberately not
  fabricated. When ready, the interview questions are: what was the actual situation,
  what was concretely done (roles/order/process), what was the hardest tradeoff, and
  what changed as a measurable result.

## Admin auth, if you need to touch it

`AdminAuthContext`/`AdminAuthProvider`: `sessionStorage` (tab-scoped) key
`admin-auth-session`, 1-hour hardcoded session (`SESSION_DURATION_MS`), SHA-256 hash
comparison via `crypto.subtle.digest` (no salt, non-constant-time `===`) against
`VITE_ADMIN_PASSWORD_HASH`. Generate a new hash with
`node scripts/generate-admin-hash.mjs <password>`. This is intentionally lightweight —
it protects draft blog content, not sensitive data (per `SECURITY.md`). Don't upgrade
its rigor without checking whether that's actually wanted; it's a deliberate choice, not
an oversight — though the fact that Firestore rules currently leave analytics
collections publicly *readable* (protected only by this client-side gate, not
server-side rules) is a documented-but-real gap if the threat model ever changes.
