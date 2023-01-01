import * as forgo from 'forgo';

import App from './modules/app/app';
import AppBar from './modules/appBar/appBar';
import './scss/fonts.scss';
import './scss/reset.scss';
import './scss/theme.scss';

forgo.mount([
  <AppBar />,
  <App />
], document.body);
