import * as forgo from 'forgo';

import App from './modules/app/app';
import AppHeader from './modules/appHeader/appHeader';

import './scss/components/button.scss';
import './scss/fonts.scss';
import './scss/global.scss';
import './scss/reset.scss';
import './scss/theme.scss';

forgo.mount([
  <AppHeader />,
  <App />
], document.body);
