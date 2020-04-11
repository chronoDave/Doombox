import React, {
  useEffect,
  useState,
  useMemo,
  useCallback
} from 'react';
import { ACTION } from '@doombox/utils';
import { connect } from 'react-redux';

// Components
import {
  App,
  AppBar,
  ModalFade
} from '../../components';

// Modules
import { Sidebar } from '../../modules';

// Routers
import {
  LibraryRouter,
  VisualizerRouter,
  SettingsRouter,
  InterruptRouter,
  FavoritesRouter
} from '../../routers';

// Actions
import { updateCache } from '../../actions';

// Utils
import { PATH } from '../../utils/const';
import { RouteContext } from '../../utils/context';

/**
 * Page validation should be handled by the router
 */
const RouteProvider = ({ status, cache }) => {
  const [domain, setDomain] = useState(null);
  const [page, setPage] = useState(null);
  const [dialog, setDialog] = useState(null);

  // Context values
  const methodValue = useMemo(() => ({
    setDomain,
    setPage,
    setDialog
  }), []);
  const locationValue = useMemo(() => ({
    domain,
    page,
    dialog
  }), [domain, page, dialog]);

  // Initialize route
  useEffect(() => {
    console.log(cache);
    if (cache) {
      if (cache.domain && !domain) setDomain(cache.domain);
      if (cache.page && !page) setPage(cache.page);
    }
  }, [cache]);

  // Update cache
  useEffect(() => {
    if (page) updateCache.general({ page });
  }, [page]);

  // Validate domain
  useEffect(() => {
    if (!Object.values(PATH.DOMAIN).includes(domain)) {
      setDomain(PATH.DOMAIN.LIBRARY);
    } else {
      updateCache.general({ domain });
    }
  }, [domain]);

  // Interrupt
  useEffect(() => {
    if (status === ACTION.STATUS.PENDING || status === ACTION.STATUS.ERROR) {
      setDialog(PATH.DIALOG.INTERRUPT);
    }
    if (!status || status === ACTION.STATUS.SUCCESS) {
      setDialog(null);
    }
  }, [status]);

  // Renders
  const renderRouter = useCallback(() => {
    switch (domain) {
      case PATH.DOMAIN.LIBRARY:
        return <LibraryRouter />;
      case PATH.DOMAIN.VISUALIZER:
        return <VisualizerRouter />;
      case PATH.DOMAIN.FAVORITES:
        return <FavoritesRouter />;
      default:
        return null;
    }
  }, [domain]);

  const renderDialog = useCallback(() => {
    switch (dialog) {
      case PATH.DIALOG.SETTINGS:
        return <SettingsRouter />;
      case PATH.DIALOG.INTERRUPT:
        return <InterruptRouter />;
      default:
        return null;
    }
  }, [dialog]);

  return (
    <RouteContext.Method.Provider value={methodValue}>
      <RouteContext.Location.Provider value={locationValue}>
        <AppBar />
        <App>
          <Sidebar hidePanel={domain === PATH.DOMAIN.VISUALIZER}>
            {renderRouter()}
          </Sidebar>
          <ModalFade open={!!dialog} onClose={() => setDialog(null)}>
            {renderDialog()}
          </ModalFade>
        </App>
      </RouteContext.Location.Provider>
    </RouteContext.Method.Provider>
  );
};

const mapStateToProps = state => ({
  cache: state.cache.general,
  status: state.interrupt.status
});

export default connect(
  mapStateToProps
)(RouteProvider);
