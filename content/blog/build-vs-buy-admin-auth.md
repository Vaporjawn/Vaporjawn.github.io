---
title: "Build vs. Buy: Why My Admin Panel Doesn't Use Firebase Auth"
description: "A real, small architectural decision — and the honest tradeoff that came with it — walked through in full: SHA-256 over Firebase Authentication for a low-stakes admin panel."
date: "2026-08-01"
author: "Victor Williams"
tags: ["Engineering Leadership", "Architecture", "Security", "Firebase", "Build vs Buy"]
readTime: 6
published: true
---

This site has an admin panel behind a login screen. It's used for exactly one thing: editing draft blog posts before they go live. And its authentication is deliberately, almost aggressively simple — a SHA-256 password hash, a `sessionStorage` flag, and a one-hour timer. No Firebase Authentication. No OAuth. No password reset flow. No role-based access control.

That's not an oversight. Firebase Authentication is already a dependency of this project — it's used for Firestore and Analytics elsewhere in the same codebase. Wiring it up for the admin login would have taken maybe an hour. I chose not to, and I want to walk through why, because "build vs. buy" decisions are usually described in the abstract, and I think they're more useful looked at close up, with the actual reasoning and the actual tradeoff left in.

## What the login is actually protecting

The honest answer is: not much. The admin panel lets me create and edit blog post drafts before publishing. There's no customer data behind it, no payment information, no PII. If someone bypassed it entirely, the worst case is they could read or edit unpublished blog drafts on my personal portfolio site.

That single fact drives the whole decision. Security engineering isn't about maximizing protection — it's about matching the protection to what's actually at risk. A password reset flow, session refresh tokens, and RBAC are the right call when you're protecting a multi-tenant SaaS product with real user data. They're overkill for a solo blog editor, and overkill has a cost: more surface area to maintain, more dependencies to keep patched, more places for a bug to hide.

## What I actually built instead

The implementation is small enough to describe completely:

- `src/utils/passwordHash.ts` hashes the password with `crypto.subtle.digest("SHA-256", ...)` — no salt, no key stretching (no bcrypt/argon2).
- `src/contexts/AdminAuthProvider.tsx` compares the hash against a value read from an environment variable (`VITE_ADMIN_PASSWORD_HASH`), writes `{ authenticated: true, expiresAt }` to `sessionStorage`, and runs a one-second interval that counts down and force-logs-out at `SESSION_DURATION_MS = 60 * 60 * 1000` — one hour, hardcoded.
- The comparison itself is a plain `===` on two hash strings — not constant-time. In a system where the threat model included a sophisticated attacker with network-level timing access, that would be a real bug. Here, it isn't, because there's nothing worth that level of attack.

I generate the hash locally with a small script (`scripts/generate-admin-hash.mjs`) and set it as a build-time environment variable. There's no server component at all — the whole check happens in the browser.

## The tradeoff I'm naming on purpose

Here's the part that's easy to leave out of a "why I made this choice" essay, and I think leaving it out is exactly what makes those essays useless: this design has a real, known gap, and it's already written down in the codebase.

The Firestore security rules for this site's analytics collections (`analytics_pageViews`, `analytics_events`, `analytics_sessions`) allow public reads — `allow read: if true`. Anyone who knows the collection names can read that data directly through the Firestore SDK, bypassing the admin login entirely, because the login only gates the *dashboard UI*, not the *data*. The rules file says so explicitly, in a comment I wrote when I set them up:

> Note: For production, implement Firebase Auth and role-based access control to restrict reads to authenticated admin users only.

I could fix that today by wiring up Firebase Authentication and rewriting the rules to check `request.auth != null`. I haven't, for the same reason I didn't build it that way to begin with — the data behind those reads is anonymous page-view and click analytics about my own portfolio site, not anything sensitive. If that ever changes — if this pattern gets reused somewhere with real user data — the lightweight version stops being the right call, and I'd need to actually do the Firebase Auth + RBAC work I skipped here.

## The actual framework

Reduced to one sentence: **build the smallest thing that correctly matches the actual value of what you're protecting, and write down the exact point at which that stops being true.**

The mistake I see most often — in my own past decisions as much as anyone else's — isn't picking the wrong tool for a given risk level. It's not being honest about *which* risk level you're actually in, in either direction: over-engineering an internal admin tool like it's a bank vault, or under-engineering something that quietly grew real stakes without anyone re-evaluating the original tradeoff. The fix for both is the same habit: write the tradeoff down where the next person — or the next version of you — will actually see it, not just in a commit message nobody reads again.
