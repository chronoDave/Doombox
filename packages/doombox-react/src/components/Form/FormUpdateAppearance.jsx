import React from 'react';
import { Formik, Form } from 'formik';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Core
import { FieldFileBackground } from '../Field';

// Api
import { updateUser } from '../../api';

// Validation
import { propUser } from '../../validation/propTypes';

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

FormUpdateAppearance.propTypes = {
  updateProfile: PropTypes.func.isRequired,
  profile: propUser.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile.user
});

const mapDispatchToProps = dispatch => ({
  updateProfile: id => values => dispatch(updateUser(id, values))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FormUpdateAppearance);
