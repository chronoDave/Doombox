import React from 'react';
import PropTypes from 'prop-types';

import { cx } from '@doombox-utils';

// Core
import { PopperBase } from '..';

import './Popper.scss';

const Popper = props => {
  const {
    open,
    arrow,
    className,
    children,
    ...rest
  } = props;

  return (
    <PopperBase
      className={cx(
        'Popper',
        open && 'open',
        className
      )}
      arrow={arrow && <div />}
      {...rest}
    >
      {children}
    </PopperBase>
  );
};

Popper.defaultProps = {
  open: false,
  arrow: false,
  className: null
};

Popper.propTypes = {
  open: PropTypes.bool,
  arrow: PropTypes.bool,
  className: PropTypes.string,
  children: PropTypes.node.isRequired
};

export default Popper;
