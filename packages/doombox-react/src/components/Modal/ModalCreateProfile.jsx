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

const ModalCreateProfile = props => {
  const {
    onCancel,
    onSuccess,
    ...rest
  } = props;
  const { t } = useTranslation();

  return (
    <Dialog {...rest}>
      <DialogTitle id="dialog-create-user-title">
        {t('title:createProfile')}
      </DialogTitle>
      <DialogContent>
        <FormCreateProfile
          onSuccess={onSuccess}
          onCancel={onCancel}
        />
      </DialogContent>
    </Dialog>
  );
};

ModalCreateProfile.propTypes = {
  onCancel: PropTypes.func.isRequired,
  onSuccess: PropTypes.func.isRequired
};

export default ModalCreateProfile;
