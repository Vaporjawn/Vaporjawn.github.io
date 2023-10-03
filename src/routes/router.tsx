import { Routes, Route } from "react-router-dom";
import BOXX from "../pages/20XX/bOXX";
import ComingSoon from "../pages/ComingSoon/comingSoon";
import ErrorPage from "../pages/ErrorPage/errorPage";
import Hackathons from "../pages/Hackathons/hackathons";
import HomePage from "../pages/HomePage/homePage";
import Projects from "../pages/Projects/projects";
import Smash from "../pages/Smash/smash";
import Temple from "../pages/Temple/temple";
import Vaporjawn from "../pages/Vaporjawn/vaporjawn";

const Router = () => {
  return (
    <Routes>
      {/* TODO: sort these routes */}
      <Route path="/" element={<HomePage />} />
      <Route path="*" element={<ErrorPage />} />
      <Route path="/ComingSoon" element={<ComingSoon />} />
      <Route path="/Hackathons" element={<Hackathons />} />
      <Route path="/Projects" element={<Projects />} />
      <Route path="/SSBM" element={<Smash />} />
      <Route path="/Temple" element={<Temple />} />
      <Route path="/Vaporjawn" element={<Vaporjawn />} />
      <Route path="/20XX" element={<BOXX />} />
    </Routes>
  );
};

export default Router;
