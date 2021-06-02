import React from 'react';
import { useDispatch } from 'react-redux';

import { Hidden } from '../../components';

import { themeActions } from '../../redux';

import withClasses from './Window.styles';

export interface WindowProps {
  children: React.ReactNode
}

export const Window = ({ children }: WindowProps) => {
  const dispatch = useDispatch();
  const classes = withClasses();

  return (
    <div className={classes.root}>
      <Hidden on={['min-width', 'sm']}>
        <div>Eee</div>
      </Hidden>
      <button onClick={() => dispatch(themeActions.setDark(true))}>A</button>
      {children}
    </div>
  );
};
