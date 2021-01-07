import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { createPopper } from '@popperjs/core';
import { cx } from 'emotion';
import PropTypes from 'prop-types';

// Validation
import { propAnchorEl, propPopperPlacement } from '../../validation/propTypes';

// Styles
import usePopperBaseStyles from './PopperBase.styles';

const PopperBase = props => {
  const {
    anchorEl,
    placement,
    className,
    children,
    ...rest
  } = props;
  const classes = usePopperBaseStyles();

  const ref = useRef();
  const popper = useRef();

  useEffect(() => {
    if (anchorEl) {
      popper.current = createPopper(anchorEl, ref.current, {
        placement
      });
    }

    return () => popper.current && popper.current.destroy();
  }, [placement, anchorEl]);

  return createPortal(
    <div
      ref={ref}
      className={cx(classes.root, className)}
      {...rest}
    >
      {children}
    </div>,
    document.body
  );
};

PopperBase.defaultProps = {
  anchorEl: null,
  className: null,
  placement: 'auto'
};

PopperBase.propTypes = {
  anchorEl: propAnchorEl,
  className: PropTypes.string,
  placement: propPopperPlacement,
  children: PropTypes.node.isRequired
};

export default PopperBase;
