import { shell, remote } from 'electron';

import React, { Fragment, useState, useEffect } from 'react';
import { cx } from 'emotion';
import { connect } from 'react-redux';
import { URLS, WINDOWS } from '@doombox-utils/types';
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

// Redux
import { setOverlay } from '../../redux';

// Validation
import { propKeybinds } from '../../validation/propTypes';

// Styles
import useAppBarStyles from './AppBar.styles';

const AppBar = props => {
  const {
    title,
    titlelocalized,
    artist,
    artistlocalized,
    album,
    albumlocalized,
    keybinds,
    dispatchOverlay,
    folders,
    className
  } = props;
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState({ id: 'file' });
  const [appTitle, setAppTitle] = useState('Doombox');

  const { t, getLocalizedTag, getNativeKeybind } = useTranslation();
  const classes = useAppBarStyles();
  const { onEnter, onLeave } = useHover({
    enter: () => setOpen(true),
    leave: () => setOpen(false)
  });

  const appMenu = {
    file: [{
      primary: t(
        'action.common.rescan',
        { mixins: { item: t('common.folder') }, transform: 'pascal' }
      ),
      secondary: keybinds.rescan,
      divider: true,
      onClick: () => scanFolder(folders)
    }, {
      primary: t(
        'action.common.scan',
        { mixins: { item: t('common.folder') }, transform: 'pascal' }
      ),
      secondary: keybinds.scanFolder,
      onClick: scanFolderNative
    }, {
      primary: t(
        'action.common.delete',
        { mixins: { item: t('common.library') }, transform: 'pascal' }
      ),
      divider: true,
      onClick: deleteLibrary
    }, {
      primary: t('common.preferences', { transform: 'pascal' }),
      secondary: keybinds.preferences,
      onClick: () => dispatchOverlay(WINDOWS.OVERLAY.SETTINGS),
      divider: true
    }, {
      primary: t('action.common.exit', { transform: 'pascal' }),
      onClick: windowClose
    }],
    help: [{
      primary: t('action.menu.display_keybinds', { transform: 'pascal' }),
      onClick: event => {
        event.preventDefault();
        shell.openExternal(URLS.KEYBINDS);
      }
    }, {
      primary: t(
        'action.common.open',
        { mixins: { item: t('common.github') }, transform: 'pascal' }
      ),
      onClick: event => {
        event.preventDefault();
        shell.openExternal(URLS.REPO);
      }
    }, {
      primary: t('action.menu.report_issue', { transform: 'pascal' }),
      divider: true,
      onClick: event => {
        event.preventDefault();
        shell.openExternal(URLS.HELP.REPORT_ISSUE);
      }
    }, {
      primary: t('action.menu.toggle_dev_tools', { transform: 'pascal' }),
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
    if (artist || title || album) {
      const localizedArtist = getLocalizedTag({ artistlocalized, artist }, 'artist') || 'Unknown';
      const localizedTitle = getLocalizedTag({ titlelocalized, title }, 'title') || 'Unknown';
      const localizedAlbum = getLocalizedTag({ albumlocalized, album }, 'album') || 'Unknown';

      const newAppTitle = `${localizedArtist} - ${localizedTitle} (${localizedAlbum})`;

      setAppTitle(newAppTitle);
      setWindowTitle(newAppTitle);
    }
  }, [album, albumlocalized, artist, artistlocalized, getLocalizedTag, title, titlelocalized]);

  return (
    <Fragment>
      <div className={cx(classes.root, className)}>
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
                {t(`common.${id}`, { transform: 'capitalize' })}
              </Typography>
            </ButtonBase>
          ))}
        </div>
        <div className={classes.title}>
          <Hidden on={({ create }) => create('maxWidth', 'sm')}>
            <Typography noWrap align="center">
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
            onClick={windowClose}
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
        placement="bottom-start"
      >
        {appMenu[menu.id].map(({ primary, secondary, ...rest }) => (
          <MenuItem
            key={primary}
            primary={primary}
            secondary={secondary && getNativeKeybind(secondary, 'pascal')}
            {...rest}
          />
        ))}
      </Menu>
    </Fragment>
  );
};

AppBar.defaultProps = {
  title: null,
  titlelocalized: null,
  artist: null,
  artistlocalized: null,
  album: null,
  albumlocalized: null,
  className: '',
  folders: []
};

AppBar.propTypes = {
  title: PropTypes.string,
  titlelocalized: PropTypes.string,
  artist: PropTypes.string,
  artistlocalized: PropTypes.string,
  album: PropTypes.string,
  albumlocalized: PropTypes.string,
  keybinds: propKeybinds.isRequired,
  dispatchOverlay: PropTypes.func.isRequired,
  folders: PropTypes.arrayOf(PropTypes.string),
  className: PropTypes.string
};

const mapStateToProps = state => ({
  title: state.player.metadata.title,
  titlelocalized: state.player.metadata.titlelocalized,
  artist: state.player.metadata.artist,
  artistlocalized: state.player.metadata.artistlocalized,
  album: state.player.metadata.album,
  albumlocalized: state.player.metadata.albumlocalized,
  folders: state.cache.folders,
  keybinds: state.config.keybinds
});

const mapDispatchToProps = {
  dispatchOverlay: setOverlay
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppBar);
