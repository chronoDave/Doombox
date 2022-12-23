import * as forgo from 'forgo';

import { TitleBar } from './modules/titleBar/titleBar';
import { HomePage } from './pages/home/home.page';

forgo.mount([
  <TitleBar />,
  <main>
    <HomePage />
  </main>
], document.body);
