import React from 'react';

// Hooks
import { useTheme } from '../../hooks';

// Assets
import iconDark from '../../assets/icons/icon_dark.png';
import iconLight from '../../assets/icons/icon_light.png';

const IconApp = props => {
  const theme = useTheme();

  return (
    <img
      {...props}
      src={theme.palette.dark ? iconDark : iconLight}
      alt="Doombox App icon"
    />
  );
};

export default IconApp;
