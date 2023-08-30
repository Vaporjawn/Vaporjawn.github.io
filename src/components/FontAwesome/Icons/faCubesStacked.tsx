import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../fontAwesome.css";
import { faCubes } from "@fortawesome/free-solid-svg-icons";

function FACubesStacked() {
  return (
    <div>
      <FontAwesomeIcon icon={faCubes} size="4x" className="FontAwesomeSpaced" />
    </div>
  );
}

export default FACubesStacked;
