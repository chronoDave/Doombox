import React, { cloneElement } from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

// Core
import { Button } from '@material-ui/core';

import DialogBase from './DialogBase';

const DialogForm = props => {
  const {
    form,
    open,
    onClose,
    title,
    ...rest
  } = props;
  const { t } = useTranslation();

  return (
    <DialogBase
      open={open}
      onClose={onClose}
      title={title}
      {...rest}
    >
      {cloneElement(form, {
        actions: <Button onClick={onClose}>{t('action:cancel')}</Button>
      })}
    </DialogBase>
  );
};

DialogForm.propTypes = {
  form: PropTypes.element.isRequired,
  title: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
};

export default DialogForm;
