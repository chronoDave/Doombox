import React from 'react';

// Icons
import IconVisualizer from '@material-ui/icons/Equalizer';
import IconAlbum from '@material-ui/icons/LibraryMusic';
import IconSong from '@material-ui/icons/QueueMusic';
import IconSettings from '@material-ui/icons/Settings';

// Core
import {
  Box,
  Divider
} from '@material-ui/core';

import {
  IconButtonNavigation,
  Tooltip
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
      display="flex"
      flexDirection="column"
      alignItems="center"
      height="100%"
    >
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        width="100%"
      >
        <Tooltip
          title="visualizer"
          placement="right"
          arrow
        >
          <IconButtonNavigation
            active={page === PATH.PAGE.VISUALIZER}
            icon={<IconVisualizer />}
            onClick={() => setPage(PATH.PAGE.VISUALIZER)}
          />
        </Tooltip>
        <Tooltip
          title="albums"
          placement="right"
          arrow
        >
          <IconButtonNavigation
            active={page === PATH.PAGE.ALBUM}
            icon={<IconAlbum />}
            onClick={() => setPage(PATH.PAGE.ALBUM)}
          />
        </Tooltip>
        <Tooltip
          title="library"
          placement="right"
          arrow
        >
          <IconButtonNavigation
            active={page === PATH.PAGE.SONG}
            icon={<IconSong />}
            onClick={() => setPage(PATH.PAGE.SONG)}
          />
        </Tooltip>
        <Tooltip
          title="settings"
          placement="right"
          arrow
        >
          <IconButtonNavigation
            icon={<IconSettings />}
            onClick={() => openDialog(PATH.DIALOG.SETTINGS)}
          />
        </Tooltip>
      </Box>
      <Box p={1} width="100%">
        <Divider />
      </Box>
      <NavigationPlaylist />
    </Box>
  );
};

export default Navigation;
