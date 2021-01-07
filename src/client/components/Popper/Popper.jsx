import React from 'react';
import { cx } from 'emotion';
import PropTypes from 'prop-types';

// Core
import { PopperBase } from '../PopperBase';
import { Fade } from '../Fade';

// Styles
import usePopperStyles from './Popper.styles';

const Popper = props => {
  const {
    open,
    arrow,
    className,
    children,
    ...rest
  } = props;
  const classes = usePopperStyles();

  return (
    <Fade visible={open}>
      <PopperBase
        arrow={arrow && <div className={cx(classes.root, classes.arrow)} />}
        {...rest}
      >
        <div className={cx(classes.root, className)}>
          {children}
        </div>
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
