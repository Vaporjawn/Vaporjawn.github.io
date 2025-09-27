// Jest asset type declarations
declare module "*.svg" {
  const content: string;
  export default content;
}

declare module "*.png" {
  const content: string;
  export default content;
}

declare module "*.jpg" {
  const content: string;
  export default content;
}

declare module "*.jpeg" {
  const content: string;
  export default content;
}

declare module "*.gif" {
  const content: string;
  export default content;
}

declare module "*.pdf" {
  const content: string;
  export default content;
}

declare module "*.mp4" {
  const content: string;
  export default content;
}

// Specific asset imports
declare module "../../assets/logos/Bluesky_Logo.svg" {
  const content: string;
  export default content;
}

declare module "../../assets/logos/Npm-logo.svg.png" {
  const content: string;
  export default content;
}

declare module "../../assets/logos/devpost_logo_icon_169280.svg" {
  const content: string;
  export default content;
}

// Additional explicit logo declarations that were still triggering TS2307 in test compile
declare module "../../assets/logos/devpost_logo_icon_169279.svg" {
  const content: string;
  export default content;
}

declare module "../../assets/logos/buymeacoffee_logo.svg" {
  const content: string;
  export default content;
}

// Explicit declarations for assets with spaces / direct imports used in HomePage tests
declare module "../../assets/*" {
  const content: string;
  export default content;
}

// Recursive wildcard for any deeper asset path usage
declare module "../../assets/**/*" {
  const content: string;
  export default content;
}

// Explicit single-file declarations to ensure resolution where wildcard may fail under ts-jest ESM
declare module "../../assets/profile-picture.jpeg" {
  const content: string;
  export default content;
}

declare module "../../assets/banner.jpg" {
  const content: string;
  export default content;
}
