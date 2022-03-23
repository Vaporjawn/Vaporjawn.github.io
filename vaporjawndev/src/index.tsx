import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import HomePage from './Pages/HomePage/homePage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ErrorPage from './Pages/ErrorPage/errorPage';
import Temple from './Pages/Temple/temple';

const Routing = () => {
  return(
    <Router>
      <Routes>
        <Route path="/" element={HomePage} />
        <Route path="/404" element={ErrorPage} />
        <Route path="/Temple" element={Temple} />

        {/* <Route path="/about" element={About} />
        <Route path="/service" element={Service} /> */}
      </Routes>
    </Router>
  )
}

ReactDOM.render(
  <React.StrictMode>
  <HomePage/>
    {/* <App /> */}
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
