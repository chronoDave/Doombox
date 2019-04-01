import React from 'react';

// Img
import MainBackgroundImage from '../../assets/images/bg.jpg';

const MainBackground = props => {
  return (
    <div style={{
      position: 'absolute',
      width: '100%',
      height: '100%',
      backgroundImage: `url(${MainBackgroundImage})`,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: '210px 0px',
      backgroundSize: 'cover',
      opacity: 0.5,
      filter: 'blur(3px)',
    }} />
  );
};

export default MainBackground;
