import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../fontAwesome.css';
import { faCodeCompare } from '@fortawesome/free-solid-svg-icons';

const FACodeCompare = () => {
  return (
    <div>
      <FontAwesomeIcon
        icon={faCodeCompare}
        size="4x"
        className="FontAwesomeSpaced"
      />
    </div>
  );
}

export default FACodeCompare;
