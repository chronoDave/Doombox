import React from 'react';
import PropTypes from 'prop-types';

// Core
import { Popover as MuiPopover } from '@material-ui/core';

const Popover = props => {
  const {
    anchorEl,
    position,
    children,
    ...rest
  } = props;

  const anchorOrigins = {
    top: { vertical: 'top', horizontal: 'center' },
    bottom: { vertical: 'bottom', horizontal: 'center' },
    left: { vertical: 'center', horizontal: 'left' },
    right: { vertical: 'center', horizontal: 'right' },
    center: { vertical: 'center', horizontal: 'center' }
  };

  const transformOrigins = {
    top: { vertical: 'bottom', horizontal: 'center' },
    bottom: { vertical: 'top', horizontal: 'center' },
    left: { vertical: 'center', horizontal: 'right' },
    right: { vertical: 'center', horizontal: 'left' },
    center: { vertical: 'center', horizontal: 'center' }
  };

  return (
    <MuiPopover
      open={!!anchorEl}
      anchorEl={anchorEl}
      anchorOrigin={anchorOrigins[position]}
      transformOrigin={transformOrigins[position]}
      {...rest}
    >
      {children}
    </MuiPopover>
  );
};

Popover.propTypes = {
  anchorEl: PropTypes.shape({}),
  onClose: PropTypes.func.isRequired,
  position: PropTypes.oneOf([
    'top',
    'bottom',
    'left',
    'right',
    'center'
  ]),
  children: PropTypes.node.isRequired
};

Popover.defaultProps = {
  anchorEl: null,
  position: 'right'
};

export default Popover;
