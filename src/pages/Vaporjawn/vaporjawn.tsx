import React from 'react';
import Footer from '../../../../src/components/Footer/footer';
import VaporjawnBackgroundBanner from '../../../../src/components/Vaporjawn/VaporjawnBackgroundBanner/vaporjawnBackgroundBanner';
import VaporjawnBioSnippet from '../../../../src/components/Vaporjawn/VaporjawnBioSnippet/vaporjawnBioSnippet';
import VaporjawnCTABanner from '../../../../src/components/Vaporjawn/VaporjawnCTABanner/vaporjawnCTABanner';
import VaporjawnFeed from '../../../../src/components/Vaporjawn/VaporjawnFeed/vaporjawnFeed';
import VaporjawnInfoBox from '../../../../src/components/Vaporjawn/VaporjawnInfoBox/vaporjawnInfoBox';



function Vaporjawn() {
  return (
    <div>
      <VaporjawnBackgroundBanner/>
      <VaporjawnBioSnippet/>
      <VaporjawnInfoBox/>
      <VaporjawnFeed/>
      <VaporjawnCTABanner/>
      <Footer/>
    </div>
  );
}

export default Vaporjawn;
