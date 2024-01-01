import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

import { search } from '../../actions/library.actions';
import InputSearch from '../../components/inputSearch/inputSearch';
import * as Route from '../../types/route';

import subscribe from './library.state';
import LibraryGrid from './libraryGrid/libraryGrid';
import LibrarySearchAlbum from './librarySearchAlbum/librarySearchAlbum';
import LibrarySearchLabel from './librarySearchLabel/librarySearchLabel';
import LibrarySearchNav from './librarySearchNav/librarySearchNav';
import LibrarySearchSong from './librarySearchSong/librarySearchSong';

import './library.scss';

export type LibraryProps = {};

const Library: Component<LibraryProps> = () => {
  const component = new forgo.Component<LibraryProps>({
    render() {
      const route = subscribe(component);

      return (
        <div class='Library'>
          <InputSearch placeholder='Search...' onsubmit={search} />
          {route ? <LibrarySearchNav /> : null}
          {route === Route.Search.Song ? <LibrarySearchSong /> : null}
          {route === Route.Search.Album ? <LibrarySearchAlbum /> : null}
          {route === Route.Search.Label ? <LibrarySearchLabel /> : null}
          {!route ? <LibraryGrid /> : null}
        </div>
      );
    }
  });

  return component;
};

export default Library;
