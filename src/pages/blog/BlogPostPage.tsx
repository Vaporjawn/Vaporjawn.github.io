import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  Chip,
  Stack,
  Button,
  IconButton,
  Divider,
  useTheme,
  alpha,
  CircularProgress,
} from "@mui/material";
import {
  ArrowBack,
  CalendarToday,
  AccessTime,
  Share as ShareIcon,
  Twitter,
  LinkedIn,
  ContentCopy,
} from "@mui/icons-material";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import SEO from "../../components/SEO/SEO";
import { BlogPost } from "../../types/blog";
import { formatDate } from "../../utils/blogUtils";
import BlueskyIcon from "../../assets/logos/Bluesky_Logo.svg";

// Placeholder posts - in production, these would be dynamically loaded
const PLACEHOLDER_POSTS: Record<string, BlogPost> = {
  "building-modern-portfolio": {
    title: "Building a Modern Portfolio with React + TypeScript",
    description: "A comprehensive guide to creating a professional portfolio website using React, TypeScript, and modern web technologies.",
    date: "2025-12-25",
    author: "Victor Williams",
    tags: ["React", "TypeScript", "Web Development", "Portfolio"],
    image: "/assets/blog/portfolio-hero.jpg",
    readTime: 8,
    published: true,
    slug: "building-modern-portfolio",
    content: `
Creating a standout portfolio is essential for any developer looking to showcase their skills and attract opportunities. In this guide, I'll walk you through the process of building a modern, performant portfolio using React and TypeScript.

## Why React + TypeScript?

React has become the de facto standard for building modern web applications, and for good reason...

[Content would be loaded from MDX file in production]
    `,
    excerpt: "Creating a standout portfolio is essential for any developer looking to showcase their skills...",
  },
  "mastering-core-web-vitals": {
    title: "Mastering Core Web Vitals for Peak Performance",
    description: "Learn how to optimize your website for Google's Core Web Vitals metrics.",
    date: "2025-12-20",
    author: "Victor Williams",
    tags: ["Performance", "Web Vitals", "Optimization", "SEO"],
    image: "/assets/blog/web-vitals-hero.jpg",
    readTime: 10,
    published: true,
    slug: "mastering-core-web-vitals",
    content: `
In 2021, Google made Core Web Vitals a ranking factor for search results...

[Content would be loaded from MDX file in production]
    `,
    excerpt: "In 2021, Google made Core Web Vitals a ranking factor for search results...",
  },
  "sentry-analytics-production": {
    title: "Integrating Sentry and Analytics in Production React Apps",
    description: "Complete guide to implementing Sentry error tracking and Google Analytics 4.",
    date: "2025-12-18",
    author: "Victor Williams",
    tags: ["Sentry", "Analytics", "Monitoring", "React", "Production"],
    image: "/assets/blog/sentry-analytics-hero.jpg",
    readTime: 12,
    published: true,
    slug: "sentry-analytics-production",
    content: `
You've built an amazing React application, but how do you know if it's working correctly for all your users?...

[Content would be loaded from MDX file in production]
    `,
    excerpt: "You've built an amazing React application, but how do you know if it's working correctly...",
  },
};

