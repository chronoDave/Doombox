import React from 'react';
import PropTypes from 'prop-types';

// Core
import {
  Typography
} from '../Typography';

// Styles
import { useTableStyles } from './Table.styles';

const TableRow = props => {
  const {
    label,
    LabelTypographyProps,
    value,
    ValueTypographyProps,
    variant
  } = props;

  const classes = useTableStyles();

  return (
    <tr>
      <Typography
        component="td"
        noWrap
        variant={variant}
        classes={{ root: classes.label }}
        {...LabelTypographyProps}
      >
        {label}
      </Typography>
      <Typography
        component="td"
        variant={variant}
        classes={{ root: classes.value }}
        {...ValueTypographyProps}
      >
        {value}
      </Typography>
    </tr>
  );
};

TableRow.propTypes = {
  label: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]).isRequired,
  LabelTypographyProps: PropTypes.shape({}),
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]).isRequired,
  ValueTypographyProps: PropTypes.shape({}),
  variant: PropTypes.oneOf([
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'h6',
    'subtitle1',
    'subtitle2',
    'body1',
    'body2',
    'button',
    'caption',
    'overline'
  ])
};

TableRow.defaultProps = {
  LabelTypographyProps: {},
  ValueTypographyProps: {},
  variant: null
};

export default TableRow;
