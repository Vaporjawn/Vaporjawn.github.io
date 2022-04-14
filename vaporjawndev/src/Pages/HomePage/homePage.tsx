import { faCode } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import BackgroundBanner from '../../Components/BackgroundBanner/backgroundBanner';
import BioSnippet from '../../Components/BioSnippet/bioSnippet';
import CTABanner from '../../Components/CTABanner/cTABanner';
import Footer from '../../Components/Footer/footer';
import InfoBox from '../../Components/InfoBox/infoBox';
import Segmenter from '../../Components/Segmenter/segmenter';
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
        <Segmenter iconName={faCode}/>
        <BioSnippet/>
        <InfoBox/>
        <CTABanner/>
        <Footer/>
    </div>
  );
}

export default HomePage;
