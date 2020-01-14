import React from 'react';

// Icons
import IconAlbum from '@material-ui/icons/LibraryMusic';
import IconSong from '@material-ui/icons/QueueMusic';
import IconSettings from '@material-ui/icons/Settings';

// Core
import { Box } from '@material-ui/core';

import { Icon } from '../../components';

import NavigationButton from './NavigationIcon.private';

// Hooks
import { useRoute } from '../../hooks';

// Utils
import {
  HOOK,
  PATH
} from '../../utils/const';

const Navigation = () => {
  const { setPage, openDialog } = useRoute(HOOK.ROUTE.METHOD);
  const { page } = useRoute(HOOK.ROUTE.LOCATION);

  return (
    <Box
      py={0.5}
      display="flex"
      flexDirection="column"
      alignItems="center"
    >
      <NavigationButton
        active={page === PATH.PAGE.VISUALIZER}
        icon={<Icon type="visualizer" fontSize="inherit" />}
        onClick={() => setPage(PATH.PAGE.VISUALIZER)}
      />
      <NavigationButton
        active={page === PATH.PAGE.ALBUM}
        icon={<IconAlbum fontSize="inherit" />}
        onClick={() => setPage(PATH.PAGE.ALBUM)}
      />
      <NavigationButton
        active={page === PATH.PAGE.SONG}
        icon={<IconSong fontSize="inherit" />}
        onClick={() => setPage(PATH.PAGE.SONG)}
      />
      <NavigationButton
        icon={<IconSettings fontSize="inherit" />}
        onClick={() => openDialog(PATH.DIALOG.SETTINGS)}
      />
    </Box>
  );
};

export default Navigation;
