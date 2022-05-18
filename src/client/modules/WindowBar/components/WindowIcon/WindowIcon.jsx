import React from 'react';

// Hooks
import { useTheme } from '../../../../hooks';

// Assets
import iconDark from '../../../../assets/icons/icon_dark.png';
import iconLight from '../../../../assets/icons/icon_light.png';

// Styles
import useWindowIconStyles from './WindowIcon.styles';

const WindowIcon = () => {
  const theme = useTheme();
  const classes = useWindowIconStyles();

  return (
    <div className={classes.root}>
      <img
        src={theme.palette.dark ? iconDark : iconLight}
        alt="Doombox App icon"
      />
    </div>
  );
};

export default WindowIcon;
