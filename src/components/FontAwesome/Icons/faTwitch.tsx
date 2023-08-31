import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../fontAwesome.css';
import { faTwitch } from '@fortawesome/free-brands-svg-icons';

const FATwitch = () => {
  return (
    <div>
      <FontAwesomeIcon
        icon={faTwitch}
        size="4x"
        className="FontAwesomeSpaced"
      />
    </div>
  );
}

export default FATwitch;
