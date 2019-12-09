import React from 'react';
import PropTypes from 'prop-types';

// Core
import { SvgIcon } from '@material-ui/core';

// Style
import { useIconStyles } from './Icon.style';

import icons from './icons.json';

const Icon = ({ type, color, fontSize }) => {
  const classes = useIconStyles();

  return (
    <SvgIcon
      color={color}
      classes={{ root: classes.root }}
      fontSize={fontSize}
    >
      <path d={icons[type]} />
    </SvgIcon>
  );
};

Icon.propTypes = {
  type: PropTypes.oneOf(Object.keys(icons)).isRequired,
  color: PropTypes.oneOf([
    'action',
    'disabled',
    'error',
    'inherit',
    'primary',
    'secondary'
  ]),
  fontSize: PropTypes.oneOf([
    'default',
    'inherit',
    'large',
    'small'
  ])
};

Icon.defaultProps = {
  color: 'inherit',
  fontSize: 'default'
};

export default Icon;
