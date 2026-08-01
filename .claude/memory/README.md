# Claude's Memory Folder — vaporjawn.github.io

This folder is Claude-facing operational memory for this repo, distinct from
`../../docs/` (human-facing project documentation) and `../../CLAUDE.md` (the loaded
per-session summary). Read order when picking up work here:

1. **`../../CLAUDE.md`** — loaded automatically every session. Fast facts and hard
   conventions. Start here.
2. **This folder** (`.claude/memory/`) — read `repo-map.md` and `gotchas-and-todos.md`
   for anything CLAUDE.md doesn't cover in enough depth, and check `session-log.md` for
   what happened recently that isn't reflected in committed docs yet.
3. **`../../docs/ARCHITECTURE.md`** — the exhaustive, code-verified deep reference.
   Read a specific section when you need real depth on one subsystem, not the whole
   thing every time.
4. **`../../docs/README.md`** — index of the older feature-by-feature historical docs
   (implementation summaries, bug fixes, planning roadmaps). Useful for "why does this
   exist" archaeology, less useful as a current-state reference.

## Files in this folder

- **`repo-map.md`** — condensed, scannable structural index (routes, pages, components,
  hooks/contexts/utils, backend) — the "index card" version of `docs/ARCHITECTURE.md`.
- **`gotchas-and-todos.md`** — hard rules to never violate, dead code inventory, and
  known discrepancies between docs and actual code. Check this before assuming
  something works the way older docs describe it.
- **`session-log.md`** — append-only, dated log of notable work/decisions in this repo.
  **Add an entry here at the end of any substantive session** (new feature, refactor,
  bug fix with a non-obvious root cause, dependency/tooling change) so the next session
  has continuity that plain source-reading won't reconstruct (the *why*, not just the
  *what*). Keep entries terse — a few lines, not a essay. Newest entries at the top.

## How this folder came to exist

Created 2026-08-01 in response to a direct request to build an in-depth, persistent
memory system for this repo. The three source documents (`repo-map.md`,
`gotchas-and-todos.md`, and `docs/ARCHITECTURE.md`) were built by reading the actual
source tree with 5 parallel research passes (pages/routing, shared components, hooks/
contexts/utils/backend, build/CI tooling, testing/e2e/misc) rather than trusting the
pre-existing `docs/` folder or `CLAUDE.md`, which had already drifted from the real
code in several places (see `gotchas-and-todos.md` §Discrepancies).

**Maintenance expectation**: this is not a write-once artifact. `session-log.md` should
grow over time; `repo-map.md` and `gotchas-and-todos.md` should be corrected whenever a
session discovers they're wrong, the same way `docs/ARCHITECTURE.md` should be — stale
memory is worse than no memory because it's trusted by default.
