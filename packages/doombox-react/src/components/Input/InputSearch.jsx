import React, {
  useState,
  useEffect,
  cloneElement
} from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import debounce from 'lodash.debounce';

// Icons
import IconSearch from '@material-ui/icons/Search';

// Core
import { InputBase } from '@material-ui/core';

// Styles
import { useInputStyles } from './Input.style';

const Search = props => {
  const {
    id,
    name,
    onDebounce,
    debouceTime,
    endAdornment
  } = props;
  const [query, setQuery] = useState('');
  const { t } = useTranslation();
  const classes = useInputStyles();

  const handleDebounce = debounce(() => onDebounce(query), debouceTime);

  useEffect(() => {
    handleDebounce();

    // Cleanup
    return () => {
      handleDebounce.cancel();
    };
  }, [handleDebounce, query]);

  const handleChange = event => {
    const { target: { value } } = event;
    setQuery(value);
  };

  return (
    <InputBase
      inputProps={{ id: `${id}-search-${name}` }}
      placeholder={t('search')}
      type="text"
      autoComplete="off"
      margin="dense"
      value={query}
      onChange={handleChange}
      classes={{
        root: classes.inputSearchRoot,
        input: classes.inputSearchInput
      }}
      endAdornment={endAdornment ? (
        cloneElement(endAdornment({
          onCancel: () => setQuery('')
        }), { className: classes.endAdornment })
      ) : (
        <IconSearch classes={{ root: classes.endAdornment }} />
      )}
    />
  );
};

Search.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  debouceTime: PropTypes.number,
  onDebounce: PropTypes.func.isRequired,
  endAdornment: PropTypes.func
};

Search.defaultProps = {
  endAdornment: null,
  debouceTime: 200
};

export default Search;
