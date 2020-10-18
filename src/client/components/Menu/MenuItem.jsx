import React, { Fragment } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';

// Core
import {
  Box,
  ButtonBase,
  Divider,
  withStyles
} from '@material-ui/core';

import { Typography } from '../Typography';

// Styles
import { menuStyles } from './Menu.styles';

const MenuItem = props => {
  const {
    classes,
    primary,
    secondary,
    divider,
    onClick,
    onClose
  } = props;

  return (
    <Fragment>
      <ButtonBase
        onClick={event => {
          onClick(event);
          if (onClose) onClose(event);
        }}
        className={clsx(classes.itemRoot)}
      >
        <Typography variant="body2">
          {primary}
        </Typography>
        {secondary && (
          <Box ml={3}>
            <Typography variant="body2" align="right">
              {secondary}
            </Typography>
          </Box>
        )}
      </ButtonBase>
      {divider && <Divider />}
    </Fragment>
  );
};

MenuItem.defaultProps = {
  divider: false,
  secondary: null,
  onClose: null
};

MenuItem.propTypes = {
  classes: PropTypes.shape({
    itemRoot: PropTypes.string.isRequired
  }).isRequired,
  divider: PropTypes.bool,
  primary: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  onClose: PropTypes.func,
  secondary: PropTypes.string
};

export default withStyles(menuStyles)(MenuItem);
