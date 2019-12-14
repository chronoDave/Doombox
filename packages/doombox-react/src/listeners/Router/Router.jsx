import React, { useEffect } from 'react';

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
  const { domain } = useRoute(HOOK.ROUTE.LOCATION);
  const { setDomain } = useRoute(HOOK.ROUTE.METHOD);

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
        </MainTemplate>
      );
    default:
      return null;
  }
};

export default Router;
