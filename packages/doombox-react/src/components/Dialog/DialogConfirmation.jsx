import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

// Core
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText
} from '@material-ui/core';

import { Button } from '../Button';

const DialogConfirmation = props => {
  const {
    title,
    description,
    onCancel,
    children,
    ...rest
  } = props;
  const { t } = useTranslation();

  return (
    <Dialog
      disableBackdropClick
      {...rest}
    >
      <DialogTitle id="dialog-confirmation-title">
        {t(title)}
      </DialogTitle>
      <DialogContent>
        <DialogContentText
          id="dialog-confirmation-description"
          color="textPrimary"
        >
          {t(description)}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel}>
          {t('cancel')}
        </Button>
        {children}
      </DialogActions>
    </Dialog>
  );
};

DialogConfirmation.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  onCancel: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired
};

export default DialogConfirmation;
