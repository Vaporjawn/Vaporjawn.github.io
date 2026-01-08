/**
 * SEO Component Module
 *
 * Provides comprehensive SEO optimization through meta tags, Open Graph protocol,
 * Twitter Cards, and JSON-LD structured data. Handles search engine indexing,
 * social media sharing previews, and schema.org Person markup for enhanced
 * search visibility.
 *
 * Features:
 * - Basic HTML meta tags (title, description, keywords, author)
 * - Open Graph protocol for social media sharing
 * - Twitter Card meta tags for enhanced Twitter previews
 * - JSON-LD structured data with schema.org Person type
 * - Google site verification support
 * - Canonical URL management
 * - Theme color and mobile web app configuration
 *
 * @module components/SEO
 * @component
 */
import React from "react";
import { Helmet } from "react-helmet-async";

/**
 * SEO component props interface
 *
 * @interface SEOProps
 * @property {string} [title] - Page title (default: "Victor Williams - Software Developer & Digital Creative")
 * @property {string} [description] - Page description for search engines and social previews
 * @property {string} [keywords] - Comma-separated keywords for search engine indexing
 * @property {string} [author] - Content author name (default: "Victor Williams")
 * @property {string} [image] - Open Graph and Twitter Card image URL (absolute or relative)
 * @property {string} [url] - Canonical page URL (default: "https://www.vaporjawn.dev")
 * @property {string} [type] - Open Graph content type (default: "website", can be "article" for blog posts)
 * @property {string} [publishedTime] - Article published time in ISO 8601 format (for blog posts)
 * @property {string} [modifiedTime] - Article modified time in ISO 8601 format (for blog posts)
 */
interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  author?: string;
  image?: string;
  url?: string;
  type?: string;
  publishedTime?: string;
  modifiedTime?: string;
}

/**
 * SEO Component
 *
 * Comprehensive SEO component that injects meta tags, Open Graph protocol data,
 * Twitter Card information, and JSON-LD structured data into the document head.
 * Automatically constructs full URLs for images, handles canonical URLs, and
 * generates schema.org Person markup for enhanced search engine understanding.
 *
 * @param {SEOProps} props - SEO configuration props
 * @param {string} [props.title] - Page title (automatically appended with site title)
 * @param {string} [props.description] - Meta description for search results and social previews
 * @param {string} [props.keywords] - Comma-separated search keywords
 * @param {string} [props.author] - Content author name
 * @param {string} [props.image] - Preview image URL (relative paths automatically converted to absolute)
 * @param {string} [props.url] - Canonical page URL
 * @param {string} [props.type] - Open Graph content type ("website" or "article")
 * @param {string} [props.publishedTime] - ISO 8601 published timestamp (for articles)
 * @param {string} [props.modifiedTime] - ISO 8601 modified timestamp (for articles)
 * @returns {JSX.Element} Helmet component with meta tags
 *
 * @example
 * // Basic usage with defaults
 * <SEO />
 *
 * @example
 * // Blog post with custom metadata
 * <SEO
 *   title="Building Modern React Applications"
 *   description="Learn best practices for React development"
 *   type="article"
 *   publishedTime="2024-01-15T10:00:00Z"
 *   image="/blog/react-thumbnail.jpg"
 * />
 */
const SEO: React.FC<SEOProps> = ({
  title = "Victor Williams - Software Developer & Digital Creative",
  description = "Passionate developer creating innovative digital experiences with modern web technologies. Specializing in React, TypeScript, and full-stack development.",
  keywords = "software developer, web developer, react, typescript, javascript, portfolio, philadelphia",
  author = "Victor Williams",
  image = "/og-image.jpg",
  url = "https://www.vaporjawn.dev",
  type = "website",
  publishedTime,
  modifiedTime,
}) => {
  const siteTitle = "Victor Williams Portfolio";
  const fullTitle = title.includes(siteTitle)
    ? title
    : `${title} | ${siteTitle}`;
  const fullImageUrl = image.startsWith("http") ? image : `${url}${image}`;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="robots" content="index, follow" />
      <meta name="googlebot" content="index, follow" />
      <meta name="google-site-verification" content={import.meta.env.VITE_GOOGLE_SITE_VERIFICATION || ""} />
      <link rel="canonical" href={url} />

      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImageUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={fullTitle} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={siteTitle} />
      <meta property="og:locale" content="en_US" />
      {publishedTime && <meta property="article:published_time" content={publishedTime} />}
      {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}

      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@vaporjawn" />
      <meta name="twitter:creator" content="@vaporjawn" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImageUrl} />
      <meta name="twitter:image:alt" content={fullTitle} />

      {/* Additional Meta Tags */}
      <meta name="theme-color" content="#6366f1" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content={siteTitle} />

      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: author,
          url: url,
          image: fullImageUrl,
          jobTitle: "Chief Technology Officer & Senior Software Engineer",
          worksFor: {
            "@type": "Organization",
            name: "Kids Care Finder",
          },
          alumniOf: {
            "@type": "Organization",
            name: "Temple University",
          },
          address: {
            "@type": "PostalAddress",
            addressLocality: "Philadelphia",
            addressRegion: "PA",
          },
          knowsAbout: ["React", "TypeScript", "JavaScript", "Web Development", "Full Stack", "Node.js", "Python", "Azure", "AWS"],
          sameAs: [
            "https://github.com/Vaporjawn",
            "https://linkedin.com/in/victorwilliams719",
            "https://twitter.com/vaporjawn",
            "https://bsky.app/profile/vaporjawn.bsky.social",
          ],
        })}
      </script>
    </Helmet>
  );
};

export default SEO;
