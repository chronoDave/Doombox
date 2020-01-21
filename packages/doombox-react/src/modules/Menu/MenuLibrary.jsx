import React, {
  Fragment,
  useState,
  useEffect
} from 'react';
import { TYPE } from '@doombox/utils';
import groupby from 'lodash.groupby';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

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
import { formatTime } from '../../utils';
import { HOOK } from '../../utils/const';

const MenuLibrary = ({ library, setCollection }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const { setPlaylist } = useAudio(HOOK.AUDIO.METHOD);
  const { updateConfig } = useIpc(HOOK.IPC.METHOD);
  const { t } = useTranslation();

  const config = useIpc(HOOK.IPC.CONFIG);
  const configSearch = config[TYPE.CONFIG.SEARCH];
  const configGeneral = config[TYPE.CONFIG.GENERAL];

  useEffect(() => {
    setCollection(Object
      .entries(groupby(library, 'metadata.album'))
      .sort((a, b) => {
        const aMetadata = a[1][0].metadata.albumartist;
        const bMetadata = b[1][0].metadata.albumartist;

        if (aMetadata < bMetadata) return -1;
        if (aMetadata > bMetadata) return 1;
        return 0;
      })
      .map(([album, values]) => [
        {
          divider: {
            primary: album,
            secondary: [
              values[0].metadata.albumartist,
              values[0].metadata.year,
              t('trackCount', { count: values.length }),
              formatTime(
                values.reduce((acc, cur) => acc + cur.format.duration, 0),
                'text'
              )
            ].join(' \u2022 '),
            album: values
          },
        },
        ...values.sort((a, b) => a.metadata.track.no - b.metadata.track.no)
      ])
      .flat());
  }, [library]);

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
        position="center"
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

MenuLibrary.propTypes = {
  setCollection: PropTypes.func.isRequired,
  library: PropTypes.arrayOf(PropTypes.shape({})).isRequired
};

export default MenuLibrary;
