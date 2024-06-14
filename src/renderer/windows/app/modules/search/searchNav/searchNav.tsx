import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

import Icon from '@doombox/components/icon/icon';
import cx from '@doombox/renderer/css/cx';

import { setRouteSearch } from '../../../actions/route.actions';
import * as Route from '../../../types/route';

import subscribe from './searchNav.state';

import './searchNav.scss';

export type SearchNavProps = {};

const SearchNav: Component<SearchNavProps> = () => {
  const component = new forgo.Component<SearchNavProps>({
    render() {
      const route = subscribe('SearchNav', component);

      return (
        <nav class='SearchNav' aria-label='Search panels'>
          <button
            type='button'
            onclick={() => setRouteSearch(Route.Search.Song)}
            aria-label='Song'
            class={cx('button', route === Route.Search.Song && 'active')}
          >
            <Icon id='music-note' />
            <span>Songs</span>
          </button>
          <button
            type='button'
            onclick={() => setRouteSearch(Route.Search.Album)}
            aria-label='Album'
            class={cx('button', route === Route.Search.Album && 'active')}
          >
            <Icon id='music-box' />
            <span>Albums</span>
          </button>
          <button
            type='button'
            onclick={() => setRouteSearch(Route.Search.Label)}
            aria-label='Label'
            class={cx('button', route === Route.Search.Label && 'active')}
          >
            <Icon id='record-circle' />
            <span>Labels</span>
          </button>
        </nav>
      );
    }
  });

  return component;
};

export default SearchNav;
