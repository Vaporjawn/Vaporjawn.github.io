/**
 * Loads real blog post content from `content/blog/*.md` and `*.mdx` at build time.
 *
 * Replaces the hard-coded `PLACEHOLDER_POSTS` arrays that previously shipped to
 * production in `BlogListPage.tsx`/`BlogPostPage.tsx` — those never actually read the
 * real content files, so every post rendered a truncated stub ending in the literal
 * string "[Content would be loaded from MDX file in production]".
 *
 * `import.meta.glob` with `query: "?raw"` reads each file's raw text at build time
 * (Vite inlines it — no runtime fetch), and `parseBlogPost` (gray-matter) splits
 * frontmatter from the markdown body, matching the shape `BlogPostPage` already
 * expects to render with `react-markdown`.
 *
 * @module utils/blogLoader
 */
import { parseBlogPost } from "./blogUtils";
import type { BlogPost } from "../types/blog";

const rawModules = import.meta.glob("../../content/blog/*.{md,mdx}", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

const slugFromPath = (path: string): string => {
  const fileName = path.split("/").pop() ?? path;
  return fileName.replace(/\.mdx?$/, "");
};

const allPosts: BlogPost[] = Object.entries(rawModules)
  .map(([path, raw]) => parseBlogPost(slugFromPath(path), raw))
  .filter((post) => post.published)
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

/**
 * All published blog posts, newest first.
 *
 * @example
 * ```ts
 * const posts = getAllBlogPosts();
 * ```
 */
export const getAllBlogPosts = (): BlogPost[] => allPosts;

/**
 * A single published blog post by slug, or `undefined` if no matching published
 * post exists.
 *
 * @example
 * ```ts
 * const post = getBlogPostBySlug("building-modern-portfolio");
 * ```
 */
export const getBlogPostBySlug = (slug: string): BlogPost | undefined =>
  allPosts.find((post) => post.slug === slug);
