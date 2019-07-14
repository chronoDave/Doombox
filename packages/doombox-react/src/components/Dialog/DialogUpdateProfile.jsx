import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

// Core
import {
  Dialog,
  DialogTitle,
  DialogContent,
} from '@material-ui/core';

import { FormUpdateProfile } from '../Form';

const DialogUpdateProfile = ({ initialValues, onCancel, ...rest }) => {
  const { t } = useTranslation();

  return (
    <Dialog {...rest}>
      <DialogTitle id="dialog-create-user-title">
        {t('title:updateProfile')}
      </DialogTitle>
      <DialogContent>
        <FormUpdateProfile
          onCancel={onCancel}
          initialValues={initialValues}
        />
      </DialogContent>
    </Dialog>
  );
};

DialogUpdateProfile.propTypes = {
  initialValues: PropTypes.object.isRequired,
  onCancel: PropTypes.func.isRequired
};

export default DialogUpdateProfile;
