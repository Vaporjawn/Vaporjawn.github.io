import React from 'react';
import './homeHeader.css';

function HomeHeader() {
    return (
        <div>
            <div className="App-header">
                <div>
                <header>
                        <h1 className="glow">VICTOR WILLIAMS</h1>
                </header>
                <p className='blerb'>A graduate of the beloved <strong><a href="./temple.html" target="_blank" className='temple'>Temple University.</a></strong> <br/> 
                    I am a 24 year old <strong><b>Full Stack Developer</b></strong> living in the heart of<strong> Philadelphia</strong>.
                    {/* need to change temple university link */}
                <br/></p>
                </div>
            </div>
        </div>

    );
}

export default HomeHeader;

