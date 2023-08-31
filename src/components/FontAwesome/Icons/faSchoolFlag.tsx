import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../fontAwesome.css';
import { faSchoolFlag } from '@fortawesome/free-solid-svg-icons';

const FASchoolFlag = () => {
  return (
    <div>
      <FontAwesomeIcon
        icon={faSchoolFlag}
        size="4x"
        className="FontAwesomeSpaced"
      />
    </div>
  );
}

export default FASchoolFlag;
