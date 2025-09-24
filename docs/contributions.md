# GitHub Contributions Heatmap

## Overview
The site renders a **12‑month GitHub contribution heatmap** for `vaporjawn` using an *offline‑materialized JSON file* generated daily (and on demand) by a GitHub Action. This replaces a previously unreliable direct third‑party SVG fetch and ensures:

- Deterministic, cache‑friendly static hosting (GitHub Pages)
- No exposure of personal access tokens client‑side
- Progressive enhancement with graceful fallbacks

Primary components / artifacts:
| Item | Path | Purpose |
|------|------|---------|
| Fetch script | `scripts/fetch-contribs.mjs` | Queries GitHub GraphQL API for last ~365 days of calendar data and writes JSON |
| Workflow | `.github/workflows/contribs.yml` | Schedules (daily cron) + manual dispatch to run fetch script & commit updated JSON |
| Data file | `public/data/contributions.json` | Static asset consumed by the heatmap component |
| Heatmap component | `src/components/contribs/ContribHeatmap.tsx` | Renders accessible SVG grid from JSON |
| Wrapper / fallback UI | `src/components/github/GitHubContributions.tsx` | Orchestrates JSON load, guidance, and legacy fallbacks |

## Data Flow
1. **Schedule / Manual Trigger** → GitHub Action executes.
2. **Script** calls GitHub GraphQL `contributionsCollection.contributionCalendar` for `login=vaporjawn` with date window `[now-364d, now]`.
3. **JSON written** to `public/data/contributions.json` (pretty printed) and committed *iff* contents changed.
4. **GitHub Pages deploy (or existing static hosting)** now serves the updated JSON; client fetches it with `cache: "no-store"`.
5. **React heatmap** parses & renders cells → accessible SVG.

## Placeholder Detection (First Deploy Safety)
Until the first successful workflow run, a seeded placeholder file ships (single 1970‑01‑01 day, totalContributions=0). The heatmap treats this as **error / not ready** and surfaces an instructional panel instead of showing an empty (misleading) calendar. Signature logic:
```
totalContributions === 0
weeks.length === 1
weeks[0].contributionDays.length === 1
weeks[0].contributionDays[0].date === "1970-01-01"
```

If that signature matches, `onError` fires → wrapper displays setup guidance + enables legacy fallback chain.

## Setup Instructions (One‑Time)
1. **Create a fine‑grained PAT** (or classic) with minimum scopes:
	- Required: `read:user` (public data is enough). *No* repo write scope is needed because the Action uses the repository `GITHUB_TOKEN` permission `contents: write` to commit.
	- (Optional) If using fine‑grained token, allow read access to public repositories.
2. **Add Repository Secret**: `Settings → Secrets and variables → Actions → New repository secret`:
	- Name: `CONTRIB_GRAPHQL_TOKEN`
	- Value: (your PAT)
3. **Manual Run**: Go to **Actions → Update Contributions Calendar → Run workflow** (accept defaults).
4. **Check Logs**: Ensure the `Fetch contributions JSON` and `Commit & push if changed` steps succeeded.
5. **Verify Commit**: A commit like `chore(contrib): update contributions.json [skip ci]` should appear on `main`.
6. **Hard Refresh Site**: (Shift+Reload) to bypass any stale caches; heatmap should populate.

## Fallback Chain
Order of rendering attempts inside `GitHubContributions`:
1. **JSON Heatmap (preferred)** → `<ContribHeatmap/>`
2. **External SVG** `https://ghchart.rshah.org/<primaryHex>/<username>` (legacy, opportunistic)
3. **Local Static Images** (optional):
	- Dark: `public/contributions-dark.png`
	- Light: `public/contributions-light.png`
4. **Error Message** instructing you to add static screenshots if desired.

## Adding Optional Static Screenshots
Place optimized PNG or WebP images in `public/` using the exact filenames above. They’ll be auto‑served by Vite/Pages without code changes.

**Recommended Specs**
- Width: 900–1000px (scales down responsively)
- Compression: `oxipng -o 4` or `pngquant --quality=70-85`

