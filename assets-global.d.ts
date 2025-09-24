// Root-level catch-all asset module declarations to ensure ts-jest picks them up.
declare module "*.svg" { const src: string; export default src; }
declare module "*.png" { const src: string; export default src; }
declare module "*.jpg" { const src: string; export default src; }
declare module "*.jpeg" { const src: string; export default src; }
declare module "*.gif" { const src: string; export default src; }
declare module "*.pdf" { const src: string; export default src; }
declare module "*.mp4" { const src: string; export default src; }
