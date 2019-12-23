import React, {
  useState,
  useMemo,
  useEffect,
  useCallback
} from 'react';

// Modules
import {
  App,
  AppBar
} from '../../components';

// Routers
import {
  MainRouter,
  SettingsRouter
} from '../../routers';

// Utils
import { PATH } from '../../utils/const';
import { RouteContext } from '../../utils/context';

const RouteProvider = () => {
  const [domain, setDomain] = useState(PATH.DOMAIN.ROOT);
  const [page, setPage] = useState(PATH.PAGE.ALBUM);
  const [dialog, setDialog] = useState(null);

  const methodValue = useMemo(() => ({
    setDomain: newDomain => setDomain(newDomain),
    setPage: newPage => setPage(newPage),
    openDialog: newDialog => setDialog(newDialog),
    closeDialog: () => setDialog(null)
  }), []);

  const locationValue = useMemo(() => ({
    domain, page, dialog
  }), [domain, page, dialog]);

  useEffect(() => {
    if (!Object.values(PATH.DOMAIN).includes(domain)) {
      setDomain(PATH.DOMAIN.ROOT);
    }
  }, [domain]);

  const renderRouter = useCallback(() => {
    switch (domain) {
      case PATH.DOMAIN.ROOT:
        return <MainRouter />;
      default:
        return null;
    }
  }, [domain]);

  return (
    <RouteContext.Method.Provider value={methodValue}>
      <RouteContext.Location.Provider value={locationValue}>
        <AppBar />
        <App>
          {renderRouter()}
          <SettingsRouter
            open={dialog === PATH.DIALOG.SETTINGS}
            onClose={methodValue.closeDialog}
          />
        </App>
      </RouteContext.Location.Provider>
    </RouteContext.Method.Provider>
  );
};

export default RouteProvider;
