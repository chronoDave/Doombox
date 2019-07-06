import React, { Fragment } from 'react';
import {
  BrowserRouter,
  Switch,
  Route
} from 'react-router-dom';

// Core
import { Sidebar } from '../Sidebar';

// Routes
import { Routes } from '../../routes';

const App = () => (
  <BrowserRouter>
    <Sidebar />
    <Switch>
      {Routes.map(route => <Route key={route.key} {...route} />)}
    </Switch>
  </BrowserRouter>
);

export default App;
