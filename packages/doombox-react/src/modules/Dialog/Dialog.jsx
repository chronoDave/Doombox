import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

// Core
import {
  Dialog as MuiDialog,
  DialogTitle as MuiDialogTitle,
  DialogContent as MuiDialogContent
} from '@material-ui/core';

const Dialog = props => {
  const {
    title,
    open,
    onClose,
    children
  } = props;
  const { t } = useTranslation();

  return (
    <MuiDialog
      disableBackdropClick
      open={open}
      onClose={onClose}
    >
      <MuiDialogTitle>
        {t(title)}
      </MuiDialogTitle>
      <MuiDialogContent>
        {children}
      </MuiDialogContent>
    </MuiDialog>
  );
};

Dialog.propTypes = {
  title: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  children: PropTypes.element.isRequired,
  onClose: PropTypes.func.isRequired
};

export default Dialog;
