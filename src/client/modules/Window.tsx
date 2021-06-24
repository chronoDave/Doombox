import React from 'react';

import { Icon } from '../components/Icon';

import { getTheme } from '../theme';

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
      <button type="button">
        <Icon id="minimize" />
      </button>
      <button type="button">
        <Icon id="maximize" />
      </button>
      <button type="button">
        <Icon id="close" />
      </button>
    </div>
  </div>
);
