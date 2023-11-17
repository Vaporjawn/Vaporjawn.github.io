import React from 'react';
import BackgroundBanner from '../../Components/BackgroundBanner/backgroundBanner';
import BioSnippet from '../../Components/HomePage/BioSnippet/bioSnippet';
import CTABanner from '../../Components/CTABanner/cTABanner';
import Footer from '../../Components/Footer/footer';
import InstagramFeed from '../../Components/InstagramFeed/instagramFeed';
import './homePage.css'
import InfoBox from '../../Components/HomePage/InfoBox/infoBox';
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
