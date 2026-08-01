# Portfolio Competitive Research & Improvement Recommendations

**Date**: 2026-08-01
**Scope**: What's actually live on vaporjawn.dev today, benchmarked against real senior/staff
and engineering-leadership personal sites, plus targeted research on positioning,
testimonials, SEO, and AI-era expectations. Read-only research — no code was changed to
produce this document.

**Method**: (1) a live Playwright audit of the production site — actual rendered pages,
console errors, mobile viewport, not just source-reading; (2) nine real, currently-live
competitor sites fetched and read directly (not recalled from training data); (3) six
targeted research passes on consulting conversion, CTO-level positioning, testimonials,
SEO, AI-era portfolios, and resume-vs-portfolio, each grounded in real, cited sources.

---

## Executive Summary

The site has more real substance than most portfolios — a live 99-project GitHub
directory, real published npm packages with live download counts, a working Calendly
booking flow, and one genuinely good quantified metric ("reduced open tickets by 87%").
But right now it's being undercut by two separate problems, and they need different
kinds of attention:

1. **Trust-breaking production bugs** that a hiring CTO or paying client would notice in
   under a minute: a broken TLS cert on `www.vaporjawn.dev`, every deep link 404ing on
   direct load, a real blog post that ends mid-sentence with unrendered dev-stub text,
   three broken hero images, 404ing PWA icons, and zero working observability (Sentry/GA/
   Hotjar/Firebase analytics all failing silently). These are fixable in a day and should
   be fixed before anything else here.
2. **A strategic positioning gap**, which is the actual point of this document: the site
   doesn't commit to who it's for, undersells its most senior content, and — per the
   competitor research below — is missing the one category of content that would
   genuinely differentiate a *CTO-titled* site from the senior-engineer sites everyone
   else already has: **visible leadership/strategy writing**. Nobody in the well-known
   comparison set does this well either, which means doing it makes you stand out rather
   than just catch up.

Everything below is organized so you can act on it in order: what's broken, what the
competition actually does, and a prioritized list of what to change and why.

---

## Part 1 — What's Actually Live Right Now (Production Audit)

This was a real Playwright session against `https://www.vaporjawn.dev`, not a code read.

### Trust-breaking (fix first, regardless of anything else in this doc)

- **`https://www.vaporjawn.dev` fails TLS** (`ERR_CERT_COMMON_NAME_INVALID`) — GitHub is
  serving its generic `*.github.io` wildcard cert for the `www` host, which doesn't cover
  it. A visitor sees a full-page "connection not private" warning before the redirect to
  the apex domain ever fires. The apex (`vaporjawn.dev`, no `www`) has a valid cert and
  works. This is your `CNAME`/DNS config, not app code — but it's the single most
  damaging finding in this whole audit, because every link you've ever shared with `www.`
  in it is currently scaring visitors away before they see anything else.
- **Every deep link 404s on direct load or refresh**: `/about`, `/projects`, `/resume`,
  `/services`, `/contact`, `/blog`, `/activity` all return a real GitHub Pages 404 if
  someone lands on them directly (shared link, bookmark, browser refresh) rather than
  clicking through from the homepage. This is the classic missing SPA-fallback gap for
  GitHub Pages (a `404.html` that redirects into the app, or a rewrite rule) — currently
  costs you every recruiter who clicks a direct `/resume` or `/projects` link from a job
  application or search result.
- **A real blog post ships broken**: `/blog/building-modern-portfolio` ends with the
  literal, unremoved string `"[Content would be loaded from MDX file in production]"`,
  and raw markdown syntax (`## Why React + TypeScript?`) renders as plain unrendered
  text. Anyone who clicks through from the blog list sees a broken stub, not an article.
- **All 3 blog post hero images 404**, rendering blank gradient placeholders.
- **All 8 PWA manifest icons (72px–512px) 404.**
- **Zero working observability**: Sentry, GA, and Hotjar all log "not initialized" in
  production; Firebase fails to init from missing env vars, cascading into repeated
  Firestore errors on every page load. You currently have no real data on how anyone
  uses the site, and the Contact form's Firestore-backed submission path is very likely
  silently broken as a result (not confirmed by an actual test submission, but the
  failure mode lines up).
