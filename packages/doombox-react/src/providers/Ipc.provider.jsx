import { ipcRenderer } from 'electron';

import { Component } from 'react';
import { connect } from 'react-redux';
import { IPC } from '@doombox/utils';
import PropTypes from 'prop-types';

// Redux
import { setTheme } from '../redux';

class IpcProvider extends Component {
  constructor(props) {
    super(props);

    ipcRenderer.on(IPC.CHANNEL.THEME, (event, payload) => {
      props.setTheme(payload.data);
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

IpcProvider.propTypes = {
  children: PropTypes.node.isRequired,
  setTheme: PropTypes.func.isRequired
};

const mapDispatchToProps = {
  setTheme
};

export default connect(
  null,
  mapDispatchToProps
)(IpcProvider);
