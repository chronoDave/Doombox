import React from 'react';
import { cx } from '@doombox-utils';
import PropTypes from 'prop-types';

// Core
import { PopperBase, Fade } from '..';

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
    <Fade visible={open}>
      <PopperBase
        className={cx('Popper', className)}
        arrow={arrow && <div />}
        {...rest}
      >
        {children}
      </PopperBase>
    </Fade>
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
