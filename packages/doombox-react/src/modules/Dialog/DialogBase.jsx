import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

// Core
import {
  Dialog as MuiDialog,
  DialogTitle as MuiDialogTitle,
  DialogContent as MuiDialogContent,
  DialogActions as MuiDialogActions
} from '@material-ui/core';

// Style
import { useDialogStyles } from './Dialog.style';

const DialogBase = props => {
  const {
    title,
    disableTranslation,
    actions,
    children,
    ...rest
  } = props;
  const { t } = useTranslation();
  const classes = useDialogStyles();

  return (
    <MuiDialog
      disableBackdropClick
      {...rest}
    >
      <MuiDialogTitle>
        {disableTranslation ? title : t(`title:${title}`)}
      </MuiDialogTitle>
      <MuiDialogContent>
        {children}
      </MuiDialogContent>
      {actions && (
        <MuiDialogActions classes={{ root: classes.actions }}>
          {actions}
        </MuiDialogActions>
      )}
    </MuiDialog>
  );
};

DialogBase.propTypes = {
  title: PropTypes.string.isRequired,
  disableTranslation: PropTypes.bool,
  open: PropTypes.bool.isRequired,
  children: PropTypes.element.isRequired,
  onClose: PropTypes.func.isRequired,
  actions: PropTypes.element
};

DialogBase.defaultProps = {
  disableTranslation: false,
  actions: null
};

export default DialogBase;
