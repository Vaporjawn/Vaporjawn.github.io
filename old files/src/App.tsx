/* eslint-disable react/no-deprecated */
/* eslint-disable react/no-render-return-value */
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import React from "react";
import ReactDOM from "react-dom";
import reportWebVitals from "./reportWebVitals";
import Router from "./routes/router";
import { createRoot } from "react-dom/client";

const App = () => {
  return createRoot(
    <React.StrictMode>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </React.StrictMode>,
  );
};

reportWebVitals();

export default App;
