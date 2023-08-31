import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../fontAwesome.css';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';

const FAInstagram = () => {
  return (
    <div>
      <FontAwesomeIcon
        icon={faInstagram}
        size="4x"
        className="FontAwesomeSpaced"
      />
    </div>
  );
}

export default FAInstagram;
