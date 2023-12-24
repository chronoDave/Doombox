import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

import { search } from '../../actions/library.actions';
import { setRouteSearch } from '../../actions/route.actions';
import Icon from '../../components/icon/icon';
import InputSearch from '../../components/inputSearch/inputSearch';
import * as Route from '../../types/route';

import subscribe from './library.state';
import LibraryRouter from './libraryRouter/libraryRouter';

import './library.scss';

export type LibraryProps = {};

const Library: Component<LibraryProps> = () => {
  const component = new forgo.Component<LibraryProps>({
    render() {
      const query = subscribe(component);

      return (
        <div class='Library'>
          <div class='bar'>
            <InputSearch placeholder='Search...' onsubmit={search} />
          </div>
          {query && (
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
          )}
          <LibraryRouter />
        </div>
      );
    }
  });

  return component;
};

export default Library;