- **Projects page**: the `env-audit` card description renders two mangled bytes before
  its text ("A comprehensive...") — a mojibake/encoding bug — and a CORS-blocked fetch
  to `devpost.com` fails on every single page load (the Devpost integration is fully
  dead in production).
- **Activity page**: doesn't set its own browser tab title (falls back to the site
  default — the only page with this gap), and the GitHub event feed repeats dozens of
  `"Pushed 0 commits to main (Push)"` entries — reads as raw unfiltered API noise, not a
  curated activity summary.

### Positioning is inconsistent across the site's most-visible surfaces

This is the concrete evidence behind "the site undersells its most senior content":

| Surface | What it says |
|---|---|
| Homepage hero | "Software Developer & Digital Creative" — "Passionate developer creating innovative digital experiences" |
| Homepage footer bio | "Experienced technology leader... proven track record of leading engineering teams" |
| Career timeline (1/3 down the homepage) | Real title: "Chief Technology Officer, Kids Care Finder (Jul 2024–Present)" and the one real metric on the whole site: "Reduced open tickets by 87%" |
| `/resume` headline | "Senior Full Stack Software Engineer" — no mention of CTO |
| Browser tab title (client-rendered, overwrites the server HTML) | "Victor Williams \| Software Engineer \| Victor Williams Portfolio" — drops "Senior" entirely and repeats your name |
| `src/pages/home/homePage.tsx`'s `<SEO>` component | `title="Victor Williams \| Software Engineer"`, hardcoded — this is the actual source of the tab-title bug above |

Four different surfaces, four different levels of seniority, and the *most senior and
most quantified* content (the CTO title, the 87% metric, the leadership bio) is the
hardest to find — it's a third of the way down the homepage, not in the hero, not in the
tab title, not on the resume headline. This isn't a content-writing problem, it's a
content-*placement* problem: the good material already exists.

### Real strengths — keep and amplify these, don't accidentally cut them in the ongoing simplification

- **The 99-project GitHub directory** on `/projects`, live-pulled and filterable/
  sortable/searchable, plus npm and Devpost tabs. Genuinely more sophisticated than what
  most portfolios do (usually a static hand-picked list of 4-6 projects).
- **Real published npm packages with live weekly-download counts** on `/activity` — an
  actual usage signal, not a claim.
- **A working Calendly booking link** directly in the contact flow — most portfolios
  make you fill out a form and wait; you let people just grab time.
- **The Career Journey timeline's one real metric** ("reduced open tickets by 87%") is
  exactly the kind of specific, artifact-tied number the research in Part 2 says is rare
  and valuable — you have proof this pattern works for you, you just need more of it.

### Note on work already in flight

As of this audit, a separate active session on this repo is mid-way through
progressively simplifying the homepage — the Technical Skills grid, the Skills
Proficiency radar chart (which the audit caught rendering suspiciously maxed-out
100%-everywhere scores), and the GitHub Contributions heatmap (caught displaying a
"STALE — 309 days" warning) have all been removed from the homepage, and there's an open
ask to wire the remaining GitHub Statistics Dashboard to real, always-fresh data instead
of anything stale/fake-looking. That work directly fixes two of the credibility problems
this audit independently found (inflated-looking skills chart, stale contribution
widget) — this document doesn't duplicate that effort, but the recommendations below
assume it lands, and Part 4 suggests what to do with the homepage space it frees up.

---

## Part 2 — What Strong Senior/Leadership Sites Actually Do

