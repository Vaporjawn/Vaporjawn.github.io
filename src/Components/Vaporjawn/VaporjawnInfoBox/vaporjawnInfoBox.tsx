import React from 'react';
import FACameraRetro from '../../FontAwesome/Icons/faCameraRetro';
import FACode from '../../FontAwesome/Icons/faCode';
import FACubesStacked from '../../FontAwesome/Icons/faCubesStacked';
import FAGears from '../../FontAwesome/Icons/faGears';
import FALaptopCode from '../../FontAwesome/Icons/faLaptopCode';
import FAMugSaucer from '../../FontAwesome/Icons/faMugSaucer';
import './vaporjawnInfoBox.css';

function VaporjawnInfoBox() {
    return (
        <div>
            <div className="VaporjawnWrapper-style2-container-special-alt">
                <div className="VaporjawnRow-half">
                    <div className="VaporjawnInnerInfoBox">
                        <header>
                            <h2 className='VaporjawnInfoBoxTitle'>Vaporwave and Beyond</h2></header>
                        <p className="VaporjawnInfoBoxText">
                            While my instagram account may be mostly inactive at the moment, there are still plenty of ways I contribute to the vaporwave community in my day to day life. 
                            One of the other artistic mediums that has a strong vaporwave fanbase is the musical side to the genre.  Below is a link to some of my vaporwave music. 
                        </p>
                        <footer>
                            <ul className="VaporjawnInfoBoxButtons">
                                <li className='VaporjawnInfoBoxPaddingLeft'><a href="https:vaporjawn.bandcamp.com/" target="_blank" className="VaporjawnInfoBoxButtonSpecial">My Bandcamp</a></li>
                            </ul>
                        </footer>
                    </div>
                    <div className="Vaporjawn4u skel-cell-important">
                        <div className="VaporjawnFeaturedFAicons">
                            <div className='VaporjawnFeaturedFAiconsSection'>
                                <FAGears/>
                                <FACubesStacked/>
                            </div>
                            <div className='VaporjawnFeaturedFAiconsSection'>
                                <FACameraRetro/>
                                <FALaptopCode/>
                            </div>
                            <div className='VaporjawnFeaturedFAiconsSection'>
                                <FAMugSaucer/>
                                <FACode/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default VaporjawnInfoBox;
