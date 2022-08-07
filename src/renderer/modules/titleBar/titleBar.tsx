import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

import Icon from '../../components/icon/icon';

import './titleBar.scss';

export type TitleBarProps = {};

const TitleBar: Component<TitleBarProps> = () => {
  const query = window.matchMedia('(prefers-color-scheme: dark)');
  let variant: 'light' | 'dark' = query.matches ? 'light' : 'dark';

  const component = new forgo.Component({
    render() {
      return (
        <header class='TitleBar'>
          <img src={`icons/icon_${variant}.png`} alt='Doombox app icon' />
          <h1>Doombox</h1>
          <nav>
            <button
              type='button'
              aria-label='minimize'
              onclick={window.ipc.minimize}
            >
              <Icon id='minimize' />
            </button>
            <button
              type='button'
              aria-label='maximize'
              onclick={window.ipc.maximize}
            >
              <Icon id='maximize' />
            </button>
            <button
              type='button'
              aria-label='close'
              onclick={window.ipc.close}
            >
              <Icon id='close' />
            </button>
          </nav>
        </header>
      );
    }
  });

  const handleQuery = (mql: MediaQueryList | MediaQueryListEvent) => {
    variant = mql.matches ? 'light' : 'dark';
    component.update();
  };

  component.mount(() => {
    query.addEventListener('change', handleQuery, { passive: true });
  });

  component.unmount(() => {
    query.removeEventListener('change', handleQuery);
  });

  return component;
};

export default TitleBar;
