# Victor Williams - Personal Website

[![Installation](https://github.com/Vaporjawn/Vaporjawn.github.io/actions/workflows/install.js.yml/badge.svg)](https://github.com/Vaporjawn/Vaporjawn.github.io/actions/workflows/install.js.yml) [![Build](https://github.com/Vaporjawn/Vaporjawn.github.io/actions/workflows/build.js.yml/badge.svg)](https://github.com/Vaporjawn/Vaporjawn.github.io/actions/workflows/build.js.yml) [![Linting](https://github.com/Vaporjawn/Vaporjawn.github.io/actions/workflows/lint.js.yml/badge.svg)](https://github.com/Vaporjawn/Vaporjawn.github.io/actions/workflows/lint.js.yml) [![Tests](https://github.com/Vaporjawn/Vaporjawn.github.io/actions/workflows/tests.js.yml/badge.svg)](https://github.com/Vaporjawn/Vaporjawn.github.io/actions/workflows/tests.js.yml) [![Security Scan](https://github.com/Vaporjawn/Vaporjawn.github.io/actions/workflows/securityScan.yml/badge.svg)](https://github.com/Vaporjawn/Vaporjawn.github.io/actions/workflows/securityScan.yml)

[![GitHub repo forks](https://img.shields.io/github/forks/Vaporjawn/Vaporjawn.github.io?style=flat&logo=github&logoColor=whitesmoke&label=Forks)](https://github.com/Vaporjawn/Vaporjawn.github.io/network) [![GitHub repo stars](https://img.shields.io/github/stars/Vaporjawn/Vaporjawn.github.io?style=flat&logo=github&logoColor=whitesmoke&label=Stars)](https://github.com/Vaporjawn/Vaporjawn.github.io/stargazers) [![GitHub repo contributors](https://img.shields.io/github/contributors-anon/Vaporjawn/Vaporjawn.github.io?style=flat&logo=github&logoColor=whitesmoke&label=Contributors)](https://github.com/Vaporjawn/Vaporjawn.github.io/graphs/contributors) [![GitHub org sponsors](https://img.shields.io/github/sponsors/Vaporjawn?style=flat&logo=github&logoColor=whitesmoke&label=Sponsors)](https://github.com/sponsors/Vaporjawn) [![GitHub repo watchers](https://img.shields.io/github/watchers/Vaporjawn/Vaporjawn.github.io?style=flat&logo=github&logoColor=whitesmoke&label=Watchers)](https://github.com/Vaporjawn/Vaporjawn.github.io/watchers) [![GitHub repo size](https://img.shields.io/github/repo-size/Vaporjawn/Vaporjawn.github.io?style=flat&logo=github&logoColor=whitesmoke&label=Repo%20Size)](https://github.com/Vaporjawn/Vaporjawn.github.io/archive/refs/heads/main.zip)

I am a 27-year-old Temple University graduate and a seasoned Senior Full Stack Software Engineer with a wealth of technical prowess. I possess strong analytical skills, a proven track record in orchestrating and leading engineering teams, and extensive hands-on experience in team management.

🌐 **Live Website**: [www.vaporjawn.dev](https://www.vaporjawn.dev)

## 🚀 Tech Stack

- **Frontend**: React 18, TypeScript, Material-UI (MUI)
- **Build Tool**: Vite
- **Styling**: CSS3, Material-UI Theme System
- **Icons**: FontAwesome, Material Icons
- **Routing**: React Router v6
- **CI/CD**: GitHub Actions
- **Deployment**: GitHub Pages
- **Testing**: Jest
- **Code Quality**: ESLint, Prettier

## 🛠️ Development

### Prerequisites

- Node.js (v18+ recommended)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/Vaporjawn/Vaporjawn.github.io.git

# Navigate to the project directory
cd Vaporjawn.github.io

# Install dependencies
npm install
```

### `npm test`

Launches Jest test runner.\
Run `npm run test:watch` for interactive watch mode.\
Run `npm run test:cov` for coverage reports.

### `npm run lint`

Runs ESLint to check for code quality and style issues.\
Automatically fixes issues where possible.

### `npm run format`

Runs Prettier to format code consistently.

### `npm run deploy`

Deploy your React application to GitHub Pages.\
This builds the app and deploys it to the `gh-pages` branch.

### `npm run check`

Runs the full quality check pipeline: build, format, lint, and test with coverage.

## Development Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/Vaporjawn/Vaporjawn.github.io.git
   cd Vaporjawn.github.io
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm start
   ```

4. **Run tests**
   ```bash
   npm test
   ```

## Tech Stack

- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **UI Libraries**: Material-UI (MUI), FontAwesome
- **Routing**: React Router DOM
- **Testing**: Jest + React Testing Library
- **Linting**: ESLint + Prettier
- **Deployment**: GitHub Pages

### Available Scripts

#### `npm start`

Runs the app in development mode with hot reload.
Open [http://localhost:5173](http://localhost:5173) to view it in your browser.

The page will automatically reload when you make changes.
Lint errors will be displayed in the console.

#### `npm run build`

Builds the app for production to the `dist` folder.
The build is optimized for best performance with minified files and hashed filenames.

#### `npm run preview`

Locally preview the production build to test before deployment.

#### `npm test`

Launches the test runner.
Run `npm run test:watch` for interactive watch mode.
Run `npm run test:cov` for coverage reports.

#### `npm run lint`

Runs ESLint to check for code quality issues and automatically fixes what it can.
The build will fail if there are linting errors.

#### `npm run fetch:contribs`

Fetches GitHub contribution data and updates the portfolio.
This updates the contribution visualization data.

#### `npm run verify-sign`

Verifies GPG commit signature configuration for secure contributions.

#### `npm run deploy`

Builds and deploys the application to GitHub Pages.
Only maintainers with push access can deploy.

## Development Setup

### Prerequisites

- Node.js 18 or higher
- npm or yarn package manager
- Git with GPG signing configured (recommended)

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/Vaporjawn/Vaporjawn.github.io.git
   cd Vaporjawn.github.io
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment**
   ```bash
   # Copy environment template (if exists)
   cp .env.example .env.local
   ```

4. **Start development server**
   ```bash
   npm start
   ```

5. **Run tests**
   ```bash
   npm test
   ```

### Code Quality

- **Linting**: ESLint with TypeScript support
- **Formatting**: Prettier with automatic formatting
- **Testing**: Jest + React Testing Library
- **Type Safety**: Strict TypeScript configuration

## Resources

- [Vite Documentation](https://vitejs.dev/)
- [React Documentation](https://reactjs.org/)
- [TypeScript Documentation](https://www.typescriptlang.org/)
- [Material-UI Documentation](https://mui.com/)

#### `npm run format`

Formats all TypeScript, JavaScript, and markdown files using Prettier.

#### `npm run check`

Runs the complete quality check pipeline: build + format + lint + test with coverage.

#### `npm run deploy`

Deploys the production build to GitHub Pages.
The site will be available at the configured custom domain.

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── header/         # Navigation header with dark mode toggle
│   ├── footer/         # Site footer
│   └── socials/        # Social media links
├── pages/              # Page components
│   ├── home/           # Homepage
│   ├── projects/       # Projects showcase with filtering
│   └── resume/         # Resume viewer with download
├── routes/             # Route definitions
├── assets/             # Static assets (images, PDFs)
├── colors.ts           # Theme color constants
└── main.tsx           # Application entry point
```

## ✨ Features

- **🌙 Dark/Light Mode**: Seamless theme switching with system preference detection
- **📱 Responsive Design**: Mobile-first approach with Material-UI breakpoints
- **⚡ Fast Loading**: Optimized with Vite's fast HMR and build system
- **🧪 Type Safety**: Full TypeScript implementation
- **🔍 SEO Optimized**: Proper meta tags and semantic HTML
- **♿ Accessibility**: WCAG compliant components and keyboard navigation
- **🔄 CI/CD Pipeline**: Automated testing, linting, and deployment
- **📊 GitHub Contributions Heatmap**: Daily automated JSON materialization via GitHub Action (secure, no client secrets) with progressive fallback chain
- **📦 Automated NPM Packages Listing**: Live, zero‑maintenance list of published npm packages (maintainer feed + selective download enrichment, cached with intelligent revalidation)

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
VITE_APP_TITLE=Victor Williams
VITE_APP_DESCRIPTION=Senior Full Stack Software Engineer
```

### GitHub Contributions Heatmap Setup (One‑Time)
The contributions calendar is generated **offline** by a scheduled workflow that writes `public/data/contributions.json`.

1. Create a fine‑grained (or classic) PAT with minimal scopes (`read:user` is sufficient for public contribution data).
2. Add it as a repository secret named `CONTRIB_GRAPHQL_TOKEN` (Settings → Secrets and variables → Actions → New repository secret).
3. Manually run the workflow: Actions → "Update Contributions Calendar" → Run workflow.
4. After success, a commit like `chore(contrib): update contributions.json [skip ci]` appears.
5. Hard refresh the site; the heatmap renders from JSON. Until first run a placeholder + guidance panel is shown.

Fallback order inside the UI component:
```
JSON heatmap → external SVG (ghchart.rshah.org) → local static PNG (/contributions-dark.png or /contributions-light.png) → error message
```
Detailed documentation: [docs/contributions.md](./docs/contributions.md)

### 📦 Automated NPM Packages Section

The **Projects** page includes a dynamic, zero‑maintenance NPM Packages section that automatically lists all public packages published under the `vaporjawn` npm maintainer account.

#### Data Sources
- `GET https://registry.npmjs.org/-/v1/search?text=maintainer:vaporjawn&size=250` (primary package metadata)
- `GET https://api.npmjs.org/downloads/point/last-week/:pkg` (enrichment – only for the first 10 packages to limit request fan‑out)

#### Caching Strategy
- Client‑side `localStorage` record: `{ timestamp, packages[] }`
- **TTL**: 12 hours (43200000 ms)
- **Fresh Read**: If cache exists and TTL valid → synchronous render from cache (fast paint)
- **Stale-While-Revalidate**: If stale → return cached data immediately (if any) while background fetch refreshes silently
- **Manual Refresh**: “Refresh NPM packages” button bypasses cache & forces network (always updates timestamp)
- **Error Resilience**: On network failure with stale cache → continue showing last known data; with no cache → user sees error state

#### Enrichment Policy
To avoid unnecessary API traffic, weekly download counts are only fetched for the first 10 packages (sorted by recency). Additional packages still display name, version, description, and keywords.

#### Sorting
- Primary: `date` (published / modified recency as provided by search index)
- Secondary (tie break): package name (alphabetical)

#### Accessibility & UX
- Expand / collapse control with accurate `aria-expanded` + descriptive label ("Hide NPM packages list" / "Show NPM packages list")
- Live status region (`aria-live="polite"`) announces: loading → error → empty → count summary (e.g. “Showing 7 packages”)
- Keyboard focus order preserved; no focus traps introduced
- Semantic grouping under heading `h2` for screen reader navigation

#### Performance Considerations
- Bounded enrichment (max 10 download requests)
- No enrichment until base list resolves (prevents waterfall during initial paint)
- Local cache eliminates repeated maintainer search within TTL window
- Background revalidation keeps UI responsive while data updates

#### Hook Contract (`useNpmPackages`)
Returns:
```ts
{
	packages: Array<{
		name: string;
		version: string;
		description: string;
		keywords: string[];
		npmUrl: string;
		weeklyDownloads?: number; // only for enriched subset
	}>;
	loading: boolean;      // true only during first (non‑cached) or forced fetch
	error: string | null;  // network / parse issues when no viable cached data
	refresh: () => void;   // bypass cache, force new network round
}
```

#### Testing Coverage
- Hook tests validate: initial fetch, fresh vs stale cache, forced refresh, enrichment cap (≤10), error handling fallbacks
- Component tests validate: loading, empty, error, populated list, refresh invocation, aria-live state transitions

#### Future Enhancements (see below for expanded list)
- Idle-time enrichment for remaining packages
- Server pre-render (SSR / static re-hydration) with build‑time snapshot
- Pagination / virtualized list for very large maintainer portfolios
- Offline-first with `navigator.onLine` awareness

No additional configuration is required—feature activates automatically on build & deploy.

### Custom Domain

The site is configured to deploy to `www.vaporjawn.dev` via the `CNAME` file.

## 🧪 Testing

The project uses Jest for unit testing. Test files are located alongside components with `.test.tsx` extension.

```bash
# Run tests once
npm test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:cov
```

## 📦 Deployment

The site automatically deploys to GitHub Pages on every push to the main branch using GitHub Actions.

Manual deployment:
```bash
npm run deploy
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### 🔏 Commit Signing Policy

All new commits to `main` and contributions via Pull Request are expected to be **cryptographically signed** (SSH signing preferred; GPG supported). Unsigned commits will surface without the green "Verified" badge in GitHub.

Quick check (most recent commit):
```bash
npm run verify-sign
```

Full setup and troubleshooting guide: see [docs/guides/commit-signing-setup.md](./docs/guides/commit-signing-setup.md).

> Tip: Enable "Require signed commits" in repo branch protection once all local environments are configured.

## � Documentation

Comprehensive technical documentation, implementation guides, and project resources are organized in the [docs/](./docs/) directory. For a complete index with categorized documentation, see [docs/README.md](./docs/README.md).

### Quick Links
- **Setup Guides**: [docs/guides/](./docs/guides/) - Configuration and setup instructions
- **Implementation Summaries**: [docs/implementation/](./docs/implementation/) - Feature development and session reports
- **Bug Fixes**: [docs/bug-fixes/](./docs/bug-fixes/) - Technical problem resolutions
- **Testing**: [docs/testing/](./docs/testing/) - Test coverage and strategies
- **Planning**: [docs/planning/](./docs/planning/) - Project roadmaps and improvement plans
- **Features**: [docs/features/](./docs/features/) - Feature-specific documentation
- **Profile**: [docs/profile/](./docs/profile/) - Skills and project portfolio

## �📄 License

This project is open source and available under the [MIT License](LICENSE).

## 📞 Contact

- **Website**: [www.vaporjawn.dev](https://www.vaporjawn.dev)
- **Email**: [victor.williams.dev@gmail.com](mailto:victor.williams.dev@gmail.com)
- **LinkedIn**: [victorwilliams719](https://www.linkedin.com/in/victorwilliams719/)
- **GitHub**: [@Vaporjawn](https://github.com/Vaporjawn)
- **Devpost**: [Vaporjawn](https://devpost.com/Vaporjawn?ref_content=user-portfolio&ref_feature=portfolio&ref_medium=global-nav)
- **Twitter**: [@vaporjawn](https://twitter.com/vaporjawn)
