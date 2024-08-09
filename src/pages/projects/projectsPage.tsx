import { useState } from "react";
import "./styles/projectPage.css";
import ProjectCategoryButtons from "./category/projectCategoryButtons";
import { ProjectCategory } from "./category/types/ProjectCategory";


const ProjectsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory[]>([]);
  return (
    <div>
      <h1 style={{ textDecoration: "underline", textAlign: "left"}}>Projects</h1>
      <p>A curated collection of projects showcasing my engineering journey.</p>
      <ProjectCategoryButtons
      selectedCategory={selectedCategory}
      setSelectedCategory={setSelectedCategory}
      />
    </div>
  );
};

export default ProjectsPage;