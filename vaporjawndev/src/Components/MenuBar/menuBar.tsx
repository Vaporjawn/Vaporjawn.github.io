import React from 'react';
import './menuBar.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngellist, faFacebook, faGithub, faInstagram, faLinkedin, faSteam, faTwitch, faTwitter } from "@fortawesome/free-brands-svg-icons";


function MenuBar() {
  return (
    <div className='MenuBar'>
      <ul className='menuList'>
        <li className='menuOption'><a className='menuLink'>Victor's Resume</a></li>
        <li className='menuOption'><a className='menuLink'>Vaporjawn</a></li>
        <li className='menuOption'><a className='menuLink'>Temple</a></li>
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
