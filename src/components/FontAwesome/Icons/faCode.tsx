import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../fontAwesome.css";
import { faCode } from "@fortawesome/free-solid-svg-icons";

function FACode() {
  return (
    <div>
      <FontAwesomeIcon icon={faCode} size="4x" className="FontAwesome" />
      <div className="bottomBorder"></div>
    </div>
  );
}

export default FACode;
