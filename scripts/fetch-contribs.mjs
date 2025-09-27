#!/usr/bin/env node
import fs from 'node:fs/promises';

// Optional dotenv load for local development (ignored in CI if not installed)
try {
  const { config } = await import('dotenv');
  config();
} catch (e) {
  // silently ignore if dotenv not installed
}

// Token resolution order (avoid defining custom secrets beginning with GITHUB_ in GitHub settings)
// 1. CONTRIB_GRAPHQL_TOKEN (recommended GitHub Actions / repo secret name)
// 2. CONTRIB_TOKEN (optional alternate)
// 3. GITHUB_TOKEN (fallback for local dev only; do NOT create a user secret named GITHUB_TOKEN)
const token = process.env.CONTRIB_GRAPHQL_TOKEN || process.env.CONTRIB_TOKEN || process.env.GITHUB_TOKEN;
if (!token) {
  console.error('[ERROR] Missing contribution fetch token. Provide one of:');
  console.error('  - CONTRIB_GRAPHQL_TOKEN  (preferred)');
  console.error('  - CONTRIB_TOKEN          (alternate)');
  console.error('  - GITHUB_TOKEN           (local dev fallback only; do NOT name a repo secret with GITHUB_)');
  console.error('\nCreate a fine‑grained PAT (read:user) for public contributions, then:');
  console.error('  echo "CONTRIB_GRAPHQL_TOKEN=ghp_xxx" > .env');
  process.exit(1);
}
const login = process.env.GITHUB_LOGIN || 'vaporjawn';
const to = new Date();
const from = new Date(to);
from.setUTCDate(to.getUTCDate() - 364);

const GQL = `
  query($login: String!, $from: DateTime!, $to: DateTime!) {
    user(login: $login) {
      contributionsCollection(from: $from, to: $to) {
        contributionCalendar {
          totalContributions
          weeks { contributionDays { date weekday contributionCount color } }
        }
      }
    }
  }
`;

async function run() {
  const r = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `bearer ${token}`,
      'User-Agent': 'contrib-cron'
    },
    body: JSON.stringify({
      query: GQL,
      variables: { login, from: from.toISOString(), to: to.toISOString() }
    })
  });

  if (!r.ok) {
    const body = await r.text();
    if (r.status === 401) {
      console.error('\n[ERROR] 401 Bad credentials from GitHub GraphQL API.');
      console.error('Token likely invalid, expired, revoked, or missing required minimal scopes.');
      console.error('Troubleshooting steps:');
      console.error('  1. Revoke any leaked token and create a new Personal Access Token.');
      console.error('  2. For public contribution calendar: fine‑grained token with "read:user" (and public_repo if needed).');
      console.error('  3. Export it locally: echo "CONTRIB_GRAPHQL_TOKEN=XXXX" > .env');
      console.error('  4. Re-run: npm run fetch:contribs:local');
      console.error('Raw response body ->');
      console.error(body.slice(0, 300));
    } else {
      console.error('GitHub API error', r.status, body.slice(0, 500));
    }
    process.exit(1);
  }

  const json = await r.json();
  const cal = json?.data?.user?.contributionsCollection?.contributionCalendar;
  if (!cal) {
    console.error('[ERROR] No calendar data in response.');
    if (json?.errors) {
      console.error('GraphQL errors:', JSON.stringify(json.errors, null, 2));
    }
    console.error('Verify the login exists and the token has not been restricted.');
    process.exit(1);
  }

  await fs.mkdir('public/data', { recursive: true });
  // Augment with lightweight metadata for client display & cache validation
  const enriched = {
    schemaVersion: 1,
    fetchedAt: new Date().toISOString(),
    login,
    range: { from: from.toISOString(), to: to.toISOString() },
    ...cal
  };

  await fs.writeFile('public/data/contributions.json', JSON.stringify(enriched, null, 2));
  console.log('Wrote public/data/contributions.json for', login, 'total days weeks:', cal.weeks?.length ?? 0);
}

run().catch(e => {
  console.error(e);
  process.exit(1);
});
