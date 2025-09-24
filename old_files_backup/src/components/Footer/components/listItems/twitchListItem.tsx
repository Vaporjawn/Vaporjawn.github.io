import { faTwitch } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import ListItem from "../../../listItem/listItem";

const TwitchListItem = () => {
  return (
    <ListItem>
      <Link to="https://twitch.com/vaporjawn" target="_blank" rel="noreferrer">
        <FontAwesomeIcon icon={faTwitch} size="3x" className="Twitch" />
      </Link>
    </ListItem>
  );
};

export default TwitchListItem;
