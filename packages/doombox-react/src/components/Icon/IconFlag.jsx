import React from 'react';
import PropTypes from 'prop-types';

// Utils
import { languages } from '../../utils';

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
  country: PropTypes.oneOf(languages).isRequired
};

export default IconFlag;
