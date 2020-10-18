import React from 'react';

// Core
import { useTheme } from '@material-ui/core';

// Assets
import iconDark from '../../assets/icons/icon_dark.png';
import iconLight from '../../assets/icons/icon_light.png';

const IconApp = props => {
  const theme = useTheme();

  return (
    <img
      {...props}
      src={theme.palette.type === 'dark' ? iconDark : iconLight}
      alt="Doombox App icon"
    />
  );
};

export default IconApp;
