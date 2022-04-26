import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import '../fontAwesome.css';
import { faCameraRetro } from '@fortawesome/free-solid-svg-icons';

function FACameraRetro() {

  return (
    <div>
      <FontAwesomeIcon icon={faCameraRetro} size="4x" className='FontAwesomeSpaced'/>
    </div>
  );
}

export default FACameraRetro;
