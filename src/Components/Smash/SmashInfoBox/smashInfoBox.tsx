import React from 'react';
import FACameraRetro from '../../FontAwesome/Icons/faCameraRetro';
import FACode from '../../FontAwesome/Icons/faCode';
import FACubesStacked from '../../FontAwesome/Icons/faCubesStacked';
import FAGears from '../../FontAwesome/Icons/faGears';
import FALaptopCode from '../../FontAwesome/Icons/faLaptopCode';
import FAMugSaucer from '../../FontAwesome/Icons/faMugSaucer';
import './smashInfoBox.css';

function SmashInfoBox() {
    return (
        <div>
            <div className="smashWrapper-style2-container-special-alt">
                <div className="smashRow-half">
                    <div className="smashInnerInfoBox">
                        <header>
                            <h2 className='smashInfoBoxTitle'>For the Love of the Game</h2></header>
                        <p className="smashInfoBoxText">I've had a love for Super Smash Bros. Melee ever since it first released in 2001 and I got to play it casually. 
                            Of course being the best of my friends pushed me to pursue an upper echelon of play.  
                            This all started when I encountered <a href="https://www.youtube.com/watch?v=NSf2mgkRm7Q&list=PLoUHkRwnRH-IXbZfwlgiEN8eXmoj6DtKM&index=1" target="_blank" className="orangeRed">The Smash Brothers Documentary Series</a> in late 2015. 
                            Now I am able to contribute to my community by creating content based around the interest of competitive play. 
                        </p>
                        <footer>
                            <ul className="smashInfoBoxButtons">
                                <li className='smashInfoBoxPaddingLeft'><a href="https://www.youtube.com/channel/UCxLMGK3eXwgXm5rYdx0n4HQ" target="_blank" className="smashInfoBoxButtonSpecial">My Combo Videos</a></li>
                                <li className='smashInfoBoxPaddingLeft'><a href="https://www.youtube.com/channel/UCOpDWnskqNixG6sZsT9Bbzw" target="_blank" className='smashInfoBoxButtonSpecial'>My Clips</a></li>
                            </ul>
                        </footer>
                    </div>
                    <div className="smash4u skel-cell-important">
                        <div className="smashFeaturedFAicons">
                            <div className='smashFeaturedFAiconsSection'>
                                <FAGears/>
                                <FACubesStacked/>
                            </div>
                            <div className='smashFeaturedFAiconsSection'>
                                <FACameraRetro/>
                                <FALaptopCode/>
                            </div>
                            <div className='smashFeaturedFAiconsSection'>
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

export default SmashInfoBox;
