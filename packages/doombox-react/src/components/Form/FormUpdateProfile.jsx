import React, { Fragment, useState } from 'react';
import { Formik, Form } from 'formik';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import shortid from 'shortid';

// Core
import { Box } from '@material-ui/core';

import { Button } from '../Button';
import {
  FieldFileAvatar,
  FieldLanguage,
  FieldText
} from '../Field';
import { DialogConfirmation } from '../Dialog';

// Modules
import { useRoute } from '../../hooks';

// Api
import {
  updateUser,
  deleteUser
} from '../../api';

// Utils
import { ROUTES } from '../../utils/const';

// Validation
import { schemaUpdateUser } from '../../validation/schema';
import { propUser } from '../../validation/propTypes';

const FormUpdateProfile = props => {
  const {
    profile,
    onCancel,
    updateProfile,
    deleteProfile,
    pending
  } = props;
  const [open, setOpen] = useState(null);
  const { t } = useTranslation();
  const { setRoute } = useRoute();

  const form_id = 'create-profile';

  return (
    <Fragment>
      <Formik
        initialValues={profile}
        validationSchema={schemaUpdateUser}
        onSubmit={({ _id, ...values }) => {
          updateProfile(_id, { ...values });
          if (!pending) onCancel();
        }}
      >
        <Form>
          <Box display="flex" alignItems="center">
            <FieldFileAvatar id={form_id} />
            <Box
              display="flex"
              flexDirection="column"
              pl={3}
              flexGrow={1}
            >
              <FieldText id={form_id} name="username" />
              <FieldLanguage id={form_id} />
              <Box display="flex" justifyContent="space-between" pt={1}>
                <Button
                  onClick={() => setOpen('delete')}
                  alignSelf="flex-start"
                  color="error"
                  variant="outlined"
                >
                  {t('title:deleteProfile')}
                </Button>
                <Box>
                  <Button mr={2} onClick={onCancel}>
                    {t('cancel')}
                  </Button>
                  <Button
                    variant="contained"
                    color="success"
                    loading={pending}
                    type="submit"
                  >
                    {t('save')}
                  </Button>
                </Box>
              </Box>
            </Box>
          </Box>
        </Form>
      </Formik>
      <DialogConfirmation
        open={open === 'delete'}
        onCancel={() => setOpen(null)}
        title="title:areYouSure"
        description="description:deleteProfile"
      >
        <Button
          variant="contained"
          color="error"
          onClick={() => {
            deleteProfile(profile._id);
            setRoute(ROUTES.LANDING);
          }}
          disabled={pending}
        >
          {t('delete')}
        </Button>
      </DialogConfirmation>
    </Fragment>
  );
};

FormUpdateProfile.propTypes = {
  profile: propUser.isRequired,
  onCancel: PropTypes.func.isRequired,
  pending: PropTypes.bool.isRequired,
  deleteProfile: PropTypes.func.isRequired,
  updateProfile: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile.user,
  error: state.profile.error,
  pending: state.profile.pending
});

const mapDispatchToProps = dispatch => ({
  updateProfile: (id, values) => dispatch(updateUser(id, values)),
  deleteProfile: id => dispatch(deleteUser(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FormUpdateProfile);
