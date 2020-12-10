import React, { Children, cloneElement, useEffect } from 'react';
import Mousetrap from 'mousetrap';
import PropTypes from 'prop-types';

// Core
import { Popper } from '../Popper';

// Styles
import useMenuStyles from './Menu.styles';

const Menu = ({ onClose, children, ...rest }) => {
  const classes = useMenuStyles();

  useEffect(() => {
    Mousetrap.bind('escape', onClose);
    return () => Mousetrap.unbind('escape');
  }, [onClose]);

  return (
    <Popper className={classes.root} {...rest}>
      {Children.map(children, child => cloneElement(child, { onClose }))}
    </Popper>
  );
};

Menu.propTypes = {
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired
};

export default Menu;
