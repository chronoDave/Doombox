import React from 'react';
import PropTypes from 'prop-types';

// Core
import { Fade } from '..';

// Styles
import useOverlayStyles from './Overlay.styles';

const Overlay = ({ open, children }) => {
  const classes = useOverlayStyles();

  return (
    <Fade visible={open}>
      <div className={classes.root}>
        {children}
      </div>
    </Fade>
  );
};

Overlay.defaultProps = {
  open: false
};

Overlay.propTypes = {
  open: PropTypes.bool,
  children: PropTypes.node.isRequired
};

export default Overlay;
