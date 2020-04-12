import React, {
  cloneElement
} from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

// Core
import { Button } from '../Button';

import DialogBase from './DialogBase';

const DialogForm = props => {
  const {
    onClose,
    form,
    ...rest
  } = props;

  const { t } = useTranslation();

  return (
    <DialogBase onClose={onClose} {...rest}>
      {cloneElement(form, {
        onSubmit: payload => {
          form.props.onSubmit(payload);
          onClose();
        },
        actions: (
          <Button onClick={onClose}>
            {t('action:cancel')}
          </Button>
        )
      })}
    </DialogBase>
  );
};

DialogForm.propTypes = {
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  form: PropTypes.node.isRequired
};

export default DialogForm;
