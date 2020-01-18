import React from 'react';

// Icons
import IconAlbum from '@material-ui/icons/LibraryMusic';
import IconSong from '@material-ui/icons/QueueMusic';
import IconSettings from '@material-ui/icons/Settings';

// Core
import {
  Box,
  Divider
} from '@material-ui/core';

import {
  Icon,
  IconButtonNavigation
} from '../../components';

// Hooks
import { useRoute } from '../../hooks';

// Utils
import {
  HOOK,
  PATH
} from '../../utils/const';

import NavigationPlaylist from './NavigationPlaylist';

const Navigation = () => {
  const { setPage, openDialog } = useRoute(HOOK.ROUTE.METHOD);
  const { page } = useRoute(HOOK.ROUTE.LOCATION);

  return (
    <Box
      py={0.5}
      display="flex"
      flexDirection="column"
      alignItems="center"
      height="100%"
    >
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
      >
        <IconButtonNavigation
          active={page === PATH.PAGE.VISUALIZER}
          icon={<Icon type="visualizer" fontSize="inherit" />}
          onClick={() => setPage(PATH.PAGE.VISUALIZER)}
        />
        <IconButtonNavigation
          active={page === PATH.PAGE.ALBUM}
          icon={<IconAlbum fontSize="inherit" />}
          onClick={() => setPage(PATH.PAGE.ALBUM)}
        />
        <IconButtonNavigation
          active={page === PATH.PAGE.SONG}
          icon={<IconSong fontSize="inherit" />}
          onClick={() => setPage(PATH.PAGE.SONG)}
        />
        <IconButtonNavigation
          icon={<IconSettings fontSize="inherit" />}
          onClick={() => openDialog(PATH.DIALOG.SETTINGS)}
        />
      </Box>
      <Box p={1} width="100%">
        <Divider />
      </Box>
      <NavigationPlaylist />
    </Box>
  );
};

export default Navigation;
