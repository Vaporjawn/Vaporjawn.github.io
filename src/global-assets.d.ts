// Global fallback asset module declarations to aid ts-jest ESM resolution
// (Some wildcard patterns in separate files were not being picked up reliably.)
declare module "*.jpg" { const src: string; export default src; }
declare module "*.jpeg" { const src: string; export default src; }
declare module "*.png" { const src: string; export default src; }
declare module "*.svg" { const src: string; export default src; }
declare module "*.gif" { const src: string; export default src; }
declare module "*.pdf" { const src: string; export default src; }
declare module "*.mp4" { const src: string; export default src; }
