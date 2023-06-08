import React from 'react';
import Footer from '../../../../src/components/Footer/footer';
import HackathonBackgroundBanner from '../../../../src/components/Hackathons/HackathonBackgroundBanner/hackathonBackgroundBanner';
import HackathonBioSnippet from '../../../../src/components/Hackathons/HackathonBioSnippet/hackathonBioSnippet';
import HackathonCTABanner from '../../../../src/components/Hackathons/HackathonCTABanner/hackathonCTABanner';
import HackathonInfoBox from '../../../../src/components/Hackathons/HackathonInfoBox/hackathonInfoBox';



const Hackathons = () => {
  return (
    <div>
      <HackathonBackgroundBanner/>
      <HackathonBioSnippet/>
      <HackathonInfoBox/>
      <HackathonCTABanner/>
      <Footer/>
    </div>
  );
}

export default Hackathons;
