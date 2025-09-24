import { faAngellist } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import ListItem from "../../../listItem/listItem";

const AngelListListItem = () => {
  return (
    <ListItem>
      <Link
        to="https://angel.co/victor-wiliams"
        target="_blank"
        rel="noreferrer"
      >
        <FontAwesomeIcon icon={faAngellist} size="3x" className="AngelList" />
      </Link>
    </ListItem>
  );
};

export default AngelListListItem;
