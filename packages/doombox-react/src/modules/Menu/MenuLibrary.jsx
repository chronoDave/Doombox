import React, {
  Fragment,
  useState
} from 'react';
import { TYPE } from '@doombox/utils';

// Icons
import IconSettings from '@material-ui/icons/Settings';
import IconPlaylistPlay from '@material-ui/icons/PlaylistPlay';

// Core
import {
  Box,
  IconButton
} from '@material-ui/core';

import {
  Switch,
  Popover
} from '../../components';

// Modules
import { SearchLibrary } from '../Search';

// Hooks
import {
  useAudio,
  useIpc
} from '../../hooks';

// Utils
import { HOOK } from '../../utils/const';

const MenuLibrary = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const { setPlaylist } = useAudio(HOOK.AUDIO.METHOD);
  const { updateConfig } = useIpc(HOOK.IPC.METHOD);

  const config = useIpc(HOOK.IPC.CONFIG);
  const configSearch = config[TYPE.CONFIG.SEARCH];
  const configGeneral = config[TYPE.CONFIG.GENERAL];

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
      <Popover
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        position="top"
      >
        <Box
          p={1}
          maxWidth={320}
          display="flex"
          flexDirection="column"
        >
          <Switch
            translate={[TYPE.OPTIONS.DENSE]}
            checked={configSearch[TYPE.OPTIONS.DENSE]}
            onChange={event => updateConfig(TYPE.CONFIG.SEARCH, {
              ...configSearch,
              [TYPE.OPTIONS.DENSE]: event.target.checked
            })}
          />
          <Switch
            translate={[TYPE.OPTIONS.SLOW_SEARCH]}
            checked={configSearch[TYPE.OPTIONS.SLOW_SEARCH]}
            onChange={event => updateConfig(TYPE.CONFIG.SEARCH, {
              ...configSearch,
              [TYPE.OPTIONS.SLOW_SEARCH]: event.target.checked
            })}
          />
          <Switch
            translate={[TYPE.OPTIONS.BACKGROUND]}
            checked={configGeneral[TYPE.OPTIONS.BACKGROUND]}
            onChange={event => updateConfig(TYPE.CONFIG.GENERAL, {
              ...configGeneral,
              [TYPE.OPTIONS.BACKGROUND]: event.target.checked
            })}
          />
        </Box>
      </Popover>
    </Fragment>
  );
};

export default MenuLibrary;
