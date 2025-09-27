# Social Brand Color Strategy

## Overview
A centralized brand color system was introduced to ensure consistent, accurate rendering of social/media icons across the application (e.g., Footer and SocialMedia components). This eliminates drift between components and removes hardcoded, duplicated color logic.

## Source of Truth
- File: `src/data/socialBrandColors.ts`
- Exports:
  - `brandColors`: Record of brand color specs keyed by `SocialBrandKey`.
  - `getBrandColor(key, mode, hover?)`: Returns the correct color for the brand based on the current theme (`light` or `dark`) and whether the hover state is requested.
  - `SocialBrandKey`: Union type ensuring compile-time safety when referencing brand keys.

## Data Shape
```ts
export interface BrandColorSpec {
  light: string;      // base color in light mode
  dark: string;       // base color in dark mode
  hoverLight?: string; // optional hover override in light mode
  hoverDark?: string;  // optional hover override in dark mode
  preserveAsset?: boolean; // if true, raster/SVG asset keeps its native colors
}
```

## Preserve Asset Logic
Some logos (e.g., npm, Bluesky, Devpost, BuyMeACoffee) are imported images or SVGs containing multi-color branding. For these, we avoid applying a `color` style or parent tint. This is handled via `preserveAsset: true` in the spec.

## Integration Points
- `Footer` component now computes `brandBase` and `brandHover` using `getBrandColor` + theme mode.
- `SocialMedia` component (home page and elsewhere) was refactored to use the same helper.

## Theming & Accessibility
- Theme mode (`light` | `dark`) is derived from `theme.palette.mode`.
- If future accessibility adjustments are required (e.g., contrast enforcement), they can be layered by adding `hoverLight`/`hoverDark` overrides or adjusting values in one place.

## Adding a New Platform
1. Add the link entry to `src/data/socialLinks.ts`.
2. Add a corresponding `brandColors` entry in `socialBrandColors.ts` with `light` and `dark` values.
3. If the platform uses an imported multi-color asset, set `preserveAsset: true` and ensure the image lives under `src/assets/logos/`.
4. (Optional) Provide `hoverLight` / `hoverDark` if the default base color is not ideal for hover states.
5. If the icon is vector-based (MUI or FontAwesome), its color will be driven automatically by the helper.

## Rationale
- Single source of truth: prevents inconsistent styling between footer and other sections.
- Strong typing: adding a new key without updating the union will surface a TypeScript error if referenced incorrectly.
- Maintainability: Faster iteration for future branding changes or dark mode adjustments.

## Future Enhancements (Optional)
- Extract a shared `<SocialIcon key=... label=... />` component to encapsulate `renderIcon` logic reused by Footer & SocialMedia.
- Add automated contrast tests or lint rules for color accessibility.
- Introduce motion preference handling (reduced motion) for hover elevation/translation.

## Related Files
- `src/components/footer/footer.tsx`
- `src/components/socials/socialMedia.tsx`
- `src/data/socialLinks.ts`
- `src/data/socialBrandColors.ts`

## Last Updated
- Date: (auto) Replace with current date when modifying.
