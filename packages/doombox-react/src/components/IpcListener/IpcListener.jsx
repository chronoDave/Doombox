import { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Types
import {
  RECEIVE_USERS
} from '../../../../../utils/types/receive';

// Actions
import { receiveUsers } from '../../actions/receiveActions';

const { ipcRenderer } = window.require('electron');

class IpcListener extends Component {
  constructor(props) {
    super(props);

    const {
      onReceiveUsers
    } = props;

    ipcRenderer.on(RECEIVE_USERS, (event, args) => onReceiveUsers(args.data));
  }

  render() {
    return null;
  }
}

IpcListener.propTypes = {
  onReceiveUsers: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => ({
  onReceiveUsers: payload => dispatch(receiveUsers(payload))
});

export default connect(
  null,
  mapDispatchToProps
)(IpcListener);
