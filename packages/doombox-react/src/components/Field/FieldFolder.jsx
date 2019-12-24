import React from 'react';
import { Field } from 'formik';
import PropTypes from 'prop-types';

// Core
import {
  List,
  ListItem,
  ListItemText,
} from '@material-ui/core';

// Utils
import { selectFolder } from '../../utils';

const FieldFolder = props => {
  const {
    name,
    multi
  } = props;

  const handleClick = ({ setFieldValue, setFieldTouched }) => {
    selectFolder(multi)
      .then(folders => {
        if (folders) {
          setFieldValue(name, folders);
          setFieldTouched(name, true);
        }
      });
  };

  return (
    <Field name={name}>
      {({
        field: { value },
        form: {
          setFieldValue,
          setFieldTouched
        }
      }) => (
        <List>
          {value.map(folder => (
            <ListItem key={folder}>
              <ListItemText primary={folder} />
            </ListItem>
          ))}
          <ListItem
            button
            onClick={() => handleClick({ setFieldValue, setFieldTouched })}
          >
            <ListItemText primary="Add folder" />
          </ListItem>
        </List>
      )}
    </Field>
  );
};

FieldFolder.propTypes = {
  name: PropTypes.string.isRequired,
  multi: PropTypes.bool
};

FieldFolder.defaultProps = {
  multi: false
};

export default FieldFolder;
