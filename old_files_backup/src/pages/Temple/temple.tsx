import Footer from "../../components/Footer/footer";
import TempleBackgroundBanner from "../../components/Temple/TempleBackgroundBanner/templeBackgroundBanner";
import TempleBioSnippet from "../../components/Temple/TempleBioSnippet/templeBioSnippet";
import TempleCTABanner from "../../components/Temple/TempleCTABanner/templeCTABanner";
import TempleInfoBox from "../../components/Temple/TempleInfoBox/templeInfoBox";

const Temple = () => {
  return (
    <div>
      <TempleBackgroundBanner />
      <TempleBioSnippet />
      <TempleInfoBox />
      <TempleCTABanner />
      <Footer />
    </div>
  );
};

export default Temple;
