import React, { useState, useMemo } from "react";
import {
  Box,
  Container,
  Typography,
  TextField,
  Chip,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  InputAdornment,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Stack,
  useTheme,
  alpha,
} from "@mui/material";
import { Search as SearchIcon, CalendarToday, AccessTime } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import SEO from "../../components/SEO/SEO";
import { BlogPost, BlogFilter } from "../../types/blog";
import { filterBlogPosts, getAllTags, formatDate } from "../../utils/blogUtils";

// Import blog posts - in a real app, these would be loaded dynamically
// For now, we'll use placeholder data until actual .mdx files are created
const PLACEHOLDER_POSTS: BlogPost[] = [
  {
    title: "Building a Modern Portfolio with React + TypeScript",
    description: "A comprehensive guide to creating a professional portfolio website using React, TypeScript, and modern web technologies.",
    date: "2025-12-25",
    author: "Victor Williams",
    tags: ["React", "TypeScript", "Web Development", "Portfolio"],
    image: "/assets/blog/portfolio-hero.jpg",
    readTime: 8,
    published: true,
    slug: "building-modern-portfolio",
    content: "",
    excerpt: "Creating a standout portfolio is essential for any developer looking to showcase their skills and attract opportunities...",
  },
  {
    title: "Mastering Core Web Vitals for Peak Performance",
    description: "Learn how to optimize your website for Google's Core Web Vitals metrics - FCP, LCP, FID, CLS, and TTFB.",
    date: "2025-12-20",
    author: "Victor Williams",
    tags: ["Performance", "Web Vitals", "Optimization", "SEO"],
    image: "/assets/blog/web-vitals-hero.jpg",
    readTime: 10,
    published: true,
    slug: "mastering-core-web-vitals",
    content: "",
    excerpt: "In 2021, Google made Core Web Vitals a ranking factor for search results. If you want your website to rank well...",
  },
  {
    title: "Integrating Sentry and Analytics in Production React Apps",
    description: "Complete guide to implementing Sentry error tracking, performance monitoring, and Google Analytics 4.",
    date: "2025-12-18",
    author: "Victor Williams",
    tags: ["Sentry", "Analytics", "Monitoring", "React", "Production"],
    image: "/assets/blog/sentry-analytics-hero.jpg",
    readTime: 12,
    published: true,
    slug: "sentry-analytics-production",
    content: "",
    excerpt: "You've built an amazing React application, but how do you know if it's working correctly for all your users?...",
  },
];

