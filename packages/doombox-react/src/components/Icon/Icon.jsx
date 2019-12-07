import React from 'react';
import PropTypes from 'prop-types';

// Core
import { withStyles } from '@material-ui/core/styles';
import { SvgIcon } from '@material-ui/core';

// Style
import { IconStyles } from './Icon.style';

import icons from './icons.json';

const Icon = props => {
  const {
    type,
    color,
    classes,
    fontSize
  } = props;

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
  classes: PropTypes.shape({
    root: PropTypes.string.isRequired
  }).isRequired,
  type: PropTypes.oneOf([
    'minimize'
  ]).isRequired,
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

export default withStyles(IconStyles)(Icon);
