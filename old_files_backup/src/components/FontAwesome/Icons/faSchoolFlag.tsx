import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../fontAwesome.css";
import { faSchoolFlag } from "@fortawesome/free-solid-svg-icons";

const FASchoolFlag = () => {
  return (
    <FontAwesomeIcon
      icon={faSchoolFlag}
      size="4x"
      className="FontAwesomeSpaced"
    />
  );
};

export default FASchoolFlag;
