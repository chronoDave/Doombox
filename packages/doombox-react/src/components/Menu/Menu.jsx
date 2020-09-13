import React, { useEffect } from 'react';
import Mousetrap from 'mousetrap';
import PropTypes from 'prop-types';

// Core
import {
  ClickAwayListener,
  Popper,
  Paper
} from '@material-ui/core';

const Menu = props => {
  const {
    children,
    open,
    onClose,
    anchorEl
  } = props;

  useEffect(() => {
    Mousetrap.bind('escape', onClose);
    return () => Mousetrap.unbind('escape');
  }, [onClose]);

  return (
    <Popper
      open={open}
      anchorEl={anchorEl}
      placement="top-start"
    >
      <ClickAwayListener onClickAway={onClose}>
        <Paper square elevation={4}>
          {children}
        </Paper>
      </ClickAwayListener>
    </Popper>
  );
};

Menu.propTypes = {
  children: PropTypes.node.isRequired,
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  anchorEl: PropTypes.shape({})
};

Menu.defaultProps = {
  anchorEl: null
};

export default Menu;
