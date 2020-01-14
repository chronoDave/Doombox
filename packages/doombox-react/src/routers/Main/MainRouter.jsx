import React, {
  Fragment,
  useMemo,
  useEffect
} from 'react';

// Core
import {
  Box,
  Divider
} from '@material-ui/core';

import { Sidebar } from '../../components';

// Modules
import {
  Player,
  Playlist,
  Navigation,
  Collection
} from '../../modules';

// Pages
import {
  VisualizerPage,
  AlbumPage,
  LibraryPage
} from '../../pages';

// Hooks
import { useRoute } from '../../hooks';

// Utils
import {
  HOOK,
  PATH
} from '../../utils/const';

// Styles
import { useMainRouterStyles } from './MainRouter.style';

const MainRouter = () => {
  const { page } = useRoute(HOOK.ROUTE.LOCATION);
  const { setPage } = useRoute(HOOK.ROUTE.METHOD);
  const classes = useMainRouterStyles();

  useEffect(() => {
    if (!Object.values(PATH.PAGE).includes(page)) {
      setPage(PATH.PAGE.ALBUM);
    }
  }, [page]);

  const renderPage = () => {
    switch (page) {
      case PATH.PAGE.ALBUM:
        return <AlbumPage />;
      case PATH.PAGE.SONG:
        return <LibraryPage />;
      case PATH.PAGE.VISUALIZER:
        return <VisualizerPage />;
      default:
        return null;
    }
  };

  return (
    <Fragment>
      {useMemo(() => (
        <Sidebar
          tab={(
            <Fragment>
              <Navigation />
              <Box my={0.5} mx={1}>
                <Divider />
              </Box>
              <Collection />
            </Fragment>
          )}
          panel={(
            <Fragment>
              <Player />
              <Playlist />
            </Fragment>
          )}
        />
      ), [])}
      <div className={classes.root}>
        {renderPage()}
      </div>
    </Fragment>
  );
};

export default MainRouter;