import React, {
  Fragment,
  useEffect,
  useMemo,
  useState
} from 'react';
import { TYPE } from '@doombox/utils';
import { connect } from 'react-redux';
import groupBy from 'lodash.groupby';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

// Icon
import IconMenu from '@material-ui/icons/MoreVert';

// Core
import {
  Box,
  IconButton
} from '@material-ui/core';

import {
  ImageBackground,
  Context,
  ContextItem,
  Tooltip
} from '../../components';

// Modules
import {
  SearchLibrary,
  Sidebar,
  VirtualLabel,
  VirtualSong
} from '../../modules';

// Actions
import { queryLibrary } from '../../actions';

// Hooks
import { useRoute } from '../../hooks';

// Redux
import {
  setPlaylist as dispatchSetPlaylist,
  addPlaylist as dispatchAddPlaylist
} from '../../redux';

// Utils
import {
  sortLibrary,
  createRegexPayload,
  createDividerDisc,
  createDividerAlbum,
  getTotalDuration
} from '../../utils';
import {
  PATH,
  HOOK
} from '../../utils/const';

// Validation
import { propSong } from '../../validation/propTypes';

const LibraryRouter = props => {
  const {
    songs,
    cacheSize,
    addPlaylist,
    setPlaylist
  } = props;
  const [offset, setOffset] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);

  const { page } = useRoute(HOOK.ROUTE.LOCATION);
  const { t } = useTranslation();

  const fields = [
    'metadata.artist',
    'metadata.song',
    'metadata.album',
    'metadata.albumartist'
  ];
  const operator = 'or';

  const propSongLibrary = useMemo(() => (Object
    .entries(groupBy(songs, 'metadata.album'))
    .sort((a, b) => sortLibrary(a[1][0], b[1][0]))
    .reduce((acc, cur) => {
      const [album, tracks] = cur;
      const {
        images,
        metadata: { albumartist, year }
      } = tracks[0];

      const duration = getTotalDuration(tracks);
      const discs = createDividerDisc(tracks);

      return [
        ...acc,
        {
          divider: 'album',
          album,
          albumartist,
          cover: images[0] ? images[0].file : null,
          year,
          size: tracks.length,
          duration,
          tracks: tracks.map(({ _id }) => _id)
        },
        ...discs
      ];
    }, [])
  ), [songs]);

  const propLabelLibrary = useMemo(() => (Object
    .entries(groupBy(songs, 'metadata.albumartist'))
    .sort((a, b) => sortLibrary(a[1][0], b[1][0]))
    .reduce((acc, cur) => {
      const [albumartist, tracks] = cur;

      const duration = getTotalDuration(tracks);
      const albums = createDividerAlbum(tracks);

      return [
        ...acc,
        {
          divider: 'label',
          albumartist,
          duration,
          albums: albums.length,
          size: tracks.length,
          tracks: albums.reduce((accAlbum, curAlbum) => [...accAlbum, curAlbum.tracks], [])
        },
        ...albums
      ];
    }, [])
  ), [songs]);

  const handleSearch = query => {
    setOffset(0); // New library, reset cache
    queryLibrary(
      query.length !== 0 && createRegexPayload(query, fields, operator),
      {
        sort: {
          'metadata.album': 1,
          'metadata.disk.no': 1,
          'metadata.track.no': 1
        }
      }
    );
  };

  const handleScroll = (direction, size) => {
    const maxOffset = Math.floor(size / cacheSize);

    if (maxOffset <= 1) return;
    if (direction === 'backward') setOffset(offset === 0 ? maxOffset : offset - 1);
    if (direction === 'forward') setOffset(offset === maxOffset ? 0 : offset + 1);
  };

  useEffect(() => {
    setOffset(0);
  }, [page]);

  useEffect(() => {
    queryLibrary();
  }, []);

  const renderPage = () => {
    switch (page) {
      case PATH.PAGE.LABEL:
        return (
          <VirtualLabel
            onScroll={event => handleScroll(event, propLabelLibrary.length)}
            library={propLabelLibrary.slice(
              offset * cacheSize,
              (offset + 1) * cacheSize
            )}
          />
        );
      case PATH.PAGE.SONG:
        return (
          <VirtualSong
            onScroll={event => handleScroll(event, propSongLibrary.length)}
            library={propSongLibrary.slice(
              offset * cacheSize,
              (offset + 1) * cacheSize
            )}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Fragment>
      <Sidebar>
        <Box
          width="100%"
          height="100%"
          display="flex"
          flexDirection="column"
        >
          <ImageBackground />
          <Box
            display="flex"
            justifyContent="space-between"
            px={2}
            py={1}
            zIndex={1}
          >
            <SearchLibrary
              count={songs.length}
              onSearch={handleSearch}
              onAdd={() => addPlaylist(songs)}
              onPlay={query => setPlaylist({ name: query, collection: songs })}
            />
            <Tooltip disableTranslation title={t('menu', { context: 'library' })}>
              <IconButton onClick={event => setAnchorEl(event.currentTarget)}>
                <IconMenu />
              </IconButton>
            </Tooltip>
          </Box>
          <Box flexGrow={1} zIndex={1}>
            {renderPage()}
          </Box>
        </Box>
      </Sidebar>
      <Context
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        position="bottom"
      >
        <ContextItem
          disableTranslation
          onClick={() => setPlaylist({
            name: t('library'),
            collection: songs.slice().sort(sortLibrary)
          })}
          primary={t('action:play', { context: 'library' })}
        />
      </Context>
    </Fragment>
  );
};

LibraryRouter.propTypes = {
  songs: PropTypes.arrayOf(propSong).isRequired,
  cacheSize: PropTypes.number.isRequired,
  addPlaylist: PropTypes.func.isRequired,
  setPlaylist: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  songs: state.song,
  cacheSize: state.config[TYPE.CONFIG.ADVANCED].libraryCache
});

const mapDispatchToProps = {
  addPlaylist: dispatchAddPlaylist,
  setPlaylist: dispatchSetPlaylist
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LibraryRouter);
