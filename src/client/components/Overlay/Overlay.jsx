import React from 'react';
import { cx } from '@doombox-utils';
import PropTypes from 'prop-types';

// Core
import { Fade } from '..';

import './Overlay.scss';

const Overlay = ({ open, children, className }) => (
  <Fade visible={open}>
    <div className={cx("Overlay", className)}>
      {children}
    </div>
  </Fade>
);

Overlay.defaultProps = {
  open: false
};

Overlay.propTypes = {
  open: PropTypes.bool,
  children: PropTypes.node.isRequired
};

export default Overlay;
