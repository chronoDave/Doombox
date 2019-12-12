import React from 'react';
import {
  Router as ReachRouter,
  Redirect
} from '@reach/router';

// Templates
import { MainTemplate } from '../../templates';

// Pages
import {
  VisualizerPage,
  AlbumPage,
  SongPage
} from '../../pages';

// Utils
import { PATH } from '../../utils/const';

const Router = () => (
  <ReachRouter>
    <MainTemplate path="/">
      <VisualizerPage path={PATH.VISUALIZER} />
      <AlbumPage path={PATH.ALBUM} />
      <SongPage path={PATH.SONG} />
    </MainTemplate>
    <Redirect from="/" to={PATH.SONG} noThrow />
  </ReachRouter>
);

export default Router;
