import React, {
  Fragment,
  useState,
  useEffect,
  useMemo,
  useCallback
} from 'react';
import { connect } from 'react-redux';
import { ACTION } from '@doombox/utils';
import PropTypes from 'prop-types';

// Components
import {
  App,
  AppBar
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

// Utils
import { PATH } from '../../utils/const';
import { RouteContext } from '../../utils/context';

const RouteProvider = ({ status }) => {
  const [page, setPage] = useState(PATH.PAGE.LABEL);
  const [domain, setDomain] = useState(PATH.DOMAIN.LIBRARY);
  const [dialog, setDialog] = useState(null);

  const setRoute = (newDomain, newPage) => {
    setDomain(newDomain);
    setPage(newPage);
  };

  const methodValue = useMemo(() => ({
    setDomain,
    setPage,
    setDialog,
    setRoute
  }), []);
  const locationValue = useMemo(() => ({ page, domain, dialog }), [page, domain, dialog]);

  // Domain
  useEffect(() => {
    // Validate domain
    if (!Object.values(PATH.DOMAIN).includes(domain)) {
      setDomain(PATH.DOMAIN.LIBRARY);
    }
  }, [domain]);

  // Interrupt
  useEffect(() => {
    if (
      status === ACTION.STATUS.PENDING ||
      status === ACTION.STATUS.ERROR
    ) {
      setDialog(PATH.DIALOG.INTERRUPT);
    }

    if (!status || status === ACTION.STATUS.SUCCESS) {
      setDialog(null);
    }
  }, [status]);

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

  const renderDialog = useCallback(() => (
    <Fragment>
      <SettingsRouter
        open={dialog === PATH.DIALOG.SETTINGS}
        onClose={() => setDialog(null)}
      />
      <InterruptRouter
        open={dialog === PATH.DIALOG.INTERRUPT}
        onClose={() => setDialog(null)}
      />
    </Fragment>
  ), [dialog]);

  return (
    <RouteContext.Method.Provider value={methodValue}>
      <RouteContext.Location.Provider value={locationValue}>
        <AppBar />
        <App>
          <Sidebar hidePanel={domain === PATH.DOMAIN.VISUALIZER}>
            {renderRouter()}
            {renderDialog()}
          </Sidebar>
        </App>
      </RouteContext.Location.Provider>
    </RouteContext.Method.Provider>
  );
};

RouteProvider.propTypes = {
  status: PropTypes.string
};

RouteProvider.defaultProps = {
  status: null
};

const mapStateToProps = state => ({
  status: state.interrupt.status
});

export default connect(
  mapStateToProps
)(RouteProvider);
