import { useEffect } from 'react';
import { connect } from 'react-redux';
import { TYPES } from '@doombox/utils';
import Mousetrap from 'mousetrap';

// Actions
import { scanFolder } from '../actions';

const KeybindProvider = ({ keybinds, children }) => {
  useEffect(() => {
    Mousetrap.bind(keybinds.rescan, () => console.log('ayaya'));
    Mousetrap.bind(keybinds.scanFolder, scanFolder);

    return () => {
      for (let k = Object.values(keybinds), i = 0; i < k.length; i += 1) {
        Mousetrap.unbind(k[i]);
      }
    };
  }, [keybinds]);

  return children;
};

const mapStateToProps = state => ({
  keybinds: state.ipc.config[TYPES.CONFIG.KEYBINDS]
});

export default connect(
  mapStateToProps
)(KeybindProvider);
