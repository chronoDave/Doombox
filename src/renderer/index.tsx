import * as forgo from 'forgo';

import TitleBar from './modules/titleBar/titleBar';

forgo.mount([
  <TitleBar />,
  <main>
    Main!
  </main>
], document.body);
