import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

import Icon from '../../components/icon/icon';

import subscribe from './titlebar.state';

import './titleBar.scss';

export type TitleBarProps = {};

const TitleBar: Component<TitleBarProps> = () => {
  const component = new forgo.Component({
    render() {
      const current = subscribe(component);
      const title = current ?
        `${current.artist} - ${current.title} (${current.album})` :
        'Doombox';

      return (
        <header class='TitleBar'>
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
          <span class="title nowrap small">{title}</span>
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

  return component;
};

export default TitleBar;
