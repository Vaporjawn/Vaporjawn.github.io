/**
 * @module utils/__tests__/blogLoader.test
 * @description
 * Test suite for blogLoader. Runs against the real files in `content/blog/` (via
 * Vite's `import.meta.glob`, which Vitest supports natively) rather than mocks —
 * the bug this replaces (BlogPostPage/BlogListPage shipping hard-coded placeholder
 * content that never read the real files) would not have been caught by a test that
 * mocked the loading step, so this deliberately exercises the real pipeline.
 */

import { getAllBlogPosts, getBlogPostBySlug } from "../blogLoader";

describe("blogLoader", () => {
  it("loads all published posts from content/blog", () => {
    const posts = getAllBlogPosts();
    expect(posts.length).toBeGreaterThanOrEqual(3);
    expect(posts.map((p) => p.slug)).toEqual(
      expect.arrayContaining([
        "building-modern-portfolio",
        "mastering-core-web-vitals",
        "sentry-analytics-production",
      ])
    );
  });

  it("sorts posts newest first by date", () => {
    const posts = getAllBlogPosts();
    const dates = posts.map((p) => new Date(p.date).getTime());
    const sorted = [...dates].sort((a, b) => b - a);
    expect(dates).toEqual(sorted);
  });

  it("never returns the dev-stub placeholder content that used to ship to production", () => {
    const posts = getAllBlogPosts();
    for (const post of posts) {
      expect(post.content).not.toContain(
        "[Content would be loaded from MDX file in production]"
      );
      expect(post.content.trim().length).toBeGreaterThan(200);
    }
  });

  it("resolves a real post by slug with parsed frontmatter and content", () => {
    const post = getBlogPostBySlug("building-modern-portfolio");
    expect(post).toBeDefined();
    expect(post?.title).toBe("Building a Modern Portfolio with React + TypeScript");
    expect(post?.image).toBe("/assets/blog/portfolio-hero.jpg");
    expect(post?.tags).toContain("React");
    // Real markdown body, not stripped/truncated — includes headings past the intro.
    expect(post?.content).toContain("## Why React + TypeScript?");
    expect(post?.content).toContain("## Conclusion");
  });

  it("returns undefined for an unknown slug", () => {
    expect(getBlogPostBySlug("this-post-does-not-exist")).toBeUndefined();
  });
});
