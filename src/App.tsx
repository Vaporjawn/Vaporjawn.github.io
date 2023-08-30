import { Routes, Route, BrowserRouter } from "react-router-dom";
import "./App.css";
import BOXX from "./pages/20XX/bOXX";
import ComingSoon from "./pages/ComingSoon/comingSoon";
import ErrorPage from "./pages/ErrorPage/errorPage";
import Hackathons from "./pages/Hackathons/hackathons";
import HomePage from "./pages/HomePage/homePage";
import Projects from "./pages/Projects/projects";
import Smash from "./pages/Smash/smash";
import Temple from "./pages/Temple/temple";
import Vaporjawn from "./pages/Vaporjawn/vaporjawn";
import React from "react";
import ReactDOM from "react-dom";
import reportWebVitals from "./reportWebVitals";

const App = () => {
  return ReactDOM.render(
    <React.StrictMode>
      <BrowserRouter>
        <Routes>
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
      </BrowserRouter>
    </React.StrictMode>,
    document.getElementById("root"),
  );
};

reportWebVitals();

export default App;
