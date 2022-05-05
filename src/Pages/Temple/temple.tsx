import React from 'react';
import CTABanner from '../../Components/CTABanner/cTABanner';
import Footer from '../../Components/Footer/footer';

import TempleBackgroundBanner from '../../Components/Temple/TempleBackgroundBanner/templeBackgroundBanner';
import TempleBioSnippet from '../../Components/Temple/TempleBioSnippet/templeBioSnippet';
import TempleCTABanner from '../../Components/Temple/TempleCTABanner/templeCTABanner';
import TempleInfoBox from '../../Components/Temple/TempleInfoBox/templeInfoBox';


function Temple() {
  return (
    <div>
      <TempleBackgroundBanner/>
      <TempleBioSnippet/>
      <TempleInfoBox/>
      <TempleCTABanner/>
      <Footer/>
    </div>
  );
}

export default Temple;
