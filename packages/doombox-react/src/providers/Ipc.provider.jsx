import { ipcRenderer } from 'electron';

import { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Actions
import {
  ipcFind,
  scanFolder,
  scanFolderNative,
  deleteLibrary
} from '../actions';

// Redux
import {
  setCache,
  setConfig,
  setImages,
  setAlbums,
  setLabels,
  setSongs
} from '../redux';

// Types
import { IPC, TYPES } from '../../../doombox-types';

class IpcProvider extends Component {
  constructor(props) {
    super(props);

    const {
      folders,
      dispatchCache,
      dispatchConfig,
      dispatchImages,
      dispatchLabels,
      dispatchAlbums,
      dispatchSongs
    } = props;

    ipcRenderer.on(IPC.CHANNEL.CACHE, (_, { data }) => dispatchCache(data));
    ipcRenderer.on(IPC.CHANNEL.CONFIG, (_, { data }) => dispatchConfig(data));

    ipcRenderer.on(IPC.CHANNEL.IMAGE, (_, { data }) => dispatchImages(data));
    ipcRenderer.on(IPC.CHANNEL.LABEL, (_, { data }) => dispatchLabels(data));
    ipcRenderer.on(IPC.CHANNEL.ALBUM, (_, { data }) => dispatchAlbums(data));
    ipcRenderer.on(IPC.CHANNEL.LIBRARY, (_, { data }) => dispatchSongs(data));

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
    ipcFind(IPC.CHANNEL.CONFIG, null);
    ipcFind(IPC.CHANNEL.CACHE, null);
    ipcFind(IPC.CHANNEL.IMAGE);
    ipcFind(IPC.CHANNEL.LABEL);
    ipcFind(IPC.CHANNEL.ALBUM);
    ipcFind(IPC.CHANNEL.LIBRARY);
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
  dispatchConfig: PropTypes.func.isRequired,
  dispatchImages: PropTypes.func.isRequired,
  dispatchLabels: PropTypes.func.isRequired,
  dispatchAlbums: PropTypes.func.isRequired,
  dispatchSongs: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  folders: state.cache[TYPES.CACHE.FOLDERS]
});

const mapDispatchToProps = {
  dispatchCache: setCache,
  dispatchConfig: setConfig,
  dispatchImages: setImages,
  dispatchLabels: setLabels,
  dispatchAlbums: setAlbums,
  dispatchSongs: setSongs
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(IpcProvider);
