import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

import Icon from '../icon/icon';

import './window.scss';

export type WindowProps = {
  title: string
};

const Window: Component<WindowProps> = () => {
  const component = new forgo.Component<WindowProps>({
    render(props) {
      return [
        <header>
          <img
            class='light-only'
            src="../icons/icon_dark.png"
            alt='Doombox app icon'
          />
          <img
            class='dark-only'
            src="../icons/icon_light.png"
            alt='Doombox app icon'
          />
          <span class="title nowrap">{props.title}</span>
          <nav aria-label='window'>
            <button
              type='button'
              aria-label='minimize'
              onclick={() => window.ipc.window.minimize()}
              class='button'
            >
              <Icon id='window-minimize' />
            </button>
            <button
              type='button'
              aria-label='maximize'
              onclick={() => window.ipc.window.maximize()}
              class='button'
            >
              <Icon id='window-maximize' />
            </button>
            <button
              type='button'
              class='button close'
              aria-label='close'
              onclick={() => window.ipc.window.close()}
            >
              <Icon id='window-close' />
            </button>
          </nav>
        </header>,
        props.children
      ];
    }
  });

  return component;
};

export default Window;
