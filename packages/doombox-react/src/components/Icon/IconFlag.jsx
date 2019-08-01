import React from 'react';
import PropTypes from 'prop-types';

const IconFlag = ({ country }) => (
  <img
    src={`static/images/flags/${country}.png`}
    alt={`Flag ${country}`}
    style={{
      marginRight: 8,
      width: 24,
      height: 24
    }}
  />
);

IconFlag.propTypes = {
  country: PropTypes.oneOf([
    'nl', 'uk', 'us'
  ]).isRequired
};

export default IconFlag;
