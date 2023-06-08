import React from 'react';
import Footer from '../../../../src/components/Footer/footer';
import SmashBackgroundBanner from '../../../../src/components/Smash/SmashBackgroundBanner/smashBackgroundBanner';
import SmashBioSnippet from '../../../../src/components/Smash/SmashBioSnippet/smashBioSnippet';
import SmashCTABanner from '../../../../src/components/Smash/SmashCTABanner/smashCTABanner';
import SmashFeed from '../../../../src/components/Smash/SmashFeed/smashFeed';
import SmashInfoBox from '../../../../src/components/Smash/SmashInfoBox/smashInfoBox';

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
