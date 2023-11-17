import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import ListItem from "../../../listItem/listItem";

const TwitterListItem = () => {
  return (
    <ListItem>
      <Link to="https://twitter.com/vaporjawn" target="_blank" rel="noreferrer">
        <FontAwesomeIcon icon={faTwitter} size="3x" className="Twitter" />
      </Link>
    </ListItem>
  );
};

export default TwitterListItem;
