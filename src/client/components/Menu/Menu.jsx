import React, { Children, cloneElement, useEffect } from 'react';
import Mousetrap from 'mousetrap';
import PropTypes from 'prop-types';

// Core
import { Popper } from '../Popper';

// Validation
import { propAnchorEl } from '../../validation/propTypes';

// Styles
import useMenuStyles from './Menu.styles';

const Menu = props => {
  const {
    open,
    onClose,
    anchorEl,
    children,
    ...rest
  } = props;
  const classes = useMenuStyles();

  useEffect(() => {
    Mousetrap.bind('escape', onClose);
    return () => Mousetrap.unbind('escape');
  }, [onClose]);

  return (
    <Popper
      anchorEl={anchorEl}
      open={open}
      className={classes.root}
      {...rest}
    >
      {Children.map(children, child => cloneElement(child, { onClose }))}
    </Popper>
  );
};

Menu.defaultProps = {
  open: false,
  anchorEl: null
};

Menu.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  anchorEl: propAnchorEl,
  children: PropTypes.node.isRequired
};

export default Menu;
