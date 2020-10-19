import { ipcRenderer } from 'electron';

import { Component } from 'react';
import { connect } from 'react-redux';
import { IPC } from '@doombox-utils/types';
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
  setSongs,
  setView
} from '../redux';

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
      dispatchSongs,
      dispatchRoute
    } = props;

    ipcRenderer.on(IPC.CHANNEL.ROUTE, (event, { data }) => dispatchRoute(data));

    ipcRenderer.on(IPC.CHANNEL.IMAGE, (event, { data }) => dispatchImages(data));
    ipcRenderer.on(IPC.CHANNEL.LABEL, (event, { data }) => dispatchLabels(data));
    ipcRenderer.on(IPC.CHANNEL.ALBUM, (event, { data }) => dispatchAlbums(data));
    ipcRenderer.on(IPC.CHANNEL.LIBRARY, (event, { data }) => dispatchSongs(data));

    ipcRenderer.on(IPC.CHANNEL.KEYBIND, (event, action) => {
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

    // Config
    ipcRenderer.once(IPC.CHANNEL.CACHE, (event, { data }) => dispatchCache(data));
    ipcRenderer.once(IPC.CHANNEL.CONFIG, (event, { data }) => dispatchConfig(data));
  }

  componentDidMount() {
    ipcFind(IPC.CHANNEL.CONFIG, null);
    ipcFind(IPC.CHANNEL.CACHE, null);
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
  dispatchSongs: PropTypes.func.isRequired,
  dispatchRoute: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  folders: state.cache.folders
});

const mapDispatchToProps = {
  dispatchCache: setCache,
  dispatchConfig: setConfig,
  dispatchImages: setImages,
  dispatchLabels: setLabels,
  dispatchAlbums: setAlbums,
  dispatchSongs: setSongs,
  dispatchRoute: setView
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(IpcProvider);
