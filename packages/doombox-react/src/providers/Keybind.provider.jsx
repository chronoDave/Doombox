import { useEffect } from 'react';
import { connect } from 'react-redux';
import Mousetrap from 'mousetrap';
import PropTypes from 'prop-types';

// Actions
import { scanFolder, scanFolderNative } from '../actions';

// Types
import { TYPES } from '../../../doombox-types';

const KeybindProvider = ({ folders, keybinds, children }) => {
  useEffect(() => {
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
  keybinds: state.config[TYPES.CONFIG.KEYBINDS],
  folders: state.cache[TYPES.CACHE.FOLDERS]
});

export default connect(
  mapStateToProps
)(KeybindProvider);
