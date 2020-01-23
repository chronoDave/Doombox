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
import IconMenu from '@material-ui/icons/MoreVert';
import IconSettings from '@material-ui/icons/Settings';
import IconPlaylistPlay from '@material-ui/icons/PlaylistPlay';
import IconShuffle from '@material-ui/icons/Shuffle';

// Core
import {
  Box,
  IconButton,
  Hidden
} from '@material-ui/core';

import {
  Switch,
  Popover,
  Context,
  ContextItem
} from '../../components';

// Modules
import { SearchLibrary } from '../Search';

// Hooks
import {
  useAudio,
  useIpc
} from '../../hooks';

// Utils
import {
  formatTime,
  shuffleArray
} from '../../utils';
import { HOOK } from '../../utils/const';

const MenuLibrary = ({ collection, setLibrary }) => {
  const [open, setOpen] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);

  const {
    setPlaylist,
    createSong
  } = useAudio(HOOK.AUDIO.METHOD);
  const { updateConfig } = useIpc(HOOK.IPC.METHOD);
  const { t } = useTranslation();

  const config = useIpc(HOOK.IPC.CONFIG);
  const configSearch = config[TYPE.CONFIG.SEARCH];
  const configGeneral = config[TYPE.CONFIG.GENERAL];

  useEffect(() => {
    setLibrary(Object
      .entries(groupby(collection, 'metadata.album'))
      .sort((a, b) => {
        const aMetadata = a[1][0].metadata;
        const bMetadata = b[1][0].metadata;

        if (aMetadata.albumartist < bMetadata.albumartist) return -1;
        if (aMetadata.albumartist > bMetadata.albumartist) return 1;
        if (aMetadata.year < bMetadata.year) return -1;
        if (aMetadata.year > bMetadata.year) return 1;
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
        ...values.sort((a, b) => {
          if (a.metadata.track.no < b.metadata.track.no) return -1;
          if (a.metadata.track.no > b.metadata.track.no) return 1;
          return 0;
        })
      ])
      .flat());
  }, [collection, setLibrary]);

  const handleLibraryPlay = () => {
    setPlaylist(
      'Library',
      collection.sort((a, b) => {
        if (a.metadata.albumartist < b.metadata.albumartist) return -1;
        if (a.metadata.albumartist > b.metadata.albumartist) return 1;
        if (a.metadata.year < b.metadata.year) return -1;
        if (a.metadata.year > b.metadata.year) return 1;
        if (a.metadata.track.no < b.metadata.track.no) return -1;
        if (a.metadata.track.no > b.metadata.track.no) return 1;
        return 0;
      })
    );
    createSong();
  };

  const handleLibraryShuffle = () => {
    setPlaylist(
      'Library',
      shuffleArray(collection.sort((a, b) => {
        if (a.metadata.albumartist < b.metadata.albumartist) return -1;
        if (a.metadata.albumartist > b.metadata.albumartist) return 1;
        if (a.metadata.year < b.metadata.year) return -1;
        if (a.metadata.year > b.metadata.year) return 1;
        if (a.metadata.track.no < b.metadata.track.no) return -1;
        if (a.metadata.track.no > b.metadata.track.no) return 1;
        return 0;
      }))
    );
    createSong();
  };

  return (
    <Fragment>
      <Box
        display="flex"
        alignItems="center"
        p={1}
        justifyContent="space-between"
      >
        <SearchLibrary />
        <Hidden smUp>
          <IconButton
            onClick={event => {
              setAnchorEl(event.currentTarget);
              setOpen('menu');
            }}
          >
            <IconMenu />
          </IconButton>
        </Hidden>
        <Hidden xsDown>
          <Box display="flex">
            <IconButton onClick={handleLibraryPlay}>
              <IconPlaylistPlay />
            </IconButton>
            <IconButton onClick={handleLibraryShuffle}>
              <IconShuffle />
            </IconButton>
            <IconButton
              onClick={event => {
                setAnchorEl(event.currentTarget);
                setOpen('settings');
              }}
            >
              <IconSettings />
            </IconButton>
          </Box>
        </Hidden>
      </Box>
      <Context
        anchorEl={open === 'menu' && anchorEl}
        onClose={() => {
          setOpen(null);
          setAnchorEl(null);
        }}
        position="left"
      >
        <ContextItem
          disableTranslation
          primary={t('action:play', { context: 'library' })}
          onClick={handleLibraryPlay}
        />
        <ContextItem
          disableTranslation
          primary={t('action:shuffle', { context: 'library' })}
          onClick={handleLibraryShuffle}
        />
        <ContextItem
          primary={t('settings')}
          onClick={() => setOpen('settings')}
        />
      </Context>
      <Popover
        anchorEl={open === 'settings' && anchorEl}
        onClose={() => {
          setOpen(null);
          setAnchorEl(null);
        }}
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
  setLibrary: PropTypes.func.isRequired,
  collection: PropTypes.arrayOf(PropTypes.shape({})).isRequired
};

export default MenuLibrary;
