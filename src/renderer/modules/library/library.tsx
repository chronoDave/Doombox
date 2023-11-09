import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

import Player from '../player/player';

import LibraryNavigation from './libraryNavigation/libraryNavigation';
import LibraryQueue from './libraryQueue/libraryQueue';
import LibraryRouter from './libraryRouter/libraryRouter';

import './library.scss';

export type LibraryProps = {};

const Library: Component<LibraryProps> = () => {
  const component = new forgo.Component<LibraryProps>({
    render() {
      return (
        <main class='Library'>
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

export default Library;
