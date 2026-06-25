# CLAUDE.md — Architecture Context for vaporjawn.github.io

Portfolio site for Victor Williams (@Vaporjawn). React 19 + TypeScript + Vite 7, deployed to GitHub Pages at https://www.vaporjawn.dev.

---

## Essential Commands

```bash
npm run lint          # ESLint (max-warnings 4 — keep it below 4)
npx tsc --noEmit      # TypeScript strict mode — must be zero errors
npm test -- --run     # Vitest (one-shot, no watch) — 253+ tests
npm run build         # Production build → dist/
npm start             # Dev server on :5173
npm run typecheck     # Alias for tsc --noEmit
npm run format        # Prettier auto-fix
```

---

## Project Structure

```
src/
  assets/              # Static images (JPEG originals + .webp counterparts)
  backend/             # Firebase initializer (firebase.ts)
  components/          # Shared, reusable components
    OptimizedImage/    # Lazy-load wrapper with <picture>/WebP support
    SEO/               # react-helmet-async wrapper
    activity/          # GitHub contribution graphs
    charts/            # recharts-based radar chart (SkillsRadarChart)
    footer/
    header/
    socials/
  contexts/
    AdminAuthContext.tsx   # Context object + useAdminAuth hook ONLY (no component)
    AdminAuthProvider.tsx  # Provider component with session logic
    PortfolioContext.tsx   # GitHub API data context
  pages/
    home/              # Homepage with HeroSection, SkillsSection, ChartSection…
    admin/             # AdminDashboard + AdminLogin (protected route)
    blog/              # BlogListPage, BlogPostPage
    about/ contact/ projects/ resume/ services/
    AnalyticsDashboard/
  hooks/               # Custom React hooks (useIntersectionObserver, useNpmPackages…)
  utils/               # Pure helpers (analytics, passwordHash, pwa, sentry…)
  router.tsx           # React Router v6 route tree + lazy-loaded pages
  main.tsx             # App entry: QueryClient, HelmetProvider, BrowserRouter
```

---

## Key Conventions

### React Fast Refresh (react-refresh/only-export-components)
Each `.tsx` file must export **only React components**. Do not co-export context objects, hooks, utility functions, or plain values from a component file. If a file exports both a component and a non-component, Fast Refresh breaks.

- **Context pattern**: context object + hook in `*Context.tsx`, provider component in `*Provider.tsx`.
- **Utility pattern**: helpers that are not components live in `src/utils/` or alongside the file they belong to, never re-exported from a component file.

### MUI Grid v2 (not v1)
This project uses MUI v7 where Grid v2 is the default.

```tsx
// ✅ Correct — Grid v2
<Grid size={{ xs: 12, md: 6 }}>
<Grid size={12}>

// ❌ Wrong — Grid v1 (removed in MUI v7)
<Grid item xs={12} md={6}>
```

Never use the `item` prop or bare breakpoint props (`xs`, `sm`, `md`…) on `<Grid>`.

### OptimizedImage — WebP / `<picture>` support
Pass both `src` (JPEG fallback) and `srcWebP` (`.webp`) for best performance:

```tsx
import profileImage    from "../assets/profile-picture.jpeg";
import profileImageWebP from "../assets/profile-picture.webp";

<OptimizedImage
  src={profileImage}
  srcWebP={profileImageWebP}
  alt="…"
  priority
/>
```

When `srcWebP` is provided, the component wraps the `<img>` in a `<picture>` element with a WebP `<source>` so browsers choose the smaller file automatically.

### React hooks — module-scope components
Never define a React component inside another component's render function. Components that call hooks (e.g. `useTheme`) must be declared at module scope:

```tsx
// ✅ Correct — module scope
const CustomTooltip: React.FC<Props> = ({ active, payload }) => {
  const theme = useTheme();
  …
};

export const ParentChart: React.FC = () => {
  return <Tooltip content={<CustomTooltip />} />;
};

// ❌ Wrong — inner component violates react-hooks/exhaustive-deps and react-refresh
export const ParentChart: React.FC = () => {
  const CustomTooltip = () => { const theme = useTheme(); … };
  return <Tooltip content={<CustomTooltip />} />;
};
```

### TypeScript
- **Strict mode** is enabled (`tsconfig.json`). All `any` types must be justified.
- Use `import type { … }` for type-only imports to satisfy `@typescript-eslint/consistent-type-imports`.
- Asset imports (`.jpeg`, `.webp`, `.jpg`, `.svg`) require `// @ts-ignore` at the import site when used in component files — type declarations live in `src/test-types.d.ts`.

### React Query
`QueryClient` is created once in `main.tsx`. Default options: `staleTime: 5 min`, `retry: 2`. Use `useQuery` / `useMutation` from `@tanstack/react-query` for any server state. `ReactQueryDevtools` is mounted next to the root (tree-shaken in production).

### Firebase
Initialised once in `main.tsx` via `initializeFirebase()`. All Firebase imports must be subpath imports (`firebase/auth`, `firebase/firestore`, etc.) so the `firebase-vendor` Rollup chunk captures them correctly.

---

## Chunk Splitting Strategy (`vite.config.ts`)

| Chunk | Contents | Reason |
|---|---|---|
| `react-vendor` | react, react-dom, react-router-dom | Changes rarely; long cache |
| `mui-vendor` | @mui/material, @mui/icons-material | Large, stable |
| `animation-vendor` | framer-motion | Medium-sized, stable |
| `charts-vendor` | recharts | Used only in admin + activity |
| `firebase-vendor` | firebase/* | Used only in admin, analytics, blog |

Chunks above 600 kB trigger a build warning (`chunkSizeWarningLimit: 600`).

---

## Testing

- **Framework**: Vitest + React Testing Library + jsdom
- **Setup**: `src/setupTests.ts` — mocks asset imports (`*.jpeg`, `*.webp`, `*.svg`…) and polyfills `IntersectionObserver`.
- **Asset mocks**: for specific asset paths used in tests, add `vi.mock("…/assets/foo.webp", () => ({ default: "mock.webp" }))` at the top of the test file **before** any imports that trigger that module.
- **Target**: ≥85% unit coverage, ≥70% integration.
- Run: `npm test -- --run` (one-shot) or `npm run test:watch`.

---

## Deployment

Deploys to GitHub Pages via `npm run deploy` (gh-pages). Custom domain: `vaporjawn.dev` (set in `public/CNAME`).

Cache and redirect rules live in `public/_headers` and `public/_redirects`.

---

## Security Notes

- All `VITE_` prefixed environment variables are embedded in the client bundle — treat them as public.
- Admin authentication is handled locally via `AdminAuthContext` / `AdminAuthProvider` (password hash in `src/utils/passwordHash.ts`). This is intentionally lightweight — it protects draft content, not sensitive data.
- **Never commit** `.env` files containing real credentials.
