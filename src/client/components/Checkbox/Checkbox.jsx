import React from 'react';
import { cx } from '@doombox-utils';
import PropTypes from 'prop-types';

// Core
import { Typography } from '..';

import './Checkbox.scss';

const Checkbox = ({ label, className, ...rest }) => (
  <div className={cx('Checkbox', className)}>
    <input
      type="checkbox"
      {...rest}
    />
    <Typography>
      {label}
    </Typography>
  </div>
);

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
