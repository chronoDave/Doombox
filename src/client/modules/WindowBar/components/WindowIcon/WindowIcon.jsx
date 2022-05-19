import React from 'react';

// Hooks
import { useTheme } from '../../../../hooks';

// Assets
import iconDark from '../../../../assets/icons/icon_dark.png';
import iconLight from '../../../../assets/icons/icon_light.png';

import './WindowIcon.scss';

const WindowIcon = () => {
  const theme = useTheme();

  return (
    <div className="WindowIcon">
      <img
        src={theme.palette.dark ? iconDark : iconLight}
        alt="Doombox App icon"
      />
    </div>
  );
};

export default WindowIcon;
