import React from 'react';
import PropTypes from 'prop-types';

// Icon
import IconPlaylist from '@material-ui/icons/ArtTrack';
import IconAlbums from '@material-ui/icons/LibraryMusic';
import IconSongs from '@material-ui/icons/QueueMusic';
import IconSettings from '@material-ui/icons/Settings';

// Core
import {
  Box,
  IconButton
} from '@material-ui/core';

// Style
import { useSidebarStyle } from './Sidebar.style';

const SidebarButtons = ({ onClickSettings, ...rest }) => {
  const classes = useSidebarStyle();

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      {...rest}
    >
      <IconButton>
        <IconPlaylist classes={{ root: classes.iconRoot }} />
      </IconButton>
      <IconButton>
        <IconAlbums classes={{ root: classes.iconRoot }} />
      </IconButton>
      <IconButton>
        <IconSongs classes={{ root: classes.iconRoot }} />
      </IconButton>
      <IconButton onClick={onClickSettings}>
        <IconSettings classes={{ root: classes.iconRoot }} />
      </IconButton>
    </Box>
  );
};

SidebarButtons.propTypes = {
  onClickSettings: PropTypes.func.isRequired
};

export default SidebarButtons;
