import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import BOXX from "./pages/20XX/bOXX";
import ComingSoon from "./pages/ComingSoon/comingSoon";
import ErrorPage from "./pages/ErrorPage/errorPage";
import Hackathons from "./pages/Hackathons/hackathons";
import HomePage from "./pages/HomePage/homePage";
import Projects from "./pages/Projects/projects";
import Smash from "./pages/Smash/smash";
import Temple from "./pages/Temple/temple";
import Vaporjawn from "./pages/Vaporjawn/vaporjawn";

class Routing extends Component {
  render() {
    return (
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<ErrorPage/>} />
        <Route path="/ComingSoon" element={<ComingSoon/>} />
        <Route path="/Hackathons" element={<Hackathons/>} />
        <Route path="/Projects" element={<Projects/>} />
        <Route path="/SSBM" element={<Smash/>} />
        <Route path="/Temple" element={<Temple />} />
        <Route path="/Vaporjawn" element={<Vaporjawn/>} />
        <Route path="/20XX" element={<BOXX/>} />
      </Routes>
    );
  }
}

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routing/>
    </BrowserRouter>
    {/* <App /> */}
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
