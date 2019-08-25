import React, { Fragment, useState } from 'react';
import { Formik, Form } from 'formik';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Core
import { FieldFileBackground } from '../Field';

// Api
import { updateUser } from '../../api/userApi';

const FormUpdateAppearance = props => {
  const {
    profile: {
      _id,
      ...rest
    },
    updateProfile
  } = props;
  const form_id = 'form-update-appearance';

  return (
    <Formik
      initialValues={rest}
      validate={updateProfile(_id)}
    >
      <Form>
        <FieldFileBackground id={form_id} />
      </Form>
    </Formik>
  );
};

const mapStateToProps = state => ({
  profile: state.profile.user,
  error: state.profile.error,
  pending: state.profile.pending
});

const mapDispatchToProps = dispatch => ({
  updateProfile: id => values => dispatch(updateUser(id, values))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FormUpdateAppearance);
