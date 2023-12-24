import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

import { search } from '../../../actions/library.actions';
import { setRouteSearch } from '../../../actions/route.actions';
import Icon from '../../../components/icon/icon';
import InputSearch from '../../../components/inputSearch/inputSearch';
import * as Route from '../../../types/route';

import subscribe from './librarySearch.state';

export type LibrarySearchProps = {};

const LibrarySearch: Component<LibrarySearchProps> = () => {
  const component = new forgo.Component<LibrarySearchProps>({
    render() {
      const query = subscribe(component);

      return [
        <div class='bar'>
          <InputSearch placeholder='Search...' onsubmit={search} />
        </div>,
        query && (
          <nav class='bar' aria-label='Search'>
            <button
              type='button'
              onclick={() => setRouteSearch(Route.Search.Label)}
              aria-label='Label'
            >
              <Icon id='record' />
            </button>
            <button
              type='button'
              onclick={() => setRouteSearch(Route.Search.Album)}
              aria-label='Album'
            >
              <Icon id='boxMusic' />
            </button>
            <button
              type='button'
              onclick={() => setRouteSearch(Route.Search.Song)}
              aria-label='Song'
            >
              <Icon id='musicNote' />
            </button>
          </nav>
        )];
    }
  });

  return component;
};

export default LibrarySearch;
