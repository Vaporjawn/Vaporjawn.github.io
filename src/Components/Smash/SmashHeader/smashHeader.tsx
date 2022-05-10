import React from 'react';
import './smashHeader.css';

function SmashHeader() {
    return (
        <div>
            <div className="App-header">
        <header>
            <h2 className="smashGlow">Super Smash Brothers Melee</h2>
        </header>
        <p className='smashBlerb'>Nostalgic party game turned competitive masterpiece <br/> <a className='SmashHeaderLink' href="https://www.youtube.com/watch?v=NSf2mgkRm7Q&list=PLoUHkRwnRH-IXbZfwlgiEN8eXmoj6DtKM&index=1" target="_blank">Melee</a>  is
            a game I've been playing at a competitive level for 5 years</p>
            </div>
        </div>

    );
}

export default SmashHeader;

