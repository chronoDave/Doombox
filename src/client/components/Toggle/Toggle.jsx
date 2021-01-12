import React from 'react';
import { cx } from 'emotion';
import PropTypes from 'prop-types';

// Styles
import useToggleStyles from './Toggle.styles';

const Toggle = ({ value, ...rest }) => {
  const classes = useToggleStyles();

  return (
    <div
      className={cx(classes.root, {
        [classes.active]: value
      })}
      // Aria
      role="button"
      tabIndex={0}
      {...rest}
    >
      <div
        className={cx(classes.thumb, {
          [classes.thumbActive]: value
        })}
      />
    </div>
  );
};

Toggle.defaultProps = {
  value: false
};

Toggle.propTypes = {
  value: PropTypes.bool
};

export default Toggle;
