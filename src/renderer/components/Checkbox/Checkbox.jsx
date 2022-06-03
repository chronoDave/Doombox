import React from 'react';
import PropTypes from 'prop-types';

import { cx } from '../../utils';

import './Checkbox.scss';

const Checkbox = ({ label, className, ...rest }) => (
  <div className={cx('Checkbox', className)}>
    <input type="checkbox" {...rest} />
    <p>{label}</p>
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
