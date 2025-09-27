import React, { useState } from "react";
import { Box, Skeleton, SxProps, Theme } from "@mui/material";
import { useIntersectionObserver } from "../../hooks/useIntersectionObserver";

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
