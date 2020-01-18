import React from 'react';
import PropTypes from 'prop-types';

// Core
import { SvgIcon } from '@material-ui/core';

// Style
import { useIconStyles } from './Icon.style';

import icons from './icons.json';

const Icon = ({ type, ...rest }) => {
  const classes = useIconStyles();

  return (
    <SvgIcon
      classes={{ root: classes.root }}
      {...rest}
    >
      <path d={icons[type]} />
    </SvgIcon>
  );
};

Icon.propTypes = {
  type: PropTypes.oneOf(Object.keys(icons)).isRequired
};

export default Icon;
