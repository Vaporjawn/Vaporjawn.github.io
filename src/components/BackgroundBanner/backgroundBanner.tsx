import React from "react";
import HomeHeader from "../HomePage/HomeHeader/homeHeader";
import MenuBar from "../MenuBar/menuBar";
import "./backgroundBanner.css";

function BackgroundBanner() {
  return (
    <div className="BackgroundBanner">
      <MenuBar />
      <HomeHeader />
    </div>
  );
}

export default BackgroundBanner;
