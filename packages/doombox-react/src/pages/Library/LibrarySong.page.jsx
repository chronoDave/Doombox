import React, {
  useState,
  useEffect
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
  VirtualSong
} from '../../modules';

// Actions
import {
  queryLibrary,
  fetchSongs
} from '../../actions';

// Redux
import {
  setPlaylist as dispatchSetPlaylist,
  addPlaylist as dispatchAddPlaylist
} from '../../redux';

// Utils
import { createRegexPayload } from '../../utils';
import { propSong } from '../../utils/propTypes';

const LibrarySongPage = props => {
  const {
    songs,
    cacheSize,
    addPlaylist,
    setPlaylist
  } = props;
  const [library, setLibrary] = useState([]);
  const [offset, setOffset] = useState(0);

  const sort = 'album';
  const fields = [
    'metadata.artist',
    'metadata.song',
    'metadata.album',
    'metadata.albumartist'
  ];
  const operator = 'or';

  const handleScroll = (ref, scrollProps) => {
    const {
      direction,
      position,
      isUser,
      height
    } = scrollProps;
    const maxOffset = Math.floor(library.length / cacheSize) - 1;
    if (maxOffset <= 1) return;

    // Scroll up
    if (direction === 'backward' && position === 0 && isUser) {
      if (offset === 0) {
        setOffset(maxOffset);
      } else {
        setOffset(offset - 1);
      }
    }

    // Scroll down
    if (direction === 'forward' && position === height && isUser) {
      if (offset === maxOffset) {
        setOffset(0);
      } else {
        setOffset(offset + 1);
      }
    }
  };

  const handleSearch = query => {
    setOffset(0); // New library, reset cache
    if (query.length === 0) {
      fetchSongs();
    } else {
      queryLibrary(createRegexPayload(query, fields, operator));
    }
  };

  useEffect(() => {
    // Only create a new library "cache" when songs get updated
    setLibrary(Object.entries(groupBy(songs, 'metadata.album')));
  }, [songs]);

  return (
    <Box
      width="100%"
      height="100%"
      display="flex"
      flexDirection="column"
    >
      <ImageBackground />
      <Box px={2} py={1}>
        <SearchLibrary
          count={songs.length}
          onSearch={handleSearch}
          onAdd={() => addPlaylist(songs)}
          onPlay={query => setPlaylist({ name: query, collection: songs })}
        />
      </Box>
      <Box flexGrow={1}>
        <VirtualSong
          onScroll={handleScroll}
          library={library
            .sort((a, b) => {
              const aMetadata = a[1][0].metadata;
              const bMetadata = b[1][0].metadata;

              if (aMetadata[sort] < bMetadata[sort]) return -1;
              if (aMetadata[sort] > bMetadata[sort]) return 1;
              if (aMetadata.year < bMetadata.year) return -1;
              if (aMetadata.year > bMetadata.year) return 1;
              return 0;
            })
            .slice(offset * cacheSize, (offset + 1) * cacheSize)
          }
        />
      </Box>
    </Box>
  );
};

LibrarySongPage.propTypes = {
  addPlaylist: PropTypes.func.isRequired,
  setPlaylist: PropTypes.func.isRequired,
  cacheSize: PropTypes.number.isRequired,
  songs: PropTypes.arrayOf(propSong).isRequired
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
)(LibrarySongPage);
