import React from 'react';
import Star1999 from '../../../Components/StarFor1999/StarFor1999.jsx';

const CharacterStarGenerator = (props) => {
  const generateNumArray = Array.from({ length: props.generateNum }, (_, index) => index + 1);

  return (
    <>
      {generateNumArray.map((num) => (
        <React.Fragment key={num}>
          <Star1999 />
          <span className='space-style' key={`space-${num}`}></span>
        </React.Fragment>
      ))}
    </>
  );
};

export default CharacterStarGenerator;
