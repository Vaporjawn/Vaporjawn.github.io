import { useState, useEffect, useRef, ReactNode, useCallback } from "react";
import { Box, CircularProgress } from "@mui/material";

interface PullToRefreshProps {
  onRefresh: () => Promise<void>;
  children: ReactNode;
  threshold?: number;
}

const PullToRefresh: React.FC<PullToRefreshProps> = ({
  onRefresh,
  children,
  threshold = 80,
}) => {
  const [pullDistance, setPullDistance] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [startY, setStartY] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleTouchStart = useCallback((e: TouchEvent) => {
    if (window.scrollY === 0) {
      setStartY(e.touches[0].clientY);
    }
  }, []);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (startY === 0 || window.scrollY > 0 || isRefreshing) return;

    const currentY = e.touches[0].clientY;
    const distance = currentY - startY;

    if (distance > 0) {
      setPullDistance(Math.min(distance, threshold * 1.5));
    }
  }, [startY, isRefreshing, threshold]);

  const handleTouchEnd = useCallback(async () => {
    if (pullDistance >= threshold && !isRefreshing) {
      setIsRefreshing(true);
      try {
        await onRefresh();
      } catch (error) {
        console.error("Refresh failed:", error);
      } finally {
        setIsRefreshing(false);
      }
    }
    setPullDistance(0);
    setStartY(0);
  }, [pullDistance, threshold, isRefreshing, onRefresh]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.addEventListener("touchstart", handleTouchStart, {
      passive: true,
    });
    container.addEventListener("touchmove", handleTouchMove, { passive: true });
    container.addEventListener("touchend", handleTouchEnd);

    return () => {
      container.removeEventListener("touchstart", handleTouchStart);
      container.removeEventListener("touchmove", handleTouchMove);
      container.removeEventListener("touchend", handleTouchEnd);
    };
  }, [startY, pullDistance, isRefreshing, handleTouchStart, handleTouchMove, handleTouchEnd]);

  const pullProgress = Math.min((pullDistance / threshold) * 100, 100);

  return (
    <Box ref={containerRef} sx={{ position: "relative", overflow: "hidden" }}>
      {/* Pull indicator */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: pullDistance,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: isRefreshing
            ? "height 0.3s ease-out"
            : "none",
          zIndex: 1000,
          bgcolor: "background.paper",
        }}
      >
        {(pullDistance > 0 || isRefreshing) && (
          <CircularProgress
            variant={isRefreshing ? "indeterminate" : "determinate"}
            value={pullProgress}
            size={30}
          />
        )}
      </Box>

      {/* Content */}
      <Box
        sx={{
          transform: `translateY(${pullDistance}px)`,
          transition: pullDistance === 0 ? "transform 0.3s ease-out" : "none",
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default PullToRefresh;
