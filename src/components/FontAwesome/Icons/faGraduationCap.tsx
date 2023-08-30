import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../fontAwesome.css";
import {
  faGraduationCap,
  faSchoolFlag,
} from "@fortawesome/free-solid-svg-icons";

function FAGraduationCap() {
  return (
    <div>
      <FontAwesomeIcon
        icon={faGraduationCap}
        size="4x"
        className="FontAwesomeSpaced"
      />
    </div>
  );
}

export default FAGraduationCap;
