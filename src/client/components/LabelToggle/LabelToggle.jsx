import React from 'react';
import PropTypes from 'prop-types';

// Core
import { Typography } from '..';

// Styles
import useLabelToggleStyles from './LabelToggle.styles';

const LabelToggle = props => {
  const {
    label,
    description,
    children,
    ...rest
  } = props;
  const classes = useLabelToggleStyles();

  return (
    <div className={classes.root} {...rest}>
      <div className={classes.text}>
        <Typography variant="subtitle">
          {label}
        </Typography>
        {description && (
          <Typography variant="subtitle" color="textSecondary">
            {description}
          </Typography>
        )}
      </div>
      {children}
    </div>
  );
};

LabelToggle.defaultProps = {
  description: null
};

LabelToggle.propTypes = {
  label: PropTypes.string.isRequired,
  description: PropTypes.string,
  children: PropTypes.node.isRequired
};

export default LabelToggle;
