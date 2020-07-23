import { Component } from 'react';
import { ipcRenderer } from 'electron';
import { connect } from 'react-redux';
import { IPC } from '@doombox/utils';
import PropTypes from 'prop-types';

// Redux
import {
  setError,
  setCache,
  setConfig,
  setTheme
} from '../redux';

class IpcProvider extends Component {
  constructor(props) {
    super(props);

    ipcRenderer.on(IPC.CHANNEL.THEME, (event, payload) => {
      if (payload.error) {
        props.setError(payload.error);
      } else {
        props.setTheme(payload.data);
      }
    });
    ipcRenderer.on(IPC.CHANNEL.CACHE, (event, payload) => {
      if (payload.error) {
        props.setError(payload.error);
      } else {
        props.setCache(payload.data);
      }
    });
    ipcRenderer.on(IPC.CHANNEL.CONFIG, (event, payload) => {
      if (payload.error) {
        props.setError(payload.error);
      } else {
        props.setConfig(payload.data);
      }
    });
  }

  componentDidMount() {
    ipcRenderer.send(IPC.CHANNEL.THEME, {
      action: IPC.ACTION.READ,
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

const mapDispatchToProps = {
  setError,
  setCache,
  setConfig,
  setTheme
};

IpcProvider.propTypes = {
  children: PropTypes.node.isRequired,
  setError: PropTypes.func.isRequired,
  setCache: PropTypes.func.isRequired,
  setConfig: PropTypes.func.isRequired,
  setTheme: PropTypes.func.isRequired
};

export default connect(
  null,
  mapDispatchToProps
)(IpcProvider);
