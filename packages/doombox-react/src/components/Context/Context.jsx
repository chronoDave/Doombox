import React, {
  Children,
  cloneElement
} from 'react';
import PropTypes from 'prop-types';

// Core
import {
  Box,
  List
} from '@material-ui/core';

import { Popover } from '../Popover';

const Context = props => {
  const {
    anchorEl,
    onClose,
    children,
    position,
    PopoverProps
  } = props;

  return (
    <Popover
      anchorEl={anchorEl}
      onClose={onClose}
      position={position}
      {...PopoverProps}
    >
      <Box py={1}>
        <List dense disablePadding>
          {Children.map(children, child => cloneElement(child, { onClose }))}
        </List>
      </Box>
    </Popover>
  );
};

Context.propTypes = {
  anchorEl: PropTypes.shape({}),
  onClose: PropTypes.func.isRequired,
  position: PropTypes.oneOf([
    'top',
    'bottom',
    'left',
    'right',
    'center'
  ]),
  PopoverProps: PropTypes.shape({}),
  children: PropTypes.node.isRequired
};

Context.defaultProps = {
  position: 'right',
  anchorEl: null,
  PopoverProps: {}
};

export default Context;
