import * as forgo from 'forgo';

import App from './modules/app/app';
import AppBar from './modules/appBar/appBar';

forgo.mount([
  <AppBar />,
  <App />
], document.body);
