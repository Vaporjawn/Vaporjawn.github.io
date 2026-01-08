// Centralized brand color definitions for social / contact icons.
// light = default for light theme; dark = default for dark theme
// Optional hover* overrides allow brand-compliant or accessible contrast adjustments.
// Fallback: if hover not supplied we derive by lightening/darkening in component logic.

export type SocialBrandKey =
  | "github"
  | "gitlab"
  | "linkedin"
  | "x"
  | "twitter"
  | "bluesky"
  | "email"
  | "resume"
  | "npm"
  | "devpost"
  | "buymeacoffee"
  | "reddit"
  | "threads";

export interface BrandColorSpec {
  light: string;
  dark: string;
  hoverLight?: string;
  hoverDark?: string;
  // Whether we should keep original asset colors (for raster / svg logos) and not tint parent
  preserveAsset?: boolean;
}

export const brandColors: Record<SocialBrandKey, BrandColorSpec> = {
  github: {
    light: "#181717",
    dark: "#ffffff",
  },
  gitlab: {
    light: "#e24329",
    dark: "#fc6d26",
  },
  linkedin: {
    light: "#0A66C2",
    dark: "#0A66C2",
  },
  x: {
    light: "#000000",
    dark: "#ffffff",
  },
  twitter: {
    light: "#1DA1F2",
    dark: "#1DA1F2",
  },
  bluesky: {
    light: "#0a7aff",
    dark: "#0a7aff",
    preserveAsset: true,
  },
  email: {
    light: "#444444",
    dark: "#ffffff",
  },
  resume: {
    light: "#5E35B1", // using theme violet-like accent (approx)
    dark: "#B39DDB",
  },
  npm: {
    light: "#CB3837",
    dark: "#CB3837",
    preserveAsset: true,
  },
  devpost: {
    light: "#003E54",
    dark: "#00A7C0",
    preserveAsset: true,
  },
  buymeacoffee: {
    light: "#FFDD00",
    dark: "#FFDD00",
    preserveAsset: true,
  },
  reddit: {
    light: "#FF4500",
    dark: "#FF4500",
  },
  threads: {
    light: "#000000",
    dark: "#FFFFFF",
  },
};

export function getBrandColor(
  key: SocialBrandKey,
  mode: "light" | "dark",
  hover = false
): string | undefined {
  const spec = brandColors[key];
  if (!spec) return undefined;
  if (hover) {
    if (mode === "light" && spec.hoverLight) return spec.hoverLight;
    if (mode === "dark" && spec.hoverDark) return spec.hoverDark;
  }
  return mode === "dark" ? spec.dark : spec.light;
}
