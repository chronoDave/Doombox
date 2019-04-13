import React from 'react';

// Core
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';

import Main from '../Main/Main';

// Style
import Theme from '../../theme/Theme';

const App = () => (
  <MuiThemeProvider theme={Theme}>
    <Main />
  </MuiThemeProvider>
);

export default App;
