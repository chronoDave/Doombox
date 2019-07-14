import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

// Core
import {
  Dialog,
  DialogTitle,
  DialogContent,
} from '@material-ui/core';

import { FormCreateProfile } from '../Form';

const DialogCreateProfile = ({ onCancel, ...rest }) => {
  const { t } = useTranslation();

  return (
    <Dialog {...rest}>
      <DialogTitle id="dialog-create-user-title">
        {t('title:createProfile')}
      </DialogTitle>
      <DialogContent>
        <FormCreateProfile onCancel={onCancel} />
      </DialogContent>
    </Dialog>
  );
};

DialogCreateProfile.propTypes = {
  onCancel: PropTypes.func.isRequired
};

export default DialogCreateProfile;
