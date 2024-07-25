import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

import Icon from '@doombox/components/icon/icon';
import InputSearch from '@doombox/components/input-search/input-search';
import cx from '@doombox/renderer/css/cx';

import { search, shuffleLibrary } from '../../../state/actions/library.actions';
import { setRouteHome } from '../../../state/actions/route.actions';
import * as Route from '../../../state/route';

import subscribe from './navigation.state';

import './navigation.scss';

export type NavigationProps = {};

const Navigation: Component<NavigationProps> = () => {
  const component = new forgo.Component<NavigationProps>({
    render() {
      const route = subscribe(component);

      return (
        <nav aria-label="Library toolbar">
          <button
            type='button'
            aria-label='library'
            onclick={() => setRouteHome(Route.Home.Library)}
            class={cx('button', route === Route.Home.Library && 'active')}
          >
            <Icon id='music-box' />
          </button>
          <button
            type='button'
            aria-label='playlist'
            onclick={() => setRouteHome(Route.Home.Playlist)}
            class={cx('button', route === Route.Home.Playlist && 'active')}
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

export default Navigation;
