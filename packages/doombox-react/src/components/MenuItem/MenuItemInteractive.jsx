import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';

// Icon
import IconRight from '@material-ui/icons/KeyboardArrowRight';

// Core
import {
  Box,
  MenuItem,
  Paper,
  ListItemText
} from '@material-ui/core';

import { Interactive } from '../Interactive';

// Style
import { useMenuItemStyle } from './MenuItem.style';

const MenuItemInteractive = forwardRef((props, ref) => {
  const {
    InteractiveProps,
    children,
    primary,
    popper,
    ...rest
  } = props;

  const classes = useMenuItemStyle();

  return (
    <Interactive
      ref={ref}
      placement="right"
      popper={(
        <Paper classes={{ root: classes.paperRoot }}>
          {popper}
        </Paper>
      )}
      {...InteractiveProps}
    >
      <MenuItem {...rest}>
        <Box
          display="flex"
          flexWrap="nowrap"
          alignItems="inherit"
        >
          <ListItemText primary={primary} />
          <Box pl={1.5} display="flex">
            <IconRight fontSize="small" />
          </Box>
        </Box>
      </MenuItem>
    </Interactive>
  );
});

MenuItemInteractive.propTypes = {
  InteractiveProps: PropTypes.shape({}),
  children: PropTypes.node.isRequired,
  primary: PropTypes.string.isRequired,
  popper: PropTypes.node.isRequired
};

MenuItemInteractive.defaultProps = {
  InteractiveProps: null
};

export default MenuItemInteractive;
