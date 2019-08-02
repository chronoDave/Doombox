import React from 'react';
import { Formik, Form } from 'formik';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Core
import { Button } from '../Button';
import { FieldConnection } from '../Field';

// Validation
import { schemaUpdateConnection } from '../../validation/schema';

const FormUpdateConnection = props => {
  const {
    onCancel,
    isConnected,
    setConnection,
    pending,
    address
  } = props;
  const { t } = useTranslation();

  return (
    <Formik
      initialValues={{ connection: address }}
      validationSchema={schemaUpdateConnection}
      onSubmit={value => setConnection(value.connection)}
    >
      <Form>
        {/* <FieldConnection
          name="connection"
          context="mongodb"
          id="update-connection"
        >
          <Button
            BoxProps={{ mr: 1 }}
            variant="outlined"
            color="error"
            fullWidth
            onClick={onCancel}
          >
            {t('cancel')}
          </Button>
          <Button
            BoxProps={{ ml: 1 }}
            variant="contained"
            color={isConnected ? 'success' : 'primary'}
            fullWidth
            loading={pending}
            type="submit"
          >
            {t('connect')}
          </Button>
        </FieldConnection> */}
      </Form>
    </Formik>
  );
};

FormUpdateConnection.propTypes = {
  onCancel: PropTypes.func.isRequired,
  isConnected: PropTypes.bool.isRequired,
  setConnection: PropTypes.func.isRequired,
  pending: PropTypes.bool.isRequired,
  address: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  pending: state.system.pendingDatabase,
  isConnected: state.system.connectedDatabase
});

export default connect(
  mapStateToProps
)(FormUpdateConnection);
