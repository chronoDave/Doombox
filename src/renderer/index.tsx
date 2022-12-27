import * as forgo from 'forgo';

import { TitleBar } from './modules/titleBar/titleBar';
import { HomePage } from './pages/home/home.page';
import state from './state/state';

state.library.fetchSongs();

forgo.mount([
  <TitleBar />,
  <main>
    <HomePage />
  </main>
], document.body);
