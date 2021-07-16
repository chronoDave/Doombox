import React from 'react';

import { Button } from '../components/Button';
import { Icon } from '../components/Icon';

import { getTheme } from '../theme';
import fetch from '../ipc';

export interface WindowProps {
  children: React.ReactNode
}

export const Window = () => (
  <div className="Window">
    <div className="icon">
      <img
        src={`../icons/icon_${getTheme('--dark') ? 'dark' : 'light'}.png`}
        alt="Doombox icon"
        width={32}
        height={32}
      />
    </div>
    <div className="title">
      <p className="body">Doombox</p>
    </div>
    <div className="buttons">
      <Button title="Minimize" onClick={() => fetch('WINDOW', { action: 'MINIMIZE' })}>
        <Icon id="minimize" small />
      </Button>
      <Button title="Maximize" onClick={() => null}>
        <Icon id="maximize" small />
      </Button>
      <Button title="Close" onClick={() => null}>
        <Icon id="close" small />
      </Button>
    </div>
  </div>
);
