import { shell } from 'electron';

import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import {
  capitalize,
  normalizeKeybind,
  TYPES,
  URLS,
  MENUS
} from '@doombox/utils';
import PropTypes from 'prop-types';

// Core
import { Box, Divider } from '@material-ui/core';

import { Menu, MenuItem, ButtonBase } from '../../components';

// Actions
import {
  scanFolder,
  scanFolderNative,
  deleteLibrary,
  windowClose
} from '../../actions';

// Styles
import { useAppBarStyles } from './AppBar.styles';

const AppBarMenu = ({ keybinds, folders }) => {
  const [menu, setMenu] = useState({ id: null, anchorEl: null });
  const classes = useAppBarStyles();

  const handleClose = () => setMenu({ ...menu, id: null });

  const menus = {
    file: [
      {
        primary: MENUS.FILE.RESCAN_LIBRARY,
        secondary: keybinds.rescan,
        divider: true,
        onClick: () => {
          scanFolder(folders);
          handleClose();
        }
      }, {
        primary: MENUS.FILE.SCAN_FOLDER,
        secondary: keybinds.scanFolder,
        onClick: () => {
          scanFolderNative();
          handleClose();
        }
      }, {
        primary: MENUS.FILE.DELETE_LIBRARY,
        divider: true,
        onClick: () => {
          deleteLibrary();
          handleClose();
        }
      }, {
        primary: MENUS.FILE.EXIT,
        onClick: windowClose
      }
    ],
    help: [
      {
        primary: MENUS.HELP.OPEN_GITHUB,
        onClick: async event => {
          event.preventDefault();
          await shell.openExternal(URLS[MENUS.HELP.OPEN_GITHUB]);
          handleClose();
        }
      }, {
        primary: 'Report issue',
        onClick: async event => {
          event.preventDefault();
          await shell.openExternal(URLS[MENUS.HELP.REPORT_ISSUE]);
          handleClose();
        }
      }
    ]
  };

  return (
    <Fragment>
      <Box display="flex">
        {Object.keys(menus).map(id => (
          <ButtonBase
            key={id}
            className={classes.menuItem}
            onClick={event => setMenu({ id, anchorEl: event.currentTarget })}
            onMouseEnter={event => menu.id && setMenu({ id, anchorEl: event.currentTarget })}
            disableRipple
          >
            {capitalize(id)}
          </ButtonBase>
        ))}
      </Box>
      <Menu
        open={!!menu.id}
        anchorEl={menu.anchorEl}
        onClose={handleClose}
      >
        <Box
          display="flex"
          flexDirection="column"
          width={210}
        >
          {menu.id && menus[menu.id].map(item => (
            <Fragment>
              <MenuItem
                key={item.primary}
                primary={item.primary}
                secondary={item.secondary && normalizeKeybind(item.secondary)}
                onClick={item.onClick}
              />
              {item.divider && <Divider />}
            </Fragment>
          ))}
        </Box>
      </Menu>
    </Fragment>
  );
};

AppBarMenu.propTypes = {
  keybinds: PropTypes.shape({
    rescan: PropTypes.string.isRequired,
    scanFolder: PropTypes.string.isRequired
  }).isRequired,
  folders: PropTypes.arrayOf(PropTypes.string).isRequired
};

const mapStateToProps = state => ({
  folders: state.cache[TYPES.CACHE.FOLDERS],
  keybinds: state.config[TYPES.CONFIG.KEYBINDS]
});

export default connect(
  mapStateToProps
)(AppBarMenu);
