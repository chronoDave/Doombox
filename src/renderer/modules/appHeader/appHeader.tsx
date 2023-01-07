import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

import Icon from '../../components/icon/icon';
import Menu from '../../components/menu/menu';
import { setLayout } from '../../store/actions/layout.actions';
import { addFolders, rebuildLibrary } from '../../store/actions/library.actions';

import './appHeader.scss';

export type AppBarProps = {};

const AppBar: Component<AppBarProps> = () => {
  const component = new forgo.Component({
    render() {
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
          <Menu
            id='app actions'
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
          <span class="title">Doombox</span>
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

export default AppBar;
