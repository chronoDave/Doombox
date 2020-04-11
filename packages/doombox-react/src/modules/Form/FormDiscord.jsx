import React from 'react';
import {
  Formik,
  Form
} from 'formik';
import { useTranslation } from 'react-i18next';
import { TYPE } from '@doombox/utils';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Core
import { Box } from '@material-ui/core';

import { FieldText } from '../../components';

// Actions
import { updateConfigDiscord } from '../../actions';

const FormDiscord = ({ token, children }) => {
  const id = 'discord';

  const { t } = useTranslation();

  return (
    <Formik
      initialValues={{ token }}
      onSubmit={updateConfigDiscord}
    >
      <Form>
        <Box display="flex" flexDirection="column">
          <FieldText
            id={id}
            name="token"
            label={t('field:token', { context: 'discord' })}
            description={t('description:field', { context: 'tokenDiscord' })}
          />
        </Box>
        {children}
      </Form>
    </Formik>
  );
};

FormDiscord.propTypes = {
  children: PropTypes.element.isRequired,
  token: PropTypes.string,
};

FormDiscord.defaultProps = {
  token: ''
};

const mapStateToProps = state => ({
  token: state.config[TYPE.CONFIG.DISCORD].token
});

export default connect(
  mapStateToProps
)(FormDiscord);
