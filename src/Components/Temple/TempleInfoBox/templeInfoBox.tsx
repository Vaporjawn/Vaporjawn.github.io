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
import './templeInfoBox.css';

function TempleInfoBox() {
    return (
        <div>
            <div className="templewrapper-style2-container-special-alt">
                <div className="templerow-half">
                    <div className="templeinnerInfoBox">
                        <header>
                            <h2 className='templeinfoBoxTitle'>Events at the University</h2></header>
                        <p className="templeinfoBoxText">One of my other favorite parts about the university is that the students are able to organize so many events that people can't keep track. 
                            They have ways to get involved and a lot of popularity, which is hard to find at University. Night Owl events are also a treat as well.  </p>
                        <footer>
                            <ul className="templeinfoBoxButtons">
                                <li className='templeinfoBoxPaddingLeft'><a href="https://studentactivities.temple.edu/student-organization-events" target="_blank" className="templeinfoBoxButtonSpecial">Student Activities</a></li>
                                <li className='templeinfoBoxPaddingLeft'><a href="https://www.temple.edu/" target="_blank" className='templeinfoBoxButtonSpecial'>University Site</a></li>
                            </ul>
                        </footer>
                    </div>
                    <div className="temple4u skel-cell-important">
                        <div className="templefeaturedFAicons">
                            <div className='templefeaturedFAiconsSection'>
                                <FACalendarCheck/>
                                <FASchoolFlag/>
                            </div>
                            <div className='templefeaturedFAiconsSection'>
                                <FAGraduationCap/>
                                <FACameraRetro/>
                            </div>
                            <div className='templefeaturedFAiconsSection'>
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

export default TempleInfoBox;
