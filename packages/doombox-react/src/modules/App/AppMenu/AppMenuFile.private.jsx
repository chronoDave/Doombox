import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { normalizeKeybind, TYPES } from '@doombox/utils';
import PropTypes from 'prop-types';

// Core
import { Divider } from '@material-ui/core';

import { MenuItem } from '../../../components';

// Actions
import { windowClose } from '../../../actions';

const AppMenuFile = ({ keybinds }) => (
  <Fragment>
    <MenuItem
      primary="Rescan Library"
      secondary={normalizeKeybind(keybinds.rescan)}
      onClick={windowClose}
    />
    <Divider />
    <MenuItem
      primary="Scan Folder..."
      secondary={normalizeKeybind(keybinds.scanFolder)}
      onClick={windowClose}
    />
    <MenuItem
      primary="Delete Library"
      onClick={windowClose}
    />
    <Divider />
    <MenuItem primary="Exit" onClick={windowClose} />
  </Fragment>
);

AppMenuFile.propTypes = {
  keybinds: PropTypes.shape({
    rescan: PropTypes.string.isRequired,
    scanFolder: PropTypes.string.isRequired
  }).isRequired
};

const mapStateToProps = state => ({
  keybinds: state.ipc.config[TYPES.CONFIG.KEYBINDS]
});

export default connect(
  mapStateToProps
)(AppMenuFile);
