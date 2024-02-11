import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

import { search, shuffleLibrary } from '../../../actions/library.actions';
import { setRouteApp, setRouteHome } from '../../../actions/route.actions';
import Icon from '../../../components/icon/icon';
import InputSearch from '../../../components/inputSearch/inputSearch';
import * as Route from '../../../types/route';
import cx from '../../../utils/cx/cx';

import subscribe from './homeToolbar.state';

import './homeToolbar.scss';

export type HomeToolbarProps = {};

const HomeToolbar: Component<HomeToolbarProps> = () => {
  const component = new forgo.Component<HomeToolbarProps>({
    render() {
      const state = subscribe(component);

      return (
        <nav
          aria-label="Library toolbar"
          class='HomeToolbar'
        >
          <button
            type='button'
            aria-label='library'
            onclick={() => setRouteHome(Route.Home.Library)}
            class={cx(state.route.home === Route.Home.Library && 'active')}
          >
            <Icon id='music-box' />
          </button>
          <button
            type='button'
            aria-label='playlist'
            onclick={() => setRouteHome(Route.Home.Playlist)}
            class={cx(state.route.home === Route.Home.Playlist && 'active')}
          >
            <Icon id='playlist-music' />
          </button>
          <InputSearch onsubmit={search} />
          <button type='button' onclick={shuffleLibrary}>
            <Icon id='shuffle-variant' />
          </button>
          <button
            type='button'
            aria-label='settings'
            onclick={() => setRouteApp(Route.App.Settings)}
            class={cx(state.route.settings && 'active')}
          >
            <Icon id='cog' />
          </button>
        </nav>
      );
    }
  });

  return component;
};

export default HomeToolbar;
