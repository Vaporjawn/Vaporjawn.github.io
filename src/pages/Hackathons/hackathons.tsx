import Footer from "../../components/Footer/footer";
import HackathonBackgroundBanner from "../../components/Hackathons/HackathonBackgroundBanner/hackathonBackgroundBanner";
import HackathonBioSnippet from "../../components/Hackathons/HackathonBioSnippet/hackathonBioSnippet";
import HackathonCTABanner from "../../components/Hackathons/HackathonCTABanner/hackathonCTABanner";
import HackathonInfoBox from "../../components/Hackathons/HackathonInfoBox/hackathonInfoBox";

const Hackathons = () => {
  return (
    <div>
      <HackathonBackgroundBanner/>
      <HackathonBioSnippet/>
      <HackathonInfoBox/>
      <HackathonCTABanner/>
      <Footer/>
    </div>
  );
}

export default Hackathons;
