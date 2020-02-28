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
    submit,
    disableTranslation,
    actions,
    className,
    children,
    onSubmit,
    validationSchema,
    initialValues,
    ...rest
  } = props;

  const classes = useFormStyles();
  const { t } = useTranslation();

  return (
    <Formik
      onSubmit={onSubmit}
      validationSchema={validationSchema}
      initialValues={initialValues}
      {...rest}
    >
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
              {disableTranslation ? submit : t(`action:${submit}`)}
            </Button>
          </div>
        </Box>
      </Form>
    </Formik>
  );
};

FormBase.propTypes = {
  submit: PropTypes.string,
  disableTranslation: PropTypes.bool,
  actions: PropTypes.node,
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  onSubmit: PropTypes.func.isRequired,
  validationSchema: PropTypes.shape({}).isRequired,
  initialValues: PropTypes.shape({}).isRequired
};

FormBase.defaultProps = {
  disableTranslation: false,
  submit: 'submit',
  actions: null,
  className: null
};

export default FormBase;
