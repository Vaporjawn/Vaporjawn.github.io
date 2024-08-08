import { faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import ListItem from "../../../listItem/listItem";

const LinkedInListItem = () => {
  return (
    <ListItem>
      <Link
        to="https://linkedin.com/victorwilliams719"
        target="_blank"
        rel="noreferrer"
      >
        <FontAwesomeIcon icon={faLinkedin} size="3x" className="LinkedIn" />
      </Link>
    </ListItem>
  );
};

export default LinkedInListItem;
