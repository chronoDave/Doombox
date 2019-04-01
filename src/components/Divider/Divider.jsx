import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

// Core
import withStyles from '@material-ui/core/styles/withStyles';
import { Divider as MUIDivider } from '@material-ui/core';

// Style
import DividerStyle from './DividerStyle';

const Divider = props => {
  const { classes, padding, light, ...rest } = props;

  return (
    <MUIDivider
      classes={{ root: classes.root }}
      className={classNames(
        light ? classes.light : undefined,
        padding ? classes.padding : undefined
      )}
      {...rest}
    />
  );
};

Divider.propTypes = {
  classes: PropTypes.object.isRequired,
  light: PropTypes.bool,
  padding: PropTypes.bool
};

export default withStyles(DividerStyle)(Divider);
