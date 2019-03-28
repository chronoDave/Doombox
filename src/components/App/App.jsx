import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

// Core
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';

import Main from '../Main/Main';

// Style
import Theme from '../../theme/Theme';

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={Theme}>
        <BrowserRouter>
          <Switch>
            <Route path="/" component={Main} />
          </Switch>
        </BrowserRouter>
      </MuiThemeProvider>
    );
  }
}

export default App;
