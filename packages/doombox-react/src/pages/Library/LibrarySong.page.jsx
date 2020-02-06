import React, { useState } from 'react';
import { TYPE } from '@doombox/utils';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Core
import { Box } from '@material-ui/core';

import { ImageBackground } from '../../components';

// Modules
import {
  Search,
  Library
} from '../../modules';

// Actions
import {
  fetchLibrary,
  queryLibrary
} from '../../actions';

// Utils
import { createRegexPayload } from '../../utils';

const LibrarySongPage = ({ size, cacheSize }) => {
  const [query, setQuery] = useState(null);

  const operator = 'or';
  const fields = [
    'metadata.title',
    'metadata.artist',
    'metadata.album'
  ];

  const handleScroll = ({ direction, offset }) => {
    let newOffset = 0;
    if (direction === 'forward') newOffset = offset + cacheSize;
    if (direction === 'backward') newOffset = offset - cacheSize;

    if (query) {
      queryLibrary(
        cacheSize,
        newOffset,
        createRegexPayload(query, fields, operator)
      );
    } else {
      fetchLibrary(cacheSize, newOffset);
    }
  };

  const handleSearch = search => {
    if (search) {
      setQuery(search);
      queryLibrary(
        cacheSize,
        0,
        createRegexPayload(search, fields, operator)
      );
    } else {
      setQuery(null);
      fetchLibrary(cacheSize);
    }
  };

  return (
    <Box
      width="100%"
      height="100%"
      display="flex"
      flexDirection="column"
    >
      <ImageBackground />
      <Box px={2} py={1}>
        <Search
          id="library"
          fields={fields}
          operator={operator}
          onSearch={handleSearch}
          count={size}
        />
      </Box>
      <Box flexGrow={1}>
        <Library onScroll={handleScroll} />
      </Box>
    </Box>
  );
};

LibrarySongPage.displayName = 'LibrarySongPage';
LibrarySongPage.propTypes = {
  size: PropTypes.number.isRequired,
  cacheSize: PropTypes.number.isRequired
};

const mapStateToProps = state => ({
  size: state.library.size,
  cacheSize: state.config[TYPE.CONFIG.ADVANCED].libraryCache
});

export default connect(
  mapStateToProps
)(LibrarySongPage);
