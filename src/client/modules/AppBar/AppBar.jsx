import { shell, remote } from 'electron';

import React, { Fragment, useState, useEffect } from 'react';
import { cx } from 'emotion';
import { connect } from 'react-redux';
import { capitalize, normalizeKeybind } from '@doombox-utils';
import { URLS } from '@doombox-utils/types';
import PropTypes from 'prop-types';

// Core
import {
  Menu,
  MenuItem,
  Icon,
  IconApp,
  Typography,
  ButtonBase,
  Hidden
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
import useAppBarStyles from './AppBar.styles';

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
  const classes = useAppBarStyles();
  const { onEnter, onLeave } = useHover({
    enter: () => setOpen(true),
    leave: () => setOpen(false)
  });

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
      primary: t('action.common.open', { item: t('common.github') }),
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
      <div className={classes.root}>
        <div className={classes.icon}>
          <IconApp />
        </div>
        <div className={classes.menu}>
          {Object.keys(appMenu).map(id => (
            <ButtonBase
              key={id}
              onClick={event => {
                setOpen(!open);
                setMenu({ id, anchorEl: event.currentTarget });
              }}
              onMouseEnter={event => {
                if (open) {
                  setMenu({ id, anchorEl: event.currentTarget });
                  onEnter();
                }
              }}
              onMouseLeave={onLeave}
              className={cx(classes.menuButton, {
                [classes.menuButtonActive]: menu.id === id && open
              })}
            >
              <Typography color="inherit">
                {capitalize(id)}
              </Typography>
            </ButtonBase>
          ))}
        </div>
        <div className={classes.title}>
          <Hidden mdDown>
            <Typography noWrap>
              {appTitle}
            </Typography>
          </Hidden>
        </div>
        <div className={classes.buttons}>
          <ButtonBase className={classes.menuButton} onClick={windowMinimize}>
            <Icon type="minimize" small />
          </ButtonBase>
          <ButtonBase className={classes.menuButton} onClick={windowMaximize}>
            <Icon type="maximize" small />
          </ButtonBase>
          <ButtonBase
            className={cx(classes.menuButton, classes.menuButtonClose)}
            onClick={windowMinimize}
          >
            <Icon type="close" small />
          </ButtonBase>
        </div>
      </div>
      <Menu
        open={open}
        anchorEl={menu.anchorEl}
        onClose={() => setOpen(false)}
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
        placement="auto-end"
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
