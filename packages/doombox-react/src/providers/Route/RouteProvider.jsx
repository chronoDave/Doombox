import React, {
  useState,
  useMemo,
  useEffect,
  useCallback
} from 'react';
import { ACTION } from '@doombox/utils';

// Modules
import {
  App,
  AppBar
} from '../../components';

// Routers
import {
  MainRouter,
  SettingsRouter,
  InterruptRouter
} from '../../routers';

// Hooks
import { useIpc } from '../../hooks';

// Utils
import { PATH, HOOK } from '../../utils/const';
import { RouteContext } from '../../utils/context';

const RouteProvider = () => {
  const [domain, setDomain] = useState(PATH.DOMAIN.ROOT);
  const [page, setPage] = useState(PATH.PAGE.SONG);
  const [dialog, setDialog] = useState(null);
  const { status } = useIpc(HOOK.IPC.INTERRUPT);

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

  useEffect(() => {
    if (
      status === ACTION.INTERRUPT.PENDING ||
      status === ACTION.INTERRUPT.ERROR
    ) {
      setDialog(PATH.DIALOG.INTERRUPT);
    }
    if (!status || status === ACTION.INTERRUPT.SUCCESS) {
      setDialog(null);
    }
  }, [status]);

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
          <InterruptRouter
            open={dialog === PATH.DIALOG.INTERRUPT}
            onClose={methodValue.closeDialog}
          />
        </App>
      </RouteContext.Location.Provider>
    </RouteContext.Method.Provider>
  );
};

export default RouteProvider;
