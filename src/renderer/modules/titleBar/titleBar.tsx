import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

import Icon from '../../components/icon/icon';
import Menu from '../../components/menu/menu';
import MenuButton from '../../components/menu/menuButton';
import { createPopup } from '../../components/popup/popup';
import clickAwayListener from '../../utils/clickAwayListener';

import './titleBar.scss';

export type TitleBarProps = {};

const TitleBar: Component<TitleBarProps> = () => {
  const menu: { id?: string, close?: () => void; } = {};

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
            <MenuButton
              id='app'
              open={menu.id === 'app'}
              onclick={event => {
                const closeMenu = () => {
                  menu.id = '';
                  menu.close?.();
                  component.update();
                };

                if (menu.id === 'app') {
                  closeMenu();
                } else {
                  menu.id = 'app';
                  menu.close = createPopup(
                    (event.currentTarget.parentElement as HTMLElement),
                    <Menu
                      id='app'
                      onclose={closeMenu}
                      items={[{
                        icon: 'settings',
                        label: 'Settings',
                        onclick: () => {}
                      }]}
                    />,
                    { align: { x: 'start', y: 'end' } }
                  );
                  clickAwayListener('.TitleBar', closeMenu);
                }

                component.update();
              }}
            >
              <Icon id='menu' />
            </MenuButton>
          </nav>
          <h1>Doombox</h1>
          <nav aria-label='window'>
            <button
              type='button'
              aria-label='minimize window'
              onclick={window.ipc.minimize}
            >
              <Icon id='minimize' />
            </button>
            <button
              type='button'
              aria-label='maximize window'
              onclick={window.ipc.maximize}
            >
              <Icon id='maximize' />
            </button>
            <button
              type='button'
              aria-label='close close'
              onclick={window.ipc.close}
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
