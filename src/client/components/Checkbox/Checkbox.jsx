import React from 'react';
import { cx } from 'emotion';
import PropTypes from 'prop-types';

// Core
import { Typography } from '../Typography';

// Styles
import useCheckboxStyles from './Checkbox.styles';

const Checkbox = props => {
  const {
    checked,
    label,
    className,
    ...rest
  } = props;
  const classes = useCheckboxStyles();

  return (
    <div className={cx(classes.root, className)}>
      <input
        type="checkbox"
        checked={checked}
        className={classes.input}
        {...rest}
      />
      <Typography>
        {label}
      </Typography>
    </div>
  );
};

Checkbox.defaultProps = {
  checked: false,
  className: null
};

Checkbox.propTypes = {
  checked: PropTypes.bool,
  className: PropTypes.string,
  label: PropTypes.string.isRequired
};

export default Checkbox;
