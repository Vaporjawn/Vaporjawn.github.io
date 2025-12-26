import React from "react";
import { Box, Skeleton, Grid, Card, CardContent } from "@mui/material";

interface SkeletonLoaderProps {
  variant: "hero" | "skills" | "projects" | "experience" | "github";
  count?: number;
}

const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({ variant, count = 3 }) => {
  const renderHeroSkeleton = () => (
    <Box sx={{ mb: 6 }}>
      <Grid container spacing={4} alignItems="center">
        <Grid item xs={12} md={8}>
          <Skeleton variant="text" width="80%" height={80} />
          <Skeleton variant="text" width="60%" height={40} sx={{ mt: 2 }} />
          <Skeleton variant="rectangular" width="100%" height={100} sx={{ mt: 3, borderRadius: 2 }} />
          <Box sx={{ display: "flex", gap: 2, mt: 3 }}>
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} variant="circular" width={40} height={40} />
            ))}
          </Box>
        </Grid>
        <Grid item xs={12} md={4}>
          <Skeleton variant="circular" width={280} height={280} sx={{ mx: "auto" }} />
        </Grid>
      </Grid>
    </Box>
  );

  const renderSkillsSkeleton = () => (
    <Box sx={{ mb: 6 }}>
      <Skeleton variant="text" width="30%" height={60} sx={{ mx: "auto", mb: 4 }} />
      <Grid container spacing={3}>
        {[...Array(3)].map((_, i) => (
          <Grid item xs={12} md={4} key={i}>
            <Skeleton variant="text" width="50%" height={40} sx={{ mb: 2 }} />
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
              {[...Array(6)].map((_, j) => (
                <Skeleton key={j} variant="rectangular" width={100} height={32} sx={{ borderRadius: 16 }} />
              ))}
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );

  const renderProjectsSkeleton = () => (
    <Grid container spacing={3}>
      {[...Array(count)].map((_, i) => (
        <Grid item xs={12} sm={6} md={4} key={i}>
          <Card>
            <Skeleton variant="rectangular" height={200} />
            <CardContent>
              <Skeleton variant="text" height={32} width="80%" />
              <Skeleton variant="text" height={20} width="100%" sx={{ mt: 1 }} />
              <Skeleton variant="text" height={20} width="90%" />
              <Box sx={{ display: "flex", gap: 1, mt: 2 }}>
                {[...Array(3)].map((_, j) => (
                  <Skeleton key={j} variant="rectangular" width={60} height={24} sx={{ borderRadius: 12 }} />
                ))}
              </Box>
              <Box sx={{ display: "flex", gap: 2, mt: 3 }}>
                <Skeleton variant="rectangular" width={100} height={36} sx={{ borderRadius: 1 }} />
                <Skeleton variant="rectangular" width={100} height={36} sx={{ borderRadius: 1 }} />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );

  const renderExperienceSkeleton = () => (
    <Box>
      {[...Array(count)].map((_, i) => (
        <Card key={i} sx={{ mb: 3 }}>
          <CardContent>
            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
              <Box sx={{ flex: 1 }}>
                <Skeleton variant="text" width="60%" height={32} />
                <Skeleton variant="text" width="40%" height={24} />
              </Box>
              <Skeleton variant="rectangular" width={80} height={24} sx={{ borderRadius: 12 }} />
            </Box>
            <Skeleton variant="text" width="30%" height={20} sx={{ mb: 2 }} />
            <Skeleton variant="rectangular" width="100%" height={80} sx={{ borderRadius: 1 }} />
            <Box sx={{ display: "flex", gap: 1, mt: 2, flexWrap: "wrap" }}>
              {[...Array(5)].map((_, j) => (
                <Skeleton key={j} variant="rectangular" width={80} height={24} sx={{ borderRadius: 12 }} />
              ))}
            </Box>
          </CardContent>
        </Card>
      ))}
    </Box>
  );

  const renderGitHubSkeleton = () => (
    <Box sx={{ mb: 6 }}>
      <Skeleton variant="text" width="40%" height={60} sx={{ mx: "auto", mb: 3 }} />
      <Skeleton variant="rectangular" width="100%" height={300} sx={{ borderRadius: 2 }} />
    </Box>
  );

  const skeletonVariants = {
    hero: renderHeroSkeleton,
    skills: renderSkillsSkeleton,
    projects: renderProjectsSkeleton,
    experience: renderExperienceSkeleton,
    github: renderGitHubSkeleton,
  };

  return skeletonVariants[variant]();
};

export default SkeletonLoader;
