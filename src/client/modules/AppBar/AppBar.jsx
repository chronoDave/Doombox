import { shell, remote } from 'electron';

import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { capitalize, normalizeKeybind } from '@doombox-utils';
import { URLS } from '@doombox-utils/types';
import clsx from 'clsx';
import PropTypes from 'prop-types';

// Icons
import IconMaximize from '@material-ui/icons/Fullscreen';
import IconClose from '@material-ui/icons/Close';

// Core
import { Box, Hidden } from '@material-ui/core';

import {
  Menu,
  MenuItem,
  Icon,
  IconApp,
  Typography,
  ButtonWindow
} from '../../components';

// Actions
import {
  windowClose,
  windowMaximize,
  windowMinimize,
  setWindowTitle,
  scanFolder,
  scanFolderNative,
  deleteLibrary
} from '../../actions';

// Hooks
import { useHover, useTranslation } from '../../hooks';

// Validation
import { propKeybinds } from '../../validation/propTypes';

// Styles
import { useAppBarStyles } from './AppBar.styles';

const AppBar = props => {
  const {
    title,
    artist,
    album,
    keybinds,
    folders
  } = props;
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState({ id: 'file' });
  const [appTitle, setAppTitle] = useState('Doombox');

  const { t } = useTranslation();
  const { onEnter, onLeave } = useHover({
    enter: () => setOpen(true),
    leave: () => setOpen(false)
  });
  const classes = useAppBarStyles();

  const appMenu = {
    file: [{
      primary: t('action.common.rescan', { item: 'folder' }),
      secondary: keybinds.rescan,
      divider: true,
      onClick: () => scanFolder(folders)
    }, {
      primary: t('action.common.scan', { item: 'folder' }),
      secondary: keybinds.scanFolder,
      onClick: scanFolderNative
    }, {
      primary: t('action.common.delete', { item: 'library' }),
      divider: true,
      onClick: deleteLibrary
    }, {
      primary: t('action.common.exit'),
      onClick: windowClose
    }],
    help: [{
      primary: t('action.menu.display_keybinds'),
      onClick: event => {
        event.preventDefault();
        shell.openExternal(URLS.KEYBINDS);
      }
    }, {
      primary: t('action.common.open', { item: t('action.common.github') }),
      onClick: event => {
        event.preventDefault();
        shell.openExternal(URLS.REPO);
      }
    }, {
      primary: t('action.menu.report_issue'),
      divider: true,
      onClick: event => {
        event.preventDefault();
        shell.openExternal(URLS.HELP.REPORT_ISSUE);
      }
    }, {
      primary: t('action.menu.toggle_dev_tools'),
      secondary: keybinds.toggleDevTools,
      onClick: event => {
        event.preventDefault();
        const window = remote.getCurrentWindow();
        if (window.isDevToolsOpened()) {
          window.closeDevTools();
        } else {
          window.openDevTools();
        }
      }
    }]
  };

  useEffect(() => {
    if (title || artist || album) {
      const newAppTitle = `${artist || 'Unknown'} - ${title || 'Unknown'} (${album || 'Unknown'}) - Doombox`;

      setAppTitle(newAppTitle);
      setWindowTitle(newAppTitle);
    }
  }, [title, artist, album]);

  return (
    <Fragment>
      <Box display="flex" bgcolor="grey.50">
        <div className={clsx(classes.icon, classes.drag)}>
          <IconApp />
        </div>
        <Box display="flex">
          {Object.keys(appMenu).map(id => (
            <ButtonWindow
              key={id}
              onClick={event => {
                setOpen(!open);
                setMenu({ id, anchorEl: event.currentTarget });
              }}
              active={menu.id === id && open}
              onMouseEnter={event => {
                if (open) {
                  setMenu({ id, anchorEl: event.currentTarget });
                  onEnter();
                }
              }}
              onMouseLeave={onLeave}
            >
              <Typography variant="body2">
                {capitalize(id)}
              </Typography>
            </ButtonWindow>
          ))}
        </Box>
        <div className={clsx(classes.titleRoot, classes.drag)}>
          <Hidden className={classes.titleHidden} xsDown>
            <Typography noWrap variant="body2">
              {appTitle}
            </Typography>
          </Hidden>
        </div>
        <Box
          display="flex"
          flexShrink={0}
          justifyContent="flex-end"
        >
          <ButtonWindow onClick={windowMinimize}>
            <Icon type="minimize" fontSize="small" />
          </ButtonWindow>
          <ButtonWindow onClick={windowMaximize}>
            <IconMaximize fontSize="small" />
          </ButtonWindow>
          <ButtonWindow
            onClick={windowClose}
            className={classes.buttonWindowClose}
          >
            <IconClose fontSize="small" />
          </ButtonWindow>
        </Box>
      </Box>
      <Menu
        open={open}
        anchorEl={menu.anchorEl}
        onClose={() => setOpen(false)}
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
      >
        {appMenu[menu.id].map(({ primary, secondary, ...rest }) => (
          <MenuItem
            key={primary}
            primary={primary}
            secondary={secondary && normalizeKeybind(secondary)}
            {...rest}
          />
        ))}
      </Menu>
    </Fragment>
  );
};

AppBar.defaultProps = {
  title: '',
  artist: '',
  album: ''
};

AppBar.propTypes = {
  title: PropTypes.string,
  artist: PropTypes.string,
  album: PropTypes.string,
  keybinds: propKeybinds.isRequired,
  folders: PropTypes.arrayOf(PropTypes.string).isRequired
};

const mapStateToProps = state => ({
  title: state.player.metadata.title,
  artist: state.player.metadata.artist,
  album: state.player.metadata.album,
  folders: state.cache.folders,
  keybinds: state.config.keybinds
});

export default connect(
  mapStateToProps
)(AppBar);
