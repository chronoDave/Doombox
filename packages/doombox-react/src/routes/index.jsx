import React from 'react';

// Paths
import * as Paths from '../paths';

// Pages
import {
  HomePage,
  SettingsPage
} from '../pages';

export const PrivateRoutes = [
  {
    key: 'settings',
    exact: true,
    path: Paths.settingsPath,
    render: props => <SettingsPage {...props} />
  }
];

export const PublicRoutes = [
  {
    key: 'home',
    exact: true,
    path: Paths.homePath,
    render: props => <HomePage {...props} />
  },
];
