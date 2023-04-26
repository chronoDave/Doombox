import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

import Icon from '../../components/icon/icon';
import { getCurrent } from '../../selectors/player.selectors';
import store from '../../state/store';
import createSubscription from '../../utils/subscribe';

import './appHeader.scss';

export type AppBarProps = {};

const AppBar: Component<AppBarProps> = () => {
  const subscribe = createSubscription(store);
  const component = new forgo.Component({
    render() {
      const current = getCurrent(store)();
      const title = current ?
        `${current.artist} - ${current.title} (${current.album})` :
        'Doombox';

      return (
        <header>
          <img
            class='light'
            src="icons/icon_dark.png"
            alt='Doombox app icon'
          />
          <img
            class='dark'
            src="icons/icon_light.png"
            alt='Doombox app icon'
          />
          <span class="title">{title}</span>
          <nav aria-label='window'>
            <ul>
              <li>
                <button
                  type='button'
                  aria-label='minimize app'
                  onclick={window.ipc.window.minimize}
                >
                  <Icon id='minimize' />
                </button>
              </li>
              <li>
                <button
                  type='button'
                  aria-label='maximize app'
                  onclick={window.ipc.window.maximize}
                >
                  <Icon id='maximize' />
                </button>
              </li>
              <li>
                <button
                  type='button'
                  class='close'
                  aria-label='close app'
                  onclick={window.ipc.window.close}
                >
                  <Icon id='close' />
                </button>
              </li>
            </ul>
          </nav>
        </header>
      );
    }
  });

  return subscribe((prev, cur) => (
    prev.player.current.id !== cur.player.current.id
  ))(component);
};

export default AppBar;
