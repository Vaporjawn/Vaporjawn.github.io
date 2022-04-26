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
                            <h2 className='hackathoninfoBoxTitle'>Events at the University</h2></header>
                        <p className="hackathoninfoBoxText">One of my other favorite parts about the university is that the students are able to organize so many events that people can't keep track. 
                            They have ways to get involved and a lot of popularity, which is hard to find at University. Night Owl events are also a treat as well.  </p>
                        <footer>
                            <ul className="hackathoninfoBoxButtons">
                                <li className='hackathoninfoBoxPaddingLeft'><a href="https://studentactivities.hackathon.edu/student-organization-events" target="_blank" className="hackathoninfoBoxButtonSpecial">Student Activities</a></li>
                                <li className='hackathoninfoBoxPaddingLeft'><a href="https://www.temple.edu/" target="_blank" className='hackathoninfoBoxButtonSpecial'>University Site</a></li>
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
