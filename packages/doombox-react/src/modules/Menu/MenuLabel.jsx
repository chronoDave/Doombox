import React, {
  Fragment,
  useState,
  useEffect
} from 'react';
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
  Hidden,
  IconButton
} from '@material-ui/core';

import {
  Context,
  ContextItem
} from '../../components';

// Modules
import { SearchBase } from '../Search';

// Hooks
import {
  useIpc,
  useAudio
} from '../../hooks';

// Utils
import { shuffleArray } from '../../utils';
import { HOOK } from '../../utils/const';

const MenuLabel = ({ setLabels }) => {
  const [open, setOpen] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);

  const {
    setPlaylist,
    createSong
  } = useAudio(HOOK.AUDIO.METHOD);
  const images = useIpc(HOOK.IPC.IMAGE);
  const collection = useAudio(HOOK.AUDIO.LIBRARY);
  const { t } = useTranslation();

  useEffect(() => {
    if (collection && collection.length !== 0) {
      setLabels(Object
        .entries(groupby(collection, 'metadata.albumartist'))
        .sort((a, b) => {
          const aAlbumartist = a[1][0].metadata.albumartist.toLowerCase();
          const bAlbumartist = b[1][0].metadata.albumartist.toLowerCase();

          if (aAlbumartist < bAlbumartist) return -1;
          if (aAlbumartist > bAlbumartist) return 1;
          return 0;
        })
        .map(([albumartist, songs]) => ({
          albumartist,
          albums: Object
            .entries(groupby(songs, 'metadata.album'))
            .sort((a, b) => {
              const aMetadata = a[1][0].metadata;
              const bMetadata = b[1][0].metadata;

              if (aMetadata.year < bMetadata.year) return -1;
              if (aMetadata.year > bMetadata.year) return 1;
              if (aMetadata.album < bMetadata.album.toLowerCase()) return -1;
              if (aMetadata.album > bMetadata.album.toLowerCase()) return 1;
              return 0;
            })
            .map(([album, tracks]) => ({
              album,
              cover: tracks[0].images ? images[tracks[0].images[0]] : null,
              songs: tracks.sort((a, b) => a.metadata.track.no - b.metadata.track.no)
            }))
        }))
        .flat());
    }
  }, [collection, setLabels, images]);

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
        zIndex={1}
      >
        <SearchBase name="album" count={collection.length} />
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
    </Fragment>
  );
};

MenuLabel.propTypes = {
  setLabels: PropTypes.func.isRequired
};

export default MenuLabel;
