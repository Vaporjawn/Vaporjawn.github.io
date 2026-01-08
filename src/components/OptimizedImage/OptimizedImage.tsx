/**
 * OptimizedImage Component Module
 *
 * Performance-optimized image component with lazy loading, intersection observer,
 * loading skeletons, and error fallbacks. Automatically defers off-screen image
 * loading until images enter viewport, reducing initial page load time and
 * improving Core Web Vitals scores.
 *
 * Features:
 * - Intersection Observer-based lazy loading with configurable rootMargin
 * - Priority loading flag for above-the-fold images
 * - Smooth fade-in transition on image load
 * - Material-UI Skeleton placeholder during loading
 * - Error handling with fallback placeholder images
 * - Aspect ratio preservation to prevent layout shift
 * - Native browser lazy loading attribute support
 * - Flexible object-fit control for responsive images
 *
 * @module components/OptimizedImage
 * @component
 */
import React, { useState } from "react";
import { Box, Skeleton, SxProps, Theme } from "@mui/material";
import { useIntersectionObserver } from "../../hooks/useIntersectionObserver";

/**
 * OptimizedImage component props interface
 *
 * @interface OptimizedImageProps
 * @property {string} src - Image source URL
 * @property {string} alt - Alternative text for accessibility and SEO
 * @property {number | string} [width="100%"] - Image width (CSS units or number for pixels)
 * @property {number | string} [height="auto"] - Image height (CSS units or number for pixels)
 * @property {string} [aspectRatio] - CSS aspect-ratio value to prevent layout shift (e.g., "16/9", "1/1")
 * @property {"cover" | "contain" | "fill" | "scale-down" | "none"} [objectFit="cover"] - CSS object-fit behavior
 * @property {boolean} [priority=false] - Load immediately (bypass lazy loading) for above-the-fold images
 * @property {string} [placeholder="/assets/placeholder.jpg"] - Fallback image URL if main image fails to load
 * @property {SxProps<Theme>} [sx={}] - Material-UI sx prop for custom styling
 */
interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number | string;
  height?: number | string;
  aspectRatio?: string;
  objectFit?: "cover" | "contain" | "fill" | "scale-down" | "none";
  priority?: boolean;
  placeholder?: string;
  sx?: SxProps<Theme>;
}

/**
 * OptimizedImage Component
 *
 * High-performance image component that combines intersection observer-based lazy loading
 * with Material-UI Skeleton placeholders and smooth transitions. Automatically defers
 * loading of off-screen images until they approach the viewport, significantly improving
 * initial page load performance and Core Web Vitals metrics.
 *
 * The component tracks image loading state and visibility, showing skeleton placeholders
 * during load and gracefully handling errors with fallback images. Priority flag allows
 * bypassing lazy loading for critical above-the-fold images.
 *
 * @param {OptimizedImageProps} props - Image configuration props
 * @param {string} props.src - Source URL of the image
 * @param {string} props.alt - Descriptive alternative text for accessibility
 * @param {number | string} [props.width="100%"] - Container width
 * @param {number | string} [props.height="auto"] - Container height
 * @param {string} [props.aspectRatio] - CSS aspect ratio to prevent layout shift
 * @param {"cover" | "contain" | "fill" | "scale-down" | "none"} [props.objectFit="cover"] - Image fit behavior
 * @param {boolean} [props.priority=false] - Bypass lazy loading for critical images
 * @param {string} [props.placeholder] - Fallback image on error
 * @param {SxProps<Theme>} [props.sx] - Custom MUI styling
 * @returns {JSX.Element} Optimized image with loading states
 *
 * @example
 * // Basic lazy-loaded image
 * <OptimizedImage
 *   src="/images/hero.jpg"
 *   alt="Hero banner"
 *   aspectRatio="16/9"
 * />
 *
 * @example
 * // Priority image (above-the-fold)
 * <OptimizedImage
 *   src="/images/profile.jpg"
 *   alt="Profile photo"
 *   width={200}
 *   height={200}
 *   aspectRatio="1/1"
 *   objectFit="cover"
 *   priority={true}
 * />
 */
const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  width = "100%",
  height = "auto",
  aspectRatio,
  objectFit = "cover",
  priority = false,
  placeholder,
  sx = {},
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [imgRef, isVisible] = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: "50px",
  });

  const shouldLoad = priority || isVisible;

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleError = () => {
    setHasError(true);
    setIsLoaded(true);
  };

  return (
    <Box
      ref={imgRef}
      sx={{
        width,
        height,
        aspectRatio,
        position: "relative",
        overflow: "hidden",
        ...sx,
      }}
    >
      {!isLoaded && !hasError && (
        <Skeleton
          variant="rectangular"
          width="100%"
          height="100%"
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: 1,
          }}
        />
      )}

      {shouldLoad && (
        <Box
          component="img"
          src={hasError ? placeholder || "/assets/placeholder.jpg" : src}
          alt={alt}
          onLoad={handleLoad}
          onError={handleError}
          loading={priority ? "eager" : "lazy"}
          sx={{
            width: "100%",
            height: "100%",
            objectFit,
            opacity: isLoaded ? 1 : 0,
            transition: "opacity 0.3s ease-in-out",
            display: "block",
          }}
        />
      )}
    </Box>
  );
};

export default OptimizedImage;
