import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

// Core
import { Box } from '@material-ui/core';

import {
  InputSearch,
  Typography
} from '../../components';

// Validation
import { propSong } from '../../validation/propTypes';

const SearchFavorites = ({ favorites, setResult }) => {
  const [query, setQuery] = useState('');
  const [count, setCount] = useState(0);

  const { t } = useTranslation();

  const handleSearch = value => {
    setQuery(value);

    if (value !== '') {
      /**
       * Iterate over every favorite song
       * And check if any of the props are a string and includes query
       */
      const result = favorites.filter(song => Object
        .values(song.metadata)
        .filter(prop => typeof prop === 'string' && prop.includes(value))
        .length > 0);

      setResult(result);
      setCount(result.length);
    } else {
      setResult(null);
    }
  };

  return (
    <Box display="flex" alignItems="center" height={48}>
      <InputSearch
        id="favorites"
        name="search"
        onChange={handleSearch}
      />
      {query !== '' && (
        <Box display="flex" zIndex={1} justifyContent="center">
          <Box
            minWidth={72}
            ml={2}
            mr={1}
            flexShrink={0}
            display="flex"
            alignItems="center"
          >
            <Typography variant="body2" align="right">
              {t('resultCount', { count })}
            </Typography>
          </Box>
        </Box>
      )}
    </Box>
  );
};

SearchFavorites.propTypes = {
  favorites: PropTypes.arrayOf(propSong).isRequired,
  setResult: PropTypes.func.isRequired
};

export default SearchFavorites;
