import React from "react";
import "./buttonCTA.css";

function ButtonCTA() {
  return (
    <div>
      <ul className="ButtonContainer">
        <li className="ButtonCTA">
          <a
            href="mailto:victorwilliams719@gmail.com#"
            target="_blank"
            className="ButtonCTALink"
          >
            CONTACT ME
          </a>
        </li>
        <li className="ButtonCTA">
          <a
            href="mailto:Vaporjawn@gmail.com#"
            target="_blank"
            className="ButtonCTALink"
          >
            VAPORJAWN CONTACT
          </a>
        </li>
      </ul>
    </div>
  );
}

export default ButtonCTA;
