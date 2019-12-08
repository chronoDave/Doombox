import React from 'react';
import PropTypes from 'prop-types';

// Icon
import IconPerson from '@material-ui/icons/Person';

// Core
import { withStyles } from '@material-ui/core/styles';
import {
  Avatar,
  Button,
  Box,
  IconButton
} from '@material-ui/core';

import FieldFileBase from './FieldFileBase';

// Style
import { FieldFileStyles } from './FieldFile.style';

const FieldFileAvatar = ({ classes, id, name }) => (
  <FieldFileBase
    id={id}
    name={name}
    type="image"
    validator={['png', 'jpg', 'jpeg', 'gif']}
  >
    {({ value, onClick, onClear }) => (
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
      >
        <IconButton
          classes={{ root: classes.avatarIconButton }}
          onClick={onClick}
        >
          {value ? (
            <Avatar src={value.path} />
          ) : (
            <IconPerson />
          )}
        </IconButton>
        <Button onClick={value ? onClear : onClick}>
          {value ? 'remove' : 'add'}
        </Button>
      </Box>
    )}
  </FieldFileBase>
);

FieldFileAvatar.propTypes = {
  classes: PropTypes.shape({
    avatarIconButton: PropTypes.string
  }).isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired
};

export default withStyles(FieldFileStyles)(FieldFileAvatar);
