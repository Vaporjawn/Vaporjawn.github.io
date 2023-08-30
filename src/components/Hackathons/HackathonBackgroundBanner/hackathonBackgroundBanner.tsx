import React from "react";
import MenuBar from "../../MenuBar/menuBar";
import HackathonHeader from "../HackathonHeader/hackathonHeader";
import "./hackathonBackgroundBanner.css";

function HackathonBackgroundBanner() {
  return (
    <div className="HackathonBackgroundBanner">
      <MenuBar />
      <HackathonHeader />
    </div>
  );
}

export default HackathonBackgroundBanner;
