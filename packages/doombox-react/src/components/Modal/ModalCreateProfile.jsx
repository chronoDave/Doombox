import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

// Core
import {
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField
} from '@material-ui/core';

import { Button } from '../Button';
import { FieldSelectAvatar } from '../Field';

// Actions
import { createImage, createUser } from '../../actions/createActions';

// Validation
import { schemaImage } from '../../validation';

const ModalCreateProfile = props => {
  const {
    classes,
    onCancel,
    onSuccess,
    ...rest
  } = props;

  return (
    <Dialog {...rest}>
      <DialogTitle id="dialog-create-user-title">
        Create Profile
      </DialogTitle>
      <Formik
        initialValues={{
          username: '',
          avatar: null
        }}
        validationSchema={Yup.object().shape({
          username: Yup.string()
            .max(30, 'Username too long')
            .required('Username is required'),
          avatar: schemaImage
        })}
        onSubmit={async (values, { setSubmitting }) => {
          createUser({
            ...values,
            avatar: values.avatar ? ({
              lastModified: values.avatar.lastModified,
              lastModifiedDate: values.avatar.lastModifiedDate,
              name: values.avatar.name,
              path: values.avatar.path,
              size: values.avatar.size,
              type: values.avatar.type
            }) : null
          })
            .then(response => {
              console.log(response);
              return setSubmitting(false);
            })
            .catch(response => {
              console.log(response);
              return setSubmitting(false);
            });
        }}
      >
        {({
          errors,
          touched,
          values,
          isSubmitting,
          setFieldValue
        }) => (
          <Fragment>
            <DialogContent>
              <Form>
                <Box
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                >
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
                        label="Username"
                        variant="outlined"
                        error={!!errors.username && touched.username}
                        helperText={errors.username}
                      />
                    )}
                  />
                </Box>
                <Box pb={1} pt={3} display="flex" justifyContent="flex-end">
                  <Button BoxProps={{ p: 1 }} onClick={onCancel}>
                    Cancel
                  </Button>
                  <Button
                    BoxProps={{ p: 1, pr: 0 }}
                    variant="contained"
                    color="success"
                    loading={isSubmitting}
                    type="submit"
                  >
                    Save
                  </Button>
                </Box>
              </Form>
            </DialogContent>
          </Fragment>
        )}
      </Formik>
    </Dialog>
  );
};

ModalCreateProfile.propTypes = {
  classes: PropTypes.object.isRequired,
  onCancel: PropTypes.func.isRequired,
  onSuccess: PropTypes.func.isRequired
};

export default ModalCreateProfile;
