import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../fontAwesome.css';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';

const FATwitter = () => {
  return (
    <div>
      <FontAwesomeIcon
        icon={faTwitter}
        size="4x"
        className="FontAwesomeSpaced"
      />
    </div>
  );
}

export default FATwitter;
