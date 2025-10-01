import * as React from "react";
import { createContext, ReactNode } from "react";
import portfolioData from "../data/portfolio.json";

// Type definitions for portfolio data
export interface Skill {
  name: string;
  level: number;
  category: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  image: string;
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
  status: "completed" | "in-progress" | "planned";
  category: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string | null;
  description: string;
  technologies: string[];
  current: boolean;
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
  primary: boolean;
}

export interface PersonalInfo {
  name: string;
  title: string;
  email: string;
  location: string;
  bio: string;
  avatar: string;
}

export interface PortfolioData {
  personalInfo: PersonalInfo;
  skills: {
    leadership?: Skill[];
    frontend?: Skill[];
    backend?: Skill[];
    database?: Skill[];
    cloud?: Skill[];
    mobile?: Skill[];
    architecture?: Skill[];
    tools?: Skill[];
    business?: Skill[];
    security?: Skill[];
  };
  projects: Project[];
  experience: Experience[];
  social: SocialLink[];
}

const PortfolioContext = createContext<PortfolioData | null>(null);

interface PortfolioProviderProps {
  children: ReactNode;
}

export const PortfolioProvider: React.FC<PortfolioProviderProps> = ({
  children,
}) => {
  return (
    <PortfolioContext.Provider value={portfolioData as PortfolioData}>
      {children}
    </PortfolioContext.Provider>
  );
};

export { PortfolioContext };
