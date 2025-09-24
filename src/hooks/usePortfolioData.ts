import { useContext } from "react";
import { PortfolioContext, PortfolioData } from "../contexts/PortfolioContext";

export const usePortfolio = (): PortfolioData => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error("usePortfolio must be used within a PortfolioProvider");
  }
  return context;
};

// Custom hooks for specific data
export const useProjects = () => {
  const { projects } = usePortfolio();
  return {
    projects,
    featuredProjects: projects.filter((project) => project.featured),
    getProjectById: (id: string) =>
      projects.find((project) => project.id === id),
    getProjectsByCategory: (category: string) =>
      projects.filter((project) => project.category === category),
  };
};

export const useSkills = () => {
  const { skills } = usePortfolio();
  return {
    ...skills,
    allSkills: [...skills.frontend, ...skills.backend, ...skills.tools],
    getSkillsByCategory: (category: string) =>
      [...skills.frontend, ...skills.backend, ...skills.tools].filter(
        (skill) => skill.category === category
      ),
  };
};

export const useSocial = () => {
  const { social } = usePortfolio();
  return {
    social,
    primarySocial: social.filter((link) => link.primary),
  };
};
