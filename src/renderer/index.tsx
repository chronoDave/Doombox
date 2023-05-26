import * as forgo from 'forgo';

import App from './modules/app/app';
import AppHeader from './modules/appHeader/appHeader';

import './index.scss';

forgo.mount([
  <AppHeader />,
  <App />
], document.body);
