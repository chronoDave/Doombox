import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

import Router from '../router/router';
import TitleBar from '../titleBar/titleBar';

import './app.scss';

export type AppProps = {};

const App: Component<AppProps> = () => {
  const component = new forgo.Component<AppProps>({
    render() {
      return [
        <TitleBar />,
        <Router />
      ];
    }
  });

  return component;
};

export default App;
