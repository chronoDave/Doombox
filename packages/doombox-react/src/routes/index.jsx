import React from 'react';

// Paths
import * as Paths from '../paths';

// Pages
import { HomePage } from '../pages';

export const Routes = [
  {
    key: 'home',
    path: Paths.homePath,
    render: props => <HomePage {...props} />
  }
];
