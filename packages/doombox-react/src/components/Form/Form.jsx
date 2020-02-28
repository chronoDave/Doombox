import React, {
  Children,
  cloneElement
} from 'react';
import {
  Formik,
  Form as FormBase
} from 'formik';
import PropTypes from 'prop-types';

// Core
import { Box } from '@material-ui/core';

import FormSubmit from './FormSubmit';

const Form = props => {
  const {
    children,
    disableSubmit,
    SubmitProps,
    id,
    ...rest
  } = props;

  return (
    <Formik {...rest}>
      <FormBase>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
        >
          {Children.map(children, child => cloneElement(child, { id }))}
          {!disableSubmit && <FormSubmit {...SubmitProps} />}
        </Box>
      </FormBase>
    </Formik>
  );
};

Form.propTypes = {
  children: PropTypes.node.isRequired,
  disableSubmit: PropTypes.bool,
  SubmitProps: PropTypes.shape(FormSubmit.propTypes),
  id: PropTypes.string.isRequired
};

Form.defaultProps = {
  disableSubmit: false,
  SubmitProps: {}
};

export default Form;
