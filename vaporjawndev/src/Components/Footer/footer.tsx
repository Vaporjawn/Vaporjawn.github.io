import React from 'react';

function Footer() {
  return (
    <div>
      <footer id="footer">
        <ul className="icons">
            <li><a href="https://github.com/vaporjawn" className="icon circle fa-github"><span className="label">Github</span></a></li>
            <li><a href="https://twitter.com/vaporjawn" target="_blank" className="icon circle fa-twitter"><span className="label">Twitter</span></a></li>
            <li><a href="https://Instagram.com/vaporjawn" target="_blank" className="icon circle fa-instagram"><span className="label">Instagram</span></a></li>
            <li><a href="https://www.facebook.com/victor.williams.jr" target="_blank" className="icon brands circle fa-facebook"><span className="label">Facebook</span></a></li>
            <li><a href="https://twitch.com/Vaporjawn" target="_blank" className="icon brands circle fa-twitch"><span className="label">Twitch</span></a></li>
            <li><a href="https://steamcommunity.com/id/vaporjawn" target="_blank" className="icon brands circle fa-steam"><span className="label">Steam</span></a></li>
            <li><a href="https://angel.co/victor-wiliams" target="_blank" className="icon brands circle fa-angellist"><span className="label">AngelLst</span></a></li>
            <li><a href="https://linkedin.com/victorwilliams719" target="_blank" className="icon brands circle fa-linkedin"><span className="label">LinkedIn</span></a></li>
        </ul>
        <ul className="copyright">
            <li>© Vaporjawn</li>
            <li>Design: <a href="http://github.com/vaporjawn/">Github</a></li>
        </ul>
      </footer>
    </div>
  );
}

export default Footer;
