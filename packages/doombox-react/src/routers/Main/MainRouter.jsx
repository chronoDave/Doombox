import React, {
  Fragment,
  useMemo,
  useEffect
} from 'react';

// Modules
import {
  Player,
  VirtualPlaylist,
  Navigation,
  Sidebar
} from '../../modules';

// Pages
import {
  VisualizerPage,
  LabelPage,
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
      setPage(PATH.PAGE.LABEL);
    }
  }, [page]);

  const renderPage = () => {
    switch (page) {
      case PATH.PAGE.LABEL:
        return <LabelPage />;
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
          tab={<Navigation />}
          panel={(
            <Fragment>
              <Player />
              <VirtualPlaylist />
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