## Theming & Color Strategy
Currently we keep the API‑provided green gradient (GitHub canonical) to preserve user familiarity and accessible contrast. Future custom mapping could remap GitHub colors → theme primary spectrum via `resolveColor()` in `ContribHeatmap.tsx`.

To customize per theme mode:
```ts
// inside GitHubContributions.tsx effect
const colorForMode = theme.palette.mode === 'dark' ? primary : primary; // replace second primary with alt hex
```

## Customization Points
| Goal | Location | Notes |
|------|----------|-------|
| Change username | `GITHUB_LOGIN` env / `USERNAME` const | Keep script + UI in sync |
| Limit days rendered | `maxDays` prop on `<ContribHeatmap/>` | Default 400 (slice) |
| Cell size / spacing | `cellSize`, `cellGap` props | Affects SVG width/height |
| Color remap | `resolveColor()` | Map GitHub palette → theme scale |
| Placeholder signature | Detection block in `ContribHeatmap.tsx` | Adjust if seed changes |
| Legend buckets | `computeLegend()` | Currently first 5 unique colors |
| Primary gradient title | Typography in wrapper | Gradient text styling |

## Accessibility
| Aspect | Implementation |
|--------|----------------|
| Live region during load | Skeleton container uses `role="status"` / `aria-busy` |
| Per-cell description | `<title>` element inside each `<rect>` (screen reader hover text) |
| Chart label | Outer SVG `aria-label` + `<title>` |
| Color legend text | Uses visible caption “Less/More” flanking swatches |

## Troubleshooting
| Symptom | Likely Cause | Action |
|---------|--------------|-------|
| Instructional panel + fallback skeleton shown | Placeholder still present | Add secret & run workflow manually |
| Panel persists after run | Workflow failed or commit not produced | Open Action run → check logs for GraphQL error / missing scopes |
| JSON loads but counts seem low | Natural lull in activity | Verify date window in script if necessary |
| External SVG missing after JSON success | Normal (we hide fallbacks on success) | No action needed |
| Images attempt but 404 | Static PNGs not added or misnamed | Use exact filenames specified |

## Optional Enhancements (Roadmap)
1. **Streak & Longest Streak Calculation** – summary line above heatmap.
2. **Month Labels** – add top row with abbreviated month transitions.
3. **Interactive Tooltip / Popover** – show contribution count + day name on hover/focus.
4. **Keyboard Navigation** – make each rect focusable with arrow key grid movement.
5. **Gradient Mapping to Theme** – dynamically map GitHub greens → site primary scale for brand coherence.
6. **Stale Data Badge** – if JSON older than 36h show subtle warning icon.
7. **Progressive Loading ETag** – conditional fetch using `If-None-Match` to reduce bandwidth.

## Security Notes
- The PAT secret is **never** exposed to the client; only the Action runtime sees it.
- Commits are performed with the ephemeral `GITHUB_TOKEN` (scoped to `contents: write`).
- No dynamic client credentials; site remains fully static.

## Verification Checklist (First Run)
```
[ ] Secret CONTRIB_GRAPHQL_TOKEN added
[ ] Workflow dispatched manually
[ ] Action run succeeded (green) & commit created
[ ] contributions.json contains many weeks (not placeholder)
[ ] Site hard-refreshed & heatmap visible
```

---
**Last Updated:** (maintain when changing logic)

## 8. Caching Considerations
The external SVG may be cached by the browser; to force refresh you could append a query parameter (e.g. `?t=${Date.now()}`) — not enabled by default to avoid unnecessary requests.

## 9. Light/Dark Capture Strategy (If Using Static Images)
If providing local images, capture both a light and dark variant to keep contrast optimal. Ensure transparent or matching backgrounds.

---
**Quick Checklist:**
- [ ] Dynamic chart loads in network tab.
- [ ] Skeleton appears briefly (fast connections may skip).
- [ ] Local fallback images present (optional) and used if network blocked.
- [ ] Error message appears if both dynamic & fallback unavailable.
- [ ] Alt text reads correctly for screen readers.

---
If you extend functionality (e.g., fetch raw contribution data via GitHub GraphQL API to render a custom heatmap), document the new data pipeline here.
