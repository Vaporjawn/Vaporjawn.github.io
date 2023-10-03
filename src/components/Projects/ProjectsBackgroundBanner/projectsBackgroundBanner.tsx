import MenuBar from "../../MenuBar/menuBar";
import ProjectsHeader from "../ProjectsHeader/projectsHeader";
import "./projectsBackgroundBanner.css";

const ProjectsBackgroundBanner = () => {
  return (
    <div className="ProjectsBackgroundBanner">
      <MenuBar />
      <ProjectsHeader />
    </div>
  );
};

export default ProjectsBackgroundBanner;
