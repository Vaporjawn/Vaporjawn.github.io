import React from 'react';
import { Link } from 'react-router-dom';
import './homeHeader.css';

function HomeHeader() {
    return (
        <div>
            <div className="App-header">
                <div>
                <header>
                        <h1 className="glow">VICTOR WILLIAMS</h1>
                </header>
                <p className='blerb'>A graduate of the beloved <strong><Link to="/Temple" className='temple'>Temple University.</Link></strong> <br/> 
                    I am a 24 year old <strong><b>Full Stack Developer</b></strong> living in the heart of<strong> Philadelphia</strong>.
                <br/></p>
                </div>
            </div>
        </div>

    );
}

export default HomeHeader;

