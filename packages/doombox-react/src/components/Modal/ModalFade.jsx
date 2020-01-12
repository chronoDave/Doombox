import React from 'react';
import PropTypes from 'prop-types';

// Core
import {
  Backdrop,
  Modal,
  Fade
} from '@material-ui/core';

// Hook
import { useIpc } from '../../hooks';

// Utils
import { HOOK } from '../../utils/const';

// Styles
import { useModalStyle } from './Modal.style';

const ModalFade = ({ open, onClose, children }) => {
  const { palette: { backgroundOpacity } } = useIpc(HOOK.IPC.CONFIG);
  const classes = useModalStyle({ backgroundOpacity });

  return (
    <Modal
      open={open}
      onClose={onClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{ classes: { root: classes.backdrop } }}
    >
      <Fade in={open}>
        <div className={classes.root}>
          {children}
        </div>
      </Fade>
    </Modal>
  );
};

ModalFade.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired
};

export default ModalFade;
