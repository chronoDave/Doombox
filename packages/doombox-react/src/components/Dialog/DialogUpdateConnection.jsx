import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

// Core
import {
  Dialog,
  DialogTitle,
  DialogContent,
} from '@material-ui/core';

import { FormUpdateConnection } from '../Form';

const DialogUpdateConnection = ({ onCancel, address, ...rest }) => {
  const { t } = useTranslation();

  return (
    <Dialog {...rest}>
      <DialogTitle id="dialog-update-connection-title">
        {t('title:updateConnection')}
      </DialogTitle>
      <DialogContent>
        <FormUpdateConnection
          onCancel={onCancel}
          address={address}
        />
      </DialogContent>
    </Dialog>
  );
};

DialogUpdateConnection.propTypes = {
  onCancel: PropTypes.func.isRequired,
  address: PropTypes.string.isRequired
};

export default DialogUpdateConnection;
