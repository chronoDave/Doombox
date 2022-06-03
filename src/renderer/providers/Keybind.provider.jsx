import { remote, webFrame } from 'electron';
import { connect } from 'react-redux';
import { WINDOW, IPC } from '@doombox-utils/types';
import PropTypes from 'prop-types';

import { useAudio, useKeybind, useTranslation } from '../hooks';
import { ipcInsert } from '../actions';
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
    keybindVolumeUp,
    keybindVolumeDown,
    children
  } = props;

  const {
    pause,
    next,
    previous,
    mute,
    volumeUp,
    volumeDown
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

  // Player
  useKeybind(keybindPlayPause, pause);
  useKeybind(keybindNextSong, next);
  useKeybind(keybindPreviousSong, previous);
  useKeybind(keybindMuteUnmute, mute);
  useKeybind(keybindVolumeUp, volumeUp);
  useKeybind(keybindVolumeDown, volumeDown);

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
  keybindVolumeUp: PropTypes.string.isRequired,
  keybindVolumeDown: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
};

const mapStateToProps = state => ({
  keybindMuteUnmute: state.config.keybinds.muteUnmute,
  keybindNextSong: state.config.keybinds.nextSong,
  keybindPlayPause: state.config.keybinds.playPause,
  keybindPreferences: state.config.keybinds.preferences,
  keybindPreviousSong: state.config.keybinds.previousSong,
  keybindRescan: state.config.keybinds.rescan,
  keybindScanFolder: state.config.keybinds.scanFolder,
  keybindVolumeUp: state.config.keybinds.volumeUp,
  keybindVolumeDown: state.config.keybinds.volumeDown
});

const mapDispatchToProps = {
  dispatchOverlay: setOverlay
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(KeybindProvider);