const BlogListPage: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const [filter, setFilter] = useState<BlogFilter>({
    searchQuery: "",
    sortBy: "date",
    sortOrder: "desc",
  });

  // Get all unique tags from posts
  const allTags = useMemo(() => getAllTags(PLACEHOLDER_POSTS), []);

  // Apply filters
  const filteredPosts = useMemo(() =>
    filterBlogPosts(PLACEHOLDER_POSTS, filter),
    [filter]
  );

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(prev => ({ ...prev, searchQuery: event.target.value }));
  };

  const handleTagClick = (tag: string) => {
    setFilter(prev => ({
      ...prev,
      tag: prev.tag === tag ? undefined : tag,
    }));
  };

  const handleSortChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(prev => ({ ...prev, sortBy: event.target.value }));
  };

  const handlePostClick = (slug: string) => {
    navigate(`/blog/${slug}`);
  };

  return (
    <>
      <SEO
        title="Blog - Victor Williams"
        description="Technical articles about web development, React, TypeScript, performance optimization, and software engineering best practices."
        type="website"
        keywords="blog, web development, React, TypeScript, performance, tutorials"
      />

      <Box
        component="main"
        sx={{
          minHeight: "100vh",
          pt: { xs: 12, md: 16 },
          pb: 8,
          background: `linear-gradient(180deg, ${alpha(theme.palette.primary.main, 0.05)} 0%, ${theme.palette.background.default} 100%)`,
        }}
      >
        <Container maxWidth="lg">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Box textAlign="center" mb={6}>
              <Typography
                variant="h1"
                sx={{
                  fontSize: { xs: "2.5rem", md: "3.5rem" },
                  fontWeight: 800,
                  mb: 2,
                  background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Technical Blog
              </Typography>
              <Typography
                variant="h5"
                color="text.secondary"
                sx={{ maxWidth: 600, mx: "auto" }}
              >
                Insights on web development, performance optimization, and software engineering best practices
              </Typography>
            </Box>
          </motion.div>

          {/* Search and Filter Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Box mb={6}>
              <Grid container spacing={3} mb={3}>
                <Grid item xs={12} md={8}>
                  <TextField
                    fullWidth
                    placeholder="Search articles..."
                    value={filter.searchQuery}
                    onChange={handleSearchChange}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon color="action" />
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 2,
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <FormControl fullWidth>
                    <InputLabel>Sort By</InputLabel>
                    <Select
                      value={filter.sortBy}
                      label="Sort By"
                      onChange={handleSortChange}
                      sx={{ borderRadius: 2 }}
                    >
                      <MenuItem value="date">Most Recent</MenuItem>
                      <MenuItem value="title">Title (A-Z)</MenuItem>
                      <MenuItem value="readTime">Read Time</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>

              {/* Tag Filter */}
              {allTags.length > 0 && (
                <Box>
                  <Typography variant="subtitle2" color="text.secondary" mb={1.5}>
                    Filter by topic:
                  </Typography>
                  <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                    {allTags.map(tag => (
                      <Chip
                        key={tag}
                        label={tag}
                        onClick={() => handleTagClick(tag)}
                        color={filter.tag === tag ? "primary" : "default"}
                        variant={filter.tag === tag ? "filled" : "outlined"}
                        sx={{
                          mb: 1,
                          transition: "all 0.2s",
                          "&:hover": {
                            transform: "translateY(-2px)",
                          },
                        }}
                      />
                    ))}
                  </Stack>
                </Box>
              )}
            </Box>
          </motion.div>

          {/* Blog Posts Grid */}
          {filteredPosts.length === 0 ? (
            <Box textAlign="center" py={8}>
              <Typography variant="h5" color="text.secondary" gutterBottom>
                No articles found
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Try adjusting your search or filters
              </Typography>
            </Box>
          ) : (
            <Grid container spacing={4}>
              {filteredPosts.map((post, index) => (
                <Grid item xs={12} md={6} key={post.slug}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 * index }}
                  >
                    <Card
                      sx={{
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        borderRadius: 3,
                        transition: "all 0.3s",
                        "&:hover": {
                          transform: "translateY(-8px)",
                          boxShadow: theme.shadows[12],
                        },
                      }}
                    >
                      <CardActionArea onClick={() => handlePostClick(post.slug)}>
                        {post.image && (
                          <CardMedia
                            component="img"
                            height="220"
                            image={post.image}
                            alt={post.title}
                            sx={{
                              objectFit: "cover",
                            }}
                          />
                        )}
                        <CardContent sx={{ flexGrow: 1, p: 3 }}>
                          <Box mb={2}>
                            <Stack direction="row" spacing={1} mb={1.5}>
                              {post.tags.slice(0, 3).map(tag => (
                                <Chip
                                  key={tag}
                                  label={tag}
                                  size="small"
                                  sx={{
                                    bgcolor: alpha(theme.palette.primary.main, 0.1),
                                    color: theme.palette.primary.main,
                                    fontWeight: 600,
                                  }}
                                />
                              ))}
                            </Stack>
                          </Box>

                          <Typography
                            variant="h5"
                            component="h2"
                            gutterBottom
                            sx={{
                              fontWeight: 700,
                              mb: 1.5,
                              display: "-webkit-box",
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: "vertical",
                              overflow: "hidden",
                            }}
                          >
                            {post.title}
                          </Typography>

                          <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{
                              mb: 2,
                              display: "-webkit-box",
                              WebkitLineClamp: 3,
                              WebkitBoxOrient: "vertical",
                              overflow: "hidden",
                            }}
                          >
                            {post.excerpt || post.description}
                          </Typography>

                          <Stack
                            direction="row"
                            spacing={2}
                            alignItems="center"
                            sx={{ mt: "auto" }}
                          >
                            <Stack direction="row" spacing={0.5} alignItems="center">
                              <CalendarToday sx={{ fontSize: 16, color: "text.secondary" }} />
                              <Typography variant="caption" color="text.secondary">
                                {formatDate(post.date)}
                              </Typography>
                            </Stack>
                            <Stack direction="row" spacing={0.5} alignItems="center">
                              <AccessTime sx={{ fontSize: 16, color: "text.secondary" }} />
                              <Typography variant="caption" color="text.secondary">
                                {post.readTime} min read
                              </Typography>
                            </Stack>
                          </Stack>
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          )}
        </Container>
      </Box>
    </>
  );
};

export default BlogListPage;
