import React from 'react';
import { render } from 'react-dom';

// Core
import { CssBaseline } from '@material-ui/core';

// Modules
import { Window } from './modules';

render(
  <CssBaseline>
    <Window>
      <div>
        Stuff
      </div>
    </Window>
  </CssBaseline>,
  document.getElementById('root')
);
