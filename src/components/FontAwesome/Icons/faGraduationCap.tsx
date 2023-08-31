import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../fontAwesome.css';
import {
  faGraduationCap
} from '@fortawesome/free-solid-svg-icons';

const FAGraduationCap = () => {
  return (
    <div>
      <FontAwesomeIcon
        icon={faGraduationCap}
        size="4x"
        className="FontAwesomeSpaced"
      />
    </div>
  );
}

export default FAGraduationCap;
