import React from "react";
import MenuBar from "../../MenuBar/menuBar";
import ProjectsHeader from "../ProjectsHeader/projectsHeader";
import "./projectsBackgroundBanner.css";

function ProjectsBackgroundBanner() {
  return (
    <div className="ProjectsBackgroundBanner">
      <MenuBar />
      <ProjectsHeader />
    </div>
  );
}

export default ProjectsBackgroundBanner;
