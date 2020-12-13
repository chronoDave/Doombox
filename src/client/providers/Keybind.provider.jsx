import { webFrame } from 'electron';

import { connect } from 'react-redux';
import { WINDOWS } from '@doombox-utils/types';
import PropTypes from 'prop-types';

// Hooks
import { useAudio, useKeybind } from '../hooks';

// Actions
import { scanFolder, scanFolderNative } from '../actions';

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
    folders,
    children
  } = props;

  const {
    pause,
    next,
    previous,
    mute
  } = useAudio();

  // System
  useKeybind('mod+=', () => webFrame.setZoomLevel(webFrame.getZoomLevel() + 0.5));
  useKeybind('mod+alt+=', () => webFrame.setZoomFactor(1));

  // File
  useKeybind(keybindRescan, () => scanFolder(folders));
  useKeybind(keybindScanFolder, scanFolderNative);

  // Playlist
  useKeybind(keybindPlayPause, pause);
  useKeybind(keybindNextSong, next);
  useKeybind(keybindPreviousSong, previous);
  useKeybind(keybindMuteUnmute, mute);

  // Preferences
  useKeybind(keybindPreferences, () => dispatchOverlay(WINDOWS.OVERLAY.SETTINGS));

  return children;
};

KeybindProvider.propTypes = {
  folders: PropTypes.arrayOf(PropTypes.string).isRequired,
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
  keybindScanFolder: state.config.keybinds.scanFolder,
  folders: state.cache.folders
});

const mapDispatchToProps = {
  dispatchOverlay: setOverlay
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(KeybindProvider);
