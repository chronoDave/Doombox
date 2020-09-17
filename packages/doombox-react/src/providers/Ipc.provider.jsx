import { ipcRenderer } from 'electron';

import { Component } from 'react';
import { connect } from 'react-redux';
import { IPC } from '@doombox/utils';
import PropTypes from 'prop-types';

// Redux
import { setCache, setConfig } from '../redux';

class IpcProvider extends Component {
  constructor(props) {
    super(props);

    const { dispatchCache, dispatchConfig } = props;

    ipcRenderer.on(IPC.CHANNEL.CACHE, (_, { data }) => dispatchCache(data));
    ipcRenderer.on(IPC.CHANNEL.CONFIG, (_, { data }) => dispatchConfig(data));
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
  dispatchCache: PropTypes.func.isRequired,
  dispatchConfig: PropTypes.func.isRequired
};

const mapDispatchToProps = {
  dispatchCache: setCache,
  dispatchConfig: setConfig
};

export default connect(
  null,
  mapDispatchToProps
)(IpcProvider);
