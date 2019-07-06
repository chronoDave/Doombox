import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

// Core
import { withStyles } from '@material-ui/core/styles';
import {
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField
} from '@material-ui/core';

import { Button } from '../Button';
import { FieldSelectAvatar } from '../Field';
import { Avatar } from '../Avatar';

// Actions
import { createUser } from '../../actions/createActions';

// Style
import ModalStyle from './ModalStyle';

const ModalCreateProfile = props => {
  const {
    classes,
    isNew,
    onCancel,
    ...rest
  } = props;

  return (
    <Dialog
      {...rest}
    >
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
            .required('Required'),
          avatar: Yup.mixed()
            .notRequired()
        })}
        onSubmit={(values, { setSubmitting }) => {
          const normalizedAvatar = JSON.stringify(values.avatar);
          // createUser(values);
          console.log(values);
          if (!isNew) setSubmitting(false);
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
                      render={({ field: { name } }) => (
                        <FieldSelectAvatar
                          inputProps={{ name, id: `create-profile-${name}` }}
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
              </Form>
              <Box pb={1} pt={3} display="flex" justifyContent="flex-end">
                <Button BoxProps={{ p: 1 }} onClick={onCancel}>
                  Cancel
                </Button>
                <Button BoxProps={{ p: 1, pr: 0 }} variant="contained" color="success">
                  Save
                </Button>
              </Box>
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
  isNew: PropTypes.bool.isRequired
};

export default withStyles(
  ModalStyle
)(ModalCreateProfile);