const BlogPostPage: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { slug } = useParams<{ slug: string }>();

  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In production, this would load the MDX file dynamically
    if (slug && PLACEHOLDER_POSTS[slug]) {
      setPost(PLACEHOLDER_POSTS[slug]);
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, [slug]);

  const handleShare = (platform: "twitter" | "linkedin" | "bluesky" | "copy") => {
    if (!post) return;

    const url = window.location.href;
    const text = `Check out "${post.title}" by ${post.author}`;

    switch (platform) {
      case "twitter":
        window.open(
          `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`,
          "_blank"
        );
        break;
      case "linkedin":
        window.open(
          `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
          "_blank"
        );
        break;
      case "bluesky":
        window.open(
          `https://bsky.app/intent/compose?text=${encodeURIComponent(text + " " + url)}`,
          "_blank"
        );
        break;
      case "copy":
        navigator.clipboard.writeText(url);
        toast.success("Link copied to clipboard!", {
          duration: 3000,
          position: "bottom-center",
          style: {
            background: theme.palette.success.main,
            color: "#fff",
            fontWeight: 600,
          },
        });
        break;
    }
  };

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!post) {
    return (
      <Container maxWidth="md">
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          minHeight="100vh"
          textAlign="center"
        >
          <Typography variant="h2" gutterBottom>
            Article Not Found
          </Typography>
          <Typography variant="body1" color="text.secondary" mb={3}>
            The article you're looking for doesn't exist or has been removed.
          </Typography>
          <Button
            variant="contained"
            startIcon={<ArrowBack />}
            onClick={() => navigate("/blog")}
          >
            Back to Blog
          </Button>
        </Box>
      </Container>
    );
  }

  return (
    <>
      <SEO
        title={`${post.title} - Victor Williams`}
        description={post.description}
        type="article"
        keywords={post.tags.join(", ")}
        image={post.image}
        article={{
          publishedTime: post.date,
          author: post.author,
          tags: post.tags,
        }}
      />

      <Box
        component="article"
        sx={{
          minHeight: "100vh",
          pt: { xs: 10, md: 12 },
          pb: 8,
        }}
      >
        {/* Header */}
        <Container maxWidth="md">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Button
              startIcon={<ArrowBack />}
              onClick={() => navigate("/blog")}
              sx={{ mb: 3 }}
            >
              Back to Blog
            </Button>

            {/* Post Header */}
            <Box mb={4}>
              <Stack direction="row" spacing={1} mb={2} flexWrap="wrap" useFlexGap>
                {post.tags.map(tag => (
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

              <Typography
                variant="h1"
                component="h1"
                sx={{
                  fontSize: { xs: "2rem", md: "3rem" },
                  fontWeight: 800,
                  mb: 2,
                  lineHeight: 1.2,
                }}
              >
                {post.title}
              </Typography>

              <Typography
                variant="h6"
                color="text.secondary"
                sx={{ mb: 3 }}
              >
                {post.description}
              </Typography>

              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={{ xs: 1, sm: 3 }}
                alignItems={{ xs: "flex-start", sm: "center" }}
                justifyContent="space-between"
              >
                <Stack direction="row" spacing={3} alignItems="center">
                  <Stack direction="row" spacing={0.5} alignItems="center">
                    <CalendarToday sx={{ fontSize: 18, color: "text.secondary" }} />
                    <Typography variant="body2" color="text.secondary">
                      {formatDate(post.date)}
                    </Typography>
                  </Stack>
                  <Stack direction="row" spacing={0.5} alignItems="center">
                    <AccessTime sx={{ fontSize: 18, color: "text.secondary" }} />
                    <Typography variant="body2" color="text.secondary">
                      {post.readTime} min read
                    </Typography>
                  </Stack>
                </Stack>

                <Stack direction="row" spacing={1} alignItems="center">
                  <Typography variant="body2" color="text.secondary">
                    Share:
                  </Typography>
                  <IconButton
                    size="small"
                    onClick={() => handleShare("twitter")}
                    aria-label="Share on Twitter"
                  >
                    <Twitter fontSize="small" />
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={() => handleShare("linkedin")}
                    aria-label="Share on LinkedIn"
                  >
                    <LinkedIn fontSize="small" />
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={() => handleShare("bluesky")}
                    aria-label="Share on Bluesky"
                  >
                    <Box
                      component="img"
                      src={BlueskyIcon}
                      alt="Bluesky"
                      sx={{ width: 20, height: 20 }}
                    />
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={() => handleShare("copy")}
                    aria-label="Copy link"
                  >
                    <ContentCopy fontSize="small" />
                  </IconButton>
                </Stack>
              </Stack>
            </Box>

            {/* Featured Image */}
            {post.image && (
              <Box
                component="img"
                src={post.image}
                alt={post.title}
                sx={{
                  width: "100%",
                  height: "auto",
                  borderRadius: 3,
                  mb: 4,
                  boxShadow: theme.shadows[8],
                }}
              />
            )}

            <Divider sx={{ mb: 4 }} />

            {/* Post Content */}
            <Box
              sx={{
                "& h2": {
                  fontSize: "2rem",
                  fontWeight: 700,
                  mt: 5,
                  mb: 2,
                  color: theme.palette.text.primary,
                },
                "& h3": {
                  fontSize: "1.5rem",
                  fontWeight: 600,
                  mt: 4,
                  mb: 2,
                  color: theme.palette.text.primary,
                },
                "& p": {
                  fontSize: "1.125rem",
                  lineHeight: 1.8,
                  mb: 2,
                  color: theme.palette.text.secondary,
                },
                "& code": {
                  bgcolor: alpha(theme.palette.primary.main, 0.1),
                  color: theme.palette.primary.main,
                  px: 1,
                  py: 0.5,
                  borderRadius: 1,
                  fontFamily: "monospace",
                  fontSize: "0.95em",
                },
                "& pre": {
                  bgcolor: theme.palette.mode === "dark" ? "#1e1e1e" : "#f5f5f5",
                  p: 2,
                  borderRadius: 2,
                  overflow: "auto",
                  mb: 3,
                  "& code": {
                    bgcolor: "transparent",
                    color: "inherit",
                    px: 0,
                    py: 0,
                  },
                },
                "& ul, & ol": {
                  pl: 4,
                  mb: 2,
                  "& li": {
                    fontSize: "1.125rem",
                    lineHeight: 1.8,
                    mb: 1,
                    color: theme.palette.text.secondary,
                  },
                },
                "& blockquote": {
                  borderLeft: `4px solid ${theme.palette.primary.main}`,
                  pl: 3,
                  py: 1,
                  my: 3,
                  fontStyle: "italic",
                  color: theme.palette.text.secondary,
                },
                "& img": {
                  maxWidth: "100%",
                  height: "auto",
                  borderRadius: 2,
                  my: 3,
                },
                "& a": {
                  color: theme.palette.primary.main,
                  textDecoration: "none",
                  "&:hover": {
                    textDecoration: "underline",
                  },
                },
              }}
            >
              <Typography
                component="div"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            </Box>

            <Divider sx={{ my: 6 }} />

            {/* Post Footer */}
            <Box textAlign="center">
              <Typography variant="h6" gutterBottom>
                Found this helpful?
              </Typography>
              <Typography variant="body2" color="text.secondary" mb={3}>
                Share it with others or reach out with questions!
              </Typography>
              <Stack
                direction="row"
                spacing={2}
                justifyContent="center"
                flexWrap="wrap"
                useFlexGap
              >
                <Button
                  variant="outlined"
                  startIcon={<ShareIcon />}
                  onClick={() => handleShare("twitter")}
                >
                  Share on Twitter
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<ShareIcon />}
                  onClick={() => handleShare("linkedin")}
                >
                  Share on LinkedIn
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<ShareIcon />}
                  onClick={() => handleShare("bluesky")}
                >
                  Share on Bluesky
                </Button>
                <Button
                  variant="contained"
                  onClick={() => navigate("/contact")}
                >
                  Get in Touch
                </Button>
              </Stack>
            </Box>
          </motion.div>
        </Container>
      </Box>
    </>
  );
};

export default BlogPostPage;
