import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../fontAwesome.css';
import { faLaptopCode } from '@fortawesome/free-solid-svg-icons';

const FALaptopCode = () => {
  return (
    <div>
      <FontAwesomeIcon
        icon={faLaptopCode}
        size="4x"
        className="FontAwesomeSpaced"
      />
    </div>
  );
}

export default FALaptopCode;
