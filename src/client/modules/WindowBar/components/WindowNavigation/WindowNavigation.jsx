import { shell, remote } from 'electron';
import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { URLS, WINDOW, IPC } from '@doombox-utils/types';
import PropTypes from 'prop-types';

import { cx } from '../../../../utils';
import { Popper, MenuItem, ButtonBase } from '../../../../components';
import {
  windowClose,
  ipcInsert,
  ipcDrop,
  ipcDeleteById
} from '../../../../actions';
import { useTimeoutOpen, useTranslation, useAudio } from '../../../../hooks';
import { setOverlay, populatePlaylists } from '../../../../redux';
import { propConfigKeybinds, propPlaylist } from '../../../../validation/propTypes';

import './WindowNavigation.scss';

const WindowNavigation = ({ keybinds, playlists, dispatchOverlay }) => {
  const [menu, setMenu] = useState({ id: 'file', anchorEl: null });

  const { t, getNativeKeybind } = useTranslation();
  const {
    open,
    setOpen,
    handleEnter,
    handleLeave
  } = useTimeoutOpen();
  const { set } = useAudio();

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
    playlist: playlists.map(playlist => ({
      primary: playlist.name,
      onClick: () => set(playlist),
      onContextMenu: () => ipcDeleteById(IPC.CHANNEL.PLAYLIST, playlist._id)
    })),
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
      <div className="WindowNavigation root">
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
            className={cx((menu.id === id && open) && 'active')}
          >
            {t(`common.${id}`, { transform: 'capitalize' })}
          </ButtonBase>
        ))}
      </div>
      <Popper
        open={open}
        anchorEl={menu.anchorEl}
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        placement="bottom-start"
        className="WindowNavigation"
      >
        <div className="menu">
          {items[menu.id].map(item => (
            <MenuItem
              key={item.primary}
              primary={item.primary}
              secondary={item.secondary && getNativeKeybind(item.secondary, 'pascal')}
              onClick={event => {
                setOpen(false);
                item.onClick(event);
              }}
              onContextMenu={event => {
                item.onContextMenu(event);
              }}
              divider={item.divider}
            />
          ))}
        </div>
      </Popper>
    </Fragment>
  );
};

WindowNavigation.propTypes = {
  keybinds: propConfigKeybinds.isRequired,
  playlists: PropTypes.arrayOf(propPlaylist).isRequired,
  dispatchOverlay: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  keybinds: state.config.keybinds,
  playlists: populatePlaylists(state)
});

const mapDispatchToProps = {
  dispatchOverlay: setOverlay
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WindowNavigation);
