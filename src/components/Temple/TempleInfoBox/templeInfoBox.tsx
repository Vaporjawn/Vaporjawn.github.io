import React from 'react';
import FACalendarCheck from '../../FontAwesome/Icons/faCalendarCheck';
import FACameraRetro from '../../FontAwesome/Icons/faCameraRetro';
import FAChalkboard from '../../FontAwesome/Icons/faChalkboard';
import FAGraduationCap from '../../FontAwesome/Icons/faGraduationCap';
import FALaptopCode from '../../FontAwesome/Icons/faLaptopCode';
import FASchoolFlag from '../../FontAwesome/Icons/faSchoolFlag';
import './templeInfoBox.css';

function TempleInfoBox() {
    return (
        <div>
            <div className="templeWrapper-style2-container-special-alt">
                <div className="templeRow-half">
                    <div className="templeInnerInfoBox">
                        <header>
                            <h2 className='templeInfoBoxTitle'>Events at the University</h2></header>
                        <p className="templeInfoBoxText">One of my other favorite parts about the university is that the students are able to organize so many events that people can't keep track. 
                            They have ways to get involved and a lot of popularity, which is hard to find at University. Night Owl events are also a treat as well.  </p>
                        <footer>
                            <ul className="templeInfoBoxButtons">
                                <li className='templeInfoBoxPaddingLeft'><a href="https://studentactivities.temple.edu/student-organization-events" target="_blank" className="templeInfoBoxButtonSpecial">Student Activities</a></li>
                                <li className='templeInfoBoxPaddingLeft'><a href="https://www.temple.edu/" target="_blank" className='templeInfoBoxButtonSpecial'>University Site</a></li>
                            </ul>
                        </footer>
                    </div>
                    <div className="temple4u skel-cell-important">
                        <div className="templeFeaturedFAicons">
                            <div className='templeFeaturedFAiconsSection'>
                                <FACalendarCheck/>
                                <FASchoolFlag/>
                            </div>
                            <div className='templeFeaturedFAiconsSection'>
                                <FAGraduationCap/>
                                <FACameraRetro/>
                            </div>
                            <div className='templeFeaturedFAiconsSection'>
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
