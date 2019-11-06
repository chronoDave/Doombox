import React from 'react';
import PropTypes from 'prop-types';

// Core
import { Menu } from '@material-ui/core';

const Context = props => {
  const {
    children,
    anchorVertical,
    anchorHorizontal,
    anchorEl,
    id,
    ...rest
  } = props;

  return (
    <Menu
      id={`menu-context-${id}`}
      getContentAnchorEl={null}
      keepMounted
      anchorOrigin={{
        vertical: anchorVertical,
        horizontal: anchorHorizontal,
      }}
      transformOrigin={{
        vertical: 'center',
        horizontal: 'left',
      }}
      MenuListProps={{
        disablePadding: true
      }}
      anchorEl={anchorEl}
      open={!!anchorEl}
      {...rest}
    >
      {children}
    </Menu>
  );
};

Context.propTypes = {
  anchorVertical: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  anchorHorizontal: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  anchorEl: PropTypes.shape({}),
  children: PropTypes.node.isRequired,
  id: PropTypes.string.isRequired
};

Context.defaultProps = {
  anchorVertical: 'center',
  anchorHorizontal: 'right',
  anchorEl: null
};

export default Context;
