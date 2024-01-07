import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

import { setRouteSearch } from '../../../actions/route.actions';
import Icon from '../../../components/icon/icon';
import * as Route from '../../../types/route';
import cx from '../../../utils/cx/cx';

import subscribe from './librarySearchNav.state';

import './librarySearchNav.scss';

export type LibrarySearchNavProps = {};

const LibrarySearchNav: Component<LibrarySearchNavProps> = () => {
  const component = new forgo.Component<LibrarySearchNavProps>({
    render() {
      const route = subscribe(component);

      return (
        <nav class='LibrarySearchNav' aria-label='Search panels'>
          <button
            type='button'
            onclick={() => setRouteSearch(Route.Search.Song)}
            aria-label='Song'
            class={cx(route === Route.Search.Song && 'active')}
          >
            <Icon id='music-note' />
          </button>
          <button
            type='button'
            onclick={() => setRouteSearch(Route.Search.Album)}
            aria-label='Album'
            class={cx(route === Route.Search.Album && 'active')}
          >
            <Icon id='music-box' />
          </button>
          <button
            type='button'
            onclick={() => setRouteSearch(Route.Search.Label)}
            aria-label='Label'
            class={cx(route === Route.Search.Label && 'active')}
          >
            <Icon id='record-circle' />
          </button>
        </nav>
      );
    }
  });

  return component;
};

export default LibrarySearchNav;
