## Social Links Unification Refactor

Date: 2025-09-24

### Objective
Ensure the social icons rendered in the Footer and the SocialMedia component (home/other pages) always stay in sync by moving to a single source of truth and removing duplicated hard‑coded JSX blocks.

### Changes Implemented
1. Created `src/data/socialLinks.ts` exporting an ordered array of link objects with fields:
   - `key` (stable identifier: github, gitlab, email, resume, linkedin, x, npm, bluesky, devpost, buymeacoffee)
   - `label` (accessible name / title)
   - `href` (destination URL or internal route or mailto)
   - `kind` (external | internal | email)
   - `primary` (boolean flag – currently not used in footer but kept for potential future filtering)
2. Refactored `SocialMedia` component to dynamically map over `socialLinks` instead of hand-written JSX icon list.
3. Refactored `Footer` to consume the same `socialLinks` list (initially filtered to primary only, later updated to show full list for parity after feedback).
4. Added additional icons/assets support (GitLab, BuyMeACoffee, Resume, X) and standardized accessibility attributes (`aria-label`, `title`).
5. Replaced deprecated / inconsistent Twitter usage with `key: "x"` (backward-compatible fallback preserved in switch).
6. Ensured internal links are routed through `RouterLink` while external/email links retain proper `target`/`rel` handling.

### Rationale
Previously the SocialMedia component and the Footer each had their own switch/conditional structures and partially overlapping sets of platforms. This divergence increased maintenance burden and caused missing platforms (e.g., GitLab, BuyMeACoffee) in some areas. A canonical data structure:
- Eliminates duplication.
- Simplifies adding/removing platforms.
- Improves accessibility consistency.
- Reduces likelihood of visual or functional drift.

### Testing & Validation
All existing Jest test suites pass (`npm test`). Current tests do not deeply assert the full link set; future enhancement could assert that each `key` in `socialLinks` renders in both components.

### Known / Potential Improvements
1. DRY Icon Mapping: `renderIcon` logic now exists in both SocialMedia and Footer; extract to `src/components/socials/socialIconMap.tsx` exporting a function `(key,label)=>ReactNode`.
2. Portfolio Context: `portfolio.json` still contains a legacy social section; consider generating it from `socialLinks` or removing it to avoid future confusion.
3. Twitter vs X Labeling: Optionally surface a user-friendly combined label (e.g., `X (Twitter)`) for clarity during transition.
4. Testing: Add snapshot or explicit presence tests enumerating every `socialLinks.map(l=>l.key)`.
5. Theming: Centralize icon size constants so both components remain visually aligned if design changes.
6. Accessibility: Add `aria-describedby` or visually hidden text if future analytics tracking requires richer context.

### Rollback Strategy
Reverting to previous behavior would entail restoring the old hardcoded blocks in `SocialMedia` and the old `getSocialIcon` switch in `Footer`. No schema migrations or persistent data changes were made.

### Ownership & Maintenance
New platforms should be added only in `socialLinks.ts`; both UI surfaces will automatically reflect the change. Update the shared icon mapping (once extracted) if a new platform requires a new asset or icon.

---
Maintainer: @vaporjawn
PR / Branch: V3
