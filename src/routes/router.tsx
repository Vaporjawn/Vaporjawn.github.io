import { Routes } from "react-router-dom";
import BOXXRoute from "./main/boxxRoute";
import ComingSoonRoute from "./main/comingSoonRoute";
import ErrorPageRoute from "./main/errorPageRoute";
import HackathonsRoute from "./main/hackathonsRoute";
import HomePageRoute from "./main/homePageRoute";
import ProjectsRoute from "./main/projectsRoute";
import SmashRoute from "./main/smashRoute";
import TempleRoute from "./main/templeRoute";
import VaporjawnRoute from "./main/vaporjawnRoute";


const Router = () => {
  return (
    <Routes>
      <HomePageRoute />
      <ErrorPageRoute />
      <ComingSoonRoute />
      <HackathonsRoute />
      <ProjectsRoute />
      <SmashRoute />
      <TempleRoute />
      <VaporjawnRoute />
      <BOXXRoute />
    </Routes>
  );
};

export default Router;
