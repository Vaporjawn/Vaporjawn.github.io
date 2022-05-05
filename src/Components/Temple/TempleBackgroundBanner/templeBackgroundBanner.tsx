import React from 'react';
import MenuBar from '../../MenuBar/menuBar';
import TempleHeader from '../TempleHeader/templeHeader';
import './templeBackgroundBanner.css';


function TempleBackgroundBanner() {
    return (
        <div className="TempleBackgroundBanner">
            <MenuBar/>
            <TempleHeader/>
        </div>
    );
}

export default TempleBackgroundBanner;

