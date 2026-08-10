/**
 * Normalizes known-stale hostnames on Victor Williams' personal project links
 * to the host that actually serves the content today.
 *
 * GitHub Pages applies an account's custom domain to every project site under
 * that account, not just the user/organization page itself - so an individual
 * project repo (e.g. "snapple-facts") is really served at
 * `vaporjawn.dev/snapple-facts/`, even though some repos still have their
 * GitHub "homepage" field set to the older `vaporjawn.github.io/<repo>/`
 * form. Separately, `www.vaporjawn.dev` currently has a TLS certificate that
 * does not cover the `www` subdomain, while the bare `vaporjawn.dev` apex
 * (what GitHub itself redirects to) works fine.
 *
 * This rewrites those known-bad hosts to `vaporjawn.dev` and upgrades to
 * https. Any URL on an unrelated host (npm homepages, Vercel/Surge
 * deployments, the Chrome Web Store, etc.) is returned unchanged.
 */
export function normalizeSiteUrl(url?: string | null): string | undefined {
  if (!url) return undefined;

  let parsed: URL;
  try {
    parsed = new URL(url);
  } catch {
    // Not a parseable absolute URL - return as-is rather than guessing.
    return url;
  }

  const host = parsed.hostname.toLowerCase();
  const isLegacyGithubPagesHost = host === "vaporjawn.github.io";
  const isBrokenWwwHost = host === "www.vaporjawn.dev";
  const isPlainDevHost = host === "vaporjawn.dev";

  if (!isLegacyGithubPagesHost && !isBrokenWwwHost && !isPlainDevHost) {
    return url;
  }

  parsed.protocol = "https:";
  if (isLegacyGithubPagesHost || isBrokenWwwHost) {
    parsed.hostname = "vaporjawn.dev";
  }

  return parsed.toString();
}

export default normalizeSiteUrl;
