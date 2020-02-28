import React from 'react';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';
import PropTypes from 'prop-types';

// Core
import { Button } from '../Button';

// Styles
import { useFormStyles } from './Form.style';

const FormSubmit = props => {
  const {
    disableTranslation,
    actions,
    title
  } = props;
  const classes = useFormStyles();
  const { t } = useTranslation();

  return (
    <div className={clsx(classes.submit, classes.submitChildren)}>
      {actions}
      <Button type="submit" color="primary" variant="contained">
        {disableTranslation ? title : t(`action:${title}`)}
      </Button>
    </div>
  );
};

FormSubmit.propTypes = {
  actions: PropTypes.node,
  disableTranslation: PropTypes.bool,
  title: PropTypes.string
};

FormSubmit.defaultProps = {
  actions: null,
  disableTranslation: false,
  title: 'submit'
};

export default FormSubmit;
