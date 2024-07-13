import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

import Icon from '@doombox/components/icon/icon';
import InputSearch from '@doombox/components/input-search/input-search';
import cx from '@doombox/renderer/css/cx';

import { search, shuffleLibrary } from '../../../actions/library.actions';
import { setRouteHome } from '../../../actions/route.actions';
import * as Route from '../../../types/route';

import subscribe from './homeToolbar.state';

import './homeToolbar.scss';

export type HomeToolbarProps = {};

const HomeToolbar: Component<HomeToolbarProps> = () => {
  const component = new forgo.Component<HomeToolbarProps>({
    render() {
      const state = subscribe('HomeToolbar', component);

      return (
        <nav
          aria-label="Library toolbar"
          class='HomeToolbar'
        >
          <button
            type='button'
            aria-label='library'
            onclick={() => setRouteHome(Route.Home.Library)}
            class={cx('button', state.route.home === Route.Home.Library && 'active')}
          >
            <Icon id='music-box' />
          </button>
          <button
            type='button'
            aria-label='playlist'
            onclick={() => setRouteHome(Route.Home.Playlist)}
            class={cx('button', state.route.home === Route.Home.Playlist && 'active')}
          >
            <Icon id='playlist-music' />
          </button>
          <InputSearch onsubmit={search} />
          <button class='button' type='button' onclick={shuffleLibrary}>
            <Icon id='shuffle-variant' />
          </button>
          <button class='button' type='button' onclick={() => window.ipc.router.settings()} aria-label='Open settings'>
            <Icon id='cog' />
          </button>
        </nav>
      );
    }
  });

  return component;
};

export default HomeToolbar;
