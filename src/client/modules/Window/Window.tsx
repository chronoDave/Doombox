import React from 'react';
import { useDispatch } from 'react-redux';

import { Hidden } from '../../components';

import { themeActions } from '../../redux';

// import classes from './Window.styles';

export interface WindowProps {
  children: React.ReactNode
}

export const Window = ({ children }: WindowProps) => {
  const dispatch = useDispatch();

  return (
    <div>
      <Hidden on={['min-width', 'sm']}>
        <div>Eee</div>
      </Hidden>
      <button onClick={() => dispatch(themeActions.setDark(true))}>A</button>
      {children}
    </div>
  );
};
