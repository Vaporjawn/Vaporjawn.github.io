import Footer from '../../components/Footer/footer';
import SmashBackgroundBanner from '../../components/Smash/SmashBackgroundBanner/smashBackgroundBanner';
import SmashBioSnippet from '../../components/Smash/SmashBioSnippet/smashBioSnippet';
import SmashCTABanner from '../../components/Smash/SmashCTABanner/smashCTABanner';
import SmashFeed from '../../components/Smash/SmashFeed/smashFeed';
import SmashInfoBox from '../../components/Smash/SmashInfoBox/smashInfoBox';

const Smash = () => {
  return (
    <div>
      <SmashBackgroundBanner />
      <SmashBioSnippet />
      <SmashInfoBox />
      <SmashFeed />
      <SmashCTABanner />
      <Footer />
    </div>
  );
}

export default Smash;
