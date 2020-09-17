import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { normalizeKeybind, TYPES } from '@doombox/utils';
import PropTypes from 'prop-types';

// Core
import { Divider } from '@material-ui/core';

import { MenuItem } from '../../../components';

// Actions
import {
  scanFolder,
  scanFolderNative,
  deleteLibrary,
  windowClose
} from '../../../actions';

const AppMenuFile = ({ onClose, keybinds, folders }) => (
  <Fragment>
    <MenuItem
      primary="Rescan Library"
      secondary={normalizeKeybind(keybinds.rescan)}
      onClick={() => {
        scanFolder(folders);
        onClose();
      }}
    />
    <Divider />
    <MenuItem
      primary="Scan Folder..."
      secondary={normalizeKeybind(keybinds.scanFolder)}
      onClick={() => {
        scanFolderNative();
        onClose();
      }}
    />
    <MenuItem
      primary="Delete Library"
      onClick={() => {
        deleteLibrary();
        onClose();
      }}
    />
    <Divider />
    <MenuItem primary="Exit" onClick={windowClose} />
  </Fragment>
);

AppMenuFile.propTypes = {
  onClose: PropTypes.func.isRequired,
  keybinds: PropTypes.shape({
    rescan: PropTypes.string.isRequired,
    scanFolder: PropTypes.string.isRequired
  }).isRequired,
  folders: PropTypes.arrayOf(PropTypes.string).isRequired
};

const mapStateToProps = state => ({
  folders: state.cache[TYPES.CACHE.FOLDERS],
  keybinds: state.config[TYPES.CONFIG.KEYBINDS]
});

export default connect(
  mapStateToProps
)(AppMenuFile);
