import React, { useRef } from 'react';
import { cx } from 'emotion';
import PropTypes from 'prop-types';

// Hooks
import { useTranslation } from '../../hooks';

// Validation
import { propTypographyVariants } from '../../validation/propTypes';

// Styles
import useInputSearchStyles from './InputSearch.styles';

const InputSearch = props => {
  const {
    onChange,
    onSearch,
    variant,
    className,
    ...rest
  } = props;
  const ref = useRef();

  const { t } = useTranslation();
  const classes = useInputSearchStyles({ variant });

  return (
    <input
      ref={ref}
      type="text"
      className={cx(classes.root, className)}
      placeholder={t('action.common.search', { transform: 'capitalize' })}
      onChange={event => typeof onChange === 'function' && onChange(event, event.currentTarget.value)}
      onKeyDown={event => event.keyCode === 13 && onSearch(event, ref.current.value)}
      {...rest}
    />
  );
};

InputSearch.defaultProps = {
  onChange: null,
  variant: 'body',
  className: ''
};

InputSearch.propTypes = {
  className: PropTypes.string,
  variant: propTypographyVariants,
  onChange: PropTypes.func,
  onSearch: PropTypes.func.isRequired
};

export default InputSearch;
