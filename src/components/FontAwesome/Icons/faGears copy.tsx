import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../fontAwesome.css';
import { faHashtag } from '@fortawesome/free-solid-svg-icons';

const FAHashtag = () => {
  return (
    <div>
      <FontAwesomeIcon
        icon={faHashtag}
        size="4x"
        className="FontAwesomeSpaced"
      />
    </div>
  );
}

export default FAHashtag;
