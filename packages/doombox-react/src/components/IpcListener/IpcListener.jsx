import { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Types
import {
  RECEIVE_USER,
  RECEIVE_USERS
} from '../../../../../utils/types/receive';

// Actions
import {
  receiveUsers,
  receiveUser
} from '../../actions/receiveActions';

const { ipcRenderer } = window.require('electron');

class IpcListener extends Component {
  constructor(props) {
    super(props);

    const {
      onReceiveUser,
      onReceiveUsers
    } = props;

    ipcRenderer.on(RECEIVE_USERS, (event, args) => onReceiveUsers(args.data));
    ipcRenderer.on(RECEIVE_USER, (event, args) => onReceiveUser(args));
  }

  render() {
    return null;
  }
}

IpcListener.propTypes = {
  onReceiveUser: PropTypes.func.isRequired,
  onReceiveUsers: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => ({
  onReceiveUser: payload => dispatch(receiveUser(payload)),
  onReceiveUsers: payload => dispatch(receiveUsers(payload))
});

export default connect(
  null,
  mapDispatchToProps
)(IpcListener);
