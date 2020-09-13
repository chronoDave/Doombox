import React, {
  Fragment,
  useState
} from 'react';

// Core
import { Box } from '@material-ui/core';

import { Menu, ButtonBase } from '../../../components';

// Styles
import { useAppStyles } from '../App.styles';

import AppMenuFile from './AppMenuFile.private';
import AppMenuPlaylist from './AppMenuPlaylist.private';
import AppMenuHelp from './AppMenuHelp.private';

const AppMenu = () => {
  const [menu, setMenu] = useState(null);
  const classes = useAppStyles();

  const handleClick = (event, id) => setMenu({
    id,
    anchorEl: event.currentTarget
  });
  const handleHover = (event, id) => {
    if (menu) setMenu({ id, anchorEl: event.currentTarget });
  };

  const renderMenu = () => {
    switch (menu.id) {
      case 'file': return <AppMenuFile />;
      case 'help': return <AppMenuHelp />;
      case 'playlist': return <AppMenuPlaylist />;
      default: return null;
    }
  };

  return (
    <Fragment>
      <Box display="flex">
        <ButtonBase
          className={classes.barButtonText}
          onClick={event => handleClick(event, 'file')}
          onMouseEnter={event => handleHover(event, 'file')}
          disableRipple
        >
          File
        </ButtonBase>
        <ButtonBase
          className={classes.barButtonText}
          onClick={event => handleClick(event, 'playlist')}
          onMouseEnter={event => handleHover(event, 'playlist')}
          disableRipple
        >
          Playlist
        </ButtonBase>
        <ButtonBase
          className={classes.barButtonText}
          onClick={event => handleClick(event, 'help')}
          onMouseEnter={event => handleHover(event, 'help')}
          disableRipple
        >
          Help
        </ButtonBase>
      </Box>
      <Menu
        open={!!menu}
        anchorEl={menu ? menu.anchorEl : null}
        onClose={() => setMenu(null)}
      >
        <Box
          display="flex"
          flexDirection="column"
          width={210}
        >
          {menu ? renderMenu() : null}
        </Box>
      </Menu>
    </Fragment>
  );
};

export default AppMenu;
