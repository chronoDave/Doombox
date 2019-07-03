import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { SnackbarProvider } from 'notistack';

// Core
import App from './components/App/App';
import IpcListener from './components/IpcListener/IpcListener';

// Utils
import store from './store';

ReactDOM.render(
  <Provider store={store}>
    <SnackbarProvider maxSnack={5} dense>
      <IpcListener />
      <App />
    </SnackbarProvider>
  </Provider>,
  // eslint-disable-next-line no-undef
  document.getElementById('root')
);
