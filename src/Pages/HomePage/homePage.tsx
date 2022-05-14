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
      <head>
        <title>Victor's CodeCabin</title>
        <meta name="description" content="Victor Williams Website. Also known as Vaporjawn"/>
        <meta name="keywords" content="Victor Williams,Victor,Williams,web,designer,developer,software,engineer,Temple University,SSBM,Vaporjawn,vaporglow"/>
        <script async src="https://www.googletagmanager.com/gtag/js?id=UA-48129201-1"></script>
      </head>
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
