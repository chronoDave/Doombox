import React from 'react';
import clsx from 'clsx';

// Core
import { useTheme } from '@material-ui/core';

// Assets
import iconDark from '../../../../assets/icon_dark.png';
import iconLight from '../../../../assets/icon_light.png';

// Styles
import { useAppStyles } from '../App.styles';

const AppIcon = () => {
  const theme = useTheme();
  const classes = useAppStyles();

  return (
    <div className={clsx(classes.barIcon, classes.drag)}>
      <img
        src={theme.palette.type === 'dark' ? iconDark : iconLight}
        alt="Doombox icon"
      />
    </div>
  );
};

export default AppIcon;
