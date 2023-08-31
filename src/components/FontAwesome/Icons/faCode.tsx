import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../fontAwesome.css';
import { faCode } from '@fortawesome/free-solid-svg-icons';

const FACode = () => {
  return (
    <div>
      <FontAwesomeIcon icon={faCode} size="4x" className="FontAwesome" />
      <div className="bottomBorder"></div>
    </div>
  );
}

export default FACode;
