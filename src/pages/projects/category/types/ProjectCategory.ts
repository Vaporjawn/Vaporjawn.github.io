/* eslint-disable no-unused-vars */

// Project categories enum - values accessed via ProjectCategoryEnum.Value syntax
export enum ProjectCategoryEnum {
  React = "React",
  NodeJS = "NodeJS",
  Python = "Python",
  Java = "Java",
  JavaScript = "JavaScript",
  TypeScript = "TypeScript",
  Electron = "Electron",
  Desktop = "Desktop",
  Web = "Web",
  Bot = "Bot",
  Security = "Security",
  Algorithm = "Algorithm",
  Game = "Game",
  Audio = "Audio",
  API = "API",
  Chrome = "Chrome",
  Mobile = "Mobile",
  Utility = "Utility",
  Educational = "Educational",
  AI = "AI",
  Visualization = "Visualization",
}

export type ProjectCategory = keyof typeof ProjectCategoryEnum;

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  categories: ProjectCategory[];
  technologies: string[];
  features: string[];
  githubUrl: string;
  liveUrl?: string;
  npmUrl?: string;
  status: "Active" | "Archived" | "In Development" | "Complete";
  lastUpdated: string;
  stars?: number;
  forks?: number;
  language: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced" | "Expert";
  imageUrl?: string;
  priority: "High" | "Medium" | "Low";
}
