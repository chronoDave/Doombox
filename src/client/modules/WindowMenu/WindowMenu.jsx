import { shell, remote } from 'electron';

import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { URLS, WINDOWS } from '@doombox-utils/types';
import { cx } from 'emotion';
import PropTypes from 'prop-types';

// Core
import {
  Popper,
  MenuItem,
  Typography,
  ButtonBase
} from '../../components';

// Actions
import {
  windowClose,
  scanFolder,
  scanFolderNative,
  deleteLibrary
} from '../../actions';

// Hooks
import { useTimeoutOpen, useTranslation } from '../../hooks';

// Redux
import { setOverlay } from '../../redux';

// Validation
import { propKeybinds } from '../../validation/propTypes';

// Styles
import useWindowMenuStyles from './WindowMenu.styles';

const WindowMenu = ({ keybinds, folders, dispatchOverlay }) => {
  const [menu, setMenu] = useState({ id: 'file', anchorEl: null });

  const { t, getNativeKeybind } = useTranslation();
  const {
    open,
    setOpen,
    handleEnter,
    handleLeave
  } = useTimeoutOpen();
  const classes = useWindowMenuStyles();

  const items = {
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

  return (
    <Fragment>
      <div className={classes.root}>
        {Object.keys(items).map(id => (
          <ButtonBase
            key={id}
            onClick={event => {
              setOpen(!open);
              setMenu({ id, anchorEl: event.currentTarget });
            }}
            onMouseEnter={event => {
              if (open) {
                setMenu({ id, anchorEl: event.currentTarget });
                handleEnter();
              }
            }}
            onMouseLeave={handleLeave}
            className={cx(classes.button, {
              [classes.active]: menu.id === id && open
            })}
          >
            <Typography color="inherit">
              {t(`common.${id}`, { transform: 'capitalize' })}
            </Typography>
          </ButtonBase>
        ))}
      </div>
      <Popper
        open={open}
        anchorEl={menu.anchorEl}
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        placement="bottom-start"
      >
        {items[menu.id].map(item => (
          <MenuItem
            key={item.primary}
            primary={item.primary}
            secondary={item.secondary && getNativeKeybind(item.secondary, 'pascal')}
            onClick={event => {
              setOpen(false);
              item.onClick(event);
            }}
            divider={item.divider}
          />
        ))}
      </Popper>
    </Fragment>
  );
};

WindowMenu.propTypes = {
  keybinds: propKeybinds.isRequired,
  dispatchOverlay: PropTypes.func.isRequired,
  folders: PropTypes.arrayOf(PropTypes.string).isRequired,
};

const mapStateToProps = state => ({
  folders: state.cache.folders,
  keybinds: state.config.keybinds
});

const mapDispatchToProps = {
  dispatchOverlay: setOverlay
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WindowMenu);
