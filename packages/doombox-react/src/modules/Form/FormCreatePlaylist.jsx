import React from 'react';
import {
  Formik,
  Form,
  ErrorMessage
} from 'formik';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

// Core
import {
  Box,
  Button
} from '@material-ui/core';

import {
  FieldFileAvatar,
  FieldText
} from '../../components';

// Hooks
import { useAudio } from '../../hooks';

// Utils
import { HOOK } from '../../utils/const';

// Validation
import { schemaCreatePlaylist } from '../../validation/schema';

const id = 'create-playlist';

const FormCreatePlaylist = ({ children }) => {
  const { createPlaylist } = useAudio(HOOK.AUDIO.METHOD);
  const { t } = useTranslation('action');

  return (
    <Formik
      initialValues={{
        name: '',
        src: null
      }}
      validationSchema={schemaCreatePlaylist}
      onSubmit={values => createPlaylist(values)}
    >
      <Form>
        <Box display="flex" flexDirection="column" alignItems="center">
          <FieldFileAvatar id={id} name="src" />
          <FieldText id={id} name="name" />
        </Box>
        <ErrorMessage name="name" />
        <Box pb={1} pt={2} display="flex" justifyContent="flex-end">
          {children}
          <Button type="submit">
            {t('create')}
          </Button>
        </Box>
      </Form>
    </Formik>
  );
};

FormCreatePlaylist.propTypes = {
  children: PropTypes.element
};

FormCreatePlaylist.defaultProps = {
  children: null
};

export default FormCreatePlaylist;
