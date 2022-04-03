import React from 'react';
import './homeHeader.css';

function HomeHeader() {
    return (
        <div className="App-header">
            <div>
            <header>
                <h2 className="glow">Victor Williams</h2>
            </header>
            <p>A graduate of the beloved <strong ><a href="./temple.html" target="_blank" className='temple'>Temple University.</a></strong> <br/> 
                I am a 24 year old <strong><b>Full Stack Developer</b></strong> living in the heart of<strong> Philadelphia</strong>.
                {/* need to change temple university link */}
            <br/></p>
            </div>
        </div>
    );
}

export default HomeHeader;

