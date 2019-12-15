import React, {
  useState,
  useEffect,
  useMemo
} from 'react';
import { FixedSizeList } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import groupby from 'lodash.groupby';

// Icons
import IconClear from '@material-ui/icons/Cancel';

// Core
import { useTheme } from '@material-ui/core/styles';
import {
  Typography,
  IconButton,
  Box
} from '@material-ui/core';

import { Search } from '../../components';

// Actions
import { queryLibrary } from '../../actions';

// Hooks
import { useAudio } from '../../hooks';

// Utils
import { HOOK } from '../../utils/const';

// Styles
import { useLibraryStyles } from './Library.style';

import LibraryItem from './LibraryItem.private';

const groupByAlbum = library => Object
  .entries(groupby(library, 'metadata.album'))
  .map(([key, values]) => [
    {
      title: `${values[0].metadata.albumartist} - ${key}`
    },
    ...values
  ])
  .flat();

const Library = () => {
  const [query, setQuery] = useState('');
  const [queryCache, setQueryCache] = useState(null);
  const [collection, setCollection] = useState([]);

  const library = useAudio(HOOK.AUDIO.LIBRARY);
  const { _id: current } = useAudio(HOOK.AUDIO.CURRENT);
  const { createSong } = useAudio(HOOK.AUDIO.METHOD);
  const theme = useTheme();
  const classes = useLibraryStyles();

  useEffect(() => {
    setCollection(groupByAlbum(library));
  }, [library]);

  const itemData = useMemo(() => ({
    current,
    classes,
    createSong,
    collection
  }), [collection, current, classes]);

  const handleSubmit = () => {
    if (query.length > 0) {
      queryLibrary(query);
      setQueryCache(query);
    }
  };

  const handleClear = () => {
    if (query) setQuery('');
    if (queryCache) {
      queryLibrary('');
      setQueryCache(null);
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      height="100%"
      width="100%"
    >
      <Box ml={2} display="flex" alignItems="center">
        <Search
          id="search"
          name="search"
          value={query}
          onChange={event => setQuery(event.target.value)}
          onEnter={handleSubmit}
          onClick={handleSubmit}
        />
        {queryCache && (
          <Box display="flex" alignItems="center">
            <Typography>
              {queryCache}
            </Typography>
            <IconButton onClick={handleClear}>
              <IconClear />
            </IconButton>
          </Box>
        )}
      </Box>
      <Box width="100%" flexGrow={1}>
        <AutoSizer>
          {({ width, height }) => (
            <FixedSizeList
              width={width}
              height={height}
              itemCount={collection.length}
              itemData={itemData}
              itemSize={theme.spacing(7)}
            >
              {LibraryItem}
            </FixedSizeList>
          )}
        </AutoSizer>
      </Box>
    </Box>
  );
};

export default Library;
