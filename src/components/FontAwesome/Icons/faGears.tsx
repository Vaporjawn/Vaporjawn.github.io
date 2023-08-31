import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../fontAwesome.css';
import { faGears } from '@fortawesome/free-solid-svg-icons';

const FAGears = () => {
  return (
    <div>
      <FontAwesomeIcon icon={faGears} size="4x" className="FontAwesomeSpaced" />
    </div>
  );
}

export default FAGears;
