import React, { cloneElement } from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

// Core
import { Button } from '../../components';

import DialogBase from './DialogBase';

const DialogForm = props => {
  const {
    form,
    onSubmit,
    onClose,
    ...rest
  } = props;
  const { t } = useTranslation();

  return (
    <DialogBase onClose={onClose} {...rest}>
      {cloneElement(form, {
        onSubmit,
        SubmitProps: {
          actions: (
            <Button onClick={onClose}>
              {t('action:cancel')}
            </Button>
          )
        }
      })}
    </DialogBase>
  );
};

DialogForm.propTypes = {
  form: PropTypes.element.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired
};

export default DialogForm;
