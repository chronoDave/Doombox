import React from 'react';
import { Formik, Form } from 'formik';
import { useTranslation, Trans } from 'react-i18next';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Icon
import IconInfo from '@material-ui/icons/Info';

// Core
import { withStyles } from '@material-ui/core/styles';
import {
  Link,
  Box,
  Tooltip
} from '@material-ui/core';

import { Button } from '../Button';
import { Typography } from '../Typography';
import {
  FieldError,
  FieldLanguage,
  FieldText,
  FieldConnection
} from '../Field';

// Actions
import { createUser } from '../../actions/userActions';

// Validation
import { SchemaCreateUser } from './validation';

// Style
import FormStyle from './FormStyle';

const FormCreateProfile = props => {
  const {
    classes,
    createProfile,
    isConnected,
    error,
    pending
  } = props;
  const { t, i18n: { language } } = useTranslation();
  const id = 'create-profile';

  return (
    <Formik
      initialValues={{
        username: '',
        connection: '',
        language
      }}
      validationSchema={SchemaCreateUser}
      onSubmit={values => createProfile(values)}
    >
      <Form>
        <Box display="flex" flexDirection="column">
          <Typography variant="button" color="grey">
            {t('general')}
          </Typography>
          <FieldText id={id} name="username" />
          <FieldLanguage id={id} />
          <Box pt={1} display="flex" alignItems="baseline">
            <Typography variant="button" color="grey">
              {t('connection')}
            </Typography>
            <Tooltip
              interactive
              title={(
                <Box p={1}>
                  <Typography paragraph>
                    <Trans i18nKey="tooltip:mongo0">
                      Doombox uses&nbsp;
                      <Link href="https://www.mongodb.com/">
                        MongoDB
                      </Link>
                      &nbsp;to store and retrieve data.
                    </Trans>
                  </Typography>
                  <Typography paragraph>
                    {t('tooltip:mongo1')}
                  </Typography>
                  <Typography>
                    <Trans i18nKey="tooltip:mongo2">
                      For more information, please refer to&nbsp;
                      <Link href="https://github.com/chronoDave/Doombox/blob/master/README.md#database">
                        README.md
                      </Link>
                    </Trans>
                  </Typography>
                </Box>
              )}
            >
              <IconInfo classes={{ root: classes.iconSmall }} fontSize="small" />
            </Tooltip>
          </Box>
          <FieldConnection id={id} name="connection" context="mongodb" />
        </Box>
        {error && <FieldError mt={2} error={error} />}
        <Box pb={1} pt={2} display="flex" justifyContent="flex-end">
          <Button
            variant="contained"
            color="success"
            loading={pending}
            fullWidth
            type="submit"
            disabled={!isConnected}
          >
            {t('save')}
          </Button>
        </Box>
      </Form>
    </Formik>
  );
};

FormCreateProfile.propTypes = {
  classes: PropTypes.object.isRequired,
  error: PropTypes.object,
  pending: PropTypes.bool.isRequired,
  createProfile: PropTypes.func.isRequired,
  isConnected: PropTypes.bool.isRequired
};

FormCreateProfile.defaultProps = {
  error: null
};

const mapStateToProps = state => ({
  error: state.profile.error,
  pending: state.profile.pending,
  isConnected: state.system.connectedDatabase
});

const mapDispatchToProps = dispatch => ({
  createProfile: values => dispatch(createUser(values))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(
  FormStyle
)(FormCreateProfile));
