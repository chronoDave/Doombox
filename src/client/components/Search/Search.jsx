import React, { useState, useRef, forwardRef } from 'react';
import { cx } from 'emotion';
import PropTypes from 'prop-types';

// Core
import { Typography } from '../Typography';
import { ButtonBase } from '../ButtonBase';
import { Icon } from '../Icon';

// Hooks
import { useTranslation } from '../../hooks';

// Styles
import useSearchStyles from './Search.styles';

const Search = forwardRef((props, ref) => {
  const {
    onChange,
    onSubmit,
    onClear,
    className,
    ...rest
  } = props;
  const [value, setValue] = useState(null);

  const input = useRef();

  const { t } = useTranslation();
  const classes = useSearchStyles();

  const getIconType = () => {
    if (!value || value === '') return 'search';
    return 'close';
  };

  const handleChange = event => {
    setValue(event.currentTarget.value);

    if (typeof onChange === 'function') onChange(event, event.currentTarget.value);
  };

  const handleSubmit = event => {
    if (event.keyCode === 13 && typeof onSubmit === 'function') onSubmit(event, value);
  };

  const handleClear = event => {
    input.current.value = '';
    setValue(null);

    if (typeof onClear === 'function') onClear(event, '');
  };

  return (
    <div
      ref={ref}
      className={cx(classes.root, {
        [classes.active]: value && value.length > 0
      }, className)}
      {...rest}
    >
      <Typography
        element="input"
        ref={input}
        type="text"
        className={classes.input}
        placeholder={t('action.common.search', { transform: 'capitalize', dots: true })}
        onChange={handleChange}
        onKeyDown={handleSubmit}
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck="false"
      />
      <ButtonBase
        className={classes.button}
        onClick={handleClear}
      >
        <Icon type={getIconType()} small />
      </ButtonBase>
    </div>
  );
});

Search.defaultProps = {
  onChange: null,
  onSubmit: null,
  onClear: null,
  className: null
};

Search.propTypes = {
  onChange: PropTypes.func,
  onSubmit: PropTypes.func,
  onClear: PropTypes.func,
  className: PropTypes.string
};

Search.displayName = 'search';
export default Search;
