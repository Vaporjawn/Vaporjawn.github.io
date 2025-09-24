// Unified social links data source
// This single source of truth is consumed by both the SocialMedia component (home/contact pages)
// and the Footer to guarantee consistency and eliminate divergence.

export type SocialLinkKind = "external" | "internal" | "email";

export interface UnifiedSocialLink {
  key: string; // stable identifier (kebab / lowercase)
  label: string; // Accessible label / title
  href: string; // Full URL or path or mailto:
  kind: SocialLinkKind;
  primary?: boolean; // Optional prominence flag
}

// Order defines visual order
export const socialLinks: UnifiedSocialLink[] = [
  {
    key: "github",
    label: "GitHub",
    href: "https://github.com/vaporjawn",
    kind: "external",
    primary: true,
  },
  {
    key: "gitlab",
    label: "GitLab",
    href: "https://gitlab.com/vaporjawn",
    kind: "external",
  },
  {
    key: "email",
    label: "Email",
    href: "mailto:victor.williams.dev@gmail.com",
    kind: "email",
  },
  {
    key: "resume",
    label: "Resume",
    href: "/resume",
    kind: "internal",
  },
  {
    key: "linkedin",
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/victorwilliams719/",
    kind: "external",
    primary: true,
  },
  {
    key: "x",
    label: "Twitter / X",
    href: "https://twitter.com/vaporjawn",
    kind: "external",
  },
  {
    key: "reddit",
    label: "Reddit",
    href: "https://www.reddit.com/user/vaporjawn/",
    kind: "external",
  },
  {
    key: "threads",
    label: "Threads",
    href: "https://www.threads.net/@vaporjawn",
    kind: "external",
  },
  {
    key: "npm",
    label: "npm",
    href: "https://www.npmjs.com/~vaporjawn",
    kind: "external",
  },
  {
    key: "devpost",
    label: "Devpost",
    href: "https://devpost.com/Vaporjawn?ref_content=user-portfolio&ref_feature=portfolio&ref_medium=global-nav",
    kind: "external",
  },
  {
    key: "buymeacoffee",
    label: "Buy Me a Coffee",
    href: "https://buymeacoffee.com/vaporjawn",
    kind: "external",
  },
];
