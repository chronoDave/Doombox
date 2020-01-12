import React, { useState } from 'react';

// Icons
import IconClear from '@material-ui/icons/Cancel';

// Core
import {
  Box,
  Typography,
  IconButton
} from '@material-ui/core';

import { InputSearch } from '../../components';

// Actions
import { queryLibrary } from '../../actions';

const SearchBarLibrary = () => {
  const [query, setQuery] = useState('');
  const [queryCache, setQueryCache] = useState(null);

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
    <InputSearch
      id="search"
      name="search"
      value={query}
      onChange={event => setQuery(event.target.value)}
      onEnter={handleSubmit}
      onSearch={handleSubmit}
      onClear={handleClear}
    />
  );
};

export default SearchBarLibrary;
