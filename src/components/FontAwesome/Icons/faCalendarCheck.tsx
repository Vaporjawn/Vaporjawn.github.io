import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../fontAwesome.css';
import { faCalendarCheck } from '@fortawesome/free-solid-svg-icons';

const FACalendarCheck = () => {
  return (
    <div>
      <FontAwesomeIcon
        icon={faCalendarCheck}
        size="4x"
        className="FontAwesomeSpaced"
      />
    </div>
  );
}

export default FACalendarCheck;
