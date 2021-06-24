import React from 'react';
import { render } from 'react-dom';

import { App } from './modules/App';

import initTheme from './theme';

import './scss/index.scss';

initTheme();
render(
  <App />,
  document.getElementById('root')
);
