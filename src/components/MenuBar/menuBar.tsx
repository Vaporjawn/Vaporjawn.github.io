import React from "react";
import "./menuBar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngellist,
  faFacebook,
  faGithub,
  faInstagram,
  faLinkedin,
  faSteam,
  faTwitch,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { Link } from "react-router-dom";

function MenuBar() {
  return (
    <div className="MenuBar">
      <ul className="menuList">
        <li className="menuOption">
          <a
            className="menuLink"
            target="_blank"
            href="https://drive.google.com/file/d/1rp3GLqFUwAsSeffmqyEWwXglfdXdLDXM/view?usp=sharing"
          >
            Victor's Resume
          </a>
        </li>
        <li className="menuOption">
          <Link className="menuLink" to={"/Vaporjawn"}>
            Vaporjawn
          </Link>
        </li>
        <li className="menuOption">
          <Link className="menuLink" to={"/Temple"}>
            Temple
          </Link>
        </li>
        <li className="menuOption">
          <Link className="menuLink" to={"/"}>
            Home
          </Link>
        </li>
        <li className="menuOption">
          <Link className="menuLink" to={"/Projects"}>
            Projects
          </Link>
        </li>
        <li className="menuOption">
          <Link className="menuLink" to={"/Hackathons"}>
            Hackathons
          </Link>
        </li>
        <li className="menuOption">
          <Link className="menuLink" to={"/SSBM"}>
            SSBM
          </Link>
        </li>
        <li className="menuOption">
          <Link className="menuLink" to={"/20XX"}>
            20XX
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default MenuBar;
