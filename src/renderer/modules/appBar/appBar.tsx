import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

import Menu from '../../components/menu/menu';
import Icon from '../../components/icon/icon';
import { setLayout } from '../../store/actions/layout.actions';
import { addFolders, rebuildLibrary } from '../../store/actions/library.actions';

import './appBar.scss';

export type AppBarProps = {};

const AppBar: Component<AppBarProps> = () => {
  const component = new forgo.Component({
    render() {
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
          <nav aria-label='app'>
            <Menu
              id='app'
              items={[{
                label: 'Settings',
                onclick: () => setLayout('settings')
              }, {
                label: 'Add folders',
                onclick: addFolders
              }, {
                label: 'Rebuild library',
                onclick: rebuildLibrary
              }]}
              popup={{ align: { x: 'start', y: 'end' } }}
            >
              <Icon id='menu' />
            </Menu>
          </nav>
          <span class="title">Doombox</span>
          <nav aria-label='app'>
            <button
              type='button'
              aria-label='minimize app'
              onclick={window.ipc.window.minimize}
            >
              <Icon id='minimize' />
            </button>
            <button
              type='button'
              aria-label='maximize app'
              onclick={window.ipc.window.maximize}
            >
              <Icon id='maximize' />
            </button>
            <button
              type='button'
              aria-label='close app'
              onclick={window.ipc.window.close}
              class="close"
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

export default AppBar;
