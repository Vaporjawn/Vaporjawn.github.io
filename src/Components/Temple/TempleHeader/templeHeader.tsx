import React from 'react';
import './templeHeader.css';

function TempleHeader() {
    return (
        <div>
            <div className="App-header">
        <header>
            <h2 className="templeGlow">Temple University</h2>
        </header>
        <p className='templeBlerb'>Attending <a href='https://temple.edu' target='_blank' className='temple2'>Temple University</a> was one of the most fun experiences of my life. I'll never forget the time I had there and all of the skills that I was able to pickup along the way. </p>
            </div>
        </div>

    );
}

export default TempleHeader;

