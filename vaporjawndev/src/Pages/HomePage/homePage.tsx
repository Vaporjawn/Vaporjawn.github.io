import React from 'react';
import BioSnippet from '../../Components/BioSnippet/bioSnippet';
import Footer from '../../Components/Footer/footer';
import HomeHeader from '../../Components/HomeHeader/homeHeader';
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
        <HomeHeader/>
        <BioSnippet/>
        <Footer/>

    </div>
  );
}

export default HomePage;
