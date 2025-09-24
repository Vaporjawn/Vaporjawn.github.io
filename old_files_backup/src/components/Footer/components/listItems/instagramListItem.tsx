import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import ListItem from "../../../listItem/listItem";

const InstagramListItem = () => {
  return (
    <ListItem>
      <Link
        to="https://instagram.com/vaporjawn"
        target="_blank"
        rel="noreferrer"
      >
        <FontAwesomeIcon icon={faInstagram} size="3x" className="Instagram" />
      </Link>
    </ListItem>
  );
};

export default InstagramListItem;
