import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SITE_URL = "https://www.vaporjawn.dev";
const SITE_NAME = "Victor Williams - Full-Stack Developer";
const SITE_DESCRIPTION =
  "Portfolio and blog of Victor Williams - Expert Full-Stack Developer specializing in React, TypeScript, Node.js, and cloud solutions";

/**
 * @typedef {Object} BlogPost
 * @property {string} slug
 * @property {string} title
 * @property {string} description
 * @property {string} date
 * @property {string} author
 * @property {string[]} tags
 */

/**
 * Read blog posts from content/blog directory
 * @returns {BlogPost[]}
 */
const getBlogPosts = () => {
  const blogDir = path.join(__dirname, "../content/blog");
  const files = fs.readdirSync(blogDir);

  /** @type {BlogPost[]} */
  const posts = [];

  files.forEach((file) => {
    if (file.endsWith(".md") || file.endsWith(".mdx")) {
      const content = fs.readFileSync(path.join(blogDir, file), "utf-8");
      const slug = file.replace(/\.(md|mdx)$/, "");

      // Extract frontmatter (simplified)
      const frontmatterMatch = content.match(/^---\n([\s\S]+?)\n---/);
      if (frontmatterMatch) {
        const frontmatter = frontmatterMatch[1];
        const title =
          frontmatter.match(/title:\s*["'](.+?)["']/)?.[1] || slug;
        const description =
          frontmatter.match(/description:\s*["'](.+?)["']/)?.[1] || "";
        const date =
          frontmatter.match(/date:\s*["']?(.+?)["']?\n/)?.[1] ||
          new Date().toISOString();
        const author =
          frontmatter.match(/author:\s*["'](.+?)["']/)?.[1] ||
          "Victor Williams";
        const tagsMatch = frontmatter.match(/tags:\s*\[(.+?)\]/);
        const tags = tagsMatch
          ? tagsMatch[1].split(",").map((t) => t.trim().replace(/["']/g, ""))
          : [];

        posts.push({ slug, title, description, date, author, tags });
      }
    }
  });

  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
};

const generateRSSFeed = () => {
  const posts = getBlogPosts();

  const rssItems = posts
    .map(
      (post) => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <description><![CDATA[${post.description}]]></description>
      <link>${SITE_URL}/blog/${post.slug}</link>
      <guid isPermaLink="true">${SITE_URL}/blog/${post.slug}</guid>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <author>${post.author}</author>
      ${post.tags.map((tag) => `<category>${tag}</category>`).join("\n      ")}
    </item>`
    )
    .join("\n");

  const rssFeed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${SITE_NAME}</title>
    <description>${SITE_DESCRIPTION}</description>
    <link>${SITE_URL}</link>
    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml"/>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <language>en-US</language>
    ${rssItems}
  </channel>
</rss>`;

  const publicDir = path.join(__dirname, "../public");
  fs.writeFileSync(path.join(publicDir, "rss.xml"), rssFeed);
  console.log("RSS feed generated successfully!");
};

generateRSSFeed();
