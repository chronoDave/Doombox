import React from 'react';

import { Hidden } from '../../components';

import './Window.scss';

export interface WindowProps {
  children: React.ReactNode
}

export const Window: React.FC = ({ children }) => (
  <div className="Window">
    <Hidden on={{ query: 'min-width', value: 'sm' }}>
      <div>Eee</div>
    </Hidden>
    {children}
  </div>
);
