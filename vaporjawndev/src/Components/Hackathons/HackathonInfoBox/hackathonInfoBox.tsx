import React from 'react';
import FABugSlash from '../../FontAwesome/Icons/faBugSlash';
import FACalendarCheck from '../../FontAwesome/Icons/faCalendarCheck';
import FACameraRetro from '../../FontAwesome/Icons/faCameraRetro';
import FAChalkboard from '../../FontAwesome/Icons/faChalkboard';
import FACodeCompare from '../../FontAwesome/Icons/faCodeCompare';
import FAFileCode from '../../FontAwesome/Icons/faFileCode';
import FAGraduationCap from '../../FontAwesome/Icons/faGraduationCap';
import FALaptopCode from '../../FontAwesome/Icons/faLaptopCode';
import FASchoolFlag from '../../FontAwesome/Icons/faSchoolFlag';
import FAShieldAlt from '../../FontAwesome/Icons/faShieldAlt';
import './hackathonInfoBox.css';

function HackathonInfoBox() {
    return (
        <div>
            <div className="hackathonwrapper-style2-container-special-alt">
                <div className="hackathonrow-half">
                    <div className="hackathoninnerInfoBox">
                        <header>
                            <h2 className='hackathoninfoBoxTitle'>What I love about hackathons</h2></header>
                        <p className="hackathoninfoBoxText">I am a hackathon addict. For me Hackathons are never about winning, it's about learning. 
                            Learning ideas that were foreign to you and allow you to dabble outside your comfort zone. 
                            There are countless technologies that I picked up all because I dipped my toe in at a Hackathon.
                            I find that people underestimate what can get done once you put your minds together. Below are two extremely popular Hackathon websites.</p>
                        <footer>
                            <ul className="hackathoninfoBoxButtons">
                                <li className='hackathoninfoBoxPaddingLeft'><a href="https://devpost.com/" target="_blank" className="hackathoninfoBoxButtonSpecial">DevPost</a></li>
                                <li className='hackathoninfoBoxPaddingLeft'><a href="https://hackerearth.com/" target="_blank" className='hackathoninfoBoxButtonSpecial'>Hacker Earth</a></li>
                            </ul>
                        </footer>
                    </div>
                    <div className="hackathon4u skel-cell-important">
                        <div className="hackathonfeaturedFAicons">
                            <div className='hackathonfeaturedFAiconsSection'>
                                <FACalendarCheck/>
                                <FASchoolFlag/>
                            </div>
                            <div className='hackathonfeaturedFAiconsSection'>
                                <FAGraduationCap/>
                                <FACameraRetro/>
                            </div>
                            <div className='hackathonfeaturedFAiconsSection'>
                                <FALaptopCode/>
                                <FAChalkboard/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HackathonInfoBox;
