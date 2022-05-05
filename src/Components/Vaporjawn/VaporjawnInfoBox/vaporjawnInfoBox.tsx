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
                            <h2 className='VaporjawnInfoBoxTitle'>For the Love of the Game</h2></header>
                        <p className="VaporjawnInfoBoxText">I've had a love for Super Vaporjawn Bros. Melee ever since it first released in 2001 and I got to play it casually. 
                            Of course being the best of my friends pushed me to pursue an upper echelon of play.  
                            This all started when I encountered <a href="https://www.youtube.com/watch?v=NSf2mgkRm7Q&list=PLoUHkRwnRH-IXbZfwlgiEN8eXmoj6DtKM&index=1" target="_blank" className="orangeRed">The Vaporjawn Brothers Documentary Series</a> in late 2015. 
                            Now I am able to contribute to my community by creating content based around competitive play. 
                        </p>
                        <footer>
                            <ul className="VaporjawnInfoBoxButtons">
                                <li className='VaporjawnInfoBoxPaddingLeft'><a href="https://www.youtube.com/channel/UCxLMGK3eXwgXm5rYdx0n4HQ" target="_blank" className="VaporjawnInfoBoxButtonSpecial">My Combo Videos</a></li>
                                <li className='VaporjawnInfoBoxPaddingLeft'><a href="https://www.youtube.com/channel/UCOpDWnskqNixG6sZsT9Bbzw" target="_blank" className='VaporjawnInfoBoxButtonSpecial'>My Clips</a></li>
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
