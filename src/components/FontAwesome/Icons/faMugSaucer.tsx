import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../fontAwesome.css';
import { faMugSaucer } from '@fortawesome/free-solid-svg-icons';

const FAMugSaucer = () => {
  return (
    <div>
      <FontAwesomeIcon
        icon={faMugSaucer}
        size="4x"
        className="FontAwesomeSpaced"
      />
    </div>
  );
}

export default FAMugSaucer;
