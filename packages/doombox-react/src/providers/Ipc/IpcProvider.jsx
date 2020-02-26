import { Component } from 'react';
import { connect } from 'react-redux';
import {
  TYPE,
  ACTION
} from '@doombox/utils';
import PropTypes from 'prop-types';

// Actions
import {
  fetchStorage,
  fetchMixography
} from '../../actions';

// Redux
import {
  setSong,
  setLabel,
  setLibraryStatus,
  setLibrary,
  addPlaylist,
  setPlaylist,
  setCache,
  setConfig,
  setInterrupt,
  setMixography,
  setMessage
} from '../../redux';

const { ipcRenderer } = window.require('electron');

class IpcProvider extends Component {
  constructor(props) {
    super(props);

    // Collection
    ipcRenderer.on(TYPE.IPC.LIBRARY, (event, payload) => {
      switch (payload.action) {
        case ACTION.AUDIO.PLAYLIST_SET:
          props.setPlaylist(payload.docs);
          break;
        case ACTION.AUDIO.PLAYLIST_ADD:
          props.addPlaylist(payload.docs);
          break;
        default:
          props.setSong(payload);
          break;
      }
    });
    ipcRenderer.on(TYPE.IPC.PLAYLIST, (event, payload) => {
      switch (payload.action) {
        case ACTION.AUDIO.PLAYLIST_SET:
          props.setPlaylist(payload.docs);
          break;
        case ACTION.AUDIO.PLAYLIST_ADD:
          props.addPlaylist(payload.docs.collection);
          break;
        default:
          props.setMixography(payload);
          break;
      }
    });

    // Storage
    ipcRenderer.on(TYPE.IPC.CONFIG, (event, { payload }) => {
      props.setConfig(payload);
    });
    ipcRenderer.on(TYPE.IPC.CACHE, (event, { payload }) => {
      props.setCache(payload);
    });

    // Event
    ipcRenderer.on(TYPE.IPC.INTERRUPT, (event, payload) => {
      props.setInterrupt(payload);
    });
    ipcRenderer.on(TYPE.IPC.MESSAGE, (event, payload) => {
      props.setMessage(payload);
    });
  }

  componentDidMount() {
    // Storage
    fetchStorage(TYPE.IPC.CONFIG);
    fetchStorage(TYPE.IPC.CACHE);

    // Mixography
    fetchMixography();
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
  children: PropTypes.element.isRequired,
  setLibraryStatus: PropTypes.func.isRequired,
  setLabel: PropTypes.func.isRequired,
  setLibrary: PropTypes.func.isRequired,
  setPlaylist: PropTypes.func.isRequired,
  setCache: PropTypes.func.isRequired,
  setConfig: PropTypes.func.isRequired,
  setInterrupt: PropTypes.func.isRequired,
  setSong: PropTypes.func.isRequired,
  setMessage: PropTypes.func.isRequired,
  addPlaylist: PropTypes.func.isRequired,
  setMixography: PropTypes.func.isRequired
};

const mapDispatchToProps = {
  setLabel,
  addPlaylist,
  setLibraryStatus,
  setSong,
  setLibrary,
  setPlaylist,
  setCache,
  setConfig,
  setInterrupt,
  setMessage,
  setMixography
};

export default connect(
  null,
  mapDispatchToProps
)(IpcProvider);
