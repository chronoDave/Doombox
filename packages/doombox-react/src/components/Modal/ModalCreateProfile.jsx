import React from 'react';
import PropTypes from 'prop-types';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';

// Core
import {
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField
} from '@material-ui/core';

import { Button } from '../Button';
import {
  FieldSelectAvatar,
  FieldError
} from '../Field';

// Actions
import { createUser } from '../../actions/createActions';

// Validation
import { schemaImage } from '../../validation';

const ModalCreateProfile = props => {
  const { onCancel, onSuccess, ...rest } = props;
  const translate = useTranslation().t;

  return (
    <Dialog {...rest}>
      <DialogTitle id="dialog-create-user-title">
        {translate('title:createProfile')}
      </DialogTitle>
      <Formik
        initialValues={{ username: '', avatar: null }}
        validationSchema={Yup.object().shape({
          username: Yup.string()
            .max(30, translate('validation:max', { input: translate('username') }))
            .required(translate('validation:required', { input: translate('username') })),
          avatar: schemaImage
        })}
        onSubmit={async (values, { setSubmitting, setStatus }) => {
          createUser(values)
            .then(() => {
              setSubmitting(false);
              onSuccess();
            })
            .catch(response => {
              setStatus({ msg: response });
              return setSubmitting(false);
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
          <DialogContent>
            <Form>
              <Box display="flex" flexDirection="column" alignItems="center">
                <Box pb={2}>
                  <Field
                    name="avatar"
                    render={({ field }) => (
                      <FieldSelectAvatar
                        field={field}
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
                      label={translate('username')}
                      variant="outlined"
                      error={!!errors.username && touched.username}
                      helperText={errors.username}
                    />
                  )}
                />
              </Box>
              {(status && status.msg) && <FieldError errors={status.msg} />}
              <Box pb={1} pt={3} display="flex" justifyContent="flex-end">
                <Button BoxProps={{ p: 1 }} onClick={onCancel}>
                  {translate('cancel')}
                </Button>
                <Button
                  BoxProps={{ p: 1, pr: 0 }}
                  variant="contained"
                  color="success"
                  loading={isSubmitting}
                  type="submit"
                >
                  {translate('save')}
                </Button>
              </Box>
            </Form>
          </DialogContent>
        )}
      </Formik>
    </Dialog>
  );
};

ModalCreateProfile.propTypes = {
  onCancel: PropTypes.func.isRequired,
  onSuccess: PropTypes.func.isRequired
};

export default ModalCreateProfile;
