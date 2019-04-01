import React from 'react';
import PropTypes from 'prop-types';

// Core
import withStyles from '@material-ui/core/styles/withStyles';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';

// Style
import DialogStyle from './DialogStyle';

// Utils
import { SELECT_PATH_DIALOG } from '../../actionTypes/databaseTypes';

// Electron
// eslint-disable-next-line no-undef
const { remote, ipcRenderer } = window.require('electron');
const mainProcess = remote.require('./electron');

const SelectPathDialog = props => {
  const { open, onClose, classes, ...rest } = props;

  ipcRenderer.on(SELECT_PATH_DIALOG, () => onClose());

  return (
    <Dialog
      aria-labelledby="select-path-dialog"
      aria-describedby="select-path-dialog-description"
      open={open}
      onClose={onClose}
      classes={{ paper: classes.paper }}
      {...rest}
    >
      <DialogTitle id="select-path-dialog">Select music folder</DialogTitle>
      <DialogContent>
        <DialogContentText id="select-path-dialog-description">
          Doombox currently only supports a single folder, so make sure all your music shares the same folder.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => onClose()}>
          Cancel
        </Button>
        <Button
          onClick={() => mainProcess.selectDirectory()}
          autoFocus
        >
          Select folder
        </Button>
      </DialogActions>
    </Dialog>
  );
};

SelectPathDialog.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  classes: PropTypes.object.isRequired
};

export default withStyles(DialogStyle)(SelectPathDialog);
