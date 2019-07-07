import React from 'react';
import PropTypes from 'prop-types';

// Icon
import IconError from '@material-ui/icons/ErrorOutline';

// Core
import { withStyles } from '@material-ui/core/styles';

import { Typography } from '../Typography';

// Style
import FieldStyle from './FieldStyle';

const FieldError = props => {
  const { classes, errors } = props;

  return (
    <div className={classes.root}>
      <IconError classes={{ root: classes.icon }} />
      {errors.map(error => (
        <Typography
          key={error.key || error.message}
          color="white"
          paragraph
        >
          {error.message}
        </Typography>
      ))}
    </div>
  );
};

FieldError.propTypes = {
  classes: PropTypes.object.isRequired,
  errors: PropTypes.array.isRequired
};

export default withStyles(
  FieldStyle
)(FieldError);
