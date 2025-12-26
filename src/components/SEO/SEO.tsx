import React from "react";
import { Helmet } from "react-helmet-async";

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
