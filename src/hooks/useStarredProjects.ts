import { useCallback, useState, useEffect } from "react";

const FEATURED_OVERRIDES_KEY = "featured-status-overrides";

// Since starred should be the same as featured, we implement localStorage overrides
// This allows users to star/unstar projects while treating starred === featured
export const useStarredProjects = () => {
  const [featuredOverrides, setFeaturedOverrides] = useState<Record<string, boolean>>({});

  // Load featured overrides from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(FEATURED_OVERRIDES_KEY);
      if (saved) {
        setFeaturedOverrides(JSON.parse(saved));
      }
    } catch (error) {
      console.error("Error loading featured overrides:", error);
    }
  }, []);

  // Save featured overrides to localStorage whenever they change
  const saveFeaturedOverrides = useCallback((overrides: Record<string, boolean>) => {
    try {
      localStorage.setItem(FEATURED_OVERRIDES_KEY, JSON.stringify(overrides));
    } catch (error) {
      console.error("Error saving featured overrides:", error);
    }
  }, []);

  // Toggle featured status for a project
  const toggleStar = useCallback((projectId: string, originalFeatured: boolean = false) => {
    // Only allow star modifications in development mode
    if (import.meta.env.MODE !== "development") {
      console.warn("Project star modifications are only allowed in development mode");
      return;
    }

    setFeaturedOverrides(prev => {
      // If there's an override, toggle it. If no override, create one with opposite of original
      const currentStatus = prev[projectId] !== undefined ? prev[projectId] : originalFeatured;
      const newStatus = !currentStatus;

      const newOverrides = { ...prev };

      // If the new status matches the original, remove the override
      if (newStatus === originalFeatured) {
        delete newOverrides[projectId];
      } else {
        // Otherwise, set the override
        newOverrides[projectId] = newStatus;
      }

      saveFeaturedOverrides(newOverrides);
      return newOverrides;
    });
  }, [saveFeaturedOverrides]);

  // Check if a project is starred (featured with overrides applied)
  const isStarred = useCallback((projectId: string, originalFeatured: boolean = false) => {
    // If there's an override, use it. Otherwise, use the original featured status
    return featuredOverrides[projectId] !== undefined ? featuredOverrides[projectId] : originalFeatured;
  }, [featuredOverrides]);

  // Get all featured projects (with overrides applied)
  const getFeaturedStatus = useCallback((projectId: string, originalFeatured: boolean = false) => {
    return isStarred(projectId, originalFeatured);
  }, [isStarred]);

  // Check if star modifications are allowed (development mode only)
  const canModifyStars = useCallback(() => {
    return import.meta.env.MODE === "development";
  }, []);

  return {
    toggleStar,
    isStarred,
    getFeaturedStatus,
    canModifyStars
  };
};