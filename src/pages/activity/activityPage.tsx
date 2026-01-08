/**
 * Activity Page
 * Unified timeline of open-source work across npm and GitHub
 * @module pages/activity/activityPage
 */

import React, { useCallback, useMemo, useState } from "react";
import { Box, Typography } from "@mui/material";

import { useGithubActivity } from "../../hooks/useGithubActivity";
import { useNpmPackages } from "../../hooks/useNpmPackages";
import { NpmSection } from "../../components/activity/NpmSection";
import { GitHubSection } from "../../components/activity/GitHubSection";
import type { CommitGraphEvent } from "../../components/activity/types";
import { NPM_PROFILE_URL, GITHUB_PROFILE_URL } from "../../components/activity/constants";
import PullToRefresh from "../../components/PullToRefresh";
import toast from "react-hot-toast";

/**
 * Activity page component
 * Displays unified npm and GitHub activity timeline
 *
 * @returns React component
 */
const ActivityPage: React.FC = () => {
  // Data hooks
  const {
    events: githubEvents,
    loading: githubLoading,
    error: githubError,
    refresh: refreshGithub,
  } = useGithubActivity();
  const {
    packages: npmPackages,
    loading: npmLoading,
    error: npmError,
    refresh: refreshNpm,
  } = useNpmPackages();

  // View toggle for GitHub activity section (graph vs. list)
  const [ghView, setGhView] = useState<"graph" | "list">("graph");
  const handleGhView = useCallback(
    (val: "graph" | "list" | null) => {
      if (val) setGhView(val);
    },
    []
  );

  // Unified events: GitHub events already normalized; map npm packages to events.
  const unifiedEvents: CommitGraphEvent[] = useMemo(() => {
    const nowIso = new Date().toISOString();
    const npmEvents: CommitGraphEvent[] = npmPackages.map((p) => ({
      id: `npm:${p.name}@${p.version}:${p.publishedAt || "no-date"}`,
      createdAt: p.publishedAt || nowIso,
      message: `${p.name} v${p.version} published`,
      kind: "npm-publish",
      lane: "npm",
      url: p.npmUrl,
    }));
    // GitHub events form the trunk; assign lane explicitly.
    const ghEvents: CommitGraphEvent[] = githubEvents.map((e) => ({
      ...e,
      lane: "GitHub",
    }));
    return [...ghEvents, ...npmEvents].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }, [githubEvents, npmPackages]);

  // Pull-to-refresh handler
  const handleRefresh = useCallback(async () => {
    try {
      await Promise.all([refreshGithub(), refreshNpm()]);
      toast.success("Activity refreshed successfully!");
    } catch (_error) {
      toast.error("Failed to refresh activity");
    }
  }, [refreshGithub, refreshNpm]);

  return (
    <PullToRefresh onRefresh={handleRefresh}>
      <Box sx={{ maxWidth: 1200, mx: "auto", px: { xs: 2, md: 3 }, py: { xs: 4, md: 6 } }}>
        <Typography variant="h3" fontWeight={700} gutterBottom>
          Activity
        </Typography>
        <Typography variant="body1" sx={{ opacity: 0.75, mb: 4 }}>
          A unified timeline of my open-source work. npm publishes appear first, with a
          commit‑style graph of GitHub repository activity.
        </Typography>

        {/* npm Packages Section */}
        <NpmSection
          packages={npmPackages}
          loading={npmLoading}
          error={npmError}
          refresh={refreshNpm}
          profileUrl={NPM_PROFILE_URL}
        />

        {/* GitHub Activity Section */}
        <Box sx={{ mt: 6 }}>
          <GitHubSection
            events={unifiedEvents}
            loading={githubLoading}
            error={githubError}
            refresh={refreshGithub}
            view={ghView}
            onViewChange={handleGhView}
            profileUrl={GITHUB_PROFILE_URL}
            maxRepos={8}
            heightPerNode={40}
          />
        </Box>

        <Typography variant="body2" sx={{ mt: 4, opacity: 0.7 }}>
          GitHub and npm sections use local caching with background refresh to reduce API calls
          while keeping activity reasonably fresh. ({githubEvents.length} GitHub events /{" "}
          {npmPackages.length} packages)
        </Typography>

        {/* TODO: Enhance node visuals (shapes/sizes) & add virtualization if event list grows large */}
        {/* TODO: Add richer tooltips with relative time + repository badges */}
      </Box>
    </PullToRefresh>
  );
};

export default ActivityPage;
