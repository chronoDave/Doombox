import { shell, remote } from 'electron';

import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Utils
import { capitalize, normalizeKeybind } from '@doombox-utils';
import { URLS } from '@doombox-utils/types';

// Core
import { Box, Divider } from '@material-ui/core';

import { Menu, MenuItem, ButtonBase } from '../../components';

// Hooks
import { useTranslation } from '../../hooks';

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

  const { t } = useTranslation();
  const classes = useAppBarStyles();

  const handleClose = () => setMenu({ ...menu, id: null });

  const menus = {
    file: [
      {
        primary: 'action.menu.rescan_folder',
        secondary: keybinds.rescan,
        divider: true,
        onClick: () => {
          scanFolder(folders);
          handleClose();
        }
      }, {
        primary: 'action.menu.scan_folder',
        secondary: keybinds.scanFolder,
        onClick: () => {
          scanFolderNative();
          handleClose();
        }
      }, {
        primary: 'action.menu.delete_library',
        divider: true,
        onClick: () => {
          deleteLibrary();
          handleClose();
        }
      }, {
        primary: 'action.menu.exit',
        onClick: windowClose
      }
    ],
    help: [
      {
        primary: 'action.menu.display_keybinds',
        onClick: event => {
          event.preventDefault();
          shell.openExternal(URLS.KEYBINDS);
          handleClose();
        }
      }, {
        primary: 'action.menu.open_github',
        onClick: event => {
          event.preventDefault();
          shell.openExternal(URLS.REPO);
          handleClose();
        }
      }, {
        primary: 'action.menu.report_issue',
        divider: true,
        onClick: event => {
          event.preventDefault();
          shell.openExternal(URLS.HELP.REPORT_ISSUE);
          handleClose();
        }
      }, {
        primary: 'action.menu.toggle_dev_tools',
        secondary: keybinds.toggleDevTools,
        onClick: event => {
          event.preventDefault();
          const window = remote.getCurrentWindow();

          if (window.isDevToolsOpened()) {
            window.closeDevTools();
          } else {
            window.openDevTools();
          }

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
        {menu.id && menus[menu.id].map(item => (
          <Fragment key={item.primary}>
            <MenuItem
              primary={t(item.primary)}
              secondary={item.secondary && normalizeKeybind(item.secondary)}
              onClick={item.onClick}
            />
            {item.divider && <Divider />}
          </Fragment>
        ))}
      </Menu>
    </Fragment>
  );
};

AppBarMenu.propTypes = {
  keybinds: PropTypes.shape({
    rescan: PropTypes.string.isRequired,
    scanFolder: PropTypes.string.isRequired,
    toggleDevTools: PropTypes.string.isRequired
  }).isRequired,
  folders: PropTypes.arrayOf(PropTypes.string).isRequired
};

const mapStateToProps = state => ({
  folders: state.cache.folders,
  keybinds: state.config.keybinds
});

export default connect(
  mapStateToProps
)(AppBarMenu);
