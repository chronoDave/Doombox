import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

// Core
import withStyles from '@material-ui/core/styles/withStyles';
import { Typography as MUITypography } from '@material-ui/core';

// Style
import TypographyStyle from './TypographyStyle';

const Typography = props => {
  const { children, classes, weight, ...rest } = props;

  return (
    <MUITypography
      {...rest}
      className={classNames(
        classes.root,
        weight && classes[weight]
      )}
    >
      {children}
    </MUITypography>
  );
};

Typography.propTypes = {
  children: PropTypes.node,
  classes: PropTypes.object.isRequired,
  weight: PropTypes.oneOf([
    'light',
    'semi',
    'bold'
  ])
};

export default withStyles(TypographyStyle)(Typography);
