import React from 'react';
import MenuBar from '../../MenuBar/menuBar';
import TempleHeader from '../HackathonHeader/hackathonHeader';
import './hackathonBackgroundBanner.css';


function HackathonBackgroundBanner() {
    return (
        <div className="HackathonBackgroundBanner">
            <MenuBar/>
            <TempleHeader/>
        </div>
    );
}

export default HackathonBackgroundBanner;

