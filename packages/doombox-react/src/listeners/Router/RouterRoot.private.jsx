import React, { useEffect } from 'react';

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

const RouterRoot = () => {
  const { page } = useRoute(HOOK.ROUTE.LOCATION);
  const { setPage } = useRoute(HOOK.ROUTE.METHOD);

  useEffect(() => {
    if (!Object.values(PATH.PAGE).includes(page)) {
      setPage(PATH.PAGE.ALBUM);
    }
  }, [page]);

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

export default RouterRoot;
