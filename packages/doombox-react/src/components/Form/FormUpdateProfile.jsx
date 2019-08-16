import React from 'react';
import { Formik, Form } from 'formik';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Core
import { Box } from '@material-ui/core';

import { Button } from '../Button';
import {
  FieldFileAvatar,
  FieldText
} from '../Field';

// Actions
import { updateUser } from '../../api/userApi';

// Validation
import { schemaUpdateUser } from '../../validation/schema';
import { propUser } from '../../validation/propTypes';

const FormUpdateProfile = props => {
  const {
    profile: {
      _id,
      ...rest
    },
    onCancel,
    updateProfile,
    pending
  } = props;
  const { t } = useTranslation();

  return (
    <Formik
      initialValues={{ ...rest }}
      validationSchema={schemaUpdateUser}
      onSubmit={values => {
        updateProfile(_id, values);
        if (!pending) onCancel();
      }}
    >
      <Form>
        <Box display="flex" flexDirection="column" alignItems="center">
          <FieldFileAvatar id="create-profile" />
          <FieldText id="create-profile" name="username" />
        </Box>
        <Box pb={1} pt={3} display="flex" justifyContent="flex-end">
          <Button
            p={1}
            onClick={onCancel}
            variant="outlined"
            color="error"
          >
            {t('cancel')}
          </Button>
          <Button
            p={1}
            pr={0}
            variant="contained"
            color="success"
            loading={pending}
            type="submit"
          >
            {t('save')}
          </Button>
        </Box>
      </Form>
    </Formik>
  );
};

FormUpdateProfile.propTypes = {
  profile: propUser.isRequired,
  onCancel: PropTypes.func.isRequired,
  pending: PropTypes.bool.isRequired,
  updateProfile: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile.user,
  error: state.profile.error,
  pending: state.profile.pending
});

const mapDispatchToProps = dispatch => ({
  updateProfile: (id, values) => dispatch(updateUser(id, values))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FormUpdateProfile);
