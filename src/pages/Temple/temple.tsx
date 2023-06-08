import React from 'react';
import CTABanner from '../../../../src/components/CTABanner/cTABanner';
import Footer from '../../../../src/components/Footer/footer';

import TempleBackgroundBanner from '../../../../src/components/Temple/TempleBackgroundBanner/templeBackgroundBanner';
import TempleBioSnippet from '../../../../src/components/Temple/TempleBioSnippet/templeBioSnippet';
import TempleCTABanner from '../../../../src/components/Temple/TempleCTABanner/templeCTABanner';
import TempleInfoBox from '../../../../src/components/Temple/TempleInfoBox/templeInfoBox';


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
