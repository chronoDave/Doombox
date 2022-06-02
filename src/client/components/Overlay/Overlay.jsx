import React from 'react';
import PropTypes from 'prop-types';

import { cx } from '../../utils';

// Core
import './Overlay.scss';

const Overlay = ({ open, children, className }) => (
  <div
    className={cx(
      'Overlay',
      open && 'open',
      className
    )}
  >
    {children}
  </div>
);

Overlay.defaultProps = {
  open: false,
  className: null
};

Overlay.propTypes = {
  open: PropTypes.bool,
  className: PropTypes.string,
  children: PropTypes.node.isRequired
};

export default Overlay;
