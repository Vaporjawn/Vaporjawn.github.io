declare module "*.pdf" {
  const src: string;
  export default src;
}

declare module "*.jpg" {
  const src: string;
  export default src;
}

// Explicit logo filename declarations (ensure TS resolution in tests/build)
declare module "../assets/logos/Npm-logo.svg.png" {
  const content: string;
  export default content;
}
declare module "../assets/logos/devpost_logo_icon_169279.svg" {
  const content: string;
  export default content;
}
declare module "../assets/logos/buymeacoffee_logo.svg" {
  const content: string;
  export default content;
}

declare module "*.jpeg" {
  const src: string;
  export default src;
}

declare module "*.png" {
  const src: string;
  export default src;
}

declare module "*.gif" {
  const src: string;
  export default src;
}

declare module "*.svg" {
  const src: string;
  export default src;
}

declare module "*.mp4" {
  const src: string;
  export default src;
}