Nine real, currently-live sites were read directly for this: Josh Comeau, Lee Robinson,
Brittany Chiang, Kent C. Dodds, swyx, Julia Evans, Simon Willison, Cassidy Williams,
Tania Rascia (Guillermo Rauch's site rate-limited every fetch attempt — no data on it).
Will Larson's site (lethain.com) was separately researched as the closest real-world
match to CTO-level positioning specifically.

### Patterns that repeat across genuinely strong senior sites (near table-stakes)

1. **Writing/blog is the primary credibility engine, not a project gallery.** 8 of 9
   sites checked lead with essays/posts, not portfolio tiles. Your site currently leads
   with a hero image and buttons — the blog exists but isn't in the primary header nav
   (only the footer), and has just 3 posts, one of which is broken.
2. **A one-line personal mission/philosophy statement replaces a job-title headline.**
   Lee Robinson: *"My life's work is to make technology easy to understand and
   interesting to learn about."* This positions the person, not the résumé — closer to
   your footer bio's tone than your current hero.
3. **Owned IP as proof, not employer name-dropping**: courses (Comeau, Dodds), a
   published book (swyx), self-published technical comics (Evans), adopted open-source
   tools with real installs (Chiang's Halcyon Theme — "100k+ installs"; Evans' dnspeep/
   rbspy). Your npm packages and their live download counts already fit this pattern —
   they're just buried on `/activity` instead of being a headline credential.
4. **When metrics appear, they're specific and artifact-tied**, never vague
   years-of-experience claims — Dodds's exact blog-read counts, swyx's subscriber count,
   Chiang's install/star counts. Your 87% ticket-reduction number is exactly this genre —
   you need three or four more of these, not a redesign.
5. **Talks/speaking function as an alternate seniority signal** for people without
   flashy install/star numbers (swyx, Evans, Willison's podcast circuit).
6. **Personal, non-technical identity markers, deliberately included once technical
   credibility is already established** — Robinson's family/music, Dodds's onewheeling,
   Willison's wildlife photography, Rascia's chef background. Humanizing detail as
   *differentiation*, added on top of credibility, not a substitute for it.
7. **Minimal visual "portfolio" polish among the most established names.** Willison,
   Evans, and Robinson use plain, text-forward layouts. Heavy visual/animation
   investment correlates more with earlier-career or frontend-specialist positioning
   than with seniority itself — worth knowing before sinking more time into vaporwave
   visual polish instead of content.

### What's surprisingly rare — the real differentiators

1. **Quantified business-impact case studies** ("cut latency from 800ms to 120ms," "$X
   saved") are the thing every portfolio-advice article insists on — and are almost
   entirely **absent** from real, famous senior engineers' actual sites. That's a real
   gap between advice-industry consensus and practice, which means doing 3-5 of these
   well would be a genuine differentiator, not table-stakes catch-up.
2. **Leading with a hard number on the homepage itself** — only 2 of 9 sites do this.
   Most established people let reputation/writing speak for itself.
3. **Visible leadership-track content — design docs, architecture-tradeoff writeups,
   "how I structured hiring," mentorship narratives — was not found live on any of the
   well-known IC-leaning sites checked.** This is the single biggest white space
   relevant to you specifically: your title is CTO, your site currently reads more like
   a senior-IC portfolio with a CTO line buried in a timeline, and nobody in this
   comparison set is doing leadership content well. Will Larson's site is the closest
   real model — literal essay titles like *"Sizing engineering teams,"* *"Your first 90
   days as CTO or VP Engineering,"* named case studies from real employers with the
   reasoning behind actual decisions, not abstract "leadership philosophy" copy.

---

## Part 3 — The Three-Audience Problem (needs a decision)

The live audit surfaced this directly: About/Resume/Career-timeline content pitches a
**leadership job search**; Services/Contact pitches **freelance client work** ("Let's
Build Something Amazing," "100% Client Satisfaction," budget/timeline intake fields);
and the blog/activity pages pitch **general technical credibility**. Nothing on the site
currently signals which audience is primary, and the three don't reinforce each other —
a recruiter landing on `/services` reads as "this person freelances on the side," a
prospective client landing on `/resume` reads as "this person is job-hunting, will they
bail on my project."

You don't have to drop any of the three, but you should pick a primary and make the
other two clearly secondary, because right now the homepage and hero — the highest-
traffic surface — reads generic precisely *because* it's trying not to alienate any of
the three. Recommendation, given you're an active CTO (not currently between jobs) and
the Services page has real pricing/booking infrastructure already built: **lead with
leadership/technical-credibility positioning on the homepage and About page (this is
also what wins regardless of which of the other two you're pursuing), and let
Services/Contact carry the consulting pitch explicitly as its own section** rather than
trying to make one hero statement serve all three. This matches what the competitor
research found — the strongest sites commit to a clear voice/positioning rather than
hedging.

---

## Part 4 — Prioritized Recommendations

### Tier 0 — Fix this week (trust, not strategy)

1. Fix the `www` subdomain TLS cert (DNS/CNAME config — verify GitHub Pages custom
   domain HTTPS enforcement is actually applied to both `vaporjawn.dev` and
   `www.vaporjawn.dev`, not just the apex).
2. Add a GitHub Pages SPA-fallback so deep links stop 404ing on direct load/refresh —
   this is a well-documented pattern (a `404.html` that redirects into `index.html` with
   the original path preserved via query string, restored client-side).
3. Fix or unpublish `/blog/building-modern-portfolio` (remove the dev-stub text, fix MDX
   rendering) and fix the 3 broken hero images.
4. Fix the Firebase env-var config so Sentry/GA/Hotjar/Firestore actually initialize in
   production — you currently have zero visibility into real traffic, and the contact
   form's backend write path is likely silently broken.
5. Fix the PWA icon 404s and the garbled `env-audit` project description.
6. Either fix or remove the dead Devpost integration (it CORS-fails on every page load
   right now, adding console noise and a failed network request for every visitor).

None of this needs a redesign or a strategy decision — it's cleanup, and it should
happen regardless of anything else in this document.

### Tier 1 — Unify positioning (once Tier 0 is done)

1. Rewrite the homepage hero to lead with the leadership/mission framing your footer bio
   already has, instead of "Software Developer & Digital Creative." You don't need a
   redesign — you need the sentence that's already strongest on the site (the footer
   bio) promoted to the first thing anyone reads.
2. Fix `homePage.tsx`'s hardcoded `<SEO title="Victor Williams | Software Engineer">` to
   match — this is the direct cause of the browser-tab-title regression the audit found,
   a one-line fix with an outsized visibility payoff (it's what shows in every browser
   tab and every search result).
3. Update the `/resume` headline to match (currently "Senior Full Stack Software
   Engineer," no CTO mention) — and remove the plaintext phone number from that public
   page while you're in there.
4. Move Blog into the primary header nav (it's currently footer-only) — per Part 2, this
   is supposed to be your primary credibility engine, and it's currently the hardest
   page to find.

### Tier 2 — Activate what you already built (fast, high-leverage)

1. **Wire up the testimonials.** You have real testimonial data sitting in
   `src/data/testimonials.json` and a built `TestimonialsCarousel` component — currently
   unused, zero import sites anywhere in the app. Per the testimonials research: don't
   just drop the carousel onto the homepage as a generic block — split it. Put
   recruiter/peer-facing testimonials near the About/Experience narrative; put any
   client-facing testimonials on the Services page and attach them directly next to the
   specific project they're about, not floating in an isolated section. (Also: if
   reviving `TestimonialsCarousel`, its `autoPlay` mode currently calls `setTimeout`
   directly in the render body instead of inside a `useEffect` — worth a quick fix while
   touching that file.)
3. Add a Person `schema.org` structured-data check (you may already have one — verify
   it's current) and Article schema on blog posts — directly relevant to ever ranking
   for "[your name] CTO" or "hire [your name]" searches, per the SEO research.

### Tier 3 — The biggest opportunity: case-study depth (this is the real differentiator)

Per Part 2, this is simultaneously the thing every portfolio-advice article recommends
*and* the thing almost no real senior site actually has — meaning it's a genuine
white-space opportunity, not catch-up busywork.

1. **Pick 3-5 projects from the 99-project directory** (not all 99 — the undifferentiated
   dump is itself a finding from the audit) and give each a real problem → approach →
   outcome writeup, with at least one specific number each, following the pattern of
   your one existing good metric (87% ticket reduction). "Cut X from Yms to Zms," "grew
   from A to B users," "reduced Firestore reads by X%" — whatever's true and specific.
   Everything else stays in the searchable/filterable directory as-is; that's fine as a
   secondary "see everything I've built" surface.
2. **Write 2-4 leadership essays**, matching the Will Larson model directly: "How I
   structured engineering hiring at Kids Care Finder," "How I decided [build-vs-buy
   decision] as CTO," "My framework for engineering roadmap tradeoffs," "What changed
   about how I lead once I became CTO." Named company, specific decision, real reasoning
   — not abstract "leadership philosophy" copy. This is the content category that
   directly justifies the CTO title and that literally no one in the researched
   comparison set does well — it's your clearest differentiation opportunity.
3. Once GitHubStatsChart is wired to real data (already in flight elsewhere), consider
   using the homepage space freed up by the Skills/Contributions section removals for
   one of the above instead of leaving it empty — a "Recent thinking" or "How I work"
   teaser linking to the new leadership essays would fit naturally right where the old
   Skills section used to be.

### Tier 4 — Consulting/Services page

Per the pricing research, published pricing is genuinely contested — but you're already
in the defensible middle ground (tiers with a starting point, not one flat public rate),
so no change needed there structurally. What to add:
1. A real case study or two on the Services page specifically (client-facing, separate
   from the leadership essays above), following the same problem/approach/measured-
   outcome structure.
2. Consider a single, clear CTA instead of competing ones — right now Services → Contact
   offers email, LinkedIn, Calendly, *and* a multi-field form (budget/timeline/project
   type). Per the conversion research, one primary path (your Calendly link, which is
   already frictionless) outperforms several competing options.

### Tier 5 — AI positioning: an honest recommendation

Skip building a demo AI/RAG/agent project as a portfolio piece — per the research, that
reads as junior-level "familiar with ChatGPT" signaling at your seniority, not a
credibility boost. If you want to address AI at all (optional, not required), do it as
one more leadership essay in the Tier 3 category: how you evaluated AI coding tools for
your team, what guardrails you set, measured impact on velocity or hiring — an
organizational-strategy angle, not a code sample.

### Tier 6 — Don't do

- Don't chase more visual/animation polish as the next investment. Per Part 2, the most
  established comparison sites are notably *plainer*, not flashier, than yours already
  is — your differentiation gap is content depth and positioning clarity, not visual
  design.
- Don't try to make one homepage hero serve all three audiences (job search / consulting
  / general credibility) — per Part 3, pick a primary and let the others be clearly
  secondary rather than hedging into genericness.

---

## Appendix — Sources

Competitor sites read directly (August 2026): joshwcomeau.com, leerob.com,
brittanychiang.com, kentcdodds.com, swyx.io, jvns.ca, simonwillison.net, cassidoo.co,
taniarascia.com, lethain.com (leadership-model reference). rauchg.com could not be
fetched (rate-limited on every attempt).

Research sources cited: [Consulting Success — best consulting websites](https://www.consultingsuccess.com/best-consulting-websites),
[Jason Liu — pricing strategy for consultants](https://jxnl.co/writing/2024/09/17/pricing-strategy-for-consultants/),
[AmazingCTO — CTO personal brand](https://www.amazingcto.com/personal-branding-cto-job-market/),
[Fueler — adding testimonials to a portfolio](https://fueler.io/blog/how-to-add-testimonials-to-your-portfolio),
[Makerkit — SEO for developers 2026](https://makerkit.dev/blog/saas/seo-for-developers),
[sitebuilderreport.com — software engineer portfolio inspiration](https://www.sitebuilderreport.com/inspiration/software-engineer-portfolios).
