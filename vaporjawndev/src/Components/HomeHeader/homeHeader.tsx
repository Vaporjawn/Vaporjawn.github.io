import React from 'react';

function HomeHeader() {
    return (
        <div className="App-header">
            <div>
            <header>
                <h2 className="glow">Victor Williams</h2>
            </header>
            <p>A graduate of the beloved <strong><a href="./temple.html" target="_blank">Temple University.</a></strong> <br/> 
                I am a 24 year old <strong><b>Full Stack Developer</b></strong> living in the heart of<strong> Philadelphia</strong>.
                {/* need to add style='color: #9D2235; to temple university */}
                {/* need to change temple university link */}
            <br/></p>
            </div>
        </div>
    );
}

export default HomeHeader;

