import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

import { search } from '../../../actions/library.actions';
import { setRouteSearch } from '../../../actions/route.actions';
import Icon from '../../../components/icon/icon';
import InputSearch from '../../../components/inputSearch/inputSearch';
import * as Route from '../../../types/route';
import cx from '../../../utils/cx/cx';

import subscribe from './librarySearch.state';

import './librarySearch.scss';

export type LibrarySearchProps = {};

const LibrarySearch: Component<LibrarySearchProps> = () => {
  const component = new forgo.Component<LibrarySearchProps>({
    render() {
      const state = subscribe(component);

      return (
        <div class='LibrarySearch'>
          <div class='bar'>
            <InputSearch placeholder='Search...' onsubmit={search} />
          </div>
          {state.query && (
            <nav class='bar' aria-label='Search'>
              <button
                type='button'
                onclick={() => setRouteSearch(Route.Search.Label)}
                aria-label='Label'
                class={cx(state.route === Route.Search.Label && 'active')}
              >
                <Icon id='record' />
              </button>
              <button
                type='button'
                onclick={() => setRouteSearch(Route.Search.Album)}
                aria-label='Album'
                class={cx(state.route === Route.Search.Album && 'active')}
              >
                <Icon id='boxMusic' />
              </button>
              <button
                type='button'
                onclick={() => setRouteSearch(Route.Search.Song)}
                aria-label='Song'
                class={cx(state.route === Route.Search.Song && 'active')}
              >
                <Icon id='musicNote' />
              </button>
            </nav>)}
        </div>
      );
    }
  });

  return component;
};

export default LibrarySearch;
