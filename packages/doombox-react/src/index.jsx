import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

// Core
import { App } from './components/App';
import { IpcListener } from './components/IpcListener';

// Utils
import { store } from './store';

render(
  <Provider store={store}>
    <IpcListener />
    <App />
  </Provider>,
  document.getElementById('root')
);
