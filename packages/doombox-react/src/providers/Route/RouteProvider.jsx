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

// Modules
import {
  App,
  AppBar
} from '../../components';

// Routers
import {
  LibraryRouter,
  VisualizerRouter,
  SettingsRouter,
  InterruptRouter
} from '../../routers';

// Utils
import { PATH } from '../../utils/const';
import { RouteContext } from '../../utils/context';

const RouteProvider = ({ status }) => {
  const [page, setPage] = useState(PATH.PAGE.LABEL);
  const [domain, setDomain] = useState(PATH.DOMAIN.LIBRARY);
  const [dialog, setDialog] = useState(null);

  const methodValue = useMemo(() => ({ setDomain, setPage, setDialog }), []);
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
          {renderRouter()}
          {renderDialog()}
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
