import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

import { createPlaylist } from '../../../actions/playlist.actions';
import { setQueue } from '../../../actions/queue.actions';
import { setRouteHome, setRouteSettings } from '../../../actions/route.actions';
import Icon from '../../../components/icon/icon';
import * as Route from '../../../types/route';
import cx from '../../../utils/cx/cx';

import subscribe from './homeNavigation.state';

import './homeNavigation.scss';

export type HomeNavigationProps = {};

const HomeNavigation: Component<HomeNavigationProps> = () => {
  const component = new forgo.Component<HomeNavigationProps>({
    render() {
      const state = subscribe(component);

      return (
        <div class='HomeNavigation'>
          <nav aria-label='home'>
            <ul>
              <li>
                <button
                  type='button'
                  aria-label='library'
                  onclick={() => setRouteHome(Route.Home.Library)}
                  class={cx(!state.route.settings && state.route.home === Route.Home.Library && 'active')}
                >
                  <Icon id='boxMusic' />
                </button>
              </li>
              <li>
                <button
                  type='button'
                  aria-label='playlist'
                  onclick={() => setRouteHome(Route.Home.Playlist)}
                  class={cx(!state.route.settings && state.route.home === Route.Home.Playlist && 'active')}
                >
                  <Icon id='listMusic' />
                </button>
              </li>
              {state.playlists.map(playlist => (
                <li key={playlist._id}>
                  <button
                    type='button'
                    aria-label={`play ${playlist.title}`}
                    onclick={() => setQueue(playlist.songs)}
                    class='playlist'
                  >
                    {playlist.image ? (
                      <img class='icon' src={playlist.image} width={32} height={32} alt='' />
                    ) : (
                      <span class='icon'>{playlist.title[0]}</span>
                    )}
                  </button>
                </li>
              ))}
              <li>
                <button
                  type='button'
                  aria-label='create playlist'
                  onclick={() => createPlaylist()}
                >
                  <Icon id='listAdd' />
                </button>
              </li>
              <li>
                <button
                  type='button'
                  aria-label='settings'
                  onclick={() => setRouteSettings(Route.Settings.Library)}
                  class={cx(state.route.settings && 'active')}
                >
                  <Icon id='cog' />
                </button>
              </li>
            </ul>
          </nav>
        </div>
      );
    }
  });

  return component;
};

export default HomeNavigation;
