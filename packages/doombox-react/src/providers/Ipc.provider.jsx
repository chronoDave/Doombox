import { ipcRenderer } from 'electron';

import { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Actions
import {
  scanFolder,
  scanFolderNative,
  deleteLibrary
} from '../actions';

// Redux
import { setCache, setConfig } from '../redux';

// Types
import { IPC, TYPES } from '../../../doombox-types';

class IpcProvider extends Component {
  constructor(props) {
    super(props);

    const { folders, dispatchCache, dispatchConfig } = props;

    ipcRenderer.on(IPC.CHANNEL.CACHE, (_, { data }) => dispatchCache(data));
    ipcRenderer.on(IPC.CHANNEL.CONFIG, (_, { data }) => dispatchConfig(data));

    ipcRenderer.on(IPC.CHANNEL.KEYBIND, (_, action) => {
      switch (action) {
        case IPC.ACTION.MENU.RESCAN:
          scanFolder(folders);
          break;
        case IPC.ACTION.MENU.SCAN_FOLDER:
          scanFolderNative();
          break;
        case IPC.ACTION.MENU.DELETE_LIBRARY:
          deleteLibrary();
          break;
        default:
          console.error(`Unhandeled keybind action: ${action}`);
      }
    });
  }

  componentDidMount() {
    ipcRenderer.send(IPC.CHANNEL.CONFIG, {
      action: IPC.ACTION.FIND,
      data: { query: null }
    });

    ipcRenderer.send(IPC.CHANNEL.CACHE, {
      action: IPC.ACTION.FIND,
      data: { query: null }
    });
  }

  componentWillUnmount() {
    ipcRenderer.removeAllListeners();
  }

  render() {
    const { children } = this.props;

    return children;
  }
}

IpcProvider.propTypes = {
  children: PropTypes.node.isRequired,
  folders: PropTypes.arrayOf(PropTypes.string).isRequired,
  dispatchCache: PropTypes.func.isRequired,
  dispatchConfig: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  folders: state.cache[TYPES.CACHE.FOLDERS]
});

const mapDispatchToProps = {
  dispatchCache: setCache,
  dispatchConfig: setConfig
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(IpcProvider);
