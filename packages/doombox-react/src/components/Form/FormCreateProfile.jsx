import React from 'react';
import {
  Formik,
  Form,
  ErrorMessage
} from 'formik';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Core
import { Box } from '@material-ui/core';

import { Button } from '../Button';
import { Typography } from '../Typography';
import {
  FieldLanguage,
  FieldText
} from '../Field';

// Actions
import { createUser } from '../../api';

// Validation
import { schemaCreateUser } from '../../validation/schema';

const FormCreateProfile = props => {
  const {
    createProfile,
    pending
  } = props;
  const { t, i18n: { language } } = useTranslation();
  const id = 'create-profile';

  return (
    <Formik
      initialValues={{
        username: '',
        language
      }}
      validationSchema={schemaCreateUser}
      onSubmit={createProfile}
    >
      <Form>
        <Box display="flex" flexDirection="column">
          <Typography variant="button" color="grey.100">
            {t('general')}
          </Typography>
          <FieldText id={id} name="username" />
          <FieldLanguage id={id} />
        </Box>
        <ErrorMessage name="language" />
        <Box pb={1} pt={2} display="flex" justifyContent="flex-end">
          <Button
            variant="contained"
            color="primary"
            loading={pending}
            fullWidth
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
  pending: PropTypes.bool.isRequired,
  createProfile: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  pending: state.profile.pending
});

const mapDispatchToProps = dispatch => ({
  createProfile: values => dispatch(createUser(values))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FormCreateProfile);
