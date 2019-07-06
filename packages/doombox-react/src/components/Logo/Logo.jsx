import React from 'react';
import PropTypes from 'prop-types';

// Assets
import LogoImage from '../../assets/image/icon.png';

const Logo = props => {
  const { width, height } = props;

  return (
    <img
      style={{
        width,
        height
      }}
      alt="Doombox application logo"
      src={LogoImage}
    />
  );
};

Logo.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number
};

Logo.defaultProps = {
  width: null,
  height: null
};

export default Logo;
