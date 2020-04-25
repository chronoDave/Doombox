import React, {
  Fragment,
  useEffect,
  useMemo,
  useState
} from 'react';
import {
  ACTION,
  TYPE
} from '@doombox/utils';
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
  VirtualLabel,
  VirtualSong
} from '../../modules';

// Actions
import {
  fetchLibrary,
  searchLibrary
} from '../../actions';

// Redux
import {
  addMixtape,
  setMixtape
} from '../../redux';

// Hooks
import { useRoute } from '../../hooks';

// Utils
import {
  sortLibrary,
  createDividerDisc,
  createDividerAlbum,
  getTotalDuration,
  shuffleArray
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
    addToMixtape,
    playMixtape,
    reverseScroll
  } = props;
  const [offset, setOffset] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);

  const { page } = useRoute(HOOK.ROUTE.LOCATION);
  const { t } = useTranslation();

  const propSongLibrary = useMemo(() => (Object
    .entries(groupBy(songs, 'metadata.album'))
    .sort((a, b) => sortLibrary(a[1][0], b[1][0]))
    .reduce((acc, cur) => {
      const [album, tracks] = cur;
      const {
        images,
        metadata: {
          albumlocalized,
          albumartist,
          year
        }
      } = tracks[0];

      const duration = getTotalDuration(tracks);
      const discs = createDividerDisc(tracks);

      return [
        ...acc,
        {
          divider: 'album',
          album,
          albumlocalized,
          albumartist,
          cover: images[0] || {},
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
          divider: true,
          albumartist,
          duration,
          albums: albums.length,
          size: tracks.length,
          tracks: albums.reduce((accAlbum, curAlbum) => [
            ...accAlbum,
            curAlbum.tracks
          ], [])
        },
        ...albums
      ];
    }, [])
  ), [songs]);

  const handleSearch = query => {
    setOffset(0); // New library, reset cache
    searchLibrary(
      query.length !== 0 ? ({
        operator: 'or',
        expressions: [
          'metadata.artist',
          'metadata.artistlocalized',
          'metadata.artists',
          'metadata.artistslocalized',
          'metadata.title',
          'metadata.titlelocalized',
          'metadata.album',
          'metadata.albumlocalized',
          'metadata.albumartist',
          'metadata.albumartistlocalized'
        ].map(key => ({ key, expression: query }))
      }) : null,
      {
        'metadata.album': 1,
        'metadata.disk.no': 1,
        'metadata.track.no': 1
      }
    );
  };

  const handleScroll = ({ scrollDirection, scrollToView }, size) => {
    const maxOffset = Math.floor(size / cacheSize);

    if (maxOffset < 1) return;
    if (scrollDirection === 'backward') {
      if (!reverseScroll && offset === 0) return;
      setOffset(offset === 0 ? maxOffset : offset - 1);
      scrollToView();
    }
    if (scrollDirection === 'forward') {
      if (!reverseScroll && offset === maxOffset) return;
      setOffset(offset === maxOffset ? 0 : offset + 1);
      scrollToView();
    }
  };

  useEffect(() => {
    setOffset(0);
  }, [page]);

  useEffect(() => {
    fetchLibrary();
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

  const renderContext = () => (
    <Context
      anchorEl={anchorEl}
      open={!!anchorEl}
      onClose={() => setAnchorEl(null)}
      position="bottom"
    >
      <ContextItem
        onClick={() => playMixtape({
          action: ACTION.PLAYLIST.SET,
          name: t('library'),
          // Slice makes sure a NEW array is created
          collection: songs.slice().sort(sortLibrary)
        })}
        primary={t('action:play', { context: 'library' })}
      />
      <ContextItem
        onClick={() => playMixtape({
          action: ACTION.PLAYLIST.SET,
          name: t('library'),
          // Slice makes sure a NEW array is created
          collection: shuffleArray(songs.slice().sort(sortLibrary))
        })}
        primary={t('action:shuffle', { context: 'library' })}
      />
    </Context>
  );

  return (
    <Fragment>
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
            onAdd={() => addToMixtape(songs)}
            onPlay={query => playMixtape({ name: query, collection: songs })}
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
      {renderContext()}
    </Fragment>
  );
};

LibraryRouter.propTypes = {
  songs: PropTypes.arrayOf(propSong).isRequired,
  cacheSize: PropTypes.number.isRequired,
  addToMixtape: PropTypes.func.isRequired,
  playMixtape: PropTypes.func.isRequired,
  reverseScroll: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  songs: state.library,
  cacheSize: state.config[TYPE.CONFIG.ADVANCED].libraryCache,
  reverseScroll: state.config[TYPE.CONFIG.GENERAL].reverseScroll
});

const mapDispatchToProps = {
  addToMixtape: addMixtape,
  playMixtape: setMixtape
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LibraryRouter);
