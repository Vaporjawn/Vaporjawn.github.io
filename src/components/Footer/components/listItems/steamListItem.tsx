import { faSteam } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import ListItem from "../../../listItem/listItem";

const SteamListItem = () => {
  return (
    <ListItem>
      <Link
        to="https://steamcommunity.com/id/vaporjawn"
        target="_blank"
        rel="noreferrer"
      >
        <FontAwesomeIcon icon={faSteam} size="3x" className="Steam" />
      </Link>
    </ListItem>
  );
};

export default SteamListItem;
