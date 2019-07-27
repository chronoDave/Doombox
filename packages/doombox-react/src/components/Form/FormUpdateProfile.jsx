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
  FieldError,
  FieldText
} from '../Field';

// Actions
import { updateUser } from '../../actions/userActions';

// Validation
import { SchemaUpdateUser } from './validation';

const FormUpdateProfile = props => {
  const {
    initialValues: {
      avatar,
      language,
      username,
      _id
    },
    onCancel,
    updateProfile,
    error,
    pending
  } = props;
  const { t } = useTranslation();

  return (
    <Formik
      initialValues={{
        avatar,
        language,
        username
      }}
      validationSchema={SchemaUpdateUser}
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
        {error && <FieldError mt={2} error={error} />}
        <Box pb={1} pt={3} display="flex" justifyContent="flex-end">
          <Button
            BoxProps={{ p: 1 }}
            onClick={onCancel}
            variant="outlined"
            color="error"
          >
            {t('cancel')}
          </Button>
          <Button
            BoxProps={{ p: 1, pr: 0 }}
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
  initialValues: PropTypes.object.isRequired,
  onCancel: PropTypes.func.isRequired,
  error: PropTypes.object,
  pending: PropTypes.bool.isRequired,
  updateProfile: PropTypes.func.isRequired
};

FormUpdateProfile.defaultProps = {
  error: null
};

const mapStateToProps = state => ({
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
