import React, { useEffect } from "react";
import { BrowserRouter, Route, Router, useNavigate } from "react-router-dom";
import "./errorPage.css";

const ErrorPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate("/");
    }, 7000);
  }, []);

  return (
    <div className="errorContainer">
      <h1 className="errorh1">404 ERROR</h1>

      <img
        src="https://media0.giphy.com/media/12BQY6Nj4ZDAFG/giphy.gif"
        alt="Crying Pikachu"
      />

      <p>
        <strong> Page not found :(</strong>
      </p>

      <p>The page that you are looking for could not be found.</p>
      <script
        async
        src="https://www.googletagmanager.com/gtag/js?id=UA-48129201-1"
      />
    </div>
  );
};

export default ErrorPage;
