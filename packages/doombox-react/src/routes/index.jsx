import React from 'react';

// Paths
import * as Paths from '../paths';

// Pages
import {
  HomePage,
  SettingsPage,
  LoadingPage,
  OfflinePage,
  CreateProfilePage
} from '../pages';

export const PrivateRoutes = [
  {
    key: 'home',
    exact: true,
    path: Paths.homePath,
    render: props => <HomePage {...props} />
  },
  {
    key: 'settings',
    exact: true,
    path: Paths.settingsPath,
    render: props => <SettingsPage {...props} />
  }
];

export const LoadingRoute = {
  key: 'loading',
  exact: true,
  path: Paths.loadingPath,
  render: props => <LoadingPage {...props} />
};

export const OfflineRoute = {
  key: 'offline',
  exact: true,
  path: Paths.offlinePath,
  render: props => <OfflinePage {...props} />
};

export const CreateProfileRoute = {
  key: 'createProfile',
  exact: true,
  path: Paths.createProfilePath,
  render: props => <CreateProfilePage {...props} /> 
};
