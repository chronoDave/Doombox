import * as forgo from 'forgo';

import App from './modules/app/app';
import { TitleBar } from './modules/titleBar/titleBar';

forgo.mount([
  <TitleBar />,
  <App />
], document.body);
