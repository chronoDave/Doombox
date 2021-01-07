import React, { useRef } from 'react';
import { cx } from 'emotion';
import PropTypes from 'prop-types';

// Core
import { Typography } from '../Typography';

// Hooks
import { useTranslation } from '../../hooks';

// Styles
import useSearchStyles from './Search.styles';

const Search = props => {
  const {
    onChange,
    onSearch,
    className,
    ...rest
  } = props;
  const ref = useRef();

  const { t } = useTranslation();
  const classes = useSearchStyles();

  return (
    <Typography
      element="input"
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

Search.defaultProps = {
  onChange: null,
  className: ''
};

Search.propTypes = {
  className: PropTypes.string,
  onChange: PropTypes.func,
  onSearch: PropTypes.func.isRequired
};

export default Search;
