import React from 'react';

import { Hidden } from '../../components';

export interface WindowProps {
  children: React.ReactNode
}

export const Window: React.FC = ({ children }) => (
  <div className="Window">
    <Hidden on={['min-width', 'sm']}>
      <div>Eee</div>
    </Hidden>
    {children}
  </div>
);
