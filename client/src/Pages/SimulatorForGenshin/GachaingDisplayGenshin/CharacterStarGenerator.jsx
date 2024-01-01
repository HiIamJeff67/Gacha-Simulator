import React from 'react';
import StarForGenshin from '../../../Components/StarForGenshin/StarForGenshin';

const CharacterStarGenerator = (props) => {
  const generateNumArray = Array.from({ length: props.generateNum }, (_, index) => index + 1);

  return (
    <>
      {generateNumArray.map((num) => (
        <React.Fragment key={num}>
          <StarForGenshin/>
          <span className='space-style' key={`space-${num}`}></span>
        </React.Fragment>
      ))}
    </>
  );
};

export default CharacterStarGenerator;
