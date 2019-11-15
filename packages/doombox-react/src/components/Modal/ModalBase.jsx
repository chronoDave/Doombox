import React from 'react';
import PropTypes from 'prop-types';

// Icon
import IconClose from '@material-ui/icons/Close';

// Core
import {
  Backdrop,
  Box,
  IconButton,
  Modal,
  Fade
} from '@material-ui/core';

// Style
import { useModalStyle } from './Modal.style';

const ModalBase = props => {
  const {
    open,
    onClose,
    children,
    disableButton,
    maxWidth,
    ...rest
  } = props;
  const classes = useModalStyle();

  return (
    <Modal
      open={open}
      onClose={onClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      {...rest}
    >
      <Fade in={open}>
        <div className={classes.root}>
          <Box
            maxWidth={maxWidth}
            display="flex"
            flexGrow={1}
            pt={1}
          >
            {children}
            {!disableButton && (
              <IconButton
                onClick={onClose}
                classes={{ root: classes.iconButton }}
              >
                <IconClose />
              </IconButton>
            )}
          </Box>
        </div>
      </Fade>
    </Modal>
  );
};

ModalBase.propTypes = {
  open: PropTypes.bool.isRequired,
  disableButton: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  maxWidth: PropTypes.number
};

ModalBase.defaultProps = {
  disableButton: false,
  maxWidth: 1280
};

export default ModalBase;
