import React from 'react';
import './cTA.css';

function CTA() {
  return (
    <div className='CTA'> 
    <header>
        <h2 className="CTAGlow"><strong> Want to reach me? </strong></h2>
        <p className="CTAGlow-small"><b>Here's a few of my contacts and socials so we can be in touch.</b></p>
    </header>
    <footer>
        <ul className="buttons">
            <li><a href="mailto:victorwilliams719@gmail.com#" target="_blank" className="button special">Contact Me</a></li>
            <li><a href="mailto:Vaporjawn@gmail.com#" target="_blank" className="button special">Vaporjawn Contact</a></li>
            {/* MAKE BOTH OF THESE BUTTON COMPONENTS */}
        </ul>
    </footer>
    </div>
  );
}

export default CTA;
