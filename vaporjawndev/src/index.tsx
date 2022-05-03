import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import HomePage from './Pages/HomePage/homePage';
import { BrowserRouter, BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import ErrorPage from './Pages/ErrorPage/errorPage';
import Temple from './Pages/Temple/temple';
import ComingSoon from './Pages/ComingSoon/comingSoon';
import Hackathons from './Pages/Hackathons/hackathons';
import BOXX from './Pages/20XX/bOXX';
import Smash from './Pages/Smash/smash';


class Routing extends Component {
  render() {
    return (
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<ErrorPage/>} />
        <Route path="/ComingSoon" element={<ComingSoon/>} />
        <Route path="/Hackathons" element={<Hackathons/>} />
        <Route path="/Projects" element={<ComingSoon/>} />
        <Route path="/SSBM" element={<Smash/>} />
        <Route path="/Temple" element={<Temple />} />
        <Route path="/Vaporjawn" element={<ComingSoon/>} />
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
