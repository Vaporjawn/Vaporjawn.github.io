import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../fontAwesome.css";
import { faBugSlash } from "@fortawesome/free-solid-svg-icons";

const FABugSlash = () => {
  return (
    <FontAwesomeIcon
      icon={faBugSlash}
      size="4x"
      className="FontAwesomeSpaced"
    />
  );
};

export default FABugSlash;
