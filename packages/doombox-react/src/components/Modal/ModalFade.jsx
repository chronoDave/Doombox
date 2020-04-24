import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Core
import {
  Backdrop,
  Modal,
  Fade
} from '@material-ui/core';

// Styles
import { useModalStyle } from './Modal.style';

const ModalFade = props => {
  const {
    open,
    backgroundOpacity,
    children,
    onClose
  } = props;
  const classes = useModalStyle({ backgroundOpacity });

  return (
    <Modal
      open={open}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{ classes: { root: classes.backdrop } }}
      className={classes.presentation}
      onClose={onClose}
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
  children: PropTypes.element,
  backgroundOpacity: PropTypes.bool
};

ModalFade.defaultProps = {
  children: null,
  backgroundOpacity: false
};

const mapStateToProps = state => ({
  backgroundOpacity: state.config.palette.backgroundOpacity
});

export default connect(
  mapStateToProps
)(ModalFade);
