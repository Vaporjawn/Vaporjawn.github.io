import React from 'react';
import MenuBar from '../../MenuBar/menuBar';
import VaporjawnHeader from '../VaporjawnHeader/vaporjawnHeader';
import './vaporjawnBackgroundBanner.css';


function VaporjawnBackgroundBanner() {
    return (
        <div className="VaporjawnBackgroundBanner">
            <MenuBar/>
            <VaporjawnHeader/>
        </div>
    );
}

export default VaporjawnBackgroundBanner;

