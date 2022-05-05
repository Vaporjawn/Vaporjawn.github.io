import React from 'react';
import Footer from '../../Components/Footer/footer';
import SmashBackgroundBanner from '../../Components/Smash/SmashBackgroundBanner/smashBackgroundBanner';
import SmashBioSnippet from '../../Components/Smash/SmashBioSnippet/smashBioSnippet';
import SmashCTABanner from '../../Components/Smash/SmashCTABanner/smashCTABanner';
import SmashFeed from '../../Components/Smash/SmashFeed/smashFeed';
import SmashInfoBox from '../../Components/Smash/SmashInfoBox/smashInfoBox';

function Smash() {
  return (
    <div>
      <SmashBackgroundBanner/>
      <SmashBioSnippet/>
      <SmashInfoBox/>
      <SmashFeed/>
      <SmashCTABanner/>
      <Footer/>
    </div>
  );
}

export default Smash;
