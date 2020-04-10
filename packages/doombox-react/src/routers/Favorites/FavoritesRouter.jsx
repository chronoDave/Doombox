import React, { useEffect } from 'react';

// Core
import { Box } from '@material-ui/core';

// Actions
import { fetchFavorites } from '../../actions';

// Pages
import { FavoritesRootPage } from '../../pages';

const FavoritesRouter = () => {
  useEffect(() => {
    fetchFavorites();
  }, []);

  return (
    <Box height="100%">
      <FavoritesRootPage />
    </Box>
  );
};

export default FavoritesRouter;
