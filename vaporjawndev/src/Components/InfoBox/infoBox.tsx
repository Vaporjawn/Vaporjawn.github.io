import React from 'react';
import './infoBox.css';

function InfoBox() {
  return (
    <div>
      <div className="wrapper-style2-container-special-alt">
          <div className="row-half">
              <div className="innerInfoBox">
                  <header>
                      <h2 className='infoBoxTitle'>a little bit about what i do</h2></header>
                  <p className="infoBoxText">I enjoy building webapps using <strong className='TypeScriptBlue'>TypeScript</strong> with frameworks such as <strong className="ReactBlue"> React.JS </strong> or <strong className="VueGreen">Vue.JS</strong> in the frontend, and
                      <strong className="NodeJSGreen"> Node.js</strong>, <strong className="NETBlue">.NET</strong>, or <strong className='RubyRed'>Ruby</strong> in the backend. I've worked with <strong>MySQL, PostgreSQL, KSQL,
                      & MongoDB</strong> in the database layer.  I've used both Azure and AWS relatively equally in terms of Cloud.  And I know my way around <strong>Xamarin</strong>, <strong>React Native</strong>, and <strong>Swift</strong>, 
                      and I commonly utilize <strong>RESTful APIs.</strong></p>
                  <footer>
                      <ul className="infoBoxButtons">
                          <li className='infoBoxPaddingLeft'><a href="https://vaporjawn.github.io/Resume.html" target="_blank" className="infoBoxButtonSpecial">Check out my Resume</a></li>
                          <li className='infoBoxPaddingLeft'><a href="https://github.com/Vaporjawn/" target="_blank" className='infoBoxButtonSpecial'>My Github</a></li>
                      </ul>
                  </footer>
              </div>
              <div className="4u skel-cell-important">
                  <ul className="featured-icons">
                      <li><span className="icon fa-tachometer"><span className="label">Feature 1</span></span>
                      </li>
                      <li><span className="icon fa-file-code-o"><span className="label">Feature 2</span></span>
                      </li>
                      <li><span className="icon fa-laptop"><span className="label">Feature 3</span></span>
                      </li>
                      <li><span className="icon fa-coffee"><span className="label">Feature 4</span></span>
                      </li>
                      <li><span className="icon fa-camera-retro"><span className="label">Feature 5</span></span>
                      </li>
                      <li><span className="icon fa-flask"><span className="label">Feature 6</span></span>
                      </li>
                  </ul>
              </div>
          </div>
      </div>
    </div>
  );
}

export default InfoBox;
