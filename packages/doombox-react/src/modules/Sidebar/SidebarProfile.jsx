import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Icon
import IconSettings from '@material-ui/icons/Settings';

// Core
import {
  Box,
  IconButton
} from '@material-ui/core';

import { Avatar } from '../../components/Avatar';
import { Typography } from '../../components/Typography';

// Modules
import Settings from '../Settings/Settings';

const SidebarProfile = ({ username }) => {
  const [open, setOpen] = useState(null);

  return (
    <Fragment>
      <Box
        px={1}
        py={0.5}
        display="flex"
        alignItems="center"
        bgcolor="grey.500"
      >
        <Avatar />
        <Box
          display="flex"
          flexDirection="column"
          flexGrow={1}
          minWidth={0}
          ml={1}
        >
          <Typography noWrap variant="body2">
            {username}
          </Typography>
        </Box>
        <IconButton onClick={() => setOpen('settings')} color="inherit">
          <IconSettings />
        </IconButton>
      </Box>
      <Settings
        open={open === 'settings'}
        onClose={() => setOpen(null)}
      />
    </Fragment>
  );
};

SidebarProfile.propTypes = {
  username: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  username: state.profile.user.username
});

export default connect(
  mapStateToProps
)(SidebarProfile);
