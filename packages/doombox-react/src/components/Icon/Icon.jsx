import React from 'react';
import PropTypes from 'prop-types';

// Core
import { SvgIcon } from '@material-ui/core';

import icons from './icons.json';

const Icon = ({ type, ...rest }) => (
  <SvgIcon {...rest}>
    <path d={icons[type]} />
  </SvgIcon>
);

Icon.propTypes = {
  type: PropTypes.oneOf(Object.keys(icons)).isRequired
};

export default Icon;
