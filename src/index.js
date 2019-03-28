import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

// Core
import App from './components/App/App';

// Utils
import store from './store';

// Electron events
import { ipcListener } from './events/ipcEvents';

ipcListener(store);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
