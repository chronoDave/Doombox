import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

import AppBar from './appBar/appBar';
import AppRouter from './appRouter/appRouter';

import './app.scss';

export type AppProps = {};

const App: Component<AppProps> = () => {
  const component = new forgo.Component<AppProps>({
    render() {
      return [
        <AppBar />,
        <AppRouter />
      ];
    }
  });

  return component;
};

export default App;
