import { Route } from "react-router-dom";
import Projects from "../../pages/Projects/projects";

const ProjectsRoute = () => {
  return <Route path="/Projects" element={<Projects />} />;
}

export default ProjectsRoute;