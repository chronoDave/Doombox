import { ipcRenderer } from 'electron';

import { Component } from 'react';
import { connect } from 'react-redux';
import { IPC } from '@doombox/utils';
import PropTypes from 'prop-types';

// Redux
import {
  setCache,
  setConfig,
  setTheme
} from '../redux';

class IpcProvider extends Component {
  constructor(props) {
    super(props);

    ipcRenderer.on(IPC.CHANNEL.THEME, (event, payload) => {
      props.setTheme(payload.data);
    });

    ipcRenderer.on(IPC.CHANNEL.CACHE, (event, payload) => {
      props.setCache(payload.data);
    });

    ipcRenderer.on(IPC.CHANNEL.CONFIG, (event, payload) => {
      props.setConfig(payload.data);
    });
  }

  componentDidMount() {
    ipcRenderer.send(IPC.CHANNEL.THEME, {
      action: IPC.ACTION.FIND,
      data: { query: null }
    });

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
  setTheme: PropTypes.func.isRequired,
  setCache: PropTypes.func.isRequired,
  setConfig: PropTypes.func.isRequired
};

const mapDispatchToProps = {
  setTheme,
  setCache,
  setConfig
};

export default connect(
  null,
  mapDispatchToProps
)(IpcProvider);
