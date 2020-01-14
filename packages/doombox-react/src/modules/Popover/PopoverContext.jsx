import React from 'react';
import PropTypes from 'prop-types';

// Core
import { Popover } from '@material-ui/core';

const PopoverContext = props => {
  const {
    anchorEl,
    onClose,
    position,
    children
  } = props;

  const anchorOrigins = {
    top: { vertical: 'top', horizontal: 'center' },
    bottom: { vertical: 'bottom', horizontal: 'center' },
    left: { vertical: 'center', horizontal: 'left' },
    right: { vertical: 'center', horizontal: 'right' }
  };

  const transformOrigins = {
    top: { vertical: 'bottom', horizontal: 'center' },
    bottom: { vertical: 'top', horizontal: 'center' },
    left: { vertical: 'center', horizontal: 'right' },
    right: { vertical: 'center', horizontal: 'left' }
  };

  return (
    <Popover
      open={!!anchorEl}
      onClose={onClose}
      anchorEl={anchorEl}
      anchorOrigin={anchorOrigins[position]}
      transformOrigin={transformOrigins[position]}
    >
      {children}
    </Popover>
  );
};

PopoverContext.propTypes = {
  anchorEl: PropTypes.shape({}).isRequired,
  onClose: PropTypes.func.isRequired,
  position: PropTypes.oneOf(['top', 'bottom', 'left', 'right']),
  children: PropTypes.node.isRequired
};

PopoverContext.defaultProps = {
  position: 'right'
};

export default PopoverContext;
