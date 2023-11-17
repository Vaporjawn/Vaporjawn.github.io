import { faFacebook } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import ListItem from "../../../listItem/listItem";

const FacebookListItem = () => {
  return (
    <ListItem>
      <Link
        to="https://www.facebook.com/victor.williams.jr"
        target="_blank"
        rel="noreferrer"
      >
        <FontAwesomeIcon icon={faFacebook} size="3x" className="Facebook" />
      </Link>
    </ListItem>
  );
};

export default FacebookListItem;
