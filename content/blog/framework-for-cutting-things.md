---
title: "My Framework for Cutting Things I Just Built"
description: "A real, blow-by-blow account of simplifying my own portfolio's homepage — and the rule that came out of it: real data or no data, never fake-but-impressive."
date: "2026-08-01"
author: "Victor Williams"
tags: ["Engineering Leadership", "Prioritization", "Product Thinking", "Case Study"]
readTime: 7
published: true
---

Most essays about prioritization frameworks are written after the fact, cleaned up, with the messy middle edited out. This one isn't. It's a real sequence of decisions I made on this portfolio site's homepage, in order, on the same day, and the framework at the end of it is the thing that was actually true across all of them — not something I reverse-engineered to sound tidy.

## The sequence, as it actually happened

The homepage originally had a "Technical Skills" grid, a "Technical Skills Proficiency" radar chart, a GitHub Contributions heatmap, a GitHub Statistics dashboard, a career timeline, and a call-to-action section. Here's what happened to the first three, in order:

1. **The Technical Skills grid got cut.** It was a straightforward category-grouped list of skill chips. It wasn't wrong, exactly — it just wasn't earning its place on the page relative to everything else competing for a visitor's attention in the first few seconds.
2. **The radar chart got cut next** — and this one had a real problem, not just a "does this deserve space" problem: it was rendering hard-coded placeholder data. Every axis maxed out near 100%, for every skill, for everyone who ever looked at it. It had never actually been wired to real data. I replaced it with a smaller, chip-based "Skills Summary" embedded in the career timeline instead of a standalone chart.
3. **Then I cut that too.** Once it was decoupled from the "this is fake" problem, I looked at it again and the honest answer was: it still wasn't adding enough to justify its own space, even in the smaller form. Net result: zero skills-proficiency UI remains anywhere on the homepage.
4. **The GitHub Contributions heatmap got cut.** It had exactly one place it was used. Once that section was gone, the entire supporting code — two component directories, a data-fetching hook, a fallback chain for when the primary data source failed — was dead weight. I deleted it outright rather than leaving it "just in case."

That's three consecutive rounds of building or half-building something, then removing it, on the same page, in the same session. If you only looked at the final commit, you'd see a simpler homepage. If you looked at the full history, you'd see a lot of apparently wasted motion. I don't think it was wasted — I think that's what the process of finding the right cut actually looks like when you don't hide the intermediate steps.

## The harder version of the same instinct

The remaining chart — a "GitHub Statistics Dashboard" showing stars, forks, repos, and a commit/PR history — looked fine. It had specific numbers, a line chart, a pie chart. It looked like exactly the kind of "impressive metrics" content most portfolio advice tells you to include.

It was also completely fake. Every number was a hard-coded mock default — 1,250 stars, 320 forks, 45 repos, a 127-day streak — because the component had simply never been connected to any real data source. Nobody had lied about this on purpose; it had just shipped in a half-finished state and nobody had gone back to check.

Fixing it turned out to have two layers. Stars, forks, repo count, and language breakdown could be made genuinely live using an existing GitHub API hook already in the codebase — that was a clean fix. But two of the metrics — a "day streak" counter and a six-month activity chart — couldn't be made honest that way. The pipeline that would have fed real data for those was investigated and found to be actively broken (a GitHub Actions workflow silently failing every scheduled run against a protected branch), and the public API alternative only exposes about six days of real event history — nowhere near enough to back a six-month chart.

The tempting move here is obvious: leave the mock numbers for just those two metrics, since "at least most of it is real now." I didn't. I cut the day streak and the six-month chart entirely, shipped only what could be verified as real, and wrote down the exact reason the other two pieces are missing rather than papering over it with a plausible-looking number. Real numbers at the time of writing: 32 stars, 23 forks, 98 repositories, with a real language breakdown behind them.

## The actual rule

Cutting the skills sections was about attention — does this deserve the space it's taking. Cutting the fake metrics was about integrity — a number that isn't true doesn't get to stay just because it looks good. Different reasons, same underlying bias: **when in doubt, the default is removal, not addition, and "looks impressive" is never a substitute for "is true."**

The version of this that's easy to say and hard to actually do is resisting the urge to backfill a missing piece with something plausible instead of admitting it's missing. A visibly incomplete dashboard that's telling the truth is worth more than a complete-looking one that isn't — even though the second one is, by a wide margin, more comfortable to ship.
