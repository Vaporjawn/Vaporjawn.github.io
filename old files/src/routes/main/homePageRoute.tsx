import { Route } from "react-router-dom";
import HomePage from "../../pages/HomePage/homePage";

const HomePageRoute = () => {
  return <Route path="/" element={<HomePage />} />;
};

export default HomePageRoute;