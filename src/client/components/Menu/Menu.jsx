import React, { Children, cloneElement, useEffect } from 'react';
import Mousetrap from 'mousetrap';
import PropTypes from 'prop-types';

// Core
import {
  ClickAwayListener,
  Fade,
  Popper,
  Paper,
  withStyles
} from '@material-ui/core';

// Styles
import { menuStyles } from './Menu.styles';

const Menu = props => {
  const {
    classes,
    children,
    open,
    onClose,
    anchorEl,
    ...rest
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
      transition
    >
      {({ TransitionProps }) => (
        <ClickAwayListener onClickAway={onClose}>
          <Fade {...TransitionProps}>
            <Paper
              {...rest}
              square
              elevation={4}
              classes={{ root: classes.paperRoot }}
            >
              {Children.map(children, child => cloneElement(child, { onClose }))}
            </Paper>
          </Fade>
        </ClickAwayListener>
      )}
    </Popper>
  );
};

Menu.defaultProps = {
  anchorEl: null,
  children: null
};

Menu.propTypes = {
  children: PropTypes.node,
  classes: PropTypes.shape({
    paperRoot: PropTypes.string.isRequired
  }).isRequired,
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  anchorEl: PropTypes.shape({})
};

export default withStyles(menuStyles)(Menu);
