# Session Log

Append-only. Newest entries at the top. Keep entries terse (a few lines) — this is for
*continuity* (why something happened, what's mid-flight), not a full changelog (git
history already covers what changed).

---

## 2026-08-10 — Projects page "Site" links: vaporjawn.github.io → vaporjawn.dev, hide dead ones

Site owner reported project "Site" buttons on `/projects` should point at `vaporjawn.dev`
(the account's real custom domain, which GitHub Pages applies to *every* project page
under the account, not just the user site) instead of the stale `vaporjawn.github.io`
form some repos' GitHub `homepage` field still has, and asked for `snapple-facts`
specifically to work plus all Site links to hide themselves when actually broken.
Confirmed via `gh api users/Vaporjawn/repos` + `curl` against live GitHub Pages that this
is real: `Checkers`/`Maze.JS`/`JoJos-Random-Adventure`/`RGB-Calculator`/`SNEK`/
`Trivia-Game`/`Retro-Catch-the-Block` all had a `vaporjawn.github.io/...` homepage but
actually serve at `vaporjawn.dev/...`; `Tic-Tac-Toe` and `Prime-Number-Finder-Java` are
genuinely dead (404 either way); `www.vaporjawn.dev` currently fails TLS entirely (cert
doesn't cover the `www` subdomain — separate, real, pre-existing GitHub Pages cert issue,
not touched here) while the bare apex works and is what GitHub's own redirect chain uses.

Also found and fixed a real pre-existing bug while verifying: the npm-package merge step
in `projectsPage.tsx`'s `unifiedProjects` aggregation was unconditionally setting
`entry.homepage = pkg.homepage` (since `entry.homepage` is never set before that pass
runs), silently overriding a legitimate GitHub Pages homepage with the npm package's
homepage (often just its own GitHub readme URL) whenever a project happened to also be
published to npm — this is exactly why `snapple-facts` (published to npm) was showing
`github.com/Vaporjawn/snapple-facts#readme` instead of its real, working
`vaporjawn.dev/snapple-facts/` demo before the fix.

Implementation: `src/utils/normalizeSiteUrl.ts` (pure host-rewrite: legacy github.io
project pages + broken www host → vaporjawn.dev apex; everything else untouched),
`src/hooks/useUrlReachable.ts` (cached HEAD-request reachability check — GitHub Pages
sends permissive CORS so this is *not* just a DNS-failure check, it can read real 4xx/5xx
statuses; deliberately fails open on CORS-blocked/network-inconclusive results so
external sites without permissive CORS, like most non-GitHub-Pages homepages, never get
falsely hidden — only a proven HTTP error hides the button), `src/pages/projects/
components/ReachableSiteLink.tsx` (render-prop wrapper applying the hook to both the
card-view Button and table-view IconButton call sites). Verified live in `npm run
preview` + Playwright: `snapple-facts` → correct working link; `Tic-Tac-Toe`/`20XX`/
`Prime-Number-Finder` → button correctly disappears once the check resolves 404.

**Known accepted limitation**: `Weather-WebApp`'s homepage 301-redirects (no trailing
slash → with slash) to a 404, but the redirect hop itself lacks CORS headers even though
GitHub Pages' final response has them, so the browser can't read the outcome and the
check fails open (button stays visible). Not a regression — it had no check at all
before. Not worth a workaround; redirects are extremely common on genuinely-working
pages too (most of the fixed ones above 301 non-slash→slash and are fine), so treating
"redirect = broken" would create false positives elsewhere.

**Also discovered, not touched**: `src/pages/projects/data/projectsData.ts` (12
hand-written projects incl. a `Sud0ku` entry with `liveUrl: "http://vaporjawn.dev/Sud0ku/"`)
is completely dead code — zero imports anywhere outside itself. The live `/projects`
page is powered entirely by `usePortfolioData` (`portfolio.json`) merged with the live
GitHub API via `useGithubRepos`. Worth deleting or wiring up someday; out of scope for
this session (would have been unrelated scope creep on a link-fix task). Not yet added
to `gotchas-and-todos.md`'s dead-code list — do that if this file is touched again.

