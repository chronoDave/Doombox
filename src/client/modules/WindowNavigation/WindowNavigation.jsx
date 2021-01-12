import { shell, remote } from 'electron';

import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { URLS, WINDOW, IPC } from '@doombox-utils/types';
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
import { windowClose, ipcInsert, ipcDrop } from '../../actions';

// Hooks
import { useTimeoutOpen, useTranslation } from '../../hooks';

// Redux
import { setOverlay } from '../../redux';

// Validation
import { propConfigKeybinds } from '../../validation/propTypes';

// Styles
import useWindowNavigationStyles from './WindowNavigation.styles';

const WindowNavigation = ({ keybinds, dispatchOverlay }) => {
  const [menu, setMenu] = useState({ id: 'file', anchorEl: null });

  const { t, getNativeKeybind } = useTranslation();
  const {
    open,
    setOpen,
    handleEnter,
    handleLeave
  } = useTimeoutOpen();
  const classes = useWindowNavigationStyles();

  const items = {
    file: [{
      primary: t(
        'action.common.rescan',
        { mixins: { item: t('common.folder') }, transform: 'pascal' }
      ),
      secondary: keybinds.rescan,
      divider: true,
      onClick: () => null
    }, {
      primary: t(
        'action.common.scan',
        { mixins: { item: t('common.folder') }, transform: 'pascal' }
      ),
      secondary: keybinds.scanFolder,
      onClick: () => {
        const folders = remote.dialog.showOpenDialogSync(null, {
          title: t('action.common.scan', { mixins: { item: t('common.folder') } }),
          properties: ['openDirectory', 'multiSelections']
        });

        if (folders) {
          dispatchOverlay(WINDOW.OVERLAY.SCAN);
          ipcInsert(IPC.CHANNEL.LIBRARY, folders);
        }
      }
    }, {
      primary: t(
        'action.common.delete',
        { mixins: { item: t('common.library') }, transform: 'pascal' }
      ),
      divider: true,
      onClick: () => ipcDrop(IPC.CHANNEL.LIBRARY)
    }, {
      primary: t('common.preferences', { transform: 'pascal' }),
      secondary: keybinds.preferences,
      onClick: () => dispatchOverlay(WINDOW.OVERLAY.SETTINGS),
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

WindowNavigation.propTypes = {
  keybinds: propConfigKeybinds.isRequired,
  dispatchOverlay: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  keybinds: state.config.keybinds
});

const mapDispatchToProps = {
  dispatchOverlay: setOverlay
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WindowNavigation);
