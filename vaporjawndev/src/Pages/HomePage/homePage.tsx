import { faCode } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import BackgroundBanner from '../../Components/BackgroundBanner/backgroundBanner';
import BioSnippet from '../../Components/BioSnippet/bioSnippet';
import CTABanner from '../../Components/CTABanner/cTABanner';
import FACode from '../../Components/FontAwesome/Icons/faCode';
import Footer from '../../Components/Footer/footer';
import InfoBox from '../../Components/InfoBox/infoBox';
import InstagramFeed from '../../Components/InstagramFeed/instagramFeed';
import './homePage.css'
// import logo from './logo.svg';
// import './App.css';

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
        <FACode/>
        <BioSnippet/>
        <InfoBox/>
        <InstagramFeed/>
        <CTABanner/>
        <Footer/>
    </div>
  );
}

export default HomePage;
