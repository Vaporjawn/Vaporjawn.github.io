import Footer from "../../components/Footer/footer";
import VaporjawnBackgroundBanner from "../../components/Vaporjawn/VaporjawnBackgroundBanner/vaporjawnBackgroundBanner";
import VaporjawnBioSnippet from "../../components/Vaporjawn/VaporjawnBioSnippet/vaporjawnBioSnippet";
import VaporjawnCTABanner from "../../components/Vaporjawn/VaporjawnCTABanner/vaporjawnCTABanner";
import VaporjawnFeed from "../../components/Vaporjawn/VaporjawnFeed/vaporjawnFeed";
import VaporjawnInfoBox from "../../components/Vaporjawn/VaporjawnInfoBox/vaporjawnInfoBox";

function Vaporjawn() {
  return (
    <div>
      <VaporjawnBackgroundBanner />
      <VaporjawnBioSnippet />
      <VaporjawnInfoBox />
      <VaporjawnFeed />
      <VaporjawnCTABanner />
      <Footer />
    </div>
  );
}

export default Vaporjawn;
