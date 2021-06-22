import React from 'react';

import useClasses from './Window.styles';

export interface WindowProps {
  children: React.ReactNode
}

export const Window = () => {
  const classes = useClasses();

  return (
    <div className={classes.root}>
      <div className={classes.logo}>Logo</div>
      <div className={classes.title}>Title</div>
      <div className={classes.buttons}>Buttons</div>
    </div>
  );
};
