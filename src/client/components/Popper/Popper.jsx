import React, { useState, useRef, useLayoutEffect } from 'react';
import { createPortal } from 'react-dom';
import { cx } from 'emotion';
import { createPopper } from '@popperjs/core';
import PropTypes from 'prop-types';

// Theme
import { transitions } from '../../theme';

// Validation
import { propAnchorEl } from '../../validation/propTypes';

// Styles
import usePopperStyles from './Popper.styles';

const Popper = props => {
  const {
    children,
    disablePortal,
    anchorEl,
    className,
    open,
    placement,
    modifiers,
    position,
    ...rest
  } = props;
  const [visible, setVisible] = useState(true);

  const classes = usePopperStyles();

  const ref = useRef(null);
  const popper = useRef(null);
  const timeout = useRef(null);

  const cleanup = () => {
    if (popper.current) {
      popper.current.destroy();
      popper.current = null;
    }
  };

  useLayoutEffect(() => {
    if (anchorEl && ref.current) {
      cleanup();
      popper.current = createPopper(anchorEl, ref.current, {
        placement,
        modifiers,
        position,
      });
    }

    return cleanup;
  }, [anchorEl, placement, modifiers, position]);

  useLayoutEffect(() => {
    if (!open) {
      timeout.current = setTimeout(
        () => setVisible(false),
        transitions.durations.shortest
      );
    } else {
      setVisible(true);
    }

    return () => {
      if (timeout.current) {
        clearTimeout(timeout.current);
        timeout.current = null;
      }
    };
  }, [open]);

  if (!anchorEl) return null;
  return createPortal(
    <div
      className={cx(classes.root, {
        [classes.hidden]: !open,
        [classes.disabled]: !visible && !open
      }, className)}
      {...rest}
      ref={ref}
    >
      {children}
    </div>,
    disablePortal ?
      anchorEl :
      document.getElementById('root')
  );
};

Popper.defaultProps = {
  disablePortal: false,
  className: null,
  anchorEl: null,
  open: false,
  placement: 'auto',
  position: 'absolute',
  modifiers: []
};

Popper.propTypes = {
  children: PropTypes.node.isRequired,
  disablePortal: PropTypes.bool,
  className: PropTypes.string,
  anchorEl: propAnchorEl,
  open: PropTypes.bool,
  placement: PropTypes.oneOf([
    'auto',
    'auto-start',
    'auto-end',
    'top',
    'top-start',
    'top-end',
    'bottom',
    'bottom-start',
    'bottom-end',
    'right',
    'right-start',
    'right-end',
    'left',
    'left-start',
    'left-end'
  ]),
  modifiers: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    enabled: PropTypes.bool.isRequired,
    phase: PropTypes.oneOf([
      'beforeRead',
      'read',
      'afterRead',
      'beforeMain',
      'main',
      'afterMain',
      'beforeWrite',
      'write',
      'afterWrite'
    ]).isRequired,
    fn: PropTypes.func.isRequired,
    requires: PropTypes.arrayOf(PropTypes.string),
    requiresIfExists: PropTypes.arrayOf(PropTypes.string),
    effect: PropTypes.func,
    options: PropTypes.shape({}),
    data: PropTypes.shape({})
  })),
  position: PropTypes.oneOf(['absolute', 'fixed']),
};

export default Popper;
