import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';

function Segmenter(iconName: any) {
  // const unicode = fontAwesomeArray.find(e => e.icon[3] == iconName);

  return (
    <div>
      <FontAwesomeIcon icon={iconName} size="3x" className='segmenterIcon'/>
    </div>
  );
  let check;
}

export default Segmenter;
