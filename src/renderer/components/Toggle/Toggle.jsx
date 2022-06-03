import React from 'react';
import PropTypes from 'prop-types';

import { cx } from '../../utils';

import './Toggle.scss';

const Toggle = ({ value, ...rest }) => (
  <div
    className={cx('Toggle', value && 'active')}
    // Aria
    role="button"
    tabIndex={0}
    {...rest}
  >
    <div className="thumb" />
  </div>
);

Toggle.defaultProps = {
  value: false
};

Toggle.propTypes = {
  value: PropTypes.bool
};

export default Toggle;
