# Dependabot Setup Guide

## Overview
Dependabot is now configured to automatically update dependencies in this project. This guide explains how it works and how to manage automated updates.

## Configuration File
Location: `.github/dependabot.yml`

## Features Enabled

### 1. **NPM Dependency Updates**
- **Schedule**: Weekly on Mondays at 9:00 AM EST
- **Grouped Updates**: Related dependencies are grouped together to reduce PR volume
- **PR Limit**: Maximum 10 open PRs to avoid overwhelming the repository

### 2. **Dependency Groups**

#### React Group
Updates all React-related packages together:
- `react`, `react-dom`
- `@types/react`, `@types/react-dom`

#### Material-UI Group
Updates MUI and Emotion packages together:
- `@mui/*` packages
- `@emotion/*` packages

#### Testing Group
Updates testing libraries together:
- `jest`, `@testing-library/*`
- `vitest`, `@types/jest`

#### Build Tools Group
Updates development tools together:
- `vite`, `@vitejs/*`
- `typescript`, `eslint`, `prettier`

#### Sentry Group
Updates all Sentry packages together:
- `@sentry/*` packages

#### Animation Group
Updates animation libraries together:
- `framer-motion`, `react-spring`

#### Charts Group
Updates data visualization libraries together:
- `recharts`, `d3*`

### 3. **GitHub Actions Updates**
- **Schedule**: Weekly on Mondays at 9:00 AM EST
- **PR Limit**: Maximum 5 open PRs for Actions updates
- Automatically updates workflow dependencies

## Pull Request Management

### PR Labels
All Dependabot PRs are automatically labeled:
- `dependencies` - For npm updates
- `github-actions` - For workflow updates
- `automated` - For all Dependabot PRs

### Commit Message Format
- **NPM dependencies**: `chore(deps): update react group`
- **Dev dependencies**: `chore(dev-deps): update build-tools group`
- **GitHub Actions**: `chore(actions): update checkout action to v4`

### Reviewers
PRs are automatically assigned to: **@Vaporjawn**

## How to Handle Dependabot PRs

### 1. Review the Changes
```bash
# View the PR details on GitHub
# Check changelog links provided by Dependabot
# Review breaking changes and migration guides
```

### 2. Test Locally (Recommended)
```bash
# Checkout the Dependabot branch
git fetch origin
git checkout dependabot/npm_and_yarn/react-group-abc123

# Install dependencies
npm install

# Run tests
npm test

# Build the project
npm run build

# Test manually
npm run dev
```

### 3. Merge Strategies

#### Auto-Merge (for minor/patch updates)
Enable auto-merge for low-risk updates:
```bash
gh pr merge <PR_NUMBER> --auto --squash
```

#### Manual Review (for major updates)
- Review breaking changes carefully
- Test thoroughly before merging
- Update code if APIs have changed

### 4. Handle Conflicts
Dependabot automatically rebases PRs when conflicts occur:
- **Rebase Strategy**: `auto`
- If manual intervention needed, use: `@dependabot rebase`

## Dependabot Commands

You can interact with Dependabot using comments on PRs:

```bash
@dependabot rebase          # Rebase PR against base branch
@dependabot recreate        # Recreate PR from scratch
@dependabot merge           # Merge PR once checks pass
@dependabot squash and merge # Squash and merge
@dependabot cancel merge    # Cancel auto-merge
@dependabot close           # Close PR
@dependabot reopen          # Reopen closed PR
@dependabot ignore this [dependency] # Ignore specific dependency
@dependabot ignore this major version # Ignore major version
@dependabot ignore this minor version # Ignore minor version
```

## Ignoring Specific Updates

If you need to ignore specific dependencies, update `.github/dependabot.yml`:

```yaml
updates:
  - package-ecosystem: "npm"
    # ... other config
    ignore:
      # Ignore all updates for a package
      - dependency-name: "package-name"

      # Ignore specific versions
      - dependency-name: "another-package"
        versions: ["1.x", "2.x"]

      # Ignore major version updates only
      - dependency-name: "critical-package"
        update-types: ["version-update:semver-major"]
```

## Security Updates

Dependabot also provides **security updates** automatically:
- Runs as soon as vulnerabilities are detected
- Creates PRs immediately (not on schedule)
- Labeled with `security` tag
- **Priority**: Merge security updates quickly

## Monitoring & Maintenance

### Weekly Routine (Mondays)
1. Check new Dependabot PRs
2. Review grouped updates
3. Test major version updates locally
4. Merge low-risk updates
5. Schedule testing for high-risk updates

### Monthly Review
1. Review ignored dependencies
2. Check for stale PRs
3. Update grouping strategy if needed
4. Review open PR count limits

## Best Practices

### ✅ DO
- Enable auto-merge for patch and minor updates after initial testing
- Review changelogs and breaking changes
- Test major updates in development environment
- Keep Dependabot PRs up to date (rebase regularly)
- Merge security updates promptly

### ❌ DON'T
- Don't ignore all Dependabot PRs
- Don't let PRs accumulate (resolve or close old ones)
- Don't merge major updates without testing
- Don't disable security updates
- Don't ignore security vulnerabilities

## Troubleshooting

### Too Many PRs?
**Solution**: Adjust `open-pull-requests-limit` in `.github/dependabot.yml`

### Updates Too Frequent?
**Solution**: Change schedule to `monthly` instead of `weekly`

### Missing Updates?
**Check**:
1. Dependabot is enabled in repository settings
2. Configuration file syntax is valid
3. GitHub Actions have necessary permissions

### Build Failures?
**Steps**:
1. Review the changelog for breaking changes
2. Check if peer dependencies need updating
3. Run tests locally to identify issues
4. Update code to accommodate new API

## Configuration Reference

### Schedule Intervals
- `daily` - Every day
- `weekly` - Once per week
- `monthly` - Once per month

### Update Strategies
- `increase` - Update to latest version (default)
- `widen` - Widen version range if possible
- `increase-if-necessary` - Only update if needed

### Rebase Strategies
- `auto` - Automatically rebase when conflicts occur
- `disabled` - Never automatically rebase

## Additional Resources

- [Dependabot Documentation](https://docs.github.com/en/code-security/dependabot)
- [Configuration Options](https://docs.github.com/en/code-security/dependabot/dependabot-version-updates/configuration-options-for-the-dependabot.yml-file)
- [Dependabot Commands](https://docs.github.com/en/code-security/dependabot/working-with-dependabot/managing-pull-requests-for-dependency-updates)

## Status
✅ **Dependabot is now active** - Weekly updates will start on the next scheduled Monday at 9:00 AM EST
