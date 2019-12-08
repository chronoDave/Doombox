import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

// Core
import {
  Dialog,
  DialogTitle,
  DialogContent
} from '@material-ui/core';

const DialogForm = props => {
  const {
    title,
    open,
    onClose,
    children
  } = props;
  const { t } = useTranslation();

  return (
    <Dialog
      disableBackdropClick
      open={open}
      onClose={onClose}
    >
      <DialogTitle>
        {t(title)}
      </DialogTitle>
      <DialogContent>
        {children}
      </DialogContent>
    </Dialog>
  );
};

DialogForm.propTypes = {
  title: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  children: PropTypes.element.isRequired,
  onClose: PropTypes.func.isRequired
};

export default DialogForm;
