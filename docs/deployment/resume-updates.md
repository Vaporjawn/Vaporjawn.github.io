# Updating and publishing the resume

Updated: 2026-10-26. Site: <https://vaporjawn.dev/resume>.

## Source and content

The master PDF is `Vaporjawn/Professional/Resumes/Resume.pdf` in the parent GitHub
workspace. The website publishes an unchanged copy at `src/assets/Resume.pdf`.
The October 20, 2026 master has two pages and includes Claude Code, Codex, and
GitHub Copilot in the Morgan Lewis skills, updated contact links, and revised
wording for several roles. Its SHA-256 is:

```text
f775e5e25bd3e1c18a155cfe42fc54b72edb65647f376948da35f604f7e90a9e
```

`src/pages/resume/resumePage.tsx` imports this PDF through Vite, which gives the
published asset a content-hashed filename. The iframe, download action, and
open-in-new-tab action share that asset. The download remains named
`Victor_Williams_Resume.pdf`.

The homepage career timeline reads `src/data/portfolio.json`. Keep the relevant
experience's technology list aligned with the PDF; this update adds the same
three AI tools to Morgan Lewis and synchronizes the Philadelphia/New York location.
The existing professional summary and employment dates already match the PDF.

## Change justification

| Change                                                               | Reason                                                                                                        | Verification                                                                                                 |
| -------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| Replace `src/assets/Resume.pdf`                                      | The old website asset predates the current master.                                                            | Master, committed asset, built asset, and downloaded PDF must have identical bytes.                          |
| Update `src/data/portfolio.json`                                     | The website career entry lacks the newly added AI tools.                                                      | Headless browser test checks all three labels; the old build fails this assertion.                           |
| Use Node 24 and `npm ci` in `deploy-pages.yml`                       | Recent deployments crash in npm 10.8.2's dependency resolver after deleting the lockfile.                     | Clean Node 24.22.1/npm 11.19.1 install succeeds using the unchanged committed lockfile.                      |
| Refresh the service worker cache and precache only HTML entry points | Cached HTML can retain an old PDF URL; precaching SPA deep links rejects worker installation on GitHub Pages. | Regression test simulates deep-link 404s, requires installation to succeed, and verifies old-cache eviction. |
| Include the previously requested About/header layout repair          | Publish the pending centered, responsive About screen with this release.                                      | Existing 28 headless About tests cover 320–2560px and both themes.                                           |

## Deployment failure and repair

GitHub Actions run `40251018615` failed before the build with
`Cannot read properties of null (reading 'edgesOut')`. The workflow used Node
20.20.2/npm 10.8.2, deleted `package-lock.json`, and ran `npm install`, forcing a
fresh dependency-graph resolution on every release. The observed error matches
an [npm resolver issue](https://github.com/npm/cli/issues/9787); this does not prove
that every report of that error has the same cause.

The production workflow now uses supported Node 24 and
[`npm ci`](https://docs.npmjs.com/cli/commands/npm-ci/) against the committed lockfile.
The exact clean-install path was verified locally with Node 24.22.1/npm 11.19.1.
No dependency versions or lockfile contents were changed for this repair.

GitHub Pages returns HTTP 404 for `/about` and `/resume` before `404.html` redirects
to the SPA entry point. `cache.addAll` rejects non-success responses, so listing
those routes in the worker's install precache prevents activation. The worker now
precaches `/` and `/index.html`, changes the cache from `vaporjawn-v2` to
`vaporjawn-v3`, and evicts the old cache on activation. Successful same-origin
resources continue to be cached when requested. Preserve this distinction when
adding routes; do not reintroduce deep SPA URLs into the install precache.

## Verification and publishing

Use an isolated checkout for a release when the main workspace contains unrelated
draft blog posts or assets: Vite includes matching untracked content in a build.
Copy only reviewed release paths. Do not publish private professional notes or
unrelated drafts with the resume.

```sh
npm ci
npm run build
npm run lint
npm run test:cov
npx playwright test e2e/resume.spec.ts e2e/about.spec.ts --workers=2
```

Run the release commands with Node 24. The browser specs explicitly use headless
mode. The five resume tests check four widths (320, 390, 768, 1440px), HTTP PDF
content type, iframe asset URL, downloaded filename and bytes, control bounds, and
the AI-tool labels on the homepage. Together with About, 33 browser tests pass.
Unit coverage runs pass with 254 tests and five existing skips; the new worker
test fails on the previous worker and passes after the fix. Repository-wide
coverage remains 43.64% statements, 35.53% branches, 39.69% functions, and 44.98% lines.
These results do not claim complete coverage or every browser/device combination.

Coverage reports are generated output; keep them outside the checkout or remove
them before running lint again because the existing ESLint configuration also scans
generated `coverage/*.js`. Lint passes with the existing `src/main.tsx` Fast Refresh
warning. The full `npm run check` reaches its formatting stage and fails on 112
existing source files. Direct app typechecking stops on the existing missing
`eslint__js` type definition and invalid `ignoreDeprecations` setting. These are
not passing gates; they were left outside this focused publication. See also
[the About repair note](../bug-fixes/about-responsive-centering.md).

Production publication is `.github/workflows/deploy-pages.yml` on a push to `main`
or a manual workflow dispatch. It uploads `dist` to GitHub Pages. The legacy
`npm run deploy` command is not this release path. After the workflow succeeds,
verify the live `/resume` page, download and compare the served PDF against the
master, check the three AI-tool labels, and confirm the new worker can activate.

For a rollback, revert the reviewed release commit and publish through the same
workflow. Bump the worker cache again so returning clients receive the rollback.

Related: [documentation index](../README.md),
[About layout regression](../bug-fixes/about-responsive-centering.md).
