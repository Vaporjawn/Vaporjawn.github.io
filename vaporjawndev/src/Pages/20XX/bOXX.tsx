import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../../Components/Footer/footer';
import HackathonBackgroundBanner from '../../Components/Hackathons/HackathonBackgroundBanner/hackathonBackgroundBanner';
import HackathonBioSnippet from '../../Components/Hackathons/HackathonBioSnippet/hackathonBioSnippet';
import HackathonCTABanner from '../../Components/Hackathons/HackathonCTABanner/hackathonCTABanner';
import HackathonInfoBox from '../../Components/Hackathons/HackathonInfoBox/hackathonInfoBox';
import './bOXX.css'



function BOXX() {
  return (
    <div>
      <Link to="../"><img src="https://raw.githubusercontent.com/Vapor-jawn/Instagram-Pictures/main/images/meleeLogo.png" className='main20XXImage'></img></Link>
          {/* change link to link to SSBM */}
            <h1 className='yellowH1'>The year is 20XX.</h1>
            <h1 className='yellowH1'>Everyone plays Fox at TAS levels of perfection.</h1>
            <h1 className='yellowH1'>Because of this, the winner of a match depends solely on port priority.</h1>
            <h1 className='yellowH1'>The RPS metagame has evolved to ridiculous levels due to it being the only remaining factor to decide matches.</h1>
    
            <div className="fullscreen-bg">
                <video loop muted autoPlay className="fullscreen-bg__video" src='https://raw.githubusercontent.com/Vapor-jawn/Instagram-Pictures/main/images/meleeTitleScreen.mp4'>
            </video>    
          </div>
        </div>
  );
}

export default BOXX;
