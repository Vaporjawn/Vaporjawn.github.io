import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import ListItem from "../../../listItem/listItem";

const GitHubListItem = () => {
  return (
    <ListItem>
      <Link to="https://github.com/vaporjawn" target="_blank" rel="noreferrer">
        <FontAwesomeIcon icon={faGithub} size="3x" className="Github" />
      </Link>
    </ListItem>
  );
};

export default GitHubListItem;
