import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

import Player from '../player/player';

import AppNavigation from './appNav/appNav';
import AppQueue from './appQueue/appQueue';
import AppRouter from './appRouter/appRouter';

import './app.scss';

export type AppProps = {};

const App: Component<AppProps> = () => {
  const component = new forgo.Component<AppProps>({
    render() {
      return (
        <main class='App'>
          <AppNavigation />
          <div class='panel'>
            <Player />
            <AppQueue />
          </div>
          <AppRouter />
        </main>
      );
    }
  });

  return component;
};

export default App;
