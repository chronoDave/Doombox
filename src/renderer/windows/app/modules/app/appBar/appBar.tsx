import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

import Icon from '@doombox/components/icon/icon';

import subscribe from './appBar.state';

import './appBar.scss';

export type AppBarProps = {};

const AppBar: Component<AppBarProps> = () => {
  const component = new forgo.Component({
    render() {
      const current = subscribe(component);
      const title = current ?
        `${current.artist} - ${current.title} (${current.album})` :
        'Doombox';

      return (
        <header class='AppBar'>
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
          <span class="title nowrap">{title}</span>
          <nav aria-label='window'>
            <button
              type='button'
              aria-label='minimize app'
              onclick={window.ipc.window.minimize}
              class='button'
            >
              <Icon id='window-minimize' />
            </button>
            <button
              type='button'
              aria-label='maximize app'
              onclick={window.ipc.window.maximize}
              class='button'
            >
              <Icon id='window-maximize' />
            </button>
            <button
              type='button'
              class='button close'
              aria-label='close app'
              onclick={window.ipc.window.close}
            >
              <Icon id='window-close' />
            </button>
          </nav>
        </header>
      );
    }
  });

  return component;
};

export default AppBar;
