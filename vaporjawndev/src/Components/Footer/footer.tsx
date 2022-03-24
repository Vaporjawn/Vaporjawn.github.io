import React from 'react';
import './footer.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngellist, faFacebook, faGithub, faInstagram, faLinkedin, faSteam, faTwitch, faTwitter } from "@fortawesome/free-brands-svg-icons";


function Footer() {
  return (
    <div>
      <footer className="footer">
        <ul className="icons">
          <li><a href="https://github.com/vaporjawn" target="_blank"><FontAwesomeIcon icon={faGithub}/></a></li>
          <li><a href="https://twitter.com/vaporjawn" target="_blank"><FontAwesomeIcon icon={faTwitter}/></a></li>
          <li><a href="https://instagram.com/vaporjawn" target="_blank"><FontAwesomeIcon icon={faInstagram}/></a></li>
          <li><a href="https://www.facebook.com/victor.williams.jr" target="_blank"><FontAwesomeIcon icon={faFacebook}/></a></li>
          <li><a href="https://twitch.com/vaporjawn" target="_blank"><FontAwesomeIcon icon={faTwitch}/></a></li>
          <li><a href="https://steamcommunity.com/id/vaporjawn" target="_blank"><FontAwesomeIcon icon={faSteam}/></a></li>
          <li><a href="https://angel.co/victor-wiliams" target="_blank"><FontAwesomeIcon icon={faAngellist}/></a></li>
          <li><a href="https://linkedin.com/victorwilliams719" target="_blank"><FontAwesomeIcon icon={faLinkedin}/></a></li>
        </ul>
        <br/>
        <ul className="copyright">
            <li>© Vaporjawn</li>
            <li>Design: <a href="http://github.com/vaporjawn/">Github</a></li>
        </ul>
      </footer>
    </div>
  );
}

export default Footer;
