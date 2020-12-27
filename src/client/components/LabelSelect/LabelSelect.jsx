import React from 'react';
import PropTypes from 'prop-types';

// Core
import { Typography } from '../Typography';

// Styles
import useLabelSelectStyles from './LabelSelect.styles';

const InputLabel = props => {
  const {
    label,
    description,
    children
  } = props;
  const classes = useLabelSelectStyles();

  return (
    <div className={classes.root}>
      <Typography
        variant="subtitle"
        className={classes.label}
      >
        {label}
      </Typography>
      {children}
      {description && (
        <Typography>
          {description}
        </Typography>
      )}
    </div>
  );
};

InputLabel.defaultProps = {
  description: null
};

InputLabel.propTypes = {
  label: PropTypes.string.isRequired,
  description: PropTypes.string,
  children: PropTypes.node.isRequired
};

export default InputLabel;
