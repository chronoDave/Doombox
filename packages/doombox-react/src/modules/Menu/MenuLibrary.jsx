import React, {
  Fragment,
  useState
} from 'react';

// Icons
import IconSettings from '@material-ui/icons/Settings';
import IconPlaylistPlay from '@material-ui/icons/PlaylistPlay';

// Core
import {
  Box,
  IconButton
} from '@material-ui/core';

// Modules
import { PopoverSearch } from '../Popover';
import { SearchLibrary } from '../Search';

// Hooks
import { useAudio } from '../../hooks';

// Utils
import { HOOK } from '../../utils/const';

const MenuLibrary = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const { setPlaylist } = useAudio(HOOK.AUDIO.METHOD);

  return (
    <Fragment>
      <Box
        display="flex"
        alignItems="center"
        p={1}
        justifyContent="space-between"
      >
        <SearchLibrary />
        <Box display="flex">
          <IconButton onClick={() => setPlaylist('Library')}>
            <IconPlaylistPlay />
          </IconButton>
          <IconButton onClick={event => setAnchorEl(event.currentTarget)}>
            <IconSettings />
          </IconButton>
        </Box>
      </Box>
      <PopoverSearch
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
      />
    </Fragment>
  );
};

export default MenuLibrary;
