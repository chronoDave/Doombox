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
  setPlaylist,
  setMixtape,
  addMixtape,
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

    // Library
    ipcRenderer.on(TYPE.IPC.LIBRARY, (event, payload) => {
      props.setLibrary(payload.data);
    });

    // Playlist
    ipcRenderer.on(TYPE.IPC.MIXOGRAPHY, (event, payload) => {
      props.setMixography(payload.data);
    });
    ipcRenderer.on(TYPE.IPC.MIXTAPE, (event, payload) => {
      switch (payload.data.action) {
        case ACTION.PLAYLIST.SET:
          props.setMixtape(payload.data);
          break;
        case ACTION.PLAYLIST.ADD:
          props.addMixtape(payload.data.collection);
          break;
        default:
          break;
      }
    });
    ipcRenderer.on(TYPE.IPC.PLAYLIST, (event, payload) => {
      props.setPlaylist(payload.data);
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
  setMixography: PropTypes.func.isRequired,
  setMixtape: PropTypes.func.isRequired,
  addMixtape: PropTypes.func.isRequired
};

const mapDispatchToProps = {
  setLibrary,
  setPlaylist,
  setCache,
  setConfig,
  setInterrupt,
  setMessage,
  setMixography,
  setMixtape,
  addMixtape
};

export default connect(
  null,
  mapDispatchToProps
)(IpcProvider);
