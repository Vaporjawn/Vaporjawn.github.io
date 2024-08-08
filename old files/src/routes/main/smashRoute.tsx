import { Route } from "react-router-dom";
import Smash from "../../pages/Smash/smash";

const SmashRoute = () => {
  return <Route path="/SSBM" element={<Smash />} />;
}

export default SmashRoute;