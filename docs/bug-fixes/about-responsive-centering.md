# About page centering and responsive layout

Updated: 2026-10-26. Project aliases: **Vaporjawn.github.io**, **vaporjawn.dev**.
The production route is <https://vaporjawn.dev/about>. For publication and live
verification, see [the resume release](../deployment/resume-updates.md).

## Root cause and evidence

The About page placed a fractional-width Grid item inside a wider Grid container
and relied on the deprecated `justifyContent` system prop to center it. On the
published page at 1920 × 1080, the container measured 976px wide with computed
`justify-content: normal`. Its 650.65625px item began at x=472, putting the card
**162.671875px left of the viewport center**. The outer flex wrapper centered the
container, but could not center the item inside it.

The local installation uses MUI 7.3.11 even though `package.json` declares
`@mui/material: ^9.2.0`. Consequently, the local desktop baseline honored the prop
and did not reproduce the published offset. MUI documents the removal of Grid
system props in its [v9 migration guide](https://mui.com/material-ui/migration/upgrade-to-v9/#system-props).
That change explains the observed behavior; the exact deployed package version
was not independently identified.

Mobile had a separate reproducible sizing problem: at 320px wide, the local
baseline card measured 392.328px wide and began at x=-36.156px. Large heading text,
padding, and intrinsic sizing prevented it from shrinking. Global horizontal
overflow suppression hid the excess rather than making the content fit.

The shared header also clipped its theme control at 1440px and placed the phone
menu button partly outside the viewport. Its desktop layout activated before all
controls fit. In a short landscape drawer, the absolutely positioned theme toggle
could overlap the navigation.

## Changes and justification

| File                                             | Change                                                                                                                             | Why it is required                                                                                       |
| ------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| `src/pages/about/aboutPage.tsx`                  | Replace the nested Grid with one bounded, full-width column; responsive outer spacing and contact controls.                        | Center independently of deprecated Grid props, keep phone gutters, and make contact targets fit.         |
| `src/pages/about/components/AboutBioSection.tsx` | Full-width shrinking card, smaller phone padding, fluid heading size, and long-word wrapping.                                      | Prevent the verified 320px overflow while preserving the biography and visual theme.                     |
| `src/components/header/header.tsx`               | Drawer below 1280px, compact desktop navigation below 1536px, phone gutters, and a scrollable drawer with keyboard-operable items. | Keep the screen's navigation and theme controls visible and usable across the tested widths and heights. |
| `e2e/about.spec.ts`                              | Headless geometry, control-size, contact, keyboard, and drawer regressions.                                                        | Detect a left-shifted card, clipped text/buttons, or inaccessible navigation in future changes.          |

Documentation is linked from [the documentation index](../README.md) and recorded
in [the repository session log](../../.claude/memory/session-log.md) for continuity.
These supporting files account for the change exceeding three files; no dependency,
biography, route, authentication, or data-fetching changes were needed.

## Responsive contract

- The column uses the theme's `md` container maximum (768px), producing a 720px
  content width with desktop gutters. On phones, it fills the available width
  inside 16px gutters.
- The title scales between 1.75rem and 3rem. Long unbroken names wrap within the
  card. Small screens scroll naturally rather than squeezing the full biography
  into the viewport height.
- About-page contact controls and header controls have at least 44 × 44px targets.
  The drawer's theme toggle follows the links in normal flow and remains reachable
  by scrolling on short landscape screens.

## Verification

All browser work ran **headlessly in the background** against a production build;
no visible browser windows or native app automation were used.

The 28 Chromium tests cover 12 viewport sizes in both light and dark themes,
plus a long heading/skip-link keyboard scenario and three drawer interaction
scenarios. Widths are 320, 390, 768, 844, 1024, 1279, 1280, 1440, 1535, 1536,
1920, and 2560px, including 844 × 390 landscape. The original 320px build fails
the new gutter assertion, providing regression evidence.

All 28 tests passed on both the existing MUI 7 installation and an isolated
production build using MUI 9.2.0 with icons 9.3.1, matching the versions declared
by the repository. The isolated packages and output were kept under `/tmp`;
repository dependency files and installed packages were not changed.

Measured final card center offset: **0px in all 24 size/theme combinations**.
No document overflow, clipped controls, or targets below 44px were found in the
header and About content. At 320px, the card is x=16 and width=288px; at 1920px,
it is x=600 and width=720px. Screenshots were reviewed at 390px and 1440px in both
themes. Axe scans at those widths found **zero serious/critical violations**;
two existing moderate heading-order findings remain in the shared contact subtitle
and footer's Quick Links heading. This is not a claim of complete accessibility
conformance or testing every browser/device.

Reproduce from the repository root:

```sh
npm run build
npx playwright test e2e/about.spec.ts --project=chromium --workers=2
NODE_OPTIONS=--no-experimental-webstorage npm run test:cov
npm run lint
```

The Playwright spec explicitly requests headless mode. Build before testing;
the standard Playwright configuration serves `dist` through Vite preview.

Additional checks: production build passed; 253 unit tests passed with five
existing skips; coverage completed (43.64% statements, 35.53% branches, 39.69%
functions, 44.98% lines repository-wide); lint passed with one existing warning
in `src/main.tsx`. Node 26's experimental Web Storage caused unrelated homepage
tests to fail until disabled with the environment setting above.

Repository-wide limitations: `npm run check` stops at 113 existing source files
failing Prettier. Direct app type checking stops on missing `eslint__js` types and
the existing `ignoreDeprecations: "6.0"` setting. Overriding those configuration
issues exposes existing source/test typing errors, with none in the three edited
production files. These checks were not silently treated as passing, and unrelated
formatting, typing, and dependency reconciliation were left outside this repair.
