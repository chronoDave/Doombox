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
  FieldLanguage,
  FieldText
} from '../Field';

// Actions
import { createUser } from '../../actions/userActions';

// Validation
import { SchemaUser } from '../../validation';

const FormCreateProfile = props => {
  const {
    onCancel,
    createProfile,
    error,
    pending
  } = props;
  const { t, i18n: { language } } = useTranslation();

  return (
    <Formik
      initialValues={{
        username: '',
        avatar: null,
        language
      }}
      validationSchema={SchemaUser}
      onSubmit={values => createProfile(values)}
    >
      <Form>
        <Box display="flex" flexDirection="column" alignItems="center">
          <FieldFileAvatar id="create-profile" />
          <FieldText id="create-profile" name="username" />
          <FieldLanguage id="create-profile" />
        </Box>
        {error && <FieldError mt={2} error={error} />}
        <Box pb={1} pt={3} display="flex" justifyContent="flex-end">
          <Button BoxProps={{ p: 1 }} onClick={onCancel}>
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

FormCreateProfile.propTypes = {
  onCancel: PropTypes.func.isRequired,
  error: PropTypes.object,
  pending: PropTypes.bool.isRequired,
  createProfile: PropTypes.func.isRequired
};

FormCreateProfile.defaultProps = {
  error: null
};

const mapStateToProps = state => ({
  error: state.profile.error,
  pending: state.profile.pending
});

const mapDispatchToProps = dispatch => ({
  createProfile: values => dispatch(createUser(values))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FormCreateProfile);
