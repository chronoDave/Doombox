import type { ForgoNewComponentCtor as Component } from 'forgo';

import * as forgo from 'forgo';

import Icon from '../../components/icon/icon';

import './titleBar.scss';

export type TitleBarProps = {};

const TitleBar: Component<TitleBarProps> = () => new forgo.Component({
  render() {
    return (
      <header class='TitleBar'>
        <img src='icons/icon_dark.png' alt='Doombox app icon' />
        <h1>Doombox</h1>
        <nav>
          <button
            type='button'
            aria-label='minimize'
          >
            <Icon id='minimize' />
          </button>
          <button
            type='button'
            aria-label='maximize'
          >
            <Icon id='maximize' />
          </button>
          <button
            type='button'
            aria-label='close'
          >
            <Icon id='close' />
          </button>
        </nav>
      </header>
    );
  }
});

export default TitleBar;
