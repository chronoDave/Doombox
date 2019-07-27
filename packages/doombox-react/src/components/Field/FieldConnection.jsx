import React from 'react';
import { Field } from 'formik';
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
import {
  tryConnection,
  disconnect
} from '../../actions/systemActions';

// Style
import FieldStyle from './FieldStyle';

const FieldConnection = props => {
  const {
    classes,
    name,
    id,
    error,
    pending,
    testConnection,
    resetConnection,
    isConnected,
    context,
  } = props;
  const { t } = useTranslation();

  const getEndAdornment = () => {
    if (isConnected) return <IconDatabaseCheck classes={{ root: classes.iconDatabaseCheck }} />;
    if (error) return <IconDatabaseRemove classes={{ root: classes.iconDatabaseError }} />
    if (pending) return <IconDatabaseRefresh />;
    return <IconDatabase />;
  };

  return (
    <Field
      name={name}
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
            inputProps={{ id: `${id}-${name}` }}
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
            helperText={t(errors[name], { input: t(name), context })}
            value={value}
            onChange={event => {
              setFieldValue(name, event.target.value);
              setFieldTouched(name, true);
            }}
          />
          <Box display="flex" width="100%">
            <Button
              BoxProps={{ mt: 1, mr: 1 }}
              variant="outlined"
              color="error"
              disabled={!isConnected}
              fullWidth
              onClick={() => {
                setFieldValue(name, '');
                resetConnection();
              }}
            >
              {t('remove')}
            </Button>
            <Button
              BoxProps={{ mt: 1, ml: 1 }}
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
  );
};

FieldConnection.propTypes = {
  classes: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  error: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object
  ]),
  pending: PropTypes.bool.isRequired,
  testConnection: PropTypes.func.isRequired,
  resetConnection: PropTypes.func.isRequired,
  isConnected: PropTypes.bool.isRequired,
  context: PropTypes.string.isRequired,
};

FieldConnection.defaultProps = {
  error: null
};

const mapStateToProps = state => ({
  pending: state.system.pendingDatabase,
  error: state.system.error,
  isConnected: state.system.connectedDatabase
});

const mapDispatchToProps = dispatch => ({
  testConnection: url => dispatch(tryConnection(url)),
  resetConnection: () => dispatch(disconnect())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(
  FieldStyle
)(FieldConnection));
