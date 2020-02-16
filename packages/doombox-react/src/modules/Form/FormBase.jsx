import React from 'react';
import {
  Formik,
  Form
} from 'formik';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

// Core
import { Box } from '@material-ui/core';

import { Button } from '../../components';

const FormBase = props => {
  const {
    primary,
    actions,
    disableTranslation,
    children,
    ...rest
  } = props;
  const { t } = useTranslation();

  return (
    <Formik {...rest}>
      <Form>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
        >
          {children}
          <Box
            display="flex"
            justifyContent="flex-end"
            py={1}
            width="100%"
          >
            {actions}
            <Box ml={1}>
              <Button type="submit" color="primary" variant="contained">
                {disableTranslation ? primary : t(`action:${primary}`)}
              </Button>
            </Box>
          </Box>
        </Box>
      </Form>
    </Formik>
  );
};

FormBase.propTypes = {
  children: PropTypes.node.isRequired,
  primary: PropTypes.string,
  disableTranslation: PropTypes.bool,
  actions: PropTypes.node
};

FormBase.defaultProps = {
  disableTranslation: false,
  primary: 'create',
  actions: null
};

export default FormBase;
