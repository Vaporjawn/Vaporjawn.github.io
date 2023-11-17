import React from 'react';
import Footer from '../../Components/Footer/footer';
import VaporjawnBackgroundBanner from '../../Components/Vaporjawn/VaporjawnBackgroundBanner/vaporjawnBackgroundBanner';
import VaporjawnBioSnippet from '../../Components/Vaporjawn/VaporjawnBioSnippet/vaporjawnBioSnippet';
import VaporjawnCTABanner from '../../Components/Vaporjawn/VaporjawnCTABanner/vaporjawnCTABanner';
import VaporjawnFeed from '../../Components/Vaporjawn/VaporjawnFeed/vaporjawnFeed';
import VaporjawnInfoBox from '../../Components/Vaporjawn/VaporjawnInfoBox/vaporjawnInfoBox';



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
