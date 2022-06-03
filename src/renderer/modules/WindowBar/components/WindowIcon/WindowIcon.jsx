import React from 'react';

import iconDark from '../../../../assets/icons/icon_dark.png';
import iconLight from '../../../../assets/icons/icon_light.png';

import './WindowIcon.scss';

const WindowIcon = () => (
  <div className="WindowIcon">
    <img
      src={iconDark}
      alt="Doombox App icon dark"
      className="dark-only"
    />
    <img
      src={iconLight}
      alt="Doombox App icon light"
      className="light-only"
    />
  </div>
);

export default WindowIcon;
