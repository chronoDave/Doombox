import React, { useRef } from 'react';
import PropTypes from 'prop-types';

// Core
import { Icon } from '../Icon';
import { IconButton } from '../IconButton';

// Hooks
import { useTranslation } from '../../hooks';

// Styles
import useSearchStyles from './Search.styles';

const Search = ({ onChange, onSearch, IconProps }) => {
  const ref = useRef();

  const classes = useSearchStyles();
  const { t } = useTranslation();

  return (
    <div className={classes.root}>
      <input
        ref={ref}
        type="text"
        className={classes.input}
        placeholder={t('action.common.search', { capitalize: true })}
        onChange={event => onChange(event, event.currentTarget.value)}
        onKeyDown={event => event.keyCode === 13 && onSearch(event, ref.current.value)}
      />
      <IconButton
        onClick={event => onSearch(event, ref.current.value)}
        {...IconProps}
      >
        <Icon type="magnify" />
      </IconButton>
    </div>
  );
};

Search.defaultProps = {
  onChange: () => null,
  IconProps: {}
};

Search.propTypes = {
  onChange: PropTypes.func,
  onSearch: PropTypes.func.isRequired,
  IconProps: PropTypes.shape({
    square: PropTypes.bool,
    small: PropTypes.bool,
    className: PropTypes.string
  })
};

export default Search;
