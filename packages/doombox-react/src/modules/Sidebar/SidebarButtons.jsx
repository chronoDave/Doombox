import React, {
  Fragment,
  useState
} from 'react';
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

import Settings from '../Settings/Settings';

// Hooks
import { useRoute } from '../../hooks';

// Utils
import { MAIN_VIEWS } from '../../utils/const';

// Style
import { useSidebarStyle } from './Sidebar.style';

const SidebarButtons = ({ ...rest }) => {
  const [open, setOpen] = useState(false);
  const { setView } = useRoute();
  const classes = useSidebarStyle();

  return (
    <Fragment>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        {...rest}
      >
        <IconButton onClick={() => setView(MAIN_VIEWS.MASTER)}>
          <IconPlaylist classes={{ root: classes.iconRoot }} />
        </IconButton>
        <IconButton onClick={() => setView(MAIN_VIEWS.ALBUM)}>
          <IconAlbums classes={{ root: classes.iconRoot }} />
        </IconButton>
        <IconButton onClick={() => setView(MAIN_VIEWS.SONG)}>
          <IconSongs classes={{ root: classes.iconRoot }} />
        </IconButton>
        <IconButton onClick={() => setOpen(true)}>
          <IconSettings classes={{ root: classes.iconRoot }} />
        </IconButton>
      </Box>
      <Settings open={open} onClose={() => setOpen(false)} />
    </Fragment>
  );
};

SidebarButtons.propTypes = {
  onClickSettings: PropTypes.func.isRequired
};

export default SidebarButtons;
