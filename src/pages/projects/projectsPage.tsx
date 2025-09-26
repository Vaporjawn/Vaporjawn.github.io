import React, { useState, useMemo } from "react";
import {
  Box,
  Typography,
  Chip,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Card,
  CardContent,
  CardActions,
  Button,
  Grid,
  Container,
  Fade,
  IconButton,
  Tooltip,
  Collapse,
} from "@mui/material";
import {
  Search,
  GitHub,
  Launch,
  Star,
  Code,
  ExpandMore,
  ExpandLess,
  Refresh,
  Download,
} from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import SEO from "../../components/SEO/SEO";
import { useProjects } from "../../hooks/usePortfolioData";
import { useNpmPackages } from "../../hooks/useNpmPackages";
import { useDevpostProjects } from "../../hooks/useDevpostProjects";
import { useGithubRepos } from "../../hooks/useGithubRepos";
// Devpost standalone section removed per consolidation requirement. Devpost data will be merged into unified list in a later step.
// Removed image rendering per request (no project thumbnails displayed)

const ProjectsPage: React.FC = () => {
  const theme = useTheme();
  // Correctly destructure the custom hook which returns an object, not an array
  const { projects, featuredProjects } = useProjects();
  const {
    packages: npmPackages,
    loading: npmLoading,
    error: npmError,
    refresh: refreshNpm,
  } = useNpmPackages({ fetchDownloads: true });
  const [showNpm, setShowNpm] = useState(false); // default collapsed per requirement
  const { repos: githubRepos } = useGithubRepos();
  const { packages: npmPkgs } = useNpmPackages();
  const { projects: devpostProjects } = useDevpostProjects();
  const [searchQuery, setSearchQuery] = useState("");
  // Devpost state
  // Devpost hook removed here; data aggregation will occur in unified pipeline (future step)
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [showFeatured, setShowFeatured] = useState(false); // Initially collapsed

  // Unified aggregation model (initial): portfolio + github repos (npm & devpost to be merged subsequently)
  /**
   * UnifiedProject now represents a merged, de-duplicated aggregation across portfolio, GitHub repos,
   * npm packages, and Devpost projects. A single card may contain multiple platform facets.
   */
  interface UnifiedProject {
    id: string; // stable key derived from preferred source (github repo id, portfolio id, or fallback slug)
    title: string;
    description: string;
    // Portfolio metadata (optional)
    status?: string;
    category?: string;
    technologies?: string[];
    featured?: boolean;
    // Platform facets
    github?: {
      url: string;
      stars?: number;
      homepage?: string;
      pushedAt?: string;
      updatedAt?: string;
    };
    npm?: {
      name: string;
      url?: string;
      version?: string;
      repository?: string;
      downloadsPerWeek?: number;
      publishedAt?: string;
      homepage?: string;
    };
    devpost?: {
      url: string;
      likes?: number;
      comments?: number;
      updatedAt?: string;
    };
    // General links
    liveUrl?: string; // portfolio live demo
    homepage?: string; // fallback homepage (github or npm)
    // Aggregated metrics (for simplified UI checks)
    stars?: number;
    downloadsPerWeek?: number;
    likes?: number;
    comments?: number;
    // Computed recency (max of available timestamps)
    lastActivityAt?: string;
    sources: string[]; // list of contributing sources for transparency / debugging
  }

  // Utility: canonicalize repository URLs for matching (strip protocol, trailing .git, trailing slash)
  const canonicalRepo = (url?: string | null) => {
    if (!url) return undefined;
    try {
      const u = new URL(url);
      let path = u.host + u.pathname;
      path = path.replace(/\.git$/i, "").replace(/\/$/, "");
      return path.toLowerCase();
    } catch {
      return url.toLowerCase();
    }
  };

  const shortNumber = (n?: number) => {
    if (n === undefined || n === null) return undefined;
    if (n < 1000) return String(n);
    if (n < 1000 * 1000) return (Math.round((n / 1000) * 10) / 10) + "k";
    return (Math.round((n / 1000_000) * 10) / 10) + "M";
  };

  // Centralized tooltip copy for metrics (concise, accessible). Keep < 110 chars for readability.
  const metricTooltips = {
    stars: "GitHub stars (latest fetched count)",
    weeklyDownloads: "Approx. npm downloads in the last 7 days (npm registry)",
    likes: "Devpost project likes (snapshot when last fetched)",
    comments: "Devpost project comments (snapshot when last fetched)",
    version: "Published npm package version"
  } as const;

  const unifiedProjects: UnifiedProject[] = useMemo(() => {
    type MapEntry = UnifiedProject;
    const map = new Map<string, MapEntry>();

    const ensureEntry = (key: string, seed: Partial<UnifiedProject>): MapEntry => {
      const existing = map.get(key);
      if (existing) return existing;
      const entry: MapEntry = {
        id: key,
        title: seed.title || "Untitled",
        description: seed.description || "",
        sources: [],
        // aggregated metrics left undefined until set
      } as MapEntry;
      // assign base seed props
      Object.assign(entry, seed);
      map.set(key, entry);
      return entry;
    };

    // 1. GitHub repos (preferred canonical when available)
    if (githubRepos) {
      for (const r of githubRepos) {
        const key = `gh_${r.id}`; // stable numeric id
        const entry = ensureEntry(key, {
          title: r.name,
          description: r.description || "GitHub repository",
        });
        if (!entry.sources.includes("github")) entry.sources.push("github");
        entry.github = {
          url: r.htmlUrl,
          stars: r.stargazersCount,
          homepage: r.homepage || undefined,
          pushedAt: r.pushedAt,
          updatedAt: r.updatedAt,
        };
        entry.stars = r.stargazersCount;
        // recency candidate
        const recency = r.pushedAt || r.updatedAt;
        if (recency) {
          if (!entry.lastActivityAt || new Date(recency) > new Date(entry.lastActivityAt)) {
            entry.lastActivityAt = recency;
          }
        }
      }
    }

    // Helper to attempt matching to existing repo via repository URL
    const matchByRepoUrl = (repoUrl?: string) => {
      if (!repoUrl) return undefined;
      const canon = canonicalRepo(repoUrl);
      if (!canon) return undefined;
      // search existing entries for github facet with matching canonical
      for (const e of map.values()) {
        if (e.github && canonicalRepo(e.github.url) === canon) return e;
      }
      return undefined;
    };

    // 2. Portfolio projects
    if (projects) {
      for (const p of projects) {
        // If portfolio has githubUrl try merging into github entry
        let entry: MapEntry | undefined;
        if (p.githubUrl) entry = matchByRepoUrl(p.githubUrl);
        const key = entry ? entry.id : `pf_${p.id}`;
        entry = entry || ensureEntry(key, { title: p.title, description: p.description });
        if (!entry.sources.includes("portfolio")) entry.sources.push("portfolio");
        // Merge portfolio metadata (prefer existing if already set to preserve longer description)
        if (!entry.description || entry.description === "GitHub repository") {
          entry.description = p.description;
        }
        entry.status = p.status;
        entry.category = p.category;
        entry.technologies = p.technologies;
        entry.featured = p.featured;
        if (p.liveUrl) entry.liveUrl = p.liveUrl;
        if (p.githubUrl && (!entry.github || !entry.github.url)) {
          // Edge: portfolio has github link but no github repo facet (maybe repo not public)
          entry.github = { url: p.githubUrl };
          if (!entry.sources.includes("github-link")) entry.sources.push("github-link");
        }
      }
    }

    // 3. npm packages
    if (npmPkgs) {
      for (const pkg of npmPkgs) {
        let entry = matchByRepoUrl(pkg.repository);
        if (!entry) {
          // Attempt title / name heuristic if not found
            const lower = pkg.name.toLowerCase();
            entry = Array.from(map.values()).find(e => e.title.toLowerCase() === lower);
        }
        const key = entry ? entry.id : `npm_${pkg.name}`;
        entry = entry || ensureEntry(key, { title: pkg.name, description: pkg.description || pkg.name });
        if (!entry.sources.includes("npm")) entry.sources.push("npm");
        entry.npm = {
          name: pkg.name,
          url: pkg.npmUrl,
          version: pkg.version,
          repository: pkg.repository,
          downloadsPerWeek: pkg.weeklyDownloads,
          publishedAt: pkg.publishedAt,
          homepage: pkg.homepage,
        };
        if (pkg.weeklyDownloads !== undefined) entry.downloadsPerWeek = pkg.weeklyDownloads;
        // Recency candidate
        if (pkg.publishedAt) {
          if (!entry.lastActivityAt || new Date(pkg.publishedAt) > new Date(entry.lastActivityAt)) {
            entry.lastActivityAt = pkg.publishedAt;
          }
        }
        // If no homepage yet, use npm homepage
        if (!entry.homepage && pkg.homepage) entry.homepage = pkg.homepage;
      }
    }

    // 4. Devpost projects
    if (devpostProjects) {
      for (const dp of devpostProjects) {
        // Attempt match by title heuristic
        let entry = Array.from(map.values()).find(e => e.title.toLowerCase() === dp.title.toLowerCase());
        const key = entry ? entry.id : `devpost_${dp.id}`;
        entry = entry || ensureEntry(key, { title: dp.title, description: dp.summary || "Devpost project" });
        if (!entry.sources.includes("devpost")) entry.sources.push("devpost");
        entry.devpost = {
          url: dp.projectUrl,
          likes: dp.likes,
          comments: dp.comments,
          updatedAt: dp.updatedAt,
        };
        if (dp.likes !== undefined) entry.likes = dp.likes;
        if (dp.comments !== undefined) entry.comments = dp.comments;
        if (dp.updatedAt) {
          if (!entry.lastActivityAt || new Date(dp.updatedAt) > new Date(entry.lastActivityAt)) {
            entry.lastActivityAt = dp.updatedAt;
          }
        }
        // If description is generic and we have a summary, replace
        if (entry.description === "GitHub repository" && dp.summary) entry.description = dp.summary;
      }
    }

    // Compute final fallback timestamps (portfolio-only items may lack dates)
    for (const entry of map.values()) {
      if (!entry.lastActivityAt) {
        // Provide deterministic fallback using current time minus an offset based on insertion order to keep stable sort
        // (Not strictly necessary, but ensures portfolio-only items don't all tie at 0)
        entry.lastActivityAt = entry.github?.updatedAt || entry.github?.pushedAt || entry.npm?.publishedAt || entry.devpost?.updatedAt || undefined;
      }
    }

    // Derive general homepage if absent (prefer liveUrl -> github homepage -> github url -> npm homepage)
    for (const entry of map.values()) {
      if (!entry.homepage) {
        entry.homepage = entry.liveUrl || entry.github?.homepage || entry.github?.url || entry.npm?.homepage;
      }
    }

    // Final array
    return Array.from(map.values());
  }, [projects, githubRepos, npmPkgs, devpostProjects]);

  // Filtering currently applies to portfolio subset only (will adapt for multi-source next step)
  const filteredProjects = useMemo(() => {
    let list = unifiedProjects;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      list = list.filter(p =>
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        (p.technologies || []).some(t => t.toLowerCase().includes(q)) ||
        (p.npm?.name || "").toLowerCase().includes(q)
      );
    }
    if (statusFilter !== "all") {
      list = list.filter(p => !p.status || p.status === statusFilter);
    }
    if (categoryFilter !== "all") {
      list = list.filter(p => !p.category || p.category === categoryFilter);
    }
    return list.sort((a, b) => {
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      const at = a.lastActivityAt ? new Date(a.lastActivityAt).getTime() : 0;
      const bt = b.lastActivityAt ? new Date(b.lastActivityAt).getTime() : 0;
      if (bt !== at) return bt - at;
      return a.title.localeCompare(b.title);
    });
  }, [unifiedProjects, searchQuery, statusFilter, categoryFilter]);

  const categories = [...new Set((projects || []).map((p) => p.category))];
  const statuses = [...new Set((projects || []).map((p) => p.status))];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "success";
      case "in-progress":
        return "warning";
      case "archived":
        return "default";
      default:
        return "primary";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "in-progress":
        return "In Progress";
      case "completed":
        return "Completed";
      case "archived":
        return "Archived";
      default:
        return status.charAt(0).toUpperCase() + status.slice(1);
    }
  };

  return (
    <>
      <SEO
        title="Projects | Victor Williams"
        description="Explore Victor Williams' portfolio of web development projects built with React, TypeScript, and modern technologies."
        keywords="Victor Williams Projects, React Projects, TypeScript, Web Development Portfolio, Open Source"
        url="https://vaporjawn.github.io/projects"
      />

      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Fade in timeout={1000}>
          <Box>
            {/* Header Section */}
            <Box textAlign="center" sx={{ mb: 6 }}>
              <Typography
                variant="h2"
                component="h1"
                sx={{
                  fontWeight: 700,
                  mb: 2,
                  fontSize: { xs: "2.5rem", md: "3rem" },
                  background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                My Projects
              </Typography>
              <Typography
                variant="h6"
                color="text.secondary"
                sx={{ maxWidth: 600, mx: "auto" }}
              >
                A collection of projects showcasing my journey in software
                development
              </Typography>
            </Box>

            {/* Devpost section removed; content will be included in unified All Projects list */}

            {/* NPM Packages Section */}
            <Box
              sx={{ mb: 6 }}
              component="section"
              role="region"
              aria-labelledby="npm-packages-heading"
            >
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                sx={{ mb: 1 }}
              >
                <Typography
                  variant="h4"
                  component="h2"
                  id="npm-packages-heading"
                  sx={{ fontWeight: 600 }}
                >
                  📦 NPM Packages
                </Typography>
                <Box>
                  <Button
                    size="small"
                    variant="text"
                    onClick={() => setShowNpm((o) => !o)}
                    startIcon={showNpm ? <ExpandLess /> : <ExpandMore />}
                    aria-expanded={showNpm}
                    aria-controls="npm-packages-panel"
                    aria-label={showNpm ? "Hide NPM packages list" : "Show NPM packages list"}
                    sx={{ mr: 1 }}
                  >
                    {showNpm ? "Hide" : "Show"}
                  </Button>
                  <Tooltip title="Refresh packages (ignore cache)">
                    <span>
                      <IconButton
                        onClick={refreshNpm}
                        disabled={npmLoading}
                        aria-label={npmLoading ? "Refreshing NPM packages" : "Refresh NPM packages"}
                        aria-describedby="npm-packages-status"
                      >
                        <Refresh />
                      </IconButton>
                    </span>
                  </Tooltip>
                </Box>
              </Box>
              <Collapse in={showNpm} timeout="auto" unmountOnExit>
                {/* Status / live region */}
                <Box id="npm-packages-status" aria-live="polite" sx={{ position: "relative" }}>
                  {npmLoading && !npmPackages.length && (
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                      Loading packages...
                    </Typography>
                  )}
                  {npmError && !npmPackages.length && (
                    <Typography variant="body2" color="error" sx={{ mt: 2 }}>
                      {npmError}
                    </Typography>
                  )}
                  {!npmLoading && !npmError && npmPackages.length === 0 && (
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                      No packages found.
                    </Typography>
                  )}
                  {!npmLoading && !npmError && npmPackages.length > 0 && (
                    <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: "block" }}>
                      Showing {npmPackages.length} package{npmPackages.length === 1 ? "" : "s"}
                    </Typography>
                  )}
                </Box>
                <Grid id="npm-packages-panel" container spacing={3} sx={{ mt: 1 }}>
                  {npmPackages.map((pkg) => (
                    <Grid item xs={12} sm={6} lg={4} key={pkg.name}>
                      <Card
                        elevation={2}
                        sx={{
                          height: "100%",
                          display: "flex",
                          flexDirection: "column",
                          transition: "transform 0.2s, box-shadow 0.2s",
                          "&:hover": { transform: "translateY(-2px)", boxShadow: 4 },
                        }}
                      >
                        <CardContent sx={{ flexGrow: 1 }}>
                          <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={1}>
                            <Typography variant="h6" component="h3" gutterBottom>
                              {pkg.name}
                            </Typography>
                            <Chip label={`v${pkg.version}`} size="small" color="primary" />
                          </Box>
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            paragraph
                            sx={{
                              display: "-webkit-box",
                              WebkitLineClamp: 3,
                              WebkitBoxOrient: "vertical",
                              overflow: "hidden",
                            }}
                          >
                            {pkg.description || "No description provided."}
                          </Typography>
                          <Box display="flex" flexWrap="wrap" gap={0.5} mb={2}>
                            {pkg.keywords.slice(0, 4).map((k) => (
                              <Chip key={k} label={k} variant="outlined" size="small" sx={{ fontSize: "0.65rem" }} />
                            ))}
                            {pkg.weeklyDownloads !== undefined && (
                              <Tooltip title={metricTooltips.weeklyDownloads} arrow>
                                <Chip
                                  icon={<Download sx={{ fontSize: "0.9rem" }} />}
                                  label={`${pkg.weeklyDownloads.toLocaleString()} / wk`}
                                  size="small"
                                  color="secondary"
                                  aria-label={`${pkg.weeklyDownloads.toLocaleString()} weekly downloads (npm)`}
                                />
                              </Tooltip>
                            )}
                          </Box>
                          {pkg.publishedAt && (
                            <Typography variant="caption" color="text.secondary">
                              Updated {new Date(pkg.publishedAt).toLocaleDateString()}
                            </Typography>
                          )}
                        </CardContent>
                        <CardActions sx={{ p: 2, pt: 0 }}>
                          {pkg.repository && (
                            <Button
                              size="small"
                              variant="outlined"
                              startIcon={<GitHub />}
                              href={pkg.repository}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              Repo
                            </Button>
                          )}
                          {pkg.npmUrl && (
                            <Button
                              size="small"
                              variant="text"
                              startIcon={<Code />}
                              href={pkg.npmUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              NPM
                            </Button>
                          )}
                          {pkg.homepage && (
                            <Button
                              size="small"
                              variant="text"
                              startIcon={<Launch />}
                              href={pkg.homepage}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              Site
                            </Button>
                          )}
                        </CardActions>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </Collapse>
            </Box>

            {/* Featured Projects */}
            {featuredProjects.length > 0 && (
              <Box sx={{ mb: 6 }}>
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                  sx={{ mb: 1 }}
                >
                  <Typography
                    variant="h4"
                    component="h2"
                    sx={{ fontWeight: 600 }}
                  >
                    ⭐ Featured Projects
                  </Typography>
                  <Button
                    size="small"
                    variant="text"
                    onClick={() => setShowFeatured((o) => !o)}
                    startIcon={showFeatured ? <ExpandLess /> : <ExpandMore />}
                    aria-expanded={showFeatured}
                    aria-controls="featured-projects-panel"
                  >
                    {showFeatured ? "Hide" : "Show"}
                  </Button>
                </Box>
                <Collapse in={showFeatured} timeout="auto" unmountOnExit>
                  <Grid
                    id="featured-projects-panel"
                    container
                    spacing={3}
                    sx={{ mt: 2 }}
                  >
                    {featuredProjects.map((project) => (
                      <Grid item xs={12} md={6} key={project.id}>
                        <Card
                          elevation={4}
                          sx={{
                            height: "100%",
                            display: "flex",
                            flexDirection: "column",
                            transition: "transform 0.2s, box-shadow 0.2s",
                            "&:hover": {
                              transform: "translateY(-4px)",
                              boxShadow: 8,
                            },
                          }}
                        >
                          {/* Image removed */}
                          <CardContent sx={{ flexGrow: 1 }}>
                            <Box
                              display="flex"
                              justifyContent="space-between"
                              alignItems="flex-start"
                              mb={2}
                            >
                              <Typography
                                variant="h5"
                                component="h3"
                                gutterBottom
                              >
                                {project.title}
                              </Typography>
                              <Chip
                                label={getStatusLabel(project.status)}
                                color={getStatusColor(project.status)}
                                size="small"
                              />
                            </Box>

                            <Typography
                              variant="body1"
                              color="text.secondary"
                              paragraph
                            >
                              {project.description}
                            </Typography>

                            <Box display="flex" gap={1} flexWrap="wrap" mb={2}>
                              {project.technologies.slice(0, 4).map((tech) => (
                                <Chip
                                  key={tech}
                                  label={tech}
                                  variant="outlined"
                                  size="small"
                                  sx={{ fontSize: "0.75rem" }}
                                />
                              ))}
                              {project.technologies.length > 4 && (
                                <Chip
                                  label={`+${project.technologies.length - 4} more`}
                                  variant="outlined"
                                  size="small"
                                  sx={{ fontSize: "0.75rem" }}
                                />
                              )}
                            </Box>
                          </CardContent>

                          <CardActions sx={{ p: 2, pt: 0 }}>
                            {project.githubUrl && (
                              <Button
                                size="small"
                                variant="contained"
                                startIcon={<GitHub />}
                                href={project.githubUrl}
                                component="a"
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                View Code
                              </Button>
                            )}
                            {project.liveUrl && (
                              <Button
                                size="small"
                                variant="outlined"
                                startIcon={<Launch />}
                                href={project.liveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                Live Demo
                              </Button>
                            )}
                          </CardActions>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                </Collapse>
              </Box>
            )}

            {/* Search and Filters */}
            <Box sx={{ mb: 4 }}>
              <Typography
                variant="h4"
                component="h2"
                sx={{ mb: 3, fontWeight: 600 }}
              >
                All Projects ({filteredProjects.length})
              </Typography>

              <Grid container spacing={2} sx={{ mb: 3 }}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Search projects"
                    variant="outlined"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Search />
                        </InputAdornment>
                      ),
                    }}
                    placeholder="Search by name, description, or technology..."
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <FormControl fullWidth>
                    <InputLabel>Status</InputLabel>
                    <Select
                      value={statusFilter}
                      label="Status"
                      onChange={(e) => setStatusFilter(e.target.value)}
                    >
                      <MenuItem value="all">All</MenuItem>
                      {statuses.map((status) => (
                        <MenuItem key={status} value={status}>
                          {getStatusLabel(status)}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <FormControl fullWidth>
                    <InputLabel>Category</InputLabel>
                    <Select
                      value={categoryFilter}
                      label="Category"
                      onChange={(e) => setCategoryFilter(e.target.value)}
                    >
                      <MenuItem value="all">All</MenuItem>
                      {categories.map((category) => (
                        <MenuItem key={category} value={category}>
                          {category.charAt(0).toUpperCase() + category.slice(1)}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </Box>

            {/* All Projects Grid */}
            <Grid container spacing={3}>
              {filteredProjects.map((project) => (
                <Grid item xs={12} sm={6} lg={4} key={project.id}>
                  <Card
                    elevation={2}
                    sx={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      transition: "transform 0.2s, box-shadow 0.2s",
                      "&:hover": {
                        transform: "translateY(-2px)",
                        boxShadow: 4,
                      },
                    }}
                  >
                    {/* Image removed */}
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Box
                        display="flex"
                        justifyContent="space-between"
                        alignItems="flex-start"
                        mb={1}
                      >
                        <Typography variant="h6" component="h3" gutterBottom>
                          {project.title}
                        </Typography>
                        <Box display="flex" alignItems="center" gap={0.5}>
                          {typeof project.stars === "number" && project.stars > 0 && (
                            <Tooltip title={metricTooltips.stars} arrow>
                              <Chip
                                icon={<Star sx={{ fontSize: "0.9rem" }} />}
                                label={project.stars}
                                size="small"
                                color="warning"
                                aria-label={`${project.stars} GitHub stars`}
                              />
                            </Tooltip>
                          )}
                          {typeof project.downloadsPerWeek === "number" && project.downloadsPerWeek > 0 && (
                            <Tooltip title={metricTooltips.weeklyDownloads} arrow>
                              <Chip
                                label={`${shortNumber(project.downloadsPerWeek)}/wk`}
                                size="small"
                                color="primary"
                                aria-label={`${project.downloadsPerWeek.toLocaleString()} weekly npm downloads`}
                              />
                            </Tooltip>
                          )}
                          {(project.likes !== undefined || project.comments !== undefined) && (
                            <Box display="flex" gap={0.5}>
                              {typeof project.likes === "number" && (
                                <Tooltip title={metricTooltips.likes} arrow>
                                  <Chip
                                    label={`❤ ${shortNumber(project.likes)}`}
                                    size="small"
                                    variant="outlined"
                                    aria-label={`${project.likes} Devpost likes`}
                                  />
                                </Tooltip>
                              )}
                              {typeof project.comments === "number" && (
                                <Tooltip title={metricTooltips.comments} arrow>
                                  <Chip
                                    label={`💬 ${shortNumber(project.comments)}`}
                                    size="small"
                                    variant="outlined"
                                    aria-label={`${project.comments} Devpost comments`}
                                  />
                                </Tooltip>
                              )}
                            </Box>
                          )}
                          {project.featured && (
                            <Tooltip title="Featured Project">
                              <IconButton size="small" color="primary">
                                <Star />
                              </IconButton>
                            </Tooltip>
                          )}
                          {project.npm?.version && (
                            <Tooltip title={metricTooltips.version} arrow>
                              <Chip
                                label={`v${project.npm.version}`}
                                size="small"
                                variant="outlined"
                                aria-label={`npm version ${project.npm.version}`}
                              />
                            </Tooltip>
                          )}
                        </Box>
                      </Box>

                      <Typography
                        variant="body2"
                        color="text.secondary"
                        paragraph
                        sx={{
                          display: "-webkit-box",
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                        }}
                      >
                        {project.description}
                      </Typography>

                      {project.technologies && project.technologies.length > 0 && (
                        <Box display="flex" gap={0.5} flexWrap="wrap" mb={2}>
                          {project.technologies.slice(0, 3).map((tech) => (
                            <Chip
                              key={tech}
                              label={tech}
                              variant="outlined"
                              size="small"
                              sx={{ fontSize: "0.7rem" }}
                            />
                          ))}
                          {project.technologies.length > 3 && (
                            <Chip
                              label={`+${project.technologies.length - 3}`}
                              variant="outlined"
                              size="small"
                              sx={{ fontSize: "0.7rem" }}
                            />
                          )}
                        </Box>
                      )}

                      {project.status && (
                        <Chip
                          label={getStatusLabel(project.status)}
                          color={getStatusColor(project.status)}
                          size="small"
                        />
                      )}
                    </CardContent>

                    <CardActions sx={{ p: 2, pt: 0 }}>
                      {project.github?.url && (
                        <Button size="small" variant="outlined" startIcon={<GitHub />} href={project.github.url} target="_blank" rel="noopener noreferrer">GitHub</Button>
                      )}
                      {project.npm?.url && (
                        <Button size="small" variant="outlined" startIcon={<Code />} href={project.npm.url} target="_blank" rel="noopener noreferrer">npm</Button>
                      )}
                      {project.devpost?.url && (
                        <Button size="small" variant="outlined" startIcon={<Launch />} href={project.devpost.url} target="_blank" rel="noopener noreferrer">Devpost</Button>
                      )}
                      {project.liveUrl && (
                        <Button size="small" variant="text" startIcon={<Launch />} href={project.liveUrl} target="_blank" rel="noopener noreferrer">Demo</Button>
                      )}
                      {!project.liveUrl && project.homepage && (
                        <Button size="small" variant="text" startIcon={<Launch />} href={project.homepage} target="_blank" rel="noopener noreferrer">Site</Button>
                      )}
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>

            {/* No Results */}
            {filteredProjects.length === 0 && (
              <Box textAlign="center" py={8}>
                <Code sx={{ fontSize: 60, color: "text.secondary", mb: 2 }} />
                <Typography variant="h6" color="text.secondary" gutterBottom>
                  No projects found
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Try adjusting your search criteria or filters
                </Typography>
              </Box>
            )}
          </Box>
        </Fade>
      </Container>
    </>
  );
};

export default ProjectsPage;
