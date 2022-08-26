import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

import Menu from '../menu/menu';
import Icon from '../../components/icon/icon';

import './titleBar.scss';

export type TitleBarProps = {};

const TitleBar: Component<TitleBarProps> = () => {
  const component = new forgo.Component({
    render() {
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
          <nav aria-label='app'>
            <Menu
              id='app'
              items={[{
                label: 'Settings',
                onclick: () => {}
              }]}
              popup={{ align: { x: 'start', y: 'end' } }}
            >
              <Icon id='menu' />
            </Menu>
          </nav>
          <h1>Doombox</h1>
          <nav aria-label='window'>
            <button
              type='button'
              aria-label='minimize window'
              onclick={window.ipc.window.minimize}
            >
              <Icon id='minimize' />
            </button>
            <button
              type='button'
              aria-label='maximize window'
              onclick={window.ipc.window.maximize}
            >
              <Icon id='maximize' />
            </button>
            <button
              type='button'
              aria-label='close close'
              onclick={window.ipc.window.close}
            >
              <Icon id='close' />
            </button>
          </nav>
        </header>
      );
    }
  });

  return component;
};

export default TitleBar;
