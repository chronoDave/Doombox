import React from 'react';
import { render } from 'react-dom';

import { App } from './modules/App';

import Theme from './theme';

import './scss/index.scss';

Theme.initialize();

render(
  <App />,
  document.getElementById('root')
);
