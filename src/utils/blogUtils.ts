import matter from "gray-matter";
import { BlogPost, BlogFrontmatter, BlogFilter } from "../types/blog";

/**
 * Parse MDX/Markdown content with frontmatter
 */
export const parseBlogPost = (slug: string, rawContent: string): BlogPost => {
  const { data, content } = matter(rawContent);
  const frontmatter = data as BlogFrontmatter;

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
