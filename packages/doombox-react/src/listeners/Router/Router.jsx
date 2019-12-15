import React, { useEffect } from 'react';

// Modules
import {
  Settings,
  DialogCreatePlaylist
} from '../../entities';

// Templates
import { MainTemplate } from '../../templates';

// Hooks
import { useRoute } from '../../hooks';

// Utils
import {
  HOOK,
  PATH
} from '../../utils/const';

import RouterRoot from './RouterRoot.private';

const Router = () => {
  const { domain, dialog } = useRoute(HOOK.ROUTE.LOCATION);
  const { setDomain, closeDialog } = useRoute(HOOK.ROUTE.METHOD);

  useEffect(() => {
    if (!Object.values(PATH.DOMAIN).includes(domain)) {
      setDomain(PATH.DOMAIN.ROOT);
    }
  }, [domain]);

  switch (domain) {
    case PATH.DOMAIN.ROOT:
      return (
        <MainTemplate>
          <RouterRoot />
          <Settings
            open={dialog === PATH.DIALOG.SETTINGS}
            onClose={closeDialog}
          />
          <DialogCreatePlaylist
            open={dialog === PATH.DIALOG.PLAYLIST.CREATE}
            onClose={closeDialog}
          />
        </MainTemplate>
      );
    default:
      return null;
  }
};

export default Router;
