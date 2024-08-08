import { Route } from "react-router-dom";
import Temple from "../../pages/Temple/temple";

const TempleRoute = () => {
  return <Route path="/Temple" element={<Temple />} />;
}

export default TempleRoute;