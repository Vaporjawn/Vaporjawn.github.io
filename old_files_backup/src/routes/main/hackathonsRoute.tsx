import { Route } from "react-router-dom";
import Hackathons from "../../pages/Hackathons/hackathons";

const HackathonsRoute = () => {
  return <Route path="/Hackathons" element={<Hackathons />} />;
};

export default HackathonsRoute;