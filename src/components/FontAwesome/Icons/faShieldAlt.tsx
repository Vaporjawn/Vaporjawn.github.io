import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../fontAwesome.css';
import { faShieldAlt } from '@fortawesome/free-solid-svg-icons';

const FAShieldAlt = () => {
  return (
    <div>
      <FontAwesomeIcon
        icon={faShieldAlt}
        size="4x"
        className="FontAwesomeSpaced"
      />
    </div>
  );
}

export default FAShieldAlt;
