import BackgroundBanner from "../../components/BackgroundBanner/backgroundBanner";
import CTABanner from "../../components/CTABanner/cTABanner";
import Footer from "../../components/Footer/footer";
import BioSnippet from "../../components/HomePage/BioSnippet/bioSnippet";
import InfoBox from "../../components/HomePage/InfoBox/infoBox";
import InstagramFeed from "../../components/InstagramFeed/instagramFeed";
import "./homePage.css";

const HomePage = () => {
  return (
    <div className="App">
      <BackgroundBanner />
      <BioSnippet />
      <InfoBox />
      <InstagramFeed />
      <CTABanner />
      <Footer />
    </div>
  );
};

export default HomePage;
