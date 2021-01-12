import { ipcRenderer } from 'electron';

import { Component } from 'react';
import { connect } from 'react-redux';
import { IPC } from '@doombox-utils/types';
import PropTypes from 'prop-types';

// Actions
import { ipcFind } from '../actions';

// Redux
import {
  setCache,
  setConfig,
  setImages,
  setAlbums,
  setLabels,
  setSongs,
  setLibrary,
  setOverlay
} from '../redux';

class IpcProvider extends Component {
  constructor(props) {
    super(props);

    const {
      dispatchLibrary,
      dispatchCache,
      dispatchConfig,
      dispatchImages,
      dispatchLabels,
      dispatchAlbums,
      dispatchSongs,
      dispatchOverlay
    } = props;

    ipcRenderer.on(IPC.CHANNEL.WINDOW, (event, data) => dispatchOverlay(data));
    ipcRenderer.on(IPC.CHANNEL.IMAGE, (event, data) => dispatchImages(data));
    ipcRenderer.on(IPC.CHANNEL.SONG, (event, data) => dispatchSongs(data));
    ipcRenderer.on(IPC.CHANNEL.ALBUM, (event, data) => dispatchAlbums(data));
    ipcRenderer.on(IPC.CHANNEL.LABEL, (event, data) => dispatchLabels(data));
    ipcRenderer.on(IPC.CHANNEL.LIBRARY, (event, data) => {
      dispatchLibrary(data);
      dispatchOverlay(null);
    });
    ipcRenderer.on(IPC.CHANNEL.CACHE, (event, data) => dispatchCache(data));
    ipcRenderer.on(IPC.CHANNEL.CONFIG, (event, data) => dispatchConfig(data));
  }

  componentDidMount() {
    ipcFind(IPC.CHANNEL.CONFIG);
    ipcFind(IPC.CHANNEL.CACHE);
    ipcFind(IPC.CHANNEL.IMAGE, {}, { projection: ['_id', 'files'] });
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
  dispatchCache: PropTypes.func.isRequired,
  dispatchConfig: PropTypes.func.isRequired,
  dispatchImages: PropTypes.func.isRequired,
  dispatchLabels: PropTypes.func.isRequired,
  dispatchAlbums: PropTypes.func.isRequired,
  dispatchSongs: PropTypes.func.isRequired,
  dispatchLibrary: PropTypes.func.isRequired,
  dispatchOverlay: PropTypes.func.isRequired
};

const mapDispatchToProps = {
  dispatchCache: setCache,
  dispatchConfig: setConfig,
  dispatchImages: setImages,
  dispatchLabels: setLabels,
  dispatchAlbums: setAlbums,
  dispatchSongs: setSongs,
  dispatchLibrary: setLibrary,
  dispatchOverlay: setOverlay
};

export default connect(
  null,
  mapDispatchToProps
)(IpcProvider);
