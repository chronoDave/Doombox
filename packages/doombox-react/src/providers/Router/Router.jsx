import React from 'react';
import { Router as ReachRouter } from '@reach/router';

import MainRouter from './MainRouter.private';

const Router = () => (
  <ReachRouter>
    <MainRouter path="/" />
  </ReachRouter>
);

export default Router;
