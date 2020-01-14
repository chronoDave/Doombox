import React, { cloneElement } from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

// Core
import {
  Box,
  Button
} from '@material-ui/core';

import DialogBase from './DialogBase';

const DialogForm = props => {
  const {
    form,
    open,
    onClose,
    title
  } = props;
  const { t } = useTranslation();

  return (
    <DialogBase
      open={open}
      onClose={onClose}
      title={title}
    >
      {cloneElement(form, {}, (
        <Box pb={1} pt={2} display="flex" justifyContent="flex-end">
          <Button onClick={onClose}>
            {t('action:cancel')}
          </Button>
          <Button
            type="submit"
            onClick={onClose}
          >
            {t('create')}
          </Button>
        </Box>
      ))}
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
