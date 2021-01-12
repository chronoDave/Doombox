import { remote, webFrame } from 'electron';

import { connect } from 'react-redux';
import { WINDOW, IPC } from '@doombox-utils/types';
import PropTypes from 'prop-types';

// Hooks
import { useAudio, useKeybind, useTranslation } from '../hooks';

// Actions
import { ipcInsert } from '../actions';

// Redux
import { setOverlay } from '../redux';

const KeybindProvider = props => {
  const {
    dispatchOverlay,
    keybindMuteUnmute,
    keybindNextSong,
    keybindPlayPause,
    keybindPreferences,
    keybindPreviousSong,
    keybindRescan,
    keybindScanFolder,
    children
  } = props;

  const {
    pause,
    next,
    previous,
    mute
  } = useAudio();
  const { t } = useTranslation();

  // System
  useKeybind('mod+=', () => webFrame.setZoomLevel(webFrame.getZoomLevel() + 0.5));
  useKeybind('mod+alt+=', () => webFrame.setZoomFactor(1));

  // File
  useKeybind(keybindRescan, () => null);
  useKeybind(keybindScanFolder, () => {
    const folders = remote.dialog.showOpenDialogSync(null, {
      title: t('action.common.scan', { mixins: { item: t('common.folder') } }),
      properties: ['openDirectory', 'multiSelections']
    });

    if (folders) {
      dispatchOverlay(WINDOW.OVERLAY.SCAN);
      ipcInsert(IPC.CHANNEL.LIBRARY, folders);
    }
  });

  // Playlist
  useKeybind(keybindPlayPause, pause);
  useKeybind(keybindNextSong, next);
  useKeybind(keybindPreviousSong, previous);
  useKeybind(keybindMuteUnmute, mute);

  // Preferences
  useKeybind(keybindPreferences, () => dispatchOverlay(WINDOW.OVERLAY.SETTINGS));

  return children;
};

KeybindProvider.propTypes = {
  keybindMuteUnmute: PropTypes.string.isRequired,
  keybindNextSong: PropTypes.string.isRequired,
  keybindPlayPause: PropTypes.string.isRequired,
  keybindPreferences: PropTypes.string.isRequired,
  keybindPreviousSong: PropTypes.string.isRequired,
  keybindRescan: PropTypes.string.isRequired,
  keybindScanFolder: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
};

const mapStateToProps = state => ({
  keybindMuteUnmute: state.config.keybinds.muteUnmute,
  keybindNextSong: state.config.keybinds.nextSong,
  keybindPlayPause: state.config.keybinds.playPause,
  keybindPreferences: state.config.keybinds.preferences,
  keybindPreviousSong: state.config.keybinds.previousSong,
  keybindRescan: state.config.keybinds.rescan,
  keybindScanFolder: state.config.keybinds.scanFolder
});

const mapDispatchToProps = {
  dispatchOverlay: setOverlay
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(KeybindProvider);
