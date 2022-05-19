import React from 'react';
import PropTypes from 'prop-types';

// Core
import { Fade } from '..';

import './Overlay.scss';

const Overlay = ({ open, children }) => (
  <Fade visible={open}>
    <div className="Overlay">
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
