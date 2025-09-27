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
}

const SEO: React.FC<SEOProps> = ({
  title = "Victor Williams - Software Developer & Digital Creative",
  description = "Passionate developer creating innovative digital experiences with modern web technologies. Specializing in React, TypeScript, and full-stack development.",
  keywords = "software developer, web developer, react, typescript, javascript, portfolio, philadelphia",
  author = "Victor Williams",
  image = "/assets/og-image.jpg",
  url = "https://vaporjawn.github.io",
  type = "website",
}) => {
  const siteTitle = "Victor Williams Portfolio";
  const fullTitle = title.includes(siteTitle)
    ? title
    : `${title} | ${siteTitle}`;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={url} />

      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={siteTitle} />

      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:creator" content="@vaporjawn" />

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
          image: image,
          jobTitle: "Software Developer",
          worksFor: {
            "@type": "Organization",
            name: "Freelance",
          },
          alumniOf: "Temple University",
          knowsAbout: ["React", "TypeScript", "JavaScript", "Web Development"],
          sameAs: [
            "https://github.com/Vaporjawn",
            "https://linkedin.com/in/victorwilliams",
          ],
        })}
      </script>
    </Helmet>
  );
};

export default SEO;
