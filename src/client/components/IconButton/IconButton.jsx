import React, { forwardRef, Children, cloneElement } from 'react';
import { cx } from 'emotion';
import PropTypes from 'prop-types';

// Core
import { ButtonBase } from '../ButtonBase';

// Styles
import useIconButtonStyles from './IconButton.style';

const IconButton = forwardRef((props, ref) => {
  const {
    square,
    small,
    className,
    children,
    ...rest
  } = props;
  const classes = useIconButtonStyles();

  return (
    <ButtonBase
      className={cx(classes.root, {
        [classes.small]: small
      })}
      {...rest}
      ref={ref}
    >
      {Children.map(children, child => cloneElement(child, {
        className: cx({ [classes.iconSmall]: small }, child.props.className)
      }))}
    </ButtonBase>
  );
});

IconButton.defaultProps = {
  className: null,
  square: false,
  small: false
};

IconButton.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  square: PropTypes.bool,
  small: PropTypes.bool
};

export default IconButton;
