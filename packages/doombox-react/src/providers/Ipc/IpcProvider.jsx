import { Component } from 'react';
import { connect } from 'react-redux';
import {
  TYPE,
  ACTION
} from '@doombox/utils';
import PropTypes from 'prop-types';

// Actions
import {
  fetchConfig,
  fetchCache,
  fetchMixography
} from '../../actions';

// Redux
import {
  setLibrary,
  addPlaylist,
  setPlaylist,
  setCache,
  setConfig,
  setInterrupt,
  setMixography,
  setMessage,
  setFavorites
} from '../../redux';

const { ipcRenderer } = window.require('electron');

class IpcProvider extends Component {
  constructor(props) {
    super(props);

    // Library
    ipcRenderer.on(TYPE.IPC.LIBRARY, (event, payload) => {
      switch (payload.action) {
        case ACTION.PLAYLIST.ADD:
          props.addPlaylist(payload.data);
          break;
        case ACTION.PLAYLIST.SET:
          props.setPlaylist(payload.data);
          break;
        default:
          props.setLibrary(payload.data);
          break;
      }
    });

    // Playlist
    ipcRenderer.on(TYPE.IPC.PLAYLIST, (event, payload) => {
      switch (payload.action) {
        case ACTION.PLAYLIST.ADD:
          props.addPlaylist(payload.data);
          break;
        case ACTION.PLAYLIST.SET:
          props.setPlaylist(payload.data);
          break;
        case ACTION.CRUD.READ_ONE:
          props.setPlaylist(payload.data);
          break;
        default:
          // This will break on readOne() without action
          props.setMixography(payload.data);
          break;
      }
    });

    // Favorites
    ipcRenderer.on(TYPE.IPC.FAVORITES, (event, payload) => {
      props.setFavorites(payload.data);
    });

    // Storage
    ipcRenderer.on(TYPE.IPC.CONFIG, (event, payload) => {
      props.setConfig(payload.data);
    });
    ipcRenderer.on(TYPE.IPC.CACHE, (event, payload) => {
      props.setCache(payload.data);
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
    fetchConfig();
    fetchCache();

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
  setPlaylist: PropTypes.func.isRequired,
  setCache: PropTypes.func.isRequired,
  setConfig: PropTypes.func.isRequired,
  setInterrupt: PropTypes.func.isRequired,
  setLibrary: PropTypes.func.isRequired,
  setMessage: PropTypes.func.isRequired,
  addPlaylist: PropTypes.func.isRequired,
  setMixography: PropTypes.func.isRequired,
  setFavorites: PropTypes.func.isRequired
};

const mapDispatchToProps = {
  addPlaylist,
  setLibrary,
  setPlaylist,
  setCache,
  setConfig,
  setInterrupt,
  setMessage,
  setMixography,
  setFavorites
};

export default connect(
  null,
  mapDispatchToProps
)(IpcProvider);
