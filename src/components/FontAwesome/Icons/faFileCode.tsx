import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../fontAwesome.css";
import { faFileCode } from "@fortawesome/free-solid-svg-icons";

function FAFileCode() {
  return (
    <div>
      <FontAwesomeIcon
        icon={faFileCode}
        size="4x"
        className="FontAwesomeSpaced"
      />
    </div>
  );
}

export default FAFileCode;
