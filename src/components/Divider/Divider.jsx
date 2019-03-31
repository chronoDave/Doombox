import React from 'react';
import PropTypes from 'prop-types';

// Core
import withStyles from '@material-ui/core/styles/withStyles';
import { Divider as MUIDivider } from '@material-ui/core';

// Style
import DividerStyle from './DividerStyle';

const Divider = props => {
  const { classes, light, ...rest } = props;

  return (
    <MUIDivider
      classes={{ root: classes.root }}
      className={light ? classes.light : undefined}
      {...rest}
    />
  );
};

Divider.propTypes = {
  classes: PropTypes.object.isRequired,
  light: PropTypes.bool
};

export default withStyles(DividerStyle)(Divider);
