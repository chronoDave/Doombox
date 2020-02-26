import React, {
  useEffect,
  useMemo,
  useState
} from 'react';
import { TYPE } from '@doombox/utils';
import { connect } from 'react-redux';
import groupBy from 'lodash.groupby';
import PropTypes from 'prop-types';

// Core
import { Box } from '@material-ui/core';

import { ImageBackground } from '../../components';

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
  createRegexPayload,
  createDividerDisc,
  createDividerAlbum,
  sortLibraryDefault,
  getTotalDuration
} from '../../utils';
import {
  PATH,
  HOOK
} from '../../utils/const';
import { propSong } from '../../utils/propTypes';

const LibraryRouter = props => {
  const {
    songs,
    cacheSize,
    addPlaylist,
    setPlaylist
  } = props;
  const [offset, setOffset] = useState(0);

  const { page } = useRoute(HOOK.ROUTE.LOCATION);

  const fields = [
    'metadata.artist',
    'metadata.song',
    'metadata.album',
    'metadata.albumartist'
  ];
  const operator = 'or';

  const propSongLibrary = useMemo(() => (Object
    .entries(groupBy(songs, 'metadata.album'))
    .sort(sortLibraryDefault)
    .reduce((acc, cur) => {
      const [album, tracks] = cur;
      const { metadata: { albumartist, year } } = tracks[0];

      const duration = getTotalDuration(tracks);
      const discs = createDividerDisc(tracks);

      return [
        ...acc,
        {
          divider: 'album',
          album,
          albumartist,
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
    .sort(sortLibraryDefault)
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
          tracks: albums
            .map(({ tracks: albumTracks }) => albumTracks)
            .flat()
        },
        ...albums
      ];
    }, [])
  ), [songs]);

  const handleSearch = query => {
    setOffset(0); // New library, reset cache
    queryLibrary(query.length !== 0 && createRegexPayload(query, fields, operator));
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
    <Sidebar>
      <Box
        width="100%"
        height="100%"
        display="flex"
        flexDirection="column"
      >
        <ImageBackground />
        <Box px={2} py={1} zIndex={1}>
          <SearchLibrary
            count={songs.length}
            onSearch={handleSearch}
            onAdd={() => addPlaylist(songs)}
            onPlay={query => setPlaylist({ name: query, collection: songs })}
          />
        </Box>
        <Box flexGrow={1} zIndex={1}>
          {renderPage()}
        </Box>
      </Box>
    </Sidebar>
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
