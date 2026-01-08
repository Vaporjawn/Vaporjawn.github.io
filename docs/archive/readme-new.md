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

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
VITE_APP_TITLE=Victor Williams
VITE_APP_DESCRIPTION=Senior Full Stack Software Engineer
```

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

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 📞 Contact

- **Website**: [www.vaporjawn.dev](https://www.vaporjawn.dev)
- **Email**: [victor.williams.dev@gmail.com](mailto:victor.williams.dev@gmail.com)
- **LinkedIn**: [victorwilliams719](https://www.linkedin.com/in/victorwilliams719/)
- **GitHub**: [@Vaporjawn](https://github.com/Vaporjawn)
- **Twitter**: [@vaporjawn](https://twitter.com/vaporjawn)
