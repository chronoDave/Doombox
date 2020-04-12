import React, {
  Children,
  cloneElement
} from 'react';
import PropTypes from 'prop-types';

// Core
import { Box } from '@material-ui/core';

import { Popover } from '../Popover';

const Context = ({ onClose, children, ...rest }) => (
  <Popover onClose={onClose} {...rest}>
    <Box p={1} display="flex" flexDirection="column">
      {Children.map(children, child => cloneElement(child, { onClose }))}
    </Box>
  </Popover>
);

Context.propTypes = {
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired
};

export default Context;
