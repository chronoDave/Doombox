import React from 'react';
import { Formik, Form, Field } from 'formik';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Core
import { withStyles } from '@material-ui/core/styles';
import {
  Box,
  TextField
} from '@material-ui/core';

import { Button } from '../Button';
import {
  IconDatabaseRefresh,
  IconDatabaseRemove,
  IconDatabaseCheck,
  IconDatabase
} from '../Icon';

// Actions
import { updateConnection } from '../../actions/systemActions';

// Validation
import { SchemaUpdateConnection } from './validation';

// Style
import FormStyle from '../Field/FieldStyle';

const FormUpdateConnection = props => {
  const {
    classes,
    onCancel,
    isConnected,
    testConnection,
    error,
    pending,
    address
  } = props;
  const { t } = useTranslation();
  const name = 'connection';

  const getEndAdornment = () => {
    if (isConnected) return <IconDatabaseCheck classes={{ root: classes.iconDatabaseCheck }} />;
    if (error) return <IconDatabaseRemove classes={{ root: classes.iconDatabaseError }} />;
    if (pending) return <IconDatabaseRefresh />;
    return <IconDatabase />;
  };

  return (
    <Formik
      initialValues={{ connection: address }}
      validationSchema={SchemaUpdateConnection}
      onSubmit={value => testConnection(value)}
    >
      <Form>
        <Field
          name="connection"
          render={({
            field: { value },
            form: {
              setFieldValue,
              setFieldTouched,
              touched,
              errors
            }
          }) => (
            <Box display="flex" flexDirection="column" alignItems="center">
              <TextField
                inputProps={{ id: `update-${name}` }}
                InputProps={{
                  endAdornment: getEndAdornment(),
                  classes: { disabled: classes.inputPropsDisabled }
                }}
                InputLabelProps={{
                  classes: { disabled: classes.inputLabelPropsDisabled }
                }}
                label={t('url')}
                variant="outlined"
                fullWidth
                margin="normal"
                disabled={isConnected}
                error={!!errors[name] && touched[name]}
                helperText={t(errors[name], { input: t(name), context: 'mongodb' })}
                value={value}
                onChange={event => {
                  setFieldValue(name, event.target.value);
                  setFieldTouched(name, true);
                }}
              />
              <Box display="flex" width="100%" pt={1}>
                <Button
                  BoxProps={{ mr: 1 }}
                  fullWidth
                  onClick={onCancel}
                  variant="outlined"
                  color="error"
                >
                  {t('cancel')}
                </Button>
                <Button
                  BoxProps={{ ml: 1 }}
                  variant="contained"
                  color={isConnected ? 'success' : 'primary'}
                  disabled={isConnected}
                  fullWidth
                  onClick={() => testConnection(value)}
                  loading={pending}
                >
                  {t('connect')}
                </Button>
              </Box>
            </Box>
          )}
        />
      </Form>
    </Formik>
  );
};

FormUpdateConnection.propTypes = {
  classes: PropTypes.object.isRequired,
  onCancel: PropTypes.func.isRequired,
  isConnected: PropTypes.bool.isRequired,
  testConnection: PropTypes.func.isRequired,
  error: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object
  ]),
  pending: PropTypes.bool.isRequired,
  address: PropTypes.string.isRequired
};

FormUpdateConnection.defaultProps = {
  error: null
};

const mapStateToProps = state => ({
  pending: state.system.pendingDatabase,
  error: state.system.error,
  isConnected: state.system.connectedDatabase
});

const mapDispatchToProps = dispatch => ({
  testConnection: url => dispatch(updateConnection(url)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(
  FormStyle
)(FormUpdateConnection));
