import React, { useState, useRef, useLayoutEffect } from 'react';
import { cx } from 'emotion';
import PropTypes from 'prop-types';

// Theme
import { transitions } from '../../theme';

// Styles
import useOverlayStyles from './Overlay.styles';

const Overlay = ({ open, className, children }) => {
  const [visible, setVisible] = useState(true);

  const duration = transitions.duration.shortest;
  const classes = useOverlayStyles({ duration });

  const timeout = useRef(null);

  useLayoutEffect(() => {
    if (!open) {
      timeout.current = setTimeout(() => setVisible(false), duration);
    } else {
      setVisible(true);
    }

    return () => {
      if (timeout.current) {
        clearTimeout(timeout.current);
        timeout.current = null;
      }
    };
  }, [duration, open]);

  return (
    <div
      className={cx(classes.root, {
        [classes.hidden]: !open,
        [classes.disabled]: !visible && !open
      }, className)}
    >
      {children}
    </div>
  );
};

Overlay.defaultProps = {
  open: false,
  className: ''
};

Overlay.propTypes = {
  children: PropTypes.node.isRequired,
  open: PropTypes.bool,
  className: PropTypes.string
};

export default Overlay;
