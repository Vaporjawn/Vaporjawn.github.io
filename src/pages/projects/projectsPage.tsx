import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Paper,
  ToggleButton,
  ToggleButtonGroup,
  Link,
} from "@mui/material";
import {
  Search,
  GitHub,
  Launch,
  Star,
  Code,
  ViewList,
  ViewModule,
  ArrowUpward,
  ArrowDownward,
} from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import SEO from "../../components/SEO/SEO";
import { useProjects } from "../../hooks/usePortfolioData";
import { useNpmPackages } from "../../hooks/useNpmPackages";
import { useDevpostProjects } from "../../hooks/useDevpostProjects";
import { useGithubRepos } from "../../hooks/useGithubRepos";
import { useStarredProjects } from "../../hooks/useStarredProjects";
import { useIntersectionObserver } from "../../hooks/useIntersectionObserver";
// Devpost standalone section removed per consolidation requirement. Devpost data will be merged into unified list in a later step.
// Removed image rendering per request (no project thumbnails displayed)

const ProjectsPage: React.FC = () => {
  const theme = useTheme();
  // Correctly destructure the custom hook which returns an object, not an array
  const { projects } = useProjects();

  const { repos: githubRepos } = useGithubRepos();
  const { packages: npmPkgs } = useNpmPackages();
  const { projects: devpostProjects } = useDevpostProjects();
  const { toggleStar, isStarred } = useStarredProjects();
  const [searchQuery, setSearchQuery] = useState("");
  // Devpost state
  // Devpost hook removed here; data aggregation will occur in unified pipeline (future step)
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [showOnlyNpm, setShowOnlyNpm] = useState(false); // NPM packages filter
  const [showOnlyFeatured, setShowOnlyFeatured] = useState(false); // Featured projects filter
  const [showOnlyDevpost, setShowOnlyDevpost] = useState(false); // Devpost projects filter

  // Sorting and view controls
  const [viewMode, setViewMode] = useState<"cards" | "table">("cards");
  const [sortBy, setSortBy] = useState<"activity" | "name" | "stars" | "downloads" | "featured">("activity");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

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

  // Handle table header clicks for sorting
  const handleHeaderSort = (property: typeof sortBy) => {
    const isCurrentSort = sortBy === property;
    const newOrder = isCurrentSort && sortOrder === "desc" ? "asc" : "desc";
    setSortBy(property);
    setSortOrder(newOrder);
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

    return Array.from(map.values());
  }, [projects, githubRepos, npmPkgs, devpostProjects]);

  // Filtering now includes NPM packages, Featured projects, Devpost, and Starred filters
  const filteredProjects = useMemo(() => {
    let list = unifiedProjects;

    // NPM packages filter
    if (showOnlyNpm) {
      list = list.filter(p => p.npm && p.sources.includes("npm"));
    }

    // Featured projects filter (uses overridden featured status)
    if (showOnlyFeatured) {
      list = list.filter(p => isStarred(p.id, p.featured));
    }

    // Devpost projects filter
    if (showOnlyDevpost) {
      list = list.filter(p => p.devpost && p.sources.includes("devpost"));
    }



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
    // Apply sorting
    return list.sort((a, b) => {
      let result = 0;

      switch (sortBy) {
        case "name":
          result = a.title.localeCompare(b.title);
          break;
        case "stars":
          result = (b.stars || 0) - (a.stars || 0);
          break;
        case "downloads":
          result = (b.downloadsPerWeek || 0) - (a.downloadsPerWeek || 0);
          break;
        case "featured":
          // Sort starred/featured projects first
          const aFeatured = isStarred(a.id, a.featured || false);
          const bFeatured = isStarred(b.id, b.featured || false);
          if (aFeatured && !bFeatured) result = -1;
          else if (!aFeatured && bFeatured) result = 1;
          else result = 0;
          break;
        case "activity":
        default:
          const at = a.lastActivityAt ? new Date(a.lastActivityAt).getTime() : 0;
          const bt = b.lastActivityAt ? new Date(b.lastActivityAt).getTime() : 0;
          result = bt - at;
          break;
      }

      // Apply sort order (reverse for ascending)
      if (sortOrder === "asc") result = -result;

      // Secondary sort by title for consistency
      if (result === 0) {
        result = a.title.localeCompare(b.title);
      }

      return result;
    });
  }, [unifiedProjects, searchQuery, statusFilter, categoryFilter, showOnlyNpm, showOnlyFeatured, showOnlyDevpost, isStarred, sortBy, sortOrder]);

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

      <Container maxWidth="xl" sx={{ py: 4, px: { xs: 2, sm: 3, md: 4 } }}>
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

            {/* Search and Filters */}
            <Box sx={{ mb: 4 }}>
              <Typography
                variant="h4"
                component="h2"
                sx={{ mb: 3, fontWeight: 600 }}
              >
                All Projects ({filteredProjects.length})
              </Typography>

              {/* Quick Filter Buttons */}
              <Grid container spacing={2} sx={{ mb: 3, justifyContent: "center" }}>
                <Grid item xs={12} sm={4} md={2}>
                  <Button
                    fullWidth
                    variant={showOnlyNpm ? "contained" : "outlined"}
                    onClick={() => setShowOnlyNpm(!showOnlyNpm)}
                    startIcon={<Code />}
                    sx={{
                      height: "56px",
                      textTransform: "none",
                      fontSize: "0.875rem"
                    }}
                  >
                    {showOnlyNpm ? "All" : "📦 NPM"}
                  </Button>
                </Grid>
                <Grid item xs={12} sm={4} md={2}>
                  <Button
                    fullWidth
                    variant={showOnlyFeatured ? "contained" : "outlined"}
                    onClick={() => setShowOnlyFeatured(!showOnlyFeatured)}
                    startIcon={<Star />}
                    sx={{
                      height: "56px",
                      textTransform: "none",
                      fontSize: "0.875rem"
                    }}
                  >
                    {showOnlyFeatured ? "All" : "⭐ Featured"}
                  </Button>
                </Grid>
                <Grid item xs={12} sm={4} md={2}>
                  <Button
                    fullWidth
                    variant={showOnlyDevpost ? "contained" : "outlined"}
                    onClick={() => setShowOnlyDevpost(!showOnlyDevpost)}
                    startIcon={<Launch />}
                    sx={{
                      height: "56px",
                      textTransform: "none",
                      fontSize: "0.875rem"
                    }}
                  >
                    {showOnlyDevpost ? "All" : "🏆 Devpost"}
                  </Button>
                </Grid>
              </Grid>

              {/* Search and Dropdown Filters */}
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

              {/* Sorting and View Controls */}
              <Grid container spacing={2} sx={{ mt: 2 }}>
                <Grid item xs={12} sm={6} md={3}>
                  <FormControl fullWidth size="small">
                    <InputLabel>Sort By</InputLabel>
                    <Select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                      label="Sort By"
                    >
                      <MenuItem value="activity">Last Activity</MenuItem>
                      <MenuItem value="name">Name</MenuItem>
                      <MenuItem value="stars">GitHub Stars</MenuItem>
                      <MenuItem value="downloads">NPM Downloads</MenuItem>
                      <MenuItem value="featured">Featured First</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6} md={2}>
                  <ToggleButtonGroup
                    value={sortOrder}
                    exclusive
                    onChange={(_, newOrder) => {
                      if (newOrder !== null) {
                        setSortOrder(newOrder);
                      }
                    }}
                    size="small"
                    fullWidth
                  >
                    <ToggleButton value="desc" aria-label="Descending">
                      <ArrowDownward fontSize="small" />
                      Desc
                    </ToggleButton>
                    <ToggleButton value="asc" aria-label="Ascending">
                      <ArrowUpward fontSize="small" />
                      Asc
                    </ToggleButton>
                  </ToggleButtonGroup>
                </Grid>

                <Grid item xs={12} sm={12} md={2}>
                  <ToggleButtonGroup
                    value={viewMode}
                    exclusive
                    onChange={(_, newView) => {
                      if (newView !== null) {
                        setViewMode(newView);
                      }
                    }}
                    size="small"
                    fullWidth
                  >
                    <ToggleButton value="cards" aria-label="Card View">
                      <ViewModule fontSize="small" />
                      Cards
                    </ToggleButton>
                    <ToggleButton value="table" aria-label="Table View">
                      <ViewList fontSize="small" />
                      Table
                    </ToggleButton>
                  </ToggleButtonGroup>
                </Grid>
              </Grid>
            </Box>

            {/* Conditional View: Cards or Table */}
            {viewMode === "cards" ? (
              /* Card View with Animations */
              <Grid container spacing={3}>
              <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, index) => (
                <Grid item xs={12} sm={6} lg={4} key={project.id}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{
                      duration: 0.4,
                      delay: index * 0.05,
                      ease: [0.25, 0.1, 0.25, 1]
                    }}
                    whileHover={{
                      y: -8,
                      transition: { duration: 0.2, ease: "easeOut" }
                    }}
                    style={{ height: "100%" }}
                  >
                  <Card
                    elevation={2}
                    sx={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      transition: "box-shadow 0.3s ease",
                      "&:hover": {
                        boxShadow: 6,
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
                          <IconButton
                            onClick={() => toggleStar(project.id, project.featured)}
                            size="small"
                            sx={{
                              color: isStarred(project.id, project.featured) ? "gold" : "action.disabled",
                              "&:hover": {
                                color: isStarred(project.id, project.featured) ? "orange" : "gold"
                              }
                            }}
                            aria-label={isStarred(project.id, project.featured) ? "Remove from featured" : "Add to featured"}
                          >
                            <Star />
                          </IconButton>
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
                  </motion.div>
                </Grid>
              ))}
              </AnimatePresence>
              </Grid>
            ) : (
              /* Table View */
              <TableContainer component={Paper} sx={{ mt: 2, width: "100%", overflowX: "auto" }}>
                <Table stickyHeader sx={{ minWidth: 800 }}>
                  <TableHead
                    sx={{
                      background: (theme) => theme.palette.mode === "dark"
                        ? theme.palette.vaporwave.gradient.primary
                        : "linear-gradient(135deg, rgba(138, 43, 226, 0.1), rgba(255, 20, 147, 0.1))",
                      "& .MuiTableCell-root": {
                        color: (theme) => theme.palette.mode === "dark" ? "white" : theme.palette.text.primary,
                        fontWeight: "bold",
                        fontSize: "1rem",
                        textTransform: "uppercase",
                        letterSpacing: "0.1em",
                        borderBottom: (theme) => theme.palette.mode === "dark" ? "none" : `2px solid ${theme.palette.vaporwave.purple}`,
                        padding: "20px 16px",
                        position: "relative",
                        "&:before": {
                          content: "\"\"",
                          position: "absolute",
                          bottom: 0,
                          left: 0,
                          right: 0,
                          height: "2px",
                          background: (theme) => theme.palette.mode === "dark"
                            ? theme.palette.vaporwave.gradient.secondary
                            : theme.palette.vaporwave.gradient.accent,
                        }
                      }
                    }}
                  >
                    <TableRow>
                      <TableCell sx={{ minWidth: 200, width: "20%" }}>
                        <TableSortLabel
                          active={sortBy === "name"}
                          direction={sortBy === "name" ? sortOrder : "desc"}
                          onClick={() => handleHeaderSort("name")}
                          sx={{
                            color: (theme) => theme.palette.mode === "dark" ? "white !important" : `${theme.palette.text.primary} !important`,
                            "& .MuiTableSortLabel-icon": {
                              color: (theme) => theme.palette.mode === "dark" ? "white !important" : `${theme.palette.text.primary} !important`,
                            },
                            "&:hover": {
                              color: (theme) => `${theme.palette.vaporwave.green} !important`,
                              textShadow: (theme) => theme.palette.mode === "dark"
                                ? `0 0 10px ${theme.palette.vaporwave.green}`
                                : `0 0 5px ${theme.palette.vaporwave.green}`,
                            },
                            "&.Mui-active": {
                              color: (theme) => `${theme.palette.vaporwave.green} !important`,
                              textShadow: (theme) => theme.palette.mode === "dark"
                                ? `0 0 15px ${theme.palette.vaporwave.green}`
                                : `0 0 8px ${theme.palette.vaporwave.green}`,
                              "& .MuiTableSortLabel-icon": {
                                color: (theme) => `${theme.palette.vaporwave.green} !important`,
                              }
                            }
                          }}
                        >
                          Project
                        </TableSortLabel>
                      </TableCell>
                      <TableCell
                        sx={{
                          minWidth: 250,
                          width: "35%",
                          "&:hover": {
                            color: (theme) => theme.palette.vaporwave.blueGreen,
                            textShadow: (theme) => theme.palette.mode === "dark"
                              ? `0 0 8px ${theme.palette.vaporwave.blueGreen}`
                              : `0 0 4px ${theme.palette.vaporwave.blueGreen}`,
                          }
                        }}
                      >
                        Description
                      </TableCell>
                      <TableCell align="center" sx={{ minWidth: 100, width: "10%" }}>
                        <TableSortLabel
                          active={sortBy === "stars"}
                          direction={sortBy === "stars" ? sortOrder : "desc"}
                          onClick={() => handleHeaderSort("stars")}
                          sx={{
                            color: (theme) => theme.palette.mode === "dark" ? "white !important" : `${theme.palette.text.primary} !important`,
                            "& .MuiTableSortLabel-icon": {
                              color: (theme) => theme.palette.mode === "dark" ? "white !important" : `${theme.palette.text.primary} !important`,
                            },
                            "&:hover": {
                              color: (theme) => `${theme.palette.vaporwave.pink} !important`,
                              textShadow: (theme) => theme.palette.mode === "dark"
                                ? `0 0 10px ${theme.palette.vaporwave.pink}`
                                : `0 0 5px ${theme.palette.vaporwave.pink}`,
                            },
                            "&.Mui-active": {
                              color: (theme) => `${theme.palette.vaporwave.pink} !important`,
                              textShadow: (theme) => theme.palette.mode === "dark"
                                ? `0 0 15px ${theme.palette.vaporwave.pink}`
                                : `0 0 8px ${theme.palette.vaporwave.pink}`,
                              "& .MuiTableSortLabel-icon": {
                                color: (theme) => `${theme.palette.vaporwave.pink} !important`,
                              }
                            }
                          }}
                        >
                          Stars
                        </TableSortLabel>
                      </TableCell>
                      <TableCell align="center" sx={{ minWidth: 120, width: "12%" }}>
                        <TableSortLabel
                          active={sortBy === "downloads"}
                          direction={sortBy === "downloads" ? sortOrder : "desc"}
                          onClick={() => handleHeaderSort("downloads")}
                          sx={{
                            color: (theme) => theme.palette.mode === "dark" ? "white !important" : `${theme.palette.text.primary} !important`,
                            "& .MuiTableSortLabel-icon": {
                              color: (theme) => theme.palette.mode === "dark" ? "white !important" : `${theme.palette.text.primary} !important`,
                            },
                            "&:hover": {
                              color: (theme) => `${theme.palette.vaporwave.blueGreen} !important`,
                              textShadow: (theme) => theme.palette.mode === "dark"
                                ? `0 0 10px ${theme.palette.vaporwave.blueGreen}`
                                : `0 0 5px ${theme.palette.vaporwave.blueGreen}`,
                            },
                            "&.Mui-active": {
                              color: (theme) => `${theme.palette.vaporwave.blueGreen} !important`,
                              textShadow: (theme) => theme.palette.mode === "dark"
                                ? `0 0 15px ${theme.palette.vaporwave.blueGreen}`
                                : `0 0 8px ${theme.palette.vaporwave.blueGreen}`,
                              "& .MuiTableSortLabel-icon": {
                                color: (theme) => `${theme.palette.vaporwave.blueGreen} !important`,
                              }
                            }
                          }}
                        >
                          Downloads/Week
                        </TableSortLabel>
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{
                          minWidth: 150,
                          width: "15%",
                          "&:hover": {
                            color: (theme) => theme.palette.vaporwave.purple,
                            textShadow: (theme) => theme.palette.mode === "dark"
                              ? `0 0 8px ${theme.palette.vaporwave.purple}`
                              : `0 0 4px ${theme.palette.vaporwave.purple}`,
                          }
                        }}
                      >
                        Technologies
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{
                          minWidth: 120,
                          width: "8%",
                          "&:hover": {
                            color: (theme) => theme.palette.vaporwave.green,
                            textShadow: (theme) => theme.palette.mode === "dark"
                              ? `0 0 8px ${theme.palette.vaporwave.green}`
                              : `0 0 4px ${theme.palette.vaporwave.green}`,
                          }
                        }}
                      >
                        Links
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredProjects.map((project) => (
                      <TableRow key={project.id} hover>
                        <TableCell>
                          <Box display="flex" alignItems="center" gap={1}>
                            <IconButton
                              onClick={() => toggleStar(project.id, project.featured)}
                              size="small"
                              sx={{
                                color: isStarred(project.id, project.featured) ? "gold" : "action.disabled",
                              }}
                            >
                              <Star fontSize="small" />
                            </IconButton>
                            <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                              {project.title}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell sx={{ minWidth: 250, maxWidth: 400 }}>
                          <Typography variant="body2" color="text.secondary" sx={{
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                            lineHeight: 1.4
                          }}>
                            {project.description}
                          </Typography>
                        </TableCell>
                        <TableCell align="center">
                          {project.stars ? (
                            <Chip
                              icon={<Star sx={{ fontSize: "0.8rem" }} />}
                              label={project.stars}
                              size="small"
                              color="warning"
                            />
                          ) : (
                            <Typography variant="body2" color="text.disabled">-</Typography>
                          )}
                        </TableCell>
                        <TableCell align="center">
                          {project.downloadsPerWeek ? (
                            <Chip
                              label={`${shortNumber(project.downloadsPerWeek)}/wk`}
                              size="small"
                              color="primary"
                            />
                          ) : (
                            <Typography variant="body2" color="text.disabled">-</Typography>
                          )}
                        </TableCell>
                        <TableCell align="center">
                          <Box display="flex" flexWrap="wrap" gap={0.5} justifyContent="center">
                            {(project.technologies || []).slice(0, 3).map((tech, i) => (
                              <Chip key={i} label={tech} size="small" variant="outlined" />
                            ))}
                            {(project.technologies || []).length > 3 && (
                              <Chip label={`+${(project.technologies || []).length - 3}`} size="small" variant="outlined" />
                            )}
                          </Box>
                        </TableCell>
                        <TableCell align="center">
                          <Box display="flex" gap={0.5} justifyContent="center">
                            {project.github?.url && (
                              <IconButton
                                component={Link}
                                href={project.github.url}
                                target="_blank"
                                size="small"
                                aria-label={`View ${project.title} on GitHub`}
                              >
                                <GitHub fontSize="small" />
                              </IconButton>
                            )}
                            {(project.liveUrl || project.homepage) && (
                              <IconButton
                                component={Link}
                                href={project.liveUrl || project.homepage}
                                target="_blank"
                                size="small"
                                aria-label={`Visit ${project.title} live site`}
                              >
                                <Launch fontSize="small" />
                              </IconButton>
                            )}
                          </Box>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}

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
