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

import { Avatar } from '../Avatar';
import { Typography } from '../Typography';
import { ModalSettings } from '../Modal';

// Style
import { useSidebarStyle } from './Sidebar.style';

const SidebarProfile = ({ username }) => {
  const classes = useSidebarStyle();
  const [open, setOpen] = useState(null);

  return (
    <Fragment>
      <Box
        width="100%"
        display="flex"
        alignItems="center"
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
            {username || ''}
          </Typography>
        </Box>
        <IconButton
          classes={{ root: classes.icon }}
          onClick={() => setOpen('settings')}
        >
          <IconSettings />
        </IconButton>
      </Box>
      <ModalSettings
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