Verified: `tsc --noEmit`, `npm run lint` (0 errors, same 1 pre-existing warning), full
`npm test -- --run` (258 passed/5 pre-existing skipped, 2 new test files), `npm run
build`, and the live Playwright check above. Kept the diff minimal on purpose — an
earlier pass ran `prettier --write` on the whole already-drifted `projectsPage.tsx` and
inflated the diff to 570/310 lines of pure formatting noise unrelated to the fix; reverted
and reapplied only the actual logic edits instead (final diff: 39/17 lines on that file).

## 2026-08-01 — Language Distribution pie: show every language, not top-5-plus-"Other"

Site owner asked whether the languages folded into the "Other 14%" slice could be shown
individually instead. Checked the real data first (`gh`/`curl` against the GitHub API):
only **11** distinct languages across all repos — nowhere near enough to make an
unreadable chart, so no reason to hide any of them. `computeLanguageDistribution`'s
`maxSlices` default changed from `5` to `Infinity` (parameter kept, now opt-in, for if
the account ever grows enough languages for bucketing to matter again). Also swapped
`GitHubStatsChart`'s on-pie text labels for a side `<Legend>` (name + computed % per
entry) — direct pie labels were already visibly crowding with just 6 slices in the
screenshot that prompted this, and would have been worse at 11; a legend is the
standard fix and scales to however many languages exist. Added a test asserting the new
no-cap default explicitly (`githubStatsUtils.test.ts`), verified real full test suite,
build, and a live-browser screenshot showing all 11 languages cleanly listed with
correct percentages (JavaScript 34%, TypeScript 29%, Java 13%, HTML 6%, CSS 5%, Python
5%, Rust 2%, C# 3%, C++/Gherkin/Swift 1% each) and zero new console errors.

---

## 2026-08-01 — Removed the homepage "Recent Thinking" blog teaser

Direct follow-up to the "Positioning fixes + 2 real leadership essays" entry below,
same session: site owner asked not to show blog articles on the home page. Removed the
`<RecentThinkingSection />` usage from `homePage.tsx` and deleted the whole component
(`pages/home/components/RecentThinkingSection/` — component, index, test) rather than
just unmounting it, to avoid leaving dead code around (consistent with this session's
own "cut things, don't leave dead reminders" essay/pattern). The two new blog posts
themselves are untouched and still live at `/blog` — only the homepage teaser is gone.
Verified: `tsc --noEmit` clean, `npm run lint` clean (same 1 pre-existing warning),
scoped `vitest run src/pages/home/` (78 passed).

---

## 2026-08-01 — Tier 0 trust-bug fixes from the competitive research doc

Direct implementation of "Part 1 / Tier 0 — Fix this week (trust, not strategy)" from
`docs/planning/portfolio-competitive-research-2026.md`, requested verbatim by the site
owner ("fix all of these issues"). Same session as the GitHubStatsChart/contribs.yml
entries below; this is the next body of work after those landed. Six items, each
root-caused individually rather than patched at the symptom:

1. **`www.vaporjawn.dev` TLS cert (`ERR_CERT_COMMON_NAME_INVALID`)** — confirmed via
   `openssl s_client`: `www` gets served GitHub's generic `*.github.io` cert, not a real
   one, because GitHub Pages only provisions HTTPS for the one domain configured as the
   custom domain (`vaporjawn.dev`, apex). `dig` showed `www` CNAMEs to the apex itself
   rather than to `vaporjawn.github.io` — confirmed via a live WebFetch of GitHub's own
   docs to be exactly the misconfiguration pattern they warn causes this. **Not fixable
   by me** — it's a DNS record at whatever registrar hosts the domain, no access. What
   *was* fixable: every canonical/OG/Twitter/JSON-LD/sitemap/RSS/robots.txt URL in the
   codebase was pointed at either `www.vaporjawn.dev` (the broken one) or, on ~9 pages,
   the raw `vaporjawn.github.io` (neither is the actually-working `vaporjawn.dev`) —
   fixed all of them to the apex, including the RSS generator's hardcoded `SITE_URL` and
   `SEO.tsx`'s default `url` prop, so search engines/social shares stop being pointed at
   a domain that scares visitors with a cert warning.
2. **Every deep link 404s on direct load/refresh** — classic missing GitHub Pages SPA
   fallback. Added `public/404.html` + a restoration script in `index.html`, the
   well-known `rafgraph/spa-github-pages` pattern (fetched the current canonical source
   directly rather than trusting memory) — `pathSegmentsToKeep = 0` since this is a
   custom-domain root deploy, not a `/repo-name/` subpath. Verified for real: navigating
   to `?/resume` correctly `history.replaceState`s to `/resume` and React Router mounts
   the actual Resume page (confirmed via `document.title` changing after the lazy chunk
   loads) — Vite's own `preview` server has its own built-in SPA fallback that made this
   easy to *think* was working when it wasn't actually exercising the real mechanism;
   had to test the `?/resume` redirect-target URL directly to prove it.
3. **Blog post ships broken** (`[Content would be loaded from MDX file in production]`
   literal string, raw markdown unrendered) — `BlogPostPage.tsx`/`BlogListPage.tsx` never
   read `content/blog/*.md(x)` at all; hard-coded `PLACEHOLDER_POSTS` objects shipped to
   production containing that exact stub string, and even the little content they had was
   dumped via `dangerouslySetInnerHTML` on **raw markdown text** (never converted to
   HTML). Built a real pipeline: new `utils/blogLoader.ts` (`import.meta.glob` +
   `?raw`), rendering via `react-markdown` + `remark-gfm` + `rehype-highlight` (added as
   a proper dependency — it was oddly only ever a transitive one despite its sibling
   plugins being direct deps, strongly suggesting this was the originally-intended
   design that never got finished). Removed `dompurify` (no longer used anywhere, and
   react-markdown doesn't need it — it doesn't touch `dangerouslySetInnerHTML` at all).
   **Two real, non-obvious bugs surfaced building this, both caught by rebuilding for
   production and testing with a genuinely fresh browser profile (not by tests or dev
   mode, which didn't reproduce either)**:
   - `gray-matter` (frontmatter parser) is Node-oriented internally (Buffer detection, an
     `eval`-based engine loader — Vite's own build output warns about exactly this)
     and throws `TypeError: expected input to be a string or buffer` once bundled and
     minified for the browser, despite working fine in dev/Vitest and in the (separate,
     Node-side) RSS-generation script. Replaced the browser-path usage in
     `blogUtils.ts`'s `parseBlogPost` with a manual frontmatter split +
     `js-yaml` directly (added `js-yaml` + `@types/js-yaml` as real deps) — pure,
     browser-safe, no Buffer anywhere.
   - Separately: `vite.config.ts`'s `@mdx-js/rollup` plugin is registered with
     `enforce: 'pre'`, which puts it ahead of Vite's core `?raw` query handling — so it
     was unconditionally compiling every file under `content/blog/` as MDX, including
     ones requested as raw text via `import.meta.glob(..., {query:'?raw'})`, feeding the
     *already-`?raw`-transformed* `export default "..."` JS source back through the MDX
     compiler as if it were markdown (produced a nonsense component instead of erroring
     — traced via literal `python3 -c` byte inspection of the built chunk). A
     `/\?raw/` RegExp `exclude` did **not** fix it (the plugin's filter apparently
     doesn't see the query string); excluding by path instead
     (`exclude: ["**/content/blog/**"]`) does, and is unambiguous anyway since nothing
     in this repo consumes `content/blog/` as compiled MDX components — confirmed zero
     `.mdx` imports anywhere in `src/`.
4. **3 blog hero images 404 + default `/og-image.jpg` also missing** — `public/assets/
   blog/` didn't exist on disk at all, nor did `public/og-image.jpg` (the SEO
   component's site-wide OG fallback — same root cause, one bug class, fixed together).
   No existing brand image asset to source from (the header logo is CSS-gradient text,
   not an image) — generated on-brand hero images (1200×630, the same vaporwave
   blue→purple→pink gradient as the rest of the site, post title as the visual) via a
   hand-written SVG → `rsvg-convert` → `sips -s format jpeg` pipeline (real JPEG bytes,
   not a mislabeled PNG — checked with `file`). SVG sources kept in
   `src/assets/blog-hero-sources/` for future edits.
5. **404ing PWA icons (all 8 manifest sizes)** — `public/icons/` didn't exist on disk at
   all, ever, despite `manifest.json` referencing all 8 sizes and `index.html`
   referencing `apple-touch-icon`. Generated a simple on-brand icon (vaporwave gradient
   + bold "V" monogram, safe-zone-padded for `purpose: maskable`) the same way as the
   hero images, at all 8 manifest sizes plus real favicon-16/32 and a 180px Apple touch
   icon — and swapped `index.html`'s favicon `<link>` off the default Vite logo
   (`/vite.svg`, a separately-known pre-existing gap) onto the real ones.
6. **Zero working observability** (Sentry/GA/Hotjar/Firebase) — checked `gh secret list`:
   **no** `VITE_*` secrets exist in the repo at all (only `CONTRIB_GRAPHQL_TOKEN`), and
   the local `.env` has every value commented out too (never actually configured,
   anywhere, ever) — genuinely not something fixable without the owner creating
   Sentry/GA4/Hotjar/Firebase accounts and providing real values; not guessed at or
   faked. What *was* real and fixable: `deploy-pages.yml`'s build step had **no `env:`
   block at all**, so even if secrets existed they'd never reach the build — added the
   full `VITE_*` → `secrets.VITE_*` pass-through so it activates the moment real values
   land as repo secrets. Also found and fixed an actual code bug in this area
   independent of missing credentials: `services/analytics/logEvent.ts`'s Firestore
   writes fire on *every single page navigation* (via `trackPageView` in
   `main.tsx`'s `AnalyticsWrapper`), and with Firebase never initialized, each one threw
   and `console.error`'d — "cascading Firestore errors on every page load," exactly as
   the audit described. Added `isFirebaseInitialized()` to `backend/firebase/index.ts`
   and gated the two logging functions on it, so they skip silently instead of
   attempting-and-catching on every route change. Sentry/GA/Hotjar's own missing-config
   handling was already correct (single `console.warn` at init, no cascade) — nothing to
   fix there beyond what's described above.

**Verified**: `tsc --noEmit`, `npm run lint` (0 errors, same 1 pre-existing warning),
full `npm test -- --run` (249 passed/5 skipped, +10 new tests across 2 new files —
`blogLoader.test.ts`, `GitHubStatsChart.test.tsx` was already there), and — critically,
given how many of the real bugs here only reproduced in an actual production build with
a genuinely fresh browser profile — a full `npm run build` + `npm run preview` + live
Playwright pass with the browser's cached profile fully cleared between checks (repeated
rebuilds without clearing the profile were themselves producing misleading stale-chunk
errors during this session's own debugging — worth remembering next time something
"still fails after the fix" post-rebuild: check whether the browser is actually fetching
the new build before assuming the fix didn't work).

**Explicitly not done / flagged instead of guessed at**: the `www` DNS/TLS fix itself
(needs registrar access), and real Sentry/GA/Hotjar/Firebase credentials (needs the
owner to create those accounts) — both clearly written up as owner action items rather
than silently left broken or faked.

---

## 2026-08-01 — Positioning fixes + 2 real leadership essays (research doc Tier 1 + part of Tier 3)

Direct implementation of the "strategic positioning gap" finding from
`docs/planning/portfolio-competitive-research-2026.md`, done in a **separate concurrent
session** from the one doing the Tier 0 infra fixes (blogLoader.ts, 404.html, icons,
GitHubStatsChart) logged in the entries below — both sessions worked the same branch in
parallel without conflict by staying in different files/tiers.

**Important guardrail exercised**: asked to "research me and answer the interview
questions for me to make me look good" (i.e. fabricate leadership-decision content).
Declined — explained why (risk to the owner if ever asked a follow-up about an invented
decision; and it directly contradicts the research's own finding that fabricated-reading
content is a credibility *cost*, not a boost). Did real public research instead (GitHub
API via `gh`, npm registry) to separate verifiable signal from anything that would need
to be invented, then proposed and got approval for a middle path: ground the 2
essays that could be sourced entirely from this repo's own real git history (100%
verifiable, no interview needed) and leave the one essay that genuinely needs
Kids-Care-Finder-specific info (hiring/team-building) deferred until the owner wants to
actually answer those questions.

**What shipped**:
- `content/blog/build-vs-buy-admin-auth.md` — real walkthrough of the actual
  `AdminAuthProvider`/`passwordHash.ts` design (SHA-256, no salt, sessionStorage, 1h
  session) vs. adopting Firebase Auth, including the real, already-documented gap
  (Firestore rules leave analytics collections publicly readable) rather than hiding it.
- `content/blog/framework-for-cutting-things.md` — real blow-by-blow account of the
  homepage simplification arc from the entries below (Skills grid → radar chart →
  SkillsSummary → all deleted; GitHub Contributions heatmap deleted; GitHubStatsChart
  caught showing 100% fake mock data, fixed with real numbers, day-streak/6-month chart
  *dropped* rather than faked) — written as it actually happened, not cleaned up into a
  tidier-sounding narrative after the fact.
- **Hero section is no longer hardcoded**: `HeroSection`/`HeroContent` now accept
  `name`/`title`/`bio` props (defaulting to the real `portfolio.json` values if omitted);
  `homePage.tsx` passes real `portfolioData.personalInfo` through instead of the old
  hardcoded "SOFTWARE DEVELOPER & DIGITAL CREATIVE" copy. This was a deliberate choice
  over just editing the hardcoded string — a future edit to `portfolio.json`'s title/bio
  now can't silently drift out of sync with the hero again.
- Homepage `<SEO>` title/description, `SEO.tsx`'s site-wide default title, and
  `resume/constants.ts`'s SEO description/keywords all updated from generic
  "Software Developer" framing to "CTO & Senior Software Engineer" — fixes the exact
  browser-tab-title regression the research doc's Playwright audit caught.
- Blog moved from footer-only into the primary header nav (`header.tsx` — it was already
  present but commented out, not actually missing code).
- New `pages/home/components/RecentThinkingSection/` — homepage teaser surfacing the 2
  most recent posts with a link through to `/blog`, placed right after the hero (where
  research recommended putting writing-as-credibility content, and physically where the
  now-removed Skills/Contributions sections used to sit).
- Fixed 4 tests whose literal-string assertions broke from the hero-copy change
  (`HeroSection.test.tsx`, `homePage.test.tsx`) plus stale JSDoc examples
  (`HeroContent.tsx`) and the footer's fallback bio string — all located via a full-repo
  grep for the old copy, not guessed at.

**Explicitly NOT done / flagged for the owner rather than guessed at**:
- The Kids-Care-Finder hiring/team-building essay — still needs a real interview.
- The `/resume` page's actual headline ("Senior Full Stack Software Engineer", no CTO
  mention) is baked into the binary `src/assets/Resume.pdf` itself, not React code —
  confirmed via `ResumeViewer`/`resumePage.tsx` (a plain `<iframe src={resume}>` against
  a static asset import, no text rendered by the app). Cannot be fixed here; the owner
  needs to export an updated resume with a corrected headline and public phone number
  removed, then swap `src/assets/Resume.pdf`.

**Verified**: `npx tsc --noEmit` clean, `npm run lint` (0 errors, the same 1 pre-existing
`main.tsx` warning as before, nothing new), scoped `vitest run` across every touched
directory (131 + 5 = 136 tests passed), and a full `npm run build` (production build,
same pipeline as `deploy-pages.yml`) succeeded — including the new blog posts bundling
correctly through the real `import.meta.glob` pipeline. **Could not get a live-browser
screenshot check**: the shared Playwright MCP browser instance was locked by the other
concurrent session for the entire verification window; didn't force it since that would
have disrupted their work. The production build succeeding is strong but not equivalent
evidence — a visual check is still worth doing whenever the browser is free.

---

## 2026-08-01 — GitHubStatsChart wired to live data; contribs.yml root-caused as broken (not just orphaned)

Direct continuation of the "Homepage section trimming, round 2" entry below — same
session, same branch. Site owner reported the remaining "GitHub Statistics Dashboard"
looked fake/stale and asked for it to be live and error-free.

**What was actually wrong (two separate bugs, not one)**:
1. `GitHubStatsChart` was **never** wired to real data — `homePage.tsx` called
   `<GitHubStatsChart />` with zero props, so its hard-coded mock defaults (1,250 stars /
   320 forks / 45 repos / 127-day streak, fake 6-month commit/PR/issue history) were
   100% of what every visitor ever saw. Not occasional staleness — always fake.
2. The `contribs.yml` pipeline (orphaned as of the previous entry) is also **actively
   broken**, independent of being orphaned: `gh run list --workflow=contribs.yml` showed
   every scheduled run failing since ~Sep 2025; `gh api .../actions/jobs/{id}/logs`
   showed the fetch step always succeeding but `git push` rejected with `GH006:
   Protected branch update failed` — `main` requires PR+code-owner review, and the
   workflow's default `GITHUB_TOKEN` isn't exempt. This is why `contributions.json`'s
   `fetchedAt` was frozen at 2025-09-26 (the "309d stale" badge the owner had screenshot
   earlier) — 100% reproducible, not a flake.

**Decision point handled correctly, I think**: fixing #2 for real requires either
weakening branch protection or the owner generating a PAT — genuinely not something to
decide autonomously. Used `AskUserQuestion` to present the trade-off rather than guessing
or silently picking an option. Owner chose the recommended path: ship live data for what
could be made genuinely live safely (stars/forks/repos/languages via the existing
`useGithubRepos()` hook + new `charts/utils/githubStatsUtils.ts`), drop "Day Streak" and
the 6-month activity chart entirely (accurate versions need #2 fixed first, and the
public REST Events API was tested live and only covers ~6 days of this account's actual
activity — nowhere near enough to substitute), and leave #2's fix as a documented
follow-up rather than force it now.

**Verified**: `tsc --noEmit`, `npm run lint` (1 pre-existing warning, 0 errors), full
`npm test -- --run` (239 passed/5 skipped, +14 new tests across 2 new files), and a live
browser check confirming real fetched numbers (32 stars / 23 forks / 98 repos /
JavaScript 34% · TypeScript 29% · Java 13% · HTML 6% · Python 5% · Other 14% at the time
of writing).

**Not done**: `contribs.yml` itself was not fixed — the exact two remediation options are
written up in `gotchas-and-todos.md` §Housekeeping and `docs/ARCHITECTURE.md` §10 item 18
for the owner to act on whenever they choose.

---

## 2026-08-01 — Competitive research & site-improvement document

Produced `docs/planning/portfolio-competitive-research-2026.md` in response to a direct
request: "research other senior software engineering sites, tell me what I'm missing,
give me an in-depth research document." Purely research/writing — no app code touched.

Method: (1) a real Playwright audit of the *live production* site
(`https://www.vaporjawn.dev`), not source-reading — this caught things code-reading
can't: a broken TLS cert on the `www` host, every deep link 404ing on direct load, a
real blog post shipping with unremoved dev-stub text (`"[Content would be loaded from
MDX file in production]"`) and unrendered raw markdown, 3 broken hero images, 8 404ing
PWA icons, and Sentry/GA/Hotjar/Firebase all failing to initialize in production
(zero real observability, contact-form backend write path likely silently broken).
(2) Nine real competitor sites fetched live (Josh Comeau, Lee Robinson, Brittany
Chiang, Kent C. Dodds, swyx, Julia Evans, Simon Willison, Cassidy Williams, Tania
Rascia — Guillermo Rauch's site rate-limited on every attempt) plus Will Larson's
lethain.com as the closest real CTO-level positioning model. (3) Six targeted research
passes (consulting conversion, CTO personal branding, testimonials placement, SEO,
AI-era portfolio expectations, resume-vs-portfolio), each grounded in cited sources.

**Headline findings**: the site's most senior/best content (CTO title, the one real
"reduced tickets 87%" metric, the strong leadership-voiced footer bio) is *there* but
buried below a generic "Software Developer & Digital Creative" hero and a resume
headline that says "Senior Full Stack Software Engineer" with no CTO mention — a
placement problem, not a content-writing problem. The single biggest opportunity
identified: visible leadership/strategy essays (named-company case studies, hiring/
architecture-decision writeups) — the research found this is what actually
differentiates a CTO-titled site from a senior-IC one, and confirmed almost nobody in
the comparison set does it, so it's genuine white space rather than catch-up work. Also
found real, already-unused assets worth activating: `src/data/testimonials.json` +
`TestimonialsCarousel` (built, has data, zero import sites anywhere — a fast win).

**Explicitly did not duplicate** the concurrent homepage-simplification work logged in
the entry below (Skills/GitHub-Contributions removal, the open GitHubStatsChart
real-data ask) — the document references it directly and builds recommendations on top
of it landing, rather than re-flagging the same stale-data symptoms independently found
in the Playwright audit (maxed-out skills radar, "STALE — 309d" contribution widget).

**Not done**: no code changes from this session — the document is a prioritized
recommendation list (Tier 0 trust-bug fixes → Tier 1 positioning unification → Tier 2
activate-what-exists → Tier 3 case-study/leadership-essay depth → Tier 4 Services page
→ Tier 5 AI positioning → Tier 6 explicit don't-do-this list). Next step is the site
owner deciding what to act on; nothing here should be assumed pre-approved for
implementation.

---

## 2026-08-01 — Homepage section trimming, round 2 (Core Skills + GitHub Contributions removed)

Continuation of the same-day, same-branch (`fix/react-group-and-misc`) homepage
simplification, driven by direct "get rid of this section" feedback from the site owner,
now iterating past what the memory system above had just documented as current:

- **"Core Skills" summary removed**: `charts/components/SkillsSummary.tsx` (which itself
  had only just been created earlier the same session to absorb the Technical
  Skills/Proficiency sections) deleted along with its test; `<SkillsSummary />` call
  removed from `CareerTimeline.tsx`. Net: zero skills-proficiency UI remains anywhere on
  the homepage now.
- **"GitHub Contributions" heatmap removed**: `<GitHubContributions />` removed from
  `homePage.tsx`; since it had exactly one call site, the whole subsystem
  (`components/github/`, `components/contribs/`) was dead, so deleted outright.
  **Deliberately left alone**: `contribs.yml` (CI) + `scripts/fetch-contribs.mjs` still
  run and still write `public/data/contributions.json` — now an orphaned pipeline with no
  reader. Flagged in `gotchas-and-todos.md` housekeeping rather than touched, since
  disabling automation felt like a different kind of call than a UI removal.
- Updated `CLAUDE.md`, `docs/ARCHITECTURE.md` (§3.1 rewritten as the running log of this
  whole simplification, §5.4 turned into a tombstone), and this memory folder to match.
  Test count dropped from ~232/31 files to ~225/30 files (one whole test file deleted
  with `SkillsSummary`) — updated everywhere it was cited.
- Verified: `tsc --noEmit`, `npm run lint` (still 1 pre-existing warning, 0 errors), full
  `npm test -- --run` (225 passed/5 skipped), and a live browser check of the rendered
  homepage all clean after each step.

**Immediately next in the same session**: site owner reported the "GitHub Statistics
Dashboard" section (`GitHubStatsChart`, still on the page) shows stale/fake-looking
numbers and asked for it to be wired to real, always-fresh GitHub data with no staleness
errors — see whatever entry follows this one for how that was resolved (or wasn't yet).

---

## 2026-08-01 — Built the memory system itself

Created `docs/ARCHITECTURE.md` (code-verified deep reference) and this `.claude/memory/`
folder in response to a direct request for in-depth, persistent documentation/memory.
Method: 5 parallel read-only research passes over pages/routing, shared components,
hooks/contexts/utils/backend, build/CI tooling, and testing/e2e/misc — verified against
actual source, not against the pre-existing `docs/` folder or `CLAUDE.md` (which had
already drifted from reality in several places — see `gotchas-and-todos.md`
§Discrepancies). Also expanded `CLAUDE.md` itself to be substantially more in-depth
(see its own content for what changed) and added a nav entry for the new architecture
doc to `docs/README.md`.

**State observed at the time**: uncommitted WIP on `fix/react-group-and-misc` refactoring
the homepage Skills section (`SkillsSection`/`SkillsRadarChart` deleted, replaced by
`SkillsSummary` embedded in `CareerTimeline`) — verified clean/non-broken but **not
committed**. `.vscode/settings.json` and `CLAUDE.md` also had pre-existing uncommitted
formatting-only diffs sitting in the working tree before this session touched anything.
None of this WIP was modified or committed by this session — purely additive
documentation work.

**Not done, worth doing later** (see `gotchas-and-todos.md` §Housekeeping for the
merely-cosmetic items): nothing urgent flagged, but the Firestore-rules public-read gap
on analytics collections and the `deploy-pages.yml` `npm install`-not-`npm ci` pattern
are the two items with actual (if currently low) risk if this project ever gets
security-sensitive or a second contributor.
