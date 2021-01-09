import React, { useState, useLayoutEffect, useRef } from 'react';
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
    arrow,
    className,
    children,
    ...rest
  } = props;
  const [arrowPlacement, setArrowPlacement] = useState('left');

  const classes = usePopperBaseStyles({ placement: arrowPlacement });

  const ref = useRef();
  const refArrow = useRef();
  const popper = useRef();

  useLayoutEffect(() => {
    if (anchorEl) {
      popper.current = createPopper(anchorEl, ref.current, {
        placement,
        modifiers: [{
          name: 'offset',
          enabled: !!arrow,
          options: {
            offset: [0, 8]
          }
        }, {
          name: 'arrow',
          enabled: !!arrow,
          options: {
            element: refArrow.current
          }
        }],
        onFirstUpdate: state => !!arrow && setArrowPlacement(state.placement.split('-')[0])
      });
    }

    return () => popper.current && popper.current.destroy();
  }, [placement, arrow, anchorEl]);

  return createPortal(
    <div
      ref={ref}
      className={cx(classes.root, className)}
      {...rest}
    >
      {!!arrow && (
        <div
          ref={refArrow}
          className={cx(classes.arrow, {
            [classes.arrowTop]: arrowPlacement === 'top',
            [classes.arrowBottom]: arrowPlacement === 'bottom',
            [classes.arrowLeft]: arrowPlacement === 'left',
            [classes.arrowRight]: arrowPlacement === 'right',
          })}
        >
          {arrow}
        </div>
      )}
      {children}
    </div>,
    document.body
  );
};

PopperBase.defaultProps = {
  arrow: null,
  anchorEl: null,
  className: null,
  placement: 'auto'
};

PopperBase.propTypes = {
  arrow: PropTypes.node,
  anchorEl: propAnchorEl,
  className: PropTypes.string,
  placement: propPopperPlacement,
  children: PropTypes.node.isRequired
};

export default PopperBase;
