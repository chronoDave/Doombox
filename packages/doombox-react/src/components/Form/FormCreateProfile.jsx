import React from 'react';
import { Formik, Form, Field } from 'formik';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

// Core
import {
  Box,
  TextField
} from '@material-ui/core';

import { Button } from '../Button';
import {
  FieldFileAvatar,
  FieldError
} from '../Field';

// Actions
import { createUser } from '../../actions/createActions';

// Validation
import { SchemaCreateProfile } from '../../validation';

const FormCreateProfile = props => {
  const {
    onSuccess,
    onCancel
  } = props;
  const { t } = useTranslation();

  return (
    <Formik
      initialValues={{ username: '', avatar: null }}
      validationSchema={SchemaCreateProfile}
      onSubmit={async (values, { setSubmitting, setStatus }) => {
        createUser(values)
          .then(() => {
            setSubmitting(false);
            onSuccess();
          })
          .catch(response => {
            setStatus({ msg: response });
            setSubmitting(false);
          });
      }}
    >
      {({
        errors,
        status,
        touched,
        values,
        isSubmitting,
        setFieldValue
      }) => (
        <Form>
          <Box display="flex" flexDirection="column" alignItems="center">
            <Box pb={2}>
              <Field
                name="avatar"
                render={({ field: { name } }) => (
                  <FieldFileAvatar
                    name={name}
                    setValue={setFieldValue}
                    path={values.avatar ? values.avatar.path : null}
                  />
                )}
              />
            </Box>
            <Field
              name="username"
              render={({ field }) => (
                <TextField
                  {...field}
                  id="create-profile-username"
                  label={t('username')}
                  variant="outlined"
                  fullWidth
                  error={!!errors.username && touched.username}
                  helperText={t(errors.username, { input: t('username') })}
                />
              )}
            />
          </Box>
          {(status && status.msg) && <FieldError mt={2} errors={status.msg} />}
          <Box pb={1} pt={3} display="flex" justifyContent="flex-end">
            <Button BoxProps={{ p: 1 }} onClick={onCancel}>
              {t('cancel')}
            </Button>
            <Button
              BoxProps={{ p: 1, pr: 0 }}
              variant="contained"
              color="success"
              loading={isSubmitting}
              type="submit"
            >
              {t('save')}
            </Button>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

FormCreateProfile.propTypes = {
  onSuccess: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired
};

export default FormCreateProfile;
