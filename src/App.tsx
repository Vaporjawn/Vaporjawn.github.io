import { BrowserRouter } from 'react-router-dom';
import './App.css';
import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import Router from './routes/router';

const App = () => {
  return ReactDOM.render(
    <React.StrictMode>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root'),
  );
};

reportWebVitals();

export default App;
