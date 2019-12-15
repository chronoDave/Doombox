import React from 'react';

// Icons
import IconAlbum from '@material-ui/icons/LibraryMusic';
import IconSong from '@material-ui/icons/QueueMusic';
import IconSettings from '@material-ui/icons/Settings';

// Core
import {
  Box,
  IconButton
} from '@material-ui/core';

import { Icon } from '../../components';

// Hooks
import { useRoute } from '../../hooks';

// Utils
import {
  HOOK,
  PATH
} from '../../utils/const';

// Style
import { useNavigationStyles } from './Navigation.style';

const Navigation = () => {
  const classes = useNavigationStyles();
  const { setPage, openDialog } = useRoute(HOOK.ROUTE.METHOD);

  return (
    <Box
      py={0.5}
      display="flex"
      flexDirection="column"
      alignItems="center"
    >
      <IconButton
        classes={{ root: classes.iconButton }}
        onClick={() => setPage(PATH.PAGE.VISUALIZER)}
      >
        <Icon type="visualizer" fontSize="inherit" />
      </IconButton>
      <IconButton
        classes={{ root: classes.iconButton }}
        onClick={() => setPage(PATH.PAGE.ALBUM)}
      >
        <IconAlbum fontSize="inherit" />
      </IconButton>
      <IconButton
        classes={{ root: classes.iconButton }}
        onClick={() => setPage(PATH.PAGE.SONG)}
      >
        <IconSong fontSize="inherit" />
      </IconButton>
      <IconButton
        classes={{ root: classes.iconButton }}
        onClick={() => openDialog(PATH.DIALOG.SETTINGS)}
      >
        <IconSettings fontSize="inherit" />
      </IconButton>
    </Box>
  );
};

export default Navigation;
