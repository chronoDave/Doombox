import React from 'react';
import { connect } from 'react-redux';

// Actions
import { fetchUsers } from '../../actions/fetchActions';

const { ipcRenderer } = window.require('electron');

const App = props => {
  const { getUsers } = props;

  return (
    <div>
      <button onClick={getUsers}>Click me</button>
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  getUsers: () => dispatch(fetchUsers())
});

export default connect(
  null,
  mapDispatchToProps
)(App);
