import React from 'react';
import BackgroundBanner from '../../../../src/components/BackgroundBanner/backgroundBanner';
import BioSnippet from '../../../../src/components/HomePage/BioSnippet/bioSnippet';
import CTABanner from '../../../../src/components/CTABanner/cTABanner';
import Footer from '../../../../src/components/Footer/footer';
import InstagramFeed from '../../../../src/components/InstagramFeed/instagramFeed';
import './homePage.css'
import InfoBox from '../../../../src/components/HomePage/InfoBox/infoBox';
// import logo from './logo.svg';

function HomePage() {
  return (

    <div className="App">
        <BackgroundBanner/>
        <BioSnippet/>
        <InfoBox/>
        <InstagramFeed/>
        <CTABanner/>
        <Footer/>
    </div>
  );
}

export default HomePage;
