import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import '../fontAwesome.css';
import { faChalkboard, faSchoolFlag } from '@fortawesome/free-solid-svg-icons';

function FAChalkboard() {

  return (
    <div>
      <FontAwesomeIcon icon={faChalkboard} size="4x" className='FontAwesomeSpaced'/>
    </div>
  );
}

export default FAChalkboard;
