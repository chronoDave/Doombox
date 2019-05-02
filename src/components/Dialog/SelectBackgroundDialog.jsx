import React, { Component } from 'react';
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
import { SELECT_BACKGROUND_DIALOG } from '../../actionTypes/databaseTypes';

// Electron
// eslint-disable-next-line no-undef
const { remote, ipcRenderer } = window.require('electron');
const mainProcess = remote.require('./electron');

class SelectBackgroundDialog extends Component {
  constructor(props) {
    super(props);

    const { onClose } = props;

    ipcRenderer.on(SELECT_BACKGROUND_DIALOG, () => onClose());
  }

  render() {
    const { open, onClose, classes, ...rest } = this.props;

    return (
      <Dialog
        aria-labelledby="select-background-dialog"
        aria-describedby="select-background-dialog-description"
        open={open}
        onClose={onClose}
        classes={{ paper: classes.paper }}
        {...rest}
      >
        <DialogTitle id="select-background-dialog">Select background image</DialogTitle>
        <DialogContent>
          <DialogContentText id="select-background-dialog-description">
            Sets the background image
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => onClose()}>
            Cancel
          </Button>
          <Button
            onClick={() => mainProcess.selectFile()}
            autoFocus
          >
            Select background
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

SelectBackgroundDialog.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  classes: PropTypes.object.isRequired
};

export default withStyles(DialogStyle)(SelectBackgroundDialog);
