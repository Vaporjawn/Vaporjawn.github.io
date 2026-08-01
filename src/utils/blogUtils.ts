import { load as loadYaml } from "js-yaml";
import { BlogPost, BlogFrontmatter, BlogFilter } from "../types/blog";

// Matches a leading `---\n<yaml>\n---` frontmatter block, capturing the YAML body and
// the remaining markdown separately.
const FRONTMATTER_PATTERN = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/;

/**
 * Parse MDX/Markdown content with frontmatter.
 *
 * Deliberately does NOT use `gray-matter` here, even though it's a project
 * dependency (used server-side in `scripts/generate-rss.mjs`, where it's fine) —
 * `parseBlogPost` runs in the browser bundle (via `utils/blogLoader.ts`'s
 * `import.meta.glob`), and gray-matter's Node-oriented internals (Buffer detection,
 * an `eval`-based engine loader — Vite's own build output warns about exactly this:
 * "Use of eval in gray-matter/lib/engines.js... may cause issues with minification")
 * throw `TypeError: expected input to be a string or buffer` once bundled and
 * minified for production, even though the exact same code works fine in dev and in
 * Vitest. `js-yaml` (a real gray-matter dependency itself, just used directly here)
 * is a pure, browser-safe YAML parser with no such issue.
 */
export const parseBlogPost = (slug: string, rawContent: string): BlogPost => {
  const match = rawContent.match(FRONTMATTER_PATTERN);
  const frontmatter = (match ? loadYaml(match[1]) : {}) as BlogFrontmatter;
  const content = (match ? match[2] : rawContent).trim();

  // Generate excerpt from content (first 160 characters)
  const excerpt = content
    .replace(/^#+\s+.*$/gm, "") // Remove headings
    .replace(/[*_`]/g, "") // Remove markdown formatting
    .trim()
    .substring(0, 160) + "...";

  return {
    ...frontmatter,
    slug,
    content,
    excerpt,
  };
};

/**
 * Filter and sort blog posts
 */
export const filterBlogPosts = (
  posts: BlogPost[],
  filter: BlogFilter
): BlogPost[] => {
  let filtered = [...posts];

  // Filter by tag
  if (filter.tag) {
    filtered = filtered.filter(post => post.tags.includes(filter.tag!));
  }

  // Filter by search query
  if (filter.searchQuery) {
    const query = filter.searchQuery.toLowerCase();
    filtered = filtered.filter(
      post =>
        post.title.toLowerCase().includes(query) ||
        post.description.toLowerCase().includes(query) ||
        post.tags.some(tag => tag.toLowerCase().includes(query))
    );
  }

  // Sort posts
  const sortBy = filter.sortBy || "date";
  const sortOrder = filter.sortOrder || "desc";

  filtered.sort((a, b) => {
    let comparison = 0;
    switch (sortBy) {
      case "date":
        comparison = new Date(a.date).getTime() - new Date(b.date).getTime();
        break;
      case "title":
        comparison = a.title.localeCompare(b.title);
        break;
      case "readTime":
        comparison = a.readTime - b.readTime;
        break;
    }
    return sortOrder === "asc" ? comparison : -comparison;
  });

  return filtered;
};

/**
 * Get all unique tags from posts
 */
export const getAllTags = (posts: BlogPost[]): string[] => {
  const tagSet = new Set<string>();
  posts.forEach(post => {
    post.tags.forEach(tag => tagSet.add(tag));
  });
  return Array.from(tagSet).sort();
};

/**
 * Format date for display
 */
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};
