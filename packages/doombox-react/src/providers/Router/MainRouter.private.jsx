import React from 'react';
import { Router as ReachRouter } from '@reach/router';

// Templates
import { MainTemplate } from '../../templates';

// Pages
import { MainSongsPage } from '../../pages';

const MainRouter = () => (
  <MainTemplate>
    <ReachRouter>
      <MainSongsPage path="/" />
    </ReachRouter>
  </MainTemplate>
);

export default MainRouter;
