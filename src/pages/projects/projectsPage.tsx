import { useState } from "react";
import "./styles/projectPage.css";
import ProjectCategoryButtons from "./category/projectCategoryButtons";
import { ProjectCategory, ProjectCategoryEnum } from "./category/types/ProjectCategory";

const ProjectCard = (args: {
  title: string;
  description: string;
  categories: ProjectCategory[];
}) => {
  const { title, description, categories } = args;

  return (
    <div className="project-card">
      <h2>{title}</h2>
      <p>{description}</p>
      <div className="project-card-categories">
        {categories.map((category) => (
          <span key={category} className="project-card-category">
            {category}
          </span>
        ))}
      </div>
    </div>
  );
};

const ProjectsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory[]>([]);

  const projects = [
    {
      title: "React Project",
      description: "A project built using React.",
      categories: [ProjectCategoryEnum.React],
    },
    {
      title: "NodeJS Project",
      description: "A project built using NodeJS.",
      categories: [ProjectCategoryEnum.NodeJS],
    },
    {
      title: "Python Project",
      description: "A project built using Python.",
      categories: [ProjectCategoryEnum.Python],
    },
    {
      title: "Java Project",
      description: "A project built using Java.",
      categories: [ProjectCategoryEnum.Java],
    },
  ];

  const filteredProjects =
    selectedCategory.length === 0
      ? projects
      : projects.filter((project) =>
          project.categories.some((category) => selectedCategory.includes(category)),
        );

  return (
    <div>
      <h1 style={{ textDecoration: "underline", textAlign: "left" }}>Projects</h1>
      <p>A curated collection of projects showcasing my engineering journey.</p>
      <ProjectCategoryButtons
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      <div className="project-card-container">
        {filteredProjects.map((project) => (
          <ProjectCard
            key={project.title}
            title={project.title}
            description={project.description}
            categories={project.categories}
          />
        ))}
      </div>
    </div>
  );
};

export default ProjectsPage;