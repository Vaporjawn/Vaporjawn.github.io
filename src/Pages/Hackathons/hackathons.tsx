import React from 'react';
import Footer from '../../Components/Footer/footer';
import HackathonBackgroundBanner from '../../Components/Hackathons/HackathonBackgroundBanner/hackathonBackgroundBanner';
import HackathonBioSnippet from '../../Components/Hackathons/HackathonBioSnippet/hackathonBioSnippet';
import HackathonCTABanner from '../../Components/Hackathons/HackathonCTABanner/hackathonCTABanner';
import HackathonInfoBox from '../../Components/Hackathons/HackathonInfoBox/hackathonInfoBox';



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
