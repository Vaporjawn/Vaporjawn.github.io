import { Route } from "react-router-dom";
import ComingSoon from "../../pages/ComingSoon/comingSoon";

const ComingSoonRoute = () => {
  return <Route path="/ComingSoon" element={<ComingSoon />} />;
}

export default ComingSoonRoute;