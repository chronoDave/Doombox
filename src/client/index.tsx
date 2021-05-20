import React from 'react';
import { render } from 'react-dom';

// Modules
import { App, Window } from './modules';

render(
  <App>
    <Window>
      Doombox
    </Window>
  </App>,
  document.getElementById('root')
);
