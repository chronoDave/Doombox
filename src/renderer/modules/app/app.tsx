import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

import Player from '../player/player';

import LibraryNavigation from './libraryNavigation/libraryNavigation';
import LibraryQueue from './libraryQueue/libraryQueue';
import LibraryRouter from './libraryRouter/libraryRouter';

import './app.scss';

export type AppProps = {};

const App: Component<AppProps> = () => {
  const component = new forgo.Component<AppProps>({
    render() {
      return (
        <main class='App'>
          <LibraryNavigation />
          <div class='panel'>
            <Player />
            <LibraryQueue />
          </div>
          <LibraryRouter />
        </main>
      );
    }
  });

  return component;
};

export default App;
