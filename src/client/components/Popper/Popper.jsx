import React, { useRef, useState, useLayoutEffect } from 'react';
import { createPortal } from 'react-dom';
import { cx } from 'emotion';
import { createPopper } from '@popperjs/core';
import PropTypes from 'prop-types';

// Validation
import { propAnchorEl } from '../../validation/propTypes';

// Styles
import usePopperStyles from './Popper.styles';

const Popper = props => {
  const {
    children,
    disablePortal,
    position,
    anchorEl,
    duration,
    className,
    placement,
    open,
    ...rest
  } = props;
  const [transition, setTransition] = useState(open);

  const ref = useRef(null);
  const popper = useRef(null);
  const timer = useRef(null);

  const classes = usePopperStyles({ duration });

  const render = (
    <div
      className={cx(classes.root, {
        [classes.hidden]: !open,
        [classes.unmount]: !open && !transition
      }, className)}
      {...rest}
      ref={ref}
    >
      {children}
    </div>
  );

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
        strategy: position,
      });
    }

    return cleanup;
  }, [anchorEl, placement, position]);

  useLayoutEffect(() => {
    if (!open) {
      timer.current = setTimeout(() => setTransition(false), duration);
    } else {
      setTransition(true);
    }

    return () => {
      if (timer.current) {
        clearTimeout(timer.current);
        timer.current = null;
      }
    };
  }, [duration, open]);

  return disablePortal ?
    render :
    createPortal(
      render,
      document.getElementById('root')
    );
};

Popper.defaultProps = {
  duration: null,
  disablePortal: false,
  position: 'fixed',
  placement: 'auto',
  className: null,
  anchorEl: null,
  open: false
};

Popper.propTypes = {
  duration: PropTypes.number,
  children: PropTypes.node.isRequired,
  disablePortal: PropTypes.bool,
  position: PropTypes.oneOf(['fixed', 'absolute']),
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
  className: PropTypes.string,
  anchorEl: propAnchorEl,
  open: PropTypes.bool
};

export default Popper;
