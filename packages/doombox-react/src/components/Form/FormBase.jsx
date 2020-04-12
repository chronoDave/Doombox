import React from 'react';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';
import {
  Formik,
  Form
} from 'formik';
import PropTypes from 'prop-types';

// Core
import { Box } from '@material-ui/core';

import { Button } from '../Button';

// Styles
import { useFormStyles } from './Form.style';

const FormBase = props => {
  const {
    primary,
    disableTranslation,
    actions,
    className,
    children,
    ...rest
  } = props;

  const classes = useFormStyles();
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
          <div className={clsx(classes.container, className)}>
            {actions}
            <Button type="submit" color="primary" variant="contained">
              {disableTranslation ? primary : t(`action:${primary}`)}
            </Button>
          </div>
        </Box>
      </Form>
    </Formik>
  );
};

FormBase.propTypes = {
  primary: PropTypes.string,
  disableTranslation: PropTypes.bool,
  actions: PropTypes.node,
  className: PropTypes.string,
  children: PropTypes.node.isRequired
};

FormBase.defaultProps = {
  disableTranslation: false,
  primary: 'submit',
  actions: null,
  className: null
};

export default FormBase;
