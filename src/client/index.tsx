import React from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { render } from 'react-dom';

import { App } from './modules/App';

import store from './redux';

import './scss/index.scss';

render(
  <ReduxProvider store={store}>
    <App />
  </ReduxProvider>,
  document.getElementById('root')
);
