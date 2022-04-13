import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import HomePage from './Pages/HomePage/homePage';
import { BrowserRouter, BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import ErrorPage from './Pages/ErrorPage/errorPage';
import Temple from './Pages/Temple/temple';
import Resume from './Pages/Resume/resume';


class Routing extends Component {
  render() {
    return (
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/404" element={<ErrorPage/>} />
        <Route path="/Resume" element={<Resume />} />
        <Route path="/Temple" element={<Temple />} />
        {/* <Route path="/about" element={About} />
        <Route path="/service" element={Service} /> */}
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
