import { webFrame } from 'electron';

import { useEffect } from 'react';
import { connect } from 'react-redux';
import Mousetrap from 'mousetrap';
import PropTypes from 'prop-types';

// Actions
import { scanFolder, scanFolderNative } from '../actions';

const KeybindProvider = ({ folders, keybinds, children }) => {
  useEffect(() => {
    // Global
    Mousetrap.bind('mod+=', () => webFrame.setZoomLevel(webFrame.getZoomLevel() + 0.5));
    Mousetrap.bind('mod+alt+=', () => webFrame.setZoomFactor(1));

    // Config
    Mousetrap.bind(keybinds.rescan, () => scanFolder(folders));
    Mousetrap.bind(keybinds.scanFolder, scanFolderNative);

    return () => {
      for (let k = Object.values(keybinds), i = 0; i < k.length; i += 1) {
        Mousetrap.unbind(k[i]);
      }
    };
  }, [keybinds, folders]);

  return children;
};

KeybindProvider.propTypes = {
  folders: PropTypes.arrayOf(PropTypes.string).isRequired,
  keybinds: PropTypes.shape({
    rescan: PropTypes.string.isRequired,
    scanFolder: PropTypes.string.isRequired
  }),
  children: PropTypes.node.isRequired
};

const mapStateToProps = state => ({
  keybinds: state.config.keybinds,
  folders: state.cache.folders
});

export default connect(
  mapStateToProps
)(KeybindProvider);