import { Route } from "react-router-dom";
import ErrorPage from "../../pages/ErrorPage/errorPage";

const ErrorPageRoute = () => {
  return <Route path="*" element={<ErrorPage />} />;
}

export default ErrorPageRoute;