import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

import LibraryRouter from './libraryRouter/libraryRouter';
import LibrarySearch from './librarySearch/librarySearch';

import './library.scss';

export type LibraryProps = {};

const Library: Component<LibraryProps> = () => {
  const component = new forgo.Component<LibraryProps>({
    render() {
      return (
        <div class='Library'>
          <LibrarySearch />
          <LibraryRouter />
        </div>
      );
    }
  });

  return component;
};

export default Library;
