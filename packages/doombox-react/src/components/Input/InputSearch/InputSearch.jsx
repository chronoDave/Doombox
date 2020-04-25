import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

// Icons
import IconSearch from '@material-ui/icons/Search';
import IconClear from '@material-ui/icons/Clear';

// Core
import {
  ButtonBase,
  InputBase
} from '@material-ui/core';

// Styles
import { useInputSearchStyles } from './InputSearch.style';

const InputSearch = props => {
  const {
    id,
    name,
    endAdornment,
    onChange
  } = props;
  const [query, setQuery] = useState('');

  const { t } = useTranslation();
  const classes = useInputSearchStyles();

  const handleChange = value => {
    setQuery(value);
    onChange(value);
  };

  return (
    <InputBase
      inputProps={{ id: `${id}-search-${name}` }}
      placeholder={t('search')}
      type="text"
      autoComplete="off"
      margin="dense"
      value={query}
      onChange={event => handleChange(event.target.value)}
      classes={{
        root: classes.root,
        input: classes.input
      }}
      endAdornment={query ? (
        <ButtonBase
          disableRipple
          classes={{ root: classes.iconCancel }}
          onClick={() => handleChange('')}
        >
          {endAdornment || <IconClear />}
        </ButtonBase>
      ) : (
        <IconSearch classes={{ root: classes.endAdornment }} />
      )}
    />
  );
};

InputSearch.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  endAdornment: PropTypes.element,
  onChange: PropTypes.func.isRequired
};

InputSearch.defaultProps = {
  endAdornment: null,
};

export default InputSearch;
