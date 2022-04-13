import React from 'react';
import './menuBar.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngellist, faFacebook, faGithub, faInstagram, faLinkedin, faSteam, faTwitch, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { Link } from 'react-router-dom';


function MenuBar() {
  return (
    <div className='MenuBar'>
      <ul className='menuList'>
        <li className='menuOption'><Link className='menuLink' to="/Resume">Victor's Resume</Link></li>
        <li className='menuOption'><a className='menuLink'>Vaporjawn</a></li>
        <li className='menuOption'><Link className='menuLink' to={{pathname: "/Temple"}}>Temple</Link></li>
        <li className='menuOption'><a className='menuLink'>Home</a></li>
        <li className='menuOption'><a className='menuLink'>Projects</a></li>
        <li className='menuOption'><a className='menuLink'>Hackathons</a></li>
        <li className='menuOption'><a className='menuLink'>SSBM</a></li>
        <li className='menuOption'><a className='menuLink'>20XX</a></li>
      </ul>
    </div>
  );
}

export default MenuBar;
