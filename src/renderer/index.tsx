import * as forgo from 'forgo';
import { enableMapSet } from 'immer';

import AppBar from './modules/appBar/appBar';
import App from './modules/app/app';

enableMapSet();
forgo.mount([
  <AppBar />,
  <App />
], document.body);
