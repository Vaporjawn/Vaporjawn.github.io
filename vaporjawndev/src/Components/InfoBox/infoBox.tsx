import React from 'react';
import FABugSlash from '../FontAwesome/Icons/faBugSlash';
import FACameraRetro from '../FontAwesome/Icons/faCameraRetro';
import FACodeCompare from '../FontAwesome/Icons/faCodeCompare';
import FAFileCode from '../FontAwesome/Icons/faFileCode';
import FALaptopCode from '../FontAwesome/Icons/faLaptopCode';
import FAShieldAlt from '../FontAwesome/Icons/faShieldAlt';
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
                        <div className="featuredFAicons">
                            <div className='featuredFAiconsSection'>
                                <FACodeCompare/>
                                <FABugSlash/>
                            </div>
                            <div className='featuredFAiconsSection'>
                                <FAFileCode/>
                                <FACameraRetro/>
                            </div>
                            <div className='featuredFAiconsSection'>
                                <FALaptopCode/>
                                <FAShieldAlt/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default InfoBox;
